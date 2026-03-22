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

export type TransportType = "Boat" | "Bus";

export interface AddTransportFormData {
  name: string;
  transportType: TransportType;
  transportContractor: string;
  seatCapacity: number;
}

interface AddTransportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTransport: (data: AddTransportFormData) => void;
}

interface FormState {
  name: string;
  transportType: TransportType | "";
  transportContractor: string;
  seatCapacity: string;
}

const initialFormState: FormState = {
  name: "",
  transportType: "",
  transportContractor: "",
  seatCapacity: "",
};

function AddTransportModal({
  open,
  onOpenChange,
  onAddTransport,
}: AddTransportModalProps) {
  const [formData, setFormData] = useState<FormState>(initialFormState);

  const seatCapacity = Number(formData.seatCapacity);
  const hasValidSeatCapacity =
    Number.isInteger(seatCapacity) &&
    Number.isFinite(seatCapacity) &&
    seatCapacity > 0;

  const isSubmitDisabled = useMemo(() => {
    return (
      !formData.name.trim() ||
      !formData.transportType ||
      !formData.transportContractor.trim() ||
      !hasValidSeatCapacity
    );
  }, [formData, hasValidSeatCapacity]);

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
    if (isSubmitDisabled || !formData.transportType) return;

    onAddTransport({
      name: formData.name.trim(),
      transportType: formData.transportType,
      transportContractor: formData.transportContractor.trim(),
      seatCapacity,
    });

    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Transport</DialogTitle>
          <DialogDescription>
            Add transport details including type, contractor, and seat capacity.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="transport-name" className="text-xs text-gray-500">
              Name
            </Label>
            <Input
              id="transport-name"
              placeholder="Enter transport name"
              value={formData.name}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, name: event.target.value }))
              }
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-xs text-gray-500">Transport Type</Label>
            <Select
              value={formData.transportType}
              onValueChange={(value: TransportType) =>
                setFormData((prev) => ({ ...prev, transportType: value }))
              }
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select transport type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Boat">Boat</SelectItem>
                <SelectItem value="Bus">Bus</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label
              htmlFor="transport-contractor"
              className="text-xs text-gray-500"
            >
              Transport Contractor
            </Label>
            <Input
              id="transport-contractor"
              placeholder="Enter contractor name"
              value={formData.transportContractor}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  transportContractor: event.target.value,
                }))
              }
              className="mt-1"
            />
          </div>

          <div>
            <Label
              htmlFor="transport-seat-capacity"
              className="text-xs text-gray-500"
            >
              Seat Capacity
            </Label>
            <Input
              id="transport-seat-capacity"
              type="number"
              min={1}
              step={1}
              placeholder="Enter seat capacity"
              value={formData.seatCapacity}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  seatCapacity: event.target.value,
                }))
              }
              className="mt-1"
            />
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
            Add Transport
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddTransportModal;
