import { OperationsTour } from "@/app/(main)/direct-sales/operations-board/page";

export const getStatusStyles = (status: OperationsTour["status"]) => {
  switch (status) {
    case "Pre-departure":
      return "bg-blue-500 text-white";
    case "In progress":
      return "bg-green-500 text-white";
    case "Completed":
      return "bg-gray-400 text-white";
    case "Cancelled":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-200 text-gray-800";
  }
};
