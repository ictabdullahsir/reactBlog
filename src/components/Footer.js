import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">✒ The Inkwell</Link>
            <p>A journal for ideas that resist easy summary. Published when ready, not on schedule.</p>
          </div>
          <div className="footer-links">
            <h4>Explore</h4>
            <Link to="/category/culture">Culture</Link>
            <Link to="/category/psychology">Psychology</Link>
            <Link to="/category/design">Design</Link>
            <Link to="/category/writing">Writing</Link>
          </div>
          <div className="footer-links">
            <h4>Meta</h4>
            <Link to="/admin/login">Admin Login</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} The Inkwell. All rights reserved.</p>
          <p className="footer-credit">Built with React</p>
        </div>
      </div>
    </footer>
  );
}
