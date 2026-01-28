"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddEditMemberModal } from "@/components/Modals/AddEditMemberModal";
import { UpdatePasswordModal } from "@/components/Modals/UpdatePasswordModal";
import { EditChiefAdminProfileModal } from "@/components/Modals/EditChiefAdminProfileModal";
import Image from "next/image";
import { Pen } from "lucide-react";
import logo from "@/assets/logo.svg";
import lock from "@/assets/lock.svg";

function SettingPage() {
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isUpdatePasswordModalOpen, setIsUpdatePasswordModalOpen] =
    useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  // Brand profile data
  const userData = {
    fullName: "Rika HotereII",
    profilePhoto: logo,
    email: "contact@etretours.com",
    phoneNumber: "+1 234 567 890",
  };

  return (
    <main className="p-6 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Manage settings</h1>

      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-sm p-6 space-y-8">
        {/*Profile Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Chief admin profile</h2>
            <button
              onClick={() => setIsEditProfileModalOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Edit brand profile"
            >
              <Pen className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
              <Image
                src={userData.profilePhoto}
                alt="User Profile Photo"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{userData.fullName}</h3>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600">{userData.email}</p>
                <p className="text-gray-600">{userData.phoneNumber}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Security Settings Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
          <div className="flex flex-col items-center py-8 bg-gray-50 rounded-lg">
            <div className="mb-4">
              <Image src={lock} alt="Security Icon" />
            </div>
            <p className="text-center text-gray-700 mb-1 font-medium">
              By updating passwords helps to secure your account.
            </p>
            <Button
              variant="outline"
              onClick={() => setIsUpdatePasswordModalOpen(true)}
              className="border-2 border-gray-800 text-gray-800 hover:bg-gray-100 rounded-full px-6"
            >
              Update password •••
            </Button>
          </div>
        </div>
      </div>

      <AddEditMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        mode="add"
      />

      <UpdatePasswordModal
        isOpen={isUpdatePasswordModalOpen}
        onClose={() => setIsUpdatePasswordModalOpen(false)}
      />

      <EditChiefAdminProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        userData={userData}
      />
    </main>
  );
}

export default SettingPage;
