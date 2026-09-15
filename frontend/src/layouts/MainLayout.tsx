import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/SideBar';

function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="min-w-0 flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
