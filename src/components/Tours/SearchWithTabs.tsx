/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search } from "lucide-react";
import styles from "@/components/styles/Print.module.css";

interface SearchWithTabsProps {
  searchQuery: string;
  activeTab: any;
  tabs: readonly any[];
  onSearchChange: (query: string) => void;
  onTabChange: (tab: any) => void;
}

export function SearchWithTabs({
  searchQuery,
  activeTab,
  tabs,
  onSearchChange,
  onTabChange,
}: SearchWithTabsProps) {
  return (
    <div className={`flex items-center gap-4 mb-4 ${styles.noPrint}`}>
      {/* Search Bar */}
      <div className="relative min-w-100">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      {/* Tabs Section */}
      <div className="flex gap-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              activeTab === tab
                ? "text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
