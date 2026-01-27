"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import ConfirmSetupTourModal from "@/components/Modals/ConfirmSetupTourModal";

// Sample tour data
const tours = [
  {
    id: 1,
    tourSpot: "Batarahlot, Baijanathpur",
    departureFrom: "Batarahlot, Baijanathpur",
    adultFair: "$59.99",
    childrenFair: "$59.99",
    extraGuideCost: "$176",
    subContractorCost: "3%",
    paymentMethod: "Cards & Cash",
  },
  {
    id: 2,
    tourSpot: "Bargachhi Chok, Biratnagar",
    departureFrom: "Bargachhi Chok, Biratnagar",
    adultFair: "$99.99",
    childrenFair: "$99.99",
    extraGuideCost: "$120",
    subContractorCost: "4%",
    paymentMethod: "Cards & Cash",
  },
  {
    id: 3,
    tourSpot: "Hospital chowk, Biratnagar",
    departureFrom: "Hospital chowk, Biratnagar",
    adultFair: "$119.99",
    childrenFair: "$119.99",
    extraGuideCost: "$340",
    subContractorCost: "12%",
    paymentMethod: "Cards & Cash",
  },
  {
    id: 4,
    tourSpot: "Kanchanbari, Biratnagar",
    departureFrom: "Kanchanbari, Biratnagar",
    adultFair: "$99.99",
    childrenFair: "$99.99",
    extraGuideCost: "$265",
    subContractorCost: "14%",
    paymentMethod: "Cards & Cash",
  },
  {
    id: 5,
    tourSpot: "Hatkhola Chok, Biratnagar",
    departureFrom: "Hatkhola Chok, Biratnagar",
    adultFair: "$79.99",
    childrenFair: "$79.99",
    extraGuideCost: "$187",
    subContractorCost: "9%",
    paymentMethod: "Cards & Cash",
  },
  {
    id: 6,
    tourSpot: "Chadani Chok, Biratnagar",
    departureFrom: "Chadani Chok, Biratnagar",
    adultFair: "$69.99",
    childrenFair: "$69.99",
    extraGuideCost: "$345",
    subContractorCost: "8%",
    paymentMethod: "Cards & Cash",
  },
  {
    id: 7,
    tourSpot: "Rani, Biratnagar",
    departureFrom: "Rani, Biratnagar",
    adultFair: "$89.99",
    childrenFair: "$89.99",
    extraGuideCost: "$376",
    subContractorCost: "9%",
    paymentMethod: "Cards & Cash",
  },
  {
    id: 8,
    tourSpot: "Ghinaghat, Baijanathpur",
    departureFrom: "Ghinaghat, Baijanathpur",
    adultFair: "$109.99",
    childrenFair: "$109.99",
    extraGuideCost: "$145",
    subContractorCost: "21%",
    paymentMethod: "Cards & Cash",
  },
  {
    id: 9,
    tourSpot: "Jaynepal chowk, Biratnagar",
    departureFrom: "Jaynepal chowk, Biratnagar",
    adultFair: "$89.99",
    childrenFair: "$89.99",
    extraGuideCost: "$223",
    subContractorCost: "15%",
    paymentMethod: "Cards & Cash",
  },
  {
    id: 10,
    tourSpot: "Kohobarschok, Biratnagar",
    departureFrom: "Kohobarschok, Biratnagar",
    adultFair: "$129.99",
    childrenFair: "$129.99",
    extraGuideCost: "$205",
    subContractorCost: "18%",
    paymentMethod: "Cards & Cash",
  },
  {
    id: 11,
    tourSpot: "Kohobara, Biratnagar",
    departureFrom: "Kohobara, Biratnagar",
    adultFair: "$49.99",
    childrenFair: "$49.99",
    extraGuideCost: "$228",
    subContractorCost: "17%",
    paymentMethod: "Cards & Cash",
  },
  {
    id: 12,
    tourSpot: "Bhattimod, Biratnagar",
    departureFrom: "Bhattimod, Biratnagar",
    adultFair: "$119.99",
    childrenFair: "$119.99",
    extraGuideCost: "$234",
    subContractorCost: "8%",
    paymentMethod: "Cards & Cash",
  },
];

function ToursPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Manage tours</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-400 hover:bg-blue-500 text-white rounded-full"
        >
          + Confirm setup tour
        </Button>
      </div>

      {/* Tours Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tour
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Departure From
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Adult Fair per Head
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Children Fair per Head
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Extra Guide Cost
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sub-contractor Cost
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment method
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {/* Actions */}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tours.map((tour) => (
                <tr key={tour.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tour.tourSpot}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tour.departureFrom}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tour.adultFair}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tour.childrenFair}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tour.extraGuideCost}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tour.subContractorCost}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tour.paymentMethod}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirm Setup Tour Modal */}
      <ConfirmSetupTourModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </main>
  );
}

export default ToursPage;
