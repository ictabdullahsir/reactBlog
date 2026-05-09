import React, { createContext, useContext, useState } from 'react';

const INITIAL_POSTS = [
  {
    id: 1,
    title: "The Art of Slow Reading in a Fast World",
    slug: "art-of-slow-reading",
    excerpt: "In an age of infinite scroll and bite-sized content, there is radical power in sitting with a difficult book and letting it change you.",
    content: `<p>There is a particular kind of attention that slow reading demands — the same quality of presence required to watch a fire die down to embers, or to listen to someone tell a story they have told before, but differently this time.</p>
<p>We live in an era of information velocity. Newsletters, threads, summaries, TLDRs — the entire apparatus of modern reading culture is oriented toward extraction. What can I take from this text in the least possible time? The book becomes a mine; you go in, get the gold, and get out.</p>
<p>But something is lost in this transaction. When we read slowly — rereading a sentence because it was beautiful, not because we missed something — we begin to notice the texture of language itself. The way a writer chooses one word over another. The rhythm of a long sentence stretching out like an afternoon.</p>
<blockquote>Reading is not just about information transfer. It is about the transformation that happens when one mind fully inhabits another's way of seeing.</blockquote>
<p>This is what slow reading restores: the sense that a text is not a container to be emptied but a place to be inhabited. You can move the furniture around. You can stay longer than expected. You can leave and come back and find it different.</p>
<p>The next time you pick up a book, try reading one chapter as if you had nowhere else to be. As if the sentences were rooms and you had been invited to look around.</p>`,
    category: "Culture",
    tags: ["reading", "mindfulness", "literature"],
    author: "Elena Marsh",
    date: "2025-11-12",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    featured: true,
    published: true,
  },
  {
    id: 2,
    title: "On the Necessity of Boredom",
    slug: "necessity-of-boredom",
    excerpt: "Every great idea I have ever had arrived not during a meeting or a scroll session, but in the suspended nothingness between one thing and the next.",
    content: `<p>I am writing this from a train compartment somewhere between two cities, with no WiFi and a dead phone battery. I have been sitting with my thoughts for two hours now. I have had four ideas I actually want to pursue.</p>
<p>This is not coincidence.</p>
<p>Boredom has a terrible reputation. We treat it as a problem to be solved, an itch to be scratched by any available screen. But boredom is actually a signal: it is the mind announcing that it is ready to generate, not consume.</p>
<p>Neuroscience has been quietly confirming what artists and writers have long known: the brain's default mode network — the system that activates when we are not focused on anything in particular — is where we do our most generative thinking. Daydreaming is not laziness. It is manufacturing.</p>
<p>The smartphone did something subtle and devastating: it eliminated the gaps. The two minutes waiting for coffee. The idle moment before sleep. The commute. These were not dead time — they were where the subconscious did its best editing.</p>
<p>I am not suggesting a romantic return to boredom for its own sake. But I am suggesting that protecting a few minutes each day for genuine nothing — no input, no stimulation, no productivity — might be the most productive thing you do.</p>`,
    category: "Psychology",
    tags: ["creativity", "mindfulness", "focus"],
    author: "James Osei",
    date: "2025-10-28",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    featured: false,
    published: true,
  },
  {
    id: 3,
    title: "Typefaces as Time Machines",
    slug: "typefaces-as-time-machines",
    excerpt: "Before you read a single word, a font has already told you when you are, who is speaking, and whether you should trust them.",
    content: `<p>Garamond is 1530. Times New Roman is a newspaper broadsheet and the faint smell of ink. Helvetica is the optimism of postwar Switzerland, the belief that clarity is a moral act. Comic Sans is 1994 and a very specific kind of earnest mistake.</p>
<p>Typefaces are time capsules. They carry within them the cultural assumptions, production constraints, and aesthetic obsessions of the moment they were designed. When you choose a font, you are not just making a visual decision — you are invoking a lineage.</p>
<p>This is why typography feels emotional in ways that are hard to articulate. When you see a poster set in Futura, something in you responds to the 1920s idealism embedded in its geometry. When you read a novel in Caslon, you are touching the same letter shapes that Benjamin Franklin had set for the Declaration of Independence.</p>
<p>Designers understand this intuitively. The choice of a typeface is always, in part, an argument about history — about which tradition you are situating yourself in, which era you want to invoke, which authority you want to borrow.</p>
<p>The next time a piece of design moves you or unsettles you, look at the type. The feeling is often coming from there.</p>`,
    category: "Design",
    tags: ["typography", "design", "history"],
    author: "Priya Nair",
    date: "2025-09-15",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80",
    featured: true,
    published: true,
  },
  {
    id: 4,
    title: "The Courage of Unfinished Things",
    slug: "courage-of-unfinished-things",
    excerpt: "A draft is not a failure. It is the most honest thing a writer can show you — all the thinking-in-progress that good final drafts are built to conceal.",
    content: `<p>The notebooks of Leonardo da Vinci are full of things he never finished. Studies for paintings that were never painted. Engineering diagrams for machines that were never built. Problems posed and then abandoned mid-sentence, replaced by a new problem, equally abandoned.</p>
<p>We tend to see this as tragedy. All that potential, unrealized. But I wonder if we are reading it wrong.</p>
<p>The unfinished thing is not the absence of completion — it is the presence of process. Leonardo's notebooks show us thinking happening in real time: the wrong turn, the correction, the sudden swerve toward something more interesting. They are more intimate than finished work precisely because they have not been edited into a final position.</p>
<p>There is a particular courage required to show unfinished things. Finished work presents a conclusion; unfinished work reveals the person in the act of figuring something out, which means revealing uncertainty, wrong turns, and the messiness of actual thought.</p>
<p>I keep a folder on my computer called "fragments." It is full of paragraphs that went nowhere, ideas I could not develop, drafts I abandoned. I used to feel guilty about this folder. Lately, I have started to see it differently — as evidence that I am someone who keeps thinking, even when the thinking does not resolve.</p>`,
    category: "Writing",
    tags: ["creativity", "process", "writing"],
    author: "Elena Marsh",
    date: "2025-08-03",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
    featured: false,
    published: true,
  },
];

const INITIAL_CATEGORIES = ["Culture", "Psychology", "Design", "Writing", "Technology", "Travel"];

const BlogContext = createContext(null);

export function BlogProvider({ children }) {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [categories] = useState(INITIAL_CATEGORIES);
  const [adminUser] = useState({ username: 'admin', password: 'admin123' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (username, password) => {
    if (username === adminUser.username && password === adminUser.password) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };
  const logout = () => setIsLoggedIn(false);

  const addPost = (post) => {
    const newPost = { ...post, id: Date.now(), date: new Date().toISOString().split('T')[0] };
    setPosts(prev => [newPost, ...prev]);
    return newPost;
  };

  const updatePost = (id, updates) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deletePost = (id) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const getPublished = () => posts.filter(p => p.published);
  const getFeatured = () => posts.filter(p => p.featured && p.published);

  return (
    <BlogContext.Provider value={{ posts, categories, isLoggedIn, login, logout, addPost, updatePost, deletePost, getPublished, getFeatured }}>
      {children}
    </BlogContext.Provider>
  );
}

export const useBlog = () => useContext(BlogContext);
