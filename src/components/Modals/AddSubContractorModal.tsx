"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Plus, Paperclip, Check } from "lucide-react";

interface AddSubContractorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface VehicleDetail {
  id: string;
  transportType: "vehicle" | "boat";
  operatorName: string;
  numberOfSeats: string;
  registerNumber?: File | null;
  insurancePapers?: File | null;
}

export default function AddSubContractorModal({
  isOpen,
  onClose,
}: AddSubContractorModalProps) {
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetail[]>([
    {
      id: "1",
      transportType: "vehicle",
      operatorName: "",
      numberOfSeats: "",
      registerNumber: null,
      insurancePapers: null,
    },
  ]);
  const [isPapersChecked, setIsPapersChecked] = useState(false);
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleAddNew = () => {
    setVehicleDetails([
      ...vehicleDetails,
      {
        id: Date.now().toString(),
        transportType: "vehicle",
        operatorName: "",
        numberOfSeats: "",
        registerNumber: null,
        insurancePapers: null,
      },
    ]);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCompanyLogo(file);
    }
  };

  const handleRegisterNumberUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDetails = [...vehicleDetails];
      newDetails[index].registerNumber = file;
      setVehicleDetails(newDetails);
    }
  };

  const handleInsurancePapersUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDetails = [...vehicleDetails];
      newDetails[index].insurancePapers = file;
      setVehicleDetails(newDetails);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Submitting form", {
      companyLogo,
      vehicleDetails,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Add a sub-contractor company
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Basic Details */}
          <div>
            <h3 className="text-sm font-medium mb-3">Basic details</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="companyName" className="text-xs text-gray-600">
                  Sub-contractor Name
                </Label>
                <Input
                  id="companyName"
                  placeholder="Enter sub-contractor company name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label
                  htmlFor="representerName"
                  className="text-xs text-gray-600"
                >
                  Representer Name
                </Label>
                <Input
                  id="representerName"
                  placeholder="Enter representer name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="designation" className="text-xs text-gray-600">
                  Designation
                </Label>
                <Input
                  id="designation"
                  placeholder="Enter designation"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-xs text-gray-600">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phoneNumber" className="text-xs text-gray-600">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  placeholder="Enter phone number"
                  className="mt-1"
                />
              </div>

              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full text-blue-500 hover:text-blue-600"
                onClick={() => logoInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                {companyLogo ? companyLogo.name : "Upload Company Logo"}
              </Button>
            </div>
          </div>

          {/* Company Address */}
          <div>
            <h3 className="text-sm font-medium mb-3">Company address</h3>
            <div className="space-y-3">
              <div>
                <Label
                  htmlFor="streetAddress"
                  className="text-xs text-gray-600"
                >
                  Street Address
                </Label>
                <Input
                  id="streetAddress"
                  placeholder="Street address goes here"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="city" className="text-xs text-gray-600">
                  City
                </Label>
                <Input id="city" placeholder="Enter city" className="mt-1" />
              </div>

              <div>
                <Label htmlFor="zipCode" className="text-xs text-gray-600">
                  ZIP Code
                </Label>
                <Input
                  id="zipCode"
                  placeholder="Enter ZIP code"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Choose Transport Type */}
          <div>
            <div className="space-y-4">
              {vehicleDetails.map((detail, index) => (
                <div
                  key={detail.id}
                  className="space-y-3 pb-4 border-b last:border-b-0"
                >
                  {/* Choose Transport Type */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Choose transport type
                    </h3>
                    <div className="flex gap-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name={`transportType-${index}`}
                          value="vehicle"
                          checked={detail.transportType === "vehicle"}
                          onChange={() => {
                            const newDetails = [...vehicleDetails];
                            newDetails[index].transportType = "vehicle";
                            setVehicleDetails(newDetails);
                          }}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="ml-2 text-sm">Add vehicle</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name={`transportType-${index}`}
                          value="boat"
                          checked={detail.transportType === "boat"}
                          onChange={() => {
                            const newDetails = [...vehicleDetails];
                            newDetails[index].transportType = "boat";
                            setVehicleDetails(newDetails);
                          }}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="ml-2 text-sm">Add boat</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-3">Add details</h3>
                    <Label
                      htmlFor={`operatorName-${index}`}
                      className="text-xs text-gray-600"
                    >
                      Operator Name
                    </Label>
                    <Input
                      id={`operatorName-${index}`}
                      placeholder="Enter operator name"
                      className="mt-1"
                      value={detail.operatorName}
                      onChange={(e) => {
                        const newDetails = [...vehicleDetails];
                        newDetails[index].operatorName = e.target.value;
                        setVehicleDetails(newDetails);
                      }}
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor={`numberOfSeats-${index}`}
                      className="text-xs text-gray-600"
                    >
                      Number of Seats
                    </Label>
                    <Input
                      id={`numberOfSeats-${index}`}
                      placeholder="Enter number of seats"
                      className="mt-1"
                      value={detail.numberOfSeats}
                      onChange={(e) => {
                        const newDetails = [...vehicleDetails];
                        newDetails[index].numberOfSeats = e.target.value;
                        setVehicleDetails(newDetails);
                      }}
                    />
                  </div>

                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    id={`registerNumber-${index}`}
                    onChange={(e) => handleRegisterNumberUpload(index, e)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full text-blue-500 hover:text-blue-600"
                    onClick={() =>
                      document
                        .getElementById(`registerNumber-${index}`)
                        ?.click()
                    }
                  >
                    <Paperclip className="w-4 h-4 mr-2" />
                    {detail.registerNumber
                      ? detail.registerNumber.name
                      : "Attach Register Number Papers"}
                  </Button>

                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    id={`insurancePapers-${index}`}
                    onChange={(e) => handleInsurancePapersUpload(index, e)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full text-blue-500 hover:text-blue-600"
                    onClick={() =>
                      document
                        .getElementById(`insurancePapers-${index}`)
                        ?.click()
                    }
                  >
                    <Paperclip className="w-4 h-4 mr-2" />
                    {detail.insurancePapers
                      ? detail.insurancePapers.name
                      : "Attach Insurance Papers"}
                  </Button>
                </div>
              ))}

              <label className="flex items-start cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={isPapersChecked}
                    onChange={(e) => setIsPapersChecked(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  {isPapersChecked && (
                    <Check className="w-3 h-3 text-white absolute left-0.5 top-0.5 pointer-events-none" />
                  )}
                </div>
                <span className="ml-2 text-xs text-gray-600">
                  I’ve checked and declare that all the papers are up to date.
                </span>
              </label>

              <Button
                variant="ghost"
                className="text-blue-500 hover:text-blue-600 p-0 h-auto"
                onClick={handleAddNew}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add new
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose} className="rounded-full">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 rounded-full"
          >
            Confirm setup
            <Check className="w-4 h-4 ml-2 " />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
