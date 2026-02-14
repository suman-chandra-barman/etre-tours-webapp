export const tourStatus = {
  PRE_DEPARTURE: "Pre-departure",
  IN_PROGRESS: "In-progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const userRoles = {
  CHIEF_ADMIN: "chief-admin",
  ADMIN: "admin",
  DIRECT_SALES: "direct-sales",
  CRUISE_SALES: "cruise-sales",
  PARTNER_SALES: "partner-sales",
};

export type UserRole = (typeof userRoles)[keyof typeof userRoles];
export type TourStatus = (typeof tourStatus)[keyof typeof tourStatus];
