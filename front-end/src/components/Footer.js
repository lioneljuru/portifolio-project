// src/components/Footer.js
import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p>&copy; {new Date().getFullYear()} Scheduler App. All rights reserved.</p>
        <div className="footer__links">
          <a className="footer__link">Privacy Policy</a>
          <a className="footer__link">Terms of Service</a>
          <a className="footer__link">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;