import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//👇🏻 component
import Header from './components/Header';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from './pages/Home'; // Event Viewing and filtering
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import PrivateRoute from './components/PrivateRoute';
import CreateEvent from './pages/CreateEvent'; // Event Creation form
import CalendarPage from './pages/CalendarPage'; // Calendar View
//import Profile from "./components/Profile";
//👇🏻 React-Toastify configuration
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
              <Route path="/create-event" element={<PrivateRoute><CreateEvent /></PrivateRoute>} />
            </Routes>
            <ToastContainer />
          </EventProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}