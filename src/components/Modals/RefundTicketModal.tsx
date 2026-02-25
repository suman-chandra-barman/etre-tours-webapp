"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Ticket } from "./ViewTodaysTicketsModal";

interface RefundTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket: Ticket | null;
  onRefund: (ticketId: number, refundAmount: number, notes: string) => void;
}

export default function RefundTicketModal({
  open,
  onOpenChange,
  ticket,
  onRefund,
}: RefundTicketModalProps) {
  const [refundAmount, setRefundAmount] = useState(0);
  const [notes, setNotes] = useState("");

  // Reset form when modal opens
  useEffect(() => {
    if (open && ticket) {
      setRefundAmount(ticket.refundAmount || 0);
      setNotes(ticket.notes || "");
    } else if (!open) {
      setRefundAmount(0);
      setNotes("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleRefund = () => {
    if (!ticket) return;
    onRefund(ticket.id, refundAmount, notes);
    onOpenChange(false);
  };

  if (!ticket) return null;

  const netAmount = ticket.amount - refundAmount;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Refund Ticket</DialogTitle>
          <p className="text-gray-600">{ticket.tourName}</p>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Ticket Info */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Buyer:</span>
              <span className="font-medium">{ticket.buyerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Original Amount:</span>
              <span className="font-semibold">${ticket.amount.toFixed(2)}</span>
            </div>
          </div>

          {/* Refund Amount */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Refund Amount
            </label>
            <Input
              type="number"
              min="0"
              max={ticket.amount}
              step="0.01"
              value={refundAmount}
              onChange={(e) =>
                setRefundAmount(
                  Math.min(parseFloat(e.target.value) || 0, ticket.amount),
                )
              }
              placeholder="Enter refund amount"
            />
          </div>

          {/* Net Amount Display */}
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="flex justify-between items-center">
              <span className="text-orange-700 font-medium">
                Net Amount After Refund:
              </span>
              <span className="text-xl font-bold text-orange-600">
                ${netAmount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Refund Notes
            </label>
            <Textarea
              placeholder="Enter reason for refund..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-full"
          >
            Cancel
          </Button>
          <Button
            onClick={handleRefund}
            className="bg-orange-500 hover:bg-orange-600 rounded-full"
          >
            Process Refund
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
