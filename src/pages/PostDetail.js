import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import PostCard from '../components/PostCard';
import './PostDetail.css';

export default function PostDetail() {
  const { slug } = useParams();
  const { getPublished } = useBlog();
  const navigate = useNavigate();
  const posts = getPublished();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="container" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: '2rem' }}>Post not found</h2>
        <Link to="/" style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', marginTop: '1rem', display: 'inline-block' }}>← Back home</Link>
      </div>
    );
  }

  const related = posts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2);

  return (
    <div className="post-detail page-enter">
      {/* Hero image */}
      {post.image && (
        <div className="post-hero">
          <img src={post.image} alt={post.title} />
          <div className="post-hero-overlay" />
        </div>
      )}

      <div className="container-narrow">
        {/* Breadcrumb */}
        <nav className="post-breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to={`/category/${post.category.toLowerCase()}`}>{post.category}</Link>
        </nav>

        {/* Header */}
        <header className="post-header">
          <span className="post-category-badge">{post.category}</span>
          <h1 className="post-title">{post.title}</h1>
          <p className="post-excerpt">{post.excerpt}</p>
          <div className="post-meta">
            <div className="post-author">
              <div className="author-avatar">{post.author.charAt(0)}</div>
              <div>
                <div className="author-name">{post.author}</div>
                <time className="post-date">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </time>
              </div>
            </div>
            <div className="post-tags">
              {post.tags?.map(tag => <span key={tag} className="tag">#{tag}</span>)}
            </div>
          </div>
        </header>

        <div className="ornament">✦</div>

        {/* Content */}
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="ornament">· · ·</div>

        {/* Back */}
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="related-posts">
          <div className="container">
            <div className="ornament">More in {post.category}</div>
            <div className="posts-grid-related">
              {related.map(p => <PostCard key={p.id} post={p} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
