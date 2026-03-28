import { useParams, useNavigate, Link } from 'react-router-dom';
import { useContent } from '@/contexts/ContentContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ContentCard } from '@/components/features/ContentCard';
import { FollowButton } from '@/components/features/FollowButton';
import { 
  ArrowLeft, 
  Mail, 
  MapPin,
  Twitter,
  Linkedin,
  Globe,
  BookOpen,
  Users,
  Eye,
  Award
} from 'lucide-react';

const AuthorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contents } = useContent();

  // Find author's content
  const authorContent = contents.filter(c => c.authorId === id && c.status === 'published');
  
  if (authorContent.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Author Not Found</h1>
          <Button onClick={() => navigate('/discover')}>Browse Authors</Button>
        </div>
      </div>
    );
  }

  // Get author info from first content
  const author = {
    id: authorContent[0].authorId,
    name: authorContent[0].authorName,
    avatar: authorContent[0].authorAvatar,
    bio: 'Passionate writer and educator sharing knowledge about technology, creativity, and innovation. Published author of multiple bestselling guides.',
    location: 'San Francisco, CA',
    website: 'https://example.com',
    twitter: '@authorhandle',
    linkedin: 'in/authorname',
    email: 'author@example.com',
    joinedDate: '2024',
    followers: 12450,
    following: 234,
    totalReads: authorContent.reduce((sum, c) => sum + c.reads, 0),
    totalLikes: authorContent.reduce((sum, c) => sum + c.likes, 0),
  };

  const stats = [
    { 
      icon: BookOpen, 
      label: 'Published', 
      value: authorContent.length,
      color: 'text-blue-500'
    },
    { 
      icon: Users, 
      label: 'Followers', 
      value: author.followers.toLocaleString(),
      color: 'text-green-500'
    },
    { 
      icon: Eye, 
      label: 'Total Reads', 
      value: author.totalReads.toLocaleString(),
      color: 'text-purple-500'
    },
    { 
      icon: Award, 
      label: 'Total Likes', 
      value: author.totalLikes.toLocaleString(),
      color: 'text-amber-500'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            className="mb-4 text-white hover:bg-white/20"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        {/* Profile Card */}
        <Card className="p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar & Basic Info */}
            <div className="flex flex-col items-center md:items-start">
              <img
                src={author.avatar}
                alt={author.name}
                className="h-32 w-32 rounded-full border-4 border-background shadow-lg mb-4"
              />
              <FollowButton
                authorId={author.id}
                authorName={author.name}
                className="w-full gradient-primary"
              />
            </div>

            {/* Details */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    {author.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {author.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {author.followers.toLocaleString()} followers
                    </span>
                    <span>Joined {author.joinedDate}</span>
                  </div>
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-6">{author.bio}</p>

              {/* Social Links */}
              <div className="flex flex-wrap gap-2 mb-6">
                {author.website && (
                  <Button variant="outline" size="sm">
                    <Globe className="h-4 w-4 mr-2" />
                    Website
                  </Button>
                )}
                {author.twitter && (
                  <Button variant="outline" size="sm">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                )}
                {author.linkedin && (
                  <Button variant="outline" size="sm">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                )}
                {author.email && (
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="p-4 bg-muted rounded-lg">
                      <Icon className={`h-6 w-6 mb-2 ${stat.color}`} />
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>

        {/* Published Content */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Published Content ({authorContent.length})</h2>
          
          {/* Filter by type */}
          <div className="flex gap-2 mb-6">
            <Badge variant="default" className="cursor-pointer">All</Badge>
            <Badge variant="outline" className="cursor-pointer">Articles</Badge>
            <Badge variant="outline" className="cursor-pointer">eBooks</Badge>
            <Badge variant="outline" className="cursor-pointer">Guides</Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authorContent.map(content => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        </div>

        {/* About Section */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">About {author.name}</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              {author.name} is a renowned author and educator with years of experience in creating
              engaging and informative content. Their work has helped thousands of readers enhance
              their knowledge and skills.
            </p>
            <p className="mt-4">
              With a focus on making complex topics accessible, {author.name} combines deep expertise
              with clear, practical writing that resonates with readers at all levels.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthorProfile;
