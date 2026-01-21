import React from "react";
import {
  Clock,
  Users,
  Hotel,
  LayoutDashboard,
  Landmark,
  Settings,
  UserRoundCog,
} from "lucide-react";
import { TUserRole } from "@/types";

interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export const roleBaseNavLinks: Record<TUserRole, NavLink[]> = {
  "chief-admin": [
    {
      href: "/chief-admin",
      label: "Overview",
      icon: <LayoutDashboard className="w-6 h-6 mb-1" />,
    },
    {
      href: "/chief-admin/tours",
      label: "Tours",
      icon: <Hotel className="w-6 h-6 mb-1" />,
    },
    {
      href: "/chief-admin/finance",
      label: "Finance",
      icon: <Landmark className="w-6 h-6 mb-1" />,
    },
    {
      href: "/chief-admin/station",
      label: "Station",
      icon: <Users className="w-6 h-6 mb-1" />,
    },
    {
      href: "/chief-admin/subcontractor",
      label: "Sub-con.",
      icon: <UserRoundCog className="w-6 h-6 mb-1" />,
    },
    {
      href: "/chief-admin/setting",
      label: "Settings",
      icon: <Settings className="w-6 h-6 mb-1" />,
    },
  ],
  "direct-sales": [
    {
      href: "/direct-sales",
      label: "Tickets",
      icon: (
        <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
        </svg>
      ),
    },
    {
      href: "/direct-sales/history",
      label: "History",
      icon: <Clock className="w-6 h-6 mb-1" />,
    },
  ],
  "cruise-sales": [
    {
      href: "/cruise-sales",
      label: "Headcounts",
      icon: <Users className="w-6 h-6 mb-1" />,
    },
    {
      href: "/cruise-sales/history",
      label: "History",
      icon: <Clock className="w-6 h-6 mb-1" />,
    },
  ],
  "partner-sales": [
    {
      href: "/partner-sales",
      label: "Hotels",
      icon: <Hotel className="w-6 h-6 mb-1" />,
    },
    {
      href: "/partner-sales/history",
      label: "History",
      icon: <Clock className="w-6 h-6 mb-1" />,
    },
  ],
};
