import React, { useMemo, useState } from 'react';
import HeroHeader from './components/HeroHeader';
import FiltersBar from './components/FiltersBar';
import KPICards from './components/KPICards';
import DashboardContent from './components/DashboardContent';

const currency = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n || 0);
const percent = (n) => `${(n * 100).toFixed(1)}%`;

function seedData() {
  const regions = ['North', 'South', 'East', 'West'];
  const categories = ['Technology', 'Furniture', 'Office'];
  const names = ['Apex Monitor', 'Nimbus Chair', 'Orbit Desk', 'Pulse Keyboard', 'Vertex Laptop', 'Quantum Pen', 'Atlas Shelf', 'Nova Lamp', 'Pixel Paper', 'Vector Mouse', 'Zen Bookcase', 'Echo Phone'];
  const today = new Date();
  const data = [];
  for (let i = 0; i < 60; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i * 2);
    const region = regions[i % regions.length];
    const category = categories[i % categories.length];
    const name = names[i % names.length];
    const sales = Math.round(200 + Math.random() * 2000);
    const profit = Math.round(sales * (0.1 + Math.random() * 0.35));
    data.push({ id: i + 1, name, region, category, date: d.toISOString().slice(0, 10), sales, profit });
  }
  return data.sort((a, b) => new Date(a.date) - new Date(b.date));
}

const ALL = { region: 'All', category: 'All', startDate: '', endDate: '' };

export default function App() {
  const [dataset] = useState(() => seedData());
  const [pendingFilters, setPendingFilters] = useState(ALL);
  const [appliedFilters, setAppliedFilters] = useState(ALL);

  const filtered = useMemo(() => {
    return dataset.filter((r) => {
      if (appliedFilters.region !== 'All' && r.region !== appliedFilters.region) return false;
      if (appliedFilters.category !== 'All' && r.category !== appliedFilters.category) return false;
      if (appliedFilters.startDate && r.date < appliedFilters.startDate) return false;
      if (appliedFilters.endDate && r.date > appliedFilters.endDate) return false;
      return true;
    });
  }, [dataset, appliedFilters]);

  const kpis = useMemo(() => {
    const totalSalesNum = filtered.reduce((s, r) => s + r.sales, 0);
    const totalProfitNum = filtered.reduce((s, r) => s + r.profit, 0);
    const orders = filtered.length || 1;
    const avgOrderNum = totalSalesNum / orders;
    const marginNum = totalProfitNum / Math.max(1, totalSalesNum);
    return {
      totalSales: currency(totalSalesNum),
      totalProfit: currency(totalProfitNum),
      avgOrder: currency(avgOrderNum),
      ordersCount: orders,
      margin: percent(marginNum),
    };
  }, [filtered]);

  const monthKey = (dateStr) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  };

  const chartSeries = useMemo(() => {
    const map = new Map();
    filtered.forEach((r) => {
      const k = monthKey(r.date);
      map.set(k, (map.get(k) || 0) + r.sales);
    });
    const arr = Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]))
      .map(([label, value]) => ({ label, value }));
    return arr.length ? arr : [{ label: 'N/A', value: 0 }];
  }, [filtered]);

  const regionBars = useMemo(() => {
    const map = new Map();
    filtered.forEach((r) => map.set(r.region, (map.get(r.region) || 0) + r.sales));
    const regions = ['North', 'South', 'East', 'West'];
    const arr = regions.map((reg) => ({ label: reg, value: map.get(reg) || 0 }));
    return arr;
  }, [filtered]);

  const categoryArea = useMemo(() => {
    const cats = ['Technology', 'Furniture', 'Office'];
    const map = new Map();
    filtered.forEach((r) => map.set(r.category, (map.get(r.category) || 0) + r.profit));
    return cats.map((c) => ({ label: c, value: map.get(c) || 0 }));
  }, [filtered]);

  const donutParts = useMemo(() => {
    const colors = {
      Technology: '#22c55e',
      Furniture: '#eab308',
      Office: '#6366f1',
    };
    const map = new Map();
    filtered.forEach((r) => map.set(r.category, (map.get(r.category) || 0) + r.sales));
    return Array.from(map.entries()).map(([label, value]) => ({ label, value, color: colors[label] || '#94a3b8' }));
  }, [filtered]);

  const tableRows = useMemo(() => {
    const rows = [...filtered]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 8)
      .map((r) => ({
        Name: r.name,
        Region: r.region,
        Category: r.category,
        Sales: currency(r.sales),
        Profit: currency(r.profit),
      }));
    return rows;
  }, [filtered]);

  const categorySummary = useMemo(() => {
    const mapSales = new Map();
    const mapProfit = new Map();
    filtered.forEach((r) => {
      mapSales.set(r.category, (mapSales.get(r.category) || 0) + r.sales);
      mapProfit.set(r.category, (mapProfit.get(r.category) || 0) + r.profit);
    });
    return ['Technology', 'Furniture', 'Office'].map((c) => ({
      category: c,
      sales: currency(mapSales.get(c) || 0),
      profit: currency(mapProfit.get(c) || 0),
    }));
  }, [filtered]);

  const handleApply = () => setAppliedFilters(pendingFilters);
  const handleReset = () => { setPendingFilters(ALL); setAppliedFilters(ALL); };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <HeroHeader title="Power BI-style Analytics Dashboard" lastUpdated={new Date()} />

        <div className="mt-6 space-y-6">
          <FiltersBar
            filters={pendingFilters}
            onChange={setPendingFilters}
            onReset={handleReset}
            onApply={handleApply}
          />

          <KPICards kpis={kpis} />

          <DashboardContent
            chartSeries={chartSeries}
            regionBars={regionBars}
            categoryArea={categoryArea}
            donutParts={donutParts}
            tableRows={tableRows}
            categorySummary={categorySummary}
          />
        </div>
      </div>
    </div>
  );
}
