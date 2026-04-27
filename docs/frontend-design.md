# Nasiya Savdo Frontend Design (V1)

## 1) Scope

This document defines the first UI/UX design baseline for the **Nasiya Savdo Boshqaruv Tizimi** frontend.

Primary modules:

- Customers (Mijozlar)
- Installments / Credit Sales (Nasiya)
- Payments (To'lovlar)
- Reports (Hisobot)

Recommended stack for implementation:

- React + TypeScript
- Ant Design (admin-focused and fast for data tables/forms)
- Zustand for state management

---

## 2) Product Goals

- Fast daily cashier workflow (minimal clicks for payment entry)
- Clear debt visibility (total debt, paid amount, remaining debt)
- Reliable reporting for owner/manager decisions
- Mobile-friendly responsive layout for field usage

---

## 3) UX Principles

1. **Single-screen clarity**: user sees current debt status immediately.
2. **Action-first forms**: critical actions (Add Customer, Add Payment) always visible.
3. **Consistent financial formatting**: all money values in UZS with separators.
4. **Status-driven UI**: Active / Overdue / Closed are visually distinct.
5. **Error prevention**: validation, smart defaults, and confirm dialogs for risky actions.

---

## 4) Information Architecture (Pages)

### Auth

- Login

### Main App

1. Dashboard
2. Customers
   - Customer List
   - Customer Profile (debts + payment history)
3. Nasiya
   - Nasiya List
   - New Nasiya Form
   - Nasiya Detail
4. Payments
   - Daily Payment Entry
   - Payment History
5. Reports
   - Summary KPIs
   - Overdue Debts
6. Settings (optional in V1)

---

## 5) App Layout Structure

- **Top Header**
  - App name
  - Branch selector (optional)
  - User menu
- **Left Sidebar**
  - Dashboard
  - Customers
  - Nasiya
  - Payments
  - Reports
- **Content Area**
  - Page title + breadcrumb
  - KPI cards / tables / forms based on route

Responsive behavior:

- Desktop: fixed sidebar
- Tablet: collapsible sidebar
- Mobile: drawer navigation + sticky primary action button

---

## 6) Design Tokens (Initial)

### Colors

- Primary: `#1677FF`
- Success: `#52C41A`
- Warning: `#FAAD14`
- Danger: `#FF4D4F`
- Info: `#13C2C2`
- Background: `#F5F7FA`
- Surface: `#FFFFFF`
- Text Primary: `#1F1F1F`
- Text Secondary: `#595959`

### Typography

- Font: Inter (fallback: system sans-serif)
- Base size: 14px
- Heading scale:
  - H1: 24
  - H2: 20
  - H3: 16

### Spacing

- 4 / 8 / 12 / 16 / 24 / 32 scale
- Card radius: 12
- Input height: 40

---

## 7) Reusable Components

1. `MoneyText` (UZS formatting)
2. `DebtStatusBadge` (Active, Overdue, Closed)
3. `KpiCard` (title, value, trend)
4. `CustomerSelect` (searchable)
5. `DateRangeFilter`
6. `PaymentEntryModal`
7. `ConfirmActionModal`
8. `EmptyState`
9. `PageHeaderActions`

---

## 8) Page-Level Wireframe Requirements

## 8.1 Dashboard

Purpose: fast health overview.

Sections:

- KPI row (4 cards):
  1. Total Nasiya Amount
  2. Total Collected
  3. Remaining Debt
  4. Overdue Debt
- Today’s Payments table
- Overdue customers list (top 10)
- Quick actions: Add Customer, New Nasiya, Add Payment

## 8.2 Customers - List

Columns:

- Full Name
- Phone
- Address
- Active Debts Count
- Remaining Debt
- Last Payment Date
- Status
- Actions (View, Edit)

Features:

- Search by name/phone
- Filters: status (Active/Overdue/Closed)
- Pagination + sortable debt columns

## 8.3 Customer Profile

Header:

- Name, phone, address, created date
- Total debt / paid / remaining summary

Tabs:

1. Debts
2. Payment History
3. Notes (optional)

Debts table fields:

- Product
- Start date
- Total debt
- Daily payment
- Remaining
- Status

## 8.4 New Nasiya Form

Fields:

- Customer (select)
- Product name
- Unit price
- Quantity
- Markup percent (default 30%)
- Total price (auto)
- Total debt with markup (auto)
- Start date
- Daily payment amount
- Notes

Validation:

- daily payment > 0
- quantity >= 1
- markup between 0 and 100 (configurable)

## 8.5 Nasiya Detail

- Debt summary cards:
  - Total debt
  - Paid amount
  - Remaining amount
  - Next due date
- Payment timeline
- Add payment action
- Close debt action (only if remaining == 0)

## 8.6 Payments

### Daily Payment Entry

- Customer search
- Select active debt
- Payment amount
- Payment date
- Method (cash/card/transfer)
- Comment

### Payment History

- Date range filter
- Customer filter
- Debt filter
- Export button placeholder (future)

## 8.7 Reports

Cards:

- Total installment issued
- Total collected
- Total outstanding
- Overdue amount

Tables/Charts:

- Monthly collection trend
- Overdue by customer
- Top paying customers

---

## 9) Core User Flows

### Flow A: Add customer

Customers List -> Add Customer modal -> Save -> success toast -> row appears in table.

### Flow B: Create nasiya

Customer Profile or Nasiya List -> New Nasiya -> auto calculation preview -> Confirm -> redirect to Nasiya Detail.

### Flow C: Record daily payment

Payments page -> choose customer + debt -> enter amount -> Save -> remaining debt updates instantly.

### Flow D: Debt closure

When remaining becomes 0:

- show "Debt Closed" notification
- set status to Closed
- move item to closed filter category

---

## 10) State Plan (Frontend)

Recommended Zustand store slices:

1. `authStore`
2. `customerStore`
3. `debtStore`
4. `paymentStore`
5. `reportStore`
6. `uiStore` (drawers, modals, filters)

Guidelines:

- Keep API calls in service layer
- Normalize large lists by ID for performance
- Optimistic UI for payment entry (with rollback on error)

---

## 11) Formulas (Business Logic Preview)

- `totalBase = unitPrice * quantity`
- `markupAmount = totalBase * (markupPercent / 100)`
- `totalDebt = totalBase + markupAmount`
- `remainingDebt = totalDebt - paidAmount`
- `daysEstimated = ceil(remainingDebt / dailyPaymentAmount)`

---

## 12) Figma Setup Plan

Create pages:

1. Foundations (colors, typography, spacing)
2. Components (buttons, inputs, cards, table patterns)
3. Desktop screens
4. Tablet screens
5. Mobile screens
6. Prototype flows

Suggested frame widths:

- Desktop: 1440
- Tablet: 1024
- Mobile: 390

---

## 13) V1 Implementation Priorities

1. App layout + routing
2. Customers list + add customer
3. New nasiya form + calculations
4. Payment entry + payment history
5. Dashboard KPIs
6. Reports summary page

---

## 14) Future Extensions (V2+)

- SMS reminders for debtors
- Excel export
- PWA offline support
- Telegram bot integration

---

## 15) Deliverables From This Design Phase

- Complete IA and page definitions
- Component inventory for React implementation
- Formula and status logic baseline
- Figma-ready specification for visual design

/** Database Sxemasi **/

users
├── id
├── username
├── password
└── role (superadmin | partner)

partners (sheriklar)
├── id
├── user_id → users
├── full_name
├── phone
└── balance (joriy mablag')

investments (kiritilgan mablag'lar)
├── id
├── partner_id → partners
├── amount
└── date

customers (mijozlar)
├── id
├── full_name
├── phone
└── address

credits (nasiya)
├── id
├── customer_id → customers
├── partner_id → partners (qaysi sherik puli)
├── product_name
├── cost_price (sotib olish narxi)
├── markup_percent (30%)
├── total_debt (cost_price + 30%)
├── paid_amount
├── remaining_debt
├── status (active | completed | defaulted)
└── start_date

payments (to'lovlar)
├── id
├── credit_id → credits
├── amount
├── date
└── method (cash | card | transfer)

profit_distributions (foyda taqsimoti)
├── id
├── credit_id → credits
├── partner_profit (50%)
└── owner_profit (50%)
