import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import './Navbar.css';

export default function Navbar() {
  const { categories, isLoggedIn } = useBlog();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner container">
        <Link to="/" className="brand">
          <span className="brand-icon">✒</span>
          <span className="brand-name">The Inkwell</span>
        </Link>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          {categories.slice(0, 4).map(cat => (
            <Link key={cat} to={`/category/${cat.toLowerCase()}`}
              className={location.pathname.includes(cat.toLowerCase()) ? 'active' : ''}>
              {cat}
            </Link>
          ))}
          {isLoggedIn
            ? <Link to="/admin" className="nav-admin">Dashboard</Link>
            : <Link to="/admin/login" className="nav-admin">Admin</Link>
          }
        </nav>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
