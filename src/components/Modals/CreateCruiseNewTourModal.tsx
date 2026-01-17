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
import { Switch } from "@/components/ui/switch";
import { MapPin, Building2, Plus, Minus } from "lucide-react";

interface CreateCruiseNewTourModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateCruiseNewTourModal = ({
  open,
  onOpenChange,
}: CreateCruiseNewTourModalProps) => {
  const [activeTab, setActiveTab] = useState<"boat" | "vehicle">("boat");
  const [paymentMethod, setPaymentMethod] = useState<"cards" | "cash" | "both">(
    "cards"
  );
  const [acceptBoth, setAcceptBoth] = useState(false);
  const [shipProvidedPassengers, setShipProvidedPassengers] = useState(0);

  const handlePaymentMethodClick = (method: "cards" | "cash") => {
    if (acceptBoth) return;
    setPaymentMethod(method);
  };

  const handleAcceptBothChange = (checked: boolean) => {
    setAcceptBoth(checked);
    if (checked) {
      setPaymentMethod("both");
    }
  };

  const handleConfirmSetup = () => {
    // Handle form submission here
    console.log("Tour setup confirmed");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:min-w-150 md:max-w-200 max-h-[90vh] overflow-y-auto">
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
          <TabsList className="flex items-center gap-4 mb-6 h-12">
            <TabsTrigger value="boat" className="px-4 h-10">
              By boat
            </TabsTrigger>
            <TabsTrigger value="vehicle" className="px-4 h-10">
              By Vehicle
            </TabsTrigger>
          </TabsList>

          {/* Tabs Content for Boat */}
          <TabsContent value="boat" className="space-y-6">
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
                    <SelectValue placeholder="Pick a Tour Destination" />
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

              {/* Choose a Cruise Provider*/}
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                <Select>
                  <SelectTrigger className="w-full pl-10">
                    <SelectValue placeholder="Choose a Cruise Provider" />
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
                {/* From */}
                <div className="space-y-2">
                  <Label
                    htmlFor="from-boat"
                    className="text-xs text-gray-500 font-normal"
                  >
                    From
                  </Label>
                  <Input id="from-boat" placeholder="From" className="w-full" />
                </div>

                {/* Date & Time */}
                <div className="space-y-2">
                  <Label
                    htmlFor="datetime-boat"
                    className="text-xs text-gray-500 font-normal"
                  >
                    Date & Time
                  </Label>
                  <Input
                    id="datetime-boat"
                    type="datetime-local"
                    placeholder="Date & Time"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Return */}
              <div className="space-y-2">
                <Label
                  htmlFor="return-boat"
                  className="text-xs text-gray-500 font-normal"
                >
                  Return
                </Label>
                <Input
                  id="return-boat"
                  type="datetime-local"
                  placeholder="Return"
                  className="w-full"
                />
              </div>
            </div>

            {/* Others */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Others</h3>
              <div className="border border-gray-300 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm ">Ship Provided Passengers</span>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() =>
                        setShipProvidedPassengers(
                          Math.max(0, shipProvidedPassengers - 1)
                        )
                      }
                      variant="outline"
                      size="icon-sm"
                      className="w-6 h-6 rounded-full"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center">
                      {shipProvidedPassengers.toString().padStart(2, "0")}
                    </span>
                    <Button
                      onClick={() =>
                        setShipProvidedPassengers(shipProvidedPassengers + 1)
                      }
                      variant="outline"
                      size="icon-sm"
                      className="w-6 h-6 rounded-full"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
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

          {/* Tabs Content for Vehicle */}
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
                    <SelectValue placeholder="Pick a Tour Destination" />
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

              {/* Choose a Cruise Provider*/}
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                <Select>
                  <SelectTrigger className="w-full pl-10">
                    <SelectValue placeholder="Choose a Cruise Provider" />
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
                {/* From */}
                <div className="space-y-2">
                  <Label
                    htmlFor="from-vehicle"
                    className="text-xs text-gray-500 font-normal"
                  >
                    From
                  </Label>
                  <Input
                    id="from-vehicle"
                    placeholder="From"
                    className="w-full"
                  />
                </div>

                {/* Date & Time */}
                <div className="space-y-2">
                  <Label
                    htmlFor="datetime-vehicle"
                    className="text-xs text-gray-500 font-normal"
                  >
                    Date & Time
                  </Label>
                  <Input
                    id="datetime-vehicle"
                    type="datetime-local"
                    placeholder="Date & Time"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Return */}
              <div className="space-y-2">
                <Label
                  htmlFor="return-vehicle"
                  className="text-xs text-gray-500 font-normal"
                >
                  Return
                </Label>
                <Input
                  id="return-vehicle"
                  type="datetime-local"
                  placeholder="Return"
                  className="w-full"
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Others</h3>
              <div className="border border-gray-300 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm ">Ship Provided Passengers</span>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() =>
                        setShipProvidedPassengers(
                          Math.max(0, shipProvidedPassengers - 1)
                        )
                      }
                      variant="outline"
                      size="icon-sm"
                      className="w-6 h-6 rounded-full"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center">
                      {shipProvidedPassengers.toString().padStart(2, "0")}
                    </span>
                    <Button
                      onClick={() =>
                        setShipProvidedPassengers(shipProvidedPassengers + 1)
                      }
                      variant="outline"
                      size="icon-sm"
                      className="w-6 h-6 rounded-full"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
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

export default CreateCruiseNewTourModal;
