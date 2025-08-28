import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { GiSkills } from 'react-icons/gi';
import { IoLogOut } from 'react-icons/io5';
import { GrArticle } from 'react-icons/gr';
import { FcSettings } from 'react-icons/fc';
import { FaSection } from 'react-icons/fa6';
import { FaCertificate } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from '../../components/ThemeToggle';
import { GoProject, GoWorkflow } from 'react-icons/go';
import { BiMenu, BiSolidDashboard } from 'react-icons/bi';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin',
    icon: <BiSolidDashboard size={20} />
  },
  {
    id: 'projects',
    label: 'Projects',
    path: '/admin/projects',
    icon: <GoProject size={20} />
  },
  {
    id: 'skills',
    label: 'Skills',
    path: '/admin/skills',
    icon: <GiSkills size={20} />
  },
  {
    id: 'blog',
    label: 'Blog Posts',
    path: '/admin/blogs',
    icon: <GrArticle size={20} />
  },
  {
    id: 'certificates',
    label: 'Certificates',
    path: '/admin/certificates',
    icon: <FaCertificate size={20} />
  },
  {
    id: 'experience',
    label: 'Experience',
    path: '/admin/experience',
    icon: <GoWorkflow size={20} />
  },
  {
    id: 'hero-section',
    label: 'Hero Section',
    path: '/admin/hero-section',
    icon: <FaSection size={20} />
  },
  {
    id: 'about-section',
    label: 'About Section',
    path: '/admin/about-section',
    icon: <FaSection size={20} />
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/admin/settings',
    icon: <FcSettings size={20} />
  }
];

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActiveRoute = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <CgClose size={20} />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                  ${isActiveRoute(item.path)
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }
                `}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          {/* User section */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Account
            </div>
            <div className="mt-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="font-medium">{user?.name || 'Admin User'}</div>
              <div className="text-gray-500 dark:text-gray-400">{user?.email}</div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-2 w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-md transition-colors duration-200"
            >
              <span className="mr-3">
                <IoLogOut size={20} />
              </span>
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <BiMenu size={25} />
            </button>

            <div className="flex items-center space-x-4 ml-auto">
              <ThemeToggle />
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Welcome back, <span className="font-medium">{user?.name || 'Admin'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
