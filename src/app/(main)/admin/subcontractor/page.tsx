"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Plus, FileText } from "lucide-react";
import ViewSubContractorModal from "@/components/Modals/ViewSubContractorModal";
import AddSubContractorModal from "@/components/Modals/AddSubContractorModal";

// Sample data - replace with actual data from API
const subContractors = [
  {
    id: "1",
    slNo: "#1",
    companyName: "Primer Inc.",
    logo: "",
    email: "curtis.weaver@example.com",
    phoneNumber: "(319) 555-0115",
    numOfVehicle: "2 Vehicle",
    numOfBoats: "5 Boats",
    representerName: "Curtis Weaver",
    designation: "Manager",
    streetAddress: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    contactNumber: "(319) 555-0115",
    vehicles: [
      {
        operatorName: "John Smith",
        driverName: "Mike Driver",
        guideName: "Tom Guide",
        numberOfSeats: 45,
        registerNumber: "55gfGH898F",
      },
      {
        operatorName: "Jane Doe",
        driverName: "Sarah Driver",
        guideName: "Lisa Guide",
        numberOfSeats: 32,
        registerNumber: "66hfJK909G",
      },
    ],
    boats: [
      {
        operatorName: "Bob Captain",
        driverName: "Jack Sailor",
        guideName: "Emma Guide",
        numberOfSeats: 20,
        registerNumber: "BOAT123",
      },
    ],
  },
  {
    id: "2",
    slNo: "#2",
    companyName: "Larson & Larson",
    logo: "",
    email: "felicia.reid@example.com",
    phoneNumber: "(302) 555-0107",
    numOfVehicle: "3 Vehicle",
    numOfBoats: "3 Boats",
    representerName: "Felicia Reid",
    designation: "CEO",
    streetAddress: "456 Oak Ave",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90001",
    contactNumber: "(302) 555-0107",
    vehicles: [
      {
        operatorName: "Alice Brown",
        driverName: "Charlie Driver",
        guideName: "David Guide",
        numberOfSeats: 50,
        registerNumber: "77ggKL010H",
      },
    ],
    boats: [
      {
        operatorName: "Steve Captain",
        driverName: "Paul Sailor",
        guideName: "Mary Guide",
        numberOfSeats: 25,
        registerNumber: "BOAT456",
      },
    ],
  },
  {
    id: "3",
    slNo: "#3",
    companyName: "Mertz Group",
    logo: "",
    email: "sara.cruz@example.com",
    phoneNumber: "(225) 555-0118",
    numOfVehicle: "4 Vehicle",
    numOfBoats: "2 Boats",
    representerName: "Sara Cruz",
    designation: "Director",
    streetAddress: "789 Pine Rd",
    city: "Chicago",
    state: "IL",
    zipCode: "60601",
    contactNumber: "(225) 555-0118",
    vehicles: [
      {
        operatorName: "Robert Johnson",
        driverName: "Frank Driver",
        guideName: "Nancy Guide",
        numberOfSeats: 40,
        registerNumber: "88hhMN011I",
      },
    ],
    boats: [
      {
        operatorName: "Dan Captain",
        driverName: "Kevin Sailor",
        guideName: "Sophie Guide",
        numberOfSeats: 18,
        registerNumber: "BOAT789",
      },
    ],
  },
  {
    id: "4",
    slNo: "#4",
    companyName: "Wintheiser LLC",
    logo: "",
    email: "michelle.rivera@example.com",
    phoneNumber: "(405) 555-0128",
    numOfVehicle: "5 Vehicle",
    numOfBoats: "5 Boats",
    representerName: "Michelle Rivera",
    designation: "Operations Manager",
    streetAddress: "321 Elm St",
    city: "Houston",
    state: "TX",
    zipCode: "77001",
    contactNumber: "(405) 555-0128",
    vehicles: [
      {
        operatorName: "William Davis",
        driverName: "George Driver",
        guideName: "Helen Guide",
        numberOfSeats: 55,
        registerNumber: "99iiOP012J",
      },
    ],
    boats: [
      {
        operatorName: "Chris Captain",
        driverName: "Andrew Sailor",
        guideName: "Rachel Guide",
        numberOfSeats: 22,
        registerNumber: "BOAT101",
      },
    ],
  },
  {
    id: "5",
    slNo: "#5",
    companyName: "Solenoid",
    logo: "",
    email: "jessica.hanson@example.com",
    phoneNumber: "(671) 555-0110",
    numOfVehicle: "2 Vehicle",
    numOfBoats: "2 Boats",
    representerName: "Jessica Hanson",
    designation: "VP Operations",
    streetAddress: "654 Maple Dr",
    city: "Phoenix",
    state: "AZ",
    zipCode: "85001",
    contactNumber: "(671) 555-0110",
    vehicles: [
      {
        operatorName: "James Wilson",
        driverName: "Henry Driver",
        guideName: "Patricia Guide",
        numberOfSeats: 38,
        registerNumber: "00jjQR013K",
      },
    ],
    boats: [
      {
        operatorName: "Peter Captain",
        driverName: "Mark Sailor",
        guideName: "Jennifer Guide",
        numberOfSeats: 15,
        registerNumber: "BOAT202",
      },
    ],
  },
  {
    id: "6",
    slNo: "#6",
    companyName: "Wiegand-Shields",
    logo: "",
    email: "michael.mitc@example.com",
    phoneNumber: "(629) 555-0129",
    numOfVehicle: "2 Vehicle",
    numOfBoats: "2 Boats",
    representerName: "Michael Mitchell",
    designation: "General Manager",
    streetAddress: "987 Cedar Ln",
    city: "Philadelphia",
    state: "PA",
    zipCode: "19101",
    contactNumber: "(629) 555-0129",
    vehicles: [
      {
        operatorName: "Linda Martinez",
        driverName: "Joseph Driver",
        guideName: "Barbara Guide",
        numberOfSeats: 42,
        registerNumber: "11kkST014L",
      },
    ],
    boats: [
      {
        operatorName: "Anthony Captain",
        driverName: "Brian Sailor",
        guideName: "Susan Guide",
        numberOfSeats: 19,
        registerNumber: "BOAT303",
      },
    ],
  },
  {
    id: "7",
    slNo: "#7",
    companyName: "Metaful",
    logo: "",
    email: "bill.sanders@example.com",
    phoneNumber: "(907) 555-0101",
    numOfVehicle: "6 Vehicle",
    numOfBoats: "6 Boats",
    representerName: "Bill Sanders",
    designation: "Chief Operations",
    streetAddress: "147 Birch Ave",
    city: "San Antonio",
    state: "TX",
    zipCode: "78201",
    contactNumber: "(907) 555-0101",
    vehicles: [
      {
        operatorName: "Karen Anderson",
        driverName: "Thomas Driver",
        guideName: "Jessica Guide",
        numberOfSeats: 48,
        registerNumber: "22llUV015M",
      },
    ],
    boats: [
      {
        operatorName: "Matthew Captain",
        driverName: "Christopher Sailor",
        guideName: "Ashley Guide",
        numberOfSeats: 24,
        registerNumber: "BOAT404",
      },
    ],
  },
];

function SubContractorPage() {
  const [selectedSubContractor, setSelectedSubContractor] = useState<
    (typeof subContractors)[0] | null
  >(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleViewDetails = (subContractor: (typeof subContractors)[0]) => {
    setSelectedSubContractor(subContractor);
    setIsViewModalOpen(true);
  };

  return (
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Sub-contractor Companies
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side - Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-700">
                    SL No
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Sub-contractor company
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Email
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Phone Number
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Num. of Vehicle
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Num. of Boats
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subContractors.map((contractor) => (
                  <TableRow key={contractor.id}>
                    <TableCell className="font-medium">
                      {contractor.slNo}
                    </TableCell>
                    <TableCell>{contractor.companyName}</TableCell>
                    <TableCell className="text-gray-600">
                      {contractor.email}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {contractor.phoneNumber}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {contractor.numOfVehicle}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {contractor.numOfBoats}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleViewDetails(contractor)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Right side - Empty state */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-8 flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-center mb-6">
              Tap any row to view sub-contractor companies details
            </p>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add a new sub-contractor company
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ViewSubContractorModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        subContractor={selectedSubContractor}
      />

      <AddSubContractorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </main>
  );
}

export default SubContractorPage;
