import React from 'react';

export default function DashboardStats({ jobs }) {
  const metrics = {
    total: jobs.length,
    applied: jobs.filter(j => j.status === 'Applied').length,
    interview: jobs.filter(j => j.status === 'Interview').length,
    offer: jobs.filter(j => j.status === 'Offer').length,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {[
        { title: 'Total Tracked', val: metrics.total, color: 'border-slate-700 text-slate-300' },
        { title: 'Applied State', val: metrics.applied, color: 'border-blue-500/30 text-blue-400' },
        { title: 'In Evaluation', val: metrics.interview, color: 'border-amber-500/30 text-amber-400' },
        { title: 'Offers Secured', val: metrics.offer, color: 'border-emerald-500/30 text-emerald-400' },
      ].map((stat, idx) => (
        <div key={idx} className={`bg-slate-800/50 border ${stat.color} p-4 rounded-lg backdrop-blur-sm`}>
          <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">{stat.title}</p>
          <p className="text-3xl font-extrabold mt-1">{stat.val}</p>
        </div>
      ))}
    </div>
  );
}