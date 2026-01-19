import { useState, useEffect } from 'react';
import { Blog, blogApi } from '../api/blogApi';

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await blogApi.getAll();
        setBlogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const addBlog = async (blog: Omit<Blog, 'id'>) => {
    try {
      const newBlog = await blogApi.create(blog);
      setBlogs([...blogs, newBlog]);
      return newBlog;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create blog');
    }
  };

  const removeBlog = async (id: string) => {
    try {
      await blogApi.delete(id);
      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete blog');
    }
  };

  return { blogs, loading, error, addBlog, removeBlog };
};