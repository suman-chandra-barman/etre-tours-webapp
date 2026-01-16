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
import { MapPin, Building2 } from "lucide-react";

interface CreateNewTourModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateNewTourModal = ({
  open,
  onOpenChange,
}: CreateNewTourModalProps) => {
  const [activeTab, setActiveTab] = useState<"boat" | "vehicle">("boat");
  const [paymentMethod, setPaymentMethod] = useState<"cards" | "cash" | "both">(
    "cards"
  );
  const [acceptBoth, setAcceptBoth] = useState(false);

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
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="boat">By boat</TabsTrigger>
            <TabsTrigger value="vehicle">By Vehicle</TabsTrigger>
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

            {/* Payment Methods */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">
                Payment Methods for the tour
              </h3>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant={
                    paymentMethod === "cards" || paymentMethod === "both"
                      ? "default"
                      : "outline"
                  }
                  onClick={() => handlePaymentMethodClick("cards")}
                  disabled={acceptBoth}
                  className="rounded-full"
                >
                  Cards
                </Button>
                <Button
                  type="button"
                  variant={
                    paymentMethod === "cash" || paymentMethod === "both"
                      ? "default"
                      : "outline"
                  }
                  onClick={() => handlePaymentMethodClick("cash")}
                  disabled={acceptBoth}
                  className="rounded-full"
                >
                  Cash
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  id="accept-both-boat"
                  checked={acceptBoth}
                  onCheckedChange={handleAcceptBothChange}
                />
                <Label
                  htmlFor="accept-both-boat"
                  className="text-sm text-gray-600 font-normal cursor-pointer"
                >
                  Accept both of them
                </Label>
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

            {/* Payment Methods */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">
                Payment Methods for the tour
              </h3>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant={
                    paymentMethod === "cards" || paymentMethod === "both"
                      ? "default"
                      : "outline"
                  }
                  onClick={() => handlePaymentMethodClick("cards")}
                  disabled={acceptBoth}
                  className="rounded-full"
                >
                  Cards
                </Button>
                <Button
                  type="button"
                  variant={
                    paymentMethod === "cash" || paymentMethod === "both"
                      ? "default"
                      : "outline"
                  }
                  onClick={() => handlePaymentMethodClick("cash")}
                  disabled={acceptBoth}
                  className="rounded-full"
                >
                  Cash
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  id="accept-both-vehicle"
                  checked={acceptBoth}
                  onCheckedChange={handleAcceptBothChange}
                />
                <Label
                  htmlFor="accept-both-vehicle"
                  className="text-sm text-gray-600 font-normal cursor-pointer"
                >
                  Accept both of them
                </Label>
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

export default CreateNewTourModal;
