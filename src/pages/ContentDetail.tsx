import { useParams, useNavigate, Link } from 'react-router-dom';
import { useContent } from '@/contexts/ContentContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShareButtons } from '@/components/features/ShareButtons';
import { ReadingProgress } from '@/components/features/ReadingProgress';
import { RecommendationWidget } from '@/components/features/RecommendationWidget';
import { CommentSection } from '@/components/features/CommentSection';
import { ReadingPreferencesPanel, useReadingPrefs } from '@/components/features/ReadingPreferences';
import { Heart, Bookmark, MessageCircle, Eye, Clock, Lock, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

const ContentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contents, bookmarks, addBookmark, removeBookmark, likeContent, addToReadingHistory } = useContent();
  const { isAuthenticated, user } = useAuth();
  const { prefs, updatePrefs } = useReadingPrefs();

  const content = contents.find(c => c.id === id);
  const isBookmarked = bookmarks.some(b => b.contentId === id);

  // Track reading history
  useEffect(() => {
    if (content && isAuthenticated) {
      addToReadingHistory(content.id);
    }
  }, [content, isAuthenticated]);

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Content Not Found</h1>
          <Button onClick={() => navigate('/discover')}>Browse Content</Button>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    if (!isAuthenticated) {
      toast.error('Please login to like content');
      return;
    }
    likeContent(content.id);
    toast.success('Liked!');
  };

  const handleBookmark = () => {
    if (!isAuthenticated) {
      toast.error('Please login to bookmark content');
      return;
    }
    if (isBookmarked) {
      removeBookmark(content.id);
      toast.success('Removed from bookmarks');
    } else {
      addBookmark(content.id);
      toast.success('Added to bookmarks');
    }
  };

  const isPremiumLocked = content.isPremium && (!user || user.role === 'reader');

  const sampleQuote = "Understanding the core principles is essential for mastering this subject.";

  // Reading prefs styles
  const themeStyles: Record<string, string> = {
    light: 'bg-white text-gray-900',
    sepia: 'bg-amber-50 text-amber-900',
    dark: 'bg-gray-900 text-gray-100',
  };

  const fontFamilyStyles: Record<string, string> = {
    sans: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono',
  };

  const maxWidthStyles: Record<string, string> = {
    narrow: 'max-w-2xl',
    medium: 'max-w-4xl',
    wide: 'max-w-6xl',
  };

  const alignStyles: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    justify: 'text-justify',
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={content.coverImage}
          alt={content.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <Button
          variant="ghost"
          className="absolute top-4 left-4 text-white hover:bg-white/20"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className={cn('mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10', maxWidthStyles[prefs.maxWidth])}>
        <Card className={cn('p-8 mb-8 transition-colors', themeStyles[prefs.theme])}>
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="capitalize">{content.type}</Badge>
              <Badge variant="outline">{content.category}</Badge>
              {content.isPremium && (
                <Badge variant="secondary">
                  <Lock className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}
            </div>
            <h1 className={cn('text-4xl font-bold mb-4', fontFamilyStyles[prefs.fontFamily])}>
              {content.title}
            </h1>
            <p className="text-xl opacity-70">{content.description}</p>
          </div>

          {/* Author & Meta */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-current/10">
            <Link to={`/author/${content.authorId}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img
                src={content.authorAvatar}
                alt={content.authorName}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <p className="font-semibold hover:text-primary transition-colors">{content.authorName}</p>
                <p className="text-sm opacity-60">{content.publishedAt}</p>
              </div>
            </Link>
            <div className="flex items-center gap-4 text-sm opacity-60">
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {content.reads.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {content.readingTime} min
              </span>
            </div>
          </div>

          {/* Actions + Reading Preferences */}
          <div className="flex flex-wrap gap-2 mb-8 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={handleLike}>
                <Heart className={`h-4 w-4 mr-2 ${content.likes > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                {content.likes}
              </Button>
              <Button variant="outline" onClick={handleBookmark}>
                <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Saved' : 'Save'}
              </Button>
              <Button variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                {content.comments}
              </Button>
            </div>
            <ReadingPreferencesPanel prefs={prefs} onChange={updatePrefs} />
          </div>

          {/* Share Buttons */}
          <ShareButtons
            title={content.title}
            description={content.description}
            authorName={content.authorName}
            quote={sampleQuote}
          />

          {/* Content Body */}
          <div className={cn('mt-8 prose max-w-none', fontFamilyStyles[prefs.fontFamily], alignStyles[prefs.align])} style={{ fontSize: prefs.fontSize, lineHeight: prefs.lineHeight }}>
            {isPremiumLocked ? (
              <div>
                <p className="mb-4" style={{ fontSize: prefs.fontSize, lineHeight: prefs.lineHeight }}>
                  {content.content.substring(0, 500)}...
                </p>
                <Card className="p-8 text-center bg-gradient-to-r from-primary to-secondary text-white not-prose">
                  <Lock className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Premium Content</h3>
                  <p className="mb-6 opacity-90">
                    Subscribe to Premium to access this content and thousands more
                  </p>
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={() => navigate('/subscription')}
                  >
                    Upgrade to Premium — ₹{content.price}
                  </Button>
                </Card>
              </div>
            ) : (
              <div>
                <p className="mb-4">{content.content}</p>

                <h2 className={cn('text-2xl font-bold mt-8 mb-4', fontFamilyStyles[prefs.fontFamily])}>Introduction</h2>
                <p className="mb-4">
                  This comprehensive guide will take you through everything you need to know about this topic.
                  We'll cover fundamental concepts, advanced techniques, and real-world applications that will
                  help you master this subject from the ground up.
                </p>

                <h2 className={cn('text-2xl font-bold mt-8 mb-4', fontFamilyStyles[prefs.fontFamily])}>Key Concepts</h2>
                <p className="mb-4">
                  Understanding the core principles is essential for mastering this subject. Let's explore
                  the foundational elements that will serve as building blocks for more advanced topics.
                  Each concept builds upon the previous, creating a robust framework for understanding.
                </p>
                <p className="mb-4">
                  The interplay between theory and practice becomes evident when we examine real-world
                  examples. By grounding abstract concepts in concrete scenarios, we can better appreciate
                  both their power and their limitations.
                </p>

                <blockquote className="border-l-4 border-primary pl-4 italic my-6 opacity-80">
                  "Understanding the core principles is essential for mastering this subject."
                </blockquote>

                <h2 className={cn('text-2xl font-bold mt-8 mb-4', fontFamilyStyles[prefs.fontFamily])}>Practical Applications</h2>
                <p className="mb-4">
                  Now that we've covered the theory, let's look at how these concepts apply in real-world
                  scenarios. These examples will help solidify your understanding and demonstrate practical
                  use cases across different industries and contexts.
                </p>
                <p className="mb-4">
                  From startups to established enterprises, the principles outlined here have proven
                  effective time and again. The key is in the adaptation — understanding not just the 'what'
                  but the 'why' behind each approach.
                </p>

                <h2 className={cn('text-2xl font-bold mt-8 mb-4', fontFamilyStyles[prefs.fontFamily])}>Conclusion</h2>
                <p className="mb-4">
                  We've covered significant ground in this piece. The journey from foundational understanding
                  to practical mastery requires patience, consistent practice, and a willingness to engage
                  with complexity. Keep exploring, keep questioning, and keep reading.
                </p>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="mt-8 pt-8 border-t border-current/10">
            <p className="font-semibold mb-3">Tags</p>
            <div className="flex flex-wrap gap-2">
              {content.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Reading Progress */}
        {isAuthenticated && !isPremiumLocked && (
          <ReadingProgress contentId={content.id} />
        )}

        {/* Comments Section */}
        <CommentSection contentId={content.id} totalComments={content.comments} />

        {/* Recommendations */}
        <div className="mt-6">
          <RecommendationWidget currentContentId={content.id} />
        </div>
      </div>
    </div>
  );
};

export default ContentDetail;
