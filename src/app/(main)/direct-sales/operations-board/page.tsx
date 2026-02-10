"use client";

import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { TUserRole } from "@/types/user.types";
import { OperationsStationSection } from "@/components/OperationsBoard/OperationsStationSection";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateNewTourDrawer from "@/components/Drawers/CreateNewTourDrawer";

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
  status: "Pre-departure" | "In progress" | "Completed" | "Cancelled";
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
      status: "In progress",
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
      status: "In progress",
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
      status: "Pre-departure",
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
      status: "Pre-departure",
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
      status: "Cancelled",
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
      status: "In progress",
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
      status: "In progress",
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
      status: "Pre-departure",
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
      status: "In progress",
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
  const getStationEditability = (stationRole: TUserRole): boolean => {
    return role === stationRole;
  };

  // Handler for updating tour status (would sync to API in real app)
  const handleStatusChange = (
    stationRole: TUserRole,
    tourId: number,
    newStatus: OperationsTour["status"],
  ) => {
    // Update the appropriate station's tours
    if (stationRole === "direct-sales") {
      setDirectSalesTours((prev) =>
        prev.map((tour) =>
          tour.id === tourId ? { ...tour, status: newStatus } : tour,
        ),
      );
    } else if (stationRole === "cruise-sales") {
      setCruiseSalesTours((prev) =>
        prev.map((tour) =>
          tour.id === tourId ? { ...tour, status: newStatus } : tour,
        ),
      );
    } else if (stationRole === "partner-sales") {
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
    if (stationRole === "direct-sales") {
      setDirectSalesTours((prev) =>
        prev.map((tour) => (tour.id === updatedTour.id ? updatedTour : tour)),
      );
    } else if (stationRole === "cruise-sales") {
      setCruiseSalesTours((prev) =>
        prev.map((tour) => (tour.id === updatedTour.id ? updatedTour : tour)),
      );
    } else if (stationRole === "partner-sales") {
      setPartnerSalesTours((prev) =>
        prev.map((tour) => (tour.id === updatedTour.id ? updatedTour : tour)),
      );
    }

    // In a real app, this would sync to API
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Operations Board</h1>
          <p className="text-gray-600 mt-1">
            Live operations for{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <Button
          variant={"outline"}
          className="bg-blue-200 hover:bg-blue-300 rounded-full"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4" /> New tour
        </Button>
      </div>

      {/* Stations Sections */}
      <div className="space-y-6">
        {/* Direct Sales Station */}
        <OperationsStationSection
          stationName="DIRECT SALES"
          stationLabel="Home station"
          tours={directSalesTours}
          syncStatus={syncStatus["direct-sales"]}
          isEditable={getStationEditability("direct-sales")}
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
          isEditable={getStationEditability("cruise-sales")}
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
          isEditable={getStationEditability("partner-sales")}
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
