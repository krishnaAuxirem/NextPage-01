import { useAuth } from '@/contexts/AuthContext';
import { useContent } from '@/contexts/ContentContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  TrendingUp,
  Award,
  Target,
  Flame,
  Clock,
  Heart,
  Eye,
  Edit3,
  BarChart3,
  Users,
  FileText,
} from 'lucide-react';

const DashboardOverview = () => {
  const { user } = useAuth();
  const { contents, bookmarks } = useContent();
  const navigate = useNavigate();

  // Reader Dashboard
  if (user?.role === 'reader') {
    const userBookmarks = bookmarks.filter(b =>
      contents.find(c => c.id === b.contentId)
    );

    const recentlyRead = contents.filter(c => c.status === 'published').slice(0, 3);

    const nextLevel = (user.level || 1) + 1;
    const xpForNextLevel = nextLevel * 1000;
    const xpProgress = ((user.xp || 0) / xpForNextLevel) * 100;

    const stats = [
      { label: 'Reading Streak', value: `${user.streak} days`, icon: Flame, color: 'text-orange-500' },
      { label: 'Current Level', value: `Level ${user.level}`, icon: Award, color: 'text-yellow-500' },
      { label: 'Bookmarks', value: userBookmarks.length, icon: BookOpen, color: 'text-blue-500' },
      { label: 'Badges Earned', value: user.badges?.length || 0, icon: Target, color: 'text-purple-500' },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">Continue your learning journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6">
                <Icon className={`h-8 w-8 mb-3 ${stat.color}`} />
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            );
          })}
        </div>

        {/* Progress Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Level Progress</h3>
              <p className="text-sm text-muted-foreground">
                {user.xp} / {xpForNextLevel} XP to Level {nextLevel}
              </p>
            </div>
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">{user.level}</span>
            </div>
          </div>
          <Progress value={xpProgress} className="h-3" />
        </Card>

        {/* Continue Reading */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Continue Reading</h2>
            <Button variant="outline" onClick={() => navigate('/dashboard/reading')}>
              View All
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {recentlyRead.map(content => (
              <Card 
                key={content.id} 
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/content/${content.id}`)}
              >
                <img src={content.coverImage} alt={content.title} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">{content.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{content.readingTime} min</span>
                  </div>
                  <Progress value={Math.random() * 100} className="mt-3" />
                  <p className="text-xs text-muted-foreground mt-2">
                    {Math.floor(Math.random() * 100)}% complete
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {user.badges?.map(badge => (
              <div key={badge} className="text-center p-4 bg-muted rounded-lg">
                <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium capitalize">{badge.replace(/-/g, ' ')}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  // Author Dashboard
  if (user?.role === 'author') {
    const myContent = contents.filter(c => c.authorId === user.id);
    const publishedCount = myContent.filter(c => c.status === 'published').length;
    const draftCount = myContent.filter(c => c.status === 'draft').length;
    const totalReads = myContent.reduce((sum, c) => sum + c.reads, 0);
    const totalLikes = myContent.reduce((sum, c) => sum + c.likes, 0);

    const stats = [
      { label: 'Published', value: publishedCount, icon: FileText, color: 'text-green-500' },
      { label: 'Total Reads', value: totalReads.toLocaleString(), icon: Eye, color: 'text-blue-500' },
      { label: 'Total Likes', value: totalLikes, icon: Heart, color: 'text-red-500' },
      { label: 'Drafts', value: draftCount, icon: Edit3, color: 'text-yellow-500' },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Author Dashboard</h1>
          <p className="text-muted-foreground">Manage your content and track performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6">
                <Icon className={`h-8 w-8 mb-3 ${stat.color}`} />
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Button className="h-20" onClick={() => navigate('/dashboard/create')}>
              <Edit3 className="mr-2 h-5 w-5" />
              Create New Content
            </Button>
            <Button variant="outline" className="h-20" onClick={() => navigate('/dashboard/my-content')}>
              <FileText className="mr-2 h-5 w-5" />
              Manage Content
            </Button>
            <Button variant="outline" className="h-20" onClick={() => navigate('/dashboard/analytics')}>
              <BarChart3 className="mr-2 h-5 w-5" />
              View Analytics
            </Button>
          </div>
        </Card>

        {/* Recent Content */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Your Recent Content</h2>
            <Button variant="outline" onClick={() => navigate('/dashboard/my-content')}>
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {myContent.slice(0, 5).map(content => (
              <Card key={content.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{content.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="capitalize">{content.status}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {content.reads}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {content.likes}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  if (user?.role === 'admin') {
    const totalUsers = 125430;
    const totalContent = contents.length;
    const pendingModeration = 23;
    const activeUsers = 45678;

    const stats = [
      { label: 'Total Users', value: totalUsers.toLocaleString(), icon: Users, color: 'text-blue-500' },
      { label: 'Total Content', value: totalContent, icon: FileText, color: 'text-green-500' },
      { label: 'Active Users', value: activeUsers.toLocaleString(), icon: TrendingUp, color: 'text-purple-500' },
      { label: 'Pending Review', value: pendingModeration, icon: Target, color: 'text-orange-500' },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6">
                <Icon className={`h-8 w-8 mb-3 ${stat.color}`} />
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <Button onClick={() => navigate('/dashboard/users')}>
              <Users className="mr-2 h-5 w-5" />
              Manage Users
            </Button>
            <Button variant="outline" onClick={() => navigate('/dashboard/content-management')}>
              <FileText className="mr-2 h-5 w-5" />
              Content
            </Button>
            <Button variant="outline" onClick={() => navigate('/dashboard/moderation')}>
              <Target className="mr-2 h-5 w-5" />
              Moderation
            </Button>
            <Button variant="outline" onClick={() => navigate('/dashboard/admin-analytics')}>
              <BarChart3 className="mr-2 h-5 w-5" />
              Analytics
            </Button>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Platform Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <p className="flex-1 text-sm">New user registration: john.doe@example.com</p>
              <span className="text-xs text-muted-foreground">2 min ago</span>
            </div>
            <div className="flex items-center gap-3 pb-3 border-b">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <p className="flex-1 text-sm">Content published: "Advanced React Patterns"</p>
              <span className="text-xs text-muted-foreground">15 min ago</span>
            </div>
            <div className="flex items-center gap-3 pb-3 border-b">
              <div className="h-2 w-2 rounded-full bg-orange-500" />
              <p className="flex-1 text-sm">Content flagged for review</p>
              <span className="text-xs text-muted-foreground">1 hour ago</span>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return null;
};

export default DashboardOverview;
