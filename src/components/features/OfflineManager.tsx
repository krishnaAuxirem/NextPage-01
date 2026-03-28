import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Download, Trash2, WifiOff, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { Content } from '@/contexts/ContentContext';

interface OfflineManagerProps {
  content: Content;
  isPremium: boolean;
}

export const OfflineManager = ({ content, isPremium }: OfflineManagerProps) => {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Check if content is already cached
    checkIfCached();

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [content.id]);

  const checkIfCached = async () => {
    if ('caches' in window) {
      const cache = await caches.open('nextpage-content-v1');
      const cached = await cache.match(`/api/content/${content.id}`);
      setIsDownloaded(!!cached);
    }
  };

  const handleDownload = async () => {
    if (!isPremium) {
      toast.error('Offline downloads are available for Premium users only');
      return;
    }

    setIsDownloading(true);
    setProgress(0);

    // Simulate download progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    // Register service worker if not already registered
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered:', registration);
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }

    // Store content in cache via service worker
    setTimeout(async () => {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'CACHE_CONTENT',
          url: `/api/content/${content.id}`,
          content: content,
        });

        // Also store in IndexedDB for metadata
        const db = await openDB();
        await addToOfflineContent(db, content);

        setIsDownloaded(true);
        setIsDownloading(false);
        toast.success('Content downloaded for offline reading!');
      } else {
        setIsDownloading(false);
        toast.error('Offline mode not available');
      }
    }, 1200);
  };

  const handleRemove = async () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'REMOVE_CACHED_CONTENT',
        url: `/api/content/${content.id}`,
      });

      const db = await openDB();
      await removeFromOfflineContent(db, content.id);

      setIsDownloaded(false);
      toast.success('Offline content removed');
    }
  };

  const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('NextPageOffline', 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('offlineContent')) {
          db.createObjectStore('offlineContent', { keyPath: 'id' });
        }
      };
    });
  };

  const addToOfflineContent = (db: IDBDatabase, content: Content): Promise<void> => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['offlineContent'], 'readwrite');
      const store = transaction.objectStore('offlineContent');
      const request = store.put({
        ...content,
        downloadedAt: new Date().toISOString(),
      });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  };

  const removeFromOfflineContent = (db: IDBDatabase, contentId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['offlineContent'], 'readwrite');
      const store = transaction.objectStore('offlineContent');
      const request = store.delete(contentId);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {!isOnline && (
            <Badge variant="outline" className="border-orange-500 text-orange-500">
              <WifiOff className="h-3 w-3 mr-1" />
              Offline
            </Badge>
          )}
          {isDownloaded && (
            <Badge variant="default" className="bg-green-500">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Downloaded
            </Badge>
          )}
          <span className="text-sm font-medium">
            {isDownloading
              ? 'Downloading...'
              : isDownloaded
              ? 'Available offline'
              : 'Download for offline reading'}
          </span>
        </div>
        {isDownloading ? (
          <div className="w-32">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1 text-center">{progress}%</p>
          </div>
        ) : isDownloaded ? (
          <Button size="sm" variant="outline" onClick={handleRemove}>
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
        ) : (
          <Button size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        )}
      </div>
      {!isPremium && !isDownloaded && (
        <p className="text-xs text-muted-foreground mt-2">
          Premium feature • Upgrade to download content for offline reading
        </p>
      )}
    </Card>
  );
};
