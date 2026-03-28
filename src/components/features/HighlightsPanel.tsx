import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Highlight, Note } from '@/contexts/ContentContext';
import { X, Highlighter, StickyNote, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HighlightsPanelProps {
  highlights: Highlight[];
  notes: Note[];
  onClose: () => void;
  onDeleteHighlight?: (highlight: Highlight) => void;
  onDeleteNote?: (noteId: string) => void;
}

export const HighlightsPanel = ({
  highlights,
  notes,
  onClose,
  onDeleteHighlight,
  onDeleteNote,
}: HighlightsPanelProps) => {
  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      yellow: 'bg-yellow-200 dark:bg-yellow-400/30',
      green: 'bg-green-200 dark:bg-green-400/30',
      blue: 'bg-blue-200 dark:bg-blue-400/30',
      pink: 'bg-pink-200 dark:bg-pink-400/30',
    };
    return colors[color] || colors.yellow;
  };

  return (
    <Card className="fixed right-4 top-20 w-80 max-h-[600px] shadow-2xl z-40">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Highlighter className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Highlights & Notes</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[500px]">
        <div className="p-4 space-y-4">
          {/* Highlights Section */}
          {highlights.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Highlighter className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-medium text-sm">Highlights ({highlights.length})</h4>
              </div>
              <div className="space-y-2">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${getColorClass(highlight.color)}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge variant="outline" className="text-xs capitalize">
                        {highlight.color}
                      </Badge>
                      {onDeleteHighlight && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => onDeleteHighlight(highlight)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    <p className="text-sm italic">"{highlight.text}"</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(highlight.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes Section */}
          {notes.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <StickyNote className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-medium text-sm">Notes ({notes.length})</h4>
              </div>
              <div className="space-y-2">
                {notes.map(note => (
                  <div key={note.id} className="p-3 rounded-lg border bg-amber-50 dark:bg-amber-950/20">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <StickyNote className="h-4 w-4 text-amber-600" />
                      {onDeleteNote && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => onDeleteNote(note.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    <p className="text-sm">{note.text}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(note.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {highlights.length === 0 && notes.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Highlighter className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p className="text-sm">No highlights or notes yet</p>
              <p className="text-xs mt-1">Select text to add highlights or notes</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};
