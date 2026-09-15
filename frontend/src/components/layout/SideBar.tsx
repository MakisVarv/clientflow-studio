import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-800 text-white p-6">
      <h1 className="text-2xl font-bold mb-8">ClientFlow</h1>

      <nav className="flex flex-col gap-4">
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/companies">Companies</Link>

        <Link to="/contacts">Contacts</Link>

        <Link to="/leads">Leads</Link>

        <Link to="/deals">Deals</Link>

        <Link to="/tasks">Tasks</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
