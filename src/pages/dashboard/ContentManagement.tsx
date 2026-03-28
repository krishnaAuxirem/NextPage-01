import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useContent } from '@/contexts/ContentContext';
import { FileText, Eye, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

const ContentManagement = () => {
  const { contents } = useContent();

  const handleApprove = (title: string) => {
    toast.success(`Approved: ${title}`);
  };

  const handleReject = (title: string) => {
    toast.error(`Rejected: ${title}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Content Management</h1>
        <p className="text-muted-foreground">Review and manage all platform content</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-6">
          <FileText className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">{contents.length}</p>
          <p className="text-sm text-muted-foreground">Total Content</p>
        </Card>
        <Card className="p-6">
          <CheckCircle className="h-8 w-8 mb-2 text-green-500" />
          <p className="text-2xl font-bold">{contents.filter(c => c.status === 'published').length}</p>
          <p className="text-sm text-muted-foreground">Published</p>
        </Card>
        <Card className="p-6">
          <Eye className="h-8 w-8 mb-2 text-yellow-500" />
          <p className="text-2xl font-bold">{contents.filter(c => c.status === 'review').length}</p>
          <p className="text-sm text-muted-foreground">Pending Review</p>
        </Card>
        <Card className="p-6">
          <FileText className="h-8 w-8 mb-2 text-gray-500" />
          <p className="text-2xl font-bold">{contents.filter(c => c.status === 'draft').length}</p>
          <p className="text-sm text-muted-foreground">Drafts</p>
        </Card>
      </div>

      {/* Content List */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">All Content</h3>
        <div className="space-y-3">
          {contents.slice(0, 10).map(content => (
            <div key={content.id} className="flex items-start gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
              <img src={content.coverImage} alt={content.title} className="w-24 h-24 object-cover rounded" />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold mb-1">{content.title}</h4>
                    <p className="text-sm text-muted-foreground">By {content.authorName}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="capitalize">{content.type}</Badge>
                    <Badge variant="outline" className="capitalize">{content.status}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {content.reads}
                  </span>
                  <span>{content.readingTime} min read</span>
                  <span>Published: {content.publishedAt || 'Not published'}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-green-600"
                    onClick={() => handleApprove(content.title)}
                  >
                    <CheckCircle className="mr-1 h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600"
                    onClick={() => handleReject(content.title)}
                  >
                    <XCircle className="mr-1 h-4 w-4" />
                    Reject
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ContentManagement;
