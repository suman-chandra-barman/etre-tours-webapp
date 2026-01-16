"use client";

import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import styles from "@/components/styles/Print.module.css";

interface PrintTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketData: {
    dateOfIssue: string;
    driver: string;
    buyer: string;
    guide: string;
    from: string;
    vehicle: string;
    to: string;
    registrationNumber: string;
    departure: string;
    tourCode: string;
    adults: number;
    adultPrice: number;
    children: number;
    childPrice: number;
    totalFare: number;
  };
}

const PrintTicketModal = ({
  isOpen,
  onClose,
  ticketData,
}: PrintTicketModalProps) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-300 w-full max-h-[90vh] overflow-y-auto">
        <div className={`${styles.printArea} flex w-full`}>
          {/* Passenger Copy */}
          <div className="flex-1 border-dashed border-r-3 border-gray-400  overflow-hidden rounded-l-lg">
            <div className="bg-[#87CEEB] p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <Image src={logo} alt="Logo" className="w-full object-cover" />
              </div>
              <h3 className="text-2xl font-semibold uppercase">
                Passenger Copy
              </h3>
            </div>

            {/* Body */}
            <div className="p-5 bg-[#E8F4F8]">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-[11px] text-gray-600 uppercase mb-1">
                    Date of Issue
                  </p>
                  <p className="text-base font-semibold uppercase">
                    {ticketData.dateOfIssue}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-600 uppercase mb-1">
                    Driver
                  </p>
                  <p className="text-base font-semibold uppercase">
                    {ticketData.driver}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-600 uppercase mb-1">
                    Buyer
                  </p>
                  <p className="text-base font-semibold uppercase">
                    {ticketData.buyer}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-600 uppercase mb-1">
                    Guide
                  </p>
                  <p className="text-base font-semibold uppercase">
                    {ticketData.guide}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-600 uppercase mb-1">
                    From
                  </p>
                  <p className="text-base font-semibold uppercase">
                    {ticketData.from}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-600 uppercase mb-1">
                    Vehicle
                  </p>
                  <p className="text-base font-semibold uppercase">
                    {ticketData.vehicle}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-600 uppercase mb-1">To</p>
                  <p className="text-base font-semibold uppercase">
                    {ticketData.to}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-600 uppercase mb-1">
                    Registration Number
                  </p>
                  <p className="text-base font-semibold uppercase">
                    {ticketData.registrationNumber}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-600 uppercase mb-1">
                    Departure
                  </p>
                  <p className="text-base font-semibold uppercase">
                    {ticketData.departure}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-600 uppercase mb-1">
                    Tour Code
                  </p>
                  <p className="text-base font-semibold uppercase">
                    {ticketData.tourCode}
                  </p>
                </div>
              </div>

              {/* Passenger Details Table */}
              <div className="mt-6">
                <p className="text-[11px] text-gray-600 uppercase mb-2">
                  Passenger Details
                </p>
                <table className="w-full bg-white border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left text-[11px] text-gray-600 uppercase font-semibold">
                        Number of Adults
                      </th>
                      <th className="border border-gray-300 p-3 text-left text-[11px] text-gray-600 uppercase font-semibold">
                        Number of Children
                      </th>
                      <th className="border border-gray-300 p-3 text-right text-[11px] text-gray-600 uppercase font-semibold">
                        Total Fare
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3 text-base font-bold">
                        {ticketData.adults} X ${ticketData.adultPrice}
                      </td>
                      <td className="border border-gray-300 p-3 text-base font-bold">
                        {ticketData.children} X ${ticketData.childPrice}
                      </td>
                      <td className="border border-gray-300 p-3 text-right text-base font-bold">
                        ${ticketData.totalFare.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Driver Copy */}
          <div className="flex-1 overflow-hidden rounded-r-lg">
            {/* Header */}
            <div className="bg-[#87CEEB] p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <Image src={logo} alt="Logo" className="w-full object-cover" />
              </div>
              <h3 className="text-2xl font-semibold uppercase">Driver Copy</h3>
            </div>

            {/* Body */}
            <div className="p-5 bg-[#E8F4F8]">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-[11px] text-gray-600 uppercase mb-1">
                    Date of Issue
                  </p>
                  <p className="text-base font-semibold uppercase">
                    {ticketData.dateOfIssue}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-600 uppercase mb-1">
                    Driver
                  </p>
                  <p className="text-base font-semibold uppercase">
                    {ticketData.driver}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-600 uppercase mb-1">
                    Buyer
                  </p>
                  <p className="text-base font-semibold uppercase">
                    {ticketData.buyer}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-600 uppercase mb-1">
                    Guide
                  </p>
                  <p className="text-base font-semibold uppercase">
                    {ticketData.guide}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-600 uppercase mb-1">
                    From
                  </p>
                  <p className="text-base font-semibold uppercase">
                    {ticketData.from}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-600 uppercase mb-1">
                    Vehicle
                  </p>
                  <p className="text-base font-semibold uppercase">
                    {ticketData.vehicle}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-600 uppercase mb-1">To</p>
                  <p className="text-base font-semibold uppercase">
                    {ticketData.to}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-600 uppercase mb-1">
                    Registration Number
                  </p>
                  <p className="text-base font-semibold uppercase">
                    {ticketData.registrationNumber}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-600 uppercase mb-1">
                    Departure
                  </p>
                  <p className="text-base font-semibold uppercase">
                    {ticketData.departure}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-600 uppercase mb-1">
                    Tour Code
                  </p>
                  <p className="text-base font-semibold uppercase">
                    {ticketData.tourCode}
                  </p>
                </div>
              </div>

              {/* Passenger Details Table */}
              <div className="mt-6">
                <p className="text-[11px] text-gray-600 uppercase mb-2">
                  Passenger Details
                </p>
                <table className="w-full bg-white border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left text-[11px] text-gray-600 uppercase font-semibold">
                        Number of Adults
                      </th>
                      <th className="border border-gray-300 p-3 text-left text-[11px] text-gray-600 uppercase font-semibold">
                        Number of Children
                      </th>
                      <th className="border border-gray-300 p-3 text-right text-[11px] text-gray-600 uppercase font-semibold">
                        Total Fare
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3 text-base font-bold">
                        {ticketData.adults} X ${ticketData.adultPrice}
                      </td>
                      <td className="border border-gray-300 p-3 text-base font-bold">
                        {ticketData.children} X ${ticketData.childPrice}
                      </td>
                      <td className="border border-gray-300 p-3 text-right text-base font-bold">
                        ${ticketData.totalFare.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 p-6 no-print">
          <Button onClick={onClose} variant="outline" className="rounded-full">
            Cancel
          </Button>
          <Button
            onClick={handlePrint}
            className="px-6 bg-blue-500 hover:bg-blue-600 rounded-full"
          >
            Print Ticket
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrintTicketModal;
