import React, { createContext, useContext, useEffect, useState } from 'react';
import { firebaseAuthService, AuthUser } from '../services/firebaseAuth';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signUp: (email: string, password: string, displayName?: string) => Promise<AuthUser>;
  signInWithGoogle: () => Promise<AuthUser>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  getIdToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseAuthService.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string): Promise<AuthUser> => {
    setLoading(true);
    try {
      const user = await firebaseAuthService.signIn(email, password);
      setUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, displayName?: string): Promise<AuthUser> => {
    setLoading(true);
    try {
      const user = await firebaseAuthService.signUp(email, password, displayName);
      setUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async (): Promise<AuthUser> => {
    setLoading(true);
    try {
      const user = await firebaseAuthService.signInWithGoogle();
      setUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    setLoading(true);
    try {
      await firebaseAuthService.signOut();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    return firebaseAuthService.resetPassword(email);
  };

  const getIdToken = async (): Promise<string | null> => {
    return firebaseAuthService.getIdToken();
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    resetPassword,
    getIdToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
