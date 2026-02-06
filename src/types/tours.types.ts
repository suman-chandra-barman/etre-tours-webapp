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
