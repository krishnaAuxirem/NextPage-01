import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Highlighter, StickyNote, Bookmark } from 'lucide-react';
import { useContent } from '@/contexts/ContentContext';

interface ReadingProgressProps {
  contentId: string;
}

interface ContentProgress {
  contentId: string;
  progress: number;
  lastPosition: number;
  highlightCount: number;
  noteCount: number;
  lastRead: string;
}

export const ReadingProgress = ({ contentId }: ReadingProgressProps) => {
  const { highlights, notes } = useContent();
  const [progress, setProgress] = useState<ContentProgress | null>(null);

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem(`nextpage_progress_${contentId}`);
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    } else {
      // Initialize new progress
      const newProgress: ContentProgress = {
        contentId,
        progress: 0,
        lastPosition: 0,
        highlightCount: 0,
        noteCount: 0,
        lastRead: new Date().toISOString(),
      };
      setProgress(newProgress);
    }

    // Track scroll position to update progress
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const percentage = Math.min(Math.round((scrolled / scrollHeight) * 100), 100);

      setProgress(prev => {
        if (!prev) return null;
        const updated = {
          ...prev,
          progress: percentage,
          lastPosition: scrolled,
          lastRead: new Date().toISOString(),
        };
        localStorage.setItem(`nextpage_progress_${contentId}`, JSON.stringify(updated));
        return updated;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [contentId]);

  useEffect(() => {
    // Update highlight and note counts
    const contentHighlights = highlights.filter(h => h.contentId === contentId);
    const contentNotes = notes.filter(n => n.contentId === contentId);

    setProgress(prev => {
      if (!prev) return null;
      const updated = {
        ...prev,
        highlightCount: contentHighlights.length,
        noteCount: contentNotes.length,
      };
      localStorage.setItem(`nextpage_progress_${contentId}`, JSON.stringify(updated));
      return updated;
    });
  }, [contentId, highlights, notes]);

  // Restore scroll position on mount
  useEffect(() => {
    if (progress && progress.lastPosition > 0 && progress.progress < 100) {
      const shouldRestore = window.confirm(
        `Continue reading from where you left off? (${progress.progress}% complete)`
      );
      if (shouldRestore) {
        window.scrollTo({ top: progress.lastPosition, behavior: 'smooth' });
      }
    }
  }, []);

  if (!progress) return null;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Reading Progress
        </h3>
        <span className="text-sm text-muted-foreground">
          {progress.progress}% complete
        </span>
      </div>

      <Progress value={progress.progress} className="h-2 mb-4" />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Highlighter className="h-4 w-4 text-yellow-500" />
          <span className="text-sm">
            {progress.highlightCount} {progress.highlightCount === 1 ? 'highlight' : 'highlights'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <StickyNote className="h-4 w-4 text-blue-500" />
          <span className="text-sm">
            {progress.noteCount} {progress.noteCount === 1 ? 'note' : 'notes'}
          </span>
        </div>
      </div>

      {progress.progress === 100 && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-sm text-green-700 dark:text-green-400 font-medium">
            ✓ Completed reading!
          </p>
        </div>
      )}
    </Card>
  );
};
