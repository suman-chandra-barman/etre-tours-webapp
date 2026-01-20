"use client";

import { useState } from "react";
import StatCard from "../Cards/StatCard";

type TimePeriod = "Week" | "Month" | "Quarter" | "Year";

export default function StatsSection() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("Week");
  const periods: TimePeriod[] = ["Week", "Month", "Quarter", "Year"];

  // Sample data - replace with actual data
  const stats = {
    directSales: { value: "$850.00", change: "9.4%", isPositive: true },
    cruiseOperation: { value: "$4,280.00", change: "36%", isPositive: true },
    partnerBooking: { value: "$875.99", change: "1.36%", isPositive: true },
    totalSales: { value: "$6,005.37", change: "121.2%", isPositive: true },
    transport: { value: "$850.00" },
    serviceProviderFee: { value: "$400.00" },
    totalCost: { value: "$1,250.00" },
    netProfit: { value: "$1,615.88", change: "26.9%", isPositive: true },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* Period Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-6">
        {periods.map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
              selectedPeriod === period
                ? "text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {period}
            {selectedPeriod === period && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        ))}
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

        {/* Row 2 */}
        <StatCard label="TRANSPORT" value={stats.transport.value} />
        <StatCard
          label="SERVICE PROVIDER FEE"
          value={stats.serviceProviderFee.value}
        />
        <StatCard label="TOTAL COST" value={stats.totalCost.value} />
        <StatCard
          label="NET PROFIT"
          value={stats.netProfit.value}
          change={stats.netProfit.change}
          isPositive={stats.netProfit.isPositive}
        />
      </div>
    </div>
  );
}
