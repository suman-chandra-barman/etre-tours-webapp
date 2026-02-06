import { TourHistoryItem } from "@/types/tours.types";
import { Pagination } from "@/components/ui/pagination";
import styles from "@/components/styles/Print.module.css";
import { getStatusStyles } from "@/helper/tourStatus";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ToursTableProps {
  data: TourHistoryItem[];
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onRowClick?: (item: TourHistoryItem) => void;
}

export function ToursTable({
  data,
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  onPageChange,
  onRowClick,
}: ToursTableProps) {
  return (
    <div className={`bg-white rounded-xl ${styles.printArea}`}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Departure date & time</TableHead>
            <TableHead>Return time</TableHead>
            <TableHead>Tour name</TableHead>
            <TableHead>Seats sold</TableHead>
            <TableHead>Seats available</TableHead>
            <TableHead>Sub-contractor company</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>Vehicle</TableHead>
            <TableHead>Guide</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Note</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              className="cursor-pointer"
              onClick={() => onRowClick?.(item)}
            >
              <TableCell>{item.dateTime}</TableCell>
              <TableCell>{item.returnTime}</TableCell>
              <TableCell>{item.tour}</TableCell>
              <TableCell>{item.totalPax}</TableCell>
              <TableCell>{item.vacancy}</TableCell>
              <TableCell>{item.subContractor}</TableCell>
              <TableCell>{item.driver}</TableCell>
              <TableCell>{item.allTransport}</TableCell>
              <TableCell>{item.guide}</TableCell>
              <TableCell>
                <span
                  className={`px-2 rounded ${getStatusStyles(item.tourStatus)}`}
                >
                  {item.tourStatus}
                </span>
              </TableCell>
              <TableCell
                className="text-blue-600 text-xs cursor-help"
                title={item.note}
              >
                {item.note && (
                  <span>
                    {item.note.length > 20
                      ? `${item.note.slice(0, 20)}...`
                      : item.note}
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={totalItems}
        className={styles.noPrint}
      />
    </div>
  );
}
