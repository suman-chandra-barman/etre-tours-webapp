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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

interface MemberData {
  id?: string;
  name: string;
  station: string;
  email: string;
  password: string;
  city: string;
  phoneNumber: string;
  presentAddress: string;
  permanentAddress: string;
  photo?: string;
}

interface AddEditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberData?: MemberData;
  mode?: "add" | "edit";
}

export function AddEditMemberModal({
  isOpen,
  onClose,
  memberData,
  mode = "add",
}: AddEditMemberModalProps) {
  const [formData, setFormData] = useState<MemberData>(
    memberData || {
      name: "",
      station: "",
      email: "",
      password: "",
      city: "",
      phoneNumber: "",
      presentAddress: "",
      permanentAddress: "",
    },
  );
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    memberData?.photo || null,
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

  const handleStationChange = (value: string) => {
    setFormData({
      ...formData,
      station: value,
    });
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log(`${mode === "add" ? "Adding" : "Updating"} member:`, formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {mode === "add" ? "Add Member" : "Edit Member"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Photo Upload */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-20 h-20 rounded-full border-2 border-dashed border-blue-300 flex items-center justify-center overflow-hidden bg-blue-50">
              {photoPreview ? (
                <Image
                  src={photoPreview}
                  alt="Member photo"
                  width={80}
                  height={80}
                  className="object-cover"
                />
              ) : (
                <div className="text-blue-400 text-4xl">📷</div>
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

          {/* General Information */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-3">
              General Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-xs text-gray-500">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="station" className="text-xs text-gray-500">
                  Assign Station
                </Label>
                <Select
                  value={formData.station}
                  onValueChange={handleStationChange}
                >
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Select a station" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="direct-sales">Direct Sales</SelectItem>
                    <SelectItem value="cruise-operations">
                      Cruise Operations
                    </SelectItem>
                    <SelectItem value="partner">Partner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Login Credential */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-3">
              Login Credential
            </h3>
            <div className="grid grid-cols-2 gap-4">
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
                <Label htmlFor="password" className="text-xs text-gray-500">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Enter password"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-3">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="text-xs text-gray-500">
                    City
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1"
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="phoneNumber"
                    className="text-xs text-gray-500"
                  >
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="presentAddress"
                    className="text-xs text-gray-500"
                  >
                    Present Address
                  </Label>
                  <Input
                    id="presentAddress"
                    name="presentAddress"
                    value={formData.presentAddress}
                    onChange={handleChange}
                    className="mt-1"
                    placeholder="Enter present address"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="permanentAddress"
                    className="text-xs text-gray-500"
                  >
                    Permanent Address
                  </Label>
                  <Input
                    id="permanentAddress"
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleChange}
                    className="mt-1"
                    placeholder="Enter permanent address"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="rounded-full">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 rounded-full"
            >
              {mode === "add" ? "Confirm add" : "Save changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
