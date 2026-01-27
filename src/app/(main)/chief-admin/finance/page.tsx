"use client";

import { useState, useRef } from "react";
import {
  Calendar,
  Search,
  ChevronLeft,
  ChevronRight,
  Paperclip,
  Download,
  Trash2,
  FileText,
} from "lucide-react";
import styles from "@/components/styles/Print.module.css";

interface InvoiceItem {
  id: number;
  invoiceNo: string;
  dateTime: string;
  tourSpots: string;
  departureFrom: string;
  tourCode: string;
  subContractor: string;
  paymentInvoice?: string | null; // Image filename or null
  voucher?: string | null; // Image filename or null
  totalCost: number;
  totalProfit: number;
  status: "Paid" | "Pending";
}

// Mock data based on the design image
const mockInvoiceData: InvoiceItem[] = [
  {
    id: 1,
    invoiceNo: "INV 23",
    dateTime: "Feb 21, 2023 at 03:05 pm",
    tourSpots: "Batarahitol, Baijanathpur",
    departureFrom: "Batarahitol, Baijanathpur",
    tourCode: "295A-6774-9EA2-5338",
    subContractor: "Primer Inc.",
    paymentInvoice: "uppervca...",
    voucher: "uppervca...",
    totalCost: 176,
    totalProfit: 26000,
    status: "Paid",
  },
  {
    id: 2,
    invoiceNo: "INV 13",
    dateTime: "Aug 3, 2023 at 12:10 am",
    tourSpots: "Bargachhi Chok, Biratnagar",
    departureFrom: "Bargachhi Chok, Biratnagar",
    tourCode: "D5WC-3F5C-4E6C-C258",
    subContractor: "Larson & Larson",
    paymentInvoice: "blockedfun...",
    voucher: null,
    totalCost: 120,
    totalProfit: 37000,
    status: "Pending",
  },
  {
    id: 3,
    invoiceNo: "INV 15",
    dateTime: "Mar 13, 2023 at 08:05 am",
    tourSpots: "Hospital chowk, Biratnagar",
    departureFrom: "Hospital chowk, Biratnagar",
    tourCode: "CFCA-3F50-E459-9E57",
    subContractor: "Mertz Group",
    paymentInvoice: "blockedfun...",
    voucher: "blockedfun...",
    totalCost: 340,
    totalProfit: 33000,
    status: "Paid",
  },
  {
    id: 4,
    invoiceNo: "INV 78",
    dateTime: "Jan 1, 2023 at 01:49 pm",
    tourSpots: "Kanchanbari, Biratnagar",
    departureFrom: "Kanchanbari, Biratnagar",
    tourCode: "D5WC-3F5C-4E6C-C258",
    subContractor: "Wintheiser LLC",
    paymentInvoice: "schemaskd",
    voucher: "schemaskd",
    totalCost: 265,
    totalProfit: 42000,
    status: "Paid",
  },
  {
    id: 5,
    invoiceNo: "INV 25",
    dateTime: "Jan 11, 2023 at 01:49 pm",
    tourSpots: "Hatkhola Chok, Biratnagar",
    departureFrom: "Hatkhola Chok, Biratnagar",
    tourCode: "CAAC-3SDC-4E6C-C258",
    subContractor: "Solenoid",
    paymentInvoice: "deletepunc...",
    voucher: null,
    totalCost: 187,
    totalProfit: 42000,
    status: "Pending",
  },
  {
    id: 6,
    invoiceNo: "INV 28",
    dateTime: "Mar 13, 2023 at 08:05 am",
    tourSpots: "Chadani Chok, Biratnagar",
    departureFrom: "Chadani Chok, Biratnagar",
    tourCode: "295A-6774-9EA2-5338",
    subContractor: "Wiegand-Shields",
    paymentInvoice: "chuffleproud",
    voucher: "shuffleproud",
    totalCost: 345,
    totalProfit: 74000,
    status: "Paid",
  },
  {
    id: 7,
    invoiceNo: "INV 64",
    dateTime: "Aug 18, 2023 at 04:12 pm",
    tourSpots: "Rani, Biratnagar",
    departureFrom: "Rani, Biratnagar",
    tourCode: "CAAC-3SDC-4E6C-C258",
    subContractor: "Metaful",
    paymentInvoice: "coastlinevou...",
    voucher: "coastlinevou...",
    totalCost: 376,
    totalProfit: 17000,
    status: "Paid",
  },
  {
    id: 8,
    invoiceNo: "INV 15",
    dateTime: "Oct 13, 2023 at 08:05 am",
    tourSpots: "Ghinaghat, Baijanathpur",
    departureFrom: "Ghinaghat, Baijanathpur",
    tourCode: "KDSS-2424-6565-HYJU",
    subContractor: "Batz Group",
    paymentInvoice: "catchtablee...",
    voucher: null,
    totalCost: 145,
    totalProfit: 16300,
    status: "Pending",
  },
  {
    id: 9,
    invoiceNo: "INV 64",
    dateTime: "Jan 11, 2023 at 01:49 pm",
    tourSpots: "Jaynepal chowk, Biratnagar",
    departureFrom: "Jaynepal chowk, Biratnagar",
    tourCode: "295A-6774-9EA2-5338",
    subContractor: "Performante",
    paymentInvoice: "potsunfair",
    voucher: "potsunfair",
    totalCost: 223,
    totalProfit: 21000,
    status: "Paid",
  },
  {
    id: 10,
    invoiceNo: "INV 56",
    dateTime: "Jan 1, 2023 at 01:49 pm",
    tourSpots: "Kohobarachok, Biratnagar",
    departureFrom: "Kohobarachok, Biratnagar",
    tourCode: "KDSS-2424-6565-HYJU",
    subContractor: "TypeSafe",
    paymentInvoice: "chummynit...",
    voucher: null,
    totalCost: 205,
    totalProfit: 21000,
    status: "Pending",
  },
  {
    id: 11,
    invoiceNo: "INV 12",
    dateTime: "Nov 4, 2023 at 12:13 am",
    tourSpots: "Kohobara, Biratnagar",
    departureFrom: "Kohobara, Biratnagar",
    tourCode: "KDSS-2424-6565-HYJU",
    subContractor: "Advanta Inc.",
    paymentInvoice: "pinslaunch",
    voucher: "pinslaunch",
    totalCost: 228,
    totalProfit: 82000,
    status: "Paid",
  },
  {
    id: 12,
    invoiceNo: "INV 25",
    dateTime: "Sep 4, 2021 at 12:14 am",
    tourSpots: "Bhattimud, Biratnagar",
    departureFrom: "Bhattimud, Biratnagar",
    tourCode: "CAAC-3SDC-4E6C-C258",
    subContractor: "Leannon and Sons",
    paymentInvoice: "germlessoh...",
    voucher: null,
    totalCost: 234,
    totalProfit: 57000,
    status: "Pending",
  },
  {
    id: 13,
    invoiceNo: "INV 64",
    dateTime: "Aug 18, 2023 at 04:12 pm",
    tourSpots: "Jwalatol, Biratnagar",
    departureFrom: "Jwalatol, Biratnagar",
    tourCode: "295A-6774-9EA2-5338",
    subContractor: "FastTrak",
    paymentInvoice: "dutiesvee...",
    voucher: "dutiesvee...",
    totalCost: 178,
    totalProfit: 46000,
    status: "Paid",
  },
  {
    id: 14,
    invoiceNo: "INV 15",
    dateTime: "Sep 4, 2021 at 12:14 am",
    tourSpots: "Dhanpura, Baijanathpur",
    departureFrom: "Dhanpura, Baijanathpur",
    tourCode: "CAAC-3SDC-4E6C-C258",
    subContractor: "Verify",
    paymentInvoice: "chummynit...",
    voucher: "chummynit...",
    totalCost: 324,
    totalProfit: 12000,
    status: "Paid",
  },
];

export default function FinancePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("Any time");
  const [selectedTourZone, setSelectedTourZone] = useState("Select tour zone");
  const [selectedSubContractor, setSelectedSubContractor] = useState(
    "Filter by sub-contractor",
  );
  const [activeTab, setActiveTab] = useState<
    "Direct Sales" | "Cruise Operations" | "Partner"
  >("Direct Sales");
  const [currentPage, setCurrentPage] = useState(1);
  const [invoices, setInvoices] = useState<InvoiceItem[]>(mockInvoiceData);
  const [hoveredFile, setHoveredFile] = useState<{
    id: number;
    type: "payment" | "voucher";
  } | null>(null);

  // Refs for file inputs
  const paymentFileInputRefs = useRef<{
    [key: number]: HTMLInputElement | null;
  }>({});
  const voucherFileInputRefs = useRef<{
    [key: number]: HTMLInputElement | null;
  }>({});

  const itemsPerPage = 10;

  const filteredData = invoices;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleFileUpload = (
    invoiceId: number,
    type: "payment" | "voucher",
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setInvoices((prev) =>
        prev.map((invoice) =>
          invoice.id === invoiceId
            ? {
                ...invoice,
                [type === "payment" ? "paymentInvoice" : "voucher"]: file.name,
              }
            : invoice,
        ),
      );
    }
  };

  const handleFileDelete = (invoiceId: number, type: "payment" | "voucher") => {
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.id === invoiceId
          ? {
              ...invoice,
              [type === "payment" ? "paymentInvoice" : "voucher"]: null,
            }
          : invoice,
      ),
    );
  };

  const handleFileDownload = (fileName: string) => {
    // Simulate download
    console.log("Downloading:", fileName);
    alert(`Downloading: ${fileName}`);
  };

  const handleStatusChange = (
    invoiceId: number,
    newStatus: "Paid" | "Pending",
  ) => {
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.id === invoiceId ? { ...invoice, status: newStatus } : invoice,
      ),
    );
  };

  return (
    <div className="flex flex-col bg-gray-50 overflow-y-auto">
      <div className="flex-1">
        <div className="p-6">
          {/* Header Section */}
          <div
            className={`flex items-center justify-between mb-6 ${styles.noPrint}`}
          >
            <div className={`flex items-center gap-3 `}>
              <h1 className="text-2xl font-semibold text-gray-900">
                Invoices & Vouchers
              </h1>
            </div>
          </div>

          <div className={`flex items-center gap-4 mb-4 ${styles.noPrint}`}>
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by tour code or sub-contractor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tabs Section */}
          <div
            className={`flex gap-6 border-b border-gray-200 mb-4 ${styles.noPrint}`}
          >
            {(["Direct Sales", "Cruise Operations", "Partner"] as const).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-medium transition-colors relative ${
                    activeTab === tab
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                  )}
                </button>
              ),
            )}
          </div>

          {/* Filters Section */}
          <div
            className={`bg-white rounded-xl border border-gray-200 p-4 mb-4 ${styles.noPrint}`}
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-3">
                {/* Date Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="DD/MM/YY"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="pl-4 pr-10 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-36"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>

                {/* Time Dropdown */}
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white pr-10 bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_16px] cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  }}
                >
                  <option>Any time</option>
                  <option>Morning (6-12)</option>
                  <option>Afternoon (12-18)</option>
                  <option>Evening (18-24)</option>
                </select>

                {/* Tour Zone Dropdown */}
                <select
                  value={selectedTourZone}
                  onChange={(e) => setSelectedTourZone(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white pr-10 bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_16px] cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  }}
                >
                  <option>Select tour zone</option>
                  <option>Lagoon Snorkeling</option>
                  <option>Island Hopping</option>
                  <option>City Tour</option>
                </select>

                {/* Sub-contractor Company Dropdown */}
                <select
                  value={selectedSubContractor}
                  onChange={(e) => setSelectedSubContractor(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white pr-10 bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_16px] cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  }}
                >
                  <option>Filter by sub-contractor</option>
                  <option>Primer Inc.</option>
                  <option>Larson & Larson</option>
                  <option>Mertz Group</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <button className="min-w-32 px-6 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors">
                  Apply filter
                </button>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className={`bg-white rounded-xl ${styles.printArea}`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Invoice No.
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Tour
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Departure From
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Tour Code
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Sub-contractor company
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Payment Invoice
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Voucher
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Total Cost (USD)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Total Profit (USD)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentData.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.invoiceNo}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.dateTime}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.tourSpots}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.departureFrom}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.tourCode}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.subContractor}
                      </td>

                      {/* Payment Invoice Cell */}
                      <td className="px-4 py-3 text-sm whitespace-nowrap">
                        {item.paymentInvoice ? (
                          <div
                            className="relative inline-block"
                            onMouseEnter={() =>
                              setHoveredFile({ id: item.id, type: "payment" })
                            }
                            onMouseLeave={() => setHoveredFile(null)}
                          >
                            <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors">
                              <FileText className="w-4 h-4" />
                              <span className="underline">
                                {item.paymentInvoice}
                              </span>
                            </button>
                            {hoveredFile?.id === item.id &&
                              hoveredFile?.type === "payment" && (
                                <div className="absolute left-0 top-full bg-white shadow-lg rounded-lg border border-gray-200 p-2 flex gap-2 z-10">
                                  <button
                                    onClick={() =>
                                      handleFileDownload(item.paymentInvoice!)
                                    }
                                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
                                  >
                                    <Download className="w-4 h-4" />
                                    Download
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleFileDelete(item.id, "payment")
                                    }
                                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                  </button>
                                </div>
                              )}
                          </div>
                        ) : (
                          <div>
                            <input
                              type="file"
                              ref={(el) => {
                                paymentFileInputRefs.current[item.id] = el;
                              }}
                              onChange={(e) =>
                                handleFileUpload(item.id, "payment", e)
                              }
                              className="hidden"
                              accept="image/*,.pdf"
                            />
                            <button
                              onClick={() =>
                                paymentFileInputRefs.current[item.id]?.click()
                              }
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
                            >
                              <Paperclip className="w-4 h-4" />
                              <span className="underline">Attach</span>
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Voucher Cell */}
                      <td className="px-4 py-3 text-sm whitespace-nowrap">
                        {item.voucher ? (
                          <div
                            className="relative inline-block"
                            onMouseEnter={() =>
                              setHoveredFile({ id: item.id, type: "voucher" })
                            }
                            onMouseLeave={() => setHoveredFile(null)}
                          >
                            <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors">
                              <FileText className="w-4 h-4" />
                              <span className="underline">{item.voucher}</span>
                            </button>
                            {hoveredFile?.id === item.id &&
                              hoveredFile?.type === "voucher" && (
                                <div className="absolute left-0 top-full bg-white shadow-lg rounded-lg border border-gray-200 p-2 flex gap-2 z-10">
                                  <button
                                    onClick={() =>
                                      handleFileDownload(item.voucher!)
                                    }
                                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
                                  >
                                    <Download className="w-4 h-4" />
                                    Download
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleFileDelete(item.id, "voucher")
                                    }
                                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                  </button>
                                </div>
                              )}
                          </div>
                        ) : (
                          <div>
                            <input
                              type="file"
                              ref={(el) => {
                                voucherFileInputRefs.current[item.id] = el;
                              }}
                              onChange={(e) =>
                                handleFileUpload(item.id, "voucher", e)
                              }
                              className="hidden"
                              accept="image/*,.pdf"
                            />
                            <button
                              onClick={() =>
                                voucherFileInputRefs.current[item.id]?.click()
                              }
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
                            >
                              <Paperclip className="w-4 h-4" />
                              <span className="underline">Attach</span>
                            </button>
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                        ${item.totalCost}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                        ${item.totalProfit.toLocaleString()}
                      </td>

                      {/* Status Cell with Dropdown */}
                      <td className="px-4 py-3 text-sm whitespace-nowrap">
                        <div className="relative inline-block">
                          <select
                            value={item.status}
                            onChange={(e) =>
                              handleStatusChange(
                                item.id,
                                e.target.value as "Paid" | "Pending",
                              )
                            }
                            className={`px-4 py-1.5 pr-8 rounded-full text-xs font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              item.status === "Paid"
                                ? "bg-green-100 text-green-700 border border-green-200"
                                : "bg-gray-100 text-gray-700 border border-gray-200"
                            }`}
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 0.5rem center",
                              backgroundSize: "12px 12px",
                            }}
                          >
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div
              className={`px-4 py-3 border-t border-gray-200 flex items-center justify-between bg-white ${styles.noPrint}`}
            >
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredData.length)} of{" "}
                {filteredData.length} entries
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
