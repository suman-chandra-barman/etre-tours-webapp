"use client";

import Image from "next/image";
import userImg from "@/assets/user.png";
import { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";

interface HeaderProps {
  userName?: string;
  userRole?: string;
  userImage?: string | StaticImageData;
}

export default function Header({
  userName = "Maria",
  userRole = "Direct Sales",
  userImage = userImg,
}: HeaderProps) {
  const params = usePathname();
  const role = params.split("/")[1];

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Hi, {userName}</h2>
        </div>
        <div className="flex gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500">
              {role == "direct-sales"
                ? "Direct Sales"
                : role === "cruise-sales"
                  ? "Cruise Sales"
                  : role === "partner-sales"
                    ? "Partner Sales"
                    : role === "admin"
                      ? "Admin"
                      : "Chief Admin"}
            </p>
          </div>
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={userImage}
              alt={userName}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
