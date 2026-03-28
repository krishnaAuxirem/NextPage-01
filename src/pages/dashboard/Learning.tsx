import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, CheckCircle2, Award, TrendingUp } from 'lucide-react';

const Learning = () => {
  const enrolledPaths = [
    {
      id: 1,
      title: 'Creative Writing Workshop',
      progress: 45,
      coursesCompleted: 3,
      totalCourses: 6,
      nextLesson: 'Plot Structure Fundamentals',
      streak: 5,
    },
    {
      id: 2,
      title: 'Web Development Mastery',
      progress: 15,
      coursesCompleted: 2,
      totalCourses: 12,
      nextLesson: 'JavaScript ES6 Features',
      streak: 2,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Learning Paths</h1>
        <p className="text-muted-foreground">Track your progress and continue learning</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <BookOpen className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">2</p>
          <p className="text-sm text-muted-foreground">Active Paths</p>
        </Card>
        <Card className="p-6">
          <CheckCircle2 className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">5</p>
          <p className="text-sm text-muted-foreground">Courses Completed</p>
        </Card>
        <Card className="p-6">
          <Award className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">3</p>
          <p className="text-sm text-muted-foreground">Certificates Earned</p>
        </Card>
        <Card className="p-6">
          <TrendingUp className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">78%</p>
          <p className="text-sm text-muted-foreground">Avg. Completion</p>
        </Card>
      </div>

      {/* Enrolled Paths */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Learning Paths</h2>
        <div className="space-y-4">
          {enrolledPaths.map(path => (
            <Card key={path.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{path.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Next: {path.nextLesson}
                  </p>
                </div>
                <Badge className="flex items-center gap-1">
                  🔥 {path.streak} day streak
                </Badge>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {path.coursesCompleted}/{path.totalCourses} courses • {path.progress}%
                  </span>
                </div>
                <Progress value={path.progress} className="h-2" />
              </div>

              <Button className="w-full">Continue Learning</Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommended */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recommended for You</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="font-medium">Data Science Fundamentals</p>
              <p className="text-sm text-muted-foreground">8 courses • Beginner</p>
            </div>
            <Button size="sm" variant="outline">Enroll</Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="font-medium">UI/UX Design Complete</p>
              <p className="text-sm text-muted-foreground">9 courses • Beginner</p>
            </div>
            <Button size="sm" variant="outline">Enroll</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Learning;
