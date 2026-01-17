"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import styles from "@/components/styles/Print.module.css";

interface PrintInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketData: {
    dateOfIssue: string;
    driver: string;
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

const PrintInvoiceModal = ({
  isOpen,
  onClose,
  ticketData,
}: PrintInvoiceModalProps) => {
  // Generate invoice number once using lazy state initialization
  const [invoiceNumber] = useState(() => `INV${String(Date.now()).slice(-3)}`);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  // Calculate values
  const subtotal = ticketData.totalFare;
  const taxRate = 0.1; // 10% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  // Format current date for invoice
  const currentDate = new Date();
  const formatInvoiceDate = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const invoiceDate = formatInvoiceDate(currentDate);
  const dueDate = formatInvoiceDate(
    new Date(currentDate.getTime() + 18 * 24 * 60 * 60 * 1000)
  ); // 18 days later

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className={`${styles.printArea} p-8`}>
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            {/* Left side - Company Info */}
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <Image
                  src={logo}
                  alt="Wetré Tours Logo"
                  className="w-full object-cover rounded-full"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">WETRÉ TOURS</h1>
                <p className="text-xs text-gray-500">[Street Address]</p>
                <p className="text-xs text-gray-500">
                  [City Name, State, ZIP Code]
                </p>
                <p className="text-xs text-gray-500">P: [Contact Number]</p>
                <p className="text-xs text-gray-500">E: [Email Address]</p>
                <p className="text-xs text-blue-500 underline">
                  [website@domain.com]
                </p>
              </div>
            </div>

            {/* Right side - Invoice Info */}
            <div className="text-right">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">INVOICE</h2>
              <p className="text-sm text-gray-600">#{invoiceNumber}</p>
              <div className="mt-4 text-xs text-gray-600 space-y-1">
                <p>Invoice Date: {invoiceDate}</p>
                <p>Issued Date: {invoiceDate}</p>
                <p>Due Date: {dueDate}</p>
              </div>
            </div>
          </div>

          {/* Sub-contractor company */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Sub-contractor company
            </h3>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-400 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">✈</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">Expedia</h4>
                <div className="text-right text-xs text-gray-500 space-y-1">
                  <p>[Representer Name]</p>
                  <p>[Designation]</p>
                  <p>[Street Address]</p>
                  <p>[City Name, State, ZIP Code]</p>
                  <p>P: [Contact Number]</p>
                  <p>E: [Email Address]</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resources Table */}
          <div className="mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-400 text-white">
                  <th className="border border-blue-400 p-3 text-left text-sm font-semibold">
                    Resources
                  </th>
                  <th className="border border-blue-400 p-3 text-center text-sm font-semibold">
                    Quantity
                  </th>
                  <th className="border border-blue-400 p-3 text-center text-sm font-semibold">
                    Rate/hr /Fixed
                  </th>
                  <th className="border border-blue-400 p-3 text-right text-sm font-semibold">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td className="border border-gray-300 p-3 text-sm">
                    Vehicle
                  </td>
                  <td className="border border-gray-300 p-3 text-center text-sm">
                    {ticketData.adults + ticketData.children > 0 ? 3 : 0}
                  </td>
                  <td className="border border-gray-300 p-3 text-center text-sm">
                    USD 150.00
                  </td>
                  <td className="border border-gray-300 p-3 text-right text-sm">
                    USD{" "}
                    {(
                      (ticketData.adults + ticketData.children > 0 ? 3 : 0) *
                      150
                    ).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 text-sm">Guide</td>
                  <td className="border border-gray-300 p-3 text-center text-sm">
                    {ticketData.guide ? 5 : 0}
                  </td>
                  <td className="border border-gray-300 p-3 text-center text-sm">
                    USD 125.00
                  </td>
                  <td className="border border-gray-300 p-3 text-right text-sm">
                    USD {(ticketData.guide ? 5 * 125 : 0).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 text-sm">Driver</td>
                  <td className="border border-gray-300 p-3 text-center text-sm">
                    {ticketData.driver ? 3 : 0}
                  </td>
                  <td className="border border-gray-300 p-3 text-center text-sm">
                    USD 200.00
                  </td>
                  <td className="border border-gray-300 p-3 text-right text-sm">
                    USD {(ticketData.driver ? 3 * 200 : 0).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Totals */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-end items-center">
                <span className="text-sm font-semibold mr-8">Subtotal</span>
                <span className="text-sm text-right w-32">
                  USD {subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-end items-center">
                <span className="text-sm font-semibold mr-8">Tax</span>
                <span className="text-sm text-right w-32">
                  USD {tax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-end items-center bg-blue-400 text-white p-2 rounded">
                <span className="text-sm font-bold mr-8">Total</span>
                <span className="text-sm font-bold text-right w-32">
                  USD {total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Terms of Service */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-blue-500 mb-2">
              Terms Of Service
            </h3>
            <p className="text-xs text-gray-600">
              Payment will be released within 10 Days of Receiving this Invoice.
            </p>
          </div>

          {/* Signature */}
          <div className="mt-8">
            <p className="text-xs text-gray-600">Chief Manager Sign</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 pb-6 no-print">
          <Button onClick={onClose} variant="outline" className="rounded-full">
            Cancel
          </Button>
          <Button
            onClick={handlePrint}
            className="px-6 bg-blue-500 hover:bg-blue-600 rounded-full"
          >
            Print Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrintInvoiceModal;
