"use client";

import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { TUserRole } from "@/types/user.types";
import { OperationsStationSection } from "@/components/OperationsBoard/OperationsStationSection";
import { Button } from "@/components/ui/button";
import { Plus, Ticket as TicketIcon } from "lucide-react";
import CreateNewTourDrawer from "@/components/Drawers/CreateNewTourDrawer";
import { tourStatus, TourStatus, userRoles } from "@/constants";
import Link from "next/link";

// Station sync status type
export interface StationSyncStatus {
  isOnline: boolean;
  lastSyncMinutes?: number;
}

// Tour data type for operations board
export interface OperationsTour {
  id: number;
  departureTime: string;
  returnTime: string;
  tourName: string;
  status: TourStatus;
  seatsSold: number;
  seatsAvailable: number;
  transportContractor: string;
  driver: string;
  vehicle: string;
  guide: string;
  numberOfSeats?: number;
  extraGuide?: string;
}

export default function OperationsBoardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { role } = useUser();

  // Mock data for TODAY's tours - in real app, this would come from API
  const [directSalesTours, setDirectSalesTours] = useState<OperationsTour[]>([
    {
      id: 1,
      departureTime: "09:00",
      returnTime: "10:00",
      tourName: "Village and back",
      status: tourStatus.IN_PROGRESS,
      seatsSold: 4,
      seatsAvailable: 2,
      transportContractor: "Fast delivery",
      driver: "Paul John",
      vehicle: "24456",
      guide: "None",
    },
    {
      id: 2,
      departureTime: "10:00",
      returnTime: "12:00",
      tourName: "Town adventure",
      status: tourStatus.IN_PROGRESS,
      seatsSold: 4,
      seatsAvailable: 2,
      transportContractor: "Edmond Transport",
      driver: "Joseph King",
      vehicle: "56009",
      guide: "Jane Gerry",
    },
    {
      id: 3,
      departureTime: "11:00",
      returnTime: "12:00",
      tourName: "Tribal encounter",
      status: tourStatus.PRE_DEPARTURE,
      seatsSold: 15,
      seatsAvailable: 0,
      transportContractor: "Nice Tours",
      driver: "Walter Smith",
      vehicle: "54322",
      guide: "None",
    },
    {
      id: 4,
      departureTime: "12:00",
      returnTime: "15:00",
      tourName: "Dine & Dine",
      status: tourStatus.PRE_DEPARTURE,
      seatsSold: 4,
      seatsAvailable: 12,
      transportContractor: "Island culture",
      driver: "Ben Harper",
      vehicle: "88990",
      guide: "Barbara Tovey",
    },
    {
      id: 5,
      departureTime: "13:00",
      returnTime: "16:00",
      tourName: "Snorkel haven",
      status: tourStatus.CANCELLED,
      seatsSold: 2,
      seatsAvailable: 8,
      transportContractor: "Cruising adventure",
      driver: "Michael Jordan",
      vehicle: "33345",
      guide: "None",
    },
  ]);

  const [cruiseSalesTours, setCruiseSalesTours] = useState<OperationsTour[]>([
    {
      id: 6,
      departureTime: "08:00",
      returnTime: "10:00",
      tourName: "Forest walk",
      status: tourStatus.IN_PROGRESS,
      seatsSold: 22,
      seatsAvailable: 2,
      transportContractor: "Fast delivery",
      driver: "Paul John",
      vehicle: "24456",
      guide: "None",
    },
    {
      id: 7,
      departureTime: "10:00",
      returnTime: "12:00",
      tourName: "Castle bay",
      status: tourStatus.IN_PROGRESS,
      seatsSold: 89,
      seatsAvailable: 22,
      transportContractor: "Edmond Transport",
      driver: "Joseph King",
      vehicle: "56009",
      guide: "Jane Gerry",
    },
    {
      id: 8,
      departureTime: "12:00",
      returnTime: "14:00",
      tourName: "Cave and dive",
      status: tourStatus.PRE_DEPARTURE,
      seatsSold: 38,
      seatsAvailable: 11,
      transportContractor: "Nice Tours",
      driver: "Walter Smith",
      vehicle: "54322",
      guide: "None",
    },
  ]);

  const [partnerSalesTours, setPartnerSalesTours] = useState<OperationsTour[]>([
    {
      id: 9,
      departureTime: "09:00",
      returnTime: "10:00",
      tourName: "All day discover",
      status: tourStatus.IN_PROGRESS,
      seatsSold: 22,
      seatsAvailable: 5,
      transportContractor: "Jimmy roadrunner",
      driver: "Fred Carson",
      vehicle: "222999",
      guide: "Brenda Davidson",
    },
  ]);

  // Sync status for each station
  const [syncStatus] = useState<Record<string, StationSyncStatus>>({
    "direct-sales": { isOnline: false },
    "cruise-sales": { isOnline: true, lastSyncMinutes: 5 },
    "partner-sales": { isOnline: true, lastSyncMinutes: 5 },
  });

  // Determine which station is editable based on user role
  const checkIsHomeStation = (stationRole: TUserRole): boolean => {
    return role === stationRole;
  };

  // Handler for updating tour status (would sync to API in real app)
  const handleStatusChange = (
    stationRole: TUserRole,
    tourId: number,
    newStatus: OperationsTour["status"],
  ) => {
    // Update the appropriate station's tours
    if (stationRole === userRoles.DIRECT_SALES) {
      setDirectSalesTours((prev) =>
        prev.map((tour) =>
          tour.id === tourId ? { ...tour, status: newStatus } : tour,
        ),
      );
    } else if (stationRole === userRoles.CRUISE_SALES) {
      setCruiseSalesTours((prev) =>
        prev.map((tour) =>
          tour.id === tourId ? { ...tour, status: newStatus } : tour,
        ),
      );
    } else if (stationRole === userRoles.PARTNER_SALES) {
      setPartnerSalesTours((prev) =>
        prev.map((tour) =>
          tour.id === tourId ? { ...tour, status: newStatus } : tour,
        ),
      );
    }

    // In a real app, this would:
    // 1. Send update to API
    // 2. Broadcast change to all stations via WebSocket/polling
    // 3. Update local state when server confirms
  };

  // Handler for updating entire tour (from edit modal)
  const handleTourUpdate = (
    stationRole: TUserRole,
    updatedTour: OperationsTour,
  ) => {
    if (stationRole === userRoles.DIRECT_SALES) {
      setDirectSalesTours((prev) =>
        prev.map((tour) => (tour.id === updatedTour.id ? updatedTour : tour)),
      );
    } else if (stationRole === userRoles.CRUISE_SALES) {
      setCruiseSalesTours((prev) =>
        prev.map((tour) => (tour.id === updatedTour.id ? updatedTour : tour)),
      );
    } else if (stationRole === userRoles.PARTNER_SALES) {
      setPartnerSalesTours((prev) =>
        prev.map((tour) => (tour.id === updatedTour.id ? updatedTour : tour)),
      );
    }

    // In a real app, this would sync to API
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Page Header */}
      <div className="mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Operations Board
            </h1>
            <div className="mt-2 space-y-1">
              <p className=" text-gray-600">
                {" "}
                Live operations for
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <div className="flex items-center gap-3">
                <p className="text-lg font-semibold">Carnival Adventurer</p>
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="text-sm text-gray-600">Return Time:</span>
                  <span className="text-sm font-semibold text-blue-700">
                    17:00
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={"outline"}
              asChild
              className="bg-green-100 hover:bg-green-200 rounded-full border-green-300"
            >
              <Link href="/direct-sales/tickets">
                <TicketIcon className="w-4 h-4" /> View Today&apos;s Tickets
              </Link>
            </Button>
            <Button
              variant={"outline"}
              className="bg-blue-200 hover:bg-blue-300 rounded-full"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-4 h-4" /> New tour
            </Button>
          </div>
        </div>
      </div>

      {/* Stations Sections */}
      <div className="space-y-4">
        {/* Direct Sales Station */}
        <OperationsStationSection
          stationName="DIRECT SALES"
          stationLabel="Home station"
          tours={directSalesTours}
          syncStatus={syncStatus["direct-sales"]}
          isHomeStation={checkIsHomeStation("direct-sales")}
          onStatusChange={(tourId, newStatus) =>
            handleStatusChange("direct-sales", tourId, newStatus)
          }
          onTourUpdate={(updatedTour) =>
            handleTourUpdate("direct-sales", updatedTour)
          }
        />

        {/* Cruise Sales Station */}
        <OperationsStationSection
          stationName="CRUISE SALES"
          stationLabel="Station 1"
          tours={cruiseSalesTours}
          syncStatus={syncStatus["cruise-sales"]}
          isHomeStation={checkIsHomeStation("cruise-sales")}
          onStatusChange={(tourId, newStatus) =>
            handleStatusChange("cruise-sales", tourId, newStatus)
          }
          onTourUpdate={(updatedTour) =>
            handleTourUpdate("cruise-sales", updatedTour)
          }
        />

        {/* Partner Sales Station */}
        <OperationsStationSection
          stationName="PARTNER SALES"
          stationLabel="Station 2"
          tours={partnerSalesTours}
          syncStatus={syncStatus["partner-sales"]}
          isHomeStation={checkIsHomeStation("partner-sales")}
          onStatusChange={(tourId, newStatus) =>
            handleStatusChange("partner-sales", tourId, newStatus)
          }
          onTourUpdate={(updatedTour) =>
            handleTourUpdate("partner-sales", updatedTour)
          }
        />
      </div>

      {/* Create New Tour Drawer */}
      <CreateNewTourDrawer open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
