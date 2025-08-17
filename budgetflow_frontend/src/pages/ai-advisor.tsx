import { useQuery } from "@tanstack/react-query";
import { api, getErrorMessage } from "@/lib/api";

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
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">AI Advisor</h1>
        <button
          onClick={() => refetch()}
          className="px-3 py-2 border rounded"
          disabled={isFetching}
        >
          {isFetching ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600">{getErrorMessage(error)}</p>}
      <ul className="space-y-2">
        {data?.tips?.map((t: string, i: number) => (
          <li key={`tip-${i}`} className="border rounded p-3">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
