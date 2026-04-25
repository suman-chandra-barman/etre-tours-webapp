"use client";

import { useMemo, useState } from "react";
import { Pen, Trash2 } from "lucide-react";
import EditAdminTourModal, {
  EditAdminTourFormState,
} from "@/components/Modals/EditAdminTourModal";
import AdminTourSetupModal, {
  AdminTourPayload,
  TourCurrency,
} from "@/components/Modals/AdminTourSetupModal";
import { Button } from "@/components/ui/button";

type StationFilter =
  | "All tours"
  | "Direct Sales"
  | "Cruise Sales"
  | "Partner Sales";

type TourRow = {
  id: number;
  tourName: string;
  station: Exclude<StationFilter, "All tours">;
  currency: TourCurrency;
  tourDurationHours: number;
  tourDurationMinutes: 15 | 30 | 45;
  adultPrice: number;
  childPrice: number;
  transportAdult: number;
  transportChild: number;
};

const filterItems: StationFilter[] = [
  "All tours",
  "Direct Sales",
  "Cruise Sales",
  "Partner Sales",
];

const initialRows: TourRow[] = [
  {
    id: 1,
    tourName: "Lagoon Dive",
    station: "Direct Sales",
    currency: "xpf",
    tourDurationHours: 2,
    tourDurationMinutes: 15,
    adultPrice: 12000,
    childPrice: 8000,
    transportAdult: 3000,
    transportChild: 2000,
  },
  {
    id: 2,
    tourName: "Circle Island",
    station: "Cruise Sales",
    currency: "usd",
    tourDurationHours: 3,
    tourDurationMinutes: 30,
    adultPrice: 15500,
    childPrice: 9500,
    transportAdult: 3500,
    transportChild: 2500,
  },
  {
    id: 3,
    tourName: "Fishing day",
    station: "Partner Sales",
    currency: "aud",
    tourDurationHours: 4,
    tourDurationMinutes: 45,
    adultPrice: 11000,
    childPrice: 7000,
    transportAdult: 2800,
    transportChild: 1800,
  },
];

const emptyEditForm: EditAdminTourFormState = {
  station: "",
  currency: "xpf",
  tourName: "",
  tourDurationHours: "",
  tourDurationMinutes: "15",
  adultPrice: "",
  childPrice: "",
  transportAdult: "",
  transportChild: "",
};

const currencyLabel: Record<TourCurrency, string> = {
  xpf: "XPF",
  usd: "USD",
  aud: "AUD",
  euro: "EURO",
};

const formatTourPrice = (currency: TourCurrency, value: number) =>
  `${currencyLabel[currency]} ${value.toLocaleString()}`;

export default function AdminToursPage() {
  const [activeFilter, setActiveFilter] = useState<StationFilter>("All tours");
  const [rows, setRows] = useState<TourRow[]>(initialRows);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [editForm, setEditForm] =
    useState<EditAdminTourFormState>(emptyEditForm);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredRows = useMemo(() => {
    if (activeFilter === "All tours") {
      return rows;
    }

    return rows.filter((row) => row.station === activeFilter);
  }, [activeFilter, rows]);

  const handleDelete = (id: number) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
    if (editingRowId === id) {
      setIsEditModalOpen(false);
      setEditingRowId(null);
      setEditForm(emptyEditForm);
    }
  };

  const handleEdit = (id: number) => {
    const target = rows.find((row) => row.id === id);
    if (!target) {
      return;
    }

    setEditingRowId(target.id);
    setEditForm({
      station: target.station,
      currency: target.currency,
      tourName: target.tourName,
      tourDurationHours: String(target.tourDurationHours),
      tourDurationMinutes: String(target.tourDurationMinutes),
      adultPrice: String(target.adultPrice),
      childPrice: String(target.childPrice),
      transportAdult: String(target.transportAdult),
      transportChild: String(target.transportChild),
    });
    setIsEditModalOpen(true);
  };

  const handleEditFieldChange = (
    field: keyof EditAdminTourFormState,
    value: string,
  ) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateTour = (tour: AdminTourPayload) => {
    const nextId =
      rows.length === 0 ? 1 : Math.max(...rows.map((row) => row.id)) + 1;

    setRows((prev) => [
      ...prev,
      {
        id: nextId,
        tourName: tour.tourName,
        station: tour.station,
        currency: tour.currency,
        tourDurationHours: tour.tourDurationHours,
        tourDurationMinutes: tour.tourDurationMinutes,
        adultPrice: tour.adultPrice,
        childPrice: tour.childPrice,
        transportAdult: tour.transportAdult,
        transportChild: tour.transportChild,
      },
    ]);
  };

  const handleSaveTour = () => {
    if (editingRowId === null) {
      return;
    }

    const station = editForm.station as Exclude<StationFilter, "All tours">;
    const currency = editForm.currency;
    const tourDurationHours = Number(editForm.tourDurationHours);
    const tourDurationMinutes = Number(editForm.tourDurationMinutes);
    const adultPrice = Number(editForm.adultPrice);
    const childPrice = Number(editForm.childPrice);
    const transportAdult = Number(editForm.transportAdult);
    const transportChild = Number(editForm.transportChild);

    const hasMissingRequiredValue =
      !editForm.station || !editForm.tourName.trim();
    const hasInvalidMinutes = ![15, 30, 45].includes(tourDurationMinutes);

    if (
      hasMissingRequiredValue ||
      hasInvalidMinutes ||
      [
        tourDurationHours,
        adultPrice,
        childPrice,
        transportAdult,
        transportChild,
      ].some((value) => Number.isNaN(value) || value < 0)
    ) {
      return;
    }

    setRows((prev) =>
      prev.map((row) =>
        row.id === editingRowId
          ? {
              ...row,
              station,
              currency,
              tourName: editForm.tourName.trim(),
              tourDurationHours,
              tourDurationMinutes: tourDurationMinutes as 15 | 30 | 45,
              adultPrice,
              childPrice,
              transportAdult,
              transportChild,
            }
          : row,
      ),
    );

    setIsEditModalOpen(false);
    setEditingRowId(null);
    setEditForm(emptyEditForm);
  };

  return (
    <main className="p-4 sm:p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Manage tours</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full"
        >
          Create new tour
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200 p-3 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <p className="text-base font-semibold text-gray-800 shrink-0">
              Show (Filter)
            </p>

            <div className="flex flex-wrap items-center gap-2">
              {filterItems.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                    activeFilter === filter
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-250 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th
                  rowSpan={2}
                  className="border border-gray-400 px-3 py-2 text-left text-2xs sm:text-sm font-semibold text-gray-900"
                >
                  Tour name
                </th>
                <th
                  rowSpan={2}
                  className="border border-gray-400 px-3 py-2 text-left text-2xs sm:text-sm font-semibold text-gray-900"
                >
                  Station
                </th>
                <th
                  rowSpan={2}
                  className="border border-gray-400 px-3 py-2 text-left text-2xs sm:text-sm font-semibold text-gray-900"
                >
                  Tour duration
                </th>
                <th
                  colSpan={2}
                  className="border border-gray-400 px-3 py-2 text-center text-2xs sm:text-sm font-semibold text-gray-900"
                >
                  Sales Price
                </th>
                <th
                  colSpan={2}
                  className="border border-gray-400 px-3 py-2 text-center text-2xs sm:text-sm font-semibold text-gray-900"
                >
                  Contractor&apos;s Price
                </th>
                <th
                  rowSpan={2}
                  className="border border-gray-400 px-3 py-2 text-center text-2xs sm:text-sm font-semibold text-gray-900"
                >
                  Action
                </th>
              </tr>
              <tr className="bg-gray-50">
                <th className="border border-gray-400 px-3 py-2 text-left text-2xs sm:text-sm font-semibold text-gray-900">
                  Adult price
                </th>
                <th className="border border-gray-400 px-3 py-2 text-left text-2xs sm:text-sm font-semibold text-gray-900">
                  Child price
                </th>
                <th className="border border-gray-400 px-3 py-2 text-left text-2xs sm:text-sm font-semibold text-gray-900">
                  Transport Adult
                </th>
                <th className="border border-gray-400 px-3 py-2 text-left text-2xs sm:text-sm font-semibold text-gray-900">
                  Transport Child
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.id} className="odd:bg-white even:bg-gray-50/60">
                  <td className="border border-gray-300 px-3 py-2 text-xs sm:text-sm font-medium text-gray-900">
                    {row.tourName}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-xs sm:text-sm text-gray-800">
                    {row.station}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-xs sm:text-sm text-gray-800">
                    {`${row.tourDurationHours}h ${row.tourDurationMinutes}m`}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-xs sm:text-sm text-gray-800">
                    {formatTourPrice(row.currency, row.adultPrice)}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-xs sm:text-sm text-gray-800">
                    {formatTourPrice(row.currency, row.childPrice)}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-xs sm:text-sm text-gray-800">
                    {formatTourPrice(row.currency, row.transportAdult)}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-xs sm:text-sm text-gray-800">
                    {formatTourPrice(row.currency, row.transportChild)}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(row.id)}
                        className="inline-flex items-center gap-1 rounded-md border border-blue-300 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
                      >
                        <Pen className="h-3.5 w-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(row.id)}
                        className="inline-flex items-center gap-1 rounded-md border border-red-300 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredRows.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="border border-gray-300 px-3 py-5 text-center text-sm text-gray-500"
                  >
                    No tours found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AdminTourSetupModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onCreateTour={handleCreateTour}
      />
      <EditAdminTourModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        form={editForm}
        onFieldChange={handleEditFieldChange}
        onSave={handleSaveTour}
      />
    </main>
  );
}
