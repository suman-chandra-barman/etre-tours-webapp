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

interface User {
  id: string;
  userName: string;
  joined: string;
  subscriptionPlan: string;
  timeLeft: string;
  upcomingPaymentDate: string;
  totalAmount: string;
  status: "Active" | "Inactive";
}

const mockUsers: User[] = [
  {
    id: "@b4tman_G0th",
    userName: "Devon Lane",
    joined: "May 6, 2012",
    subscriptionPlan: "Monthly",
    timeLeft: "3 Months",
    upcomingPaymentDate: "March 6, 2018",
    totalAmount: "$89.99",
    status: "Active",
  },
  {
    id: "@W1L_h3m",
    userName: "Cameron Williamson",
    joined: "February 11, 2014",
    subscriptionPlan: "Monthly",
    timeLeft: "9 Months",
    upcomingPaymentDate: "April 28, 2016",
    totalAmount: "$129.99",
    status: "Active",
  },
  {
    id: "@f1ndi_l4ss",
    userName: "Jerome Bell",
    joined: "May 12, 2019",
    subscriptionPlan: "Monthly",
    timeLeft: "4 Months",
    upcomingPaymentDate: "December 2, 2018",
    totalAmount: "$69.99",
    status: "Active",
  },
  {
    id: "@h3r0bi-1n3",
    userName: "Theresa Webb",
    joined: "May 9, 2014",
    subscriptionPlan: "Monthly",
    timeLeft: "9 Months",
    upcomingPaymentDate: "May 29, 2017",
    totalAmount: "$69.99",
    status: "Inactive",
  },
  {
    id: "@m1$3_h4m1g4n",
    userName: "Darrell Steward",
    joined: "December 19, 2013",
    subscriptionPlan: "Monthly",
    timeLeft: "5 Months",
    upcomingPaymentDate: "November 7, 2017",
    totalAmount: "$89.99",
    status: "Active",
  },
  {
    id: "@md4ter_Y0d4",
    userName: "Esther Howard",
    joined: "February 9, 2015",
    subscriptionPlan: "Monthly",
    timeLeft: "11 Months",
    upcomingPaymentDate: "October 31, 2017",
    totalAmount: "$59.99",
    status: "Active",
  },
  {
    id: "@j1L_v4tl3y",
    userName: "Arlene McCoy",
    joined: "September 9, 2013",
    subscriptionPlan: "Monthly",
    timeLeft: "18 Weeks",
    upcomingPaymentDate: "May 9, 2014",
    totalAmount: "$129.99",
    status: "Active",
  },
  {
    id: "@p4u1_f1sh",
    userName: "Floyd Miles",
    joined: "March 23, 2013",
    subscriptionPlan: "Annually",
    timeLeft: "3 Days",
    upcomingPaymentDate: "July 14, 2015",
    totalAmount: "$59.99",
    status: "Active",
  },
  {
    id: "@L1z_D4n",
    userName: "Marvin McKinney",
    joined: "April 28, 2016",
    subscriptionPlan: "Annually",
    timeLeft: "10 Months",
    upcomingPaymentDate: "December 29, 2012",
    totalAmount: "$99.99",
    status: "Active",
  },
  {
    id: "@j4ck_sp4r",
    userName: "Jane Cooper",
    joined: "August 24, 2013",
    subscriptionPlan: "Annually",
    timeLeft: "15 Weeks",
    upcomingPaymentDate: "February 11, 2014",
    totalAmount: "$109.99",
    status: "Active",
  },
  {
    id: "@sp0ck_v0lc4n",
    userName: "Leslie Alexander",
    joined: "July 14, 2015",
    subscriptionPlan: "Annually",
    timeLeft: "40 Weeks",
    upcomingPaymentDate: "October 30, 2017",
    totalAmount: "$129.99",
    status: "Active",
  },
  {
    id: "@N30_R0y",
    userName: "Kathryn Murphy",
    joined: "September 24, 2017",
    subscriptionPlan: "Annually",
    timeLeft: "12 Months",
    upcomingPaymentDate: "August 24, 2013",
    totalAmount: "$49.99",
    status: "Active",
  },
  {
    id: "@h4ns_grub",
    userName: "Savannah Nguyen",
    joined: "August 2, 2013",
    subscriptionPlan: "Annually",
    timeLeft: "6 Months",
    upcomingPaymentDate: "November 28, 2015",
    totalAmount: "$79.99",
    status: "Active",
  },
  {
    id: "@v3rcy_l4ok",
    userName: "Jenny Wilson",
    joined: "October 31, 2017",
    subscriptionPlan: "Annually",
    timeLeft: "15 Weeks",
    upcomingPaymentDate: "September 9, 2013",
    totalAmount: "$119.99",
    status: "Active",
  },
];

function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Manage your users</h1>
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
              <TableHead className="font-medium text-gray-600">
                User ID
              </TableHead>
              <TableHead className="font-medium text-gray-600">
                User Name
              </TableHead>
              <TableHead className="font-medium text-gray-600">
                Joined
              </TableHead>
              <TableHead className="font-medium text-gray-600">
                Subscription Plan
              </TableHead>
              <TableHead className="font-medium text-gray-600">
                Time left
              </TableHead>
              <TableHead className="font-medium text-gray-600">
                Upcoming Payment Date
              </TableHead>
              <TableHead className="font-medium text-gray-600">
                Total Amount
              </TableHead>
              <TableHead className="font-medium text-gray-600">
                Status
              </TableHead>
              <TableHead className="font-medium text-gray-600">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium text-gray-900">
                  {user.id}
                </TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell className="text-gray-600">{user.joined}</TableCell>
                <TableCell className="text-gray-600">
                  {user.subscriptionPlan}
                </TableCell>
                <TableCell className="text-gray-600">{user.timeLeft}</TableCell>
                <TableCell className="text-gray-600">
                  {user.upcomingPaymentDate}
                </TableCell>
                <TableCell className="text-gray-600">
                  {user.totalAmount}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === "Active" ? "default" : "secondary"}
                    className={
                      user.status === "Active"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={user.status === "Inactive"}
                    className={
                      user.status === "Inactive"
                        ? "text-gray-300 border-gray-200"
                        : ""
                    }
                  >
                    Suspend user
                  </Button>
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

export default UsersPage;
