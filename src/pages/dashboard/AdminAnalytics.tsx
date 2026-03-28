import { Card } from '@/components/ui/card';
import { Users, FileText, TrendingUp, DollarSign } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminAnalytics = () => {
  const userGrowth = [
    { month: 'Jan', users: 95000 },
    { month: 'Feb', users: 105000 },
    { month: 'Mar', users: 125430 },
  ];

  const contentStats = [
    { category: 'Technology', count: 1245 },
    { category: 'Science', count: 856 },
    { category: 'Business', count: 2134 },
    { category: 'Health', count: 945 },
    { category: 'Education', count: 1567 },
  ];

  const userRoles = [
    { name: 'Readers', value: 75196 },
    { name: 'Authors', value: 50234 },
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Platform Analytics</h1>
        <p className="text-muted-foreground">Overview of platform performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <Users className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">125,430</p>
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="text-xs text-green-500 mt-1">+15.3% from last month</p>
        </Card>

        <Card className="p-6">
          <FileText className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">6,747</p>
          <p className="text-sm text-muted-foreground">Total Content</p>
          <p className="text-xs text-green-500 mt-1">+8.2% from last month</p>
        </Card>

        <Card className="p-6">
          <TrendingUp className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">45,678</p>
          <p className="text-sm text-muted-foreground">Active Today</p>
          <p className="text-xs text-green-500 mt-1">+5.7% from yesterday</p>
        </Card>

        <Card className="p-6">
          <DollarSign className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">₹2.4M</p>
          <p className="text-sm text-muted-foreground">Revenue (MTD)</p>
          <p className="text-xs text-green-500 mt-1">+22.1% from last month</p>
        </Card>
      </div>

      {/* User Growth */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">User Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Content by Category */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Content by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={contentStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* User Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">User Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userRoles}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {userRoles.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
