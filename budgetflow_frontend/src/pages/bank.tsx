import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bankApi, errorMessage } from "@/lib/api";
import type { BankConnection, BankProvider, SyncSchedule } from "@/components/types/types";
import { useEffect, useState } from "react";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="space-y-3">
    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
    {children}
  </section>
);

export default function BankPage() {
  const qc = useQueryClient();
  const [selectedProviderId, setSelectedProviderId] = useState<string>("");

  const providersQ = useQuery({
    queryKey: ["bank-providers"],
    queryFn: async () => (await bankApi.listProviders()).providers as BankProvider[],
  });

  useEffect(() => {
    if (!selectedProviderId && providersQ.data?.length) {
      setSelectedProviderId(providersQ.data[0].id);
    }
  }, [providersQ.data, selectedProviderId]);

  const connectionsQ = useQuery({
    queryKey: ["bank-connections"],
    queryFn: async () => (await bankApi.listConnections()).connections as BankConnection[],
  });

  const scheduleQ = useQuery({
    queryKey: ["bank-schedule"],
    queryFn: async () => (await bankApi.getSchedule()).schedule as SyncSchedule,
  });

  const connectM = useMutation({
    mutationFn: async (providerId: string) => bankApi.startConnect(providerId),
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ["bank-connections"] });
      if (res.url) {
        window.location.href = res.url;
      }
    },
  });

  const disconnectM = useMutation({
    mutationFn: async (id: string) => bankApi.disconnect(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bank-connections"] }),
  });

  const syncM = useMutation({
    mutationFn: async (id: string) => bankApi.syncNow(id),
  });

  const scheduleM = useMutation({
    mutationFn: async (payload: { enabled: boolean; intervalHours: number }) =>
      bankApi.updateSchedule(payload.enabled, payload.intervalHours),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bank-schedule"] }),
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Bank connections</h1>
        <p className="text-sm text-gray-600">Connect your bank and enable auto-sync every 2 hours</p>
      </div>
      <div className="rounded-xl border border-black/5 bg-white p-5 flex flex-col sm:flex-row gap-3 sm:items-center">
        <label className="text-sm text-gray-700" htmlFor="provider">Provider</label>
        <select
          id="provider"
          className="px-3 py-2 rounded-lg border border-black/10 bg-white min-w-[240px] focus:outline-none focus:ring-4 focus:ring-black/10"
          value={selectedProviderId}
          onChange={(e) => setSelectedProviderId(e.target.value)}
          disabled={providersQ.isLoading || !!providersQ.error}
        >
          {!providersQ.data?.length && (
            <option value="" disabled>
              {providersQ.isLoading ? "Loading providers..." : "No providers available"}
            </option>
          )}
          {providersQ.data?.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => selectedProviderId && connectM.mutate(selectedProviderId)}
          disabled={!selectedProviderId || connectM.isPending || providersQ.isLoading || !!providersQ.error}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-black text-white hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Connect bank
        </button>
      </div>

      <Section title="Providers">
        {providersQ.isLoading && <p>Loading...</p>}
        {providersQ.error && <p className="text-red-600">{errorMessage(providersQ.error)}</p>}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {providersQ.data?.map((p) => (
            <button
              key={p.id}
              onClick={() => connectM.mutate(p.id)}
              disabled={connectM.isPending}
              className="rounded-xl border border-black/5 bg-white p-4 text-left hover:shadow-sm transition-shadow"
            >
              <div className="font-medium text-gray-900">{p.name}</div>
              <div className="text-sm text-gray-600">Connect</div>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Connections">
        {connectionsQ.isLoading && <p>Loading...</p>}
        {connectionsQ.error && <p className="text-red-600">{errorMessage(connectionsQ.error)}</p>}
        <div className="rounded-xl border border-black/5 bg-white overflow-hidden">
          <ul className="divide-y divide-black/5">
            {connectionsQ.data?.map((c) => (
              <li key={c.id} className="p-4 grid grid-cols-1 sm:grid-cols-4 gap-2 items-center">
                <div className="font-medium text-gray-900">{c.providerName}</div>
                <div className="text-sm">
                  <span
                    className={
                      c.status === "connected"
                        ? "text-green-700"
                        : c.status === "error"
                        ? "text-red-700"
                        : "text-gray-600"
                    }
                  >
                    {c.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {c.lastSyncedAt ? `Last sync: ${new Date(c.lastSyncedAt).toLocaleString()}` : "No sync yet"}
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => syncM.mutate(c.id)}
                    className="px-3 py-2 rounded-lg border border-black/5 bg-white hover:shadow-sm"
                    disabled={syncM.isPending}
                  >
                    Sync now
                  </button>
                  <button
                    onClick={() => disconnectM.mutate(c.id)}
                    className="px-3 py-2 rounded-lg border border-black/5 bg-white hover:shadow-sm"
                    disabled={disconnectM.isPending}
                  >
                    Disconnect
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section title="Auto sync">
        {scheduleQ.isLoading && <p>Loading...</p>}
        {scheduleQ.error && <p className="text-red-600">{errorMessage(scheduleQ.error)}</p>}
        {scheduleQ.data && (
          <form
            className="flex flex-col sm:flex-row gap-3 items-start sm:items-center"
            onSubmit={(e) => {
              e.preventDefault();
              const enabled = (e.currentTarget.elements.namedItem("enabled") as HTMLInputElement).checked;
              const intervalHours = Number(
                (e.currentTarget.elements.namedItem("intervalHours") as HTMLInputElement).value
              );
              scheduleM.mutate({ enabled, intervalHours });
            }}
          >
            <label className="inline-flex items-center gap-2">
              <input
                name="enabled"
                type="checkbox"
                defaultChecked={scheduleQ.data.enabled}
                className="h-4 w-4"
              />
              <span className="text-sm text-gray-800">Enable auto sync</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                name="intervalHours"
                type="number"
                min={1}
                step={1}
                defaultValue={scheduleQ.data.intervalHours ?? 2}
                className="px-2 py-1 rounded border border-black/10 w-24 bg-white"
              />
              <span className="text-sm text-gray-600">hours</span>
            </div>
            <button
              type="submit"
              className="px-3 py-2 rounded-lg border border-black/5 bg-white hover:shadow-sm"
              disabled={scheduleM.isPending}
            >
              Save
            </button>
            {scheduleQ.data.nextRunAt && (
              <span className="text-sm text-gray-600">
                Next run: {new Date(scheduleQ.data.nextRunAt).toLocaleString()}
              </span>
            )}
          </form>
        )}
      </Section>
    </div>
  );
}
