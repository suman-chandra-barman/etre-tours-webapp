"use client";

import { useState } from "react";
import {
  Calendar,
  ChevronsLeft,
  ChevronsRight,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import CreateNewPartnerTourModal from "../Modals/CreateNewPartnerTourModal";
import ProgressTracker from "../Tours/ProgressTracker";

interface PartnerTourSetupFormProps {
  tourData?: {
    destination: string;
    from: string;
    startDateAndTime: string;
    operator: string;
  };
  onMakeTickets?: () => void;
  onConfirmDeparture?: () => void;
}

const PartnerTourSetupForm = ({
  tourData,
  onMakeTickets,
  onConfirmDeparture,
}: PartnerTourSetupFormProps) => {
  const [activeTab, setActiveTab] = useState<"boat" | "vehicle">("vehicle");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    "pre-departure" | "in-progress" | "completed"
  >("pre-departure");

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost">
              <ChevronsLeft className="w-5 h-5" />
            </Button>
            <Button variant="ghost">
              <ChevronsRight className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="font-medium">Today</span>
              <span className="text-gray-600">Tuesday, Nov 21, 2025</span>
              <Calendar className="w-5 h-5 text-gray-400 ml-2" />
            </div>
          </div>
          <Button variant="outline" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4" /> New tour
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b">
          <button
            onClick={() => setActiveTab("boat")}
            className={`pb-2 px-1 text-sm font-medium ${
              activeTab === "boat"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            By boat
          </button>
          <button
            onClick={() => setActiveTab("vehicle")}
            className={`pb-2 px-1 text-sm font-medium ${
              activeTab === "vehicle"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            By Vehicle
          </button>
        </div>
      </div>

      {/* Tour Details */}
      <div className="mt-4">
        <h2 className="text-2xl font-semibold mb-2">
          {tourData?.destination || "Lagoon Snokeling"}
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          <span className="font-medium">From:</span>{" "}
          {tourData?.from || "Los Angeles"} ,
          <span className="ml-2 font-medium">Time:</span>{" "}
          {tourData?.startDateAndTime || "Sep 4, 2021 at 12:14 am -8:30 pm"}
          <span className="ml-2 font-medium">with</span>{" "}
          {tourData?.operator || "Expedia LLC"}
        </p>
      </div>

      {/* Progress Tracker */}
      <ProgressTracker currentStep={currentStep} />

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 p-4 bg-gray-100">
        <Button
          variant="ghost"
          className="text-red-500  hover:text-red-600 hover:bg-red-50"
        >
          Delete
        </Button>
        <Separator className="h-10!" orientation="vertical" />
        <Button
          variant="outline"
          onClick={onConfirmDeparture}
          className="border rounded-full  hover:bg-gray-50"
        >
          Confirm departure
        </Button>
        <Button
          onClick={onMakeTickets}
          className=" bg-blue-500 rounded-full hover:bg-blue-600"
        >
          Make tickets
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Create New Tour Modal */}
      <CreateNewPartnerTourModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
};

export default PartnerTourSetupForm;
