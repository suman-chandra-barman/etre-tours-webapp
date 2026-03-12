import { TourStatus } from "@/constants";

export interface TourHistoryItem {
  id: number;
  dateTime: string;
  returnTime: string;
  tour: string;
  tourCode: string;
  subContractor: string;
  totalPax: number;
  totalSets: number;
  vacancy: number;
  driver: string;
  allTransport: string;
  guide: string;
  tourStatus: "Pre-departure" | "In-progress" | "Completed" | "Cancelled";
  note?: string;
}

export type TourTabType = "Cruise Sales" | "Partner Sales";
export type MyTourTabType = "All" | "Boat" | "Vehicle";


// Tour data type for operations board
export interface OperationsTour {
  id: number;
  departureDate: string;
  departureTime: string;
  returnDate: string;
  returnTime: string;
  tourName: string;
  tourCode: string;
  status: TourStatus;
  transportType: "bus" | "boat";
  transportContractor: string;
  vehicleNumber: string;
  seatsSold: number;
  seatsAvailable: number;
  numberOfSeats: number;
  driver: string;
  vehicle: string;
  guide: string;
  extraGuide?: string;
  adult?: number;
  child?: number;
  infants?: number;
  foc?: number;
}