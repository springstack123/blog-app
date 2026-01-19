import React from 'react';
import { Blog } from '../api/blogApi';

interface BlogCardProps {
  blog: Blog;
  onClick?: (id: string) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog, onClick }) => {
  return (
    <div
      onClick={() => onClick?.(blog.id)}
      className="p-4 border-l-4 border-purple-600 bg-white rounded-lg hover:shadow-md transition cursor-pointer"
    >
      <div className="text-xs font-semibold text-gray-500 mb-2">
        {blog.category} • {blog.date}
      </div>
      <h3 className="font-bold text-lg mb-2 text-gray-900">{blog.title}</h3>
      <p className="text-gray-600 text-sm mb-3">{blog.description}</p>
      <div className="text-xs text-purple-600 font-semibold">
        {blog.tags[0] ? `${blog.tags[0]}` : 'Read more'}
      </div>
    </div>
  );
};