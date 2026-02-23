"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import TicketingSection from "@/components/Tours/TicketingSection";
import { OperationsTour } from "@/app/(main)/direct-sales/page";

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

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Make Ticket</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <TicketingSection
            tourName={tour.tourName}
            availableSeats={tour.seatsAvailable}
            onCancel={handleCancel}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MakeTicketDrawer;
