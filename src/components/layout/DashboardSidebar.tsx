import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Edit3,
  BarChart3,
  Settings,
  Users,
  FileText,
  Award,
  Bookmark,
  TrendingUp,
  Shield,
  Flag,
  LineChart,
  FolderOpen,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export const DashboardSidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const readerLinks = [
    { path: '/dashboard', icon: Home, label: 'Overview' },
    { path: '/dashboard/reading', icon: BookOpen, label: 'My Reading' },
    { path: '/dashboard/bookmarks', icon: Bookmark, label: 'Bookmarks' },
    { path: '/dashboard/learning', icon: Award, label: 'Learning Paths' },
    { path: '/dashboard/following', icon: UserCheck, label: 'Following' },
    { path: '/dashboard/collections', icon: FolderOpen, label: 'Collections' },
    { path: '/dashboard/analytics', icon: LineChart, label: 'Analytics' },
    { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  const authorLinks = [
    { path: '/dashboard', icon: Home, label: 'Overview' },
    { path: '/dashboard/my-content', icon: FileText, label: 'My Content' },
    { path: '/dashboard/create', icon: Edit3, label: 'Create New' },
    { path: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/dashboard/earnings', icon: TrendingUp, label: 'Earnings' },
    { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  const adminLinks = [
    { path: '/dashboard', icon: Home, label: 'Overview' },
    { path: '/dashboard/users', icon: Users, label: 'Users' },
    { path: '/dashboard/content-management', icon: FileText, label: 'Content' },
    { path: '/dashboard/moderation', icon: Flag, label: 'Moderation' },
    { path: '/dashboard/admin-analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/dashboard/settings', icon: Shield, label: 'Settings' },
  ];

  const getLinks = () => {
    switch (user?.role) {
      case 'admin':
        return adminLinks;
      case 'author':
        return authorLinks;
      default:
        return readerLinks;
    }
  };

  const links = getLinks();

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen sticky top-16">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="h-12 w-12 rounded-full border-2 border-primary"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{user?.name}</p>
            <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
          </div>
        </div>

        <nav className="space-y-1">
          {links.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
