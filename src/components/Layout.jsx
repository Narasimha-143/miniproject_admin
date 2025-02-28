import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, MessageSquare, LogOut } from 'lucide-react';
import LogoutModal from './LogoutModal';

export const Layout = ({ children }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/question-papers', icon: FileText, label: 'Question Papers' },
    { path: '/interview-experience', icon: MessageSquare, label: 'Interview Experience' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar with professional theme */}
      <div className="w-64 bg-gradient-to-b from-blue-800 to-blue-900 shadow-lg">
        <div className="p-4">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        </div>
        
        <nav className="mt-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-gray-100 hover:bg-blue-700 transition-colors duration-200 ${
                location.pathname === item.path ? 'bg-blue-700' : ''
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          ))}
          
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="flex items-center w-full px-4 py-3 text-gray-100 hover:bg-blue-700 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </div>
  );
};
