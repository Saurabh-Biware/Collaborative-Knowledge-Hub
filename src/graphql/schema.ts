import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    full_name: String
    avatar_url: String
    role: String!
    created_at: String!
    updated_at: String!
  }

  type Article {
    id: ID!
    title: String!
    content: String!
    author_id: ID!
    author: User
    status: String!
    created_at: String!
    updated_at: String!
    versions: [ArticleVersion!]
    comments: [Comment!]
  }

  type ArticleVersion {
    id: ID!
    article_id: ID!
    title: String!
    content: String!
    version_number: Int!
    created_by: ID
    created_at: String!
  }

  type Comment {
    id: ID!
    article_id: ID!
    author_id: ID!
    author: User
    content: String!
    parent_id: ID
    replies: [Comment!]
    created_at: String!
    updated_at: String!
  }

  type Query {
    me: User
    articles(status: String): [Article!]!
    article(id: ID!): Article
    articleVersions(articleId: ID!): [ArticleVersion!]!
    comments(articleId: ID!): [Comment!]!
  }

  type Mutation {
    createArticle(title: String!, content: String!): Article!
    updateArticle(id: ID!, title: String, content: String, status: String): Article!
    deleteArticle(id: ID!): Boolean!
    createComment(articleId: ID!, content: String!, parentId: ID): Comment!
    updateComment(id: ID!, content: String!): Comment!
    deleteComment(id: ID!): Boolean!
  }
`;
