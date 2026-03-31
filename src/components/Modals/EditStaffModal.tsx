"use client";

import { useMemo, useState, useEffect } from "react";
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

export interface EditStaffFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  staffType: StaffType;
}

interface StaffMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  staffType: StaffType;
}

interface EditStaffModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditStaff: (id: number, data: EditStaffFormData) => void;
  staff: StaffMember | null;
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

function EditStaffModal({
  open,
  onOpenChange,
  onEditStaff,
  staff,
}: EditStaffModalProps) {
  const [formData, setFormData] = useState<FormState>(initialFormState);

  // Auto-fill form when staff changes
  useEffect(() => {
    if (staff) {
      setFormData({
        name: staff.name,
        email: staff.email,
        phone: staff.phone,
        address: staff.address,
        staffType: staff.staffType,
      });
    } else {
      setFormData(initialFormState);
    }
  }, [staff, open]);

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
    if (isSubmitDisabled || !formData.staffType || !staff) return;

    onEditStaff(staff.id, {
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
          <DialogTitle>Edit Staff</DialogTitle>
          <DialogDescription>Update staff information.</DialogDescription>
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
            Update Staff
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditStaffModal;
