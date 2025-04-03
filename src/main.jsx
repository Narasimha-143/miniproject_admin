import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Interview from './components/Interview.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <AuthProvider> 
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AuthProvider>
);
