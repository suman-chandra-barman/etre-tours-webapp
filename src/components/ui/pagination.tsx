import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
  startIndex?: number;
  endIndex?: number;
  totalItems?: number;
  className?: string;
  maxVisiblePages?: number;
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      showInfo = true,
      startIndex = 0,
      endIndex = 0,
      totalItems = 0,
      className,
      maxVisiblePages = 5,
    },
    ref,
  ) => {
    const getPageNumbers = () => {
      const pages: (number | string)[] = [];

      if (totalPages <= maxVisiblePages) {
        // Show all pages if total is less than max visible
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      // Always show first page
      pages.push(1);

      // Calculate start and end of middle section
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        end = Math.min(maxVisiblePages - 1, totalPages - 1);
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - (maxVisiblePages - 2));
      }

      // Add ellipsis before middle section if needed
      if (start > 2) {
        pages.push("...");
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis after middle section if needed
      if (end < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page if there's more than one page
      if (totalPages > 1) {
        pages.push(totalPages);
      }

      return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white",
          className,
        )}
      >
        {/* Info Section */}
        {showInfo && (
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
            {totalItems} entries
          </div>
        )}

        {/* Pagination Controls */}
        <nav className="flex items-center gap-2" aria-label="Pagination">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
            className={cn(
              "p-2 rounded-lg border border-gray-300 transition-colors",
              "hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            )}
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>

          {/* Page Numbers */}
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-1.5 text-sm text-gray-600"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </span>
              );
            }

            const pageNumber = page as number;
            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                aria-label={`Go to page ${pageNumber}`}
                aria-current={currentPage === pageNumber ? "page" : undefined}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-lg transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                  currentPage === pageNumber
                    ? "bg-blue-600 text-white font-medium"
                    : "border border-gray-300 text-gray-600 hover:bg-gray-50",
                )}
              >
                {pageNumber}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
            className={cn(
              "p-2 rounded-lg border border-gray-300 transition-colors",
              "hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            )}
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </nav>
      </div>
    );
  },
);

Pagination.displayName = "Pagination";

export { Pagination };
