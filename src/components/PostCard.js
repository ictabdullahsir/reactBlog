import React from 'react';
import { Link } from 'react-router-dom';
import './PostCard.css';

export default function PostCard({ post, featured = false }) {
  return (
    <article className={`post-card ${featured ? 'featured' : ''}`}>
      {post.image && (
        <Link to={`/post/${post.slug}`} className="card-image-wrap">
          <img src={post.image} alt={post.title} loading="lazy" />
          <span className="card-category">{post.category}</span>
        </Link>
      )}
      <div className="card-body">
        <div className="card-meta">
          <span className="card-author">{post.author}</span>
          <span className="card-dot">·</span>
          <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
        </div>
        <h2 className="card-title">
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="card-excerpt">{post.excerpt}</p>
        <Link to={`/post/${post.slug}`} className="card-read-more">
          Read essay <span>→</span>
        </Link>
      </div>
    </article>
  );
}
