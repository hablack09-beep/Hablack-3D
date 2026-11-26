import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, User } from 'firebase/auth';

const env = (import.meta as any).env;
export const isConfigured = Boolean(env.VITE_FIREBASE_API_KEY && env.VITE_FIREBASE_API_KEY !== 'dummy');

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "dummy",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "dummy",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "dummy",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "dummy",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "dummy",
  appId: env.VITE_FIREBASE_APP_ID || "dummy"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  if (!isConfigured) {
    // If Firebase isn't properly configured yet, simulate a login for testing purposes
    console.warn("Firebase is not configured. Simulating Google Login.");
    return {
      uid: 'admin-mock-123',
      displayName: 'Hablack Admin',
      email: 'hablack09@gmail.com',
      photoURL: 'https://ui-avatars.com/api/?name=Hablack+Admin&background=0D8ABC&color=fff'
    } as User;
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const signOutUser = async () => {
  if (!isConfigured) {
    return Promise.resolve();
  }
  return firebaseSignOut(auth);
};

