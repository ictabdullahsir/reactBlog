import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import './Admin.css';

export default function AdminLogin() {
  const { login, isLoggedIn } = useBlog();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) { navigate('/admin'); return null; }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const ok = login(form.username, form.password);
    setLoading(false);
    if (ok) navigate('/admin');
    else setError('Invalid credentials. Try admin / admin123');
  };

  return (
    <div className="login-screen">
      <div className="login-left">
        <div className="login-brand">
          <Link to="/" className="login-logo">✒ The Inkwell</Link>
          <p>Editorial administration panel</p>
        </div>
        <div className="login-quote">
          <blockquote>
            "The first draft is just you telling yourself the story."
          </blockquote>
          <cite>— Terry Pratchett</cite>
        </div>
      </div>

      <div className="login-right">
        <div className="login-box">
          <h1>Admin Login</h1>
          <p className="login-hint">Default: <code>admin</code> / <code>admin123</code></p>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="field-group">
              <label>Username</label>
              <input
                type="text" value={form.username} autoFocus
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                placeholder="admin"
              />
            </div>
            <div className="field-group">
              <label>Password</label>
              <input
                type="password" value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
              />
            </div>
            {error && <div className="login-error">{error}</div>}
            <button type="submit" className="btn-primary btn-full" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>
          <Link to="/" className="login-back">← Back to blog</Link>
        </div>
      </div>
    </div>
  );
}
