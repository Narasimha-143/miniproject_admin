import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import QuestionPapers from './components/QuestionPapers';
import Interview from './components/Interview';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
};

const AppContent = () => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      console.log("Verifying token in AppContent...");
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      
      if (!token) {
        setIsAuthenticated(false);
        navigate("/");
        return;
      }

      try {
        const response = await fetch(`http://localhost:9002/auth/verify_admin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          console.log("Token verified successfully.");
          setIsAuthenticated(true);
          navigate("/dashboard");
        } else {
          console.log("Invalid token.");
          setIsAuthenticated(false);
          localStorage.removeItem("token"); // Fix the case of "token"
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/question-papers"
        element={
          <ProtectedRoute>
            <QuestionPapers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interview-experience"
        element={
          <ProtectedRoute>
            <Interview />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
        <AppContent /> {/* Moved the logic to a separate component */}
    </AuthProvider>
  );
}

export default App;
