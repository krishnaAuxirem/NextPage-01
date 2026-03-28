import { useState } from 'react';
import { ContentCard } from '@/components/features/ContentCard';
import { useContent } from '@/contexts/ContentContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, Star, Zap } from 'lucide-react';

const Discover = () => {
  const { contents, getTrendingContent } = useContent();
  const [activeTab, setActiveTab] = useState('trending');

  const trending = getTrendingContent();
  const recent = contents.filter(c => c.status === 'published').sort((a, b) => 
    new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime()
  ).slice(0, 9);
  const featured = contents.filter(c => c.status === 'published' && c.completionRate > 75).slice(0, 9);
  const premium = contents.filter(c => c.status === 'published' && c.isPremium).slice(0, 9);

  const tags = ['Technology', 'Science', 'Business', 'Health', 'Education', 'Art & Design', 'Philosophy', 'Wellness'];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Your Next Read</h1>
          <p className="text-xl opacity-90">Explore curated content from expert authors worldwide</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Popular Tags */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">POPULAR TOPICS</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white transition-colors">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="trending" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="recent" className="gap-2">
              <Clock className="h-4 w-4" />
              Recent
            </TabsTrigger>
            <TabsTrigger value="featured" className="gap-2">
              <Star className="h-4 w-4" />
              Featured
            </TabsTrigger>
            <TabsTrigger value="premium" className="gap-2">
              <Zap className="h-4 w-4" />
              Premium
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trending.map(content => (
                <ContentCard key={content.id} content={content} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recent.map(content => (
                <ContentCard key={content.id} content={content} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map(content => (
                <ContentCard key={content.id} content={content} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="premium">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premium.map(content => (
                <ContentCard key={content.id} content={content} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">Load More Content</Button>
        </div>
      </div>
    </div>
  );
};

export default Discover;
