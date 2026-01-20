"use client";

import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { roleBaseNavLinks } from "@/constants/roleBaseNavLinks";
import LogoutModal from "../Modals/LogoutModal";
import logo from "@/assets/logo.svg";

function Sidebar() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { role, setUser } = useUser();

  const pathname = usePathname();
  const router = useRouter();

  // Determine role based on the current path if role is not set
  const getRoleFromPath = () => {
    if (pathname.startsWith("/direct-sales")) return "direct-sales";
    if (pathname.startsWith("/cruise-sales")) return "cruise-sales";
    if (pathname.startsWith("/partner-sales")) return "partner-sales";
    if (pathname.startsWith("/chief-admin")) return "chief-admin";
    return role || "direct-sales";
  };

  const currentRole = role || getRoleFromPath();

  const handleLogout = () => {
    // Clear user role cookie
    document.cookie = "userRole=; path=/; max-age=0";
    setUser(null);
    router.push("/login");
  };

  const navLinks = roleBaseNavLinks[currentRole] || [];

  // Check if a link is active
  const isActiveLink = (href: string): boolean => {
    return pathname === href;
  };

  return (
    <aside className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-8">
      {/* Logo */}
      <Link
        href={`/${role}`}
        className="mb-4 transition-opacity hover:opacity-80"
        aria-label="Home"
      >
        <Image
          src={logo}
          alt="ETRE Tours Logo"
          width={36}
          height={36}
          priority
        />
      </Link>

      {/* Navigation Links */}
      <nav
        className="flex flex-col items-center space-y-6 flex-1"
        aria-label="Main navigation"
      >
        {navLinks.map((link) => {
          const isActive = isActiveLink(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200",
                isActive ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
              )}
              aria-label={link.label}
              aria-current={isActive ? "page" : undefined}
            >
              {link.icon}
              <span className="text-xs font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div
        className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-red-500 hover:text-red-600 cursor-pointer"
        onClick={() => setIsLogoutModalOpen(true)}
      >
        <LogOut className="rotate-180" />
        <span className="text-xs font-medium">Logout</span>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </aside>
  );
}

export default Sidebar;
