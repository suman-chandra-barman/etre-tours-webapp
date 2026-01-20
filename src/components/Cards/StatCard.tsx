import { TrendingDown, TrendingUp } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

const StatCard = ({ label, value, change, isPositive }: StatCardProps) => (
  <div className="space-y-1">
    <p className="text-sm text-gray-500 uppercase tracking-wide">{label}</p>
    <div className="flex items-baseline gap-2">
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      {change && (
        <span
          className={`text-xs font-medium flex items-center gap-1 ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {change} vs last mo
        </span>
      )}
    </div>
  </div>
);

export default StatCard;