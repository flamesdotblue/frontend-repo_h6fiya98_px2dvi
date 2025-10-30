import React from 'react';

// Simple responsive SVG charts without external deps
const LineChart = ({ data, stroke = '#4f46e5' }) => {
  const width = 320, height = 120, pad = 24;
  const xs = data.map((d, i) => i);
  const ys = data.map((d) => d.value);
  const xMax = xs.length - 1 || 1;
  const yMax = Math.max(1, ...ys);
  const pts = data.map((d, i) => {
    const x = pad + (i / xMax) * (width - 2 * pad);
    const y = height - pad - (d.value / yMax) * (height - 2 * pad);
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[160px]">
      <polyline fill="none" stroke={stroke} strokeWidth="2.5" points={pts} />
    </svg>
  );
};

const AreaChart = ({ data, fill = 'rgba(99,102,241,0.2)', stroke = '#6366f1' }) => {
  const width = 320, height = 120, pad = 24;
  const xs = data.map((d, i) => i);
  const ys = data.map((d) => d.value);
  const xMax = xs.length - 1 || 1;
  const yMax = Math.max(1, ...ys);
  const path = data.map((d, i) => {
    const x = pad + (i / xMax) * (width - 2 * pad);
    const y = height - pad - (d.value / yMax) * (height - 2 * pad);
    return `${x},${y}`;
  }).join(' ');
  const firstX = pad;
  const lastX = pad + (xMax / xMax) * (width - 2 * pad);
  const baseY = height - pad;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[160px]">
      <polyline fill={fill} stroke={stroke} strokeWidth="2" points={`${firstX},${baseY} ${path} ${lastX},${baseY}`} />
    </svg>
  );
};

const BarChart = ({ data, color = '#0ea5e9' }) => {
  const width = 320, height = 150, pad = 24;
  const barW = (width - 2 * pad) / Math.max(1, data.length);
  const yMax = Math.max(1, ...data.map((d) => d.value));
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[180px]">
      {data.map((d, i) => {
        const h = ((d.value) / yMax) * (height - 2 * pad);
        const x = pad + i * barW + 2;
        const y = height - pad - h;
        return <rect key={i} x={x} y={y} width={barW - 6} height={h} rx={4} fill={color} />
      })}
    </svg>
  );
};

const DonutChart = ({ data }) => {
  const size = 160, strokeW = 18, r = (size - strokeW) / 2, c = 2 * Math.PI * r;
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  let offset = 0;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-[180px]">
      <g transform={`translate(${size / 2}, ${size / 2})`}>
        {data.map((d, i) => {
          const frac = d.value / total;
          const dash = frac * c;
          const circle = (
            <circle
              key={i}
              r={r}
              cx={0}
              cy={0}
              fill="none"
              stroke={d.color}
              strokeWidth={strokeW}
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={-offset}
            />
          );
          offset += dash;
          return circle;
        })}
      </g>
    </svg>
  );
};

const Card = ({ title, children, footer }) => (
  <div className="rounded-xl bg-white shadow-sm ring-1 ring-black/5 p-4">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-slate-800 font-medium">{title}</h3>
      {footer}
    </div>
    {children}
  </div>
);

const Table = ({ columns, rows }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-left text-slate-500">
          <tr>
            {columns.map((c) => (
              <th key={c} className="py-2 pr-4 font-medium">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-slate-50/50">
              {columns.map((c) => (
                <td key={c} className="py-2 pr-4 text-slate-700">{row[c]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CompactTable = ({ rows }) => (
  <div className="overflow-hidden rounded-lg border border-slate-100">
    <div className="grid grid-cols-3 bg-slate-50 text-xs text-slate-600">
      <div className="px-3 py-2">Category</div>
      <div className="px-3 py-2">Sales</div>
      <div className="px-3 py-2">Profit</div>
    </div>
    <div className="divide-y divide-slate-100">
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-3 text-sm">
          <div className="px-3 py-2">{r.category}</div>
          <div className="px-3 py-2">{r.sales}</div>
          <div className="px-3 py-2">{r.profit}</div>
        </div>
      ))}
    </div>
  </div>
);

const DashboardContent = ({ chartSeries, regionBars, categoryArea, donutParts, tableRows, categorySummary }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Sales over Time">
          <LineChart data={chartSeries} />
        </Card>
        <Card title="Sales by Region">
          <BarChart data={regionBars} />
        </Card>
        <Card title="Profit by Category">
          <AreaChart data={categoryArea} />
        </Card>
        <Card title="Sales Mix">
          <DonutChart data={donutParts} />
        </Card>
      </div>

      <div className="lg:col-span-4 space-y-4">
        <Card title="Category Summary">
          <CompactTable rows={categorySummary} />
        </Card>
        <Card title="Recent Orders">
          <Table
            columns={["Name", "Region", "Category", "Sales", "Profit"]}
            rows={tableRows}
          />
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;
