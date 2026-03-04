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
}

const UserContext = createContext<TUserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // Start with no user - will be set on login
  const [user, setUser] = useState<TUser | null>(null);

  const role = user?.role || null;

  // Store role in cookie whenever user changes
  useEffect(() => {
    if (user?.role) {
      document.cookie = `userRole=${user.role}; path=/; max-age=86400`; // 24 hours
    } else {
      // Clear cookie on logout
      document.cookie = "userRole=; path=/; max-age=0";
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, role }}>
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
