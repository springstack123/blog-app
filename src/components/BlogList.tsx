import React from 'react';
import { Blog } from '../api/blogApi';
import { BlogCard } from './BlogCard';

interface BlogListProps {
  blogs: Blog[];
  onSelectBlog?: (id: string) => void;
}

export const BlogList: React.FC<BlogListProps> = ({ blogs, onSelectBlog }) => {
  return (
    <div className="space-y-4">
      <h2 className="font-bold text-xl text-gray-900 mb-6">Latest Articles</h2>
      <div className="space-y-3">
        {blogs.map(blog => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onClick={onSelectBlog}
          />
        ))}
      </div>
    </div>
  );
};