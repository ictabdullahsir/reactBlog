import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import AdminLayout from './AdminLayout';
import './Admin.css';

function slugify(str) {
  return str.toLowerCase().trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function AdminEditor() {
  const { id } = useParams();
  const { posts, addPost, updatePost, categories } = useBlog();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const existing = isEdit ? posts.find(p => p.id === parseInt(id)) : null;

  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', content: '',
    category: categories[0], author: 'Admin',
    image: '', tags: '', featured: false, published: false,
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (existing) {
      setForm({
        ...existing,
        tags: existing.tags?.join(', ') || '',
      });
    }
  }, [existing]);

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const handleTitleChange = (val) => {
    set('title', val);
    if (!isEdit) set('slug', slugify(val));
  };

  const handleSave = (publish = null) => {
    if (!form.title.trim()) { setError('Title is required.'); return; }
    if (!form.slug.trim()) { setError('Slug is required.'); return; }
    setError('');

    const data = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      published: publish !== null ? publish : form.published,
    };

    if (isEdit) {
      updatePost(existing.id, data);
    } else {
      addPost(data);
    }
    setSaved(true);
    setTimeout(() => {
      navigate('/admin/posts');
    }, 800);
  };

  return (
    <AdminLayout>
      <div className="admin-page page-enter">
        <div className="admin-topbar">
          <div>
            <h1>{isEdit ? 'Edit Post' : 'New Post'}</h1>
            <p>
              <Link to="/admin/posts" style={{ color: 'var(--ink-muted)', fontFamily: 'var(--mono)', fontSize: '0.85rem', textDecoration: 'none' }}>← Back to posts</Link>
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button className="btn btn-secondary" onClick={() => handleSave(false)}>Save Draft</button>
            <button className="btn btn-primary" onClick={() => handleSave(true)}>
              {isEdit ? 'Update & Publish' : 'Publish →'}
            </button>
          </div>
        </div>

        {error && <div className="login-error" style={{ marginBottom: '1rem' }}>{error}</div>}
        {saved && <div style={{ background: '#e6f5ec', color: '#1a7a3b', border: '1px solid #b7dfcb', borderRadius: '6px', padding: '0.7rem 1rem', fontSize: '0.88rem', marginBottom: '1rem' }}>✓ Saved! Redirecting…</div>}

        <div className="editor-layout">
          {/* Left: main content */}
          <div>
            <div className="editor-card">
              <div className="field-group">
                <label>Title *</label>
                <input value={form.title} onChange={e => handleTitleChange(e.target.value)} placeholder="Your post title…" style={{ fontSize: '1.1rem', fontFamily: 'var(--serif)', fontWeight: '700' }} />
              </div>
              <div className="field-group">
                <label>Slug</label>
                <input value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="url-friendly-slug" style={{ fontFamily: 'var(--mono)', fontSize: '0.88rem' }} />
              </div>
              <div className="field-group">
                <label>Excerpt / Tagline</label>
                <textarea value={form.excerpt} onChange={e => set('excerpt', e.target.value)} rows={3} placeholder="A compelling one-paragraph summary…" />
              </div>
            </div>

            <div className="editor-card">
              <h3>Content</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginBottom: '0.8rem', fontFamily: 'var(--mono)' }}>
                HTML supported: &lt;p&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;blockquote&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;a&gt;
              </p>
              <textarea
                className="content-area"
                value={form.content}
                onChange={e => set('content', e.target.value)}
                placeholder="<p>Write your post content here using HTML tags…</p>&#10;<blockquote>A great quote stands alone.</blockquote>&#10;<p>Continue your story…</p>"
                rows={20}
                style={{ width: '100%', border: '1px solid var(--border)', borderRadius: '6px', padding: '1rem', fontFamily: 'var(--mono)', fontSize: '0.88rem', lineHeight: '1.65', outline: 'none', resize: 'vertical', background: 'var(--paper)' }}
              />
            </div>
          </div>

          {/* Right: meta */}
          <div>
            <div className="editor-card">
              <h3>Settings</h3>
              <div className="toggle-row">
                <span className="toggle-label">Published</span>
                <label className="toggle">
                  <input type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)} />
                  <span className="toggle-slider" />
                </label>
              </div>
              <div className="toggle-row">
                <span className="toggle-label">Featured</span>
                <label className="toggle">
                  <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} />
                  <span className="toggle-slider" />
                </label>
              </div>
            </div>

            <div className="editor-card">
              <h3>Details</h3>
              <div className="field-group">
                <label>Category</label>
                <select value={form.category} onChange={e => set('category', e.target.value)}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="field-group">
                <label>Author</label>
                <input value={form.author} onChange={e => set('author', e.target.value)} />
              </div>
              <div className="field-group">
                <label>Tags (comma separated)</label>
                <input value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="writing, culture, ideas" />
              </div>
            </div>

            <div className="editor-card">
              <h3>Cover Image</h3>
              <div className="field-group">
                <label>Image URL</label>
                <input value={form.image} onChange={e => set('image', e.target.value)} placeholder="https://images.unsplash.com/…" />
              </div>
              {form.image && (
                <img src={form.image} alt="preview" style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '6px', marginTop: '0.5rem' }} />
              )}
              <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginTop: '0.5rem', fontFamily: 'var(--mono)' }}>
                Tip: use Unsplash URLs with ?w=800
              </p>
            </div>

            <div className="editor-actions">
              <button className="btn btn-secondary btn-full" onClick={() => handleSave(false)}>💾 Save Draft</button>
              <button className="btn btn-primary btn-full" onClick={() => handleSave(true)}>🚀 Publish</button>
              <Link to="/admin/posts" className="btn btn-secondary btn-full" style={{ textAlign: 'center' }}>Cancel</Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
