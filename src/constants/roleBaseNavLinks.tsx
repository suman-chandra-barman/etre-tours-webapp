import React from "react";
import {
  Clock,
  Users,
  LayoutDashboard,
  Landmark,
  Settings,
  UserRoundCog,
  Ticket,
  ChartLine,
  CreditCard,
} from "lucide-react";
import { TUserRole } from "@/types";
import { PiIslandDuotone } from "react-icons/pi";
import { GiSteeringWheel } from "react-icons/gi";
import { PiUsersFour } from "react-icons/pi";

interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export const roleBaseNavLinks: Record<TUserRole, NavLink[]> = {
  "chief-admin": [
    {
      href: "/chief-admin",
      label: "Analytics",
      icon: <ChartLine className="w-6 h-6 mb-1" />,
    },
    {
      href: "/chief-admin/users",
      label: "Users",
      icon: <Users className="w-6 h-6 mb-1" />,
    },
    {
      href: "/chief-admin/transactions",
      label: "Transac.",
      icon: <Landmark className="w-6 h-6 mb-1" />,
    },
    {
      href: "/chief-admin/setting",
      label: "Settings",
      icon: <Settings className="w-6 h-6 mb-1" />,
    },
  ],
  admin: [
    {
      href: "/admin",
      label: "Overview",
      icon: <LayoutDashboard className="w-6 h-6 mb-1" />,
    },
    {
      href: "/admin/tours",
      label: "Tours",
      icon: <PiIslandDuotone className="w-6 h-6 mb-1" />,
    },
    {
      href: "/admin/finance",
      label: "Finance",
      icon: <Landmark className="w-6 h-6 mb-1" />,
    },
    {
      href: "/admin/station",
      label: "Station",
      icon: <Users className="w-6 h-6 mb-1" />,
    },
    {
      href: "/admin/subcontractor",
      label: "Sub-con.",
      icon: <UserRoundCog className="w-6 h-6 mb-1" />,
    },
    {
      href: "/admin/billing",
      label: "Billing",
      icon: <CreditCard className="w-6 h-6 mb-1" />,
    },
    {
      href: "/admin/setting",
      label: "Settings",
      icon: <Settings className="w-6 h-6 mb-1" />,
    },
  ],
  "direct-sales": [
    {
      href: "/direct-sales",
      label: "Tickets",
      icon: <Ticket className="w-6 h-6 mb-1" />,
    },
    {
      href: "/direct-sales/drivers",
      label: "Drivers",
      icon: <GiSteeringWheel className="w-6 h-6 mb-1" />,
    },
    {
      href: "/direct-sales/tours",
      label: "Tours",
      icon: <PiIslandDuotone className="w-6 h-6 mb-1" />,
    },
    {
      href: "/direct-sales/my-tours",
      label: "My Tours",
      icon: <PiIslandDuotone className="w-6 h-6 mb-1" />,
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
      icon: <PiUsersFour className="w-6 h-6 mb-1" />,
    },
    {
      href: "/cruise-sales/drivers",
      label: "Drivers",
      icon: <GiSteeringWheel className="w-6 h-6 mb-1" />,
    },
    {
      href: "/cruise-sales/tours",
      label: "Tours",
      icon: <PiIslandDuotone className="w-6 h-6 mb-1" />,
    },
    {
      href: "/cruise-sales/my-tours",
      label: "My Tours",
      icon: <PiIslandDuotone className="w-6 h-6 mb-1" />,
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
      icon: <Ticket className="w-6 h-6 mb-1" />,
    },
    {
      href: "/partner-sales/drivers",
      label: "Drivers",
      icon: <GiSteeringWheel className="w-6 h-6 mb-1" />,
    },
    {
      href: "/partner-sales/tours",
      label: "Tours",
      icon: <PiIslandDuotone className="w-6 h-6 mb-1" />,
    },
    {
      href: "/partner-sales/my-tours",
      label: "My Tours",
      icon: <PiIslandDuotone className="w-6 h-6 mb-1" />,
    },
    {
      href: "/partner-sales/history",
      label: "History",
      icon: <Clock className="w-6 h-6 mb-1" />,
    },
  ],
};
