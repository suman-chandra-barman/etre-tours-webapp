"use client";

import { useState } from "react";
import { Calendar, Search, Printer } from "lucide-react";
import styles from "@/components/styles/Print.module.css";
import { Pagination } from "@/components/ui/pagination";

interface TourHistoryItem {
  id: number;
  dateTime: string;
  tour: string;
  tourCode: string;
  subContractor: string;
  totalPax: number;
  totalSets: number;
  vacancy: number;
  allTransport: string;
  tourStatus: "Pre-departure" | "In-progress" | "Completed" | "Cancelled";
  note?: string;
}

// Mock data based on the design image
const mockHistoryData: TourHistoryItem[] = [
  {
    id: 1,
    dateTime: "Feb 21, 2023 at 03:05 pm",
    tour: "Ghinaghat, Baijanathpur",
    tourCode: "295A-6774-9EA2-5338",
    subContractor: "Primer Inc.",
    totalPax: 426,
    totalSets: 2,
    vacancy: 0,
    allTransport: "2 Vehicle",
    tourStatus: "Pre-departure",
  },
  {
    id: 2,
    dateTime: "Aug 3, 2023 at 12:10 am",
    tour: "Bargachhi Chok, Biratnagar",
    tourCode: "D5WC-3F5C-4E6C-C258",
    subContractor: "Larson & Larson",
    totalPax: 447,
    totalSets: 3,
    vacancy: 0,
    allTransport: "3 Vehicle",
    tourStatus: "In-progress",
  },
  {
    id: 3,
    dateTime: "Mar 13, 2023 at 08:05 am",
    tour: "Hospital chowk, Biratnagar",
    tourCode: "CFCA-3F50-E459-9E57",
    subContractor: "Mertz Group",
    totalPax: 600,
    totalSets: 4,
    vacancy: 0,
    allTransport: "4 Vehicle",
    tourStatus: "Completed",
  },
  {
    id: 4,
    dateTime: "Jan 1, 2023 at 01:49 pm",
    tour: "Kanchanbari, Biratnagar",
    tourCode: "D5WC-3F5C-4E6C-C258",
    subContractor: "Wintheiser LLC",
    totalPax: 883,
    totalSets: 5,
    vacancy: 0,
    allTransport: "5 Vehicle",
    tourStatus: "Cancelled",
    note: "A demo note...",
  },
  {
    id: 5,
    dateTime: "Jan 11, 2023 at 01:49 pm",
    tour: "Hatkhola Chok, Biratnagar",
    tourCode: "CAAC-3SDC-4E6C-C258",
    subContractor: "Solenoid",
    totalPax: 154,
    totalSets: 2,
    vacancy: 0,
    allTransport: "2 Vehicle",
    tourStatus: "In-progress",
  },
  {
    id: 6,
    dateTime: "Mar 13, 2023 at 08:05 am",
    tour: "Chadani Chok, Biratnagar",
    tourCode: "295A-6774-9EA2-5338",
    subContractor: "Wiegand-Shields",
    totalPax: 536,
    totalSets: 2,
    vacancy: 0,
    allTransport: "2 Vehicle",
    tourStatus: "In-progress",
  },
  {
    id: 7,
    dateTime: "Aug 18, 2023 at 04:12 pm",
    tour: "Rani, Biratnagar",
    tourCode: "CAAC-3SDC-4E6C-C258",
    subContractor: "Metaful",
    totalPax: 429,
    totalSets: 2,
    vacancy: 0,
    allTransport: "6 Boats",
    tourStatus: "Completed",
  },
  {
    id: 8,
    dateTime: "Oct 13, 2023 at 08:05 am",
    tour: "Ghinaghat, Baijanathpur",
    tourCode: "KDSS-2424-6565-HYJU",
    subContractor: "Batz Group",
    totalPax: 423,
    totalSets: 4,
    vacancy: 0,
    allTransport: "4 Boats",
    tourStatus: "Completed",
  },
  {
    id: 9,
    dateTime: "Jan 11, 2023 at 01:49 pm",
    tour: "Jaynepal chowk, Biratnagar",
    tourCode: "295A-6774-9EA2-5338",
    subContractor: "Performante",
    totalPax: 583,
    totalSets: 3,
    vacancy: 0,
    allTransport: "3 Boats",
    tourStatus: "Completed",
  },
  {
    id: 10,
    dateTime: "Jan 1, 2023 at 01:49 pm",
    tour: "Kohobarachok, Biratnagar",
    tourCode: "KDSS-2424-6565-HYJU",
    subContractor: "TypeSafe",
    totalPax: 185,
    totalSets: 2,
    vacancy: 0,
    allTransport: "2 Vehicle",
    tourStatus: "Completed",
  },
  {
    id: 11,
    dateTime: "Nov 4, 2023 at 12:13 am",
    tour: "Kohobara, Biratnagar",
    tourCode: "KDSS-2424-6565-HYJU",
    subContractor: "Advanta Inc.",
    totalPax: 196,
    totalSets: 2,
    vacancy: 0,
    allTransport: "2 Vehicle",
    tourStatus: "Completed",
  },
];

export default function ToursPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("Any time");
  const [selectedTourZone, setSelectedTourZone] = useState("Select tour zone");
  const [selectedSubContractor, setSelectedSubContractor] = useState(
    "Filter by Sub-contractor company",
  );
  const [activeTab, setActiveTab] = useState<"Direct Sales" | "Partner Sales">(
    "Direct Sales",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = mockHistoryData;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePrint = () => {
    window.print();
  };

  const getStatusStyles = (status: TourHistoryItem["tourStatus"]): string => {
    switch (status) {
      case "Pre-departure":
        return "bg-yellow-100 text-yellow-700";
      case "In-progress":
        return "bg-green-100 text-green-700";
      case "Completed":
        return "bg-gray-100 text-gray-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
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
                Tours
              </h1>
            </div>
          </div>

          <div className={`flex items-center gap-4 mb-4 ${styles.noPrint}`}>
            {/* Search Bar */}
            <div className="relative min-w-100">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {/* Tabs Section */}
            <div className="flex gap-6 border-b border-gray-200">
              {(["Direct Sales", "Partner Sales"] as const).map((tab) => (
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
              ))}
            </div>
          </div>

          {/* Filters Section */}
          <div
            className={`bg-white rounded-xl border border-gray-200 p-4 mb-4 ${styles.noPrint}`}
          >
            <div className="flex justify-between  mb-4">
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
                  <option>Filter by Sub-contractor company</option>
                  <option>Primer Inc.</option>
                  <option>Larson & Larson</option>
                  <option>Mertz Group</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                {/* Apply Filter Button */}
                <button className="min-w-32 px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                  Apply filter
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Print
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
                      Date & Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Tour
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Tour Code
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Sub-contractor company
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Total Pax
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Total Sets
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Vacancy
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      All Transport
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Tour Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Note
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentData.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.dateTime}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.tour}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.tourCode}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.subContractor}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap text-center">
                        {item.totalPax}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.totalSets}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.vacancy}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {item.allTransport}
                      </td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(
                            item.tourStatus,
                          )}`}
                        >
                          {item.tourStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.note && (
                          <span className="text-blue-600">{item.note}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              startIndex={startIndex}
              endIndex={endIndex}
              totalItems={filteredData.length}
              className={styles.noPrint}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
