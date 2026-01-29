"use client";

import { ChevronRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

interface ContractorData {
  name: string;
  value: number;
  color: string;
}

export default function SubContractorSection() {
  // Sample data - replace with actual data
  const contractorData: ContractorData[] = [
    { name: "Starbucks", value: 80, color: "#FF6B6B" },
    { name: "Mitsubishi", value: 120, color: "#87CEEB" },
    { name: "Facebook", value: 94, color: "#90EE90" },
    { name: "Nintendo", value: 72, color: "#FFD700" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Toptier sub-contractor companies
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Contributors who helped to grow your business
        </p>
      </div>

      {/* Bar Chart */}
      <div className="h-98">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={contractorData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={{ stroke: "#E5E7EB" }}
            />
            <YAxis
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={{ stroke: "#E5E7EB" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              formatter={(value) => [`${value}k`, "Value"]}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {contractorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Show all link */}
      <div className="mt-4 flex justify-start">
        <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors">
          Show all
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
