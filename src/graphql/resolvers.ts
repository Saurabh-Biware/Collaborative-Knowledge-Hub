import { getServerSupabase } from '@/lib/supabase';

export const resolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      if (!context.user) return null;
      const supabase = getServerSupabase();
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', context.user.id)
        .single();
      return data;
    },

    articles: async (_: any, { status }: any, context: any) => {
      const supabase = getServerSupabase();
      let query = supabase.from('articles').select('*, author:profiles(*)');
      
      if (status) query = query.eq('status', status);
      else if (!context.user) query = query.eq('status', 'published');
      
      const { data } = await query.order('created_at', { ascending: false });
      return data || [];
    },

    article: async (_: any, { id }: any) => {
      const supabase = getServerSupabase();
      const { data } = await supabase
        .from('articles')
        .select('*, author:profiles(*)')
        .eq('id', id)
        .single();
      return data;
    },

    articleVersions: async (_: any, { articleId }: any) => {
      const supabase = getServerSupabase();
      const { data } = await supabase
        .from('article_versions')
        .select('*')
        .eq('article_id', articleId)
        .order('version_number', { ascending: false });
      return data || [];
    },

    comments: async (_: any, { articleId }: any) => {
      const supabase = getServerSupabase();
      const { data } = await supabase
        .from('comments')
        .select('*, author:profiles(*)')
        .eq('article_id', articleId)
        .order('created_at', { ascending: true });
      return data || [];
    },
  },

  Mutation: {
    createArticle: async (_: any, { title, content }: any, context: any) => {
      if (!context.user) throw new Error('Unauthorized');
      
      const supabase = getServerSupabase();
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', context.user.id)
        .single();

      if (!profile || !['editor', 'admin'].includes(profile.role)) {
        throw new Error('Insufficient permissions');
      }

      const { data, error } = await supabase
        .from('articles')
        .insert({ title, content, author_id: context.user.id, status: 'published' })
        .select('*, author:profiles(*)')
        .single();

      if (error) throw error;

      await supabase.from('article_versions').insert({
        article_id: data.id,
        title,
        content,
        version_number: 1,
        created_by: context.user.id,
      });

      return data;
    },

    updateArticle: async (_: any, { id, title, content, status }: any, context: any) => {
      if (!context.user) throw new Error('Unauthorized');

      const supabase = getServerSupabase();
      const { data: article } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      if (!article || article.author_id !== context.user.id) {
        throw new Error('Unauthorized');
      }

      const updates: any = {};
      if (title) updates.title = title;
      if (content) updates.content = content;
      if (status) updates.status = status;

      const { data, error } = await supabase
        .from('articles')
        .update(updates)
        .eq('id', id)
        .select('*, author:profiles(*)')
        .single();

      if (error) throw error;

      if (title || content) {
        const { data: versions } = await supabase
          .from('article_versions')
          .select('version_number')
          .eq('article_id', id)
          .order('version_number', { ascending: false })
          .limit(1);

        const nextVersion = versions?.[0]?.version_number ? versions[0].version_number + 1 : 1;

        await supabase.from('article_versions').insert({
          article_id: id,
          title: data.title,
          content: data.content,
          version_number: nextVersion,
          created_by: context.user.id,
        });
      }

      return data;
    },

    deleteArticle: async (_: any, { id }: any, context: any) => {
      if (!context.user) throw new Error('Unauthorized');

      const supabase = getServerSupabase();
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', context.user.id)
        .single();

      if (!profile || profile.role !== 'admin') {
        throw new Error('Insufficient permissions');
      }

      const { error } = await supabase.from('articles').delete().eq('id', id);
      if (error) throw error;
      return true;
    },

    createComment: async (_: any, { articleId, content, parentId }: any, context: any) => {
      if (!context.user) throw new Error('Unauthorized');

      const supabase = getServerSupabase();
      const { data, error } = await supabase
        .from('comments')
        .insert({
          article_id: articleId,
          content,
          author_id: context.user.id,
          parent_id: parentId,
        })
        .select('*, author:profiles(*)')
        .single();

      if (error) throw error;
      return data;
    },

    updateComment: async (_: any, { id, content }: any, context: any) => {
      if (!context.user) throw new Error('Unauthorized');

      const supabase = getServerSupabase();
      const { data, error } = await supabase
        .from('comments')
        .update({ content })
        .eq('id', id)
        .eq('author_id', context.user.id)
        .select('*, author:profiles(*)')
        .single();

      if (error) throw error;
      return data;
    },

    deleteComment: async (_: any, { id }: any, context: any) => {
      if (!context.user) throw new Error('Unauthorized');

      const supabase = getServerSupabase();
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id)
        .eq('author_id', context.user.id);

      if (error) throw error;
      return true;
    },
  },

  Article: {
    versions: async (parent: any) => {
      const supabase = getServerSupabase();
      const { data } = await supabase
        .from('article_versions')
        .select('*')
        .eq('article_id', parent.id)
        .order('version_number', { ascending: false });
      return data || [];
    },

    comments: async (parent: any) => {
      const supabase = getServerSupabase();
      const { data } = await supabase
        .from('comments')
        .select('*, author:profiles(*)')
        .eq('article_id', parent.id)
        .is('parent_id', null)
        .order('created_at', { ascending: true });
      return data || [];
    },
  },

  Comment: {
    replies: async (parent: any) => {
      const supabase = getServerSupabase();
      const { data } = await supabase
        .from('comments')
        .select('*, author:profiles(*)')
        .eq('parent_id', parent.id)
        .order('created_at', { ascending: true });
      return data || [];
    },
  },
};
