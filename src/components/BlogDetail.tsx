import React from 'react';
import { Blog } from '../api/blogApi';

interface BlogDetailProps {
  blog: Blog;
  onClose?: () => void;
}

export const BlogDetail: React.FC<BlogDetailProps> = ({ blog, onClose }) => {
  return (
    <div className="space-y-6">
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 text-sm font-semibold"
      >
        ← Back
      </button>

      <img
        src={blog.coverImage}
        alt={blog.title}
        className="w-full h-96 object-cover rounded-lg"
      />

      <div className="space-y-2">
        <div className="text-sm font-semibold text-purple-600">
          {blog.category} • {blog.readTime} min read
        </div>
        <h1 className="text-4xl font-bold text-gray-900">{blog.title}</h1>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-lg">👤</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Written by {blog.author.name}</p>
            <p className="text-sm text-gray-600">{blog.author.role}</p>
          </div>
        </div>
      </div>

      <div className="prose max-w-none space-y-4 text-gray-700">
        {blog.content.split('\n\n').map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {blog.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};