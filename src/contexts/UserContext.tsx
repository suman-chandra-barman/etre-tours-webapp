"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { TUser, TUserRole } from "@/types";

interface TUserContextType {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
  role: TUserRole | null;
  isLoading: boolean;
}

const UserContext = createContext<TUserContextType | undefined>(undefined);

const USER_STORAGE_KEY = "etre_tours_user";

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const role = user?.role || null;

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser) as TUser;
        setUserState(parsedUser);
      }
    } catch (error) {
      console.error("Error loading user from storage:", error);
      localStorage.removeItem(USER_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Wrapper function to save user to both state and localStorage
  const setUser = (user: TUser | null) => {
    setUserState(user);

    if (user) {
      // Store user in localStorage
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      // Also store role in cookie for server-side access
      document.cookie = `userRole=${user.role}; path=/; max-age=86400`; // 24 hours
    } else {
      // Clear storage on logout
      localStorage.removeItem(USER_STORAGE_KEY);
      document.cookie = "userRole=; path=/; max-age=0";
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, role, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
