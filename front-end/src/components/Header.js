// src/components/Header.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import '../styles/Header.css'; // For optional styling

function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <h2>Scheduler App</h2>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/calendar">Calendar</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          {/* Show user info and logout if logged in */}
          {user ? (
            <li>
              {/*<span>Welcome, {user.username}!</span>*/}
              <button onClick={logout}>Logout</button>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>{'/'}
              <Link to="/register">Signup</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
