"use client";

import { useState } from "react";
import { Minus, Plus, Armchair, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import PrintInvoiceModal from "../Modals/PrintInvoiceModal";

interface CruiseTicketingSectionProps {
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
  paymentMethod: "cards" | "xpf" | "usd" | "aud" | "euro";
  total: number;
}

const CruiseTicketingSection = ({
  tourName,
  availableSeats = 33,
  onConfirm,
  onCancel,
}: CruiseTicketingSectionProps) => {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infant, setInfant] = useState(0);
  const [foc, setFoc] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<
    "cards" | "xpf" | "usd" | "aud" | "euro"
  >("xpf");
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const ADULT_PRICE = 49.0;
  const CHILD_PRICE = 39.0;

  const adultTotal = adults * ADULT_PRICE;
  const childTotal = children * CHILD_PRICE;
  const total = adultTotal + childTotal;

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
    adults: adults,
    adultPrice: ADULT_PRICE,
    children: children,
    childPrice: CHILD_PRICE,
    totalFare: total,
  };

  const handleConfirm = () => {
    // Open print modal instead of just calling onConfirm
    setIsPrintModalOpen(true);
    console.log("Opening print modal, isPrintModalOpen:", true);

    if (onConfirm) {
      onConfirm({
        adults,
        children,
        infant,
        foc,
        paymentMethod,
        total,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border h-fit sticky top-6">
      <div className="p-6">
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
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium mb-2">Transport Details</h3>
            <Button variant="link" className="text-blue-400">
              Add new transport
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="col-span-2">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an Operator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expedia">Expedia LLC</SelectItem>
                  <SelectItem value="booking">Booking.com</SelectItem>
                  <SelectItem value="airbnb">Airbnb Experiences</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Registration Number" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reg001">ABC-123-XYZ</SelectItem>
                  <SelectItem value="reg002">DEF-456-UVW</SelectItem>
                  <SelectItem value="reg003">GHI-789-RST</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Assign Driver" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="akbul">Abul</SelectItem>
                  <SelectItem value="mokluk">Mokluk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Passenger Details */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Passenger Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Adults */}
            <div>
              <div className="flex items-center justify-between mb-2 border border-gray-300 rounded-lg p-2">
                <span className="text-sm ">Adults</span>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setAdults(Math.max(0, adults - 1))}
                    variant="outline"
                    size="icon-sm"
                    className="w-6 h-6 rounded-full"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-8 text-center">
                    {adults.toString().padStart(2, "0")}
                  </span>
                  <Button
                    onClick={() => setAdults(adults + 1)}
                    variant="outline"
                    size="icon-sm"
                    className="w-6 h-6 rounded-full"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                ${ADULT_PRICE.toFixed(2)} per adults
              </p>
            </div>

            {/* Children */}
            <div>
              <div className="flex items-center justify-between mb-2 border border-gray-300 rounded-lg p-2">
                <span className="text-sm">Children</span>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    variant="outline"
                    size="icon-sm"
                    className="w-6 h-6 rounded-full"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className=" w-8 text-center">
                    {children.toString().padStart(2, "0")}
                  </span>
                  <Button
                    onClick={() => setChildren(children + 1)}
                    variant="outline"
                    size="icon-sm"
                    className="w-6 h-6 rounded-full"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                ${CHILD_PRICE.toFixed(2)} per child above 18 y/o
              </p>
            </div>

            {/* Infant */}
            <div className="border border-gray-300 rounded-lg p-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Infant</span>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setInfant(Math.max(0, infant - 1))}
                    variant="outline"
                    size="icon-sm"
                    className="w-6 h-6 rounded-full"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className=" w-8 text-center">
                    {infant.toString().padStart(2, "0")}
                  </span>
                  <Button
                    onClick={() => setInfant(infant + 1)}
                    variant="outline"
                    size="icon-sm"
                    className="w-6 h-6 rounded-full"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* FOC */}
            <div className="border border-gray-300 rounded-lg p-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">FOC</span>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setFoc(Math.max(0, foc - 1))}
                    variant="outline"
                    size="icon-sm"
                    className="w-6 h-6 rounded-full"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className=" w-8 text-center">
                    {foc.toString().padStart(2, "0")}
                  </span>
                  <Button
                    onClick={() => setFoc(foc + 1)}
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
        </div>

        <div className="mb-6">
          <h3 className="mb-2">Tourist Guide</h3>
          <div className="grid grid-cols-2 items-center gap-4 justify-between">
            <div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Assign a guide" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rahul">Rahul</SelectItem>
                  <SelectItem value="sam">Sam</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Add extra guide" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="akbul">Abul</SelectItem>
                  <SelectItem value="mokluk">Mokluk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Amount to Pay */}
        <div className="mb-6">
          <div className="space-y-2">
            {adults > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Adults:</span>
                <span className="font-medium">
                  ${ADULT_PRICE.toFixed(2)}x{adults}
                </span>
              </div>
            )}
            {children > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Children:</span>
                <span className="font-medium">
                  ${CHILD_PRICE.toFixed(2)}x{children}
                </span>
              </div>
            )}
            <div className="flex justify-between font-semibold pt-2 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
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
      <PrintInvoiceModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        ticketData={ticketData}
      />
    </div>
  );
};

export default CruiseTicketingSection;
