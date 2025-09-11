const Dashboard = () => {
  const card = "rounded-xl border border-black/5 bg-white p-4";
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className={card}>
          <div className="text-sm text-gray-500">Balance</div>
          <div className="text-2xl font-bold">$12,340</div>
        </div>
        <div className={card}>
          <div className="text-sm text-gray-500">Income (30d)</div>
          <div className="text-2xl font-bold">$6,200</div>
        </div>
        <div className={card}>
          <div className="text-sm text-gray-500">Expenses (30d)</div>
          <div className="text-2xl font-bold">$4,100</div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className={`${card} h-64 grid place-items-center text-gray-500`}>Charts</div>
        <div className={`${card} h-64 grid place-items-center text-gray-500`}>Categories</div>
      </div>
    </div>
  );
};

export default Dashboard;
