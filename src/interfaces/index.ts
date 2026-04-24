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

export interface ICustomer {
    id: number;
    name: string;
    phone: string;
    balance: string;
    status: string;
    color: string;
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