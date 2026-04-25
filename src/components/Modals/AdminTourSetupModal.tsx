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

export type Station = "Direct Sales" | "Cruise Sales" | "Partner Sales";

export type TourCurrency = "xpf" | "usd" | "aud" | "euro";

export type AdminTourPayload = {
  station: Station;
  currency: TourCurrency;
  tourName: string;
  tourDurationHours: number;
  tourDurationMinutes: 15 | 30 | 45;
  adultPrice: number;
  childPrice: number;
  transportAdult: number;
  transportChild: number;
};

interface AdminTourSetupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTour: (tour: AdminTourPayload) => void;
}

const AdminTourSetupModal = ({
  open,
  onOpenChange,
  onCreateTour,
}: AdminTourSetupModalProps) => {
  const [form, setForm] = useState({
    station: "",
    currency: "xpf" as TourCurrency,
    tourName: "",
    tourDurationHours: "",
    tourDurationMinutes: "",
    adultPrice: "",
    childPrice: "",
    transportAdult: "",
    transportChild: "",
  });

  const resetForm = () => {
    setForm({
      station: "",
      currency: "xpf" as TourCurrency,
      tourName: "",
      tourDurationHours: "",
      tourDurationMinutes: "",
      adultPrice: "",
      childPrice: "",
      transportAdult: "",
      transportChild: "",
    });
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetForm();
    }
    onOpenChange(nextOpen);
  };

  const handleCreateTour = () => {
    const station = form.station as Station;
    const currency = form.currency;
    const tourDurationHours = Number(form.tourDurationHours);
    const tourDurationMinutes = Number(form.tourDurationMinutes);
    const adultPrice = Number(form.adultPrice);
    const childPrice = Number(form.childPrice);
    const transportAdult = Number(form.transportAdult);
    const transportChild = Number(form.transportChild);

    const hasMissingRequiredValue = !form.station || !form.tourName.trim();
    const hasInvalidNumber = [
      tourDurationHours,
      adultPrice,
      childPrice,
      transportAdult,
      transportChild,
    ].some((value) => Number.isNaN(value) || value < 0);
    const hasInvalidMinutes = ![15, 30, 45].includes(tourDurationMinutes);

    if (hasMissingRequiredValue || hasInvalidNumber || hasInvalidMinutes) {
      return;
    }

    onCreateTour({
      station,
      currency,
      tourName: form.tourName.trim(),
      tourDurationHours,
      tourDurationMinutes: tourDurationMinutes as 15 | 30 | 45,
      adultPrice,
      childPrice,
      transportAdult,
      transportChild,
    });

    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="md:min-w-150 md:max-w-175 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create new tour
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="select-station">Station</Label>
              <Select
                value={form.station}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, station: value }))
                }
              >
                <SelectTrigger id="select-station" className="w-full">
                  <SelectValue placeholder="Select station" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Direct Sales">Direct Sales</SelectItem>
                  <SelectItem value="Cruise Sales">Cruise Sales</SelectItem>
                  <SelectItem value="Partner Sales">Partner Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tour-name">Tour name</Label>
              <Input
                id="tour-name"
                value={form.tourName}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, tourName: event.target.value }))
                }
                placeholder="Enter tour name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Tour duration</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  min="0"
                  value={form.tourDurationHours}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      tourDurationHours: event.target.value,
                    }))
                  }
                  placeholder="Hours"
                />
                <Input
                  type="number"
                  min="0"
                  max="59"
                  value={form.tourDurationMinutes}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      tourDurationMinutes: event.target.value,
                    }))
                  }
                  placeholder="Minutes"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="select-currency">Currency</Label>
              <Select
                value={form.currency}
                onValueChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    currency: value as TourCurrency,
                  }))
                }
              >
                <SelectTrigger id="select-currency" className="w-full">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xpf">XPF</SelectItem>
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="aud">AUD</SelectItem>
                  <SelectItem value="euro">EURO</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="adult-price">Adult price</Label>
                <Input
                  id="adult-price"
                  type="number"
                  min="0"
                  value={form.adultPrice}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      adultPrice: event.target.value,
                    }))
                  }
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="child-price">Child price</Label>
                <Input
                  id="child-price"
                  type="number"
                  min="0"
                  value={form.childPrice}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      childPrice: event.target.value,
                    }))
                  }
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transport-adult">Transport adult</Label>
                <Input
                  id="transport-adult"
                  type="number"
                  min="0"
                  value={form.transportAdult}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      transportAdult: event.target.value,
                    }))
                  }
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transport-child">Transport child</Label>
                <Input
                  id="transport-child"
                  type="number"
                  min="0"
                  value={form.transportChild}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      transportChild: event.target.value,
                    }))
                  }
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            variant="ghost"
            onClick={() => handleOpenChange(false)}
            className="text-gray-600"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateTour}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full"
          >
            Create tour
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminTourSetupModal;
