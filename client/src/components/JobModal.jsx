import { useState, useEffect } from 'react';

export default function JobModal({ isOpen, onClose, onSubmit, editingJob }) {
  const [formData, setFormData] = useState({
    company: '', position: '', status: 'Applied', salary: '', jobUrl: '', deadline: '', notes: ''
  });

  useEffect(() => {
    if (editingJob) {
      setFormData({
        ...editingJob,
        salary: editingJob.salary || '',
        deadline: editingJob.deadline ? editingJob.deadline.substring(0, 10) : '',
        notes: editingJob.notes || ''
      });
    } else {
      setFormData({ company: '', position: '', status: 'Applied', salary: '', jobUrl: '', deadline: '', notes: '' });
    }
  }, [editingJob, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-slate-750 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">{editingJob ? 'Modify Tracker Blueprint' : 'Inject Pipeline Entry'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-semibold text-xl">&times;</button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Company *</label>
              <input type="text" required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Position *</label>
              <input type="text" required value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Status Pipeline Index</label>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500">
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Deleted">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Financial Valuation ($)</label>
              <input type="number" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Job Link Vector</label>
            <input type="url" value={formData.jobUrl} onChange={e => setFormData({...formData, jobUrl: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Target Milestone Threshold</label>
            <input type="date" value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Pipeline Evaluation Notes</label>
            <textarea rows="3" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"></textarea>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-700 text-slate-300 text-sm rounded hover:bg-slate-600 transition">Abort</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-500 transition font-semibold">Commit Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}