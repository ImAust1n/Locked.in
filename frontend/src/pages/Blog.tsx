
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { AiAssistant } from "../components/ui/AiAssistant";
import { Search, Tag, User, Clock, Heart, BookOpen, Share2 } from "lucide-react";
import { useState } from "react";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Mock blog data
  const featuredBlog = {
    id: 1,
    title: "Mental Toughness: The Ultimate Guide to Building an Unbreakable Mind",
    excerpt: "Discover the psychological techniques elite athletes use to push through barriers and achieve peak performance.",
    author: "Dr. Sarah Johnson",
    date: "May 5, 2025",
    readTime: "15 min read",
    likes: 342,
    category: "Motivation",
    image: "https://placehold.co/800x400/0a0a0a/39FF14?text=Mental+Toughness",
    tags: ["mindset", "psychology", "performance"]
  };
  
  const blogs = [
    {
      id: 2,
      title: "The Science of Muscle Growth: What We Know in 2025",
      excerpt: "New research reveals the optimal training protocols for hypertrophy across different body types.",
      author: "James Chen, MSc",
      date: "April 28, 2025",
      readTime: "12 min read",
      likes: 287,
      category: "Training Tips",
      image: "https://placehold.co/600x400/0a0a0a/39FF14?text=Muscle+Growth",
      tags: ["hypertrophy", "strength", "science"]
    },
    {
      id: 3,
      title: "Recovery Strategies That Actually Work, According to Science",
      excerpt: "Separate fact from fiction with evidence-based approaches to optimize your recovery between training sessions.",
      author: "Dr. Michael Rodriguez",
      date: "April 22, 2025",
      readTime: "9 min read",
      likes: 215,
      category: "Recovery & Rest",
      image: "https://placehold.co/600x400/0a0a0a/39FF14?text=Recovery+Strategies",
      tags: ["recovery", "sleep", "nutrition"]
    },
    {
      id: 4,
      title: "From Amateur to Olympic Gold: The Madison Carter Interview",
      excerpt: "Exclusive interview with Olympic champion Madison Carter on her incredible journey and training philosophy.",
      author: "Alex Thompson",
      date: "April 15, 2025",
      readTime: "18 min read",
      likes: 432,
      category: "Athlete Interviews",
      image: "https://placehold.co/600x400/0a0a0a/39FF14?text=Olympic+Interview",
      tags: ["olympian", "interview", "inspiration"]
    },
    {
      id: 5,
      title: "The Breakthrough Moment: Finding Your Why in Fitness",
      excerpt: "How to discover and leverage your deep motivation to stay consistent with your training regimen.",
      author: "Emma Park, CPT",
      date: "April 8, 2025",
      readTime: "11 min read",
      likes: 198,
      category: "Motivation",
      image: "https://placehold.co/600x400/0a0a0a/39FF14?text=Breakthrough+Moment",
      tags: ["motivation", "consistency", "mindset"]
    },
    {
      id: 6,
      title: "Progressive Overload: The Key Principle You're Overlooking",
      excerpt: "Master the fundamentals of progression to ensure continuous improvement in your strength and physique.",
      author: "Chris Johnson, CSCS",
      date: "March 30, 2025",
      readTime: "13 min read",
      likes: 276,
      category: "Training Tips",
      image: "https://placehold.co/600x400/0a0a0a/39FF14?text=Progressive+Overload",
      tags: ["strength", "programming", "technique"]
    },
    {
      id: 7,
      title: "Sleep Science: The Unsung Hero of Athletic Performance",
      excerpt: "How optimizing your sleep can dramatically improve your recovery, performance, and body composition.",
      author: "Dr. Lisa Zhang",
      date: "March 24, 2025",
      readTime: "14 min read",
      likes: 301,
      category: "Recovery & Rest",
      image: "https://placehold.co/600x400/0a0a0a/39FF14?text=Sleep+Science",
      tags: ["sleep", "recovery", "hormones"]
    }
  ];

  const categories = ['all', 'Motivation', 'Training Tips', 'Recovery & Rest', 'Athlete Interviews'];
  const popularTags = ['mindset', 'strength', 'nutrition', 'recovery', 'motivation', 'technique'];

  const filteredBlogs = activeCategory === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-3">
            <span className="text-white">MINDSET, MUSCLES </span>
            <span className="text-glow-green">& MORE</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Expert insights, science-based articles, and inspirational stories to support your fitness journey.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="pl-10 pr-4 py-2 bg-black/50 border border-white/10 rounded-md w-full md:w-80"
            />
            <Search size={18} className="absolute top-2.5 left-3 text-gray-400" />
          </div>
          
          <div className="flex overflow-x-auto space-x-2 w-full md:w-auto pb-2">
            {categories.map(category => (
              <button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-glow-green/20 text-glow-green border border-glow-green/50'
                    : 'bg-secondary/50 text-gray-300 hover:bg-secondary/70'
                }`}
              >
                {category === 'all' ? 'All Posts' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        <div className="relative glow-card overflow-hidden mb-12 group border-glow-green/50">
          <img 
            src={featuredBlog.image} 
            alt={featuredBlog.title}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="mb-2">
              <span className="bg-glow-green/90 text-black text-xs px-2 py-1 rounded-full">FEATURED</span>
              <span className="ml-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">{featuredBlog.category}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-glow-green transition-colors">
              {featuredBlog.title}
            </h2>
            <p className="text-gray-300 mb-4 max-w-3xl">{featuredBlog.excerpt}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <User size={16} className="text-gray-400 mr-1" />
                <span className="text-gray-400 text-sm mr-4">{featuredBlog.author}</span>
                <Clock size={16} className="text-gray-400 mr-1" />
                <span className="text-gray-400 text-sm">{featuredBlog.readTime}</span>
              </div>
              <div className="flex items-center">
                <button className="text-gray-400 hover:text-glow-red flex items-center mr-3">
                  <Heart size={18} className="mr-1" />
                  <span>{featuredBlog.likes}</span>
                </button>
                <button className="text-gray-400 hover:text-glow-green">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog posts */}
          <div className="col-span-1 md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBlogs.map(blog => (
                <div key={blog.id} className="glow-card overflow-hidden group hover:border-glow-green transition-all duration-300">
                  <div className="relative">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-glow-green transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {blog.tags.map(tag => (
                        <span key={tag} className="text-xs bg-secondary/50 text-gray-300 px-2 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-xs text-gray-400">
                        <User size={12} className="mr-1" />
                        <span className="mr-3">{blog.author}</span>
                        <Clock size={12} className="mr-1" />
                        <span>{blog.readTime}</span>
                      </div>
                      <div className="flex items-center">
                        <button className="text-gray-400 hover:text-glow-red flex items-center mr-2 text-xs">
                          <Heart size={14} className="mr-1" />
                          <span>{blog.likes}</span>
                        </button>
                        <button className="text-gray-400 hover:text-glow-green text-xs">
                          <Share2 size={14} />
                        </button>
                      </div>
                    </div>
                    <button className="w-full mt-4 py-2 bg-black border border-glow-green/50 text-white rounded-md hover:bg-glow-green/10 transition-colors">
                      Read Article
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-1">
            {/* Popular Tags */}
            <div className="glow-card p-5 mb-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Tag size={18} className="mr-2 text-glow-green" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <button key={tag} className="text-sm bg-secondary/50 text-gray-300 px-3 py-1.5 rounded-full hover:bg-glow-green/20 hover:text-white transition-colors">
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="glow-card p-5 mb-6">
              <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
              <p className="text-sm text-gray-400 mb-4">Get the latest articles and tips delivered to your inbox.</p>
              <input 
                type="email"
                placeholder="Your email address"
                className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2 mb-3"
              />
              <button className="w-full py-2 bg-glow-green text-black font-medium rounded-md hover:bg-glow-green/90 transition-colors">
                Subscribe
              </button>
            </div>

            {/* Reading List */}
            <div className="glow-card p-5">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <BookOpen size={18} className="mr-2 text-glow-green" />
                Reading List
              </h3>
              <ul className="space-y-4">
                {blogs.slice(0, 3).map(blog => (
                  <li key={blog.id} className="flex items-start gap-3">
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h4 className="text-sm font-medium hover:text-glow-green transition-colors cursor-pointer">
                        {blog.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">{blog.readTime}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <AiAssistant />
    </div>
  );
};

export default Blog;
