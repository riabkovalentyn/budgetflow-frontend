import Link from "next/link";

export default function Home() {
  const card = "rounded-xl border border-black/5 bg-white p-5 hover:shadow-sm transition-shadow";
  const item = (href: string, title: string, desc: string) => (
    <Link href={href} className={card}>
      <div className="text-base font-semibold text-gray-900">{title}</div>
      <div className="text-sm text-gray-600">{desc}</div>
    </Link>
  );
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome to BudgetFlow</h1>
        <p className="text-sm text-gray-600">Manage your money with simple tools</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {item("/dashboard", "Dashboard", "Balance and quick insights")}
        {item("/transactions", "Transactions", "Your latest movements")}
        {item("/goals", "Goals", "Track savings progress")}
        {item("/ai-advisor", "AI Advisor", "Tips to optimize spending")}
      </div>
    </div>
  );
}
