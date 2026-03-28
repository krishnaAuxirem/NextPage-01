import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, BookOpen, Clock, Users, Award } from 'lucide-react';
import { toast } from 'sonner';

const LearningPaths = () => {
  const paths = [
    {
      id: 1,
      title: 'Web Development Mastery',
      description: 'Complete journey from HTML basics to advanced React and Node.js',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop',
      courses: 12,
      duration: '6 months',
      level: 'Intermediate',
      students: 5420,
      enrolled: false,
      progress: 0,
      modules: ['HTML & CSS Fundamentals', 'JavaScript Essentials', 'React Deep Dive', 'Node.js Backend', 'Full Stack Projects'],
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      description: 'Learn Python, statistics, machine learning, and data visualization',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop',
      courses: 8,
      duration: '4 months',
      level: 'Beginner',
      students: 8930,
      enrolled: false,
      progress: 0,
      modules: ['Python Basics', 'Statistics & Probability', 'Data Analysis with Pandas', 'Machine Learning', 'Real-world Projects'],
    },
    {
      id: 3,
      title: 'Creative Writing Workshop',
      description: 'Develop your writing skills from fundamentals to publication',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop',
      courses: 6,
      duration: '3 months',
      level: 'All Levels',
      students: 3210,
      enrolled: true,
      progress: 45,
      modules: ['Writing Foundations', 'Character Development', 'Plot Structure', 'Editing Techniques', 'Publishing Guide'],
    },
    {
      id: 4,
      title: 'Digital Marketing Pro',
      description: 'Master SEO, content marketing, social media, and analytics',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop',
      courses: 10,
      duration: '5 months',
      level: 'Intermediate',
      students: 6780,
      enrolled: false,
      progress: 0,
      modules: ['SEO Mastery', 'Content Strategy', 'Social Media Marketing', 'Email Campaigns', 'Analytics & ROI'],
    },
    {
      id: 5,
      title: 'UI/UX Design Complete',
      description: 'From design principles to prototyping and user testing',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop',
      courses: 9,
      duration: '4 months',
      level: 'Beginner',
      students: 4560,
      enrolled: false,
      progress: 0,
      modules: ['Design Principles', 'Figma Mastery', 'User Research', 'Prototyping', 'Portfolio Projects'],
    },
    {
      id: 6,
      title: 'Blockchain & Crypto',
      description: 'Understand blockchain technology, smart contracts, and DeFi',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&auto=format&fit=crop',
      courses: 7,
      duration: '3 months',
      level: 'Advanced',
      students: 2340,
      enrolled: false,
      progress: 0,
      modules: ['Blockchain Basics', 'Cryptocurrencies', 'Smart Contracts', 'DeFi Protocols', 'Web3 Development'],
    },
  ];

  const handleEnroll = (pathTitle: string) => {
    toast.success(`Enrolled in ${pathTitle}!`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Learning Paths</h1>
          <p className="text-xl opacity-90">Structured journeys to master new skills</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="p-6 text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{paths.length}+</p>
            <p className="text-sm text-muted-foreground">Learning Paths</p>
          </Card>
          <Card className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">25k+</p>
            <p className="text-sm text-muted-foreground">Active Learners</p>
          </Card>
          <Card className="p-6 text-center">
            <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">15k+</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </Card>
          <Card className="p-6 text-center">
            <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">92%</p>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </Card>
        </div>

        {/* Learning Paths */}
        <div className="space-y-8">
          {paths.map(path => (
            <Card key={path.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="grid md:grid-cols-3 gap-6">
                <img src={path.image} alt={path.title} className="w-full h-64 md:h-full object-cover" />
                <div className="md:col-span-2 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{path.title}</h3>
                      <p className="text-muted-foreground mb-4">{path.description}</p>
                    </div>
                    {path.enrolled && (
                      <Badge className="bg-green-500">Enrolled</Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {path.courses} courses
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {path.duration}
                    </span>
                    <Badge variant="outline">{path.level}</Badge>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {path.students.toLocaleString()} students
                    </span>
                  </div>

                  {path.enrolled && path.progress > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Your Progress</span>
                        <span className="text-sm text-muted-foreground">{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} className="h-2" />
                    </div>
                  )}

                  <div className="mb-4">
                    <p className="text-sm font-semibold mb-2">What you'll learn:</p>
                    <div className="flex flex-wrap gap-2">
                      {path.modules.map((module, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {module}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    className={path.enrolled ? 'w-full md:w-auto' : 'w-full md:w-auto gradient-primary'}
                    onClick={() => handleEnroll(path.title)}
                  >
                    {path.enrolled ? 'Continue Learning' : 'Enroll Now'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningPaths;
