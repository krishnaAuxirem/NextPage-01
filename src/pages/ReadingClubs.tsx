import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Users,
  BookOpen,
  MessageSquare,
  Calendar,
  Lock,
  Globe,
  Plus,
  Search,
  Crown,
  TrendingUp,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface ReadingClub {
  id: string;
  name: string;
  description: string;
  topic: string;
  members: number;
  currentBook: string;
  currentBookCover: string;
  isPrivate: boolean;
  owner: string;
  ownerAvatar: string;
  nextMeeting?: string;
  postsCount: number;
  joined: boolean;
  tags: string[];
}

const mockClubs: ReadingClub[] = [
  {
    id: 'club-1',
    name: 'Tech Readers Collective',
    description: 'A community for tech enthusiasts who love reading about AI, programming, and the future of technology.',
    topic: 'Technology',
    members: 1247,
    currentBook: 'The Future of Artificial Intelligence in Creative Industries',
    currentBookCover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&auto=format&fit=crop',
    isPrivate: false,
    owner: 'Dr. Sarah Chen',
    ownerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen',
    nextMeeting: 'March 30, 2026 at 7 PM',
    postsCount: 342,
    joined: true,
    tags: ['AI', 'Tech', 'Programming'],
  },
  {
    id: 'club-2',
    name: 'Mindful Readers',
    description: 'Explore wellness, mindfulness, and personal growth through curated readings and group discussions.',
    topic: 'Wellness',
    members: 876,
    currentBook: 'Mindfulness in the Digital Age',
    currentBookCover: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&auto=format&fit=crop',
    isPrivate: false,
    owner: 'Emma Watson',
    ownerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EmmaWatson',
    nextMeeting: 'April 2, 2026 at 6 PM',
    postsCount: 215,
    joined: false,
    tags: ['Wellness', 'Mindfulness', 'Productivity'],
  },
  {
    id: 'club-3',
    name: 'Science Scholars',
    description: 'Deep-dive into scientific literature, research papers, and evidence-based learning with like-minded readers.',
    topic: 'Science',
    members: 654,
    currentBook: 'The Science of Learning: Evidence-Based Study Techniques',
    currentBookCover: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=200&auto=format&fit=crop',
    isPrivate: false,
    owner: 'Prof. Michael Zhang',
    ownerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MichaelZhang',
    nextMeeting: 'April 5, 2026 at 8 PM',
    postsCount: 189,
    joined: false,
    tags: ['Science', 'Education', 'Research'],
  },
  {
    id: 'club-4',
    name: 'Business Visionaries',
    description: 'For entrepreneurs and business thinkers who want to stay ahead by reading the latest in business strategy.',
    topic: 'Business',
    members: 923,
    currentBook: 'Mastering React Performance Optimization',
    currentBookCover: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&auto=format&fit=crop',
    isPrivate: true,
    owner: 'Alex Kumar',
    ownerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexKumar',
    postsCount: 412,
    joined: false,
    tags: ['Business', 'Strategy', 'Entrepreneurship'],
  },
  {
    id: 'club-5',
    name: 'Philosophy & Ideas',
    description: 'A private circle for deep thinkers exploring philosophy, ethics, and the big questions through reading.',
    topic: 'Philosophy',
    members: 234,
    currentBook: 'Mindfulness in the Digital Age',
    currentBookCover: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&auto=format&fit=crop',
    isPrivate: true,
    owner: 'Dr. Sarah Chen',
    ownerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen2',
    postsCount: 98,
    joined: false,
    tags: ['Philosophy', 'Ethics', 'Ideas'],
  },
  {
    id: 'club-6',
    name: 'Creative Writers & Readers',
    description: 'Where readers meet writers. Share creative content, get feedback, and grow together as storytellers.',
    topic: 'Writing',
    members: 567,
    currentBook: 'The Future of Artificial Intelligence in Creative Industries',
    currentBookCover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&auto=format&fit=crop',
    isPrivate: false,
    owner: 'Emma Watson',
    ownerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EmmaWatson2',
    nextMeeting: 'April 1, 2026 at 5 PM',
    postsCount: 276,
    joined: true,
    tags: ['Writing', 'Creativity', 'Storytelling'],
  },
];

const mockDiscussions = [
  { id: 1, clubName: 'Tech Readers Collective', author: 'Dr. Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen', text: 'What did everyone think of Chapter 3? The AI creativity examples were fascinating!', likes: 24, replies: 12, time: '2h ago' },
  { id: 2, clubName: 'Creative Writers & Readers', author: 'Emma Watson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EmmaWatson', text: 'Reminder: our next meeting is on April 1st at 5 PM. We will be discussing the second half of this month\'s pick.', likes: 18, replies: 7, time: '4h ago' },
  { id: 3, clubName: 'Tech Readers Collective', author: 'Alex Kumar', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexKumar', text: 'Has anyone read the follow-up article by the same author? It expands on some of the ideas in our current read.', likes: 31, replies: 15, time: '1d ago' },
];

const ClubCard = ({ club, onJoin }: { club: ReadingClub; onJoin: (id: string) => void }) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
    <div className="relative">
      <img
        src={club.currentBookCover}
        alt={club.currentBook}
        className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute top-3 right-3 flex gap-2">
        {club.isPrivate ? (
          <Badge variant="secondary" className="bg-black/50 text-white border-0">
            <Lock className="h-3 w-3 mr-1" />Private
          </Badge>
        ) : (
          <Badge variant="secondary" className="bg-black/50 text-white border-0">
            <Globe className="h-3 w-3 mr-1" />Public
          </Badge>
        )}
      </div>
      <Badge className="absolute bottom-3 left-3 bg-primary/90">{club.topic}</Badge>
    </div>

    <div className="p-5">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-bold text-base leading-tight">{club.name}</h3>
        {club.joined && (
          <Badge variant="outline" className="text-green-600 border-green-300 flex-shrink-0 text-xs">
            Joined
          </Badge>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{club.description}</p>

      <div className="flex items-center gap-1 mb-3">
        <img src={club.ownerAvatar} alt={club.owner} className="w-5 h-5 rounded-full" />
        <span className="text-xs text-muted-foreground">by <span className="font-medium text-foreground">{club.owner}</span></span>
        <Crown className="h-3 w-3 text-yellow-500 ml-0.5" />
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {club.tags.map(tag => (
          <span key={tag} className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{tag}</span>
        ))}
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
        <span className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" />
          {club.members.toLocaleString()} members
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare className="h-3.5 w-3.5" />
          {club.postsCount} posts
        </span>
      </div>

      {club.nextMeeting && (
        <div className="flex items-center gap-1.5 text-xs text-primary mb-4 bg-primary/5 rounded-lg px-3 py-2">
          <Calendar className="h-3.5 w-3.5" />
          <span>Next: {club.nextMeeting}</span>
        </div>
      )}

      <Button
        className="w-full"
        variant={club.joined ? 'outline' : 'default'}
        size="sm"
        onClick={() => onJoin(club.id)}
      >
        {club.joined ? 'View Club' : club.isPrivate ? 'Request to Join' : 'Join Club'}
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  </Card>
);

const ReadingClubs = () => {
  const { isAuthenticated } = useAuth();
  const [clubs, setClubs] = useState<ReadingClub[]>(mockClubs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newClub, setNewClub] = useState({ name: '', description: '', topic: '', isPrivate: false });

  const topics = ['All', 'Technology', 'Wellness', 'Science', 'Business', 'Philosophy', 'Writing', 'Education'];

  const handleJoin = (clubId: string) => {
    if (!isAuthenticated) {
      toast.error('Please login to join clubs');
      return;
    }
    setClubs(prev => prev.map(c => {
      if (c.id === clubId) {
        if (c.joined) {
          toast.info(`Left "${c.name}"`);
          return { ...c, joined: false, members: c.members - 1 };
        } else {
          toast.success(c.isPrivate ? `Request sent to join "${c.name}"` : `Joined "${c.name}"!`);
          return { ...c, joined: !c.isPrivate, members: c.members + 1 };
        }
      }
      return c;
    }));
  };

  const handleCreateClub = () => {
    if (!newClub.name.trim() || !newClub.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success(`Club "${newClub.name}" created!`);
    setIsCreateOpen(false);
    setNewClub({ name: '', description: '', topic: '', isPrivate: false });
  };

  const filteredClubs = clubs.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTopic = selectedTopic === 'All' || c.topic === selectedTopic;
    return matchSearch && matchTopic;
  });

  const myClubs = clubs.filter(c => c.joined);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3">
                <Users className="h-10 w-10" />
                Reading Clubs
              </h1>
              <p className="text-xl opacity-90 max-w-2xl">
                Join topic-based communities, read together, and discuss ideas with like-minded readers worldwide.
              </p>
              <div className="flex gap-6 mt-6 text-white/80">
                <div>
                  <p className="text-2xl font-bold text-white">{clubs.length}+</p>
                  <p className="text-sm">Active Clubs</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{clubs.reduce((s, c) => s + c.members, 0).toLocaleString()}+</p>
                  <p className="text-sm">Members</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{clubs.reduce((s, c) => s + c.postsCount, 0).toLocaleString()}+</p>
                  <p className="text-sm">Discussions</p>
                </div>
              </div>
            </div>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="hidden md:flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create a Club
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create a Reading Club</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-2">
                  <div>
                    <Label htmlFor="club-name">Club Name *</Label>
                    <Input
                      id="club-name"
                      placeholder="e.g. Python Readers Circle"
                      value={newClub.name}
                      onChange={(e) => setNewClub({ ...newClub, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="club-desc">Description *</Label>
                    <Textarea
                      id="club-desc"
                      placeholder="What is this club about?"
                      value={newClub.description}
                      onChange={(e) => setNewClub({ ...newClub, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="club-topic">Topic</Label>
                    <select
                      id="club-topic"
                      className="w-full mt-1 border border-input rounded-md px-3 py-2 text-sm bg-background"
                      value={newClub.topic}
                      onChange={(e) => setNewClub({ ...newClub, topic: e.target.value })}
                    >
                      <option value="">Select a topic</option>
                      {topics.filter(t => t !== 'All').map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="club-private"
                      checked={newClub.isPrivate}
                      onChange={(e) => setNewClub({ ...newClub, isPrivate: e.target.checked })}
                      className="w-4 h-4 accent-primary"
                    />
                    <Label htmlFor="club-private" className="cursor-pointer">
                      Make this club private (invitation only)
                    </Label>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button className="flex-1" onClick={handleCreateClub}>Create Club</Button>
                    <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Tabs defaultValue="discover">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="discover">
                <TrendingUp className="h-4 w-4 mr-2" />
                Discover
              </TabsTrigger>
              <TabsTrigger value="my-clubs">
                <BookOpen className="h-4 w-4 mr-2" />
                My Clubs ({myClubs.length})
              </TabsTrigger>
              <TabsTrigger value="discussions">
                <MessageSquare className="h-4 w-4 mr-2" />
                Discussions
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 relative sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clubs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <TabsContent value="discover">
            {/* Topic Filter */}
            <div className="flex gap-2 flex-wrap mb-6">
              {topics.map(topic => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedTopic === topic
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            {filteredClubs.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">No clubs found</p>
                <p className="text-sm mt-1">Try a different search or topic filter</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClubs.map(club => (
                  <ClubCard key={club.id} club={club} onJoin={handleJoin} />
                ))}
              </div>
            )}

            {/* Mobile Create Button */}
            <div className="mt-8 text-center md:hidden">
              <Button size="lg" onClick={() => isAuthenticated ? setIsCreateOpen(true) : toast.error('Please login first')}>
                <Plus className="h-5 w-5 mr-2" />
                Create a Club
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="my-clubs">
            {myClubs.length === 0 ? (
              <Card className="p-16 text-center">
                <BookOpen className="h-14 w-14 mx-auto mb-4 text-muted-foreground opacity-40" />
                <h3 className="text-xl font-semibold mb-2">No clubs joined yet</h3>
                <p className="text-muted-foreground mb-6">Discover and join reading clubs to connect with other readers.</p>
                <Button onClick={() => document.querySelector('[data-value="discover"]')?.dispatchEvent(new Event('click'))}>
                  Browse Clubs
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {myClubs.map(club => (
                  <ClubCard key={club.id} club={club} onJoin={handleJoin} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="discussions">
            <div className="space-y-4">
              {mockDiscussions.map(disc => (
                <Card key={disc.id} className="p-5 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <img src={disc.avatar} alt={disc.author} className="w-10 h-10 rounded-full flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-semibold text-sm">{disc.author}</span>
                        <span className="text-muted-foreground text-xs">in</span>
                        <Badge variant="outline" className="text-xs">{disc.clubName}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto">
                          <Clock className="h-3 w-3" />{disc.time}
                        </span>
                      </div>
                      <p className="text-sm mb-3">{disc.text}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                          <Users className="h-3.5 w-3.5" />{disc.likes} likes
                        </button>
                        <button className="flex items-center gap-1 hover:text-primary transition-colors">
                          <MessageSquare className="h-3.5 w-3.5" />{disc.replies} replies
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReadingClubs;
