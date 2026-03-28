"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  AuthUser,
  clearAuth,
  getToken,
  getUser,
  setUser,
  saveToken,
} from "@/lib/auth-storage";
import { User } from "../../types/auth";
import { getMeRequest } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  bootstrapAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (token: string, user: User) => {
    saveToken(token);
    setUser(user);

    setTokenState(token);
    setUserState(user);
  };

  const logout = useCallback(() => {
    clearAuth();

    setTokenState(null);
    setUserState(null);
  }, []);

  const bootstrapAuth = useCallback(async () => {
    try {
      setIsLoading(true);

      const storedToken = getToken();
      if (!storedToken) {
        setUserState(null);
        setTokenState(null);
        return;
      }

      const me = await getMeRequest(storedToken);

      setTokenState(storedToken);
      setUserState(me);
    } catch (error) {
      console.error("bootstrapAuth error:", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    bootstrapAuth();
  }, [bootstrapAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        bootstrapAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
