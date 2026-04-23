"use client";

import { useMemo, useState } from "react";
import { Pen, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type StationFilter =
  | "All tours"
  | "Direct Sales"
  | "Cruise Sales"
  | "Partner Sales";

type VoucherRow = {
  id: number;
  tourName: string;
  station: Exclude<StationFilter, "All tours">;
  adultPrice: number;
  childPrice: number;
  transportAdult: number;
  transportChild: number;
};

type PriceFormState = {
  adultPrice: string;
  childPrice: string;
  transportAdult: string;
  transportChild: string;
};

const filterItems: StationFilter[] = [
  "All tours",
  "Direct Sales",
  "Cruise Sales",
  "Partner Sales",
];

const initialRows: VoucherRow[] = [
  {
    id: 1,
    tourName: "Lagoon Dive",
    station: "Direct Sales",
    adultPrice: 12000,
    childPrice: 8000,
    transportAdult: 3000,
    transportChild: 2000,
  },
  {
    id: 2,
    tourName: "Circle Island",
    station: "Cruise Sales",
    adultPrice: 15500,
    childPrice: 9500,
    transportAdult: 3500,
    transportChild: 2500,
  },
  {
    id: 3,
    tourName: "Fishing day",
    station: "Partner Sales",
    adultPrice: 11000,
    childPrice: 7000,
    transportAdult: 2800,
    transportChild: 1800,
  },
];

const emptyPriceForm: PriceFormState = {
  adultPrice: "",
  childPrice: "",
  transportAdult: "",
  transportChild: "",
};

const formatXpfPrice = (value: number) => `XPF ${value.toLocaleString()}`;

export default function AdminVouchersPage() {
  const [activeFilter, setActiveFilter] = useState<StationFilter>("All tours");
  const [rows, setRows] = useState<VoucherRow[]>(initialRows);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [priceForm, setPriceForm] = useState<PriceFormState>(emptyPriceForm);

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
      setPriceForm(emptyPriceForm);
    }
  };

  const handleEdit = (id: number) => {
    const target = rows.find((row) => row.id === id);
    if (!target) {
      return;
    }

    setEditingRowId(target.id);
    setPriceForm({
      adultPrice: String(target.adultPrice),
      childPrice: String(target.childPrice),
      transportAdult: String(target.transportAdult),
      transportChild: String(target.transportChild),
    });
    setIsEditModalOpen(true);
  };

  const handlePriceChange = (field: keyof PriceFormState, value: string) => {
    setPriceForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSavePrices = () => {
    if (!editingRowId) {
      return;
    }

    const adultPrice = Number(priceForm.adultPrice);
    const childPrice = Number(priceForm.childPrice);
    const transportAdult = Number(priceForm.transportAdult);
    const transportChild = Number(priceForm.transportChild);

    if (
      [adultPrice, childPrice, transportAdult, transportChild].some(
        (value) => Number.isNaN(value) || value < 0,
      )
    ) {
      return;
    }

    setRows((prev) =>
      prev.map((row) =>
        row.id === editingRowId
          ? {
              ...row,
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
    setPriceForm(emptyPriceForm);
  };

  const selectedRow =
    editingRowId === null
      ? null
      : (rows.find((row) => row.id === editingRowId) ?? null);

  return (
    <main className="p-4 sm:p-6 overflow-y-auto">
      <h1 className="text-2xl lg:text-3xl font-bold mb-6">Vouchers</h1>

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
                    {formatXpfPrice(row.adultPrice)}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-xs sm:text-sm text-gray-800">
                    {formatXpfPrice(row.childPrice)}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-xs sm:text-sm text-gray-800">
                    {formatXpfPrice(row.transportAdult)}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-xs sm:text-sm text-gray-800">
                    {formatXpfPrice(row.transportChild)}
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
                    colSpan={7}
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

      <Dialog
        open={isEditModalOpen}
        onOpenChange={(open) => {
          setIsEditModalOpen(open);
          if (!open) {
            setEditingRowId(null);
            setPriceForm(emptyPriceForm);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Voucher Prices</DialogTitle>
            <DialogDescription>
              Update Adult, Child, Transport Adult, and Transport Child prices
              for {selectedRow?.tourName ?? "selected tour"}.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-800">Adult price</p>
              <Input
                type="number"
                min={0}
                value={priceForm.adultPrice}
                onChange={(e) =>
                  handlePriceChange("adultPrice", e.target.value)
                }
                placeholder="e.g. 12000"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-800">Child price</p>
              <Input
                type="number"
                min={0}
                value={priceForm.childPrice}
                onChange={(e) =>
                  handlePriceChange("childPrice", e.target.value)
                }
                placeholder="e.g. 8000"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-800">
                Transport Adult
              </p>
              <Input
                type="number"
                min={0}
                value={priceForm.transportAdult}
                onChange={(e) =>
                  handlePriceChange("transportAdult", e.target.value)
                }
                placeholder="e.g. 3000"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-800">
                Transport Child
              </p>
              <Input
                type="number"
                min={0}
                value={priceForm.transportChild}
                onChange={(e) =>
                  handlePriceChange("transportChild", e.target.value)
                }
                placeholder="e.g. 2000"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditModalOpen(false);
                setEditingRowId(null);
                setPriceForm(emptyPriceForm);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSavePrices}>Save Prices</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
