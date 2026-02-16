import { OperationsTour } from "@/app/(main)/direct-sales/page";

export const getStatusStyles = (status: OperationsTour["status"]) => {
  switch (status) {
    case "Pre-departure":
      return "bg-blue-600 text-white font-bold";
    case "In progress":
      return "bg-green-600 text-white font-bold";
    case "Completed":
      return "bg-gray-500 text-white font-bold";
    case "Cancelled":
      return "bg-red-600 text-white font-bold";
    default:
      return "bg-gray-200 text-gray-800";
  }
};
