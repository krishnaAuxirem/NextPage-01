import { useAuth } from '@/contexts/AuthContext';
import { useContent } from '@/contexts/ContentContext';
import { ContentCard } from './ContentCard';
import { Card } from '@/components/ui/card';
import { Sparkles, TrendingUp, Bookmark } from 'lucide-react';

interface RecommendationWidgetProps {
  currentContentId?: string;
  limit?: number;
}

export const RecommendationWidget = ({ currentContentId, limit = 6 }: RecommendationWidgetProps) => {
  const { user, isAuthenticated } = useAuth();
  const { contents, bookmarks, getTrendingContent } = useContent();

  // Smart recommendation algorithm
  const getRecommendations = () => {
    if (!isAuthenticated || !user) {
      // Show trending for non-authenticated users
      return getTrendingContent().slice(0, limit);
    }

    // Get user's reading history based on bookmarks
    const bookmarkedContentIds = bookmarks.map(b => b.contentId);
    const bookmarkedContent = contents.filter(c => bookmarkedContentIds.includes(c.id));
    
    // Extract tags and categories from bookmarked content
    const userTags = new Set(bookmarkedContent.flatMap(c => c.tags));
    const userCategories = new Set(bookmarkedContent.map(c => c.category));
    const userInterests = new Set(user.interests || []);

    // Combine all interests
    const allInterests = new Set([...userTags, ...userCategories, ...userInterests]);

    // Score content based on relevance
    const scoredContent = contents
      .filter(c => c.status === 'published' && c.id !== currentContentId)
      .map(content => {
        let score = 0;

        // Match with user interests
        content.tags.forEach(tag => {
          if (allInterests.has(tag)) score += 5;
        });

        if (allInterests.has(content.category)) score += 3;

        // Boost trending content
        score += (content.reads / 1000) + (content.likes / 100);

        // Boost high completion rate
        score += content.completionRate / 10;

        // Prefer content not yet bookmarked
        if (!bookmarkedContentIds.includes(content.id)) score += 2;

        // Slight penalty for premium if user is free tier
        if (content.isPremium && user.role === 'reader') score -= 1;

        return { content, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.content);

    return scoredContent;
  };

  const recommendations = getRecommendations();

  if (recommendations.length === 0) {
    return null;
  }

  const getIcon = () => {
    if (!isAuthenticated) return <TrendingUp className="h-5 w-5" />;
    const hasBookmarks = bookmarks.length > 0;
    return hasBookmarks ? <Sparkles className="h-5 w-5" /> : <TrendingUp className="h-5 w-5" />;
  };

  const getTitle = () => {
    if (!isAuthenticated) return 'Trending Now';
    const hasBookmarks = bookmarks.length > 0;
    return hasBookmarks ? 'Recommended For You' : 'Popular Content';
  };

  const getDescription = () => {
    if (!isAuthenticated) return 'Most popular content this week';
    const hasBookmarks = bookmarks.length > 0;
    return hasBookmarks 
      ? 'Based on your reading history and interests'
      : 'Explore trending content from our community';
  };

  return (
    <div className="py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {getIcon()}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{getTitle()}</h2>
          <p className="text-sm text-muted-foreground">{getDescription()}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map(content => (
          <ContentCard key={content.id} content={content} />
        ))}
      </div>
    </div>
  );
};
