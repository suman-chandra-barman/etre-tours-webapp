"use client";

import { useState } from "react";
import Image from "next/image";
import vanIllustration from "@/assets/bus.png";

type TourType = "Vehicle" | "Boats";
interface TouristSpot {
  name: string;
  tourists: number;
}

export default function PopularToursSection() {
  const [selectedType, setSelectedType] = useState<TourType>("Vehicle");

  // Sample data - replace with actual data based on selected type
  const touristSpots: Record<TourType, TouristSpot[]> = {
    Vehicle: [
      { name: "Lagoon Snorkeling", tourists: 2193 },
      { name: "Lagoon Snorkeling", tourists: 2193 },
      { name: "Lagoon Snorkeling", tourists: 2193 },
    ],
    Boats: [
      { name: "Island Hopping", tourists: 1850 },
      { name: "Sunset Cruise", tourists: 1620 },
      { name: "Deep Sea Fishing", tourists: 1340 },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* Header with Tabs */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Popular tours by
        </h3>
        <div className="flex gap-1">
          <button
            onClick={() => setSelectedType("Vehicle")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedType === "Vehicle"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Vehicle
          </button>
          <button
            onClick={() => setSelectedType("Boats")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedType === "Boats"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Boats
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div>
        {/* Bar Chart Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-center mb-6">
          <div className="md:col-span-2">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              82% of tourists are more likely choose transport than boat.
            </h4>

            {/* Gradient Bar */}
            <div className="relative h-8 mb-2">
              <div
                className="h-full rounded"
                style={{
                  background:
                    "linear-gradient(to right, #FFA500, #FFD700, #90EE90, #008000)",
                  width: "82%",
                }}
              />
              <div
                className="absolute right-0 top-0 bottom-0 bg-gray-200 rounded-r"
                style={{ width: "18%" }}
              />
            </div>

            {/* Percentage Markers */}
            <div className="flex justify-between text-xs text-gray-500">
              <span>1</span>
              <span>80%</span>
            </div>
          </div>

          {/* Vehicle/Surfboard Illustration */}
          <div className="col-span-1 flex justify-center">
            <Image src={vanIllustration} alt="Van Illustration" />
          </div>
        </div>

        {/* Top 3 Tourist Spots */}
        <div className="bg-gray-100 rounded-md p-4">
          <h4 className="text-base font-semibold text-gray-900 mb-4">
            Top 3 tourist spots
          </h4>
          <div className="space-y-3">
            {touristSpots[selectedType].map((spot, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="text-gray-700">{spot.name}</span>
                <span className="text-blue-400 font-medium">
                  {spot.tourists.toLocaleString()} tourist
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
