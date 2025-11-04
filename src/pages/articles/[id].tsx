import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import { useRouter } from 'next/router';
import { CommentThread } from '@/components/CommentThread';
import { VersionHistory } from '@/components/VersionHistory';
import { formatDistanceToNow } from 'date-fns';

const GET_ARTICLE = gql`
  query GetArticle($id: ID!) {
    article(id: $id) {
      id
      title
      content
      author { id full_name }
      created_at
      updated_at
    }
    comments(articleId: $id) {
      id
      content
      author { id full_name }
      parent_id
      replies {
        id
        content
        author { id full_name }
        created_at
      }
      created_at
    }
  }
`;

export default function ArticlePage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, refetch } = useQuery(GET_ARTICLE, {
    variables: { id },
    skip: !id,
    pollInterval: 5000,
  });

  if (loading) return <div>Loading...</div>;
  if (!data?.article) return <div>Article not found</div>;

  const { article, comments } = data;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="text-gray-600 dark:text-gray-400 mb-4">
          <span>By {article.author?.full_name || 'Anonymous'}</span>
          <span className="mx-2">•</span>
          <span>{formatDistanceToNow(new Date(article.created_at), { addSuffix: true })}</span>
        </div>
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <CommentThread
            comments={comments}
            articleId={article.id}
            onCommentAdded={() => refetch()}
          />
        </div>
        <div>
          <VersionHistory articleId={article.id} />
        </div>
      </div>
    </div>
  );
}
