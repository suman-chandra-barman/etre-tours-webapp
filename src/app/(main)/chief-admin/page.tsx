import StatsSection from "@/components/ChiefAdmin/StatsSection";
import PopularToursSection from "@/components/ChiefAdmin/PopularToursSection";
import SubContractorSection from "@/components/ChiefAdmin/SubContractorSection";

function ChiefAdminPage() {
  return (
    <main className="bg-linear-to-br from-blue-50 via-white to-blue-50 p-4 overflow-y-auto">
      <div className="space-y-4">
        {/* Stats Section */}
        <StatsSection />

        {/* Two Column Layout for Lower Sections */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Popular Tours Section */}
          <PopularToursSection />

          {/* Sub-Contractor Section */}
          <SubContractorSection />
        </div>
      </div>
    </main>
  );
}

export default ChiefAdminPage;
