import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeCard from './components/WelcomeCard.jsx';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <WelcomeCard
            mainText="Welcome Back!"
            subText="Don’t have an account?"
            buttonText="Sign Up"
          />
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
