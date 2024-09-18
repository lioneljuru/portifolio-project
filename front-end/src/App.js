import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//👇🏻 component
import Header from './components/Header';
import Footer from './components/Footer';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from './pages/Home'; // Event Viewing and filtering
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import CalendarPage from './pages/CalendarPage';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <EventProvider>
            <Header />
            <Routes>
              {/* Public routes */}
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Signup />} />

              {/* Private routes */}
              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/calendar" element={<PrivateRoute><CalendarPage /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            </Routes>
            <Footer />
            <ToastContainer />
          </EventProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}