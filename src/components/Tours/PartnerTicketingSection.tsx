/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Minus,
  Plus,
  Armchair,
  Printer,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import PrintPartnerInvoiceModal from "../Modals/PrintPartnerInvoiceModal";

interface PartnerTicketingSectionProps {
  tourName: string;
  availableSeats?: number;
  onConfirm?: (ticketData: TicketData) => void;
  onCancel?: () => void;
}

interface TicketData {
  adults: number;
  children: number;
  infant: number;
  foc: number;
  total: number;
}

interface TransportData {
  id: string;
  operatorName: string;
  registrationNumber: string;
  driver: string;
  adults: number;
  children: number;
  infant: number;
  foc: number;
  guide: string;
  extraGuide: string;
  isCollapsed: boolean;
}

const PartnerTicketingSection = ({
  tourName,
  availableSeats = 33,
  onConfirm,
  onCancel,
}: PartnerTicketingSectionProps) => {
  const [transports, setTransports] = useState<TransportData[]>([
    {
      id: "1",
      operatorName: "",
      registrationNumber: "",
      driver: "",
      adults: 0,
      children: 0,
      infant: 0,
      foc: 0,
      guide: "",
      extraGuide: "",
      isCollapsed: false,
    },
  ]);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const ADULT_PRICE = 49.0;
  const CHILD_PRICE = 39.0;

  // Calculate totals from all transports
  const totalAdults = transports.reduce((sum, t) => sum + t.adults, 0);
  const totalChildren = transports.reduce((sum, t) => sum + t.children, 0);
  const totalInfant = transports.reduce((sum, t) => sum + t.infant, 0);
  const totalFoc = transports.reduce((sum, t) => sum + t.foc, 0);

  const adultTotal = totalAdults * ADULT_PRICE;
  const childTotal = totalChildren * CHILD_PRICE;
  const total = adultTotal + childTotal;
  const tourTotalPassengers =
    totalAdults + totalChildren + totalInfant + totalFoc || 0;

  // Add new transport
  const handleAddNewTransport = () => {
    // Collapse the last transport and add new one
    setTransports([
      ...transports.map((t) => ({ ...t, isCollapsed: true })),
      {
        id: Date.now().toString(),
        operatorName: "",
        registrationNumber: "",
        driver: "",
        adults: 0,
        children: 0,
        infant: 0,
        foc: 0,
        guide: "",
        extraGuide: "",
        isCollapsed: false,
      },
    ]);
  };

  // Toggle collapse state
  const toggleTransportCollapse = (id: string) => {
    setTransports(
      transports.map((t) =>
        t.id === id ? { ...t, isCollapsed: !t.isCollapsed } : t,
      ),
    );
  };

  // Update transport field
  const updateTransport = (
    id: string,
    field: keyof TransportData,
    value: any,
  ) => {
    setTransports(
      transports.map((t) => (t.id === id ? { ...t, [field]: value } : t)),
    );
  };

  // Update counter fields
  const updateCounter = (
    id: string,
    field: "adults" | "children" | "infant" | "foc",
    increment: boolean,
  ) => {
    setTransports(
      transports.map((t) => {
        if (t.id === id) {
          const currentValue = t[field];
          const newValue = increment
            ? currentValue + 1
            : Math.max(0, currentValue - 1);
          return { ...t, [field]: newValue };
        }
        return t;
      }),
    );
  };

  // Format current date
  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  // Format departure time
  const formatDepartureTime = (date: Date) => {
    const day = date.getDate();
    const month = date
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${day} ${month}, ${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const ticketData = {
    dateOfIssue: formatDate(new Date()),
    driver: "BROOKLYN SIMMONS", // This should come from your tour data
    guide: "GUY HAWKINS", // This should come from your tour data
    from: "DEMO LOCATION", // This should come from your tour data
    vehicle: "ISLAND TRANSPORT LTD.", // This should come from your tour data
    to: tourName || "LAGOON SNORKELING",
    registrationNumber: "PE 27095", // This should come from your tour data
    departure: formatDepartureTime(new Date()),
    tourCode: "CV57 XNK", // This should come from your tour data
    adults: totalAdults,
    adultPrice: ADULT_PRICE,
    children: totalChildren,
    childPrice: CHILD_PRICE,
    totalFare: total,
  };

  const handleConfirm = () => {
    // Open print modal instead of just calling onConfirm
    setIsPrintModalOpen(true);
    console.log("Opening print modal, isPrintModalOpen:", true);

    if (onConfirm) {
      onConfirm({
        adults: totalAdults,
        children: totalChildren,
        infant: totalInfant,
        foc: totalFoc,
        total,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border h-fit sticky top-6">
      <div className="p-6 h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Tour data entry</h2>
            <p className="text-gray-600">{tourName}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 flex justify-end">
              <Armchair className="w-5 h-5" />
            </p>
            <p className="text-sm text-blue-400 mt-1">
              {availableSeats} seats available
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium">Transport Details</h3>
            <Button
              variant="link"
              className="text-blue-400 text-sm"
              onClick={handleAddNewTransport}
            >
              + Add new transport
            </Button>
          </div>

          {/* Render all transports */}
          <div className="space-y-4">
            {transports.map((transport, index) => (
              <div key={transport.id} className="border rounded-lg">
                {/* Collapsed Header */}
                {transport.isCollapsed ? (
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleTransportCollapse(transport.id)}
                  >
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {transport.operatorName || "Island Transport Ltd."}
                      </h4>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                        <span>
                          Reg- {transport.registrationNumber || "HFRHR7567"}
                        </span>
                        <span>
                          {transport.adults +
                            transport.children +
                            transport.infant +
                            transport.foc}{" "}
                          passengers
                        </span>
                      </div>
                    </div>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                ) : (
                  <div className="p-4">
                    {/* Expanded Header - if multiple transports */}
                    {transports.length > 1 && (
                      <div
                        className="flex items-center justify-between mb-4 cursor-pointer"
                        onClick={() => toggleTransportCollapse(transport.id)}
                      >
                        <h4 className="font-semibold text-gray-900">
                          {transport.operatorName || `Transport ${index + 1}`}
                        </h4>
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      </div>
                    )}

                    {/* Select Operator */}
                    <div className="mb-4">
                      <Select
                        value={transport.operatorName}
                        onValueChange={(value) =>
                          updateTransport(transport.id, "operatorName", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Operator" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Island Transport Ltd.">
                            Island Transport Ltd.
                          </SelectItem>
                          <SelectItem value="Sea Link Transport">
                            Sea Link Transport
                          </SelectItem>
                          <SelectItem value="Ocean Express">
                            Ocean Express
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Assign Driver and Reg No */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <Select
                          value={transport.driver}
                          onValueChange={(value) =>
                            updateTransport(transport.id, "driver", value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Assign driver" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Brooklyn Simmons">
                              Brooklyn Simmons
                            </SelectItem>
                            <SelectItem value="John Doe">John Doe</SelectItem>
                            <SelectItem value="Jane Smith">
                              Jane Smith
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Select
                          value={transport.registrationNumber}
                          onValueChange={(value) =>
                            updateTransport(
                              transport.id,
                              "registrationNumber",
                              value,
                            )
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Reg. No" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="HFRHR7567">HFRHR7567</SelectItem>
                            <SelectItem value="ABC123XYZ">ABC123XYZ</SelectItem>
                            <SelectItem value="DEF456UVW">DEF456UVW</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Passenger Details */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        Passengers Details
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {/* Adults */}
                        <div className="border border-gray-300 rounded-lg px-3 py-1.5">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-900">
                              Adults
                            </span>
                            <div className="flex items-center gap-3">
                              <Button
                                onClick={() =>
                                  updateCounter(transport.id, "adults", false)
                                }
                                variant="outline"
                                size="icon-sm"
                                className="w-7 h-7 rounded-full"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center">
                                {transport.adults.toString().padStart(2, "0")}
                              </span>
                              <Button
                                onClick={() =>
                                  updateCounter(transport.id, "adults", true)
                                }
                                variant="outline"
                                size="icon-sm"
                                className="w-7 h-7 rounded-full"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Children */}
                        <div className="border border-gray-300 rounded-lg px-3 py-1.5">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-900">
                              Children
                            </span>
                            <div className="flex items-center gap-3">
                              <Button
                                onClick={() =>
                                  updateCounter(transport.id, "children", false)
                                }
                                variant="outline"
                                size="icon-sm"
                                className="w-7 h-7 rounded-full"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center">
                                {transport.children.toString().padStart(2, "0")}
                              </span>
                              <Button
                                onClick={() =>
                                  updateCounter(transport.id, "children", true)
                                }
                                variant="outline"
                                size="icon-sm"
                                className="w-7 h-7 rounded-full"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Infant */}
                        <div className="border border-gray-300 rounded-lg px-3 py-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-900">
                              Infant
                            </span>
                            <div className="flex items-center gap-3">
                              <Button
                                onClick={() =>
                                  updateCounter(transport.id, "infant", false)
                                }
                                variant="outline"
                                size="icon-sm"
                                className="w-7 h-7 rounded-full"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center">
                                {transport.infant.toString().padStart(2, "0")}
                              </span>
                              <Button
                                onClick={() =>
                                  updateCounter(transport.id, "infant", true)
                                }
                                variant="outline"
                                size="icon-sm"
                                className="w-7 h-7 rounded-full"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* FOC */}
                        <div className="border border-gray-300 rounded-lg px-3 py-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-900">
                              FOC
                            </span>
                            <div className="flex items-center gap-3">
                              <Button
                                onClick={() =>
                                  updateCounter(transport.id, "foc", false)
                                }
                                variant="outline"
                                size="icon-sm"
                                className="w-7 h-7 rounded-full"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center">
                                {transport.foc.toString().padStart(2, "0")}
                              </span>
                              <Button
                                onClick={() =>
                                  updateCounter(transport.id, "foc", true)
                                }
                                variant="outline"
                                size="icon-sm"
                                className="w-7 h-7 rounded-full"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tourist Guide */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        Tourist Guide
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Select
                            value={transport.guide}
                            onValueChange={(value) =>
                              updateTransport(transport.id, "guide", value)
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Assign a guide" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Guy Hawkins">
                                Guy Hawkins
                              </SelectItem>
                              <SelectItem value="Rahul Kumar">
                                Rahul Kumar
                              </SelectItem>
                              <SelectItem value="Sam Wilson">
                                Sam Wilson
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Select
                            value={transport.extraGuide}
                            onValueChange={(value) =>
                              updateTransport(transport.id, "extraGuide", value)
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Add extra guide" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="John Smith">
                                John Smith
                              </SelectItem>
                              <SelectItem value="Mary Johnson">
                                Mary Johnson
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Amount to Pay */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            Payment Details
          </h3>
          <div className="space-y-2">
            {/* Total Adult */}
            {totalAdults > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Adults:</span>
                <span className="font-medium">
                  ${ADULT_PRICE.toFixed(2)}x{totalAdults}
                </span>
              </div>
            )}

            {/* Total Children */}
            {totalChildren > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Children:</span>
                <span className="font-medium">
                  ${CHILD_PRICE.toFixed(2)}x{totalChildren}
                </span>
              </div>
            )}

            {tourTotalPassengers > 0 && (
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total Amount:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <Button
            onClick={onCancel}
            variant="outline"
            className="px-6 py-3 rounded-full"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full"
          >
            Update data & print invoice
            <Printer className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Print Ticket Modal */}
      <PrintPartnerInvoiceModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        ticketData={ticketData}
      />
    </div>
  );
};

export default PartnerTicketingSection;
