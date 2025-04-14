import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage';
import { UserProvider } from './context/UserContext';
import './index.css'
import UserProfile from './pages/userProfilePage';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/userprofile" element={<UserProfile />} />
          </Routes>

          {/* ✅ Toast Container here */}
          <ToastContainer position="top-right" autoClose={3000} />
        </>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
);