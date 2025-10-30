import React from 'react';
import { Filter, RefreshCw } from 'lucide-react';

const FiltersBar = ({ filters, onChange, onReset, onApply }) => {
  return (
    <div className="w-full rounded-xl bg-white shadow-sm ring-1 ring-black/5 p-4">
      <div className="flex items-center gap-3 mb-3 text-slate-600">
        <Filter size={16} />
        <span className="font-medium text-sm">Filters</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Region</label>
          <select
            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"
            value={filters.region}
            onChange={(e) => onChange({ ...filters, region: e.target.value })}
          >
            <option>All</option>
            <option>North</option>
            <option>South</option>
            <option>East</option>
            <option>West</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Category</label>
          <select
            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"
            value={filters.category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
          >
            <option>All</option>
            <option>Technology</option>
            <option>Furniture</option>
            <option>Office</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Start Date</label>
          <input
            type="date"
            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"
            value={filters.startDate}
            onChange={(e) => onChange({ ...filters, startDate: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">End Date</label>
          <input
            type="date"
            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"
            value={filters.endDate}
            onChange={(e) => onChange({ ...filters, endDate: e.target.value })}
          />
        </div>

        <div className="flex items-end gap-2">
          <button
            onClick={onApply}
            className="h-10 flex-1 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition"
          >
            Apply
          </button>
          <button
            onClick={onReset}
            title="Reset filters"
            className="h-10 w-10 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center justify-center"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersBar;
