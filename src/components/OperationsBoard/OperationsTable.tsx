import { OperationsTour } from "@/app/(main)/direct-sales/operations-board/page";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStatusStyles } from "@/helper/tourStatus";
import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import EditOperationsTourModal from "../Modals/EditOperationsTourModal";
import MakeTicketDrawer from "../Drawers/MakeTicketDrawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OperationsTableProps {
  tours: OperationsTour[];
  isHomeStation: boolean;
  onStatusChange: (tourId: number, newStatus: OperationsTour["status"]) => void;
  onTourUpdate: (updatedTour: OperationsTour) => void;
}

export function OperationsTable({
  tours,
  isHomeStation,
  onStatusChange,
  onTourUpdate,
}: OperationsTableProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<OperationsTour | null>(null);
  const [ticketDrawerOpen, setTicketDrawerOpen] = useState(false);
  const [ticketTour, setTicketTour] = useState<OperationsTour | null>(null);

  const handleEditClick = (tour: OperationsTour) => {
    setSelectedTour(tour);
    setEditModalOpen(true);
  };

  const handleMakeTicketClick = (tour: OperationsTour) => {
    setTicketTour(tour);
    setTicketDrawerOpen(true);
  };

  const handleSaveTour = (updatedTour: OperationsTour) => {
    onTourUpdate(updatedTour);
  };
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold">Departure time</TableHead>
            <TableHead className="font-semibold">Return time</TableHead>
            <TableHead className="font-semibold">Tour name</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold text-center">
              Seats sold
            </TableHead>
            <TableHead className="font-semibold text-center">
              Seats available
            </TableHead>
            <TableHead className="font-semibold">
              Transport contractor
            </TableHead>
            <TableHead className="font-semibold">Driver</TableHead>
            <TableHead className="font-semibold">Vehicle</TableHead>
            <TableHead className="font-semibold">Guide</TableHead>
            {isHomeStation && (
              <TableHead className="font-semibold">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tours.map((tour) => (
            <TableRow
              key={tour.id}
              className={`${
                isHomeStation ? "hover:bg-gray-50" : "opacity-75"
              } transition-colors`}
            >
              <TableCell className="font-medium">
                {tour.departureTime}
              </TableCell>
              <TableCell>{tour.returnTime}</TableCell>
              <TableCell className="font-medium">{tour.tourName}</TableCell>
              <TableCell>
                {isHomeStation ? (
                  <Select
                    value={tour.status}
                    onValueChange={(value) =>
                      onStatusChange(tour.id, value as OperationsTour["status"])
                    }
                  >
                    <SelectTrigger
                      className={`px-3 h-8! w-35 rounded-full text-sm font-semibold cursor-pointer print:hidden [&_svg]:text-white! [&_svg]:opacity-100 ${getStatusStyles(
                        tour.status,
                      )}`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pre-departure">
                        Pre-departure
                      </SelectItem>
                      <SelectItem value="In progress">In progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <span
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold inline-block ${getStatusStyles(
                      tour.status,
                    )}`}
                  >
                    {tour.status}
                  </span>
                )}
              </TableCell>
              <TableCell className="text-center font-semibold">
                {tour.seatsSold}
              </TableCell>
              <TableCell className="text-center font-semibold">
                {tour.seatsAvailable}
              </TableCell>
              <TableCell>{tour.transportContractor}</TableCell>
              <TableCell>{tour.driver}</TableCell>
              <TableCell className="font-mono">{tour.vehicle}</TableCell>
              <TableCell>
                {tour.guide === "None" ? (
                  <span className="text-gray-400 italic">None</span>
                ) : (
                  tour.guide
                )}
              </TableCell>
              {isHomeStation && (
                <TableCell className="flex items-center gap-4">
                  <button
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    onClick={() => handleEditClick(tour)}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <Button
                    className="rounded-full px-2 h-8"
                    onClick={() => handleMakeTicketClick(tour)}
                  >
                    Make Ticket
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Tour Modal */}
      <EditOperationsTourModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        tour={selectedTour}
        onSave={handleSaveTour}
      />

      {/* Make Ticket Drawer */}
      <MakeTicketDrawer
        open={ticketDrawerOpen}
        onOpenChange={setTicketDrawerOpen}
        tour={ticketTour}
      />
    </div>
  );
}
