"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Edit2,
  Trash2,
  FileImage,
  User,
  MailIcon,
  PhoneIcon,
  LocateIcon,
} from "lucide-react";
import { AddDriverGuideModal } from "@/components/Modals/AddDriverGuideModal";

interface DriverGuide {
  id: string;
  slNo: string;
  name: string;
  phoneNumber: string;
  transportType: "Vehicle" | "Boat";
  licenseNo: string;
  address: string;
  email: string;
}

// Sample driver data
const initialDrivers: DriverGuide[] = [
  {
    id: "1",
    slNo: "#1",
    name: "Primer Inc.",
    phoneNumber: "(319) 555-0115",
    transportType: "Vehicle",
    licenseNo: "AMNA443469QQ62",
    address: "3891 Ranchview Dr. Richardson",
    email: "primer@example.com",
  },
  {
    id: "2",
    slNo: "#2",
    name: "Larson & Larson",
    phoneNumber: "(302) 555-0107",
    transportType: "Vehicle",
    licenseNo: "WWWVE677712P83",
    address: "2464 Royal Ln. Mesa",
    email: "larson@example.com",
  },
  {
    id: "3",
    slNo: "#3",
    name: "Mertz Group",
    phoneNumber: "(229) 555-0118",
    transportType: "Vehicle",
    licenseNo: "FQBFH39263JX08",
    address: "3517 W. Gray St. Utica",
    email: "mertz@example.com",
  },
  {
    id: "4",
    slNo: "#4",
    name: "Winthelser LLC",
    phoneNumber: "(406) 555-0128",
    transportType: "Boat",
    licenseNo: "QCIXIZ028007FX33",
    address: "8502 Preston Rd. Ingewood",
    email: "winthelser@example.com",
  },
  {
    id: "5",
    slNo: "#5",
    name: "Solenoid",
    phoneNumber: "(671) 555-0110",
    transportType: "Boat",
    licenseNo: "WCUXN1474BWORI0",
    address: "2972 Westheimer Rd. Santa Ana",
    email: "solenoid@example.com",
  },
  {
    id: "6",
    slNo: "#6",
    name: "Wingeund Shields",
    phoneNumber: "(629) 555-0129",
    transportType: "Boat",
    licenseNo: "STGVP05824RI60",
    address: "6391 Elgin St. Celina",
    email: "wingeund@example.com",
  },
  {
    id: "7",
    slNo: "#7",
    name: "Moteful",
    phoneNumber: "(907) 555-0101",
    transportType: "Boat",
    licenseNo: "WVQDR196E3GZB6",
    address: "4140 Parker Rd. Allentown",
    email: "moteful@example.com",
  },
];

// Sample guide data
const initialGuides: DriverGuide[] = [
  {
    id: "1",
    slNo: "#1",
    name: "Robert Fox",
    phoneNumber: "(319) 555-0115",
    transportType: "Vehicle",
    licenseNo: "AMNA443469QQ62",
    address: "3891 Ranchview Dr. Richardson",
    email: "robert.fox@example.com",
  },
  {
    id: "2",
    slNo: "#2",
    name: "Jerome Bell",
    phoneNumber: "(302) 555-0107",
    transportType: "Vehicle",
    licenseNo: "WWWVE677712P83",
    address: "2464 Royal Ln. Mesa",
    email: "fiona.reid@example.com",
  },
  {
    id: "3",
    slNo: "#3",
    name: "Jane Cooper",
    phoneNumber: "(229) 555-0118",
    transportType: "Vehicle",
    licenseNo: "FQBFH39263JX08",
    address: "3517 W. Gray St. Utica",
    email: "jane.cooper@example.com",
  },
  {
    id: "4",
    slNo: "#4",
    name: "Ralph Edwards",
    phoneNumber: "(406) 555-0128",
    transportType: "Boat",
    licenseNo: "QCIXIZ028007FX33",
    address: "8502 Preston Rd. Ingewood",
    email: "ralph.edwards@example.com",
  },
  {
    id: "5",
    slNo: "#5",
    name: "Leslie Alexander",
    phoneNumber: "(671) 555-0110",
    transportType: "Boat",
    licenseNo: "WCUXN1474BWORI0",
    address: "2972 Westheimer Rd. Santa Ana",
    email: "leslie@example.com",
  },
  {
    id: "6",
    slNo: "#6",
    name: "Eleanor Pena",
    phoneNumber: "(629) 555-0129",
    transportType: "Boat",
    licenseNo: "STGVP05824RI60",
    address: "6391 Elgin St. Celina",
    email: "eleanor@example.com",
  },
  {
    id: "7",
    slNo: "#7",
    name: "Ronald Richards",
    phoneNumber: "(907) 555-0101",
    transportType: "Boat",
    licenseNo: "WVQDR196E3GZB6",
    address: "4140 Parker Rd. Allentown",
    email: "ronald@example.com",
  },
];

export default function DriversPage() {
  const [drivers, setDrivers] = useState<DriverGuide[]>(initialDrivers);
  const [guides, setGuides] = useState<DriverGuide[]>(initialGuides);
  const [selectedItem, setSelectedItem] = useState<DriverGuide | null>(null);
  const [activeTab, setActiveTab] = useState<"driver" | "guide">("driver");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"driver" | "guide">("driver");
  const [transportFilter, setTransportFilter] = useState<
    "all" | "Vehicle" | "Boat"
  >("all");

  // Filter data based on transport type
  const filteredDrivers =
    transportFilter === "all"
      ? drivers
      : drivers.filter((d) => d.transportType === transportFilter);

  const filteredGuides =
    transportFilter === "all"
      ? guides
      : guides.filter((g) => g.transportType === transportFilter);

  const handleAddClick = (type: "driver" | "guide") => {
    setModalType(type);
    setIsAddModalOpen(true);
  };

  const handleAddConfirm = (data: {
    name: string;
    licenseNo: string;
    email: string;
    phoneNumber: string;
    streetAddress: string;
    city: string;
    zipCode: string;
    transportType: string;
  }) => {
    const newItem: DriverGuide = {
      id: Date.now().toString(),
      slNo: `#${(activeTab === "driver" ? drivers : guides).length + 1}`,
      name: data.name,
      phoneNumber: data.phoneNumber,
      transportType: data.transportType === "vehicle" ? "Vehicle" : "Boat",
      licenseNo: data.licenseNo,
      address: `${data.streetAddress}, ${data.city}, ${data.zipCode}`,
      email: data.email,
    };

    if (activeTab === "driver") {
      setDrivers([...drivers, newItem]);
    } else {
      setGuides([...guides, newItem]);
    }
  };

  const handleEditConfirm = (data: {
    name: string;
    licenseNo: string;
    email: string;
    phoneNumber: string;
    streetAddress: string;
    city: string;
    zipCode: string;
    transportType: string;
  }) => {
    if (!selectedItem) return;

    const updatedItem: DriverGuide = {
      ...selectedItem,
      name: data.name,
      phoneNumber: data.phoneNumber,
      transportType: data.transportType === "vehicle" ? "Vehicle" : "Boat",
      licenseNo: data.licenseNo,
      address: `${data.streetAddress}, ${data.city}, ${data.zipCode}`,
      email: data.email,
    };

    if (activeTab === "driver") {
      setDrivers(
        drivers.map((d) => (d.id === selectedItem.id ? updatedItem : d)),
      );
    } else {
      setGuides(
        guides.map((g) => (g.id === selectedItem.id ? updatedItem : g)),
      );
    }

    setSelectedItem(updatedItem);
  };

  const handleRowClick = (item: DriverGuide) => {
    setSelectedItem(item);
  };

  const handleEdit = () => {
    if (selectedItem) {
      setIsEditModalOpen(true);
    }
  };

  const handleDelete = () => {
    if (
      selectedItem &&
      window.confirm(`Are you sure you want to delete ${selectedItem.name}?`)
    ) {
      if (activeTab === "driver") {
        setDrivers(drivers.filter((d) => d.id !== selectedItem.id));
      } else {
        setGuides(guides.filter((g) => g.id !== selectedItem.id));
      }
      setSelectedItem(null);
    }
  };

  return (
    <main className="p-6">
      <div className="flex gap-6">
        {/* Left Section - Table */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h1 className="text-xl font-semibold text-gray-900 mb-6">
              Manage your Drivers & Guides
            </h1>

            <Tabs
              value={activeTab}
              onValueChange={(value) => {
                setActiveTab(value as "driver" | "guide");
                setSelectedItem(null);
              }}
              className="w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="driver">Driver</TabsTrigger>
                  <TabsTrigger value="guide">Guides</TabsTrigger>
                </TabsList>

                <Button
                  onClick={() => handleAddClick(activeTab)}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add {activeTab === "driver" ? "driver" : "guide"}
                </Button>
              </div>

              {/* ------------------- Driver -------------------- */}
              <TabsContent value="driver" className="mt-0">
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-medium text-gray-700">
                          SL No
                        </TableHead>
                        <TableHead className="font-medium text-gray-700">
                          Name
                        </TableHead>
                        <TableHead className="font-medium text-gray-700">
                          Phone Number
                        </TableHead>
                        <TableHead className="font-medium text-gray-700">
                          <select
                            value={transportFilter}
                            onChange={(e) =>
                              setTransportFilter(
                                e.target.value as "all" | "Vehicle" | "Boat",
                              )
                            }
                            className="border border-gray-300 rounded px-2 py-1 text-sm bg-white cursor-pointer"
                          >
                            <option value="all">All Transport</option>
                            <option value="Vehicle">Vehicle</option>
                            <option value="Boat">Boat</option>
                          </select>
                        </TableHead>
                        <TableHead className="font-medium text-gray-700">
                          Licence
                        </TableHead>
                        <TableHead className="font-medium text-gray-700">
                          Address
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDrivers.map((driver) => (
                        <TableRow
                          key={driver.id}
                          className={`cursor-pointer hover:bg-gray-50 ${
                            selectedItem?.id === driver.id ? "bg-blue-50" : ""
                          }`}
                          onClick={() => handleRowClick(driver)}
                        >
                          <TableCell className="font-medium">
                            {driver.slNo}
                          </TableCell>
                          <TableCell>{driver.name}</TableCell>
                          <TableCell>{driver.phoneNumber}</TableCell>
                          <TableCell>{driver.transportType}</TableCell>
                          <TableCell className="font-mono text-sm">
                            {driver.licenseNo}
                          </TableCell>
                          <TableCell>{driver.address}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* ------------------- Guide -------------------- */}
              <TabsContent value="guide" className="mt-0">
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-medium text-gray-700">
                          SL No
                        </TableHead>
                        <TableHead className="font-medium text-gray-700">
                          Name
                        </TableHead>
                        <TableHead className="font-medium text-gray-700">
                          Phone Number
                        </TableHead>
                        <TableHead className="font-medium text-gray-700">
                          <select
                            value={transportFilter}
                            onChange={(e) =>
                              setTransportFilter(
                                e.target.value as "all" | "Vehicle" | "Boat",
                              )
                            }
                            className="border border-gray-300 rounded px-2 py-1 text-sm bg-white cursor-pointer"
                          >
                            <option value="all">Transport type (All)</option>
                            <option value="Vehicle">Vehicle</option>
                            <option value="Boat">Boat</option>
                          </select>
                        </TableHead>
                        <TableHead className="font-medium text-gray-700">
                          Licence
                        </TableHead>
                        <TableHead className="font-medium text-gray-700">
                          Address
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredGuides.map((guide) => (
                        <TableRow
                          key={guide.id}
                          className={`cursor-pointer hover:bg-gray-50 ${
                            selectedItem?.id === guide.id ? "bg-blue-50" : ""
                          }`}
                          onClick={() => handleRowClick(guide)}
                        >
                          <TableCell className="font-medium">
                            {guide.slNo}
                          </TableCell>
                          <TableCell>{guide.name}</TableCell>
                          <TableCell>{guide.phoneNumber}</TableCell>
                          <TableCell>{guide.transportType}</TableCell>
                          <TableCell className="font-mono text-sm">
                            {guide.licenseNo}
                          </TableCell>
                          <TableCell>{guide.address}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Section - Details Panel */}
        <div className="w-100 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {selectedItem ? (
            <div>
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Details</h2>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {/* Profile Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                </div>

                {/* Name */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">
                    {selectedItem.name}
                  </h3>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 pb-3 border-b">
                  <div className="text-gray-400 mt-1">
                    <MailIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 break-all">
                      {selectedItem.email}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 pb-3 border-b">
                  <div className="text-gray-400 mt-1">
                    <PhoneIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      {selectedItem.phoneNumber}
                    </p>
                  </div>
                </div>

                {/* License */}
                <div className="flex items-start gap-3 pb-3 border-b">
                  <div className="text-gray-400 mt-1">
                    <FileImage className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">License No.</p>
                    <p className="text-sm text-gray-900 font-mono">
                      {selectedItem.licenseNo}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3 pb-3 border-b">
                  <div className="text-gray-400 mt-1">
                    <LocateIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      {selectedItem.address}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleEdit}
                    className=" border-gray-300 hover:bg-gray-50"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleDelete}
                    className=" border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <FileImage className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Tap any row to view {activeTab}s details
              </p>
              <button
                onClick={() => handleAddClick(activeTab)}
                className="text-sm text-blue-500 hover:text-blue-600 font-medium"
              >
                + Add a new {activeTab}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      <AddDriverGuideModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        type={modalType}
        mode="add"
        onConfirm={handleAddConfirm}
      />

      {/* Edit Modal */}
      <AddDriverGuideModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        type={activeTab}
        mode="edit"
        editData={selectedItem}
        onConfirm={handleEditConfirm}
      />
    </main>
  );
}
