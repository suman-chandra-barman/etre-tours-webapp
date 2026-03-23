"use client";

import { useState } from "react";
import StatCard from "../Cards/StatCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TimePeriod = "Week" | "Month" | "Quarter" | "Year";

export default function StatsSection() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("Week");
  const periods: TimePeriod[] = ["Week", "Month", "Quarter", "Year"];

  // Sample data by period - replace with actual data
  const statsByPeriod: Record<
    TimePeriod,
    {
      directSales: { value: string; change: string; isPositive: boolean };
      cruiseOperation: { value: string; change: string; isPositive: boolean };
      partnerBooking: { value: string; change: string; isPositive: boolean };
      totalSales: { value: string; change: string; isPositive: boolean };
    }
  > = {
    Week: {
      directSales: { value: "$850.00", change: "9.4%", isPositive: true },
      cruiseOperation: { value: "$4,280.00", change: "36%", isPositive: true },
      partnerBooking: { value: "$875.99", change: "1.36%", isPositive: true },
      totalSales: { value: "$6,005.37", change: "121.2%", isPositive: true },
    },
    Month: {
      directSales: { value: "$3,490.00", change: "12.8%", isPositive: true },
      cruiseOperation: {
        value: "$16,220.00",
        change: "29.3%",
        isPositive: true,
      },
      partnerBooking: { value: "$4,105.50", change: "4.9%", isPositive: true },
      totalSales: { value: "$23,815.50", change: "18.7%", isPositive: true },
    },
    Quarter: {
      directSales: { value: "$10,280.00", change: "7.6%", isPositive: true },
      cruiseOperation: {
        value: "$47,900.00",
        change: "22.1%",
        isPositive: true,
      },
      partnerBooking: { value: "$11,760.40", change: "2.4%", isPositive: true },
      totalSales: { value: "$69,940.40", change: "15.3%", isPositive: true },
    },
    Year: {
      directSales: { value: "$41,360.00", change: "3.1%", isPositive: true },
      cruiseOperation: {
        value: "$188,400.00",
        change: "17.9%",
        isPositive: true,
      },
      partnerBooking: { value: "$49,220.00", change: "1.8%", isPositive: true },
      totalSales: { value: "$278,980.00", change: "12.4%", isPositive: true },
    },
  };

  const stats = statsByPeriod[selectedPeriod];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* Period Select */}
      <div className="mb-6">
        <label
          htmlFor="stats-period"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Time Period
        </label>
        <Tabs
          value={selectedPeriod}
          onValueChange={(value) => setSelectedPeriod(value as TimePeriod)}
        >
          <TabsList
            id="stats-period"
            className="bg-gray-100 rounded-full"
          >
            {periods.map((period) => (
              <TabsTrigger key={period} value={period} className="rounded-full">
                {period}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Row 1 */}
        <StatCard
          label="DIRECT SALES"
          value={stats.directSales.value}
          change={stats.directSales.change}
          isPositive={stats.directSales.isPositive}
        />
        <StatCard
          label="CRUISE OPERATION"
          value={stats.cruiseOperation.value}
          change={stats.cruiseOperation.change}
          isPositive={stats.cruiseOperation.isPositive}
        />
        <StatCard
          label="PARTNER BOOKING"
          value={stats.partnerBooking.value}
          change={stats.partnerBooking.change}
          isPositive={stats.partnerBooking.isPositive}
        />
        <StatCard
          label="TOTAL SALES"
          value={stats.totalSales.value}
          change={stats.totalSales.change}
          isPositive={stats.totalSales.isPositive}
        />
      </div>
    </div>
  );
}
