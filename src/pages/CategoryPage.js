import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import PostCard from '../components/PostCard';
import './CategoryPage.css';

export default function CategoryPage() {
  const { cat } = useParams();
  const { getPublished } = useBlog();
  const posts = getPublished().filter(p => p.category.toLowerCase() === cat.toLowerCase());
  const label = cat.charAt(0).toUpperCase() + cat.slice(1);

  return (
    <div className="category-page page-enter">
      <div className="category-header">
        <div className="container">
          <nav className="post-breadcrumb">
            <Link to="/">Home</Link><span>›</span><span>{label}</span>
          </nav>
          <h1>{label}</h1>
          <p>{posts.length} {posts.length === 1 ? 'essay' : 'essays'}</p>
        </div>
      </div>
      <div className="container" style={{ padding: '3rem 2rem' }}>
        {posts.length > 0 ? (
          <div className="posts-grid-cat">
            {posts.map(p => <PostCard key={p.id} post={p} />)}
          </div>
        ) : (
          <p className="empty-state">No posts in this category yet.</p>
        )}
      </div>
    </div>
  );
}
