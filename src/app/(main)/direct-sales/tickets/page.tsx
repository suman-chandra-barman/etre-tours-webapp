"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, XCircle, RefreshCcw, Printer, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import EditTicketModal from "@/components/Modals/EditTicketModal";
import { useRouter } from "next/navigation";

export interface Ticket {
  id: number;
  buyerName: string;
  tourName: string;
  adults: number;
  children: number;
  infant: number;
  foc: number;
  paymentMethod: string;
  amount: number;
  status: "in-progress" | "cancelled" | "refunded";
  notes: string;
  createdAt: Date;
}

export default function TicketsPage() {
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  // Mock tickets data - in real app, this would come from API
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1,
      buyerName: "John Smith",
      tourName: "Village and back",
      adults: 2,
      children: 1,
      infant: 0,
      foc: 0,
      paymentMethod: "credit card",
      amount: 137.0,
      status: "in-progress",
      notes: "Confirmed booking",
      createdAt: new Date(),
    },
    {
      id: 2,
      buyerName: "Sarah Johnson",
      tourName: "Town adventure",
      adults: 4,
      children: 0,
      infant: 1,
      foc: 0,
      paymentMethod: "usd",
      amount: 196.0,
      status: "in-progress",
      notes: "Late departure requested",
      createdAt: new Date(),
    },
    {
      id: 3,
      buyerName: "Michael Brown",
      tourName: "Tribal encounter",
      adults: 3,
      children: 2,
      infant: 0,
      foc: 1,
      paymentMethod: "xpf",
      amount: 225.0,
      status: "cancelled",
      notes: "Passenger felt sick - cancelled",
      createdAt: new Date(),
    },
  ]);

  const handleEditClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setEditModalOpen(true);
  };

  const handleSaveTicket = (updatedTicket: Ticket) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === updatedTicket.id ? updatedTicket : ticket,
      ),
    );
    setEditModalOpen(false);
    // In real app, this would save to API
  };

  const handleCancelTicket = (ticketId: number) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, status: "cancelled" as const }
          : ticket,
      ),
    );
    // In real app, this would save to API
  };

  const handleRefundTicket = (ticketId: number) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, status: "refunded" as const }
          : ticket,
      ),
    );
    // In real app, this would save to API
  };

  const handleReprintTicket = (ticket: Ticket) => {
    console.log("Reprinting ticket:", ticket);
    // In real app, this would trigger print modal
  };

  const getStatusBadge = (status: Ticket["status"]) => {
    switch (status) {
      case "in-progress":
        return <Badge className="bg-green-600">In Progress</Badge>;
      case "cancelled":
        return <Badge className="bg-red-600">Cancelled</Badge>;
      case "refunded":
        return <Badge className="bg-orange-600">Refunded</Badge>;
    }
  };

  const getTotalPassengers = (ticket: Ticket) => {
    return ticket.adults + ticket.children + ticket.infant + ticket.foc;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Page Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          className="mb-4 -ml-2"
          onClick={() => router.push("/direct-sales")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Operations Board
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Today&apos;s Tickets
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        {tickets.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No tickets created today</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 h-12">
                  <TableHead className="font-semibold text-base">
                    Buyer Name
                  </TableHead>
                  <TableHead className="font-semibold text-base">
                    Tour Name
                  </TableHead>
                  <TableHead className="font-semibold text-base text-center">
                    Passengers
                  </TableHead>
                  <TableHead className="font-semibold text-base">
                    Payment
                  </TableHead>
                  <TableHead className="font-semibold text-base">
                    Amount
                  </TableHead>
                  <TableHead className="font-semibold text-base">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-base">
                    Notes
                  </TableHead>
                  <TableHead className="font-semibold text-base text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id} className="h-14">
                    <TableCell className="font-medium text-base">
                      {ticket.buyerName}
                    </TableCell>
                    <TableCell className="text-base">
                      {ticket.tourName}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="text-base">
                        <div>
                           {getTotalPassengers(ticket)}
                        </div>
                        <div className="text-gray-500 text-sm">
                          A:{ticket.adults} C:{ticket.children} I:
                          {ticket.infant} F:{ticket.foc}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="uppercase text-base">
                      {ticket.paymentMethod}
                    </TableCell>
                    <TableCell className="font-semibold text-base">
                      ${ticket.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                    <TableCell className="max-w-50" title={ticket.notes || "-"}>
                      <div className="text-sm text-gray-600 truncate">
                        {ticket.notes || "-"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 justify-center">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditClick(ticket)}
                          disabled={ticket.status !== "in-progress"}
                          title="Edit ticket"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          onClick={() => handleCancelTicket(ticket.id)}
                          disabled={ticket.status !== "in-progress"}
                          title="Cancel ticket"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-orange-600 hover:text-orange-700"
                          onClick={() => handleRefundTicket(ticket.id)}
                          disabled={ticket.status !== "in-progress"}
                          title="Mark refund"
                        >
                          <RefreshCcw className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                          onClick={() => handleReprintTicket(ticket)}
                          title="Reprint ticket"
                        >
                          <Printer className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Edit Ticket Modal */}
      <EditTicketModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        ticket={selectedTicket}
        onSave={handleSaveTicket}
      />
    </div>
  );
}
