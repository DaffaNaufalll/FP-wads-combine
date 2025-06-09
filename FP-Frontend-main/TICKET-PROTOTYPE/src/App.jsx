import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyDetailsPage from './components/pages/MyDetailsPage';
import CreateTicketPage from './components/pages/CreateTicketPage';
import UserDashboard from './components/pages/UserDashboard';
import ViewTicketsPage from './components/pages/ViewTicketsPage';
import TicketDetailPage from './components/pages/TicketDetailPage';
import EditDetailsPage from './components/pages/EditDetailsPage';
import LoginPage from './components/pages/LoginPage';
import AdminTicketDetailPage from './components/pages/admin/AdminTicketDetailPage';
import AdminUsersPage from './components/pages/admin/AdminUsersPage';
import AdminAgentsPage from './components/pages/admin/AdminAgentsPage';
import AdminReportsPage from './components/pages/admin/AdminReportsPage';
import AdminSettingsPage from './components/pages/admin/AdminSettingsPage';
import AdminDashboard from './components/pages/admin/AdminDashboard';
import AdminTicketsPage from './components/pages/admin/AdminTicketsPage';
import RequireAuth from './RequireAuth';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected user routes */}
        <Route path="/" element={
          <RequireAuth>
            <UserDashboard />
          </RequireAuth>
        } />
        <Route path="/create-ticket" element={
          <RequireAuth>
            <CreateTicketPage />
          </RequireAuth>
        } />
        <Route path="/my-details" element={
          <RequireAuth>
            <MyDetailsPage />
          </RequireAuth>
        } />
        <Route path="/edit-details" element={
          <RequireAuth>
            <EditDetailsPage />
          </RequireAuth>
        } />
        <Route path="/view-tickets" element={
          <RequireAuth>
            <ViewTicketsPage />
          </RequireAuth>
        } />
        <Route path="/ticket/:id" element={
          <RequireAuth>
            <TicketDetailPage />
          </RequireAuth>
        } />

        {/* Protected admin routes */}
        <Route path="/admin" element={
          <RequireAuth>
            <AdminDashboard />
          </RequireAuth>
        } />
        <Route path="/admin/tickets" element={
          <RequireAuth>
            <AdminTicketsPage />
          </RequireAuth>
        } />
        <Route path="/admin/tickets/:id" element={
          <RequireAuth>
            <AdminTicketDetailPage />
          </RequireAuth>
        } />
        <Route path="/admin/users" element={
          <RequireAuth>
            <AdminUsersPage />
          </RequireAuth>
        } />
        <Route path="/admin/agents" element={
          <RequireAuth>
            <AdminAgentsPage />
          </RequireAuth>
        } />
        <Route path="/admin/reports" element={
          <RequireAuth>
            <AdminReportsPage />
          </RequireAuth>
        } />
        <Route path="/admin/settings" element={
          <RequireAuth>
            <AdminSettingsPage />
          </RequireAuth>
        } />
      </Routes>
    </Router>
  );
}

export default App;