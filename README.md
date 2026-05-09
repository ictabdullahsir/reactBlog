# ✒ The Inkwell — React Blog with Admin Panel

A full-featured editorial blog built with React, React Router, and a custom admin panel. No backend needed — all data lives in React state (easy to extend with an API later).

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm installed
- VS Code (recommended)

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm start
```

Opens at **http://localhost:3000**

---

## 🔐 Admin Panel

Visit **http://localhost:3000/admin/login**

| Field    | Value      |
|----------|------------|
| Username | `admin`    |
| Password | `admin123` |

### Admin Features
- **Dashboard** — stats overview, recent posts
- **All Posts** — list, filter, search, publish/unpublish, delete
- **Editor** — create & edit posts with:
  - Title, slug, excerpt, HTML content
  - Category, author, tags
  - Cover image preview
  - Publish / Draft toggle
  - Featured toggle

---

## 📁 Project Structure

```
src/
├── context/
│   └── BlogContext.js      # Global state (posts, auth)
├── components/
│   ├── Navbar.js / .css
│   ├── Footer.js / .css
│   └── PostCard.js / .css
├── pages/
│   ├── Home.js / .css
│   ├── PostDetail.js / .css
│   ├── CategoryPage.js / .css
│   └── admin/
│       ├── AdminLogin.js
│       ├── AdminDashboard.js
│       ├── AdminPosts.js
│       ├── AdminEditor.js
│       ├── AdminLayout.js
│       └── Admin.css
├── App.js
├── index.js
└── index.css
```

---

## ✍️ Writing Posts

In the editor, write content as HTML:

```html
<p>Your paragraph text here.</p>
<h2>A subheading</h2>
<blockquote>A pull quote that stands alone.</blockquote>
<p>More content with <strong>bold</strong> or <em>italic</em> text.</p>
<ul>
  <li>A bullet point</li>
  <li>Another item</li>
</ul>
```

Cover images: use any Unsplash URL ending with `?w=800&q=80`

---

## 🎨 Design

- **Typography**: Playfair Display (headings) + Source Serif 4 (body) + JetBrains Mono (UI)
- **Palette**: Warm ink/paper tones with terracotta accent
- **Theme**: Editorial / literary magazine aesthetic

---

## 🔧 Extending

To persist data, replace `useState` in `BlogContext.js` with:
- **localStorage** for simple persistence
- **Firebase** / **Supabase** for a real backend
- **Express + MongoDB** for a full API

---

Built with ❤️ using React 18 + React Router v6
