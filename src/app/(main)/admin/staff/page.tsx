"use client";

import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddStaffModal, {
  AddStaffFormData,
  StaffType,
} from "@/components/Modals/AddStaffModal";
import EditStaffModal, {
  EditStaffFormData,
} from "@/components/Modals/EditStaffModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface StaffMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  staffType: StaffType;
}

const initialStaff: StaffMember[] = [
  {
    id: 1,
    name: "Rohan Shrestha",
    email: "rohan.shrestha@etretours.com",
    phone: "+977 9812345678",
    address: "Biratnagar-5, Sunsari",
    staffType: "Driver",
  },
  {
    id: 2,
    name: "Asha Karki",
    email: "asha.karki@etretours.com",
    phone: "+977 9801122334",
    address: "Itahari-2, Sunsari",
    staffType: "Guide",
  },
  {
    id: 3,
    name: "Bikash Gurung",
    email: "bikash.gurung@etretours.com",
    phone: "+977 9867788990",
    address: "Dharan-8, Sunsari",
    staffType: "Driver",
  },
  {
    id: 4,
    name: "Sita Magar",
    email: "sita.magar@etretours.com",
    phone: "+977 9801122334",
    address: "Itahari-2, Sunsari",
    staffType: "Captain",
  },
];

function StaffPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>(initialStaff);
  const [activeTab, setActiveTab] = useState<StaffType>("Driver");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  const filteredStaffList = staffList.filter(
    (staff) => staff.staffType === activeTab,
  );

  const handleAddStaff = (formData: AddStaffFormData) => {
    const newStaff: StaffMember = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      staffType: formData.staffType,
    };

    setStaffList((prev) => [newStaff, ...prev]);
  };

  const handleEditStaff = (id: number, formData: EditStaffFormData) => {
    setStaffList((prev) =>
      prev.map((staff) =>
        staff.id === id
          ? {
              ...staff,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              staffType: formData.staffType,
            }
          : staff,
      ),
    );
  };

  const handleDeleteStaff = (id: number) => {
    setStaffList((prev) => prev.filter((staff) => staff.id !== id));
  };

  const openEditModal = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setIsEditModalOpen(true);
  };

  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl lg:text-3xl font-bold">Staff</h1>

        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="rounded-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Staff
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as StaffType)}
      >
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="Driver">Driver</TabsTrigger>
          <TabsTrigger value="Captain">Captain</TabsTrigger>
          <TabsTrigger value="Guide">Guide</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <div className="rounded-lg border bg-white overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-700">
                    Name
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Email
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Phone
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Address
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Staff Type
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaffList.length > 0 ? (
                  filteredStaffList.map((staff) => (
                    <TableRow key={staff.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-900">
                        {staff.name}
                      </TableCell>
                      <TableCell>{staff.email}</TableCell>
                      <TableCell>{staff.phone}</TableCell>
                      <TableCell>{staff.address}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            staff.staffType === "Driver"
                              ? "bg-blue-100 text-blue-700"
                              : staff.staffType === "Guide"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-purple-100 text-purple-700"
                          }
                        >
                          {staff.staffType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openEditModal(staff)}
                            className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteStaff(staff.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-10 text-center text-sm text-gray-500"
                    >
                      No {activeTab.toLowerCase()} staff found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <AddStaffModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAddStaff={handleAddStaff}
      />

      <EditStaffModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onEditStaff={handleEditStaff}
        staff={selectedStaff}
      />
    </main>
  );
}

export default StaffPage;
