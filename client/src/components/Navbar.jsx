import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-400 tracking-wide cursor-pointer" onClick={() => navigate('/')}>
        TRACKFLOW // <span className="text-white text-sm font-medium">Job Engine</span>
      </h1>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-slate-300 text-sm font-medium">System Operator: <b className="text-white">{user.name}</b></span>
          <button 
            onClick={handleLogout} 
            className="bg-red-500/10 border border-red-500/30 hover:bg-red-500 text-red-400 hover:text-white px-4 py-1.5 rounded text-xs uppercase tracking-wider font-semibold transition"
          >
            Disconnect
          </button>
        </div>
      )}
    </nav>
  );
}