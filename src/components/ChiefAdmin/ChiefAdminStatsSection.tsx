"use client";

import StatCard from "../Cards/StatCard";

export default function ChiefAdminStatsSection() {
  // Sample data - replace with actual data
  const stats = {
    totalUsers: { value: "900", change: "9.4%", isPositive: true },
    newUsers: { value: "150"},
    subscriptionCanceled: { value: "50" },
    netProfit: { value: "$1,615.88", change: "26.9%", isPositive: true },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Row 1 */}
        <StatCard
          label="TOTAL USERS"
          value={stats.totalUsers.value}
          change={stats.totalUsers.change}
          isPositive={stats.totalUsers.isPositive}
        />
        <StatCard
          label="NEW USERS"
          value={stats.newUsers.value}
        />
        <StatCard
          label="SUBSCRIPTION CANCELED"
          value={stats.subscriptionCanceled.value}
        />
        <StatCard
          label="TOTAL NET PROFIT"
          value={stats.netProfit.value}
          change={stats.netProfit.change}
          isPositive={stats.netProfit.isPositive}
        />
      </div>
    </div>
  );
}
