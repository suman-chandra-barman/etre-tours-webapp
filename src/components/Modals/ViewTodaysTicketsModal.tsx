"use client";

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
import { Button } from "@/components/ui/button";
import { Edit, XCircle, RefreshCcw, Printer } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import EditTicketModal from "@/components/Modals/EditTicketModal";

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

interface ViewTodaysTicketsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tickets: Ticket[];
  onUpdateTicket: (ticket: Ticket) => void;
  onCancelTicket: (ticketId: number) => void;
  onRefundTicket: (ticketId: number) => void;
  onReprintTicket: (ticket: Ticket) => void;
}

export default function ViewTodaysTicketsModal({
  open,
  onOpenChange,
  tickets,
  onUpdateTicket,
  onCancelTicket,
  onRefundTicket,
  onReprintTicket,
}: ViewTodaysTicketsModalProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const handleEditClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setEditModalOpen(true);
  };

  const handleSaveTicket = (updatedTicket: Ticket) => {
    onUpdateTicket(updatedTicket);
    setEditModalOpen(false);
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
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="min-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Today&apos;s Tickets</DialogTitle>
            <p className="text-gray-600">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </DialogHeader>

          <div className="mt-4">
            {tickets.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No tickets created today</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">
                        Buyer Name
                      </TableHead>
                      <TableHead className="font-semibold">Tour Name</TableHead>
                      <TableHead className="font-semibold text-center">
                        Passengers
                      </TableHead>
                      <TableHead className="font-semibold">Payment</TableHead>
                      <TableHead className="font-semibold">Amount</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Notes</TableHead>
                      <TableHead className="font-semibold text-center">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">
                          {ticket.buyerName}
                        </TableCell>
                        <TableCell>{ticket.tourName}</TableCell>
                        <TableCell className="text-center">
                          <div className="text-sm">
                            <div>👥 {getTotalPassengers(ticket)}</div>
                            <div className="text-gray-500 text-xs">
                              A:{ticket.adults} C:{ticket.children} I:
                              {ticket.infant} F:{ticket.foc}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="uppercase">
                          {ticket.paymentMethod}
                        </TableCell>
                        <TableCell className="font-semibold">
                          ${ticket.amount.toFixed(2)}
                        </TableCell>
                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                        <TableCell className="max-w-50">
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
                              onClick={() => onCancelTicket(ticket.id)}
                              disabled={ticket.status !== "in-progress"}
                              title="Cancel ticket"
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-orange-600 hover:text-orange-700"
                              onClick={() => onRefundTicket(ticket.id)}
                              disabled={ticket.status !== "in-progress"}
                              title="Mark refund"
                            >
                              <RefreshCcw className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                              onClick={() => onReprintTicket(ticket)}
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
        </DialogContent>
      </Dialog>

      {/* Edit Ticket Modal */}
      <EditTicketModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        ticket={selectedTicket}
        onSave={handleSaveTicket}
      />
    </>
  );
}
