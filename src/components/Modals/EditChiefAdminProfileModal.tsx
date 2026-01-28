"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface EditChiefAdminProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    fullName: string;
    email: string;
    phoneNumber: string;
    profilePhoto: string;
  };
}

export function EditChiefAdminProfileModal({
  isOpen,
  onClose,
  userData,
}: EditChiefAdminProfileModalProps) {
  const [formData, setFormData] = useState(userData);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    userData.profilePhoto || null,
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Handle form submission - you can add API call here
    console.log("Updated admin profile:", formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Profile Photo Upload */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
              {photoPreview ? (
                <Image
                  src={photoPreview}
                  alt="Profile photo"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              ) : (
                <div className="text-blue-500 text-4xl">👤</div>
              )}
              <label
                htmlFor="photo-upload"
                className="absolute inset-0 cursor-pointer bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
              >
                <span className="text-white text-sm">📷</span>
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            <p className="text-sm font-medium">Upload a photo</p>
          </div>

          {/* Profile Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="text-xs text-gray-500">
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-xs text-gray-500">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <Label htmlFor="phoneNumber" className="text-xs text-gray-500">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="rounded-full"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 rounded-full"
            >
              Save changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
