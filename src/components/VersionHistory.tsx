import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import { formatDistanceToNow } from 'date-fns';
import type { ArticleVersion } from '@/types';

const GET_VERSIONS = gql`
  query GetVersions($articleId: ID!) {
    articleVersions(articleId: $articleId) {
      id
      version_number
      title
      created_at
    }
  }
`;

interface VersionHistoryProps {
  articleId: string;
  onRestore?: (version: ArticleVersion) => void;
}

export const VersionHistory = ({ articleId, onRestore }: VersionHistoryProps) => {
  const { data, loading } = useQuery(GET_VERSIONS, {
    variables: { articleId },
    pollInterval: 5000,
  });

  if (loading) return <div>Loading versions...</div>;

  const versions = data?.articleVersions || [];

  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-bold mb-4">Version History</h3>
      <div className="space-y-2">
        {versions.map((version: ArticleVersion) => (
          <div key={version.id} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 dark:hover:bg-gray-800">
            <div>
              <div className="font-semibold">Version {version.version_number}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {formatDistanceToNow(new Date(version.created_at), { addSuffix: true })}
              </div>
            </div>
            {onRestore && (
              <button
                onClick={() => onRestore(version)}
                className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700"
              >
                Restore
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
