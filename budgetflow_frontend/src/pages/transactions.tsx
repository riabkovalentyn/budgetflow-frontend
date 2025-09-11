import { useQuery } from "@tanstack/react-query";
import { api, errorMessage } from "@/lib/api";
import type { Transaction } from "@/components/types/types";

export default function TransactionsPage() {
		const { data, isLoading, error } = useQuery<{ items: Transaction[] }>({
		queryKey: ["transactions"],
		queryFn: async () => {
			const res = await api.get("/transactions");
			return res.data;
		},
	});

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p className="text-red-600">{errorMessage(error)}</p>;

	return (
		<div>
			<h1 className="text-2xl font-semibold mb-4">Transactions</h1>
			<ul className="space-y-2">
						{data?.items?.map((t: Transaction, i: number) => (
							<li key={`${t.date}-${i}`} className="border rounded p-3 flex justify-between">
						<span>{t.date}</span>
						<span>{t.description}</span>
						<span className={t.amount < 0 ? "text-red-600" : "text-green-600"}>
							{t.amount}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}
