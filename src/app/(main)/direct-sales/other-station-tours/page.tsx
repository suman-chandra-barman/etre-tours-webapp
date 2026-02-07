"use client";

import { useState } from "react";
import { TourHistoryItem, TourTabType } from "@/types/tours.types";
import { ToursHeader } from "@/components/Tours/ToursHeader";
import { SearchWithTabs } from "@/components/Tours/SearchWithTabs";
import { ToursFilter } from "@/components/Tours/ToursFilter";
import { ToursTable } from "@/components/Tables/ToursTable";

// Mock data based on the design image
const mockHistoryData: TourHistoryItem[] = [
  {
    id: 1,
    dateTime: "Feb 21, 2023 at 03:05 pm",
    returnTime: "Feb 21, 2023 at 06:30 pm",
    tour: "Ghinaghat, Baijanathpur",
    tourCode: "295A-6774-9EA2-5338",
    subContractor: "Primer Inc.",
    totalPax: 426,
    totalSets: 2,
    vacancy: 0,
    driver: "John Smith",
    allTransport: "2 Vehicle",
    guide: "Sarah Johnson",
    tourStatus: "Pre-departure",
  },
  {
    id: 2,
    dateTime: "Aug 3, 2023 at 12:10 am",
    returnTime: "Aug 3, 2023 at 05:45 am",
    tour: "Bargachhi Chok, Biratnagar",
    tourCode: "D5WC-3F5C-4E6C-C258",
    subContractor: "Larson & Larson",
    totalPax: 447,
    totalSets: 3,
    vacancy: 0,
    driver: "Mike Davis",
    allTransport: "3 Vehicle",
    guide: "Emily Chen",
    tourStatus: "In-progress",
  },
  {
    id: 3,
    dateTime: "Mar 13, 2023 at 08:05 am",
    returnTime: "Mar 13, 2023 at 02:30 pm",
    tour: "Hospital chowk, Biratnagar",
    tourCode: "CFCA-3F50-E459-9E57",
    subContractor: "Mertz Group",
    totalPax: 600,
    totalSets: 4,
    vacancy: 0,
    driver: "Robert Wilson",
    allTransport: "4 Vehicle",
    guide: "Lisa Anderson",
    tourStatus: "Completed",
  },
  {
    id: 4,
    dateTime: "Jan 1, 2023 at 01:49 pm",
    returnTime: "Jan 1, 2023 at 07:15 pm",
    tour: "Kanchanbari, Biratnagar",
    tourCode: "D5WC-3F5C-4E6C-C258",
    subContractor: "Wintheiser LLC",
    totalPax: 883,
    totalSets: 5,
    vacancy: 0,
    driver: "James Brown",
    allTransport: "5 Vehicle",
    guide: "Maria Garcia",
    tourStatus: "Cancelled",
    note: "A demo note for cancelled tour to show the note field in the table. This is just a sample note. lorem500 ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 5,
    dateTime: "Jan 11, 2023 at 01:49 pm",
    returnTime: "Jan 11, 2023 at 05:20 pm",
    tour: "Hatkhola Chok, Biratnagar",
    tourCode: "CAAC-3SDC-4E6C-C258",
    subContractor: "Solenoid",
    totalPax: 154,
    totalSets: 2,
    vacancy: 0,
    driver: "David Lee",
    allTransport: "2 Vehicle",
    guide: "Anna Martinez",
    tourStatus: "In-progress",
  },
  {
    id: 6,
    dateTime: "Mar 13, 2023 at 08:05 am",
    returnTime: "Mar 13, 2023 at 01:45 pm",
    tour: "Chadani Chok, Biratnagar",
    tourCode: "295A-6774-9EA2-5338",
    subContractor: "Wiegand-Shields",
    totalPax: 536,
    totalSets: 2,
    vacancy: 0,
    driver: "Tom Harris",
    allTransport: "2 Vehicle",
    guide: "Jessica White",
    tourStatus: "In-progress",
  },
  {
    id: 7,
    dateTime: "Aug 18, 2023 at 04:12 pm",
    returnTime: "Aug 18, 2023 at 08:45 pm",
    tour: "Rani, Biratnagar",
    tourCode: "CAAC-3SDC-4E6C-C258",
    subContractor: "Metaful",
    totalPax: 429,
    totalSets: 2,
    vacancy: 0,
    driver: "Chris Taylor",
    allTransport: "6 Boats",
    guide: "Rachel Moore",
    tourStatus: "Completed",
  },
  {
    id: 8,
    dateTime: "Oct 13, 2023 at 08:05 am",
    returnTime: "Oct 13, 2023 at 02:30 pm",
    tour: "Ghinaghat, Baijanathpur",
    tourCode: "KDSS-2424-6565-HYJU",
    subContractor: "Batz Group",
    totalPax: 423,
    totalSets: 4,
    vacancy: 0,
    driver: "Mark Thompson",
    allTransport: "4 Boats",
    guide: "Susan Clark",
    tourStatus: "Completed",
  },
  {
    id: 9,
    dateTime: "Jan 11, 2023 at 01:49 pm",
    returnTime: "Jan 11, 2023 at 06:15 pm",
    tour: "Jaynepal chowk, Biratnagar",
    tourCode: "295A-6774-9EA2-5338",
    subContractor: "Performante",
    totalPax: 583,
    totalSets: 3,
    vacancy: 0,
    driver: "Kevin Martinez",
    allTransport: "3 Boats",
    guide: "Laura Robinson",
    tourStatus: "Completed",
  },
  {
    id: 10,
    dateTime: "Jan 1, 2023 at 01:49 pm",
    returnTime: "Jan 1, 2023 at 05:30 pm",
    tour: "Kohobarachok, Biratnagar",
    tourCode: "KDSS-2424-6565-HYJU",
    subContractor: "TypeSafe",
    totalPax: 185,
    totalSets: 2,
    vacancy: 0,
    driver: "Brian Walker",
    allTransport: "2 Vehicle",
    guide: "Michelle Hall",
    tourStatus: "Completed",
  },
  {
    id: 11,
    dateTime: "Nov 4, 2023 at 12:13 am",
    returnTime: "Nov 4, 2023 at 04:45 am",
    tour: "Kohobara, Biratnagar",
    tourCode: "KDSS-2424-6565-HYJU",
    subContractor: "Advanta Inc.",
    totalPax: 196,
    totalSets: 2,
    vacancy: 0,
    driver: "Steven Young",
    allTransport: "2 Vehicle",
    guide: "Karen King",
    tourStatus: "Completed",
  },
];

export default function OtherStationToursPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTourZone, setSelectedTourZone] = useState("");
  const [selectedSubContractor, setSelectedSubContractor] = useState("");
  const [activeTab, setActiveTab] = useState<TourTabType>("Cruise Sales");
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

  const handleApplyFilter = () => {
    // Add filter logic here
    console.log("Applying filters...");
  };

  const handleRowClick = (item: TourHistoryItem) => {
    // Handle row click
    console.log("Clicked tour:", item);
  };

  const tabs: readonly TourTabType[] = ["Cruise Sales", "Partner Sales"];

  return (
    <div className="flex flex-col bg-gray-50 overflow-y-auto">
      <div className="flex-1">
        <div className="p-6">
          <ToursHeader title="Other Station Tours" />

          <SearchWithTabs
            searchQuery={searchQuery}
            activeTab={activeTab}
            tabs={tabs}
            onSearchChange={setSearchQuery}
            onTabChange={setActiveTab}
          />

          <ToursFilter
            selectedDate={selectedDate}
            selectedTourZone={selectedTourZone}
            selectedSubContractor={selectedSubContractor}
            onDateChange={setSelectedDate}
            onTourZoneChange={setSelectedTourZone}
            onSubContractorChange={setSelectedSubContractor}
            onApplyFilter={handleApplyFilter}
            onPrint={handlePrint}
          />

          <ToursTable
            data={currentData}
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={filteredData.length}
            onPageChange={setCurrentPage}
            onRowClick={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
}
