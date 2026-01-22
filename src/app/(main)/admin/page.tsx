import StatsSection from "@/components/ChiefAdmin/StatsSection";
import PopularToursSection from "@/components/ChiefAdmin/PopularToursSection";
import SubContractorSection from "@/components/ChiefAdmin/SubContractorSection";

function AdminPage() {
  return (
    <main className="bg-linear-to-br from-blue-50 via-white to-blue-50 p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Stats Section */}
        <StatsSection />

        {/* Two Column Layout for Lower Sections */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Popular Tours Section */}
          <PopularToursSection />

          {/* Sub-Contractor Section */}
          <SubContractorSection />
        </div>
      </div>
    </main>
  );
}

export default AdminPage;
