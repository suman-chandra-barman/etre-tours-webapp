"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard component - Protects routes by checking user authentication
 * Shows loading state while checking localStorage, then redirects if not authenticated
 */
export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render protected content if user is not authenticated
  if (!user) {
    return null;
  }

  return <>{children}</>;
}
