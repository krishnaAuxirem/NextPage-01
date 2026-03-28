import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Save, User, Lock, Bell, Palette, Clock, BookOpen } from 'lucide-react';
import { useReadingPrefs } from '@/components/features/ReadingPreferences';
import { Slider } from '@/components/ui/slider';

const Settings = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weekly: false,
    newContent: true,
    authorActivity: true,
    readingReminder: false,
    milestones: true,
  });
  const [reminderTime, setReminderTime] = useState('20:00');
  const { prefs, updatePrefs } = useReadingPrefs();

  const handleSave = () => {
    updateProfile({ name: formData.name });
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Account Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Account Settings</h2>
        </div>
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Email cannot be changed. Contact support if needed.
            </p>
          </div>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Password */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Password & Security</h2>
        </div>
        <Button variant="outline">Change Password</Button>
      </Card>

      {/* Notifications */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Notification Preferences</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive updates via email</p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-muted-foreground">Get real-time alerts in browser</p>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Weekly Digest</p>
              <p className="text-sm text-muted-foreground">Summary of your reading activity every week</p>
            </div>
            <Switch
              checked={notifications.weekly}
              onCheckedChange={(checked) => setNotifications({ ...notifications, weekly: checked })}
            />
          </div>
        </div>
      </Card>

      {/* Reading Reminders */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Reading Reminders</h2>
        </div>
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Daily Reading Reminder</p>
              <p className="text-sm text-muted-foreground">Get a daily nudge to keep your reading streak</p>
            </div>
            <Switch
              checked={notifications.readingReminder}
              onCheckedChange={(checked) => {
                setNotifications({ ...notifications, readingReminder: checked });
                toast.success(checked ? 'Reading reminders enabled!' : 'Reading reminders disabled');
              }}
            />
          </div>
          {notifications.readingReminder && (
            <div>
              <Label htmlFor="reminder-time">Reminder Time</Label>
              <div className="flex items-center gap-3 mt-2">
                <input
                  id="reminder-time"
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="border border-input rounded-md px-3 py-2 text-sm bg-background"
                />
                <span className="text-sm text-muted-foreground">Every day at this time</span>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">New Content Alerts</p>
              <p className="text-sm text-muted-foreground">Notify when followed authors publish new content</p>
            </div>
            <Switch
              checked={notifications.newContent}
              onCheckedChange={(checked) => setNotifications({ ...notifications, newContent: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Author Activity</p>
              <p className="text-sm text-muted-foreground">Replies, comments, and milestones from authors you follow</p>
            </div>
            <Switch
              checked={notifications.authorActivity}
              onCheckedChange={(checked) => setNotifications({ ...notifications, authorActivity: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Reading Milestones</p>
              <p className="text-sm text-muted-foreground">Celebrate streaks, levels, and badge achievements</p>
            </div>
            <Switch
              checked={notifications.milestones}
              onCheckedChange={(checked) => setNotifications({ ...notifications, milestones: checked })}
            />
          </div>
        </div>
      </Card>

      {/* Appearance & Reading */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Reading Preferences</h2>
        </div>
        <div className="space-y-6">
          {/* Font Size */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Font Size</Label>
              <span className="text-sm text-muted-foreground">{prefs.fontSize}px</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">A</span>
              <Slider
                min={14}
                max={24}
                step={1}
                value={[prefs.fontSize]}
                onValueChange={([v]) => updatePrefs({ fontSize: v })}
                className="flex-1"
              />
              <span className="text-base text-muted-foreground font-medium">A</span>
            </div>
          </div>
          {/* Font Family */}
          <div>
            <Label className="mb-2 block">Font Style</Label>
            <div className="flex gap-2">
              {(['sans', 'serif', 'mono'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => updatePrefs({ fontFamily: f })}
                  className={`flex-1 py-2 text-sm rounded-lg border capitalize transition-colors ${
                    prefs.fontFamily === f
                      ? 'border-primary bg-primary/10 text-primary font-medium'
                      : 'border-border hover:border-primary/50'
                  } font-${f}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          {/* Theme */}
          <div>
            <Label className="mb-2 block">Reading Theme</Label>
            <div className="flex gap-2">
              {[
                { id: 'light' as const, label: 'Light', cls: 'bg-white text-gray-900 border-gray-200' },
                { id: 'sepia' as const, label: 'Sepia', cls: 'bg-amber-50 text-amber-900 border-amber-200' },
                { id: 'dark' as const, label: 'Dark', cls: 'bg-gray-900 text-gray-100 border-gray-700' },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => updatePrefs({ theme: t.id })}
                  className={`flex-1 py-2 text-xs rounded-lg border-2 transition-all ${t.cls} ${
                    prefs.theme === t.id ? 'border-primary scale-105' : ''
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" />
            These preferences apply across all articles on NextPage and are saved locally.
          </p>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-destructive">
        <h2 className="text-xl font-semibold mb-4 text-destructive">Danger Zone</h2>
        <div className="space-y-3">
          <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-white">
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
