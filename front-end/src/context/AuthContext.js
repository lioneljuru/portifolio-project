import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";

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
  const signup = async (email, firstname, lastname, dob, password) => {
    try {
      const response = await axios.post('/auth/signup', { email, firstname, lastname, dob, password });
      const userData = response.data.user;
      setUser(userData); // If signup is successful, store the user object
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success('Signup successful!');
      navigate('/');
    } catch (error) {
      let errorMessage = 'Something went wrong, please try again';
      if (error.response) {
        // The server responded with a status code outside the range of 2xx
        const { data, status, statusText } = error.response;
        switch (status) {
          case 400:
            errorMessage = data.error || 'Bad request, please check your inputs';
            break;
          case 403:
            errorMessage = data.error || 'Email already exists';
            break;
          case 422:
            errorMessage = data.error || 'Please fill all the required fields';
            break;
          default:
            errorMessage = data.error || `Error ${status}: ${statusText}`;
        }
      } else if (error.request) {
        //  Handle network errors, The request was made but no response was received
        errorMessage = "No response from the server, please try again";
      }
      // Something happened in setting up the request that triggered an Error
      toast.error(errorMessage);
      throw error;
    };
  };

  // Function to handle user login
  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth', { email, password });
      const userData = response.data.loggedUser;
      setUser(userData); // If login is successful, store the user object
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success(response.data.message);
      navigate('/');
    } catch (error) {
      let errorMessage = 'Something went wrong, please try again';
      if (error.response) {
        // The server responded with a status code outside the range of 2xx
        errorMessage = error.response.data.error || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        //  Handle network errors, The request was made but no response was received
        errorMessage = "No response from the server, please try again";
      }
      // Something happened in setting up the request that triggered an Error
      toast.error(errorMessage);
      throw error;
    };
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      await axios.post('/auth/logout');
      setUser(null); // If logout is successful, remove the user object
      localStorage.removeItem('user'); // Remove user data from localStorage
      toast.success('Logout successful!');
      navigate('/login');
    } catch (error) {
      let errorMessage = 'Something went wrong, please try again';
      if (error.response) {
        // The server responded with a status code outside the range of 2xx
        errorMessage = error.response.data.error || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        //  Handle network errors, The request was made but no response was received
        errorMessage = "No response from the server, please try again";
      }
      // Something happened in setting up the request that triggered an Error
      toast.error(errorMessage);
      //throw error;
    };
  };

  const isAuthenticated = !!user; // Checks if user is not null

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
