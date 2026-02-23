"use client";

import { useState } from "react";
import { Armchair } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NumberStepper } from "@/components/ui/number-stepper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface TicketingSectionProps {
  tourName: string;
  availableSeats?: number;
  onCancel?: () => void;
}

const TicketingSection = ({
  tourName,
  availableSeats = 33,
  onCancel,
}: TicketingSectionProps) => {
  const [buyerName, setBuyerName] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infant, setInfant] = useState(0);
  const [foc, setFoc] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<
    "credit card" | "xpf" | "usd" | "aud" | "euro"
  >("xpf");
  const [notes, setNotes] = useState("");

  const ADULT_PRICE = 49.0;
  const CHILD_PRICE = 39.0;

  const adultTotal = adults * ADULT_PRICE;
  const childTotal = children * CHILD_PRICE;
  const total = adultTotal + childTotal;

  const handleConfirm = () => {
    console.log("Opening print modal, isPrintModalOpen:", true);
    onCancel?.();
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
          <Input
            type="text"
            placeholder="Full Name"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            className="w-full border-gray-300"
          />
        </div>

        {/* Passenger Details */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Passenger Details
          </h3>
          <div className="grid grid-cols-2 gap-3">
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

        {/* Notes / Comments */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Notes / Comments
          </h3>
          <Textarea
            placeholder="Add any notes (e.g. late departure, sick passenger, refund requested, operational issue, special requirements...)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full border-gray-300 resize-none"
          />
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Payment Methods for the tour
          </h3>
          <div className="flex gap-3">
            <Button
              onClick={() => setPaymentMethod("credit card")}
              variant={paymentMethod === "credit card" ? "default" : "outline"}
              className={`px-4 lg:px-8 rounded-full ${
                paymentMethod === "credit card"
                  ? "bg-gray-900 hover:bg-gray-800"
                  : ""
              }`}
            >
              Credit Card
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
            className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-full"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketingSection;
