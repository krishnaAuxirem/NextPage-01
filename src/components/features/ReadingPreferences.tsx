import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Settings2, Sun, Moon, AlignLeft, AlignCenter, AlignJustify } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ReadingPrefs {
  fontSize: number;         // 14-24
  lineHeight: number;       // 1.4-2.2
  fontFamily: 'sans' | 'serif' | 'mono';
  theme: 'light' | 'sepia' | 'dark';
  align: 'left' | 'center' | 'justify';
  maxWidth: 'narrow' | 'medium' | 'wide';
}

const DEFAULT_PREFS: ReadingPrefs = {
  fontSize: 18,
  lineHeight: 1.8,
  fontFamily: 'sans',
  theme: 'light',
  align: 'justify',
  maxWidth: 'medium',
};

const STORAGE_KEY = 'nextpage_reading_prefs';

export const useReadingPrefs = () => {
  const [prefs, setPrefs] = useState<ReadingPrefs>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...DEFAULT_PREFS, ...JSON.parse(stored) } : DEFAULT_PREFS;
    } catch {
      return DEFAULT_PREFS;
    }
  });

  const updatePrefs = (updates: Partial<ReadingPrefs>) => {
    setPrefs(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return { prefs, updatePrefs };
};

interface ReadingPreferencesProps {
  prefs: ReadingPrefs;
  onChange: (updates: Partial<ReadingPrefs>) => void;
}

export const ReadingPreferencesPanel = ({ prefs, onChange }: ReadingPreferencesProps) => {
  const fontFamilies = [
    { id: 'sans', label: 'Sans', style: 'font-sans' },
    { id: 'serif', label: 'Serif', style: 'font-serif' },
    { id: 'mono', label: 'Mono', style: 'font-mono' },
  ] as const;

  const themes = [
    { id: 'light', label: 'Light', bg: 'bg-white', text: 'text-gray-900', border: 'border-gray-200' },
    { id: 'sepia', label: 'Sepia', bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-200' },
    { id: 'dark', label: 'Dark', bg: 'bg-gray-900', text: 'text-gray-100', border: 'border-gray-700' },
  ] as const;

  const widths = [
    { id: 'narrow', label: 'Narrow' },
    { id: 'medium', label: 'Medium' },
    { id: 'wide', label: 'Wide' },
  ] as const;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings2 className="h-4 w-4" />
          <span className="hidden sm:inline">Reading Settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-5" align="end">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Settings2 className="h-4 w-4 text-primary" />
          Reading Preferences
        </h3>

        {/* Font Size */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Font Size</label>
            <span className="text-sm text-muted-foreground">{prefs.fontSize}px</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">A</span>
            <Slider
              min={14}
              max={24}
              step={1}
              value={[prefs.fontSize]}
              onValueChange={([v]) => onChange({ fontSize: v })}
              className="flex-1"
            />
            <span className="text-base text-muted-foreground font-medium">A</span>
          </div>
        </div>

        {/* Line Height */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Line Spacing</label>
            <span className="text-sm text-muted-foreground">{prefs.lineHeight.toFixed(1)}×</span>
          </div>
          <Slider
            min={1.4}
            max={2.2}
            step={0.1}
            value={[prefs.lineHeight]}
            onValueChange={([v]) => onChange({ lineHeight: v })}
          />
        </div>

        {/* Font Family */}
        <div className="mb-5">
          <label className="text-sm font-medium mb-2 block">Font Style</label>
          <div className="flex gap-2">
            {fontFamilies.map(f => (
              <button
                key={f.id}
                onClick={() => onChange({ fontFamily: f.id })}
                className={cn(
                  'flex-1 py-2 text-sm rounded-lg border transition-colors',
                  f.style,
                  prefs.fontFamily === f.id
                    ? 'border-primary bg-primary/10 text-primary font-medium'
                    : 'border-border hover:border-primary/50'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Theme */}
        <div className="mb-5">
          <label className="text-sm font-medium mb-2 block">Theme</label>
          <div className="flex gap-2">
            {themes.map(t => (
              <button
                key={t.id}
                onClick={() => onChange({ theme: t.id })}
                className={cn(
                  'flex-1 py-2 text-xs rounded-lg border-2 transition-all',
                  t.bg, t.text,
                  prefs.theme === t.id ? 'border-primary scale-105' : t.border
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Text Alignment */}
        <div className="mb-5">
          <label className="text-sm font-medium mb-2 block">Alignment</label>
          <div className="flex gap-2">
            {[
              { id: 'left', icon: AlignLeft },
              { id: 'center', icon: AlignCenter },
              { id: 'justify', icon: AlignJustify },
            ].map(({ id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onChange({ align: id as ReadingPrefs['align'] })}
                className={cn(
                  'flex-1 py-2 flex justify-center rounded-lg border transition-colors',
                  prefs.align === id
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Reading Width */}
        <div>
          <label className="text-sm font-medium mb-2 block">Reading Width</label>
          <div className="flex gap-2">
            {widths.map(w => (
              <button
                key={w.id}
                onClick={() => onChange({ maxWidth: w.id })}
                className={cn(
                  'flex-1 py-2 text-xs rounded-lg border transition-colors',
                  prefs.maxWidth === w.id
                    ? 'border-primary bg-primary/10 text-primary font-medium'
                    : 'border-border hover:border-primary/50'
                )}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reset */}
        <button
          onClick={() => onChange(DEFAULT_PREFS)}
          className="w-full mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors text-center"
        >
          Reset to defaults
        </button>
      </PopoverContent>
    </Popover>
  );
};
