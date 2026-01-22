"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface DriverGuideFormData {
  name: string;
  licenseNo: string;
  email: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  transportType: "vehicle" | "boat";
  isChecked: boolean;
}

interface EditData {
  id: string;
  name: string;
  licenseNo: string;
  email: string;
  phoneNumber: string;
  address: string;
  transportType: "Vehicle" | "Boat";
}

interface AddDriverGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "driver" | "guide";
  mode?: "add" | "edit";
  editData?: EditData | null;
  onConfirm: (data: DriverGuideFormData) => void;
}

export function AddDriverGuideModal({
  isOpen,
  onClose,
  type,
  mode = "add",
  editData = null,
  onConfirm,
}: AddDriverGuideModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<DriverGuideFormData>({
    defaultValues: {
      name: "",
      licenseNo: "",
      email: "",
      phoneNumber: "",
      streetAddress: "",
      city: "",
      zipCode: "",
      transportType: "vehicle",
      isChecked: false,
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (mode === "edit" && editData) {
      // Parse address if needed
      const addressParts = editData.address.split(", ");
      setValue("name", editData.name);
      setValue("licenseNo", editData.licenseNo);
      setValue("email", editData.email);
      setValue("phoneNumber", editData.phoneNumber);
      setValue("streetAddress", addressParts[0] || "");
      setValue("city", addressParts[1] || "");
      setValue("zipCode", addressParts[2] || "");
      setValue(
        "transportType",
        editData.transportType === "Vehicle" ? "vehicle" : "boat",
      );
      setValue("isChecked", true);
    } else {
      reset();
    }
  }, [mode, editData, setValue, reset]);

  const onSubmit = (data: DriverGuideFormData) => {
    if (!data.isChecked) {
      alert("Please confirm that all papers are up to date");
      return;
    }
    onConfirm(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {mode === "edit" ? `Edit ${type}` : `Add a new ${type}`}&apos;s
            details
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Basic details */}
          <div>
            <Label className="text-md font-medium text-gray-600 mb-3 block">
              Basic details
            </Label>

            {/* Transport Type Radio Buttons */}
            <div className="flex gap-4 mb-4">
              <Label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="vehicle"
                  {...register("transportType")}
                  className="w-4 h-4 text-blue-500"
                />
                <span className="text-sm">Vehicle</span>
              </Label>
              <Label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="boat"
                  {...register("transportType")}
                  className="w-4 h-4 text-blue-500"
                />
                <span className="text-sm">Boat</span>
              </Label>
            </div>

            {/* Driver/Guide for */}
            <div className="mb-3">
              <Label className="text-xs text-gray-500 mb-1 block">
                {type === "driver" ? "Driver" : "Guide"} Name
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                placeholder="John Doe"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className={`h-9 ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* License No */}
            <div className="mb-3">
              <Label className="text-xs text-gray-500 mb-1 block">
                License No.<span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                placeholder="WWWVE677712P83"
                {...register("licenseNo", {
                  required: "License number is required",
                })}
                className={`h-9 ${errors.licenseNo ? "border-red-500" : ""}`}
              />
              {errors.licenseNo && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.licenseNo.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <Label className="text-xs text-gray-500 mb-1 block">
                Email<span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                type="email"
                placeholder="demomail@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`h-9 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <Label className="text-xs text-gray-500 mb-1 block">
                Phone Number<span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                placeholder="+123 45678 987"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[\d\s\-\(\)\+]+$/,
                    message: "Invalid phone number",
                  },
                })}
                className={`h-9 ${errors.phoneNumber ? "border-red-500" : ""}`}
              />
              {errors.phoneNumber && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Street Address */}
            <div className="mb-3">
              <Label className="text-xs text-gray-500 mb-1 block">
                Street Address<span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                placeholder="Street address goes here"
                {...register("streetAddress", {
                  required: "Street address is required",
                })}
                className={`h-9 ${errors.streetAddress ? "border-red-500" : ""}`}
              />
              {errors.streetAddress && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.streetAddress.message}
                </p>
              )}
            </div>

            {/* City */}
            <div className="mb-3">
              <Label className="text-xs text-gray-500 mb-1 block">
                City<span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                placeholder="New York"
                {...register("city", {
                  required: "City is required",
                })}
                className={`h-9 ${errors.city ? "border-red-500" : ""}`}
              />
              {errors.city && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* ZIP Code */}
            <div className="mb-3">
              <Label className="text-xs text-gray-500 mb-1 block">
                ZIP Code<span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                placeholder="123456"
                {...register("zipCode", {
                  required: "ZIP code is required",
                })}
                className={`h-9 ${errors.zipCode ? "border-red-500" : ""}`}
              />
              {errors.zipCode && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.zipCode.message}
                </p>
              )}
            </div>
          </div>

          {/* Upload Photo - Optional for edit mode */}
          {mode === "add" && (
            <div>
              <Button
                type="button"
                variant="outline"
                className="w-full h-10 text-blue-500 border-blue-200 bg-blue-50 hover:bg-blue-100"
                onClick={() => document.getElementById("photo-upload")?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload {type}&apos;s photo
              </Button>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </div>
          )}

          {/* Add details label */}
          {mode === "add" && (
            <>
              <div>
                <Label className="text-sm font-medium text-gray-600 block">
                  Add details
                </Label>
              </div>

              {/* Upload Driving License */}
              <div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-10 text-blue-500 border-blue-200 bg-blue-50 hover:bg-blue-100"
                  onClick={() =>
                    document.getElementById("license-upload")?.click()
                  }
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Driving License
                </Button>
                <input
                  id="license-upload"
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                />
              </div>
            </>
          )}

          {/* Checkbox */}
          <div className="flex items-start gap-2 pt-2">
            <input
              type="checkbox"
              id="papers-check"
              {...register("isChecked", {
                required: "You must confirm the papers are up to date",
              })}
              className="mt-1 w-4 h-4 text-blue-500"
            />
            <Label
              htmlFor="papers-check"
              className="text-xs text-gray-600 leading-relaxed cursor-pointer"
            >
              I&apos;ve checked and declare that all the papers are up to date
            </Label>
          </div>
          {errors.isChecked && (
            <p className="text-xs text-red-500">{errors.isChecked.message}</p>
          )}

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="px-6 rounded-full"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6 bg-blue-500 hover:bg-blue-600 rounded-full"
            >
              {mode === "edit" ? "Update" : "Confirm add"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
