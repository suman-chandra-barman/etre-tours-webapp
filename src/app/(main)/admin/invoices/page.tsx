"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "@/components/styles/Print.module.css";

interface InvoiceItem {
  id: number;
  invoiceNo: string;
  contractor: string;
  amount: number;
  status: "Paid" | "Pending";
}

// Mock data based on the design image
const mockInvoiceData: InvoiceItem[] = [
  {
    id: 1,
    invoiceNo: "INV 23",
    contractor: "John Doe",
    amount: 26000,
    status: "Paid",
  },
  {
    id: 2,
    invoiceNo: "INV 13",
    contractor: "Jane Smith",
    amount: 37000,
    status: "Pending",
  },
  {
    id: 3,
    invoiceNo: "INV 15",
    contractor: "Acme Corp",
    amount: 33000,
    status: "Paid",
  },
  {
    id: 4,
    invoiceNo: "INV 78",
    contractor: "John Doe",
    amount: 42000,
    status: "Paid",
  },
  {
    id: 5,
    invoiceNo: "INV 25",
    contractor: "Jane Smith",
    amount: 42000,
    status: "Pending",
  },
  {
    id: 6,
    invoiceNo: "INV 28",
    contractor: "Acme Corp",
    amount: 74000,
    status: "Paid",
  },
  {
    id: 7,
    invoiceNo: "INV 64",
    contractor: "John Doe",
    amount: 17000,
    status: "Paid",
  },
  {
    id: 8,
    invoiceNo: "INV 15",
    contractor: "Jane Smith",
    amount: 16300,
    status: "Pending",
  }
];

export default function FinancePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContractor, setSelectedContractor] = useState("Select contractor");
  const [activeTab, setActiveTab] = useState<
    "Direct Sales" | "Cruise Operations" | "Partner"
  >("Direct Sales");
  const [currentPage, setCurrentPage] = useState(1);
  const [invoices, setInvoices] = useState<InvoiceItem[]>(mockInvoiceData);

  const itemsPerPage = 10;

  const filteredData = invoices;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

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
            <h1 className="text-2xl lg:text-3xl font-bold">Invoices</h1>
          </div>

          <div className={`flex items-center gap-4 mb-4 ${styles.noPrint}`}>
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by invoice no."
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
                {/* Contractor Dropdown */}
                <select
                  value={selectedContractor}
                  onChange={(e) => setSelectedContractor(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white pr-10 bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_16px] cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  }}
                >
                  <option>Select contractor</option>
                  <option>Lagoon Snorkeling</option>
                  <option>Island Hopping</option>
                  <option>City Tour</option>
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
                      Contractor
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Amount
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
                        {item.contractor}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        ${item.amount.toLocaleString()}
                      </td>

                      {/* Status Cell: Paid is locked, Pending can be marked as Paid */}
                      <td className="px-4 py-3 text-sm whitespace-nowrap">
                        {item.status === "Paid" ? (
                          <span className="inline-flex px-4 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                            Paid
                          </span>
                        ) : (
                          <button
                            onClick={() => handleStatusChange(item.id, "Paid")}
                            className="inline-flex px-4 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
                          >
                            Mark as Paid
                          </button>
                        )}
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
