import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useContent, ContentType } from '@/contexts/ContentContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Save, Send } from 'lucide-react';

const CreateContent = () => {
  const { user } = useAuth();
  const { createContent } = useContent();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    type: 'article' as ContentType,
    category: '',
    tags: '',
    isPremium: false,
    price: 0,
  });

  const handleSaveDraft = () => {
    if (!user) return;

    createContent({
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      status: 'draft',
      authorId: user.id,
      authorName: user.name,
      authorAvatar: user.avatar || '',
      coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop',
      readingTime: Math.ceil(formData.content.split(' ').length / 200),
      publishedAt: undefined,
    });

    toast.success('Saved as draft');
    navigate('/dashboard/my-content');
  };

  const handlePublish = () => {
    if (!user) return;
    if (!formData.title || !formData.content) {
      toast.error('Please fill in title and content');
      return;
    }

    createContent({
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      status: 'published',
      authorId: user.id,
      authorName: user.name,
      authorAvatar: user.avatar || '',
      coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop',
      readingTime: Math.ceil(formData.content.split(' ').length / 200),
      publishedAt: new Date().toISOString().split('T')[0],
    });

    toast.success('Content published successfully!');
    navigate('/dashboard/my-content');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Create New Content</h1>
        <p className="text-muted-foreground">Share your knowledge with the world</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter a compelling title..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of your content..."
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Type & Category */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Content Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: ContentType) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="ebook">eBook</SelectItem>
                  <SelectItem value="guide">Guide</SelectItem>
                  <SelectItem value="magazine">Magazine</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Wellness">Wellness</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              placeholder="e.g., JavaScript, React, Web Development"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              placeholder="Write your content here..."
              rows={15}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </div>

          {/* Premium Toggle */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Premium Content</p>
              <p className="text-sm text-muted-foreground">Require subscription to access</p>
            </div>
            <Switch
              checked={formData.isPremium}
              onCheckedChange={(checked) => setFormData({ ...formData, isPremium: checked })}
            />
          </div>

          {formData.isPremium && (
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                placeholder="499"
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="mr-2 h-4 w-4" />
              Save as Draft
            </Button>
            <Button onClick={handlePublish} className="gradient-primary">
              <Send className="mr-2 h-4 w-4" />
              Publish Now
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateContent;
