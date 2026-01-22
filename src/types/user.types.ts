export type TUserRole =
  | "chief-admin"
  | "admin"
  | "direct-sales"
  | "cruise-sales"
  | "partner-sales";

export interface TUser {
  id: string;
  name: string;
  email: string;
  role: TUserRole;
}
