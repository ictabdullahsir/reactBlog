import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import PostCard from '../components/PostCard';
import './Home.css';

export default function Home() {
  const { getPublished, getFeatured, categories } = useBlog();
  const published = getPublished();
  const featured = getFeatured();
  const hero = featured[0];
  const rest = published.filter(p => p.id !== hero?.id);

  return (
    <div className="home page-enter">
      {/* Hero */}
      {hero && (
        <section className="hero">
          <div className="hero-bg" style={{ backgroundImage: `url(${hero.image})` }} />
          <div className="hero-overlay" />
          <div className="container hero-content">
            <span className="hero-category">{hero.category}</span>
            <h1 className="hero-title">{hero.title}</h1>
            <p className="hero-excerpt">{hero.excerpt}</p>
            <div className="hero-meta">
              <span>{hero.author}</span>
              <span>·</span>
              <time>{new Date(hero.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
            </div>
            <Link to={`/post/${hero.slug}`} className="hero-btn">Read the essay →</Link>
          </div>
        </section>
      )}

      {/* Category pills */}
      <section className="category-bar container">
        <Link to="/" className="cat-pill active">All</Link>
        {categories.map(cat => (
          <Link key={cat} to={`/category/${cat.toLowerCase()}`} className="cat-pill">{cat}</Link>
        ))}
      </section>

      {/* Featured row */}
      {featured.length > 1 && (
        <section className="section container">
          <div className="ornament">Featured</div>
          <div className="posts-grid featured-grid">
            {featured.slice(1).map(p => <PostCard key={p.id} post={p} featured />)}
          </div>
        </section>
      )}

      {/* All posts */}
      <section className="section container">
        <div className="ornament">Latest Essays</div>
        <div className="posts-grid">
          {rest.map(p => <PostCard key={p.id} post={p} />)}
        </div>
        {published.length === 0 && (
          <p className="empty-state">No posts yet. <Link to="/admin">Go to admin →</Link></p>
        )}
      </section>
    </div>
  );
}
