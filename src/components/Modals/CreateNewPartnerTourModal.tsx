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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Building2 } from "lucide-react";
import { getTodayDate } from "@/helper/date";

interface CreateNewPartnerTourModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateNewPartnerTourModal = ({
  open,
  onOpenChange,
}: CreateNewPartnerTourModalProps) => {
  const [activeTab, setActiveTab] = useState<"boat" | "vehicle">("boat");
  const [departureDate, setDepartureDate] = useState(getTodayDate());
  const [returnDate, setReturnDate] = useState(getTodayDate());

  const handleConfirmSetup = () => {
    // Handle form submission here
    console.log("Tour setup confirmed");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:min-w-150 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Setup a tour
          </DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="boat"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "boat" | "vehicle")}
          className="w-full"
        >
          <TabsList className="flex items-center gap-4 mb-6 h-10">
            <TabsTrigger value="boat" className="px-4">
              By boat
            </TabsTrigger>
            <TabsTrigger value="vehicle" className="px-4">
              By Vehicle
            </TabsTrigger>
          </TabsList>

          {/* --------------------- Tabs Content for Boat ----------------------*/}
          <TabsContent value="boat" className="space-y-6">
            {/* Tour Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">
                Tour Details
              </h3>

              {/* Pick a Tour */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                <Select>
                  <SelectTrigger className="w-full pl-10">
                    <SelectValue placeholder="Pick a Tour" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lagoon">Lagoon Snokeling</SelectItem>
                    <SelectItem value="island">Island Hopping</SelectItem>
                    <SelectItem value="sunset">Sunset Cruise</SelectItem>
                    <SelectItem value="diving">Scuba Diving</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Choose a Sub-contractor Company */}
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                <Select>
                  <SelectTrigger className="w-full pl-10">
                    <SelectValue placeholder="Choose a Sub-contractor Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expedia">Expedia LLC</SelectItem>
                    <SelectItem value="booking">Booking.com</SelectItem>
                    <SelectItem value="airbnb">Airbnb Experiences</SelectItem>
                    <SelectItem value="viator">Viator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Departure */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Departure</h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Date & Time */}
                <div className="space-y-2">
                  <Label
                    htmlFor="datetime-vehicle"
                    className="text-xs text-gray-500 font-normal"
                  >
                    Date
                  </Label>
                  <Input
                    id="datetime-vehicle"
                    type="date"
                    placeholder="Date"
                    className="w-full"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="datetime-vehicle"
                    className="text-xs text-gray-500 font-normal"
                  >
                    Time
                  </Label>
                  <Input
                    id="datetime-vehicle"
                    type="time"
                    placeholder="Time"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Return */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="return-vehicle"
                    className="text-xs text-gray-500 font-normal"
                  >
                    Return Date
                  </Label>
                  <Input
                    id="return-vehicle"
                    type="date"
                    placeholder="Return"
                    className="w-full"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="datetime-vehicle"
                    className="text-xs text-gray-500 font-normal"
                  >
                    Return Time
                  </Label>
                  <Input
                    id="datetime-vehicle"
                    type="time"
                    placeholder="Time"
                    className="w-full"
                  />
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
                Confirm setup ✓
              </Button>
            </div>
          </TabsContent>

          {/* --------------------- Tabs Content for Vehicle ---------------------- */}
          <TabsContent value="vehicle" className="space-y-6">
            {/* Tour Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">
                Tour Details
              </h3>

              {/* Pick a Tour Destination */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                <Select>
                  <SelectTrigger className="w-full pl-10">
                    <SelectValue placeholder="Pick a Tour" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lagoon">Lagoon Snokeling</SelectItem>
                    <SelectItem value="island">Island Hopping</SelectItem>
                    <SelectItem value="sunset">Sunset Cruise</SelectItem>
                    <SelectItem value="diving">Scuba Diving</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Choose a Sub-contractor Company */}
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                <Select>
                  <SelectTrigger className="w-full pl-10">
                    <SelectValue placeholder="Choose a Sub-contractor Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expedia">Expedia LLC</SelectItem>
                    <SelectItem value="booking">Booking.com</SelectItem>
                    <SelectItem value="airbnb">Airbnb Experiences</SelectItem>
                    <SelectItem value="viator">Viator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Departure */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Departure</h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Date & Time */}
                <div className="space-y-2">
                  <Label
                    htmlFor="datetime-vehicle"
                    className="text-xs text-gray-500 font-normal"
                  >
                    Date
                  </Label>
                  <Input
                    id="datetime-vehicle"
                    type="date"
                    placeholder="Date"
                    className="w-full"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="datetime-vehicle"
                    className="text-xs text-gray-500 font-normal"
                  >
                    Time
                  </Label>
                  <Input
                    id="datetime-vehicle"
                    type="time"
                    placeholder="Time"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Return */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="return-vehicle"
                    className="text-xs text-gray-500 font-normal"
                  >
                    Return Date
                  </Label>
                  <Input
                    id="return-vehicle"
                    type="date"
                    placeholder="Return"
                    className="w-full"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="datetime-vehicle"
                    className="text-xs text-gray-500 font-normal"
                  >
                    Return Time
                  </Label>
                  <Input
                    id="datetime-vehicle"
                    type="time"
                    placeholder="Time"
                    className="w-full"
                  />
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
                Confirm setup ✓
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewPartnerTourModal;
