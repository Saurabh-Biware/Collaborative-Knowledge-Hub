export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: 'admin' | 'editor' | 'viewer';
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  content: any;
  author_id: string;
  author?: User;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface ArticleVersion {
  id: string;
  article_id: string;
  title: string;
  content: any;
  version_number: number;
  created_by?: string;
  created_at: string;
}

export interface Comment {
  id: string;
  article_id: string;
  author_id: string;
  author?: User;
  content: string;
  parent_id?: string;
  replies?: Comment[];
  created_at: string;
  updated_at: string;
}
