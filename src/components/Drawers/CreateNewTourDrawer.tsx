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
  const [departureDate, setDepartureDate] = useState(getTodayDate());
  const [returnDate, setReturnDate] = useState(getTodayDate());

  const returnTime = "17:00";

  const handleSave = () => {
    // Handle form submission here
    console.log("Tour setup saved");
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-sm overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold">
            Setup a tour
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Pick a Tour*/}
          <div className="space-y-1">
            <Label className="text-xs font-normal">Tour Name</Label>
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
          {/* Date & Time */}
          <div className="space-y-1">
            <Label htmlFor="departure-date" className="text-xs font-normal">
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
            <Label htmlFor="departure-time" className="text-xs font-normal">
              Departure Time
            </Label>
            <Input
              id="departure-time"
              type="time"
              placeholder="Time"
              className="w-full"
            />
          </div>

          {/* Return */}
          <div className="space-y-1">
            <Label htmlFor="return-date" className="text-xs font-normal">
              Return Date
            </Label>
            <Input
              id="return-date"
              type="date"
              placeholder="Return"
              className="w-full"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="return-time" className="text-xs font-normal">
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
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 rounded-full"
            >
              Save
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateNewTourDrawer;
