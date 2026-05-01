import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth, signInWithGoogle, signOutUser, isConfigured } from '../firebase';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (displayName: string, photoURL: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
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
    // Attempt normal firebase auth state listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Don't overwrite if we already set a mock user
      setUser(prev => prev ? prev : currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    const loggedInUser = await signInWithGoogle();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  };

  const signOut = async () => {
    await signOutUser();
    setUser(null);
  };

  const updateUserProfile = async (displayName: string, photoURL: string) => {
    if (user) {
      if (isConfigured) {
        await updateProfile(user, { displayName, photoURL });
        setUser({ ...user, displayName, photoURL } as User);
      } else {
        setUser({ ...user, displayName, photoURL } as User);
      }
    }
  };

  const isAdmin = user?.email === 'hablack09@gmail.com';

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, signIn, signOut, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
