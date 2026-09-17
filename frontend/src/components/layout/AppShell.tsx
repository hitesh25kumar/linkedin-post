import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAppStore } from '../../store';
import { ToastContainer } from '../common/Toast';

export function AppShell() {
  const { isAuthenticated, loadInitialData } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  useEffect(() => {
    const user = localStorage.getItem('linkedin_agent_auth');
    if (!user) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex h-screen bg-mesh overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Header />
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 sm:py-8 relative">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
