import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'reader' | 'author' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  interests?: string[];
  level?: number;
  xp?: number;
  streak?: number;
  badges?: string[];
  following?: number;
  followers?: number;
  followedAuthors?: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  followAuthor: (authorId: string) => void;
  unfollowAuthor: (authorId: string) => void;
  isFollowingAuthor: (authorId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('nextpage_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo credentials
    const demoUsers: Record<string, User> = {
      'demo@user.com': {
        id: 'user-1',
        email: 'demo@user.com',
        name: 'Demo Reader',
        role: 'reader',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DemoUser',
        bio: 'Passionate reader and knowledge enthusiast',
        interests: ['Technology', 'Science', 'Philosophy'],
        level: 12,
        xp: 2450,
        streak: 15,
        badges: ['7-day-streak', 'early-adopter', 'bookworm'],
        following: 24,
        followers: 18,
        followedAuthors: ['author-1', 'author-2'],
      },
      'admin@nextpage.com': {
        id: 'admin-1',
        email: 'admin@nextpage.com',
        name: 'Admin User',
        role: 'admin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdminUser',
        bio: 'Platform administrator',
        interests: [],
        level: 99,
        xp: 99999,
        streak: 365,
        badges: ['admin', 'founder'],
        following: 0,
        followers: 1250,
        followedAuthors: [],
      },
    };

    // Check stored users
    const storedUsers = JSON.parse(localStorage.getItem('nextpage_registered_users') || '{}');
    const allUsers = { ...demoUsers, ...storedUsers };

    if (allUsers[email] && password === '123456') {
      const loggedInUser = allUsers[email];
      setUser(loggedInUser);
      localStorage.setItem('nextpage_user', JSON.stringify(loggedInUser));
      return true;
    }

    return false;
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ): Promise<boolean> => {
    const storedUsers = JSON.parse(localStorage.getItem('nextpage_registered_users') || '{}');

    if (storedUsers[email]) {
      return false; // User already exists
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      bio: '',
      interests: [],
      level: 1,
      xp: 0,
      streak: 0,
      badges: ['new-member'],
      following: 0,
      followers: 0,
      followedAuthors: [],
    };

    storedUsers[email] = newUser;
    localStorage.setItem('nextpage_registered_users', JSON.stringify(storedUsers));
    localStorage.setItem('nextpage_last_password', password);

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nextpage_user');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('nextpage_user', JSON.stringify(updatedUser));

      // Update in registered users
      const storedUsers = JSON.parse(localStorage.getItem('nextpage_registered_users') || '{}');
      if (storedUsers[user.email]) {
        storedUsers[user.email] = updatedUser;
        localStorage.setItem('nextpage_registered_users', JSON.stringify(storedUsers));
      }
    }
  };

  const followAuthor = (authorId: string) => {
    if (user) {
      const followedAuthors = user.followedAuthors || [];
      if (!followedAuthors.includes(authorId)) {
        updateProfile({
          followedAuthors: [...followedAuthors, authorId],
          following: (user.following || 0) + 1,
        });
      }
    }
  };

  const unfollowAuthor = (authorId: string) => {
    if (user) {
      const followedAuthors = user.followedAuthors || [];
      updateProfile({
        followedAuthors: followedAuthors.filter(id => id !== authorId),
        following: Math.max((user.following || 0) - 1, 0),
      });
    }
  };

  const isFollowingAuthor = (authorId: string) => {
    return user?.followedAuthors?.includes(authorId) || false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        followAuthor,
        unfollowAuthor,
        isFollowingAuthor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
