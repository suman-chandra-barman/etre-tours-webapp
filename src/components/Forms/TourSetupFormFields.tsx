"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface TourSetupFormFieldsProps {
  tourSpotName: string;
  departureFrom: string;
  adultPerHead: string;
  childrenPerHead: string;
  subContractorCompany: string;
  extraGuide: string;
  paymentMethod: "cards" | "cash" | "both";
  acceptBoth: boolean;
  onTourSpotNameChange: (value: string) => void;
  onDepartureFromChange: (value: string) => void;
  onAdultPerHeadChange: (value: string) => void;
  onChildrenPerHeadChange: (value: string) => void;
  onSubContractorCompanyChange: (value: string) => void;
  onExtraGuideChange: (value: string) => void;
  onPaymentMethodClick: (method: "cards" | "cash") => void;
  onAcceptBothChange: (checked: boolean) => void;
}

const TourSetupFormFields = ({
  tourSpotName,
  departureFrom,
  adultPerHead,
  childrenPerHead,
  subContractorCompany,
  extraGuide,
  paymentMethod,
  acceptBoth,
  onTourSpotNameChange,
  onDepartureFromChange,
  onAdultPerHeadChange,
  onChildrenPerHeadChange,
  onSubContractorCompanyChange,
  onExtraGuideChange,
  onPaymentMethodClick,
  onAcceptBothChange,
}: TourSetupFormFieldsProps) => {
  return (
    <div className="space-y-6">
      {/* Basic Details */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-500">Basic Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tour-spot-name" className="text-sm text-gray-700">
              Tour Spot Name
            </Label>
            <Input
              id="tour-spot-name"
              placeholder="Demo Tour"
              value={tourSpotName}
              onChange={(e) => onTourSpotNameChange(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="departure-from" className="text-sm text-gray-700">
              Departure From
            </Label>
            <Input
              id="departure-from"
              placeholder="Test Departure"
              value={departureFrom}
              onChange={(e) => onDepartureFromChange(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-500">Pricing</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="adult-per-head" className="text-sm text-gray-700">
              Adult per Head
            </Label>
            <Input
              id="adult-per-head"
              placeholder="$320"
              value={adultPerHead}
              onChange={(e) => onAdultPerHeadChange(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="children-per-head"
              className="text-sm text-gray-700"
            >
              Children per Head
            </Label>
            <Input
              id="children-per-head"
              placeholder="$150"
              value={childrenPerHead}
              onChange={(e) => onChildrenPerHeadChange(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Cost */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-500">Cost</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sub-contractor" className="text-sm text-gray-700">
              Sub-contractor Company
            </Label>
            <Input
              id="sub-contractor"
              placeholder="$800"
              value={subContractorCompany}
              onChange={(e) => onSubContractorCompanyChange(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="extra-guide" className="text-sm text-gray-700">
              Extra Guide
            </Label>
            <Input
              id="extra-guide"
              placeholder="$120"
              value={extraGuide}
              onChange={(e) => onExtraGuideChange(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-500">
          Payment Methods for the tour
        </h3>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant={
              paymentMethod === "cards" || paymentMethod === "both"
                ? "default"
                : "outline"
            }
            onClick={() => onPaymentMethodClick("cards")}
            disabled={acceptBoth}
            className="rounded-full px-6"
          >
            Cards
          </Button>
          <Button
            type="button"
            variant={
              paymentMethod === "cash" || paymentMethod === "both"
                ? "default"
                : "outline"
            }
            onClick={() => onPaymentMethodClick("cash")}
            disabled={acceptBoth}
            className="rounded-full px-6"
          >
            Cash
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Switch
            id="accept-both"
            checked={acceptBoth}
            onCheckedChange={onAcceptBothChange}
          />
          <Label
            htmlFor="accept-both"
            className="text-sm text-gray-600 font-normal cursor-pointer"
          >
            Accept both of them
          </Label>
        </div>
      </div>
    </div>
  );
};

export default TourSetupFormFields;
