import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap the app and provide authentication data
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // This will store the logged-in user
  const navigate = useNavigate(); // Use navigate in context for redirection
  const [loading, setLoading] = useState(true); // To track if auth check is complete

  // On mount, check if user data exists in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Restore user data from localStorage if present
    }
    setLoading(false); // Auth check is complete
  }, []);

  // Function to handle user signup
  const signup = (email, password, username) => {
    // Here you would usually call your API to sign up the user
    // For now, let's mock this
    const userData = { email, username }; // Mock user data
    setUser(userData); // If signup is successful, store the user object
    localStorage.setItem('user', JSON.stringify(userData));

    // Redirect to the home page or dashboard
    navigate('/login');

    return true;
  };

  // Function to handle user login
  const login = (email, password) => {
    // Here you would usually call your API to verify the user
    // For now, let's mock this
    if (email && password) {
      const userData = { email }; // Mock user data
      setUser(userData); // If login is successful, store the user object
      localStorage.setItem('user', JSON.stringify(userData));

      // Redirect to the home page or dashboard
      navigate('/');

      return true;
    }
    return false; // Return false if authentication fails
  };

  // Function to handle user logout
  const logout = () => {
    // Clear user data from context
    setUser(null);

    // Remove user data from localStorage
    localStorage.removeItem('user');

    // Redirect to login page after logout
    navigate('/login');
  };

  const isAuthenticated = !!user; // Checks if user is not null
  console.log(isAuthenticated);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  )

}
