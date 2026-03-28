import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Award, Flame, Users, BookOpen, Edit2, Save } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    interests: user?.interests?.join(', ') || '',
  });

  const handleSave = () => {
    updateProfile({
      name: formData.name,
      bio: formData.bio,
      interests: formData.interests.split(',').map(i => i.trim()).filter(Boolean),
    });
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  if (!user) return null;

  const nextLevel = (user.level || 1) + 1;
  const xpForNextLevel = nextLevel * 1000;
  const xpProgress = ((user.xp || 0) / xpForNextLevel) * 100;

  const stats = [
    { icon: Flame, label: 'Current Streak', value: `${user.streak} days`, color: 'text-orange-500' },
    { icon: Award, label: 'Level', value: user.level, color: 'text-yellow-500' },
    { icon: Users, label: 'Following', value: user.following, color: 'text-blue-500' },
    { icon: BookOpen, label: 'Followers', value: user.followers, color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-32 w-32 rounded-full border-4 border-primary mb-4"
              />
              <Badge className="capitalize">{user.role}</Badge>
            </div>

            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="interests">Interests (comma-separated)</Label>
                    <Input
                      id="interests"
                      value={formData.interests}
                      onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                      placeholder="Technology, Science, Philosophy"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </div>
                  {user.bio && <p className="text-muted-foreground mb-4">{user.bio}</p>}
                  {user.interests && user.interests.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {user.interests.map(interest => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 text-center">
                <Icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            );
          })}
        </div>

        {/* Level Progress */}
        <Card className="p-6 mb-8">
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

        {/* Badges */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Achievements & Badges</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {user.badges?.map(badge => (
              <div key={badge} className="text-center p-4 bg-muted rounded-lg">
                <Award className="h-12 w-12 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium capitalize">{badge.replace(/-/g, ' ')}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
