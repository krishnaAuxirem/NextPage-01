import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Introducing New Reading Features for Enhanced Experience',
      excerpt: 'We are excited to announce a suite of new features designed to make your reading experience more enjoyable, productive, and personalized than ever before.',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop',
      category: 'Platform Updates',
      author: 'NextPage Team',
      date: 'March 25, 2026',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'How Top Authors Build Their Audience on NextPage',
      excerpt: 'Learn proven strategies from successful authors who have grown their following and monetized their expertise on our platform.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop',
      category: 'Tips & Tricks',
      author: 'Sarah Chen',
      date: 'March 20, 2026',
      readTime: '8 min read',
    },
    {
      id: 3,
      title: 'The Science Behind Our Personalized Recommendations',
      excerpt: 'Discover how our AI-powered recommendation engine learns your preferences to surface the most relevant content.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
      category: 'Technology',
      author: 'Alex Kumar',
      date: 'March 15, 2026',
      readTime: '6 min read',
    },
    {
      id: 4,
      title: 'Community Spotlight: Success Stories from Our Users',
      excerpt: 'Meet the creators and readers who are transforming their knowledge journey with NextPage.',
      image: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=800&auto=format&fit=crop',
      category: 'Community',
      author: 'Emma Watson',
      date: 'March 10, 2026',
      readTime: '7 min read',
    },
    {
      id: 5,
      title: 'Monetization Guide: Turn Your Knowledge Into Income',
      excerpt: 'A comprehensive guide to earning money from your content on NextPage, from premium subscriptions to sponsored articles.',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop',
      category: 'Creator Resources',
      author: 'Michael Zhang',
      date: 'March 5, 2026',
      readTime: '10 min read',
    },
    {
      id: 6,
      title: 'Best Practices for Creating Engaging Content',
      excerpt: 'Tips and techniques for writing articles that captivate readers and keep them coming back for more.',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop',
      category: 'Writing Tips',
      author: 'Lisa Park',
      date: 'February 28, 2026',
      readTime: '9 min read',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">NextPage Blog</h1>
          <p className="text-xl opacity-90">Updates, tips, and insights from our team and community</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        <Card className="mb-12 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
          <div className="grid md:grid-cols-2 gap-6">
            <img
              src={blogPosts[0].image}
              alt={blogPosts[0].title}
              className="w-full h-full object-cover"
            />
            <div className="p-8 flex flex-col justify-center">
              <Badge className="w-fit mb-4">{blogPosts[0].category}</Badge>
              <h2 className="text-3xl font-bold mb-4">{blogPosts[0].title}</h2>
              <p className="text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {blogPosts[0].author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {blogPosts[0].date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {blogPosts[0].readTime}
                </span>
              </div>
              <Button className="w-fit">
                Read More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Blog Grid */}
        <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map(post => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <Badge className="mb-3">{post.category}</Badge>
                <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                </div>
                <Button variant="ghost" className="p-0 h-auto hover:bg-transparent hover:text-primary">
                  Read More →
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">Load More Posts</Button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
