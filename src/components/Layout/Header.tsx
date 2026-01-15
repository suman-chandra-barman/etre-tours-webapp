import Image from "next/image";
import userImg from "@/assets/user.png"
import { StaticImageData } from "next/image";

interface HeaderProps {
  userName?: string;
  userRole?: string;
  userImage?: string | StaticImageData;
}

export default function Header({
  userName = "Maria",
  userRole = "Counter Master",
  userImage = userImg,
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-2">
      <div className="flex items-start justify-end">
        <div className="flex gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500">{userRole}</p>
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
