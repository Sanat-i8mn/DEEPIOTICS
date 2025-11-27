import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  featured_image: string;
  short_description: string;
  author_name: string;
  published_date: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/blog-public/all`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      setPosts(data.posts || []);
    } catch (err) {
      setError('Failed to load blog posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (slug: string) => {
    window.location.href = `/blog/${slug}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Latest Posts & Resources</h1>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
                {error}
              </div>
            )}

            {posts.length === 0 && !error ? (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">No blog posts yet. Check back soon!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    onClick={() => handlePostClick(post.slug)}
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                        <img
                          src={post.featured_image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop'}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop';
                          }}
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {post.short_description}
                        </p>
                        <button className="bg-white border-2 border-orange-500 text-orange-500 px-4 py-2 rounded font-semibold hover:bg-orange-500 hover:text-white transition-colors text-sm">
                          READ MORE
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
                
                <button className="bg-orange-500 text-white px-6 py-3 rounded font-semibold hover:bg-orange-600 transition-colors mt-8">
                  View All Posts
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <div className="bg-black text-white p-6 rounded-lg sticky top-24">
              <h3 className="text-xl font-bold mb-6">Categories</h3>
              <ul className="space-y-3">
                <li className="hover:text-orange-500 transition-colors cursor-pointer">AI Development</li>
                <li className="hover:text-orange-500 transition-colors cursor-pointer">Machine Learning</li>
                <li className="hover:text-orange-500 transition-colors cursor-pointer">Data Science</li>
                <li className="hover:text-orange-500 transition-colors cursor-pointer">AI Automation</li>
                <li className="hover:text-orange-500 transition-colors cursor-pointer">Tech Insights</li>
                <li className="hover:text-orange-500 transition-colors cursor-pointer">Case Studies</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
