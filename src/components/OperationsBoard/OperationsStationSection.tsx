import {
  OperationsTour,
  StationSyncStatus,
} from "@/app/(main)/direct-sales/operations-board/page";
import { OperationsTable } from "./OperationsTable";
import { Printer } from "lucide-react";
import styles from "@/components/styles/Print.module.css";
import { Button } from "../ui/button";
import { getSyncStatusDisplay } from "@/helper/operationsBoard";

interface OperationsStationSectionProps {
  stationName: string;
  stationLabel: string;
  tours: OperationsTour[];
  syncStatus: StationSyncStatus;
  isHomeStation: boolean;
  onStatusChange: (tourId: number, newStatus: OperationsTour["status"]) => void;
  onTourUpdate: (updatedTour: OperationsTour) => void;
}

export function OperationsStationSection({
  stationName,
  stationLabel,
  tours,
  syncStatus,
  isHomeStation,
  onStatusChange,
  onTourUpdate,
}: OperationsStationSectionProps) {
  // Handle print function
  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${isHomeStation ? styles.homeStation : styles.otherStation}`}
    >
      {/* Station Header */}
      <div className="bg-linear-to-r from-blue-600 to-blue-700 px-6 py-4 no-print">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              {stationName}
              <span className="text-sm font-normal text-blue-100">
                {stationLabel}
              </span>
            </h2>
          </div>

          <div className="bg-white px-4 py-2 rounded-full">
            {getSyncStatusDisplay(syncStatus)}
          </div>
        </div>
        {!isHomeStation && (
          <div className="mt-2 text-sm text-blue-100 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Read-only view
          </div>
        )}
        {/* Print Button - Only shown for editable stations */}
        {isHomeStation && tours.length > 0 && (
          <Button
            onClick={handlePrint}
            variant="outline"
            className="rounded-full mt-2"
          >
            <Printer className="w-4 h-4" />
            Print
          </Button>
        )}
      </div>

      {/* Station Tours Table */}
      <div className={`p-6 ${styles.printArea}`}>
        {/* Print Header - Only visible when printing */}
        <div className="hidden print:block mb-4">
          <h1 className="text-2xl font-bold">{stationName}</h1>
          <p className="text-gray-600">
            {stationLabel} -{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {tours.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No tours scheduled for today</p>
          </div>
        ) : (
          <OperationsTable
            tours={tours}
            isHomeStation={isHomeStation}
            onStatusChange={onStatusChange}
            onTourUpdate={onTourUpdate}
          />
        )}
      </div>
    </div>
  );
}
