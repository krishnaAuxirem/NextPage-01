import { Heart, MessageCircle, Eye, Clock, Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Content } from '@/contexts/ContentContext';
import { useNavigate, Link } from 'react-router-dom';

interface ContentCardProps {
  content: Content;
  variant?: 'default' | 'horizontal';
}

export const ContentCard = ({ content, variant = 'default' }: ContentCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/content/${content.id}`);
  };

  if (variant === 'horizontal') {
    return (
      <Card 
        className="flex gap-4 p-4 hover:shadow-lg transition-shadow cursor-pointer"
        onClick={handleClick}
      >
        <img
          src={content.coverImage}
          alt={content.title}
          className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold line-clamp-2 flex-1">{content.title}</h3>
            {content.isPremium && (
              <Badge variant="secondary" className="flex-shrink-0">
                <Lock className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {content.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {content.reads.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {content.likes.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {content.readingTime} min
            </span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group" onClick={handleClick}>
      <div className="relative overflow-hidden">
        <img
          src={content.coverImage}
          alt={content.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {content.isPremium && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-black/70 text-white">
              <Lock className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          </div>
        )}
        <Badge className="absolute top-3 left-3 capitalize">{content.type}</Badge>
      </div>

      <div className="p-4">
        <Link 
          to={`/author/${content.authorId}`}
          className="flex items-center gap-2 mb-3 hover:opacity-80 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={content.authorAvatar}
            alt={content.authorName}
            className="h-8 w-8 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate hover:text-primary transition-colors">{content.authorName}</p>
            <p className="text-xs text-muted-foreground">{content.category}</p>
          </div>
        </Link>

        <h3 className="font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
          {content.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {content.description}
        </p>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {content.reads.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {content.likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              {content.comments}
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {content.readingTime} min
          </span>
        </div>

        {content.tags.length > 0 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {content.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
