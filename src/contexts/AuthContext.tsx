import React, { createContext, useContext, useEffect, useState } from 'react';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (displayName: string, photoURL: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
  updateUserProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load local user session
    const storedUser = localStorage.getItem('hablack_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Create a default local user to make things easier, no actual auth needed
      const defaultUser = {
        uid: Math.random().toString(36).substring(2, 9),
        email: null,
        displayName: null,
        photoURL: null
      };
      localStorage.setItem('hablack_user', JSON.stringify(defaultUser));
      setUser(defaultUser);
    }
    
    setLoading(false);
  }, []);

  const signIn = async () => {
    // Just a placeholder, we use local default user
  };

  const signOut = async () => {
    // Also a placeholder, we don't really sign out in local mode
  };

  const updateUserProfile = async (displayName: string, photoURL: string) => {
    if (user) {
      const updatedUser = { ...user, displayName, photoURL };
      setUser(updatedUser);
      localStorage.setItem('hablack_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
