"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

interface Vehicle {
  operatorName: string;
  driverName: string;
  guideName: string;
  numberOfSeats: number;
  registerNumber?: string;
}

interface Boat {
  operatorName: string;
  driverName: string;
  guideName: string;
  numberOfSeats: number;
  registerNumber?: string;
}

interface SubContractor {
  id: string;
  companyName: string;
  logo?: string;
  representerName: string;
  designation: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  contactNumber: string;
  email: string;
  vehicles: Vehicle[];
  boats: Boat[];
}

interface ViewSubContractorModalProps {
  isOpen: boolean;
  onClose: () => void;
  subContractor: SubContractor | null;
}

export default function ViewSubContractorModal({
  isOpen,
  onClose,
  subContractor,
}: ViewSubContractorModalProps) {
  const [activeTab, setActiveTab] = useState("vehicle");

  if (!subContractor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Sub-contractor company details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Company Logo and Basic Info */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
                {subContractor.logo ? (
                  <Image
                    src={subContractor.logo}
                    alt={subContractor.companyName}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-black text-lg font-bold">
                    {subContractor.companyName.charAt(0)}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base">
                  {subContractor.companyName}
                </h3>
                <div className="space-y-1 mt-2">
                  <p className="text-sm text-gray-600">
                    {subContractor.representerName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {subContractor.designation}
                  </p>
                  <p className="text-sm text-gray-600">
                    {subContractor.streetAddress}
                  </p>
                  <p className="text-sm text-gray-600">
                    {subContractor.city}, {subContractor.state}.{" "}
                    {subContractor.zipCode}
                  </p>
                  <p className="text-sm text-gray-600">
                    P: {subContractor.contactNumber}
                  </p>
                  <p className="text-sm text-gray-600">
                    E: {subContractor.email}
                  </p>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon-sm">
              <Pencil className="w-4 h-4" />
            </Button>
          </div>

          {/* Vehicle/Boats Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
              <TabsTrigger value="boats">Boats</TabsTrigger>
            </TabsList>

            <TabsContent value="vehicle" className="space-y-3 mt-4">
              {subContractor.vehicles.map((vehicle, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3 space-y-1 relative"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">
                          {vehicle.operatorName}
                        </span>{" "}
                        [Reg: {vehicle.registerNumber || "55gfGH898F"}]
                      </p>
                      <p className="text-sm text-gray-600">
                        with{" "}
                        <span className="font-medium">
                          {vehicle.driverName}
                        </span>{" "}
                        [{vehicle.guideName}]
                      </p>
                      <p className="text-sm text-gray-600">
                        Of{" "}
                        <span className="font-medium">
                          {vehicle.numberOfSeats} Seats
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon-sm">
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="boats" className="space-y-3 mt-4">
              {subContractor.boats.map((boat, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3 space-y-1 relative"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{boat.operatorName}</span>{" "}
                        [Reg: {boat.registerNumber || "55gfGH898F"}]
                      </p>
                      <p className="text-sm text-gray-600">
                        with{" "}
                        <span className="font-medium">{boat.driverName}</span> [
                        {boat.guideName}]
                      </p>
                      <p className="text-sm text-gray-600">
                        Of{" "}
                        <span className="font-medium">
                          {boat.numberOfSeats} Seats
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon-sm">
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
