import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import type { Comment } from '@/types';
import { formatDistanceToNow } from 'date-fns';

const CREATE_COMMENT = gql`
  mutation CreateComment($articleId: ID!, $content: String!, $parentId: ID) {
    createComment(articleId: $articleId, content: $content, parentId: $parentId) {
      id
      content
      author { id full_name }
      created_at
    }
  }
`;

interface CommentThreadProps {
  comments: Comment[];
  articleId: string;
  onCommentAdded: () => void;
}

export const CommentThread = ({ comments, articleId, onCommentAdded }: CommentThreadProps) => {
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [createComment] = useMutation(CREATE_COMMENT);

  const handleSubmit = async (parentId?: string) => {
    if (!content.trim()) return;
    
    await createComment({
      variables: { articleId, content, parentId },
    });
    
    setContent('');
    setReplyTo(null);
    onCommentAdded();
  };

  const CommentItem = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => (
    <div className={`${depth > 0 ? 'ml-8 mt-4' : 'mt-4'} border-l-2 pl-4`}>
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <span className="font-semibold">{comment.author?.full_name || 'Anonymous'}</span>
        <span>•</span>
        <span>{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
      </div>
      <p className="mt-2">{comment.content}</p>
      <button
        onClick={() => setReplyTo(comment.id)}
        className="text-sm text-primary-600 hover:underline mt-2"
      >
        Reply
      </button>
      
      {replyTo === comment.id && (
        <div className="mt-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            rows={2}
            placeholder="Write a reply..."
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleSubmit(comment.id)}
              className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
            >
              Reply
            </button>
            <button
              onClick={() => { setReplyTo(null); setContent(''); }}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {comment.replies?.map((reply) => (
        <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
      ))}
    </div>
  );

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Comments</h3>
      
      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border rounded-lg"
          rows={3}
          placeholder="Add a comment..."
        />
        <button
          onClick={() => handleSubmit()}
          className="mt-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Comment
        </button>
      </div>

      <div>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};
