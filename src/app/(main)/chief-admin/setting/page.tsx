"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EditBrandProfileModal } from "@/components/Modals/EditBrandProfileModal";
import { AddEditMemberModal } from "@/components/Modals/AddEditMemberModal";
import Image from "next/image";
import { Pen, Plus } from "lucide-react";
import Link from "next/link";
import logo from "@/assets/logo.svg";

interface Member {
  id: string;
  name: string;
  role: string;
  photo?: string;
}

function SettingPage() {
  const [isEditBrandModalOpen, setIsEditBrandModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isEditMemberModalOpen, setIsEditMemberModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Brand profile data
  const brandData = {
    brandName: "ETRE Tours",
    username: "@alexmorgan",
    street: "1234 Street Name",
    city: "City, Country",
    state: "New York, USA",
    zipCode: "80965C16",
    phoneNumber: "+1 234 567 890",
    email: "contact@etretours.com",
    website: "etretours.com",
    logo: logo,
  };

  // Members data
  const [members, setMembers] = useState<Member[]>([
    {
      id: "1",
      name: "Emma Moray",
      role: "Direct Sales",
      photo: "",
    },
    {
      id: "2",
      name: "Emma Moray",
      role: "Cruise Operations",
      photo: "",
    },
    {
      id: "3",
      name: "Emma Moray",
      role: "Partner",
      photo: "",
    },
  ]);

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setIsEditMemberModalOpen(true);
  };

  const handleReplaceMember = (member: Member) => {
    setSelectedMember(member);
    setIsEditMemberModalOpen(true);
  };

  return (
    <main className="p-6 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Manage settings</h1>

      <div className="max-w-xl bg-white rounded-lg shadow-sm p-6 space-y-8">
        {/* Brand Profile Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Brand Profile</h2>
            <button
              onClick={() => setIsEditBrandModalOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Edit brand profile"
            >
              <Pen className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
              <Image
                src={brandData.logo}
                alt="Brand Logo"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{brandData.brandName}</h3>
              <p className="text-gray-500 text-sm mb-4">{brandData.username}</p>

              <div className="space-y-1 text-sm">
                <h4 className="font-semibold mb-2">Address</h4>
                <p className="text-gray-600">{brandData.street}</p>
                <p className="text-gray-600">{brandData.city}</p>
                <p className="text-gray-600">P: {brandData.phoneNumber}</p>
                <p className="text-gray-600">E: {brandData.email}</p>
                <Link
                  href={`https://${brandData.website}`}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                >
                  {brandData.website}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Members Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Members</h2>
            <Button
              onClick={() => setIsAddMemberModalOpen(true)}
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full"
            >
              Add member{" "}
              <span className="ml-2">
                <Plus className="w-4 h-4" />
              </span>
            </Button>
          </div>

          <div className="space-y-3">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleReplaceMember(member)}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Replace
                  </button>
                  <button
                    onClick={() => handleEditMember(member)}
                    className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                    aria-label="Edit member"
                  >
                    <Pen className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Settings Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
          <div className="flex flex-col items-center py-8 bg-gray-50 rounded-lg">
            <div className="mb-4">
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="25"
                  y="35"
                  width="30"
                  height="25"
                  rx="3"
                  fill="#5B9BD5"
                  opacity="0.3"
                />
                <path
                  d="M50 35V30C50 23.3726 44.6274 18 38 18C31.3726 18 26 23.3726 26 30V35"
                  stroke="#5B9BD5"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <rect
                  x="24"
                  y="34"
                  width="32"
                  height="28"
                  rx="4"
                  fill="#5B9BD5"
                />
                <circle cx="40" cy="48" r="4" fill="white" />
                <line
                  x1="40"
                  y1="52"
                  x2="40"
                  y2="58"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-center text-gray-700 mb-1 font-medium">
              By updating passwords helps to secure your account.
            </p>
            <p className="text-center text-gray-500 text-sm mb-6">
              Last update 13 days ago
            </p>
            <Button
              variant="outline"
              className="border-2 border-gray-800 text-gray-800 hover:bg-gray-100 rounded-full px-6"
            >
              Update password •••
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditBrandProfileModal
        isOpen={isEditBrandModalOpen}
        onClose={() => setIsEditBrandModalOpen(false)}
        brandData={brandData}
      />

      <AddEditMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        mode="add"
      />

      <AddEditMemberModal
        isOpen={isEditMemberModalOpen}
        onClose={() => {
          setIsEditMemberModalOpen(false);
          setSelectedMember(null);
        }}
        memberData={
          selectedMember
            ? {
                name: selectedMember.name,
                station: selectedMember.role.toLowerCase().replace(" ", "-"),
                email: "",
                password: "",
                city: "",
                phoneNumber: "",
                presentAddress: "",
                permanentAddress: "",
              }
            : undefined
        }
        mode="edit"
      />
    </main>
  );
}

export default SettingPage;
