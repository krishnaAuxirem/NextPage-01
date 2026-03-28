import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Facebook, Twitter, Linkedin, Link2, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
  description: string;
  url?: string;
  authorName: string;
  quote?: string;
}

export const ShareButtons = ({ title, description, url, authorName, quote }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const attribution = encodeURIComponent(`by ${authorName} on NextPage`);

  // Create share text with quote if available
  const shareText = quote 
    ? encodeURIComponent(`"${quote}" - ${title} by ${authorName}`)
    : `${encodedTitle} ${attribution}`;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    toast.success(`Opening ${platform}...`);
  };

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <Link2 className="h-4 w-4" />
        Share this content
      </h3>
      
      {quote && (
        <div className="mb-4 p-3 bg-muted rounded-lg border-l-4 border-primary">
          <p className="text-sm italic">"{quote}"</p>
          <p className="text-xs text-muted-foreground mt-1">— {authorName}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            window.open(shareLinks.twitter, '_blank');
            handleShare('Twitter');
          }}
          className="flex-1"
        >
          <Twitter className="h-4 w-4 mr-2" />
          Twitter
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            window.open(shareLinks.facebook, '_blank');
            handleShare('Facebook');
          }}
          className="flex-1"
        >
          <Facebook className="h-4 w-4 mr-2" />
          Facebook
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            window.open(shareLinks.linkedin, '_blank');
            handleShare('LinkedIn');
          }}
          className="flex-1"
        >
          <Linkedin className="h-4 w-4 mr-2" />
          LinkedIn
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="w-full"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </>
          )}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mt-3 text-center">
        Share with attribution to support the author
      </p>
    </Card>
  );
};
