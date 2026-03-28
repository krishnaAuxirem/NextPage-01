import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flag, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

const Moderation = () => {
  const reports = [
    {
      id: 1,
      type: 'content',
      title: 'Inappropriate language in article',
      reporter: 'user@example.com',
      contentTitle: 'The Future of AI',
      reason: 'Offensive language',
      status: 'pending',
      date: '2026-03-25',
    },
    {
      id: 2,
      type: 'comment',
      title: 'Spam comment reported',
      reporter: 'reader@example.com',
      contentTitle: 'Web Development Guide',
      reason: 'Spam',
      status: 'pending',
      date: '2026-03-24',
    },
    {
      id: 3,
      type: 'user',
      title: 'Suspicious user activity',
      reporter: 'admin@example.com',
      contentTitle: 'Multiple accounts detected',
      reason: 'Policy violation',
      status: 'resolved',
      date: '2026-03-23',
    },
  ];

  const handleResolve = (id: number) => {
    toast.success('Report resolved');
  };

  const handleDismiss = (id: number) => {
    toast.info('Report dismissed');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Moderation</h1>
        <p className="text-muted-foreground">Review and manage reported content</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-6">
          <Flag className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">23</p>
          <p className="text-sm text-muted-foreground">Pending Reports</p>
        </Card>
        <Card className="p-6">
          <AlertTriangle className="h-8 w-8 mb-2 text-yellow-500" />
          <p className="text-2xl font-bold">8</p>
          <p className="text-sm text-muted-foreground">High Priority</p>
        </Card>
        <Card className="p-6">
          <CheckCircle className="h-8 w-8 mb-2 text-green-500" />
          <p className="text-2xl font-bold">145</p>
          <p className="text-sm text-muted-foreground">Resolved</p>
        </Card>
        <Card className="p-6">
          <XCircle className="h-8 w-8 mb-2 text-gray-500" />
          <p className="text-2xl font-bold">32</p>
          <p className="text-sm text-muted-foreground">Dismissed</p>
        </Card>
      </div>

      {/* Reports */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
        <div className="space-y-4">
          {reports.map(report => (
            <Card key={report.id} className="p-4 border-l-4 border-l-primary">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="capitalize">{report.type}</Badge>
                    <Badge
                      variant={report.status === 'pending' ? 'destructive' : 'outline'}
                      className="capitalize"
                    >
                      {report.status}
                    </Badge>
                  </div>
                  <h4 className="font-semibold mb-1">{report.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Content: {report.contentTitle}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Reported by: {report.reporter}</span>
                    <span>Reason: {report.reason}</span>
                    <span>Date: {report.date}</span>
                  </div>
                </div>
              </div>
              {report.status === 'pending' && (
                <div className="flex gap-2 pt-3 border-t">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-green-600"
                    onClick={() => handleResolve(report.id)}
                  >
                    <CheckCircle className="mr-1 h-4 w-4" />
                    Resolve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600"
                    onClick={() => handleDismiss(report.id)}
                  >
                    <XCircle className="mr-1 h-4 w-4" />
                    Dismiss
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Moderation;
