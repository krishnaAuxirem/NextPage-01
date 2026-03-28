import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useContent } from '@/contexts/ContentContext';
import { ContentCard } from '@/components/features/ContentCard';
import { FollowButton } from '@/components/features/FollowButton';
import { Users, TrendingUp, Bell } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Following = () => {
  const { user } = useAuth();
  const { contents } = useContent();
  const navigate = useNavigate();

  // Get followed authors
  const followedAuthorIds = user?.followedAuthors || [];
  
  // Get content from followed authors
  const followedContent = contents
    .filter(c => followedAuthorIds.includes(c.authorId) && c.status === 'published')
    .sort((a, b) => new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime());

  // Get unique authors from followed content
  const followedAuthors = Array.from(
    new Set(followedContent.map(c => c.authorId))
  ).map(authorId => {
    const content = followedContent.find(c => c.authorId === authorId)!;
    return {
      id: authorId,
      name: content.authorName,
      avatar: content.authorAvatar,
      contentCount: followedContent.filter(c => c.authorId === authorId).length,
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Following</h1>
        <p className="text-muted-foreground">
          Latest content from authors you follow
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6">
          <Users className="h-8 w-8 mb-3 text-blue-500" />
          <p className="text-2xl font-bold mb-1">{followedAuthorIds.length}</p>
          <p className="text-sm text-muted-foreground">Authors Following</p>
        </Card>
        <Card className="p-6">
          <TrendingUp className="h-8 w-8 mb-3 text-green-500" />
          <p className="text-2xl font-bold mb-1">{followedContent.length}</p>
          <p className="text-sm text-muted-foreground">Articles from Followed</p>
        </Card>
        <Card className="p-6">
          <Bell className="h-8 w-8 mb-3 text-purple-500" />
          <p className="text-2xl font-bold mb-1">5</p>
          <p className="text-sm text-muted-foreground">New This Week</p>
        </Card>
      </div>

      {/* Followed Authors */}
      {followedAuthors.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Followed Authors</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {followedAuthors.map(author => (
              <Card key={author.id} className="p-4 hover:shadow-md transition-shadow">
                <Link to={`/author/${author.id}`} className="block">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="h-16 w-16 rounded-full mx-auto mb-3 border-2 border-primary"
                  />
                  <h3 className="font-semibold text-center mb-1">{author.name}</h3>
                  <p className="text-sm text-muted-foreground text-center mb-3">
                    {author.contentCount} articles
                  </p>
                </Link>
                <FollowButton
                  authorId={author.id}
                  authorName={author.name}
                  variant="outline"
                  size="sm"
                  className="w-full"
                />
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Latest Content from Followed Authors */}
      {followedContent.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Latest from Followed Authors</h2>
            <Badge variant="secondary">{followedContent.length} articles</Badge>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {followedContent.map(content => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
          <h3 className="text-xl font-semibold mb-2">No followed authors yet</h3>
          <p className="text-muted-foreground mb-6">
            Start following authors to see their latest content here
          </p>
          <Button onClick={() => navigate('/discover')}>
            <TrendingUp className="mr-2 h-4 w-4" />
            Discover Authors
          </Button>
        </Card>
      )}
    </div>
  );
};

export default Following;
