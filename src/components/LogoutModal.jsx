import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LogoutModal = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    // localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-xl transform transition-all">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Confirm Logout</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to exit?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            No
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;