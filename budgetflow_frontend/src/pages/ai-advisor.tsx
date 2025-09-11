import { useQuery } from "@tanstack/react-query";
import { api, errorMessage } from "@/lib/api";

type Advice = { tips: string[] };

export default function AiAdvisorPage() {
  const { data, isLoading, error, refetch, isFetching } = useQuery<Advice>({
    queryKey: ["ai-advice"],
    queryFn: async () => {
      const res = await api.get("/ai/advice");
      return res.data;
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">AI Advisor</h1>
          <p className="text-sm text-gray-600">Get suggestions to improve your budget</p>
        </div>
        <button
          onClick={() => refetch()}
          className="px-3 py-2 rounded-lg border border-black/5 bg-white hover:shadow-sm transition-shadow"
          disabled={isFetching}
        >
          {isFetching ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600">{errorMessage(error)}</p>}
      <div className="rounded-xl border border-black/5 bg-white overflow-hidden">
        <ul className="divide-y divide-black/5">
          {data?.tips?.map((t: string, i: number) => (
            <li key={`tip-${i}`} className="p-4 text-gray-900">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
