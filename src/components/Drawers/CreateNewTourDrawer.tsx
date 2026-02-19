"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
import { getTodayDate } from "@/helper/date";

interface CreateNewTourDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateNewTourDrawer = ({
  open,
  onOpenChange,
}: CreateNewTourDrawerProps) => {
  const [transportType, setTransportType] = useState<"boat" | "vehicle">(
    "boat",
  );
  const [departureDate, setDepartureDate] = useState(getTodayDate());
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("18:00"); 

  const handleConfirmSetup = () => {
    // Handle form submission here
    console.log("Tour setup confirmed");
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold">
            Setup a tour
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Transport Type Selection */}
          <div className="space-y-2">
            <Label
              htmlFor="transport-type"
              className="text-sm font-medium text-gray-700"
            >
              Transport Type
            </Label>
            <div>
              <Select
                value={transportType}
                onValueChange={(value) =>
                  setTransportType(value as "boat" | "vehicle")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select transport type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="boat">By Boat</SelectItem>
                  <SelectItem value="vehicle">By Vehicle</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tour Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Pick a Tour*/}
              <div className="space-y-1">
                <Label className="text-xs text-gray-500 font-normal">
                  Tour Name
                </Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pick a Tour" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lagoon">Lagoon Snokeling</SelectItem>
                    <SelectItem value="island">Island Hopping</SelectItem>
                    <SelectItem value="sunset">Sunset Cruise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Choose a Sub-contractor Company */}
              <div className="space-y-1">
                <Label className="text-xs text-gray-500 font-normal">
                  Transport Contractor
                </Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sub-contractor Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expedia">Expedia LLC</SelectItem>
                    <SelectItem value="booking">Booking.com</SelectItem>
                    <SelectItem value="airbnb">Airbnb Experiences</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Time Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {/* Date & Time */}
              <div className="space-y-1">
                <Label
                  htmlFor="departure-date"
                  className="text-xs text-gray-500 font-normal"
                >
                  Departure Date
                </Label>
                <Input
                  id="departure-date"
                  type="date"
                  placeholder="Date"
                  className="w-full"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="departure-time"
                  className="text-xs text-gray-500 font-normal"
                >
                  Departure Time
                </Label>
                <Input
                  id="departure-time"
                  type="time"
                  placeholder="Time"
                  className="w-full"
                />
              </div>
            </div>

            {/* Return */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label
                  htmlFor="return-date"
                  className="text-xs text-gray-500 font-normal"
                >
                  Return Date
                </Label>
                <Input
                  id="return-date"
                  type="date"
                  placeholder="Return"
                  className="w-full"
                  value={returnDate}
                />
              </div>
              {returnTime && (
                <div className="space-y-1">
                  <Label
                    htmlFor="return-time"
                    className="text-xs text-gray-500 font-normal"
                  >
                    Return Time
                  </Label>
                  <Input
                    id="return-time"
                    type="time"
                    value={returnTime}
                    disabled
                    placeholder="Time"
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Assignment Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-gray-500 font-normal">
                  Vehicle Number
                </Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Vehicle Number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reg001">ABC-123-XYZ</SelectItem>
                    <SelectItem value="reg002">DEF-456-UVW</SelectItem>
                    <SelectItem value="reg003">GHI-789-RST</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-500 font-normal">
                  Number of Seats
                </Label>
                <Input type="number" placeholder="Number of Seats" min="1" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-500 font-normal">
                  Driver Name
                </Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Driver" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="driver1">John Smith</SelectItem>
                    <SelectItem value="driver2">Sarah Johnson</SelectItem>
                    <SelectItem value="driver3">Michael Brown</SelectItem>
                    <SelectItem value="driver5">David Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-500 font-normal">
                  Guide
                </Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Guide" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guide1">Maria Garcia</SelectItem>
                    <SelectItem value="guide2">James Anderson</SelectItem>
                    <SelectItem value="guide3">Linda Martinez</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-500 font-normal">
                  Extra Guide <span className="text-gray-400">(Optional)</span>
                </Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Extra Guide" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="extra1">Carlos Rodriguez</SelectItem>
                    <SelectItem value="extra2">Patricia Lee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="rounded-full"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmSetup}
              className="bg-blue-500 hover:bg-blue-600 rounded-full"
            >
              Confirm setup
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateNewTourDrawer;
