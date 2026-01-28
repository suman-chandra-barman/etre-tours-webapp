"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UpdatePricingModal } from "@/components/Modals/UpdatePricingModal";
import { Search } from "lucide-react";

interface Transaction {
  date: string;
  userId: string;
  customer: string;
  subscriptionPlan: string;
  payment: string;
  amount: string;
  status: "Paid" | "Pending" | "Processing" | "Cancelled" | "Active";
}

const mockTransactions: Transaction[] = [
  {
    date: "May 6, 2012",
    userId: "@b4tman_G0th",
    customer: "Devon Lane",
    subscriptionPlan: "Monthly",
    payment: "Mastercard Credit",
    amount: "$89.99",
    status: "Paid",
  },
  {
    date: "February 11, 2014",
    userId: "@W1L_h3m",
    customer: "Cameron Williamson",
    subscriptionPlan: "Monthly",
    payment: "Visa Debit",
    amount: "$129.99",
    status: "Pending",
  },
  {
    date: "May 12, 2019",
    userId: "@f1ndi_l4ss",
    customer: "Jerome Bell",
    subscriptionPlan: "Monthly",
    payment: "Visa Credit",
    amount: "$69.99",
    status: "Processing",
  },
  {
    date: "May 9, 2014",
    userId: "@h3r0bi-1n3",
    customer: "Theresa Webb",
    subscriptionPlan: "Monthly",
    payment: "Mastercard Credit",
    amount: "$69.99",
    status: "Cancelled",
  },
  {
    date: "December 19, 2013",
    userId: "@m1k3_h4m1g4n",
    customer: "Darrell Steward",
    subscriptionPlan: "Monthly",
    payment: "Mastercard Debit",
    amount: "$89.99",
    status: "Active",
  },
  {
    date: "February 9, 2015",
    userId: "@md4ter_Y0d4",
    customer: "Esther Howard",
    subscriptionPlan: "Monthly",
    payment: "Mastercard Debit",
    amount: "$59.99",
    status: "Active",
  },
  {
    date: "September 9, 2013",
    userId: "@j1L_v4tl3y",
    customer: "Arlene McCoy",
    subscriptionPlan: "Monthly",
    payment: "Visa Debit",
    amount: "$129.99",
    status: "Active",
  },
  {
    date: "March 23, 2013",
    userId: "@p4u1_f1sh",
    customer: "Floyd Miles",
    subscriptionPlan: "Annually",
    payment: "American Express",
    amount: "$59.99",
    status: "Active",
  },
  {
    date: "April 28, 2016",
    userId: "@Liz_D4n",
    customer: "Marvin McKinney",
    subscriptionPlan: "Annually",
    payment: "American Express",
    amount: "$99.99",
    status: "Active",
  },
  {
    date: "August 24, 2013",
    userId: "@j4ck_sp4r",
    customer: "Jane Cooper",
    subscriptionPlan: "Annually",
    payment: "SEPA",
    amount: "$109.99",
    status: "Active",
  },
  {
    date: "July 14, 2015",
    userId: "@sp0ck_v0lc4n",
    customer: "Leslie Alexander",
    subscriptionPlan: "Annually",
    payment: "American Express",
    amount: "$129.99",
    status: "Active",
  },
  {
    date: "September 24, 2017",
    userId: "@N30_R0y",
    customer: "Kathryn Murphy",
    subscriptionPlan: "Annually",
    payment: "American Express",
    amount: "$49.99",
    status: "Active",
  },
  {
    date: "August 2, 2013",
    userId: "@h4ns_grub",
    customer: "Savannah Nguyen",
    subscriptionPlan: "Annually",
    payment: "Domiciliación",
    amount: "$79.99",
    status: "Active",
  },
  {
    date: "October 31, 2017",
    userId: "@v3rcy_l4ok",
    customer: "Jenny Wilson",
    subscriptionPlan: "Annually",
    payment: "American Express",
    amount: "$119.99",
    status: "Active",
  },
];

const getStatusStyles = (status: Transaction["status"]) => {
  switch (status) {
    case "Paid":
      return "bg-teal-100 text-teal-700 hover:bg-teal-100";
    case "Pending":
      return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
    case "Processing":
      return "bg-cyan-100 text-cyan-700 hover:bg-cyan-100";
    case "Cancelled":
      return "bg-red-100 text-red-700 hover:bg-red-100";
    case "Active":
      return "bg-green-100 text-green-700 hover:bg-green-100";
    default:
      return "bg-gray-100 text-gray-600 hover:bg-gray-100";
  }
};

function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  const filteredTransactions = mockTransactions.filter(
    (transaction) =>
      transaction.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.userId.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Transaction history</h1>
        <Button
          onClick={() => setIsPricingModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 rounded-full"
        >
          Update pricing
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search by name or user id"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-gray-50 border-gray-200"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium text-gray-600">Date</TableHead>
              <TableHead className="font-medium text-gray-600">
                User ID
              </TableHead>
              <TableHead className="font-medium text-gray-600">
                Customer
              </TableHead>
              <TableHead className="font-medium text-gray-600">
                Subscription Plan
              </TableHead>
              <TableHead className="font-medium text-gray-600">
                Payment
              </TableHead>
              <TableHead className="font-medium text-gray-600">
                Amount
              </TableHead>
              <TableHead className="font-medium text-gray-600">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction, index) => (
              <TableRow key={`${transaction.userId}-${index}`}>
                <TableCell className="text-gray-600">
                  {transaction.date}
                </TableCell>
                <TableCell className="font-medium text-gray-900">
                  {transaction.userId}
                </TableCell>
                <TableCell>{transaction.customer}</TableCell>
                <TableCell className="text-gray-600">
                  {transaction.subscriptionPlan}
                </TableCell>
                <TableCell className="text-gray-600">
                  {transaction.payment}
                </TableCell>
                <TableCell className="text-gray-600">
                  {transaction.amount}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusStyles(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pricing Modal */}
      <UpdatePricingModal
        open={isPricingModalOpen}
        onOpenChange={setIsPricingModalOpen}
      />
    </div>
  );
}

export default TransactionsPage;
