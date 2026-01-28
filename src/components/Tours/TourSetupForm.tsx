"use client";

import { useState } from "react";
import {
  Calendar,
  Users,
  Smile,
  Baby,
  ChevronsLeft,
  ChevronsRight,
  Gift,
  ChevronRight,
  Plus,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import CreateNewTourModal from "../Modals/CreateNewTourModal";
import { Separator } from "../ui/separator";
import ProgressTracker from "./ProgressTracker";

interface TourSetupFormProps {
  tourData?: {
    destination: string;
    from: string;
    startDateAndTime: string;
    operator: string;
  };
  onMakeTickets?: () => void;
  onConfirmDeparture?: () => void;
}

const TourSetupForm = ({
  tourData,
  onMakeTickets,
  onConfirmDeparture,
}: TourSetupFormProps) => {
  const [activeTab, setActiveTab] = useState<"boat" | "vehicle">("vehicle");
  const [acceptCardsAndCash, setAcceptCardsAndCash] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    "pre-departure" | "in-progress" | "completed"
  >("pre-departure");
  const [ticketCounts, setTicketCounts] = useState({
    adults: 0,
    children: 0,
    infant: 0,
    foc: 0,
  });

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

        {/* Progress Tracker */}
        <ProgressTracker currentStep={currentStep} />
        
        {/* Setup Transport */}
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-4">Setup Transport</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Operator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expedia">Expedia LLC</SelectItem>
                  <SelectItem value="booking">Booking.com</SelectItem>
                  <SelectItem value="airbnb">Airbnb Experiences</SelectItem>
                  <SelectItem value="viator">Viator</SelectItem>
                  <SelectItem value="getyourguide">GetYourGuide</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Registration Number" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reg001">ABC-123-XYZ</SelectItem>
                  <SelectItem value="reg002">DEF-456-UVW</SelectItem>
                  <SelectItem value="reg003">GHI-789-RST</SelectItem>
                  <SelectItem value="reg004">JKL-012-PQR</SelectItem>
                  <SelectItem value="reg005">MNO-345-LMN</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Number of Seats"
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Users className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Assign Driver" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="driver1">John Smith</SelectItem>
                  <SelectItem value="driver2">Sarah Johnson</SelectItem>
                  <SelectItem value="driver3">Michael Brown</SelectItem>
                  <SelectItem value="driver4">Emily Davis</SelectItem>
                  <SelectItem value="driver5">David Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Assign Guide" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="guide1">Maria Garcia</SelectItem>
                  <SelectItem value="guide2">James Anderson</SelectItem>
                  <SelectItem value="guide3">Linda Martinez</SelectItem>
                  <SelectItem value="guide4">Robert Taylor</SelectItem>
                  <SelectItem value="guide5">Jennifer Thomas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Extra Guide" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="extra1">Carlos Rodriguez</SelectItem>
                  <SelectItem value="extra2">Patricia Lee</SelectItem>
                  <SelectItem value="extra3">Daniel White</SelectItem>
                  <SelectItem value="extra4">Jessica Harris</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-blue-500 mt-1">
                If you need to add an extra guide. (Optional)
              </p>
            </div>
          </div>
        </div>

        {/* Tickets Count */}
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-4">Tickets Count</h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold">
                {ticketCounts.adults.toString().padStart(2, "0")}
              </span>
              <span className="text-sm text-gray-600">Adult</span>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold">
                {ticketCounts.children.toString().padStart(2, "0")}
              </span>
              <span className="text-sm text-gray-600">Children</span>
              <Smile className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold">
                {ticketCounts.infant.toString().padStart(2, "0")}
              </span>
              <span className="text-sm text-gray-600">Infant</span>
              <Baby className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold">
                {ticketCounts.foc.toString().padStart(2, "0")}
              </span>
              <span className="text-sm text-gray-600">FOC</span>
              <Gift className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Accept Cards & Cash Toggle */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setAcceptCardsAndCash(!acceptCardsAndCash)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              acceptCardsAndCash ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                acceptCardsAndCash ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-sm text-gray-700">Accept Cards & Cash</span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
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
      </div>

      {/* Create New Tour Modal */}
      <CreateNewTourModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default TourSetupForm;
