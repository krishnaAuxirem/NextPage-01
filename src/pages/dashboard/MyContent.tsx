import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useContent } from '@/contexts/ContentContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const MyContent = () => {
  const { user } = useAuth();
  const { contents, deleteContent } = useContent();
  const navigate = useNavigate();

  const myContent = contents.filter(c => c.authorId === user?.id);
  const published = myContent.filter(c => c.status === 'published');
  const drafts = myContent.filter(c => c.status === 'draft');
  const archived = myContent.filter(c => c.status === 'archived');

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteContent(id);
      toast.success('Content deleted');
    }
  };

  const ContentList = ({ items }: { items: typeof myContent }) => (
    <div className="space-y-3">
      {items.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No content found</p>
        </Card>
      ) : (
        items.map(content => (
          <Card key={content.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4 flex-1">
                <img
                  src={content.coverImage}
                  alt={content.title}
                  className="w-24 h-24 object-cover rounded flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="capitalize">{content.type}</Badge>
                    <Badge variant="outline" className="capitalize">{content.status}</Badge>
                    {content.isPremium && <Badge variant="secondary">Premium</Badge>}
                  </div>
                  <h3 className="font-semibold mb-1">{content.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {content.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {content.reads}
                    </span>
                    <span>{content.likes} likes</span>
                    <span>{content.comments} comments</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => navigate(`/content/${content.id}`)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive"
                  onClick={() => handleDelete(content.id, content.title)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Content</h1>
          <p className="text-muted-foreground">Manage your published articles and drafts</p>
        </div>
        <Button onClick={() => navigate('/dashboard/create')}>Create New</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Published</p>
          <p className="text-3xl font-bold">{published.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Drafts</p>
          <p className="text-3xl font-bold">{drafts.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Total Views</p>
          <p className="text-3xl font-bold">{myContent.reduce((sum, c) => sum + c.reads, 0).toLocaleString()}</p>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="published">
        <TabsList>
          <TabsTrigger value="published">Published ({published.length})</TabsTrigger>
          <TabsTrigger value="drafts">Drafts ({drafts.length})</TabsTrigger>
          <TabsTrigger value="archived">Archived ({archived.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="published" className="mt-6">
          <ContentList items={published} />
        </TabsContent>

        <TabsContent value="drafts" className="mt-6">
          <ContentList items={drafts} />
        </TabsContent>

        <TabsContent value="archived" className="mt-6">
          <ContentList items={archived} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyContent;
