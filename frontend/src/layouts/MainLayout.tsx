import { Outlet } from 'react-router-dom';

import Header from '../components/layout/Header';
import Sidebar from '../components/layout/SideBar';

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
