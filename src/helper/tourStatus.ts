import { OperationsTour } from "@/app/(main)/direct-sales/page";
import { tourStatus } from "@/constants";

export const getStatusStyles = (status: OperationsTour["status"]) => {
  switch (status) {
    case tourStatus.PRE_DEPARTURE:
      return "bg-blue-600 text-white font-bold";
    case tourStatus.IN_PROGRESS:
      return "bg-green-600 text-white font-bold";
    case tourStatus.COMPLETED:
      return "bg-gray-500 text-white font-bold";
    case tourStatus.CANCELLED:
      return "bg-red-600 text-white font-bold";
    default:
      return "bg-gray-200 text-gray-800";
  }
};
