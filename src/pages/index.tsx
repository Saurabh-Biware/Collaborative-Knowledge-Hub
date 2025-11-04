import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import type { Article } from '@/types';

const GET_ARTICLES = gql`
  query GetArticles {
    articles(status: "published") {
      id
      title
      author { full_name }
      created_at
      updated_at
    }
  }
`;

export default function Home() {
  const { data, loading } = useQuery(GET_ARTICLES, {
    pollInterval: 5000,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const articles = data?.articles || [];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12 animate-slide-up">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent">
          Welcome to Knowledge Hub
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover, share, and collaborate on knowledge articles with your team
        </p>
      </div>
      
      {articles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article: Article, index: number) => (
            <Link
              key={article.id}
              href={`/articles/${article.id}`}
              className="group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-full p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl card-hover">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                    {article.title.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full font-medium">
                    Article
                  </span>
                </div>
                
                <h2 className="text-xl font-bold mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                  {article.title}
                </h2>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <span>👤</span>
                    <span>{article.author?.full_name || 'Anonymous'}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <span>🕒</span>
                    <span>{formatDistanceToNow(new Date(article.created_at), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">📝</span>
          </div>
          <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            No articles yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Be the first to create and share knowledge!
          </p>
          <Link
            href="/articles/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl transition-all font-medium"
          >
            <span>✨</span>
            Create First Article
          </Link>
        </div>
      )}
    </div>
  );
}
