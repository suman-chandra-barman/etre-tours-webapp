"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import TicketingSection from "@/components/Tours/TicketingSection";
import { OperationsTour } from "@/app/(main)/direct-sales/operations-board/page";

interface MakeTicketDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tour: OperationsTour | null;
}

const MakeTicketDrawer = ({
  open,
  onOpenChange,
  tour,
}: MakeTicketDrawerProps) => {
  if (!tour) return null;

  const handleConfirm = (ticketData: {
    buyerName: string;
    phoneNumber: string;
    adults: number;
    children: number;
    infant: number;
    foc: number;
    paymentMethod: string;
    total: number;
  }) => {
    console.log("Ticket confirmed:", ticketData);
    // Handle ticket creation/confirmation
    // In real app, this would save to API
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-175 sm:max-w-175 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Make Ticket</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <TicketingSection
            tourName={tour.tourName}
            availableSeats={tour.seatsAvailable}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MakeTicketDrawer;
