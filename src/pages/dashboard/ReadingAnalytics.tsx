import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useContent } from '@/contexts/ContentContext';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Flame,
  Clock,
  BookOpen,
  Target,
  TrendingUp,
  Award,
  Calendar,
  Eye,
} from 'lucide-react';

const ReadingAnalytics = () => {
  const { user } = useAuth();
  const { contents, readingHistory } = useContent();

  // Mock reading data
  const totalReadingTime = 2847; // minutes
  const totalArticlesRead = readingHistory.length + 42;
  const averageSessionTime = 23; // minutes
  const monthlyGoal = 20; // articles
  const monthlyProgress = 15;

  // Weekly reading data
  const weeklyData = [
    { day: 'Mon', minutes: 45, articles: 3 },
    { day: 'Tue', minutes: 67, articles: 4 },
    { day: 'Wed', minutes: 23, articles: 2 },
    { day: 'Thu', minutes: 89, articles: 5 },
    { day: 'Fri', minutes: 54, articles: 3 },
    { day: 'Sat', minutes: 102, articles: 6 },
    { day: 'Sun', minutes: 78, articles: 4 },
  ];

  // Category distribution
  const categoryData = [
    { name: 'Technology', value: 35, color: '#3b82f6' },
    { name: 'Science', value: 25, color: '#10b981' },
    { name: 'Business', value: 20, color: '#8b5cf6' },
    { name: 'Health', value: 12, color: '#ef4444' },
    { name: 'Education', value: 8, color: '#f59e0b' },
  ];

  // Monthly progress over time
  const monthlyTrend = [
    { month: 'Jan', articles: 12 },
    { month: 'Feb', articles: 18 },
    { month: 'Mar', articles: 15 },
  ];

  const stats = [
    {
      label: 'Current Streak',
      value: `${user?.streak} days`,
      icon: Flame,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      label: 'Total Reading Time',
      value: `${Math.floor(totalReadingTime / 60)}h ${totalReadingTime % 60}m`,
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Articles Read',
      value: totalArticlesRead,
      icon: BookOpen,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Avg. Session',
      value: `${averageSessionTime} min`,
      icon: Eye,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  const achievements = [
    { name: '7-Day Streak', icon: Flame, unlocked: true, description: 'Read for 7 consecutive days' },
    { name: '50 Articles', icon: BookOpen, unlocked: true, description: 'Complete 50 articles' },
    { name: 'Early Bird', icon: Award, unlocked: true, description: 'Read before 8 AM' },
    { name: 'Night Owl', icon: Award, unlocked: false, description: 'Read after 10 PM for 5 days' },
    { name: '100 Hours', icon: Clock, unlocked: false, description: 'Spend 100 hours reading' },
    { name: 'Diverse Reader', icon: TrendingUp, unlocked: false, description: 'Read from 10 categories' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Reading Analytics</h1>
        <p className="text-muted-foreground">Track your reading habits and progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className={`h-12 w-12 rounded-lg ${stat.bgColor} flex items-center justify-center mb-4`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Monthly Goal */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Target className="h-6 w-6 text-primary" />
            <div>
              <h3 className="text-lg font-semibold">Monthly Reading Goal</h3>
              <p className="text-sm text-muted-foreground">
                {monthlyProgress} of {monthlyGoal} articles this month
              </p>
            </div>
          </div>
          <Badge variant={monthlyProgress >= monthlyGoal ? 'default' : 'secondary'} className="text-lg px-4 py-2">
            {Math.round((monthlyProgress / monthlyGoal) * 100)}%
          </Badge>
        </div>
        <Progress value={(monthlyProgress / monthlyGoal) * 100} className="h-4" />
        <p className="text-sm text-muted-foreground mt-2">
          {monthlyGoal - monthlyProgress} articles to go!
        </p>
      </Card>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Reading Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Weekly Reading Activity
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="minutes" fill="#3b82f6" name="Minutes" />
              <Bar dataKey="articles" fill="#10b981" name="Articles" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Reading by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Monthly Trend */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Reading Trend (Last 3 Months)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="articles"
              stroke="#3b82f6"
              strokeWidth={3}
              name="Articles Read"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Achievements */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Achievements
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.unlocked
                    ? 'border-primary bg-primary/5'
                    : 'border-muted bg-muted/30 opacity-60'
                }`}
              >
                <Icon
                  className={`h-8 w-8 mb-3 ${
                    achievement.unlocked ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                <h4 className="font-semibold mb-1">{achievement.name}</h4>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
                {achievement.unlocked && (
                  <Badge className="mt-2" variant="default">
                    Unlocked
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Streaks & Milestones */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Reading Streaks
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Current Streak</span>
                <Badge variant="default">{user?.streak} days</Badge>
              </div>
              <Progress value={(user?.streak || 0) / 30 * 100} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Longest Streak</span>
                <Badge variant="outline">28 days</Badge>
              </div>
              <Progress value={93} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Keep reading daily to maintain your streak!
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b">
              <span className="text-sm text-muted-foreground">Favorite reading time</span>
              <span className="font-medium">Evening (8-10 PM)</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b">
              <span className="text-sm text-muted-foreground">Most read category</span>
              <span className="font-medium">Technology</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b">
              <span className="text-sm text-muted-foreground">Average per day</span>
              <span className="font-medium">2.3 articles</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Completion rate</span>
              <span className="font-medium">87%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReadingAnalytics;
