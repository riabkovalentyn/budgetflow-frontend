const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 border rounded">Balance: $12,340</div>
        <div className="p-4 border rounded">Income (30d): $6,200</div>
        <div className="p-4 border rounded">Expenses (30d): $4,100</div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 border rounded h-64 flex items-center justify-center">
          Charts placeholder
        </div>
        <div className="p-4 border rounded h-64 flex items-center justify-center">
          Categories breakdown
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
