"use client";

import { useState } from "react";
import { X, Phone, Minus, Plus } from "lucide-react";

interface TicketingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourName: string;
  availableSeats?: number;
  onConfirm?: (ticketData: TicketData) => void;
}

interface TicketData {
  buyerName: string;
  phoneNumber: string;
  adults: number;
  children: number;
  infant: number;
  foc: number;
  paymentMethod: "cards" | "usd";
  total: number;
}

const TicketingModal = ({
  isOpen,
  onClose,
  tourName,
  availableSeats = 33,
  onConfirm,
}: TicketingModalProps) => {
  const [buyerName, setBuyerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infant, setInfant] = useState(0);
  const [foc, setFoc] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"cards" | "usd">("usd");

  const ADULT_PRICE = 49.0;
  const CHILD_PRICE = 29.0;

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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed right-0 top-0 h-full w-full md:w-120 bg-white shadow-xl z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Ticketing</h2>
              <p className="text-gray-600">{tourName}</p>
            </div>
            <div className="text-right">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <Phone className="w-5 h-5" />
              </button>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <div className="border border-gray-300 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Adults</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setAdults(Math.max(0, adults - 1))}
                      className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-lg font-semibold w-8 text-center">
                      {adults.toString().padStart(2, "0")}
                    </span>
                    <button
                      onClick={() => setAdults(adults + 1)}
                      className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  ${ADULT_PRICE.toFixed(2)} per adults
                </p>
              </div>

              {/* Children */}
              <div className="border border-gray-300 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Children</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-lg font-semibold w-8 text-center">
                      {children.toString().padStart(2, "0")}
                    </span>
                    <button
                      onClick={() => setChildren(children + 1)}
                      className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
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
                    <button
                      onClick={() => setInfant(Math.max(0, infant - 1))}
                      className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-lg font-semibold w-8 text-center">
                      {infant.toString().padStart(2, "0")}
                    </span>
                    <button
                      onClick={() => setInfant(infant + 1)}
                      className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* FOC */}
              <div className="border border-gray-300 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">FOC</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setFoc(Math.max(0, foc - 1))}
                      className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-lg font-semibold w-8 text-center">
                      {foc.toString().padStart(2, "0")}
                    </span>
                    <button
                      onClick={() => setFoc(foc + 1)}
                      className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
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
              Payment Method
            </h3>
            <div className="flex gap-3">
              <button
                onClick={() => setPaymentMethod("cards")}
                className={`flex-1 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                  paymentMethod === "cards"
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setPaymentMethod("usd")}
                className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  paymentMethod === "usd"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                } border flex items-center justify-center gap-1`}
              >
                USD
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
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
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketingModal;
