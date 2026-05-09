import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import AdminLayout from './AdminLayout';
import './Admin.css';

export default function AdminDashboard() {
  const { posts, getPublished, getFeatured } = useBlog();
  const published = getPublished();
  const featured = getFeatured();
  const drafts = posts.filter(p => !p.published);
  const recent = [...posts].sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <AdminLayout>
      <div className="admin-page page-enter">
        <div className="admin-topbar">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, Admin</p>
          </div>
          <Link to="/admin/posts/new" className="btn btn-primary">+ New Post</Link>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Posts</div>
            <div className="stat-value">{posts.length}</div>
          </div>
          <div className="stat-card accent-red">
            <div className="stat-label">Published</div>
            <div className="stat-value">{published.length}</div>
          </div>
          <div className="stat-card accent-gold">
            <div className="stat-label">Featured</div>
            <div className="stat-value">{featured.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Drafts</div>
            <div className="stat-value">{drafts.length}</div>
          </div>
        </div>

        <div className="posts-table-wrap">
          <div className="table-header">
            <h2>Recent Posts</h2>
            <Link to="/admin/posts" className="btn btn-secondary">View all →</Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recent.map(p => (
                <tr key={p.id}>
                  <td className="td-title">{p.title}</td>
                  <td className="td-cat">{p.category}</td>
                  <td>
                    <span className={`badge ${p.published ? 'badge-published' : 'badge-draft'}`}>
                      {p.published ? '● Published' : '○ Draft'}
                    </span>
                    {p.featured && <span className="badge badge-featured">★ Featured</span>}
                  </td>
                  <td style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--ink-muted)' }}>{p.date}</td>
                  <td className="td-actions">
                    <Link to={`/admin/posts/edit/${p.id}`} className="btn btn-secondary" style={{ padding: '0.3rem 0.7rem', fontSize: '0.78rem' }}>Edit</Link>
                    <Link to={`/post/${p.slug}`} className="btn btn-secondary" style={{ padding: '0.3rem 0.7rem', fontSize: '0.78rem' }}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
