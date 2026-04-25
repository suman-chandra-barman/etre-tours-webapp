"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Station, TourCurrency } from "./AdminTourSetupModal";

export type EditAdminTourFormState = {
  station: Station | "";
  currency: TourCurrency;
  tourName: string;
  tourDurationHours: string;
  tourDurationMinutes: string;
  adultPrice: string;
  childPrice: string;
  transportAdult: string;
  transportChild: string;
};

interface EditAdminTourModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: EditAdminTourFormState;
  onFieldChange: (field: keyof EditAdminTourFormState, value: string) => void;
  onSave: () => void;
}

export default function EditAdminTourModal({
  open,
  onOpenChange,
  form,
  onFieldChange,
  onSave,
}: EditAdminTourModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:min-w-150 md:max-w-175 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit tour information</DialogTitle>
          <DialogDescription>
            All fields are prefilled from the selected table row. Update any
            value and save changes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-select-station">Station</Label>
              <Select
                value={form.station}
                onValueChange={(value) => onFieldChange("station", value)}
              >
                <SelectTrigger id="edit-select-station" className="w-full">
                  <SelectValue placeholder="Select station" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Direct Sales">Direct Sales</SelectItem>
                  <SelectItem value="Cruise Sales">Cruise Sales</SelectItem>
                  <SelectItem value="Partner Sales">Partner Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-tour-name">Tour name</Label>
              <Input
                id="edit-tour-name"
                value={form.tourName}
                onChange={(event) =>
                  onFieldChange("tourName", event.target.value)
                }
                placeholder="Enter tour name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Tour duration</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <Input
                    id="edit-tour-duration-hours"
                    type="number"
                    min="0"
                    value={form.tourDurationHours}
                    onChange={(event) =>
                      onFieldChange("tourDurationHours", event.target.value)
                    }
                    placeholder="0"
                  />
                  <span className="text-xs text-muted-foreground">Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    id="edit-tour-duration-minutes"
                    type="number"
                    min="0"
                    max="59"
                    value={form.tourDurationMinutes}
                    onChange={(event) =>
                      onFieldChange("tourDurationMinutes", event.target.value)
                    }
                    placeholder="0"
                  />
                  <span className="text-xs text-muted-foreground">Minutes</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-select-currency">Currency</Label>
              <Select
                value={form.currency}
                onValueChange={(value) => onFieldChange("currency", value)}
              >
                <SelectTrigger id="edit-select-currency" className="w-full">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xpf">XPF</SelectItem>
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="aud">AUD</SelectItem>
                  <SelectItem value="euro">EURO</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-adult-price">Adult price</Label>
              <Input
                id="edit-adult-price"
                type="number"
                min={0}
                value={form.adultPrice}
                onChange={(event) =>
                  onFieldChange("adultPrice", event.target.value)
                }
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-child-price">Child price</Label>
              <Input
                id="edit-child-price"
                type="number"
                min={0}
                value={form.childPrice}
                onChange={(event) =>
                  onFieldChange("childPrice", event.target.value)
                }
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-transport-adult">Transport adult</Label>
              <Input
                id="edit-transport-adult"
                type="number"
                min={0}
                value={form.transportAdult}
                onChange={(event) =>
                  onFieldChange("transportAdult", event.target.value)
                }
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-transport-child">Transport child</Label>
              <Input
                id="edit-transport-child"
                type="number"
                min={0}
                value={form.transportChild}
                onChange={(event) =>
                  onFieldChange("transportChild", event.target.value)
                }
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
