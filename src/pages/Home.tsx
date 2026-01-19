import React, { useState, useMemo } from 'react';
import { ChevronRight, Search, Plus, Menu, X, TrendingUp, Clock, BookOpen, Filter } from 'lucide-react';

// Mock data for demonstration
const mockBlogs = [
  {
    id: '1',
    title: 'Advanced Financial Reporting Strategies for 2026',
    description: 'Learn the latest IFRS updates and how they impact your financial statements',
    category: 'Financial Reporting',
    tags: ['IFRS', 'Accounting', 'Financial Statements'],
    coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    author: { name: 'Priya Sharma', avatar: 'PS' },
    date: 'Jan 15, 2026',
    readTime: 8,
    views: 1234,
    trending: true
  },
  {
    id: '2',
    title: 'Tax Planning Guide: Maximize Your Deductions',
    description: 'Essential tax planning strategies every CA should know',
    category: 'Taxation',
    tags: ['Tax', 'Planning', 'Deductions'],
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    author: { name: 'Rahul Verma', avatar: 'RV' },
    date: 'Jan 14, 2026',
    readTime: 6,
    views: 892
  },
  {
    id: '3',
    title: 'Audit Excellence: Best Practices for 2026',
    description: 'Modern auditing techniques and digital transformation in audit practices',
    category: 'Audit',
    tags: ['Audit', 'Best Practices', 'Digital'],
    coverImage: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80',
    author: { name: 'Anita Desai', avatar: 'AD' },
    date: 'Jan 13, 2026',
    readTime: 10,
    views: 2341,
    trending: true
  },
  {
    id: '4',
    title: 'GST Updates and Compliance Checklist',
    description: 'Stay updated with the latest GST amendments and compliance requirements',
    category: 'Taxation',
    tags: ['GST', 'Compliance', 'Updates'],
    coverImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    author: { name: 'Vikram Singh', avatar: 'VS' },
    date: 'Jan 12, 2026',
    readTime: 5,
    views: 567
  },
  {
    id: '5',
    title: 'Corporate Restructuring: A Complete Guide',
    description: 'Navigate complex corporate restructuring with confidence',
    category: 'Corporate Law',
    tags: ['Corporate', 'Restructuring', 'M&A'],
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    author: { name: 'Meera Patel', avatar: 'MP' },
    date: 'Jan 11, 2026',
    readTime: 12,
    views: 1456
  },
  {
    id: '6',
    title: 'Financial Analytics: Data-Driven Decision Making',
    description: 'Leverage data analytics for better financial insights',
    category: 'Financial Reporting',
    tags: ['Analytics', 'Data', 'Finance'],
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    author: { name: 'Arjun Mehta', avatar: 'AM' },
    date: 'Jan 10, 2026',
    readTime: 7,
    views: 789
  }
];

export const Home = () => {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('latest');

  const blogs = mockBlogs;
  const loading = false;
  const error = null;

  const categories = useMemo(() => 
    Array.from(new Set(blogs.map(blog => blog.category))),
    [blogs]
  );

  const filteredAndSortedBlogs = useMemo(() => {
    let filtered = blogs.filter(blog => {
      const matchesSearch = 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = !selectedCategory || blog.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort blogs
    if (sortBy === 'popular') {
      filtered.sort((a, b) => b.views - a.views);
    } else if (sortBy === 'trending') {
      filtered.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
    }

    return filtered;
  }, [blogs, searchQuery, selectedCategory, sortBy]);

  const selectedBlog = blogs.find(blog => blog.id === selectedBlogId);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (selectedBlog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => setSelectedBlogId(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition font-medium"
            >
              <ChevronRight size={20} className="rotate-180" />
              Back to Articles
            </button>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <img
              src={selectedBlog.coverImage}
              alt={selectedBlog.title}
              className="w-full h-96 object-cover"
            />
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                  {selectedBlog.category}
                </span>
                <span className="text-gray-500 text-sm">{selectedBlog.date}</span>
                <span className="text-gray-500 text-sm">• {selectedBlog.readTime} min read</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{selectedBlog.title}</h1>
              <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold">
                  {selectedBlog.author.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{selectedBlog.author.name}</p>
                  <p className="text-sm text-gray-500">{selectedBlog.views.toLocaleString()} views</p>
                </div>
              </div>
              <div className="prose prose-lg max-w-none mt-8">
                <p className="text-xl text-gray-600 leading-relaxed">{selectedBlog.description}</p>
                <p className="mt-6">Article content would go here...</p>
              </div>
            </div>
          </article>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Enhanced Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => {
                setSelectedBlogId(null);
                setSelectedCategory(null);
                setSearchQuery('');
              }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-lg">📚</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hidden sm:block">
                CA Monk
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <a href="#home" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Home</a>
              <a href="#articles" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Articles</a>
              <a href="#categories" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Categories</a>
              <a href="#about" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">About</a>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
              >
                <Plus size={20} />
                <span className="hidden lg:inline">New Article</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-200 animate-fadeIn">
              <div className="space-y-2 pt-4">
                <a href="#home" className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors">Home</a>
                <a href="#articles" className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors">Articles</a>
                <a href="#categories" className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors">Categories</a>
                <a href="#about" className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors">About</a>
                <button
                  onClick={() => {
                    setShowCreateForm(!showCreateForm);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2.5 rounded-xl font-semibold"
                >
                  <Plus size={20} />
                  New Article
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Search */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Knowledge
            </h2>
            <p className="text-purple-100 text-lg md:text-xl max-w-2xl mx-auto">
              Stay ahead with expert insights, guides, and updates for CA professionals
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
              <input
                type="text"
                placeholder="Search articles, categories, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-xl text-lg"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold">{blogs.length}</div>
              <div className="text-purple-200 text-sm">Articles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{categories.length}</div>
              <div className="text-purple-200 text-sm">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-purple-200 text-sm">Readers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {showCreateForm && (
          <div className="mb-12 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Article</h2>
              <div className="text-center py-12 text-gray-500">
                Create form component would go here...
              </div>
            </div>
          </div>
        )}

        {/* Filters and Sort */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-xl hover:border-purple-600 transition-colors font-medium"
            >
              <Filter size={18} />
              Filters
            </button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white border-2 border-gray-300 rounded-xl hover:border-purple-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="latest">Latest</option>
              <option value="popular">Most Popular</option>
              <option value="trending">Trending</option>
            </select>
          </div>

          <div className="text-sm text-gray-600 font-medium">
            Showing {filteredAndSortedBlogs.length} of {blogs.length} articles
          </div>
        </div>

        {/* Category Pills */}
        {(showFilters || selectedCategory) && (
          <div className="mb-8 animate-fadeIn" id="categories">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold text-sm ${
                  selectedCategory === null
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-purple-600 hover:text-purple-600'
                }`}
              >
                All Categories
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold text-sm ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
                      : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-purple-600 hover:text-purple-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl animate-pulse border border-gray-200 overflow-hidden">
                <div className="h-52 bg-gray-300"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-300 rounded w-4/5"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div id="articles">
            {filteredAndSortedBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedBlogs.map((blog) => (
                  <article
                    key={blog.id}
                    onClick={() => setSelectedBlogId(blog.id)}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-purple-300 hover:-translate-y-1"
                  >
                    <div className="relative overflow-hidden h-52 bg-gray-200">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-purple-700 rounded-full text-xs font-bold shadow-lg">
                          {blog.category}
                        </span>
                        {blog.trending && (
                          <span className="px-3 py-1 bg-orange-500/95 backdrop-blur-sm text-white rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                            <TrendingUp size={12} />
                            Trending
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span className="font-medium">{blog.readTime} min</span>
                        </div>
                        <span>•</span>
                        <span className="font-medium">{blog.date}</span>
                        <span>•</span>
                        <span className="font-medium">{blog.views} views</span>
                      </div>
                      <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2 leading-tight">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {blog.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                            {blog.author.avatar}
                          </div>
                          <span className="text-sm font-semibold text-gray-700">{blog.author.name}</span>
                        </div>
                        <ChevronRight size={20} className="text-purple-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📚</div>
                <p className="text-gray-500 text-xl font-medium">No articles found matching your search.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                  className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-400 mt-20" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">📚</span>
                </div>
                <h3 className="text-white font-bold text-xl">CA Monk</h3>
              </div>
              <p className="text-sm leading-relaxed">Empowering the next generation of financial leaders with knowledge, tools, and community.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Webinars</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Case Studies</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Guidelines</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Platform</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Practice Tests</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Mentorship</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Job Board</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Connect</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2026 CA Monk. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};