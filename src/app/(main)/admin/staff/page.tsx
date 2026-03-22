"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AddStaffModal, {
  AddStaffFormData,
  StaffType,
} from "@/components/Modals/AddStaffModal";
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
];

function StaffPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>(initialStaff);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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

  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Staff</h1>

        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="rounded-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Staff
        </Button>
      </div>

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
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffList.map((staff) => (
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
                        : "bg-emerald-100 text-emerald-700"
                    }
                  >
                    {staff.staffType}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddStaffModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAddStaff={handleAddStaff}
      />
    </main>
  );
}

export default StaffPage;
