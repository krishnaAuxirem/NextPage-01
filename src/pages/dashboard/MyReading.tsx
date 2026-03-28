import { useContent } from '@/contexts/ContentContext';
import { ContentCard } from '@/components/features/ContentCard';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Clock, CheckCircle2 } from 'lucide-react';

const MyReading = () => {
  const { contents } = useContent();

  const currentlyReading = contents.filter(c => c.status === 'published').slice(0, 3);
  const completed = contents.filter(c => c.status === 'published').slice(3, 6);
  const history = contents.filter(c => c.status === 'published').slice(0, 9);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Reading</h1>
        <p className="text-muted-foreground">Track and manage your reading progress</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-6">
          <BookOpen className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">{currentlyReading.length}</p>
          <p className="text-sm text-muted-foreground">Currently Reading</p>
        </Card>
        <Card className="p-6">
          <Clock className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">24</p>
          <p className="text-sm text-muted-foreground">Hours Read</p>
        </Card>
        <Card className="p-6">
          <CheckCircle2 className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">{completed.length}</p>
          <p className="text-sm text-muted-foreground">Completed</p>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="current">
        <TabsList>
          <TabsTrigger value="current">Currently Reading</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="history">Reading History</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4 mt-6">
          {currentlyReading.map(content => (
            <Card key={content.id} className="p-4">
              <div className="flex gap-4">
                <img src={content.coverImage} alt={content.title} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{content.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{content.authorName}</p>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Progress</span>
                      <span className="text-sm text-muted-foreground">{Math.floor(Math.random() * 100)}%</span>
                    </div>
                    <Progress value={Math.random() * 100} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completed.map(content => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <div className="space-y-3">
            {history.map(content => (
              <Card key={content.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={content.coverImage} alt={content.title} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h3 className="font-semibold">{content.title}</h3>
                      <p className="text-sm text-muted-foreground">{content.authorName}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Read on {content.publishedAt}</p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyReading;
