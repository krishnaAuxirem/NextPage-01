import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Plus,
  BookOpen,
  Share2,
  Lock,
  Globe,
  Edit3,
  Trash2,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

interface Collection {
  id: string;
  name: string;
  description: string;
  contentIds: string[];
  completedIds: string[];
  isPublic: boolean;
  coverImage: string;
  createdAt: string;
}

const Collections = () => {
  const [collections, setCollections] = useState<Collection[]>([
    {
      id: 'col-1',
      name: 'React Mastery Path',
      description: 'Complete guide to mastering React from basics to advanced concepts',
      contentIds: ['content-1', 'content-2', 'content-3', 'content-4'],
      completedIds: ['content-1', 'content-2'],
      isPublic: true,
      coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&auto=format&fit=crop',
      createdAt: '2026-03-01',
    },
    {
      id: 'col-2',
      name: 'AI & Machine Learning',
      description: 'Curated articles about artificial intelligence and machine learning',
      contentIds: ['content-1', 'content-3'],
      completedIds: ['content-1'],
      isPublic: false,
      coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&auto=format&fit=crop',
      createdAt: '2026-03-10',
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newCollection, setNewCollection] = useState({
    name: '',
    description: '',
    isPublic: true,
  });

  const handleCreateCollection = () => {
    if (!newCollection.name.trim()) {
      toast.error('Please enter a collection name');
      return;
    }

    const collection: Collection = {
      id: `col-${Date.now()}`,
      name: newCollection.name,
      description: newCollection.description,
      contentIds: [],
      completedIds: [],
      isPublic: newCollection.isPublic,
      coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&auto=format&fit=crop',
      createdAt: new Date().toISOString(),
    };

    setCollections([...collections, collection]);
    setIsCreateDialogOpen(false);
    setNewCollection({ name: '', description: '', isPublic: true });
    toast.success('Collection created!');
  };

  const handleShareCollection = (collection: Collection) => {
    const shareUrl = `${window.location.origin}/collection/${collection.id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Collection link copied to clipboard!');
  };

  const handleDeleteCollection = (id: string) => {
    setCollections(collections.filter(c => c.id !== id));
    toast.success('Collection deleted');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Collections</h1>
          <p className="text-muted-foreground">
            Organize your reading into custom collections
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Collection
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Collection</DialogTitle>
              <DialogDescription>
                Organize your content into themed collections for focused learning
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Collection Name</label>
                <Input
                  placeholder="e.g., Web Development Essentials"
                  value={newCollection.name}
                  onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  placeholder="What's this collection about?"
                  value={newCollection.description}
                  onChange={(e) => setNewCollection({ ...newCollection, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Visibility:</label>
                <div className="flex gap-2">
                  <Button
                    variant={newCollection.isPublic ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNewCollection({ ...newCollection, isPublic: true })}
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Public
                  </Button>
                  <Button
                    variant={!newCollection.isPublic ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNewCollection({ ...newCollection, isPublic: false })}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Private
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCollection}>Create Collection</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6">
          <BookOpen className="h-8 w-8 mb-3 text-blue-500" />
          <p className="text-2xl font-bold mb-1">{collections.length}</p>
          <p className="text-sm text-muted-foreground">Total Collections</p>
        </Card>
        <Card className="p-6">
          <CheckCircle2 className="h-8 w-8 mb-3 text-green-500" />
          <p className="text-2xl font-bold mb-1">
            {collections.reduce((sum, c) => sum + c.completedIds.length, 0)}
          </p>
          <p className="text-sm text-muted-foreground">Items Completed</p>
        </Card>
        <Card className="p-6">
          <Globe className="h-8 w-8 mb-3 text-purple-500" />
          <p className="text-2xl font-bold mb-1">
            {collections.filter(c => c.isPublic).length}
          </p>
          <p className="text-sm text-muted-foreground">Public Collections</p>
        </Card>
      </div>

      {/* Collections Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {collections.map(collection => {
          const progress = (collection.completedIds.length / collection.contentIds.length) * 100;
          return (
            <Card key={collection.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={collection.coverImage}
                alt={collection.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{collection.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {collection.description}
                    </p>
                  </div>
                  <Badge variant={collection.isPublic ? 'default' : 'secondary'}>
                    {collection.isPublic ? (
                      <>
                        <Globe className="h-3 w-3 mr-1" />
                        Public
                      </>
                    ) : (
                      <>
                        <Lock className="h-3 w-3 mr-1" />
                        Private
                      </>
                    )}
                  </Badge>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {collection.completedIds.length} of {collection.contentIds.length} completed
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <BookOpen className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleShareCollection(collection)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteCollection(collection.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground mt-4">
                  Created {new Date(collection.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {collections.length === 0 && (
        <Card className="p-12 text-center">
          <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
          <h3 className="text-xl font-semibold mb-2">No collections yet</h3>
          <p className="text-muted-foreground mb-6">
            Create your first collection to organize your reading
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Collection
          </Button>
        </Card>
      )}
    </div>
  );
};

export default Collections;
