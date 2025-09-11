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
		<div className="space-y-4">
			<h1 className="text-2xl font-semibold tracking-tight">Transactions</h1>
			<div className="rounded-xl border border-black/5 bg-white overflow-hidden">
				<ul className="divide-y divide-black/5">
					{data?.items?.map((t: Transaction, i: number) => (
						<li key={`${t.date}-${i}`} className="p-3 sm:p-4 grid grid-cols-3 gap-2 items-center">
							<span className="text-sm text-gray-500">{t.date}</span>
							<span className="font-medium text-gray-900 truncate">{t.description}</span>
							<span className={`text-right ${t.amount < 0 ? "text-red-600" : "text-green-600"}`}>
								{t.amount}
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
