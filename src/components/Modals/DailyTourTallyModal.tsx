"use client";

import { useState } from "react";
import { X, Plus, Minus } from "lucide-react";

interface TourTallyItem {
  id: number;
  tourSpots: string;
  scheduledTime: string;
  shipCount: number;
  operatorCount: number;
  adultPrice: string;
  childrenPrice: string;
  totalPrice: string;
  notes: string;
  status: "matched" | "not-matched";
}

interface DailyTourTallyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DailyTourTallyModal({
  isOpen,
  onClose,
}: DailyTourTallyModalProps) {
  const [isAlertDismissed, setIsAlertDismissed] = useState(false);
  const [tallyData, setTallyData] = useState<TourTallyItem[]>([
    {
      id: 1,
      tourSpots: "City Highlights Tour",
      scheduledTime: "03:05 pm-10:30 pm",
      shipCount: 43,
      operatorCount: 43,
      adultPrice: "$88.99",
      childrenPrice: "$48.99",
      totalPrice: "$3,580.00",
      notes: "",
      status: "matched",
    },
    {
      id: 2,
      tourSpots: "Bargachhi Chok, Biratnagar",
      scheduledTime: "3:30pm - 4:00pm",
      shipCount: 42,
      operatorCount: 42,
      adultPrice: "$129.99",
      childrenPrice: "$59.99",
      totalPrice: "$5,500.00",
      notes: "",
      status: "matched",
    },
    {
      id: 3,
      tourSpots: "Hospital chowk, Biratnagar",
      scheduledTime: "2:35pm - 3:00pm",
      shipCount: 37,
      operatorCount: 35,
      adultPrice: "$119.99",
      childrenPrice: "$79.99",
      totalPrice: "$1,580.00",
      notes: "",
      status: "not-matched",
    },
    {
      id: 4,
      tourSpots: "Kanchanbari, Biratnagar",
      scheduledTime: "12:00pm - 12:30pm",
      shipCount: 44,
      operatorCount: 44,
      adultPrice: "$59.99",
      childrenPrice: "$79.99",
      totalPrice: "$9,500.00",
      notes: "",
      status: "matched",
    },
    {
      id: 5,
      tourSpots: "Hatkhola Chok, Biratnagar",
      scheduledTime: "11:30am - 12:00pm",
      shipCount: 36,
      operatorCount: 36,
      adultPrice: "$49.99",
      childrenPrice: "$129.99",
      totalPrice: "$9,500.00",
      notes: "",
      status: "matched",
    },
    {
      id: 6,
      tourSpots: "Chadani Chok, Biratnagar",
      scheduledTime: "4:05pm - 5:00pm",
      shipCount: 38,
      operatorCount: 37,
      adultPrice: "$68.99",
      childrenPrice: "$89.99",
      totalPrice: "$8,580.00",
      notes: "",
      status: "not-matched",
    },
    {
      id: 7,
      tourSpots: "Rani, Biratnagar",
      scheduledTime: "8:00am - 8:30am",
      shipCount: 41,
      operatorCount: 41,
      adultPrice: "$69.99",
      childrenPrice: "$119.99",
      totalPrice: "$12,500.00",
      notes: "",
      status: "matched",
    },
  ]);

  const totalHeadCount = tallyData.reduce(
    (sum, item) => sum + item.shipCount,
    0
  );
  const totalAmount = tallyData.reduce((sum, item) => {
    const amount = parseFloat(item.totalPrice.replace(/[$,]/g, ""));
    return sum + amount;
  }, 0);

  const hasDiscrepancy = tallyData.some(
    (item) => item.status === "not-matched"
  );
  const discrepancyCount = tallyData.filter(
    (item) => item.status === "not-matched"
  ).length;

  const updateShipCount = (id: number, increment: boolean) => {
    setTallyData((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newCount = increment
            ? item.shipCount + 1
            : Math.max(0, item.shipCount - 1);
          return {
            ...item,
            shipCount: newCount,
            status: newCount === item.operatorCount ? "matched" : "not-matched",
          };
        }
        return item;
      })
    );
  };

  const updateOperatorCount = (id: number, increment: boolean) => {
    setTallyData((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newCount = increment
            ? item.operatorCount + 1
            : Math.max(0, item.operatorCount - 1);
          return {
            ...item,
            operatorCount: newCount,
            status: newCount === item.shipCount ? "matched" : "not-matched",
          };
        }
        return item;
      })
    );
  };

  const updateNotes = (id: number, notes: string) => {
    setTallyData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, notes } : item))
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Daily tour tally
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Consned - Mixxido - Jan 8, 2026
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              Cancel
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
              Confirm tally
            </button>
          </div>
        </div>

        {/* Summary Section */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-start gap-8">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Head Count</p>
              <p className="text-3xl font-bold text-gray-900">
                {totalHeadCount}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Amount Out</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-green-600">
                  ${totalAmount.toLocaleString()}
                </p>
                <button className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded text-xs flex items-center gap-1">
                  In-review
                  <span className="ml-1">⚠️</span>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Total amount from the selected tours
              </p>
            </div>
          </div>
        </div>

        {/* Discrepancy Alert */}
        {hasDiscrepancy && !isAlertDismissed && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start justify-between">
            <div className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">⚠️</span>
              <p className="text-sm text-red-700">
                <span className="font-semibold">Discrepancy Alert</span>
                <br />
                {discrepancyCount} tours have mismatched head count between ship
                and operator data. Please review and reconcile before
                confirming.
              </p>
            </div>
            <button
              onClick={() => setIsAlertDismissed(true)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Table Section */}
        <div className="flex-1 overflow-auto px-6 py-4">
          <table className="w-full">
            <thead className="sticky top-0 bg-white">
              <tr className="border-b border-gray-200">
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tour Spots
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Scheduled Time
                </th>
                <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ship Count
                </th>
                <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Operator Count
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Adult Price
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Children Price
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Price
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tallyData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-3 py-3 text-sm text-gray-900">
                    {item.tourSpots}
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-600">
                    {item.scheduledTime}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => updateShipCount(item.id, false)}
                        className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Minus className="w-3 h-3 text-gray-600" />
                      </button>
                      <span className="text-sm font-medium text-gray-900 min-w-[2ch] text-center">
                        {item.shipCount}
                      </span>
                      <button
                        onClick={() => updateShipCount(item.id, true)}
                        className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Plus className="w-3 h-3 text-gray-600" />
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => updateOperatorCount(item.id, false)}
                        className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Minus className="w-3 h-3 text-gray-600" />
                      </button>
                      <span className="text-sm font-medium text-gray-900 min-w-[2ch] text-center">
                        {item.operatorCount}
                      </span>
                      <button
                        onClick={() => updateOperatorCount(item.id, true)}
                        className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Plus className="w-3 h-3 text-gray-600" />
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-900">
                    {item.adultPrice}
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-900">
                    {item.childrenPrice}
                  </td>
                  <td className="px-3 py-3 text-sm font-medium text-gray-900">
                    {item.totalPrice}
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="text"
                      placeholder="Add note..."
                      value={item.notes}
                      onChange={(e) => updateNotes(item.id, e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex justify-center">
                      {item.status === "matched" ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span className="text-xs font-medium">Matched</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-orange-600">
                          <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                          <span className="text-xs font-medium">
                            Not matched
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
