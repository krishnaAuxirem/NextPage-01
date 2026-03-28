import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Reply, ChevronDown, ChevronUp, Send, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  likes: number;
  liked: boolean;
  timestamp: string;
  replies: Comment[];
}

const generateMockComments = (contentId: string): Comment[] => [
  {
    id: `${contentId}-c1`,
    authorId: 'author-1',
    authorName: 'Dr. Sarah Chen',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen',
    text: 'This is a brilliant piece! The way you break down the complex concepts makes it very accessible. Looking forward to more content like this.',
    likes: 24,
    liked: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    replies: [
      {
        id: `${contentId}-c1-r1`,
        authorId: 'author-2',
        authorName: 'Alex Kumar',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexKumar',
        text: 'Totally agree! The practical examples really helped me understand the core concepts.',
        likes: 8,
        liked: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        replies: [],
      },
    ],
  },
  {
    id: `${contentId}-c2`,
    authorId: 'author-3',
    authorName: 'Emma Watson',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EmmaWatson',
    text: 'I have a question about section 3 — could you elaborate a bit more on the implementation challenges you mentioned?',
    likes: 12,
    liked: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    replies: [],
  },
  {
    id: `${contentId}-c3`,
    authorId: 'author-4',
    authorName: 'Prof. Michael Zhang',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MichaelZhang',
    text: 'Excellent read. Bookmarked for reference. The comparison table at the end is particularly useful for practitioners.',
    likes: 19,
    liked: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    replies: [
      {
        id: `${contentId}-c3-r1`,
        authorId: 'author-1',
        authorName: 'Dr. Sarah Chen',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen',
        text: 'Thank you, Professor! I spent a lot of time on that section to make it practical.',
        likes: 6,
        liked: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
        replies: [],
      },
    ],
  },
];

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};

interface CommentItemProps {
  comment: Comment;
  onLike: (commentId: string, parentId?: string) => void;
  onReply: (parentId: string, text: string) => void;
  onDelete: (commentId: string, parentId?: string) => void;
  currentUserId?: string;
  depth?: number;
}

const CommentItem = ({ comment, onLike, onReply, onDelete, currentUserId, depth = 0 }: CommentItemProps) => {
  const [showReplies, setShowReplies] = useState(true);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    onReply(comment.id, replyText.trim());
    setReplyText('');
    setIsReplying(false);
  };

  return (
    <div className={`${depth > 0 ? 'ml-10 border-l-2 border-border pl-4' : ''}`}>
      <div className="flex gap-3 mb-3">
        <img
          src={comment.authorAvatar}
          alt={comment.authorName}
          className="w-9 h-9 rounded-full flex-shrink-0 border border-border"
        />
        <div className="flex-1 min-w-0">
          <div className="bg-muted rounded-xl px-4 py-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-sm">{comment.authorName}</span>
              <span className="text-xs text-muted-foreground">{formatTime(comment.timestamp)}</span>
            </div>
            <p className="text-sm leading-relaxed">{comment.text}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-1 px-2">
            <button
              onClick={() => onLike(comment.id)}
              className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                comment.liked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${comment.liked ? 'fill-current' : ''}`} />
              {comment.likes > 0 && comment.likes}
              <span>Like</span>
            </button>
            {depth === 0 && (
              <button
                onClick={() => setIsReplying(!isReplying)}
                className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <Reply className="h-3.5 w-3.5" />
                Reply
              </button>
            )}
            {currentUserId === comment.authorId && (
              <button
                onClick={() => onDelete(comment.id)}
                className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
            )}
          </div>

          {/* Reply Input */}
          {isReplying && (
            <div className="mt-3 ml-2 flex gap-2">
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="min-h-[60px] text-sm resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey) handleReplySubmit();
                }}
              />
              <div className="flex flex-col gap-2">
                <Button size="sm" onClick={handleReplySubmit} disabled={!replyText.trim()}>
                  <Send className="h-3.5 w-3.5" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setIsReplying(false)}>
                  ✕
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Replies */}
      {comment.replies.length > 0 && (
        <div className="ml-12">
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="flex items-center gap-1 text-xs text-primary font-medium mb-2 hover:underline"
          >
            {showReplies ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
          </button>
          {showReplies && (
            <div className="space-y-2">
              {comment.replies.map(reply => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  onLike={(id) => onLike(id, comment.id)}
                  onReply={onReply}
                  onDelete={(id) => onDelete(id, comment.id)}
                  currentUserId={currentUserId}
                  depth={depth + 1}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface CommentSectionProps {
  contentId: string;
  totalComments: number;
}

export const CommentSection = ({ contentId, totalComments }: CommentSectionProps) => {
  const { user, isAuthenticated } = useAuth();
  const [comments, setComments] = useState<Comment[]>(generateMockComments(contentId));
  const [newComment, setNewComment] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');

  const handleAddComment = () => {
    if (!isAuthenticated) {
      toast.error('Please login to comment');
      return;
    }
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `${contentId}-c${Date.now()}`,
      authorId: user!.id,
      authorName: user!.name,
      authorAvatar: user!.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user!.name}`,
      text: newComment.trim(),
      likes: 0,
      liked: false,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    setComments([comment, ...comments]);
    setNewComment('');
    toast.success('Comment posted!');
  };

  const handleLike = (commentId: string, parentId?: string) => {
    if (!isAuthenticated) {
      toast.error('Please login to like');
      return;
    }
    setComments(prev =>
      prev.map(c => {
        if (parentId) {
          if (c.id === parentId) {
            return {
              ...c,
              replies: c.replies.map(r =>
                r.id === commentId
                  ? { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 }
                  : r
              ),
            };
          }
          return c;
        }
        if (c.id === commentId) {
          return { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 };
        }
        return c;
      })
    );
  };

  const handleReply = (parentId: string, text: string) => {
    if (!isAuthenticated) {
      toast.error('Please login to reply');
      return;
    }
    const reply: Comment = {
      id: `reply-${Date.now()}`,
      authorId: user!.id,
      authorName: user!.name,
      authorAvatar: user!.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user!.name}`,
      text,
      likes: 0,
      liked: false,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    setComments(prev =>
      prev.map(c =>
        c.id === parentId ? { ...c, replies: [...c.replies, reply] } : c
      )
    );
    toast.success('Reply posted!');
  };

  const handleDelete = (commentId: string, parentId?: string) => {
    if (parentId) {
      setComments(prev =>
        prev.map(c =>
          c.id === parentId
            ? { ...c, replies: c.replies.filter(r => r.id !== commentId) }
            : c
        )
      );
    } else {
      setComments(prev => prev.filter(c => c.id !== commentId));
    }
    toast.success('Comment deleted');
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'popular') return (b.likes + b.replies.length * 2) - (a.likes + a.replies.length * 2);
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const totalCount = comments.length + comments.reduce((acc, c) => acc + c.replies.length, 0);

  return (
    <Card className="p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          Discussion
          <Badge variant="secondary">{totalCount}</Badge>
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('newest')}
            className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${
              sortBy === 'newest' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => setSortBy('popular')}
            className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${
              sortBy === 'popular' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Top
          </button>
        </div>
      </div>

      {/* New Comment Input */}
      <div className="flex gap-3 mb-8">
        {isAuthenticated && user ? (
          <img
            src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
            alt={user.name}
            className="w-9 h-9 rounded-full flex-shrink-0 border border-border"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-muted flex-shrink-0" />
        )}
        <div className="flex-1">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={isAuthenticated ? 'Share your thoughts...' : 'Login to join the discussion'}
            disabled={!isAuthenticated}
            className="min-h-[80px] resize-none mb-2"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) handleAddComment();
            }}
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Ctrl+Enter to post</p>
            <Button
              size="sm"
              onClick={handleAddComment}
              disabled={!isAuthenticated || !newComment.trim()}
            >
              <Send className="h-4 w-4 mr-2" />
              Post Comment
            </Button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {sortedComments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageCircle className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          sortedComments.map(comment => (
            <CommentSection.Item
              key={comment.id}
              comment={comment}
              onLike={handleLike}
              onReply={handleReply}
              onDelete={handleDelete}
              currentUserId={user?.id}
            />
          ))
        )}
      </div>
    </Card>
  );
};

// Attach CommentItem as static property for cleaner usage
CommentSection.Item = CommentItem;
