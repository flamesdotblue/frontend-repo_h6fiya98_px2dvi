import React from 'react';
import { TrendingUp, DollarSign, ShoppingCart, Percent } from 'lucide-react';

const Card = ({ icon: Icon, label, value, sub }) => (
  <div className="rounded-xl bg-white shadow-sm ring-1 ring-black/5 p-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-500 text-sm">{label}</p>
        <p className="text-slate-900 text-2xl font-semibold mt-1">{value}</p>
        {sub ? <p className="text-emerald-600 text-xs mt-1">{sub}</p> : null}
      </div>
      <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
        <Icon size={18} />
      </div>
    </div>
  </div>
);

const KPICards = ({ kpis }) => {
  const { totalSales, totalProfit, avgOrder, ordersCount, margin } = kpis;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card icon={DollarSign} label="Total Sales" value={totalSales} sub={"Orders: " + ordersCount} />
      <Card icon={TrendingUp} label="Total Profit" value={totalProfit} sub={"Margin: " + margin} />
      <Card icon={ShoppingCart} label="Avg Order Value" value={avgOrder} />
      <Card icon={Percent} label="Profit Margin" value={margin} />
    </div>
  );
};

export default KPICards;
