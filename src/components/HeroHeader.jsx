import React from 'react';
import Spline from '@splinetool/react-spline';
import { CalendarClock } from 'lucide-react';

function formatDate(dt) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'
    }).format(dt);
  } catch {
    return String(dt);
  }
}

const HeroHeader = ({ title, lastUpdated }) => {
  return (
    <section className="relative h-[42vh] w-full overflow-hidden rounded-xl bg-neutral-950">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/WCoEDSwacOpKBjaC/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/70 pointer-events-none" />

      <div className="relative z-10 flex h-full w-full items-end">
        <div className="w-full p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-indigo-500/20 ring-1 ring-white/15 flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
                  {title}
                </h1>
                <p className="text-white/70 text-sm">
                  Multiple screens. Modern. Innovative. Built for insights.
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-white/80 ring-1 ring-white/10">
              <CalendarClock size={18} />
              <span className="text-xs">Last Updated</span>
              <span className="text-xs font-medium text-white">{formatDate(lastUpdated)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHeader;
