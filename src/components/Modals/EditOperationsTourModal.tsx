"use client";

import { useState, useMemo } from "react";
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
import { OperationsTour } from "@/types/tours.types";
import { X } from "lucide-react";

// Transport entry for multi-transport support
interface TransportEntry {
  id: number;
  transportType: string;
  transportContractor: string;
  vehicleNumber: string;
  numberOfSeats: number;
  guide: string;
  driver: string;
  adults: number;
  children: number;
  infants: number;
  foc: number;
}

interface EditOperationsTourModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tour: OperationsTour | null;
  onSave: (updatedTour: OperationsTour) => void;
}

// Generate tour code from tour name
const generateTourCode = (tourName: string): string => {
  if (!tourName) return "";
  const words = tourName.split(" ");
  const code = words.map((word) => word.charAt(0).toUpperCase()).join("");
  return `${code}-${Date.now().toString().slice(-4)}`;
};

const DEFAULT_GUIDE_OPTIONS = [
  "Jane Gerry",
  "Barbara Tovey",
  "Brenda Davidson",
];

const DEFAULT_DRIVER_OPTIONS = [
  "John Smith",
  "Mike Johnson",
  "David Brown",
  "Robert Wilson",
];

const createInitialTransportEntry = (
  tour: OperationsTour | null,
): TransportEntry => ({
  id: 1,
  transportType: "",
  transportContractor: tour?.transportContractor || "",
  vehicleNumber: tour?.vehicle || "",
  numberOfSeats: tour?.numberOfSeats || 0,
  guide: tour?.guide || DEFAULT_GUIDE_OPTIONS[0] || "",
  driver: tour?.driver || DEFAULT_DRIVER_OPTIONS[0] || "",
  adults: 0,
  children: 0,
  infants: 0,
  foc: 0,
});

const EditOperationsTourModal = ({
  open,
  onOpenChange,
  tour,
  onSave,
}: EditOperationsTourModalProps) => {
  // Get today's date formatted
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Tour code - auto generated from tour name
  const tourCode = useMemo(() => {
    return tour?.tourName ? generateTourCode(tour.tourName) : "";
  }, [tour]);

  // Guide selector visibility
  const [showGuideSelector, setShowGuideSelector] = useState(false);

  // Transport entries
  const [transportEntries, setTransportEntries] = useState<TransportEntry[]>([
    createInitialTransportEntry(tour),
  ]);

  // Update current transport entry
  const updateCurrentTransport = (
    field: keyof TransportEntry,
    value: string | number,
  ) => {
    setTransportEntries((prev) =>
      prev.map((entry, index) =>
        index === 0 ? { ...entry, [field]: value } : entry,
      ),
    );
  };

  // Get current transport entry (first one since no pagination)
  const currentTransport = transportEntries[0];
  const currentGuideValue = currentTransport?.guide || "";

  const selectedGuides = useMemo(() => {
    if (!currentGuideValue) return [];
    return currentGuideValue
      .split(",")
      .map((guideName) => guideName.trim())
      .filter(Boolean);
  }, [currentGuideValue]);

  const guideOptions = useMemo(
    () => Array.from(new Set([...DEFAULT_GUIDE_OPTIONS, ...selectedGuides])),
    [selectedGuides],
  );

  // Vehicle to seats mapping (mock data - would come from API)
  const vehicleSeatsMap: Record<string, number> = {
    "24456": 16,
    "56009": 24,
    "54322": 32,
    "88990": 20,
    "33345": 12,
    "222999": 28,
  };

  // Update seats when vehicle changes
  const handleVehicleChange = (vehicleNumber: string) => {
    updateCurrentTransport("vehicleNumber", vehicleNumber);
    const seats = vehicleSeatsMap[vehicleNumber] || 0;
    updateCurrentTransport("numberOfSeats", seats);
  };

  const handleGuideCheckboxChange = (guideName: string, checked: boolean) => {
    const nextSelectedGuides = checked
      ? Array.from(new Set([...selectedGuides, guideName]))
      : selectedGuides.filter((name) => name !== guideName);

    updateCurrentTransport("guide", nextSelectedGuides.join(", "));
  };

  // Add new transport entry
  const handleAddTransport = () => {
    const newEntry: TransportEntry = {
      id: transportEntries.length + 1,
      transportType: "",
      transportContractor: "",
      vehicleNumber: "",
      numberOfSeats: 0,
      guide: "",
      driver: "",
      adults: 0,
      children: 0,
      infants: 0,
      foc: 0,
    };
    setTransportEntries((prev) => [...prev, newEntry]);
  };

  const handleSave = () => {
    if (!tour) return;

    // Use the first transport entry for the main tour data
    const firstTransport = transportEntries[0];

    const updatedTour: OperationsTour = {
      ...tour,
      transportContractor: firstTransport.transportContractor,
      vehicle: firstTransport.vehicleNumber,
      guide: firstTransport.guide,
      driver: firstTransport.driver,
      numberOfSeats: firstTransport.numberOfSeats,
    };

    onSave(updatedTour);
    onOpenChange(false);
  };

  if (!tour) return null;

  const handleDelete = () => {
    onSave({ ...tour, tourName: "Deleted Tour" } as OperationsTour);
    onOpenChange(false);
  };

  const handleDuplicate = () => {
    const duplicatedTour: OperationsTour = {
      ...tour,
      id: Math.floor(Math.random() * 1000000),
      tourName: `${tour.tourName} (Copy)`,
    };

    onSave(duplicatedTour);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="min-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold">
            Edit Tour Information
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Tour Info - Read Only Display Fields */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Tour Name - Auto Display */}
              <div className="space-y-1">
                <Label className="text-xs font-normal">Tour Name</Label>
                <Input value={tour.tourName} disabled className="bg-gray-100" />
              </div>

              {/* Tour Code - Auto Generated */}
              <div className="space-y-1">
                <Label className="text-xs font-normal">Tour Code</Label>
                <Input value={tourCode} disabled className="bg-gray-100" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Departure Date - Auto Today */}
              <div className="space-y-1">
                <Label className="text-xs font-normal">Departure Date</Label>
                <Input value={today} disabled className="bg-gray-100" />
              </div>

              {/* Departure Time - Auto Display */}
              <div className="space-y-1">
                <Label className="text-xs font-normal">Departure Time</Label>
                <Input
                  value={tour.departureTime}
                  disabled
                  className="bg-gray-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Return Date - Auto Today */}
              <div className="space-y-1">
                <Label className="text-xs font-normal">Return Date</Label>
                <Input value={today} disabled className="bg-gray-100" />
              </div>

              {/* Return Time - Auto Display */}
              <div className="space-y-1">
                <Label className="text-xs font-normal">Return Time</Label>
                <Input
                  value={tour.returnTime}
                  disabled
                  className="bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Editable Transport Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Transport Type */}
              <div className="space-y-1">
                <Label className="text-xs font-normal">Transport Type</Label>
                <Select
                  value={currentTransport?.transportType || ""}
                  onValueChange={(value) =>
                    updateCurrentTransport("transportType", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bus">Bus</SelectItem>
                    <SelectItem value="boat">Boat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Transport Contractor */}
              <div className="space-y-1">
                <Label className="text-xs font-normal">
                  Transport Contractor
                </Label>
                <Select
                  value={currentTransport?.transportContractor || ""}
                  onValueChange={(value) =>
                    updateCurrentTransport("transportContractor", value)
                  }
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
                    <SelectItem value="Island culture">
                      Island culture
                    </SelectItem>
                    <SelectItem value="Cruising adventure">
                      Cruising adventure
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Vehicle Number */}
              <div className="space-y-1">
                <Label className="text-xs font-normal">Vehicle Number</Label>
                <Select
                  value={currentTransport?.vehicleNumber || ""}
                  onValueChange={handleVehicleChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24456">24456</SelectItem>
                    <SelectItem value="56009">56009</SelectItem>
                    <SelectItem value="54322">54322</SelectItem>
                    <SelectItem value="88990">88990</SelectItem>
                    <SelectItem value="33345">33345</SelectItem>
                    <SelectItem value="222999">222999</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Number of Seats - Auto Display when vehicle selected */}
              <div className="space-y-1">
                <Label className="text-xs font-normal">Number of Seats</Label>
                <Input
                  value={currentTransport?.numberOfSeats || ""}
                  disabled
                  className="bg-gray-100"
                  placeholder="Auto-fills when vehicle selected"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Driver - Select Dropdown */}
              <div className="space-y-1">
                <Label className="text-xs font-normal">Driver</Label>
                <Select
                  value={currentTransport?.driver || ""}
                  onValueChange={(value) =>
                    updateCurrentTransport("driver", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEFAULT_DRIVER_OPTIONS.map((driver) => (
                      <SelectItem key={driver} value={driver}>
                        {driver}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Guide - Click to Edit - Full Width */}
              <div className="space-y-1">
                <Label className="text-xs font-normal">Guide(s)</Label>
                <div className="relative">
                  <button
                    onClick={() => setShowGuideSelector(!showGuideSelector)}
                    className="w-full h-auto min-h-10 p-2 border border-input bg-background rounded-md text-left font-normal flex flex-wrap gap-1 items-start hover:bg-accent cursor-pointer"
                  >
                    {selectedGuides.length > 0 ? (
                      selectedGuides.map((guide) => (
                        <span
                          key={guide}
                          className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs flex items-center gap-1"
                        >
                          {guide}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleGuideCheckboxChange(guide, false);
                            }}
                            className="hover:bg-blue-200 rounded"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">
                        Select guides...
                      </span>
                    )}
                  </button>

                  {/* Guide Selector Dropdown */}
                  {showGuideSelector && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50 p-2">
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {guideOptions.map((guideName) => (
                          <label
                            key={guideName}
                            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedGuides.includes(guideName)}
                              onChange={(e) =>
                                handleGuideCheckboxChange(
                                  guideName,
                                  e.target.checked,
                                )
                              }
                              className="rounded"
                            />
                            <span className="text-sm">{guideName}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Passenger Details Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Passenger Details</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Adults */}
              <div className="space-y-1">
                <Label className="text-xs font-normal">Adults</Label>
                <Input
                  type="number"
                  min="0"
                  value={currentTransport?.adults || ""}
                  onChange={(e) =>
                    updateCurrentTransport(
                      "adults",
                      parseInt(e.target.value) || 0,
                    )
                  }
                  placeholder="0"
                />
              </div>

              {/* Children */}
              <div className="space-y-1">
                <Label className="text-xs font-normal">Children</Label>
                <Input
                  type="number"
                  min="0"
                  value={currentTransport?.children || ""}
                  onChange={(e) =>
                    updateCurrentTransport(
                      "children",
                      parseInt(e.target.value) || 0,
                    )
                  }
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Infants */}
              <div className="space-y-1">
                <Label className="text-xs font-normal">Infants</Label>
                <Input
                  type="number"
                  min="0"
                  value={currentTransport?.infants || ""}
                  onChange={(e) =>
                    updateCurrentTransport(
                      "infants",
                      parseInt(e.target.value) || 0,
                    )
                  }
                  placeholder="0"
                />
              </div>

              {/* FOC (Free of Charge) */}
              <div className="space-y-1">
                <Label className="text-xs font-normal">FOC</Label>
                <Input
                  type="number"
                  min="0"
                  value={currentTransport?.foc || ""}
                  onChange={(e) =>
                    updateCurrentTransport("foc", parseInt(e.target.value) || 0)
                  }
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center gap-2 pt-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="rounded-full"
              >
                Cancel
              </Button>
              <div className="h-8 w-px bg-gray-300" />
              <Button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 rounded-full"
              >
                Delete
              </Button>
              <div className="h-8 w-px bg-gray-300" />
              <Button
                onClick={handleDuplicate}
                className="bg-amber-400 hover:bg-amber-500 text-black rounded-full"
              >
                Duplicate
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleAddTransport}
                className="bg-orange-500 hover:bg-orange-600 rounded-full"
              >
                Add Transport
              </Button>
              <div className="h-8 w-px bg-gray-300" />
              <Button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 rounded-full"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditOperationsTourModal;
