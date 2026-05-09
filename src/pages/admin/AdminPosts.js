import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import AdminLayout from './AdminLayout';
import './Admin.css';

export default function AdminPosts() {
  const { posts, deletePost, updatePost } = useBlog();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = posts
    .filter(p => {
      if (filter === 'published') return p.published;
      if (filter === 'draft') return !p.published;
      if (filter === 'featured') return p.featured;
      return true;
    })
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (post) => {
    if (window.confirm(`Delete "${post.title}"? This cannot be undone.`)) {
      deletePost(post.id);
    }
  };

  const togglePublish = (post) => {
    updatePost(post.id, { published: !post.published });
  };

  return (
    <AdminLayout>
      <div className="admin-page page-enter">
        <div className="admin-topbar">
          <div>
            <h1>All Posts</h1>
            <p>{posts.length} total posts</p>
          </div>
          <Link to="/admin/posts/new" className="btn btn-primary">+ New Post</Link>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {['all','published','draft','featured'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="btn btn-secondary"
              style={{ background: filter === f ? 'var(--ink)' : '', color: filter === f ? 'var(--paper)' : '' }}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="posts-table-wrap">
          <div className="table-header">
            <h2>Posts ({filtered.length})</h2>
            <input
              className="search-input"
              placeholder="Search posts…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--ink-muted)', padding: '3rem' }}>No posts found</td></tr>
              )}
              {filtered.map(p => (
                <tr key={p.id}>
                  <td className="td-title">
                    {p.title}
                    {p.featured && <span className="badge badge-featured" style={{ marginLeft: '0.5rem' }}>★</span>}
                  </td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>{p.author}</td>
                  <td className="td-cat">{p.category}</td>
                  <td>
                    <button onClick={() => togglePublish(p)}
                      className={`badge ${p.published ? 'badge-published' : 'badge-draft'}`}
                      style={{ cursor: 'pointer', border: 'none', padding: '0.25rem 0.7rem' }}
                      title="Click to toggle">
                      {p.published ? '● Published' : '○ Draft'}
                    </button>
                  </td>
                  <td style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--ink-muted)' }}>{p.date}</td>
                  <td className="td-actions">
                    <Link to={`/admin/posts/edit/${p.id}`} className="btn btn-secondary" style={{ padding: '0.3rem 0.7rem', fontSize: '0.78rem' }}>Edit</Link>
                    {p.published && <Link to={`/post/${p.slug}`} className="btn btn-secondary" style={{ padding: '0.3rem 0.7rem', fontSize: '0.78rem' }} target="_blank">View</Link>}
                    <button onClick={() => handleDelete(p)} className="btn btn-danger" style={{ padding: '0.3rem 0.7rem', fontSize: '0.78rem' }}>Del</button>
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
