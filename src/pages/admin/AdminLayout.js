import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';

export default function AdminLayout({ children }) {
  const { logout } = useBlog();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  const nav = [
    { label: 'Dashboard', icon: '◈', path: '/admin' },
    { label: 'All Posts', icon: '▤', path: '/admin/posts' },
    { label: 'New Post', icon: '+', path: '/admin/posts/new' },
  ];

  return (
    <div className={`admin-layout ${collapsed ? 'collapsed' : ''}`}>
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo">✒ {!collapsed && 'Inkwell'}</Link>
          <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)} title="Toggle sidebar">
            {collapsed ? '→' : '←'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {nav.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
              title={collapsed ? item.label : ''}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="sidebar-link" title="View Blog">
            <span className="sidebar-icon">↗</span>
            {!collapsed && <span>View Blog</span>}
          </Link>
          <button className="sidebar-link sidebar-logout" onClick={handleLogout} title="Logout">
            <span className="sidebar-icon">⏻</span>
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
