"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

type BillingCycle = "monthly" | "yearly";

const subscriptionFeatures = [
  "Unlimited tours",
  "Advanced analytics & insights",
  "Priority support (24/7)",
  "Unlimited team members",
  "Mobile app access",
  "Custom branding",
  "API access",
  "Advanced reporting",
  "Multi-location support",
  "All future updates included",
];

const MONTHLY_PRICE = 79;
const YEARLY_PRICE = 790;

function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const currentPrice =
    billingCycle === "monthly" ? MONTHLY_PRICE : YEARLY_PRICE;
  const monthlyCost = MONTHLY_PRICE * 12;
  const savingsPercent = Math.round(
    ((monthlyCost - YEARLY_PRICE) / monthlyCost) * 100,
  );
  const monthlySavings = monthlyCost - YEARLY_PRICE;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Billing Cycle</h1>
        <p className="text-muted-foreground text-lg mb-8">
          One complete subscription plan with flexible billing options. Cancel
          anytime.
        </p>
      </div>

      {/* Billing Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Monthly Package */}
        <Card
          className={`relative cursor-pointer transition-all ${
            billingCycle === "monthly"
              ? "border-primary border-2 shadow-lg"
              : "hover:border-primary/50"
          }`}
          onClick={() => setBillingCycle("monthly")}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Monthly</CardTitle>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  billingCycle === "monthly"
                    ? "border-primary bg-primary"
                    : "border-muted-foreground"
                }`}
              >
                {billingCycle === "monthly" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                )}
              </div>
            </div>
            <CardDescription>
              Pay month-to-month with flexibility
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">${MONTHLY_PRICE}</span>
                <span className="text-muted-foreground text-lg">/month</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Billed monthly • Cancel anytime
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Yearly Package */}
        <Card
          className={`relative cursor-pointer transition-all ${
            billingCycle === "yearly"
              ? "border-primary border-2 shadow-lg"
              : "hover:border-primary/50"
          }`}
          onClick={() => setBillingCycle("yearly")}
        >
          {billingCycle === "yearly" && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="px-4 py-1">Best Value</Badge>
            </div>
          )}

          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Yearly</CardTitle>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  billingCycle === "yearly"
                    ? "border-primary bg-primary"
                    : "border-muted-foreground"
                }`}
              >
                {billingCycle === "yearly" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                )}
              </div>
            </div>
            <CardDescription>
              Save {savingsPercent}% with annual billing
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">${YEARLY_PRICE}</span>
                <span className="text-muted-foreground text-lg">/year</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                ${Math.round(YEARLY_PRICE / 12)}/month • Save ${monthlySavings}
                /year
              </p>
            </div>

            <Badge variant="secondary" className="text-sm">
              💰 Save ${monthlySavings} compared to monthly
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">All Features Included</CardTitle>
          <CardDescription>
            Everything you need to manage your tour business, no matter which
            billing cycle you choose
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subscriptionFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" size="lg">
            Subscribe {billingCycle === "monthly" ? "Monthly" : "Yearly"} - $
            {currentPrice}
            {billingCycle === "yearly" ? "/year" : "/month"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            14-day free trial • No credit card required • Cancel anytime
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default BillingPage;
