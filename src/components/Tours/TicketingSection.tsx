"use client";

import { useState } from "react";
import { Minus, Plus, Armchair } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

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
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [infant, setInfant] = useState(0);
  const [foc, setFoc] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"cards" | "xpf" | "usd" | "aud" | "euro">("xpf");

  const ADULT_PRICE = 49.0;
  const CHILD_PRICE = 39.0;

  const adultTotal = adults * ADULT_PRICE;
  const childTotal = children * CHILD_PRICE;
  const total = adultTotal + childTotal;

  const handleConfirm = () => {
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
    <div className="bg-white rounded-lg shadow-sm border h-fit sticky top-6">
      <div className="p-6">
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
            {/* Adults */}
            <div>
              <div className="flex items-center justify-between mb-2 border border-gray-300 rounded-lg p-3">
                <span className="text-sm font-medium">Adults</span>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setAdults(Math.max(0, adults - 1))}
                    variant="outline"
                    size="icon-sm"
                    className="w-6 h-6 rounded-full"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="text-lg font-semibold w-8 text-center">
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
              <div className="flex items-center justify-between mb-2 border border-gray-300 rounded-lg p-3">
                <span className="text-sm font-medium">Children</span>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    variant="outline"
                    size="icon-sm"
                    className="w-6 h-6 rounded-full"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="text-lg font-semibold w-8 text-center">
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
            <div className="border border-gray-300 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Infant</span>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setInfant(Math.max(0, infant - 1))}
                    variant="outline"
                    size="icon-sm"
                    className="w-6 h-6 rounded-full"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="text-lg font-semibold w-8 text-center">
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
            <div className="border border-gray-300 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">FOC</span>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setFoc(Math.max(0, foc - 1))}
                    variant="outline"
                    size="icon-sm"
                    className="w-6 h-6 rounded-full"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="text-lg font-semibold w-8 text-center">
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
              className={`px-4 lg:px-8 rounded-full${
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
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketingSection;
