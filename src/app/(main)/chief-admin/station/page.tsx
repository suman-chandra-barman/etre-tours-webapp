"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TourStatus = "Pre-departure" | "In-progress" | "Completed" | "Cancelled";
type FilterStatus =
  | "All"
  | "Awaiting departure"
  | "In-progress"
  | "Completed"
  | "Cancelled";

interface StationData {
  status: "Online" | "Offline";
  dateTime: string;
  tourSpots: string;
  departureFrom: string;
  tourCode: string;
  subContractor: string;
  totalPax: number;
  vehicleBoats: string;
  totalAmount: string;
  tourStatus: TourStatus;
}

const mockData: StationData[] = [
  {
    status: "Online",
    dateTime: "Feb 21, 2023 at 08:05 am",
    tourSpots: "Batarahlot, Baijanathpur",
    departureFrom: "Batarahlot, Baijanathpur",
    tourCode: "295A-6774-96A2-5338",
    subContractor: "Primer Inc.",
    totalPax: 426,
    vehicleBoats: "By vehicle",
    totalAmount: "$26,000",
    tourStatus: "Pre-departure",
  },
  {
    status: "Offline",
    dateTime: "Aug 3, 2023",
    tourSpots: "Bargachhi Chok, Biratnagar",
    departureFrom: "Bargachhi Chok, Biratnagar",
    tourCode: "DSWC-3F5C-4E8C-CZ58",
    subContractor: "Larson & Larson",
    totalPax: 447,
    vehicleBoats: "By vehicle",
    totalAmount: "$42,000",
    tourStatus: "In-progress",
  },
  {
    status: "Online",
    dateTime: "Mar 13, 2023 at 08:05 am",
    tourSpots: "Hospital chowk, Biratnagar",
    departureFrom: "Hospital chowk, Biratnagar",
    tourCode: "CFCA-3F50-E469-9E57",
    subContractor: "Mertz Group",
    totalPax: 600,
    vehicleBoats: "By vehicle",
    totalAmount: "$12,000",
    tourStatus: "Completed",
  },
  {
    status: "Online",
    dateTime: "Jan 1, 2023 at 01:49 pm",
    tourSpots: "Kanchanbari, Biratnagar",
    departureFrom: "Kanchanbari, Biratnagar",
    tourCode: "DSWC-3F5C-4E8C-CZ58",
    subContractor: "Wintheiser LLC",
    totalPax: 883,
    vehicleBoats: "By vehicle",
    totalAmount: "$00",
    tourStatus: "Cancelled",
  },
  {
    status: "Online",
    dateTime: "Jan 11, 2023 at 01:49 pm",
    tourSpots: "Hatikhola Chok, Biratnagar",
    departureFrom: "Hatikhola Chok, Biratnagar",
    tourCode: "CAAC-350C-4E8C-CZ58",
    subContractor: "Solenoid",
    totalPax: 154,
    vehicleBoats: "By vehicle",
    totalAmount: "$62,000",
    tourStatus: "In-progress",
  },
  {
    status: "Online",
    dateTime: "Mar 13, 2023 at 08:05 am",
    tourSpots: "Chadani Chok, Biratnagar",
    departureFrom: "Chadani Chok, Biratnagar",
    tourCode: "295A-6774-96A2-5338",
    subContractor: "Wiegand-Shields",
    totalPax: 536,
    vehicleBoats: "By vehicle",
    totalAmount: "$16,300",
    tourStatus: "In-progress",
  },
  {
    status: "Online",
    dateTime: "Aug 18, 2023 at 04:12 pm",
    tourSpots: "Rani, Biratnagar",
    departureFrom: "Rani, Biratnagar",
    tourCode: "CAAC-350C-4E8C-CZ58",
    subContractor: "Metaful",
    totalPax: 429,
    vehicleBoats: "By boat",
    totalAmount: "$17,000",
    tourStatus: "Completed",
  },
  {
    status: "Online",
    dateTime: "Oct 13, 2023 at 08:05 am",
    tourSpots: "Ghinaghat, Baijanathpur",
    departureFrom: "Ghinaghat, Baijanathpur",
    tourCode: "KDSS-2424-6565-HVIU",
    subContractor: "Batz Group",
    totalPax: 423,
    vehicleBoats: "By boat",
    totalAmount: "$65,000",
    tourStatus: "Completed",
  },
  {
    status: "Online",
    dateTime: "Jan 11, 2023 at 01:49 pm",
    tourSpots: "Jaynspal chowk, Biratnagar",
    departureFrom: "Jaynspal chowk, Biratnagar",
    tourCode: "295A-6774-96A2-5338",
    subContractor: "Performante",
    totalPax: 583,
    vehicleBoats: "By boat",
    totalAmount: "$21,000",
    tourStatus: "Completed",
  },
  {
    status: "Online",
    dateTime: "Jan 1, 2023 at 01:49 pm",
    tourSpots: "Kohobaranchok, Biratnagar",
    departureFrom: "Kohobaranchok, Biratnagar",
    tourCode: "KDSS-2424-6565-HVIU",
    subContractor: "TypeSafe",
    totalPax: 185,
    vehicleBoats: "By vehicle",
    totalAmount: "$21,000",
    tourStatus: "Completed",
  },
  {
    status: "Online",
    dateTime: "Nov 4, 2023 at 12:13 am",
    tourSpots: "Kohobara, Biratnagar",
    departureFrom: "Kohobara, Biratnagar",
    tourCode: "KDSS-2424-6565-HVIU",
    subContractor: "Advanta Inc.",
    totalPax: 196,
    vehicleBoats: "By vehicle",
    totalAmount: "$26,000",
    tourStatus: "Completed",
  },
  {
    status: "Online",
    dateTime: "Sep 4, 2021 at 12:14 am",
    tourSpots: "Bhattimad, Biratnagar",
    departureFrom: "Bhattimad, Biratnagar",
    tourCode: "CAAC-350C-4E8C-CZ58",
    subContractor: "Leannon and Sons",
    totalPax: 922,
    vehicleBoats: "By vehicle",
    totalAmount: "$57,000",
    tourStatus: "Completed",
  },
];

function StationPage() {
  const [activeTab, setActiveTab] = useState("direct-sales");
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("All");

  const getStatusColor = (status: TourStatus) => {
    switch (status) {
      case "Pre-departure":
        return "text-yellow-600";
      case "In-progress":
        return "text-green-600";
      case "Completed":
        return "text-gray-600";
      case "Cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const filteredData = mockData.filter((item) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Awaiting departure")
      return item.tourStatus === "Pre-departure";
    return item.tourStatus === activeFilter;
  });

  return (
    <main className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Stations</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="direct-sales">Direct Sales</TabsTrigger>
          <TabsTrigger value="cruise-operations">Cruise Operations</TabsTrigger>
          <TabsTrigger value="partner">Partner</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6 space-y-4">
          {/* Filter Buttons */}
          <div className="flex gap-2">
            <Button
              variant={activeFilter === "All" ? "default" : "outline"}
              onClick={() => setActiveFilter("All")}
              className="rounded-full"
            >
              All
            </Button>
            <Button
              variant={
                activeFilter === "Awaiting departure" ? "default" : "outline"
              }
              onClick={() => setActiveFilter("Awaiting departure")}
              className="rounded-full"
            >
              Awaiting departure
            </Button>
            <Button
              variant={activeFilter === "In-progress" ? "default" : "outline"}
              onClick={() => setActiveFilter("In-progress")}
              className="rounded-full"
            >
              In-progress
            </Button>
            <Button
              variant={activeFilter === "Completed" ? "default" : "outline"}
              onClick={() => setActiveFilter("Completed")}
              className="rounded-full"
            >
              Completed
            </Button>
            <Button
              variant={activeFilter === "Cancelled" ? "default" : "outline"}
              onClick={() => setActiveFilter("Cancelled")}
              className="rounded-full"
            >
              Cancelled
            </Button>
          </div>

          {/* Data Table */}
          <div className="rounded-lg border bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-700">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Date & Time
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Tour
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Departure From
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Tour Code
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Sub-contractor company
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Total Pax
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Vehicle/Boats
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Total Amount
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Tour Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((row, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            row.status === "Online"
                              ? "bg-green-500"
                              : "bg-gray-400"
                          }`}
                        />
                        <span className="text-sm">{row.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {row.dateTime}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {row.tourSpots}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {row.departureFrom}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {row.tourCode}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {row.subContractor}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {row.totalPax}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {row.vehicleBoats}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {row.tourStatus === "Cancelled" ? (
                        <span className="text-red-600">{row.totalAmount}</span>
                      ) : (
                        row.totalAmount
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`text-sm font-medium ${getStatusColor(row.tourStatus)}`}
                      >
                        {row.tourStatus}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default StationPage;
