"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AddTransportModal, {
  AddTransportFormData,
  TransportType,
} from "@/components/Modals/AddTransportModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Transport {
  id: number;
  name: string;
  transportType: TransportType;
  transportContractor: string;
  seatCapacity: number;
}

const initialTransportList: Transport[] = [
  {
    id: 6656,
    name: "Koshi River Shuttle",
    transportType: "Boat",
    transportContractor: "Sunrise Marine Services",
    seatCapacity: 30,
  },
  {
    id: 2653,
    name: "City Loop Express",
    transportType: "Bus",
    transportContractor: "Everest Roadways",
    seatCapacity: 45,
  },
  {
    id: 3353,
    name: "Delta Cruiser",
    transportType: "Boat",
    transportContractor: "Blue Harbor Transport",
    seatCapacity: 24,
  },
];

function TransportPage() {
  const [transportList, setTransportList] =
    useState<Transport[]>(initialTransportList);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddTransport = (formData: AddTransportFormData) => {
    const newTransport: Transport = {
      id: Date.now(),
      name: formData.name,
      transportType: formData.transportType,
      transportContractor: formData.transportContractor,
      seatCapacity: formData.seatCapacity,
    };

    setTransportList((prev) => [newTransport, ...prev]);
  };

  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl lg:text-3xl font-bold">Transport</h1>

        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="rounded-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Transport
        </Button>
      </div>

      <div className="rounded-lg border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-700">ID</TableHead>
              <TableHead className="font-semibold text-gray-700">
                Name
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Transport Type
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Transport Contractor
              </TableHead>
              <TableHead className="font-semibold text-gray-700 text-right">
                Seat Capacity
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transportList.map((transport) => (
              <TableRow key={transport.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">
                  {transport.id}
                </TableCell>
                <TableCell>{transport.name}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      transport.transportType === "Boat"
                        ? "bg-cyan-100 text-cyan-700"
                        : "bg-amber-100 text-amber-700"
                    }
                  >
                    {transport.transportType}
                  </Badge>
                </TableCell>
                <TableCell>{transport.transportContractor}</TableCell>
                <TableCell className="text-right">
                  {transport.seatCapacity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddTransportModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAddTransport={handleAddTransport}
      />
    </main>
  );
}

export default TransportPage;
