import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('Applied');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Phase 7 Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedJobId, setSelectedJobId] = useState(null);

  // Detail Tracking Parameters
  const [liveInterviewDate, setLiveInterviewDate] = useState('');
  const [liveNotes, setLiveNotes] = useState('');

  // Inline Text Editing States
  const [editingId, setEditingId] = useState(null);
  const [editCompany, setEditCompany] = useState('');
  const [editPosition, setEditPosition] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/jobs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/jobs', 
        { company, position, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJobs([res.data, ...jobs]);
      setCompany('');
      setPosition('');
      setStatus('Applied');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'An error occurred while saving the application.');
    }
  };

  const handleUpdateStatus = async (jobId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const targetJob = jobs.find(j => j._id === jobId);
      const res = await axios.put(`/api/jobs/${jobId}`, 
        { ...targetJob, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJobs(jobs.map(job => job._id === jobId ? res.data : job));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleApplicationDashboard = (job) => {
    if (selectedJobId === job._id) {
      setSelectedJobId(null);
    } else {
      setSelectedJobId(job._id);
      setLiveInterviewDate(job.interviewDate || '');
      setLiveNotes(job.notes || '');
    }
  };

  const handleSaveSubDashboardDetails = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      const targetJob = jobs.find(j => j._id === jobId);
      const res = await axios.put(`/api/jobs/${jobId}`, 
        { ...targetJob, interviewDate: liveInterviewDate, notes: liveNotes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJobs(jobs.map(job => job._id === jobId ? res.data : job));
      alert("Application profile details successfully updated.");
    } catch (err) {
      console.error(err);
    }
  };

  const startEditing = (e, job) => {
    e.stopPropagation();
    setEditingId(job._id);
    setEditCompany(job.company);
    setEditPosition(job.position);
  };

  const handleSaveEdit = async (jobId, currentJob) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`/api/jobs/${jobId}`, 
        { ...currentJob, company: editCompany, position: editPosition },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJobs(jobs.map(job => job._id === jobId ? res.data : job));
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteJob = async (e, jobId) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this application record?")) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(jobs.filter(job => job._id !== jobId));
      if (selectedJobId === jobId) setSelectedJobId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };

  // Filter Logic
  const getCount = (stateVal) => jobs.filter(j => j.status === stateVal).length;

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || job.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Summary Metrics calculations
  const interviewCount = getCount('Interviewing');
  const conversionRate = jobs.length ? Math.round((getCount('Accepted') / jobs.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-100 font-sans">
      {/* Navigation Header */}
      <div className="mx-auto max-w-6xl flex justify-between items-center border-b border-slate-800 pb-5 mb-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">TRACKFLOW | Job Engine</h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage and track your professional job hunt timeline</p>
        </div>
        <button 
          onClick={handleLogout}
          className="rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all"
        >
          Sign Out
        </button>
      </div>

      {errorMessage && (
        <div className="mx-auto max-w-6xl mb-6 p-4 bg-red-950/40 border border-red-900/60 text-red-200 rounded-xl text-xs font-medium tracking-wide">
          [System Notice] {errorMessage}
        </div>
      )}

      {/* DASHBOARD ANALYTICS SUMMARY MATRIX */}
      <div className="mx-auto max-w-6xl bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="space-y-1">
          <p className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Total Applications</p>
          <p className="text-2xl font-bold text-blue-400">{jobs.length} <span className="text-xs text-slate-500 font-normal">Logged</span></p>
        </div>
        <div className="space-y-1 border-y sm:border-y-0 sm:border-x border-slate-800/80 py-4 sm:py-0">
          <p className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Interviews Scheduled</p>
          <p className="text-2xl font-bold text-amber-400">{interviewCount} <span className="text-xs text-slate-500 font-normal">Active</span></p>
        </div>
        <div className="space-y-1">
          <p className="text-[11px] uppercase text-slate-500 font-bold tracking-wider">Success Conversion Rate</p>
          <p className="text-2xl font-bold text-emerald-400">{conversionRate}% <span className="text-xs text-slate-500 font-normal">Offer Ratio</span></p>
        </div>
      </div>

      {/* WORKFLOW FILTER QUEUES */}
      <div className="mx-auto max-w-6xl grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8 text-center text-xs font-medium">
        <button onClick={() => setActiveFilter('All')} className={`p-3 rounded-xl border transition-all ${activeFilter === 'All' ? 'bg-slate-800 text-white border-slate-700' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}>
          All Records ({jobs.length})
        </button>
        <button onClick={() => setActiveFilter('Applied')} className={`p-3 rounded-xl border transition-all ${activeFilter === 'Applied' ? 'bg-blue-950/40 text-blue-400 border-blue-900/60' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}>
          Applied ({getCount('Applied')})
        </button>
        <button onClick={() => setActiveFilter('Interviewing')} className={`p-3 rounded-xl border transition-all ${activeFilter === 'Interviewing' ? 'bg-amber-950/40 text-amber-400 border-amber-900/60' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}>
          Interview ({interviewCount})
        </button>
        <button onClick={() => setActiveFilter('Accepted')} className={`p-3 rounded-xl border transition-all ${activeFilter === 'Accepted' ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/60' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}>
          Offer Accepted ({getCount('Accepted')})
        </button>
        <button onClick={() => setActiveFilter('Rejected')} className={`p-3 rounded-xl border transition-all ${activeFilter === 'Rejected' ? 'bg-red-950/40 text-red-400 border-red-900/60' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}>
          Rejected ({getCount('Rejected')})
        </button>
      </div>

      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Form Panel: Add Application */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-800 pb-2">
            New Application Entry
          </h3>
          <form onSubmit={handleCreateJob} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-400">Company Name</label>
              <input
                type="text" required
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500"
                placeholder="e.g., Deloitte"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-400">Job Title / Role</label>
              <input
                type="text" required
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500"
                placeholder="e.g., Business Analyst"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-400">Application Status</label>
              <select
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500 text-slate-300"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <button type="submit" className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all">
              Add Application
            </button>
          </form>
          
          {/* USER REFERENCE GUIDE CARD */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-400 space-y-2">
            <p className="text-slate-300 font-bold uppercase text-[10px] tracking-wider">[Quick Instructions]</p>
            <p>1. Fill out the form above to add a new company application to your tracking portal.</p>
            <p>2. Use the top filters or search bar to quickly group applications by current stage.</p>
            <p>3. Click any application row item to expand its custom timeline profile, update interview schedules, and log follow-up notes.</p>
          </div>
        </div>

        {/* Right Dashboard Workspace: Main Applications Board */}
        <div className="md:col-span-2 space-y-4">
          <div className="w-full">
            <input 
              type="text"
              placeholder="Filter list by typing role or company name..."
              className="w-full bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-slate-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 pt-2">
            Tracked Applications ({filteredJobs.length})
          </h3>

          {loading ? (
            <p className="text-sm text-slate-500 font-medium">Loading records from database...</p>
          ) : filteredJobs.length === 0 ? (
            <div className="border border-dashed border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-sm">
              No applications match the selected filter configuration.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredJobs.map((job) => (
                <div key={job._id} className="space-y-2">
                  
                  {/* Job Entry Row Header Card */}
                  <div 
                    onClick={() => toggleApplicationDashboard(job)}
                    className={`bg-slate-900 border rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm cursor-pointer hover:bg-slate-900/60 transition-all ${selectedJobId === job._id ? 'border-blue-500/50 bg-slate-900/80' : 'border-slate-800'}`}
                  >
                    <div className="flex-1 w-full">
                      {editingId === job._id ? (
                        <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                          <input type="text" className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm text-white" value={editPosition} onChange={(e) => setEditPosition(e.target.value)} />
                          <input type="text" className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-slate-400" value={editCompany} onChange={(e) => setEditCompany(e.target.value)} />
                        </div>
                      ) : (
                        <div>
                          <h4 className="text-base font-bold text-white tracking-wide">{job.position}</h4>
                          <p className="text-sm text-slate-400 font-medium">{job.company}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-end gap-4 w-full sm:w-auto" onClick={(e) => e.stopPropagation()}>
                      {editingId === job._id ? (
                        <div className="flex gap-2 text-[10px] font-bold uppercase">
                          <button onClick={() => handleSaveEdit(job._id, job)} className="bg-emerald-600 text-white px-2.5 py-1 rounded hover:bg-emerald-700">Save</button>
                          <button onClick={() => setEditingId(null)} className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded hover:bg-slate-700">Cancel</button>
                        </div>
                      ) : (
                        <div className="flex gap-3 text-xs font-bold uppercase text-slate-500 tracking-wider">
                          <button onClick={(e) => startEditing(e, job)} className="hover:text-blue-400 transition-all">Edit</button>
                          <button onClick={(e) => handleDeleteJob(e, job._id)} className="hover:text-red-400 transition-all">Delete</button>
                        </div>
                      )}

                      <select
                        value={job.status}
                        onChange={(e) => handleUpdateStatus(job._id, e.target.value)}
                        className={`px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold border bg-slate-950 cursor-pointer focus:outline-none transition-all ${
                          job.status === 'Accepted' ? 'text-emerald-400 border-emerald-500/30' :
                          job.status === 'Interviewing' ? 'text-amber-400 border-amber-500/30' :
                          job.status === 'Rejected' ? 'text-red-400 border-red-500/30' :
                          'text-blue-400 border-blue-500/30'
                        }`}
                      >
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  {/* INDIVIDUAL APPLICATION WORKSPACE DASHBOARD */}
                  {selectedJobId === job._id && (
                    <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-5 text-xs text-slate-300 space-y-4 mx-1">
                      <div className="flex justify-between border-b border-slate-800 pb-2 text-blue-400 font-bold uppercase tracking-wider text-[10px]">
                        <span>[ Application Details Workspace ]</span>
                        <span className="text-slate-600 font-normal">Reference ID: {job._id}</span>
                      </div>
                      
                      {/* Interactive Configuration Inputs Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-slate-500 uppercase font-bold block text-[10px] tracking-wider">Interview Date Schedule</label>
                          <input 
                            type="date"
                            className="bg-slate-900 border border-slate-800 rounded p-2 text-white w-full text-xs focus:outline-none focus:border-slate-700"
                            value={liveInterviewDate}
                            onChange={(e) => setLiveInterviewDate(e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-500 uppercase font-bold block text-[10px] tracking-wider">Application Follow-up Notes</label>
                          <input 
                            type="text"
                            placeholder="Add notes about rounds, contact info, or interview prep tasks..."
                            className="bg-slate-900 border border-slate-800 rounded p-2 text-white placeholder-slate-700 w-full text-xs focus:outline-none focus:border-slate-700"
                            value={liveNotes}
                            onChange={(e) => setLiveNotes(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => handleSaveSubDashboardDetails(job._id)}
                          className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold uppercase tracking-wider text-[10px] py-1.5 px-3 rounded transition-all"
                        >
                          Save Changes
                        </button>
                      </div>

                      {/* Professional Progress Flow Timeline */}
                      <div className="border-t border-slate-900 pt-3 space-y-2">
                        <p className="text-slate-500 uppercase font-bold text-[10px] tracking-wider">Application Timeline History:</p>
                        
                        <div className="flex items-center gap-2.5 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          <span className="text-slate-400 font-medium">Record Created:</span>
                          <span className="text-slate-400">Application saved to tracking log.</span>
                          <span className="text-slate-600 text-[10px]">({new Date(job.createdAt || Date.now()).toLocaleDateString()})</span>
                        </div>

                        {job.interviewDate && (
                          <div className="flex items-center gap-2.5 text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            <span className="text-slate-300 font-medium">Interview Event Added:</span>
                            <span className="text-slate-400">Scheduled for <span className="text-amber-400 font-bold">{new Date(job.interviewDate).toLocaleDateString()}</span></span>
                          </div>
                        )}

                        {job.notes && (
                          <div className="flex items-start gap-2.5 text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-1.5"></span>
                            <div className="text-slate-400">
                              <span className="font-medium text-slate-300">Latest Follow-up Note:</span> "{job.notes}"
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-2.5 text-[11px]">
                          <span className={`w-1.5 h-1.5 rounded-full ${job.status === 'Accepted' ? 'bg-emerald-500' : job.status === 'Rejected' ? 'bg-red-500' : 'bg-slate-700'}`}></span>
                          <span className="font-medium text-slate-400">Current Progress State:</span>
                          <span className={job.status === 'Accepted' ? 'text-emerald-400 font-bold' : job.status === 'Rejected' ? 'text-red-400' : 'text-slate-400'}>
                            {job.status === 'Accepted' ? 'Success — Position Offer Received' : job.status === 'Rejected' ? 'Process concluded by employer' : 'Awaiting feedback or next round updates'}
                          </span>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;