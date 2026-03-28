import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ContentType = 'article' | 'ebook' | 'guide' | 'magazine';
export type ContentStatus = 'draft' | 'review' | 'published' | 'archived';

export interface Content {
  id: string;
  title: string;
  description: string;
  content: string;
  type: ContentType;
  status: ContentStatus;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  coverImage: string;
  tags: string[];
  category: string;
  isPremium: boolean;
  price?: number;
  reads: number;
  likes: number;
  comments: number;
  completionRate: number;
  readingTime: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Bookmark {
  contentId: string;
  timestamp: string;
}

export interface Highlight {
  contentId: string;
  text: string;
  position: number;
  color: string;
  timestamp: string;
}

export interface Note {
  id: string;
  contentId: string;
  text: string;
  timestamp: string;
}

interface ContentContextType {
  contents: Content[];
  bookmarks: Bookmark[];
  highlights: Highlight[];
  notes: Note[];
  readingHistory: string[];
  addBookmark: (contentId: string) => void;
  removeBookmark: (contentId: string) => void;
  addHighlight: (contentId: string, text: string, position: number, color: string) => void;
  addNote: (contentId: string, text: string) => void;
  addToReadingHistory: (contentId: string) => void;
  createContent: (content: Omit<Content, 'id' | 'createdAt' | 'updatedAt' | 'reads' | 'likes' | 'comments' | 'completionRate'>) => void;
  updateContent: (id: string, updates: Partial<Content>) => void;
  deleteContent: (id: string) => void;
  likeContent: (id: string) => void;
  getTrendingContent: () => Content[];
  getRecommendedContent: (interests: string[]) => Content[];
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const mockContents: Content[] = [
  {
    id: 'content-1',
    title: 'The Future of Artificial Intelligence in Creative Industries',
    description: 'Exploring how AI is transforming creative work, from writing to visual arts, and what it means for human creativity.',
    content: 'Full article content here...',
    type: 'article',
    status: 'published',
    authorId: 'author-1',
    authorName: 'Dr. Sarah Chen',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
    tags: ['AI', 'Technology', 'Creativity'],
    category: 'Technology',
    isPremium: false,
    reads: 12458,
    likes: 892,
    comments: 124,
    completionRate: 78,
    readingTime: 8,
    publishedAt: '2026-03-15',
    createdAt: '2026-03-10',
    updatedAt: '2026-03-15',
  },
  {
    id: 'content-2',
    title: 'Mastering React Performance Optimization',
    description: 'A comprehensive guide to making your React applications lightning-fast with advanced optimization techniques.',
    content: 'Full ebook content here...',
    type: 'ebook',
    status: 'published',
    authorId: 'author-2',
    authorName: 'Alex Kumar',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexKumar',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop',
    tags: ['React', 'JavaScript', 'Web Development'],
    category: 'Programming',
    isPremium: true,
    price: 999,
    reads: 8934,
    likes: 1245,
    comments: 267,
    completionRate: 65,
    readingTime: 45,
    publishedAt: '2026-03-10',
    createdAt: '2026-02-25',
    updatedAt: '2026-03-10',
  },
  {
    id: 'content-3',
    title: 'Mindfulness in the Digital Age',
    description: 'How to maintain mental clarity and focus in an increasingly connected world.',
    content: 'Full guide content here...',
    type: 'guide',
    status: 'published',
    authorId: 'author-3',
    authorName: 'Emma Watson',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EmmaWatson',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop',
    tags: ['Mindfulness', 'Wellness', 'Productivity'],
    category: 'Wellness',
    isPremium: false,
    reads: 15789,
    likes: 2134,
    comments: 456,
    completionRate: 82,
    readingTime: 12,
    publishedAt: '2026-03-20',
    createdAt: '2026-03-18',
    updatedAt: '2026-03-20',
  },
  {
    id: 'content-4',
    title: 'The Science of Learning: Evidence-Based Study Techniques',
    description: 'Discover scientifically-proven methods to enhance your learning and retention capabilities.',
    content: 'Full article content here...',
    type: 'article',
    status: 'published',
    authorId: 'author-4',
    authorName: 'Prof. Michael Zhang',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MichaelZhang',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop',
    tags: ['Education', 'Science', 'Learning'],
    category: 'Education',
    isPremium: true,
    price: 499,
    reads: 9876,
    likes: 1567,
    comments: 234,
    completionRate: 88,
    readingTime: 15,
    publishedAt: '2026-03-22',
    createdAt: '2026-03-20',
    updatedAt: '2026-03-22',
  },
];

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contents, setContents] = useState<Content[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [readingHistory, setReadingHistory] = useState<string[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const storedContents = localStorage.getItem('nextpage_contents');
    const storedBookmarks = localStorage.getItem('nextpage_bookmarks');
    const storedHighlights = localStorage.getItem('nextpage_highlights');
    const storedNotes = localStorage.getItem('nextpage_notes');
    const storedHistory = localStorage.getItem('nextpage_reading_history');

    setContents(storedContents ? JSON.parse(storedContents) : mockContents);
    setBookmarks(storedBookmarks ? JSON.parse(storedBookmarks) : []);
    setHighlights(storedHighlights ? JSON.parse(storedHighlights) : []);
    setNotes(storedNotes ? JSON.parse(storedNotes) : []);
    setReadingHistory(storedHistory ? JSON.parse(storedHistory) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem('nextpage_contents', JSON.stringify(contents));
  }, [contents]);

  useEffect(() => {
    localStorage.setItem('nextpage_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('nextpage_highlights', JSON.stringify(highlights));
  }, [highlights]);

  useEffect(() => {
    localStorage.setItem('nextpage_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('nextpage_reading_history', JSON.stringify(readingHistory));
  }, [readingHistory]);

  const addToReadingHistory = (contentId: string) => {
    if (!readingHistory.includes(contentId)) {
      setReadingHistory([contentId, ...readingHistory.slice(0, 49)]); // Keep last 50
    }
  };

  const addBookmark = (contentId: string) => {
    const newBookmark: Bookmark = {
      contentId,
      timestamp: new Date().toISOString(),
    };
    setBookmarks([...bookmarks, newBookmark]);
  };

  const removeBookmark = (contentId: string) => {
    setBookmarks(bookmarks.filter(b => b.contentId !== contentId));
  };

  const addHighlight = (contentId: string, text: string, position: number, color: string) => {
    const newHighlight: Highlight = {
      contentId,
      text,
      position,
      color,
      timestamp: new Date().toISOString(),
    };
    setHighlights([...highlights, newHighlight]);
  };

  const addNote = (contentId: string, text: string) => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      contentId,
      text,
      timestamp: new Date().toISOString(),
    };
    setNotes([...notes, newNote]);
  };

  const createContent = (content: Omit<Content, 'id' | 'createdAt' | 'updatedAt' | 'reads' | 'likes' | 'comments' | 'completionRate'>) => {
    const newContent: Content = {
      ...content,
      id: `content-${Date.now()}`,
      reads: 0,
      likes: 0,
      comments: 0,
      completionRate: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setContents([...contents, newContent]);
  };

  const updateContent = (id: string, updates: Partial<Content>) => {
    setContents(contents.map(c => 
      c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
    ));
  };

  const deleteContent = (id: string) => {
    setContents(contents.filter(c => c.id !== id));
  };

  const likeContent = (id: string) => {
    setContents(contents.map(c => 
      c.id === id ? { ...c, likes: c.likes + 1 } : c
    ));
  };

  const getTrendingContent = () => {
    return [...contents]
      .filter(c => c.status === 'published')
      .sort((a, b) => (b.reads + b.likes * 10) - (a.reads + a.likes * 10))
      .slice(0, 6);
  };

  const getRecommendedContent = (interests: string[]) => {
    return contents
      .filter(c => 
        c.status === 'published' && 
        c.tags.some(tag => interests.includes(tag))
      )
      .slice(0, 6);
  };

  return (
    <ContentContext.Provider
      value={{
        contents,
        bookmarks,
        highlights,
        notes,
        readingHistory,
        addBookmark,
        removeBookmark,
        addHighlight,
        addNote,
        addToReadingHistory,
        createContent,
        updateContent,
        deleteContent,
        likeContent,
        getTrendingContent,
        getRecommendedContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
