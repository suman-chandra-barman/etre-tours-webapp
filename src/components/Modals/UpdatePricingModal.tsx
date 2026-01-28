"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UpdatePricingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdatePricingModal({
  open,
  onOpenChange,
}: UpdatePricingModalProps) {
  const [activeTab, setActiveTab] = useState("monthly");
  const [monthlyPrice, setMonthlyPrice] = useState("$320");
  const [monthlyGrayPrice, setMonthlyGrayPrice] = useState("$150");
  const [annuallyPrice, setAnnuallyPrice] = useState("");
  const [annuallyGrayPrice, setAnnuallyGrayPrice] = useState("");

  const handleSaveChanges = () => {
    // Handle save logic here
    console.log("Saving pricing changes:", {
      monthly: {
        regularPrice: monthlyPrice,
        grayPrice: monthlyGrayPrice,
      },
      annually: {
        regularPrice: annuallyPrice,
        grayPrice: annuallyGrayPrice,
      },
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Subscription Pricing
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annually">Annually</TabsTrigger>
            </TabsList>

            <TabsContent value="monthly" className="mt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="monthly-regular-price" className="text-sm">
                    Regular Price
                  </Label>
                  <Input
                    id="monthly-regular-price"
                    type="text"
                    placeholder="$320"
                    value={monthlyPrice}
                    onChange={(e) => setMonthlyPrice(e.target.value)}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="monthly-gray-price"
                    className="text-sm text-gray-500"
                  >
                    Gray Price (Optional)
                  </Label>
                  <Input
                    id="monthly-gray-price"
                    type="text"
                    placeholder="$150"
                    value={monthlyGrayPrice}
                    onChange={(e) => setMonthlyGrayPrice(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="annually" className="mt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="annually-regular-price" className="text-sm">
                    Regular Price
                  </Label>
                  <Input
                    id="annually-regular-price"
                    type="text"
                    placeholder="$320"
                    value={annuallyPrice}
                    onChange={(e) => setAnnuallyPrice(e.target.value)}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="annually-gray-price"
                    className="text-sm text-gray-500"
                  >
                    Gray Price (Optional)
                  </Label>
                  <Input
                    id="annually-gray-price"
                    type="text"
                    placeholder="$150"
                    value={annuallyGrayPrice}
                    onChange={(e) => setAnnuallyGrayPrice(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="px-6 rounded-full"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveChanges}
              className="px-6 bg-blue-500 hover:bg-blue-600 rounded-full"
            >
              Save changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
