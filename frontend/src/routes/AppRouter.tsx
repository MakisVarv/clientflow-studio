import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from '../features/auth/pages/LoginPage';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import MainLayout from '../layouts/MainLayout';
import CompaniesPage from '../features/companies/pages/CompaniesPage';
import ContactsPage from '../features/contacts/pages/ContactsPage';
import LeadsPage from '../features/leads/pages/LeadsPage';
import DealsPage from '../features/deals/pages/DealsPage';
import TasksPage from '../features/tasks/pages/TasksPage';
import ActivitiesPage from '../features/activities/pages/ActivitiesPage';
import CalendarPage from '../features/calendar/pages/CalendarPage';
import NotesPage from '../features/notes/pages/NotesPage';
import AttachmentsPage from '../features/attachments/pages/Attachments';
import ReportsPage from '../features/reports/pages/ReportsPage';
import SearchPage from '../features/search/pages/SearchPage';
import PipelinePage from '../features/pipelines/pages/PipelinePage';
import NotificationsPage from '../features/notifications/pages/NotificationsPage';
import UsersPage from '../features/users/pages/UsersPage';
import RolesPage from '../features/roles/pages/RolesPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/attachments" element={<AttachmentsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/pipeline" element={<PipelinePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route
            path="/notifications"
            element={<NotificationsPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
