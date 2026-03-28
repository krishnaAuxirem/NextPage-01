import { useContent } from '@/contexts/ContentContext';
import { ContentCard } from '@/components/features/ContentCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';

const Bookmarks = () => {
  const { contents, bookmarks } = useContent();

  const bookmarkedContent = contents.filter(c =>
    bookmarks.some(b => b.contentId === c.id)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Bookmarks</h1>
        <p className="text-muted-foreground">Your saved articles and content</p>
      </div>

      {bookmarkedContent.length === 0 ? (
        <Card className="p-16 text-center">
          <Bookmark className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No bookmarks yet</h3>
          <p className="text-muted-foreground mb-6">
            Start bookmarking content you want to read later
          </p>
          <Button>Explore Content</Button>
        </Card>
      ) : (
        <div>
          <p className="text-muted-foreground mb-6">{bookmarkedContent.length} bookmarked items</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedContent.map(content => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
