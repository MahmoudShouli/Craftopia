import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from './context/UserContext';
import { ToastContainer } from "react-toastify";
import SocketManager from './context/SocketManager';
import "react-toastify/dist/ReactToastify.css";
import 'leaflet/dist/leaflet.css';

import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage';
import Homepage from './pages/Homepage';
import UserPage from './pages/UserPage';
import CrafterPage from './pages/CrafterPage';
import SetPreferencesPage from './pages/SetPreferencesPage';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <SocketManager />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/userprofile" element={<UserPage />} />
          <Route path="/crafterprofile" element={<CrafterPage />} />
          <Route path="/setPreferences" element={<SetPreferencesPage />} />
        </Routes>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
);