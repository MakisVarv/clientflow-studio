import { NavLink } from 'react-router-dom';

import {
  LayoutDashboard,
  Building2,
  Users,
  UserRoundSearch,
  Handshake,
  CheckSquare,
  Activity,
  CalendarDays,
  StickyNote,
  Paperclip,
  BarChart3,
  Kanban,
  Bell,
  UserCog,
  ShieldCheck,
} from 'lucide-react';

function Sidebar() {
  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Companies',
      path: '/companies',
      icon: Building2,
    },
    {
      name: 'Contacts',
      path: '/contacts',
      icon: Users,
    },
    {
      name: 'Leads',
      path: '/leads',
      icon: UserRoundSearch,
    },
    {
      name: 'Deals',
      path: '/deals',
      icon: Handshake,
    },
    {
      name: 'Tasks',
      path: '/tasks',
      icon: CheckSquare,
    },
    {
      name: 'Activities',
      path: '/activities',
      icon: Activity,
    },
    {
      name: 'Calendar',
      path: '/calendar',
      icon: CalendarDays,
    },
    {
      name: 'Notes',
      path: '/notes',
      icon: StickyNote,
    },
    {
      name: 'Attachments',
      path: '/attachments',
      icon: Paperclip,
    },
    {
      name: 'Reports',
      path: '/reports',
      icon: BarChart3,
    },
    {
      name: 'Pipeline',
      path: '/pipeline',
      icon: Kanban,
    },
    {
      name: 'Notifications',
      path: '/notifications',
      icon: Bell,
    },
    {
      name: 'Users',
      path: '/users',
      icon: UserCog,
    },
    {
      name: 'Roles',
      path: '/roles',
      icon: ShieldCheck,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">ClientFlow</h1>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                                flex items-center gap-3
                                px-4 py-3
                                rounded-lg
                                transition-colors
                                ${
                                  isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                }
                                `
              }
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
