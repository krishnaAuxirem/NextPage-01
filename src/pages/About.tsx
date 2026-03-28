import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Award, Target, Heart, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const values = [
    { icon: BookOpen, title: 'Knowledge for All', description: 'We believe quality knowledge should be accessible to everyone, everywhere.' },
    { icon: Users, title: 'Community First', description: 'Building a supportive community where creators and learners thrive together.' },
    { icon: Award, title: 'Quality Content', description: 'Maintaining high standards while celebrating diverse perspectives and expertise.' },
    { icon: Target, title: 'Continuous Learning', description: 'Fostering lifelong learning through structured paths and gamified experiences.' },
    { icon: Heart, title: 'Creator Support', description: 'Empowering authors with tools and fair monetization to sustain their work.' },
    { icon: Zap, title: 'Innovation', description: 'Leveraging technology to enhance reading, writing, and learning experiences.' },
  ];

  const team = [
    {
      name: 'David Chen',
      role: 'CEO & Founder',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidChen',
      bio: 'Former educator passionate about democratizing knowledge access.',
    },
    {
      name: 'Sarah Miller',
      role: 'Head of Product',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahMiller',
      bio: '15+ years building user-centric learning platforms.',
    },
    {
      name: 'Alex Johnson',
      role: 'CTO',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexJohnson',
      bio: 'Tech leader with expertise in AI and content personalization.',
    },
    {
      name: 'Maria Garcia',
      role: 'Head of Community',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MariaGarcia',
      bio: 'Community builder dedicated to creator success and engagement.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About NextPage</h1>
          <p className="text-xl opacity-90 leading-relaxed">
            We're building the future of knowledge sharing—a platform where creators publish premium content,
            readers discover their passions, and learning becomes an engaging journey.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Mission</h2>
          <Card className="p-12 text-center max-w-4xl mx-auto">
            <p className="text-xl text-muted-foreground leading-relaxed">
              To empower <span className="text-foreground font-semibold">creators</span> to share their expertise,
              enable <span className="text-foreground font-semibold">readers</span> to discover transformative knowledge,
              and build a <span className="text-foreground font-semibold">community</span> where learning is
              rewarding, engaging, and accessible to all.
            </p>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
                  <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-20 py-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">2.5M+</p>
              <p className="text-muted-foreground">Active Readers</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">50k+</p>
              <p className="text-muted-foreground">Expert Authors</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">500k+</p>
              <p className="text-muted-foreground">Articles Published</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">1.2k+</p>
              <p className="text-muted-foreground">Learning Paths</p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-24 w-24 rounded-full mx-auto mb-4 border-4 border-primary"
                />
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-primary mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="p-12 text-center bg-gradient-to-r from-primary to-secondary text-white">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Whether you're here to learn, create, or share—there's a place for you in the NextPage community.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => navigate('/register')}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary" onClick={() => navigate('/contact')}>
              Contact Us
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
