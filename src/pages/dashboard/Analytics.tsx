import { useAuth } from '@/contexts/AuthContext';
import { useContent } from '@/contexts/ContentContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Eye, Heart, MessageCircle, Users } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const { user } = useAuth();
  const { contents } = useContent();

  const myContent = contents.filter(c => c.authorId === user?.id);

  const viewsData = [
    { name: 'Mon', views: 120 },
    { name: 'Tue', views: 210 },
    { name: 'Wed', views: 180 },
    { name: 'Thu', views: 290 },
    { name: 'Fri', views: 390 },
    { name: 'Sat', views: 450 },
    { name: 'Sun', views: 320 },
  ];

  const engagementData = [
    { name: 'Week 1', likes: 45, comments: 12, shares: 8 },
    { name: 'Week 2', likes: 78, comments: 23, shares: 15 },
    { name: 'Week 3', likes: 92, comments: 31, shares: 22 },
    { name: 'Week 4', likes: 134, comments: 45, shares: 34 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">Track your content performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Eye className="h-5 w-5 text-primary" />
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold">{myContent.reduce((sum, c) => sum + c.reads, 0).toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Total Views</p>
          <p className="text-xs text-green-500 mt-1">+12% from last week</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Heart className="h-5 w-5 text-primary" />
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold">{myContent.reduce((sum, c) => sum + c.likes, 0)}</p>
          <p className="text-sm text-muted-foreground">Total Likes</p>
          <p className="text-xs text-green-500 mt-1">+8% from last week</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold">{myContent.reduce((sum, c) => sum + c.comments, 0)}</p>
          <p className="text-sm text-muted-foreground">Total Comments</p>
          <p className="text-xs text-green-500 mt-1">+15% from last week</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-5 w-5 text-primary" />
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold">{user?.followers}</p>
          <p className="text-sm text-muted-foreground">Followers</p>
          <p className="text-xs text-green-500 mt-1">+24 this week</p>
        </Card>
      </div>

      {/* Views Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Views This Week</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={viewsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Engagement Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Engagement Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="likes" fill="hsl(var(--primary))" />
            <Bar dataKey="comments" fill="hsl(var(--secondary))" />
            <Bar dataKey="shares" fill="hsl(var(--accent))" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Top Performing Content */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top Performing Content</h3>
        <div className="space-y-3">
          {myContent
            .sort((a, b) => b.reads - a.reads)
            .slice(0, 5)
            .map((content, index) => (
              <div key={content.id} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{content.title}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {content.reads.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {content.likes}
                    </span>
                  </div>
                </div>
                <Badge>{content.completionRate}% completion</Badge>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
