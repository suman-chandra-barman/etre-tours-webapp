"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OperationsTour } from "@/app/(main)/direct-sales/page";
import { Separator } from "@/components/ui/separator";

export function SeparatorVertical() {
  return (
    <div className="flex h-5 items-center gap-4 text-sm">
      <div>Blog</div>
      <Separator orientation="vertical" />
      <div>Docs</div>
      <Separator orientation="vertical" />
      <div>Source</div>
    </div>
  );
}

interface EditOperationsTourModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tour: OperationsTour | null;
  onSave: (updatedTour: OperationsTour) => void;
}

const EditOperationsTourModal = ({
  open,
  onOpenChange,
  tour,
  onSave,
}: EditOperationsTourModalProps) => {
  // Get today's date
  const today = new Date().toISOString().split("T")[0];

  // Form state - initialize from tour prop
  const [tourName, setTourName] = useState(tour?.tourName || "");
  const [transportContractor, setTransportContractor] = useState(
    tour?.transportContractor || "",
  );
  const [driver, setDriver] = useState(tour?.driver || "");
  const [vehicle, setVehicle] = useState(tour?.vehicle || "");
  const [guide, setGuide] = useState(tour?.guide || "");
  const [extraGuide, setExtraGuide] = useState(tour?.extraGuide || "");
  const [numberOfSeats, setNumberOfSeats] = useState(
    tour?.numberOfSeats?.toString() || "",
  );
  const [departureDate, setDepartureDate] = useState(today);
  const [departureTime, setDepartureTime] = useState(tour?.departureTime || "");
  const [returnDate, setReturnDate] = useState(today);
  const [returnTime, setReturnTime] = useState(tour?.returnTime || "");
  const [status, setStatus] = useState<OperationsTour["status"]>(
    tour?.status || "Pre-departure",
  );

  const handleSave = () => {
    if (!tour) return;

    const updatedTour: OperationsTour = {
      ...tour,
      tourName,
      transportContractor,
      driver,
      vehicle,
      guide,
      extraGuide,
      numberOfSeats: numberOfSeats ? parseInt(numberOfSeats) : undefined,
      departureTime,
      returnTime,
      status,
    };

    onSave(updatedTour);
    onOpenChange(false);
  };

  if (!tour) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:min-w-150 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Edit Tour Information
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tour Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Tour Name */}
              <div className="space-y-1">
                <Label className="text-xs text-gray-500 font-normal">
                  Tour Name
                </Label>
                <Select value={tourName} onValueChange={setTourName}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pick a Tour" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Village and back">
                      Village and back
                    </SelectItem>
                    <SelectItem value="Town adventure">
                      Town adventure
                    </SelectItem>
                    <SelectItem value="Tribal encounter">
                      Tribal encounter
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Transport Contractor */}
              <div className="space-y-1">
                <Label className="text-xs text-gray-500 font-normal">
                  Transport Contractor
                </Label>
                <Select
                  value={transportContractor}
                  onValueChange={setTransportContractor}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sub-contractor Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fast delivery">Fast delivery</SelectItem>
                    <SelectItem value="Edmond Transport">
                      Edmond Transport
                    </SelectItem>
                    <SelectItem value="Nice Tours">Nice Tours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Number of Seats */}
            <div className="space-y-1">
              <Label className="text-xs text-gray-500 font-normal">
                Number of Seats
              </Label>
              <Input
                type="number"
                placeholder="Number of Seats"
                value={numberOfSeats}
                onChange={(e) => setNumberOfSeats(e.target.value)}
                min="1"
              />
            </div>
          </div>

          {/* Time Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Departure Date & Time */}
              <div className="space-y-1">
                <Label className="text-xs text-gray-500 font-normal">
                  Departure Date
                </Label>
                <Input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-500 font-normal">
                  Departure Time
                </Label>
                <Input
                  type="time"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Return Date & Time */}
              <div className="space-y-1">
                <Label className="text-xs text-gray-500 font-normal">
                  Return Date
                </Label>
                <Input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-500 font-normal">
                  Return Time
                </Label>
                <Input
                  type="time"
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Assignment Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Driver */}
              <div className="space-y-1">
                <Label className="text-xs text-gray-500 font-normal">
                  Driver Name
                </Label>
                <Select value={driver} onValueChange={setDriver}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Driver" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paul John">Paul John</SelectItem>
                    <SelectItem value="Joseph King">Joseph King</SelectItem>
                    <SelectItem value="Walter Smith">Walter Smith</SelectItem>
                    <SelectItem value="Ben Harper">Ben Harper</SelectItem>
                    <SelectItem value="Michael Jordan">
                      Michael Jordan
                    </SelectItem>
                    <SelectItem value="Fred Carson">Fred Carson</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Vehicle */}
              <div className="space-y-1">
                <Label className="text-xs text-gray-500 font-normal">
                  Vehicle Number
                </Label>
                <Input
                  placeholder="Vehicle Number"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Main Guide */}
              <div className="space-y-1">
                <Label className="text-xs text-gray-500 font-normal">
                  Guide
                </Label>
                <Select value={guide} onValueChange={setGuide}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Guide" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="None">None</SelectItem>
                    <SelectItem value="Jane Gerry">Jane Gerry</SelectItem>
                    <SelectItem value="Barbara Tovey">Barbara Tovey</SelectItem>
                    <SelectItem value="Brenda Davidson">
                      Brenda Davidson
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Extra Guide (Optional) */}
              <div className="space-y-1">
                <Label className="text-xs text-gray-500 font-normal">
                  Extra Guide <span className="text-gray-400">(Optional)</span>
                </Label>
                <div>
                  <Input
                    placeholder="Extra Guide Name"
                    value={extraGuide}
                    onChange={(e) => setExtraGuide(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center gap-3 pt-4">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="rounded-full"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 rounded-full"
            >
              Create New Tour
            </Button>
            <div className="h-10 w-px bg-gray-300" />
            <Button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 rounded-full"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditOperationsTourModal;
