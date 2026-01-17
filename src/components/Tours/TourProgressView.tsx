"use client";

import { useState } from "react";
import {
  CheckCircle,
  Bus,
  Home,
  Smile,
  Baby,
  Gift,
  Users,
  ChevronRight,
} from "lucide-react";
import CancelTourModal from "@/components/Modals/CancelTourModal";

interface TourProgressViewProps {
  tourData: {
    destination: string;
    from: string;
    startDateAndTime: string;
    operator: string;
    operatorCompany?: string;
    registrationNumber?: string;
    availableSeats?: number;
    driver?: string;
    guide?: string;
    extraGuide?: string;
  };
  onCancelTour?: () => void;
  onNextStep?: () => void;
  currentStep?: "pre-departure" | "in-progress" | "completed";
}

const TourProgressView = ({
  tourData,
  onCancelTour,
  onNextStep,
  currentStep = "pre-departure",
}: TourProgressViewProps) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const steps = [
    { key: "pre-departure", label: "Pre-departure", icon: CheckCircle },
    { key: "in-progress", label: "In-progress", icon: Bus },
    { key: "completed", label: "Completed", icon: Home },
  ];

  const getStepIndex = (step: string) => steps.findIndex((s) => s.key === step);
  const currentStepIndex = getStepIndex(currentStep);

  const handleCancelTour = (reason: string) => {
    console.log("Tour cancellation reason:", reason);
    if (onCancelTour) {
      onCancelTour();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Tour Details Header */}
      <div className="p-4 md:p-6 border-b">
        <h2 className="text-2xl font-semibold mb-2">{tourData.destination}</h2>
        <p className="text-gray-600 text-sm">
          <span className="font-medium">From:</span> {tourData.from} ,{" "}
          <span className="ml-2 font-medium">Time:</span>{" "}
          {tourData.startDateAndTime}{" "}
          <span className="ml-2 font-medium">with</span> {tourData.operator}
        </p>
      </div>

      {/* Progress Tracker */}
      <div className="p-4 md:p-6 border-b">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index <= currentStepIndex;
            const isActive = index === currentStepIndex;

            return (
              <div key={step.key} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`mt-2 text-sm ${
                      isActive ? "font-medium text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className="flex-1 h-0.5 mx-2 relative"
                    style={{ top: "-20px" }}
                  >
                    <div
                      className={`h-full ${
                        index < currentStepIndex
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                      style={{
                        borderTop: "2px dashed",
                        borderColor:
                          index < currentStepIndex ? "#10b981" : "#d1d5db",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Setup Transport Details */}
      <div className="p-4 md:p-6">
        <h3 className="text-lg font-medium mb-4">Setup Transport</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Operator */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Operator</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
              value={tourData.operatorCompany || "Island Transport Ltd."}
              readOnly
            />
          </div>

          {/* Registration Number */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Registration Number
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
              value={tourData.registrationNumber || "ML57 GNX"}
              readOnly
            />
          </div>

          {/* Number of Seats */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Number of Seats
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
              value={`${tourData.availableSeats || 36} available`}
              readOnly
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Assign Driver */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Assign Driver
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
              value={tourData.driver || "Sep 4, 2021 at 8:30 pm"}
              readOnly
            />
          </div>

          {/* Assign Guide */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Assign Guide
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
              value={tourData.guide || "Robert Hook"}
              readOnly
            />
          </div>

          {/* Extra Guide */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Extra Guide
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
              value={tourData.extraGuide || "Daniel"}
              readOnly
            />
          </div>
        </div>

        {/* Tickets Count */}
        <div className="mt-6 mb-6">
          <h3 className="text-lg font-medium mb-4">Tickets Count</h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold">00</span>
              <span className="text-sm text-gray-600">Adult</span>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold">00</span>
              <span className="text-sm text-gray-600">Children</span>
              <Smile className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold">00</span>
              <span className="text-sm text-gray-600">Infant</span>
              <Baby className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold">00</span>
              <span className="text-sm text-gray-600">FOC</span>
              <Gift className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Accept Cards & Cash Toggle */}
        <div className="flex items-center gap-3 mb-6">
          <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500">
            <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
          </button>
          <span className="text-sm text-gray-700">Accept Cards & Cash</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setIsCancelModalOpen(true)}
            className="px-6 py-2 border border-red-300 text-red-500 rounded-full text-sm hover:bg-red-50 transition-colors"
          >
            Cancel the tour
          </button>
          <button
            onClick={onNextStep}
            className="px-6 py-2 bg-white border border-gray-900 text-gray-900 rounded-full text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            On the way
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cancel Tour Modal */}
      <CancelTourModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onSubmit={handleCancelTour}
      />
    </div>
  );
};

export default TourProgressView;
