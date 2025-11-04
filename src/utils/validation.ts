import { z } from 'zod';

export const articleSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  content: z.string().min(1, 'Content is required'),
  status: z.enum(['draft', 'published', 'archived']).optional(),
});

export const commentSchema = z.object({
  content: z.string().min(1, 'Comment cannot be empty').max(1000, 'Comment too long'),
  articleId: z.string().uuid('Invalid article ID'),
  parentId: z.string().uuid('Invalid parent ID').optional(),
});

export const authSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(1, 'Name is required').optional(),
});
