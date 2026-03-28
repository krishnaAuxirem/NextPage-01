import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { UserPlus, UserCheck } from 'lucide-react';
import { toast } from 'sonner';

interface FollowButtonProps {
  authorId: string;
  authorName: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export const FollowButton = ({ authorId, authorName, variant = 'outline', size = 'default', className }: FollowButtonProps) => {
  const { isAuthenticated, followAuthor, unfollowAuthor, isFollowingAuthor } = useAuth();
  const isFollowing = isFollowingAuthor(authorId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please login to follow authors');
      return;
    }

    if (isFollowing) {
      unfollowAuthor(authorId);
      toast.success(`Unfollowed ${authorName}`);
    } else {
      followAuthor(authorId);
      toast.success(`Following ${authorName}!`);
    }
  };

  return (
    <Button
      variant={isFollowing ? 'default' : variant}
      size={size}
      onClick={handleClick}
      className={className}
    >
      {isFollowing ? (
        <>
          <UserCheck className="mr-2 h-4 w-4" />
          Following
        </>
      ) : (
        <>
          <UserPlus className="mr-2 h-4 w-4" />
          Follow
        </>
      )}
    </Button>
  );
};
