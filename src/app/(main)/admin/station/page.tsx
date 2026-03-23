"use client";

import { useState } from "react";
import { AddEditMemberModal } from "@/components/Modals/AddEditMemberModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pen, Plus } from "lucide-react";

interface StationMember {
  id: string;
  name: string;
  station: string;
  status: "online" | "offline";
  email: string;
  phoneNumber: string;
  city: string;
  presentAddress: string;
  permanentAddress: string;
  password: string;
  photo?: string;
}

function StationPage() {
  const [isAddStationModalOpen, setIsAddStationModalOpen] = useState(false);
  const [isEditStationModalOpen, setIsEditStationModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<StationMember | null>(
    null,
  );

  const [stationMembers] = useState<StationMember[]>([
    {
      id: "1",
      name: "Suman Barman",
      station: "Direct Sales",
      status: "online",
      email: "suman.direct@etretours.com",
      phoneNumber: "+1 234 567 111",
      city: "New York",
      presentAddress: "15 Hudson Street, New York",
      permanentAddress: "18 Park Avenue, New York",
      password: "******",
      photo: "",
    },
    {
      id: "2",
      name: "Emma Moray",
      station: "Cruise Operations",
      status: "offline",
      email: "emma.cruise@etretours.com",
      phoneNumber: "+1 234 567 222",
      city: "Miami",
      presentAddress: "221 Ocean View, Miami",
      permanentAddress: "44 Palm Drive, Florida",
      password: "******",
      photo: "",
    },
    {
      id: "3",
      name: "Jack Partner",
      station: "Partner",
      status: "online",
      email: "jack.partner@etretours.com",
      phoneNumber: "+1 234 567 333",
      city: "Boston",
      presentAddress: "54 Downtown Lane, Boston",
      permanentAddress: "78 Central Street, Boston",
      password: "******",
      photo: "",
    },
  ]);

  const handleEditStation = (member: StationMember) => {
    setSelectedMember(member);
    setIsEditStationModalOpen(true);
  };

  const handleViewDetails = (member: StationMember) => {
    setSelectedMember(member);
    setIsDetailsModalOpen(true);
  };

  return (
    <main className="p-6 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Station</h1>

      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold">Station Members</h2>
          <Button
            onClick={() => setIsAddStationModalOpen(true)}
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full"
          >
            Add station
            <span className="ml-2">
              <Plus className="w-4 h-4" />
            </span>
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Station</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>City</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stationMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                      {member.name.charAt(0)}
                    </div>
                    <span className="font-medium">{member.name}</span>
                  </div>
                </TableCell>
                <TableCell>{member.station}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      member.status === "online"
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-gray-200 bg-gray-50 text-gray-600"
                    }
                  >
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.phoneNumber}</TableCell>
                <TableCell>{member.city}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleViewDetails(member)}
                      className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                      aria-label="View station details"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleEditStation(member)}
                      className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                      aria-label="Edit station"
                    >
                      <Pen className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddEditMemberModal
        key="add-station"
        isOpen={isAddStationModalOpen}
        onClose={() => setIsAddStationModalOpen(false)}
        mode="add"
      />

      <AddEditMemberModal
        key={
          selectedMember
            ? `edit-station-${selectedMember.id}`
            : "edit-station-empty"
        }
        isOpen={isEditStationModalOpen}
        onClose={() => {
          setIsEditStationModalOpen(false);
          setSelectedMember(null);
        }}
        memberData={
          selectedMember
            ? {
                name: selectedMember.name,
                station: selectedMember.station
                  .toLowerCase()
                  .replace(/\s+/g, "-"),
                email: selectedMember.email,
                password: selectedMember.password,
                city: selectedMember.city,
                phoneNumber: selectedMember.phoneNumber,
                presentAddress: selectedMember.presentAddress,
                permanentAddress: selectedMember.permanentAddress,
              }
            : undefined
        }
        mode="edit"
      />

      <Dialog
        open={isDetailsModalOpen}
        onOpenChange={(open) => {
          setIsDetailsModalOpen(open);
          if (!open && !isEditStationModalOpen) {
            setSelectedMember(null);
          }
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Station Details</DialogTitle>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <p className="text-gray-500">Name</p>
                <p className="font-medium">{selectedMember.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <p className="text-gray-500">Station</p>
                <p className="font-medium">{selectedMember.station}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <p className="text-gray-500">Status</p>
                <p className="font-medium capitalize">
                  {selectedMember.status}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <p className="text-gray-500">Email</p>
                <p className="font-medium">{selectedMember.email}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <p className="text-gray-500">Phone Number</p>
                <p className="font-medium">{selectedMember.phoneNumber}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <p className="text-gray-500">City</p>
                <p className="font-medium">{selectedMember.city}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <p className="text-gray-500">Present Address</p>
                <p className="font-medium">{selectedMember.presentAddress}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <p className="text-gray-500">Permanent Address</p>
                <p className="font-medium">{selectedMember.permanentAddress}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}

export default StationPage;
