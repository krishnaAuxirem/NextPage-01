import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

interface UIContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const storedTheme = localStorage.getItem('nextpage_theme') as 'light' | 'dark' | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }

    const storedNotifications = localStorage.getItem('nextpage_notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    } else {
      // Add welcome notifications
      const welcomeNotifications: Notification[] = [
        {
          id: 'notif-1',
          title: 'Welcome to NextPage!',
          message: 'Start your knowledge journey by exploring trending content.',
          type: 'info',
          timestamp: new Date().toISOString(),
          read: false,
        },
      ];
      setNotifications(welcomeNotifications);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('nextpage_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('nextpage_theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications([newNotification, ...notifications]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <UIContext.Provider
      value={{
        theme,
        toggleTheme,
        isLoading,
        setIsLoading,
        notifications,
        addNotification,
        markNotificationAsRead,
        clearNotifications,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
