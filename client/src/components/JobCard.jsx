import React from 'react';

export default function JobCard({ job, onEdit, onDelete }) {
  const statusColors = {
    Applied: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Interview: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Offer: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Rejected: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };

  return (
    <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl flex flex-col justify-between hover:border-slate-600 transition shadow-xl">
      <div>
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">{job.position}</h3>
            <p className="text-slate-400 text-sm font-medium mt-0.5">{job.company}</p>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${statusColors[job.status]}`}>
            {job.status}
          </span>
        </div>
        {job.salary > 0 && (
          <p className="text-slate-300 text-xs font-mono mb-2">Compensation: ${job.salary.toLocaleString()}</p>
        )}
        {job.deadline && (
          <p className="text-slate-400 text-xs mb-3">
            Target Target: <span className="font-medium text-slate-300">{new Date(job.deadline).toLocaleDateString()}</span>
          </p>
        )}
        {job.notes && (
          <p className="bg-slate-900/40 text-slate-400 text-xs p-2.5 rounded border border-slate-700/50 italic line-clamp-3 mb-4">
            "{job.notes}"
          </p>
        )}
      </div>
      <div className="flex gap-2 pt-2 border-t border-slate-700/50">
        {job.jobUrl && (
          <a 
            href={job.jobUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-xs text-center py-2 rounded font-medium transition"
          >
            Portal Link
          </a>
        )}
        <button 
          onClick={() => onEdit(job)} 
          className="px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded transition font-medium"
        >
          Modify
        </button>
        <button 
          onClick={() => onDelete(job._id)} 
          className="px-3 bg-rose-600/10 hover:bg-rose-600 text-rose-400 hover:text-white text-xs rounded transition font-medium border border-rose-500/20"
        >
          Purge
        </button>
      </div>
    </div>
  );
}