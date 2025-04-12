import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage';
import { UserProvider } from './context/UserContext';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
)
