/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import EmptyTourPlaceholder from "@/components/EmptyStates/EmptyTourPlaceholder";
import CruiseTourSetupForm from "@/components/Forms/CruiseTourSetupForm";
import CruiseTourProgressView from "@/components/Tours/CruiseTourProgressView";
import CruiseTicketingSection from "@/components/Tours/CruiseTicketingSection";

const CruiseSalesPage = () => {
  const [showTicketingSection, setShowTicketingSection] = useState(false);
  const [viewMode, setViewMode] = useState<"setup" | "progress">("setup");

  const tour = {
    id: 1,
    destination: "Lagoon Snokeling",
    subContractorCompany: "Sample Company",
    from: "Los Angeles",
    startDateAndTime: "Sep 4, 2021 at 12:14 am -8:30 pm",
    returnDateAndTime: "2024-06-15T18:00:00Z",
    paymentMethods: "Cash",
    operator: "Expedia LLC",
    operatorCompany: "Island Transport Ltd.",
    registrationNumber: "ML57 GNX",
    availableSeats: 36,
    driver: "Sep 4, 2021 at 8:30 pm",
    guide: "Robert Hook",
    extraGuide: "Daniel",
  };

  const tours = [tour]; // Replace with actual data fetching logic

  const handleMakeTickets = () => {
    setShowTicketingSection(true);
  };

  const handleConfirmDeparture = () => {
    setViewMode("progress");
  };

  const handleTicketConfirm = (ticketData: any) => {
    console.log("Ticket confirmed:", ticketData);
    // Handle ticket confirmation logic here
  };

  if (tours.length < 1) return <EmptyTourPlaceholder />;

  return (
    <main className="p-4 md:p-6">
      <div className={`flex gap-6 lg:grid lg:grid-cols-3`}>
        <div className="lg:col-span-2">
          {viewMode === "setup" ? (
            <CruiseTourSetupForm
              tourData={tour}
              onMakeTickets={handleMakeTickets}
              onConfirmDeparture={handleConfirmDeparture}
            />
          ) : (
            <CruiseTourProgressView
              tourData={tour}
              currentStep="pre-departure"
              onCancelTour={() => setViewMode("setup")}
              onNextStep={() => console.log("Moving to next step")}
            />
          )}
        </div>

        {showTicketingSection && viewMode == "setup" && (
          <div className="lg:col-span-1">
            <CruiseTicketingSection
              tourName={tour.destination}
              availableSeats={tour.availableSeats}
              onConfirm={handleTicketConfirm}
              onCancel={() => setShowTicketingSection(false)}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default CruiseSalesPage;
