import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Highlighter, StickyNote } from 'lucide-react';

interface HighlightToolbarProps {
  selectedText: string;
  onHighlight: (color: string) => void;
  onNote: () => void;
  position: { x: number; y: number };
}

export const HighlightToolbar = ({ selectedText, onHighlight, onNote, position }: HighlightToolbarProps) => {
  const colors = [
    { name: 'yellow', value: 'bg-yellow-200 dark:bg-yellow-400/30' },
    { name: 'green', value: 'bg-green-200 dark:bg-green-400/30' },
    { name: 'blue', value: 'bg-blue-200 dark:bg-blue-400/30' },
    { name: 'pink', value: 'bg-pink-200 dark:bg-pink-400/30' },
  ];

  if (!selectedText) return null;

  return (
    <Card
      className="fixed z-50 p-2 flex items-center gap-2 shadow-lg"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="flex items-center gap-1">
        <Highlighter className="h-4 w-4 text-muted-foreground mr-1" />
        {colors.map(color => (
          <button
            key={color.name}
            onClick={() => onHighlight(color.name)}
            className={`h-6 w-6 rounded-full border-2 border-border hover:scale-110 transition-transform ${color.value}`}
            title={`Highlight in ${color.name}`}
          />
        ))}
      </div>
      <div className="h-4 w-px bg-border" />
      <Button size="sm" variant="ghost" onClick={onNote}>
        <StickyNote className="h-4 w-4 mr-1" />
        Add Note
      </Button>
    </Card>
  );
};
