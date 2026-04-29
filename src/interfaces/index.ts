import type { ReactNode } from "react";

export interface IMenuItem {
  to: string;
  title: string;
  icon: string | ReactNode;
  active: boolean;
  label: string;
}

export interface IDashboardCard {
  id: number;
  title: string;
  value: number;
  currency: string;
  color: string;
}

export interface IDashboardPayments {
  id: number;
  fullName: string;
  product: string;
  status: string;
  value: number;
  time: string;
}

export interface IDashboardExpired {
  id: number;
  fullName: string;
  product: string;
  lastPaymentDate: string;
  value: number;
  currency: string;
}

// Customer interface
export interface ICustomer {
  id: number;
  full_name: string;
  phone: string;
  phone2?: string;
  address?: string;
  passport_series?: string;
  passport_number?: string;
  passport_issued_by?: string;
  passport_issued_date?: string;
  referred_by?: string;
  workplace?: string;
  guarantor_name?: string;
  guarantor_phone?: string;
  created_at: string;
  credits?: ICredit[];
  stats?: {
    jami_qarz: number;
    ustama_foiz: number;
    jami_qarz_va_foyda: number;
    foyda: number;
    tolangan: number;
    qolgan_qarz: number;
    oxirgi_sana: string | null;
    status: "active" | "completed" | "defaulted" | "none";
  };
}

export type ICreateCustomer = Omit<ICustomer, "id" | "created_at">;
export type IUpdateCustomer = Partial<ICreateCustomer>;

export interface ICredit {
  id: number;
  status: "active" | "completed" | "defaulted";
  total_debt: number;
  paid_amount: number;
  remaining_debt: number;
  cost_price: number;
  markup_percent: number;
  daily_payment: number;
  product_name: string;
  notes?: string;
  start_date: string;
}

export interface IChartData {
  id: number;
  month: string;
  value: string;
  percent: number;
  barClass: string;
}

export interface IPaymentHistory {
  id: number;
  name: string;
  date: string;
  method: string;
  amount: string;
  color: string;
}

export interface IDebtorsData {
  id: number;
  name: string;
  amount: string;
  colorClass: string;
  bgClass: string;
}

export interface IPartner {
  id: number;
  full_name: string;
  phone: string;
  balance: number;
  total_invested: number;
  total_profit: number;
  total_loss: number;
  notes?: string;
  created_at: string;
  user: {
    id: number;
    username: string;
    role: string;
  };
}

export interface ICreatePartner {
  full_name: string;
  phone: string;
  balance: number;
  notes?: string;
  username: string;
  password: string;
}

export interface IInvestment {
  id: number;
  amount: number;
  notes?: string;
  created_at: string;
  partner: IPartner;
}
