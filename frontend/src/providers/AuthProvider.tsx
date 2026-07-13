'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { AuthService } from '@/services/auth/auth.service';

interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'ADMIN' | 'LANDLORD' | 'TENANT';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (token: string) => Promise<User | null>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(
    null,
  );
  const [loading, setLoading] =
    useState(true);

  function clearSession() {
    localStorage.removeItem('access_token');
    setUser(null);
  }

  async function loadUser(): Promise<User | null> {
    try {
      const { data } =
        await AuthService.me();

      setUser(data);

      return data;
    } catch (error) {
      console.error(error);

      clearSession();

      return null;
    }
  }

  async function login(
    token: string,
  ): Promise<User | null> {
    localStorage.setItem(
      'access_token',
      token,
    );

    setLoading(true);

    try {
      return await loadUser();
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await AuthService.logout();
    } catch {
      // Ignore logout API failures.
    } finally {
      clearSession();
    }
  }

  async function refreshUser() {
    setLoading(true);

    try {
      await loadUser();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let mounted = true;

    async function initialize() {
      const token =
        localStorage.getItem(
          'access_token',
        );

      if (!token) {
        if (mounted) {
          setLoading(false);
        }

        return;
      }

      if (mounted) {
        await loadUser();
        setLoading(false);
      }
    }

    initialize();

    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      login,
      logout,
      refreshUser,
    }),
    [user, loading],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider.',
    );
  }

  return context;
}