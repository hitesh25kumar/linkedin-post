import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { Dashboard } from './pages/Dashboard';
import { CreatePost } from './pages/CreatePost';
import { PostResult } from './pages/PostResult';
import { Posts } from './pages/Posts';
import { Drafts } from './pages/Drafts';
import { Templates } from './pages/Templates';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/" element={<AppShell />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="create" element={<CreatePost />} />
        <Route path="posts" element={<Posts />} />
        <Route path="posts/:id" element={<PostResult />} />
        <Route path="drafts" element={<Drafts />} />
        <Route path="templates" element={<Templates />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
