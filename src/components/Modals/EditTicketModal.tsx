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
import { Label } from "@/components/ui/label";
import { NumberStepper } from "@/components/ui/number-stepper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Ticket } from "./ViewTodaysTicketsModal";

interface EditTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket: Ticket | null;
  onSave: (ticket: Ticket) => void;
}

export default function EditTicketModal({
  open,
  onOpenChange,
  ticket,
  onSave,
}: EditTicketModalProps) {
  const [buyerName, setBuyerName] = useState(ticket?.buyerName || "");
  const [adults, setAdults] = useState(ticket?.adults || 0);
  const [children, setChildren] = useState(ticket?.children || 0);
  const [infant, setInfant] = useState(ticket?.infant || 0);
  const [foc, setFoc] = useState(ticket?.foc || 0);
  const [paymentMethod, setPaymentMethod] = useState(
    ticket?.paymentMethod || "",
  );
  const [notes, setNotes] = useState(ticket?.notes || "");
  const [transportCompany, setTransportCompany] = useState(
    ticket?.transportCompany || "",
  );
  const [driver, setDriver] = useState(ticket?.driver || "");
  const [guide, setGuide] = useState(ticket?.guide || "");

  const ADULT_PRICE = 49.0;
  const CHILD_PRICE = 39.0;

  // Reset form when modal opens with new ticket
  useEffect(() => {
    if (open && ticket) {
      setBuyerName(ticket.buyerName);
      setAdults(ticket.adults);
      setChildren(ticket.children);
      setInfant(ticket.infant);
      setFoc(ticket.foc);
      setPaymentMethod(ticket.paymentMethod);
      setNotes(ticket.notes);
      setTransportCompany(ticket.transportCompany || "");
      setDriver(ticket.driver || "");
      setGuide(ticket.guide || "");
    } else if (!open) {
      // Reset when closed
      setBuyerName("");
      setAdults(0);
      setChildren(0);
      setInfant(0);
      setFoc(0);
      setPaymentMethod("");
      setNotes("");
      setTransportCompany("");
      setDriver("");
      setGuide("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const calculateTotal = () => {
    return adults * ADULT_PRICE + children * CHILD_PRICE;
  };

  const handleSave = () => {
    if (!ticket) return;

    const updatedTicket: Ticket = {
      ...ticket,
      buyerName,
      adults,
      children,
      infant,
      foc,
      paymentMethod,
      amount: calculateTotal(),
      notes,
      transportCompany,
      driver,
      guide,
    };

    onSave(updatedTicket);
  };

  if (!ticket) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Ticket</DialogTitle>
          <p>{ticket.tourName}</p>
        </DialogHeader>

        <div className="space-y-4">
          {/* Buyer Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-normal text-gray-700 block">
                Buyer Name
              </label>
              <Input
                type="text"
                placeholder="Full Name"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
              />
            </div>
            {/* Transport Company */}
            <div>
              <Label className="text-sm text-gray-700 font-normal">
                Transport Company
              </Label>
              <Select
                value={transportCompany}
                onValueChange={setTransportCompany}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fast delivery">Fast delivery</SelectItem>
                  <SelectItem value="Edmond Transport">
                    Edmond Transport
                  </SelectItem>
                  <SelectItem value="Nice Tours">Nice Tours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Driver */}
            <div>
              <Label className="text-sm text-gray-700 font-normal">
                Driver
              </Label>
              <Select value={driver} onValueChange={setDriver}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Driver" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paul John">Paul John</SelectItem>
                  <SelectItem value="Joseph King">Joseph King</SelectItem>
                  <SelectItem value="Walter Smith">Walter Smith</SelectItem>
                  <SelectItem value="Ben Harper">Ben Harper</SelectItem>
                  <SelectItem value="Michael Jordan">Michael Jordan</SelectItem>
                  <SelectItem value="Fred Carson">Fred Carson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Guide */}
            <div >
              <Label className="text-sm text-gray-700 font-normal">Guide</Label>
              <Select value={guide} onValueChange={setGuide}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Guide" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="None">None</SelectItem>
                  <SelectItem value="Jane Gerry">Jane Gerry</SelectItem>
                  <SelectItem value="Barbara Tovey">Barbara Tovey</SelectItem>
                  <SelectItem value="Brenda Davidson">
                    Brenda Davidson
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Passenger Details */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Passenger Details
            </label>
            <div className="grid grid-cols-2 gap-3">
              <NumberStepper
                label="Adults"
                value={adults}
                onChange={setAdults}
                description={`$${ADULT_PRICE.toFixed(2)} per adult`}
              />
              <NumberStepper
                label="Children"
                value={children}
                onChange={setChildren}
                description={`$${CHILD_PRICE.toFixed(2)} per child`}
              />
              <NumberStepper
                label="Infant"
                value={infant}
                onChange={setInfant}
              />
              <NumberStepper label="FOC" value={foc} onChange={setFoc} />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Payment Method
            </label>
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setPaymentMethod("credit card")}
                variant={
                  paymentMethod === "credit card" ? "default" : "outline"
                }
                className={`px-4 lg:px-8 rounded-full ${
                  paymentMethod === "credit card"
                    ? "bg-gray-900 hover:bg-gray-800"
                    : ""
                }`}
              >
                Credit Card
              </Button>
              <Select
                value={paymentMethod}
                onValueChange={(value: string) => setPaymentMethod(value)}
              >
                <SelectTrigger className="px-4 lg:px-8 rounded-full h-9!">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xpf">XPF</SelectItem>
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="aud">AUD</SelectItem>
                  <SelectItem value="euro">EURO</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Total */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Amount:</span>
              <span className="text-2xl font-bold text-blue-600">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Notes / Comments
            </label>
            <Textarea
              placeholder="Add any notes (e.g. late departure, sick passenger, refund requested, special requirements...)"
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
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 rounded-full"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
