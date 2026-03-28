import { HeroSlider } from '@/components/features/HeroSlider';
import { ContentCard } from '@/components/features/ContentCard';
import { RecommendationWidget } from '@/components/features/RecommendationWidget';
import { useContent } from '@/contexts/ContentContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate, Link } from 'react-router-dom';
import {
  TrendingUp,
  BookOpen,
  Users,
  Award,
  Star,
  Zap,
  Target,
  Crown,
  CheckCircle2,
  Laptop,
  Microscope,
  Briefcase,
  Heart,
  GraduationCap,
  Palette,
} from 'lucide-react';
import premiumBenefits from '@/assets/premium-benefits.jpg';

const Index = () => {
  const { getTrendingContent, getRecommendedContent } = useContent();
  const { user } = useAuth();
  const navigate = useNavigate();

  const trending = getTrendingContent();

  const categories = [
    { name: 'Technology', icon: Laptop, count: '1.2k articles', color: 'bg-blue-500' },
    { name: 'Science', icon: Microscope, count: '856 articles', color: 'bg-green-500' },
    { name: 'Business', icon: Briefcase, count: '2.1k articles', color: 'bg-purple-500' },
    { name: 'Health', icon: Heart, count: '945 articles', color: 'bg-red-500' },
    { name: 'Education', icon: GraduationCap, count: '1.5k articles', color: 'bg-yellow-500' },
    { name: 'Art & Design', icon: Palette, count: '678 articles', color: 'bg-pink-500' },
  ];

  const authors = [
    {
      name: 'Dr. Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen',
      followers: '24.5k',
      articles: 142,
    },
    {
      name: 'Alex Kumar',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexKumar',
      followers: '18.3k',
      articles: 98,
    },
    {
      name: 'Emma Watson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EmmaWatson',
      followers: '32.1k',
      articles: 215,
    },
    {
      name: 'Prof. Michael Zhang',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MichaelZhang',
      followers: '45.8k',
      articles: 324,
    },
  ];

  const learningPaths = [
    {
      title: 'Web Development Mastery',
      courses: 12,
      duration: '6 months',
      level: 'Intermediate',
      students: 5420,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&auto=format&fit=crop',
    },
    {
      title: 'Data Science Fundamentals',
      courses: 8,
      duration: '4 months',
      level: 'Beginner',
      students: 8930,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop',
    },
    {
      title: 'Creative Writing Workshop',
      courses: 6,
      duration: '3 months',
      level: 'All Levels',
      students: 3210,
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&auto=format&fit=crop',
    },
  ];

  const testimonials = [
    {
      name: 'Jessica Park',
      role: 'Content Creator',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JessicaPark',
      comment: 'NextPage transformed how I share my knowledge. The platform is intuitive and my audience engagement has tripled!',
      rating: 5,
    },
    {
      name: 'David Miller',
      role: 'Educator',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidMiller',
      comment: 'As an educator, I love the learning path features. My students stay engaged and track their progress effortlessly.',
      rating: 5,
    },
    {
      name: 'Maria Garcia',
      role: 'Avid Reader',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MariaGarcia',
      comment: 'The personalized recommendations are spot-on! I discover amazing content every day that matches my interests perfectly.',
      rating: 5,
    },
  ];

  const stats = [
    { label: 'Active Readers', value: '2.5M+', icon: Users },
    { label: 'Published Articles', value: '500k+', icon: BookOpen },
    { label: 'Expert Authors', value: '50k+', icon: Award },
    { label: 'Learning Paths', value: '1.2k+', icon: Target },
  ];

  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: 'forever',
      features: [
        'Access to free content',
        'Basic reading features',
        'Community access',
        'Limited bookmarks',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Premium',
      price: '₹499',
      period: 'per month',
      features: [
        'Unlimited premium content',
        'Advanced reading tools',
        'Offline downloads',
        'Priority support',
        'Early access to new features',
        'Ad-free experience',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Creator',
      price: '₹999',
      period: 'per month',
      features: [
        'Everything in Premium',
        'Advanced analytics',
        'Monetization tools',
        'Custom branding',
        'Dedicated support',
        'API access',
      ],
      cta: 'Start Creating',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending / Recommended Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RecommendationWidget limit={6} />
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Explore by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <Card
                  key={category.name}
                  className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => navigate('/categories')}
                >
                  <div className={`h-16 w-16 rounded-full ${category.color} mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Authors */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Authors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {authors.map((author, index) => (
              <Link key={author.name} to={`/author/author-${index + 1}`}>
                <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="h-24 w-24 rounded-full mx-auto mb-4 border-4 border-primary"
                  />
                  <h3 className="font-semibold mb-2">{author.name}</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>{author.followers} followers</p>
                    <p>{author.articles} articles</p>
                  </div>
                  <Button size="sm" className="mt-4 w-full">
                    View Profile
                  </Button>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Popular Learning Paths</h2>
            <Button variant="outline" onClick={() => navigate('/learning-paths')}>
              View All Paths
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningPaths.map(path => (
              <Card key={path.title} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <img src={path.image} alt={path.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge>{path.level}</Badge>
                    <Badge variant="outline">{path.courses} courses</Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{path.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{path.duration}</span>
                    <span>{path.students.toLocaleString()} students</span>
                  </div>
                  <Button className="w-full mt-4">Start Learning</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Community Says</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <Card key={testimonial.name} className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.comment}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Highlights */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Join Our Thriving Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <Zap className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-3">Engage & Discuss</h3>
              <p className="text-muted-foreground">
                Join vibrant discussions, share insights, and connect with like-minded readers and creators.
              </p>
            </Card>
            <Card className="p-8 text-center">
              <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-3">Earn Achievements</h3>
              <p className="text-muted-foreground">
                Complete reading streaks, master topics, and unlock badges as you grow your knowledge.
              </p>
            </Card>
            <Card className="p-8 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-3">Build Your Network</h3>
              <p className="text-muted-foreground">
                Follow your favorite authors, discover new voices, and grow your professional network.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Unlock premium content, advanced features, and support independent creators.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map(plan => (
              <Card
                key={plan.name}
                className={`p-8 relative ${plan.popular ? 'border-primary border-2 shadow-lg' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary">
                    <Crown className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.popular ? 'gradient-primary' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => navigate('/subscription')}
                >
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Benefits Banner */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src={premiumBenefits}
                alt="Premium Benefits"
                className="w-full h-full object-cover"
              />
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-4">Unlock Your Full Potential</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Get unlimited access to premium content, advanced learning tools, and exclusive features designed to accelerate your knowledge journey.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Unlimited premium content access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Download content for offline reading</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Advanced progress tracking & analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Ad-free reading experience</span>
                  </li>
                </ul>
                <Button size="lg" className="gradient-primary" onClick={() => navigate('/subscription')}>
                  Start Your Free Trial
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">From Our Blog</h2>
            <Button variant="outline" onClick={() => navigate('/blog')}>
              Read More
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/blog')}>
              <img
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop"
                alt="Blog post"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <Badge className="mb-3">Platform Updates</Badge>
                <h3 className="text-xl font-semibold mb-2">
                  Introducing New Reading Features for Enhanced Experience
                </h3>
                <p className="text-muted-foreground mb-4">
                  Discover the latest features we've added to make your reading journey more enjoyable and productive.
                </p>
                <p className="text-sm text-muted-foreground">March 25, 2026 • 5 min read</p>
              </div>
            </Card>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/blog')}>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop"
                alt="Blog post"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <Badge className="mb-3">Tips & Tricks</Badge>
                <h3 className="text-xl font-semibold mb-2">
                  How Top Authors Build Their Audience on NextPage
                </h3>
                <p className="text-muted-foreground mb-4">
                  Learn proven strategies from successful authors who've grown their following and monetized their expertise.
                </p>
                <p className="text-sm text-muted-foreground">March 20, 2026 • 8 min read</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Knowledge Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join millions of readers and creators who are already transforming the way they learn and share knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8"
              onClick={() => navigate('/register')}
            >
              Sign Up Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-white/10 text-white border-white hover:bg-white hover:text-primary"
              onClick={() => navigate('/discover')}
            >
              Explore Content
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
