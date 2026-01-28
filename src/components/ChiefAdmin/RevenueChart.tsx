"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", revenue: 3000 },
  { month: "Feb", revenue: 8000 },
  { month: "Mar", revenue: 6000 },
  { month: "Apr", revenue: 6000 },
  { month: "May", revenue: 4000 },
  { month: "Jun", revenue: 10000 },
  { month: "Jul", revenue: 11000 },
  { month: "Aug", revenue: 3000 },
  { month: "Sep", revenue: 10000 },
  { month: "Oct", revenue: 9000 },
  { month: "Nov", revenue: 12000 },
  { month: "Dec", revenue: 14000 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(221.2 83.2% 53.3%)",
  },
} satisfies ChartConfig;

export default function RevenueChart() {
  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle>Revenue Graph</CardTitle>
        <CardDescription>Monthly revenue for the current year</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-120 w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 30, right: 10, left: 10, bottom: 10 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={8}>
              <LabelList
                dataKey="revenue"
                position="top"
                className="fill-gray-700 text-xs font-medium"
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
