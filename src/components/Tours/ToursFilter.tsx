import { Calendar as CalendarIcon, Printer } from "lucide-react";
import styles from "@/components/styles/Print.module.css";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useState } from "react";

interface ToursFilterProps {
  selectedDate: string;
  selectedTourZone: string;
  selectedSubContractor: string;
  onDateChange: (date: string) => void;
  onTourZoneChange: (zone: string) => void;
  onSubContractorChange: (contractor: string) => void;
  onApplyFilter: () => void;
  onPrint: () => void;
}

export function ToursFilter({
  selectedDate,
  selectedTourZone,
  selectedSubContractor,
  onDateChange,
  onTourZoneChange,
  onSubContractorChange,
  onApplyFilter,
  onPrint,
}: ToursFilterProps) {
  const [date, setDate] = useState<Date>();

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      onDateChange(format(selectedDate, "dd/MM/yy"));
    } else {
      onDateChange("");
    }
  };

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 p-4 mb-4 ${styles.noPrint}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-3">
          {/* Date Input with Calendar */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-36 justify-start text-left font-normal rounded-full px-4 py-2 h-auto border-gray-300 hover:bg-white"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                {date ? (
                  format(date, "dd/MM/yy")
                ) : (
                  <span className="text-gray-500">DD/MM/YY</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Tour Zone Dropdown */}
          <Select
            value={selectedTourZone || undefined}
            onValueChange={onTourZoneChange}
          >
            <SelectTrigger className="rounded-full text-sm">
              <SelectValue placeholder="Select tour zone" />
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="lagoon-snorkeling">
                Lagoon Snorkeling
              </SelectItem>
              <SelectItem value="island-hopping">Island Hopping</SelectItem>
              <SelectItem value="city-tour">City Tour</SelectItem>
            </SelectContent>
          </Select>

          {/* Sub-contractor Company Dropdown */}
          <Select
            value={selectedSubContractor || undefined}
            onValueChange={onSubContractorChange}
          >
            <SelectTrigger className="rounded-full border-gray-300 text-sm">
              <SelectValue placeholder="Filter by Sub-contractor company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primer-inc">Primer Inc.</SelectItem>
              <SelectItem value="larson-larson">Larson & Larson</SelectItem>
              <SelectItem value="mertz-group">Mertz Group</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          {/* Apply Filter Button */}
          <Button
            onClick={onApplyFilter}
            className="px-6 py-2 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
          >
            Apply filter
          </Button>
          <Button
            onClick={onPrint}
            variant="ghost"
            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <Printer className="w-4 h-4" />
            Print
          </Button>
        </div>
      </div>
    </div>
  );
}
