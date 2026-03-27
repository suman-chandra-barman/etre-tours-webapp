"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type StaffType = "Driver" | "Guide" | "Captain";

export interface AddStaffFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  staffType: StaffType;
}

interface AddStaffModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddStaff: (data: AddStaffFormData) => void;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  address: string;
  staffType: StaffType | "";
}

const initialFormState: FormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  staffType: "",
};

function AddStaffModal({ open, onOpenChange, onAddStaff }: AddStaffModalProps) {
  const [formData, setFormData] = useState<FormState>(initialFormState);

  const isSubmitDisabled = useMemo(() => {
    return (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.staffType
    );
  }, [formData]);

  const resetForm = () => {
    setFormData(initialFormState);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      resetForm();
    }
  };

  const handleSubmit = () => {
    if (isSubmitDisabled || !formData.staffType) return;

    onAddStaff({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      staffType: formData.staffType,
    });

    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Staff</DialogTitle>
          <DialogDescription>
            Fill in staff information to add a new driver or guide.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="staff-name" className="text-xs text-gray-500">
              Name
            </Label>
            <Input
              id="staff-name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, name: event.target.value }))
              }
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="staff-email" className="text-xs text-gray-500">
              Email
            </Label>
            <Input
              id="staff-email"
              type="email"
              placeholder="staff@example.com"
              value={formData.email}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, email: event.target.value }))
              }
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="staff-phone" className="text-xs text-gray-500">
              Phone
            </Label>
            <Input
              id="staff-phone"
              placeholder="+977 98XXXXXXXX"
              value={formData.phone}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, phone: event.target.value }))
              }
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="staff-address" className="text-xs text-gray-500">
              Address
            </Label>
            <Input
              id="staff-address"
              placeholder="Enter address"
              value={formData.address}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  address: event.target.value,
                }))
              }
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-xs text-gray-500">Staff Type</Label>
            <Select
              value={formData.staffType}
              onValueChange={(value: StaffType) =>
                setFormData((prev) => ({ ...prev, staffType: value }))
              }
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select staff type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Captain">Captain</SelectItem>
                <SelectItem value="Driver">Driver</SelectItem>
                <SelectItem value="Guide">Guide</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Add Staff
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddStaffModal;
