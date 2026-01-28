import RevenueChart from "@/components/ChiefAdmin/RevenueChart";
import ChiefAdminStatsSection from "@/components/ChiefAdmin/ChiefAdminStatsSection";

function ChiefAdminPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50">
      <div className="p-6 space-y-6">
        {/* Stats Section */}
        <ChiefAdminStatsSection />

        {/* Revenue Chart */}
        <RevenueChart />
      </div>
    </main>
  );
}

export default ChiefAdminPage;
