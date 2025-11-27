import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowLeft } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  featured_image: string;
  short_description: string;
  content: string;
  author_name: string;
  published_date: string;
}

interface BlogDetailPageProps {
  slug: string;
}

export default function BlogDetailPage({ slug }: BlogDetailPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/blog-public/${slug}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('Post not found');
      }

      const data = await response.json();
      setPost(data.post);
    } catch (err) {
      setError('Failed to load blog post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">{error || 'The blog post you are looking for does not exist.'}</p>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <a
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </a>

        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          {post.featured_image && (
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                {post.title} <span className="text-2xl">🔬</span>
              </h1>
            </div>

            <div className="flex items-center gap-6 text-gray-600 mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{post.author_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(post.published_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r">
                <p className="text-lg text-gray-800 leading-relaxed font-medium">
                  {post.short_description}
                </p>
              </div>

              <div className="space-y-6 text-gray-700 leading-relaxed">
                {post.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.trim().startsWith('#')) {
                    return (
                      <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                        {paragraph.replace(/^#+\s*/, '')}
                      </h2>
                    );
                  }
                  if (paragraph.trim().startsWith('•') || paragraph.trim().startsWith('-')) {
                    return (
                      <ul key={index} className="list-disc list-inside space-y-2 ml-4">
                        {paragraph.split('\n').map((item, i) => (
                          <li key={i} className="text-gray-700">{item.replace(/^[•-]\s*/, '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={index} className="text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Featured Image Section */}
              <div className="my-8">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 p-8 text-white">
                      <h3 className="text-3xl font-bold mb-4">RESEARCH LEADERS ROUNDTABLE</h3>
                      <p className="text-lg">Insider insights from seasoned academics around the globe.</p>
                      <div className="mt-6">
                        <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none">
                          <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2"/>
                          <circle cx="50" cy="30" r="8" fill="white"/>
                          <circle cx="70" cy="50" r="8" fill="white"/>
                          <circle cx="50" cy="70" r="8" fill="white"/>
                          <circle cx="30" cy="50" r="8" fill="white"/>
                        </svg>
                      </div>
                    </div>
                    <div className="md:w-1/2">
                      <img 
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600" 
                        alt="Research Team" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mt-8 rounded-r">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>⭐</span> Your Practical Action Plan
                </h3>
                <div className="space-y-4 text-gray-700">
                  <p><strong>Set your weekly priorities.</strong> Each Monday morning (or Sunday evening), identify your top two dissertation priorities for the week. Write them down. Everything else is secondary.</p>
                  <p><strong>Outline your tentative conclusions.</strong> If you haven't already, spend a focused day sketching out what you think your research is heading. Create provisional answers to your research questions.</p>
                  <p><strong>Build your framework.</strong> If you're in the writing phase, create or refine your structural outline. Get all your main headings in place with brief introductory paragraphs.</p>
                  <p><strong>Write what you're ready to write.</strong> Don't force yourself to write Chapter One if Chapter Four is clearer in your mind. Work where your energy and clarity are highest.</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">The Bottom Line</h3>
                <p className="text-gray-700 leading-relaxed">
                  Your dissertation is a major project, and like any complex project, it requires both strategic planning and disciplined execution. But here's what often gets lost: discipline doesn't mean grinding yourself down with endless hours of unfocused work. It means working with intention, structure, and clarity.
                </p>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-8 text-center">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all posts
          </a>
        </div>
      </div>
    </div>
  );
}
