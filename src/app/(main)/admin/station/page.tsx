"use client";

import { useState } from "react";
import { AddEditMemberModal } from "@/components/Modals/AddEditMemberModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Pen, Plus } from "lucide-react";

interface StationMember {
  id: string;
  name: string;
  station: string;
  status: "online" | "offline";
  email: string;
  phoneNumber: string;
  photo?: string;
}

function StationPage() {
  const [isAddStationModalOpen, setIsAddStationModalOpen] = useState(false);
  const [isEditStationModalOpen, setIsEditStationModalOpen] = useState(false);
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
      photo: "",
    },
    {
      id: "2",
      name: "Emma Moray",
      station: "Cruise Operations",
      status: "offline",
      email: "emma.cruise@etretours.com",
      phoneNumber: "+1 234 567 222",
      photo: "",
    },
    {
      id: "3",
      name: "Jack Partner",
      station: "Partner",
      status: "online",
      email: "jack.partner@etretours.com",
      phoneNumber: "+1 234 567 333",
      photo: "",
    },
  ]);

  const handleEditStation = (member: StationMember) => {
    setSelectedMember(member);
    setIsEditStationModalOpen(true);
  };

  return (
    <main className="p-6 overflow-y-auto">
      <h1 className="text-2xl lg:text-3xl font-bold mb-6">Station</h1>

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
                    className={
                      member.status === "online"
                        ? " bg-green-500 text-white"
                        : " bg-red-500 text-white"
                    }
                  >
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.phoneNumber}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
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
                phoneNumber: selectedMember.phoneNumber,
              }
            : undefined
        }
        mode="edit"
      />
    </main>
  );
}

export default StationPage;
