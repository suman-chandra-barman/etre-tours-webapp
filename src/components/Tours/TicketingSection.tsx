"use client";

import { useState } from "react";
import { Armchair, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NumberStepper } from "@/components/ui/number-stepper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import PrintTicketModal from "../Modals/PrintTicketModal";

interface TicketingSectionProps {
  tourName: string;
  availableSeats?: number;
  onConfirm?: (ticketData: TicketData) => void;
  onCancel?: () => void;
}

interface TicketData {
  buyerName: string;
  phoneNumber: string;
  adults: number;
  children: number;
  infant: number;
  foc: number;
  paymentMethod: "cards" | "xpf" | "usd" | "aud" | "euro";
  total: number;
}

const TicketingSection = ({
  tourName,
  availableSeats = 33,
  onConfirm,
  onCancel,
}: TicketingSectionProps) => {
  const [buyerName, setBuyerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
    buyer: buyerName || "ALEX MORGAN",
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
        buyerName,
        phoneNumber,
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
    <div className="bg-white rounded-lg shadow-sm border w-full">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Ticketing</h2>
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

        {/* Buyer's Details */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Buyer&apos;s Details
          </h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Name"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Passenger Details */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Passenger Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <NumberStepper
              label="Adults"
              value={adults}
              onChange={setAdults}
              description={`$${ADULT_PRICE.toFixed(2)} per adults`}
            />
            <NumberStepper
              label="Children"
              value={children}
              onChange={setChildren}
              description={`$${CHILD_PRICE.toFixed(2)} per child above 18 y/o`}
            />
            <NumberStepper label="Infant" value={infant} onChange={setInfant} />
            <NumberStepper label="FOC" value={foc} onChange={setFoc} />
          </div>
        </div>

        {/* Amount to Pay */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Amount to Pay
          </h3>
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
            <div className="flex justify-between text-lg font-semibold pt-2 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Payment Methods for the tour
          </h3>
          <div className="flex gap-3">
            <Button
              onClick={() => setPaymentMethod("cards")}
              variant={paymentMethod === "cards" ? "default" : "outline"}
              className={`px-4 lg:px-8 rounded-full ${
                paymentMethod === "cards" ? "bg-gray-900 hover:bg-gray-800" : ""
              }`}
            >
              Cards
            </Button>
            <Select
              value={paymentMethod}
              onValueChange={(value: "xpf" | "usd" | "aud" | "euro") =>
                setPaymentMethod(value)
              }
            >
              <SelectTrigger className="px-4 lg:px-8 rounded-full h-9!">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xpf">XPF</SelectItem>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="aud">AUD</SelectItem>
                <SelectItem value="euro">EURO</SelectItem>
              </SelectContent>
            </Select>
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
            Confirm & print ticket
            <Printer className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Print Ticket Modal */}
      <PrintTicketModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        ticketData={ticketData}
      />
    </div>
  );
};

export default TicketingSection;
