import { useMemo, useState } from 'react'
import './App.css'

type NavKey = 'dashboard' | 'customers' | 'nasiya' | 'payments' | 'reports'
type DebtStatus = 'Active' | 'Overdue' | 'Closed'
type StatusFilter = 'All' | DebtStatus
type KpiTone = 'primary' | 'success' | 'warning' | 'danger'

interface KpiItem {
  title: string
  value: number
  trend: string
  tone: KpiTone
}

interface CustomerRow {
  id: string
  fullName: string
  phone: string
  address: string
  activeDebtsCount: number
  remainingDebt: number
  lastPaymentDate: string
  status: DebtStatus
}

interface DebtRow {
  id: string
  customer: string
  product: string
  startDate: string
  totalDebt: number
  dailyPayment: number
  remaining: number
  status: DebtStatus
}

interface PaymentRow {
  id: string
  date: string
  customer: string
  debt: string
  amount: number
  method: 'Cash' | 'Card' | 'Transfer'
}

interface NasiyaFormState {
  customerId: string
  productName: string
  unitPrice: number
  quantity: number
  markupPercent: number
  startDate: string
  dailyPayment: number
  notes: string
}

const currencyFormatter = new Intl.NumberFormat('uz-UZ')
const dateFormatter = new Intl.DateTimeFormat('uz-UZ', { dateStyle: 'medium' })

function formatMoney(amount: number): string {
  return `${currencyFormatter.format(amount)} UZS`
}

function MoneyText({ amount }: { amount: number }) {
  return <span>{formatMoney(amount)}</span>
}

const statusClassName: Record<DebtStatus, string> = {
  Active: 'status-active',
  Overdue: 'status-overdue',
  Closed: 'status-closed',
}

function DebtStatusBadge({ status }: { status: DebtStatus }) {
  return <span className={`status-badge ${statusClassName[status]}`}>{status}</span>
}

function KpiCard({ title, value, trend, tone }: KpiItem) {
  return (
    <article className={`kpi-card tone-${tone}`}>
      <p className="kpi-label">{title}</p>
      <p className="kpi-value">
        <MoneyText amount={value} />
      </p>
      <p className="kpi-trend">{trend}</p>
    </article>
  )
}

const navItems: Array<{ key: NavKey; label: string; badge?: number }> = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'customers', label: 'Customers' },
  { key: 'nasiya', label: 'Nasiya' },
  { key: 'payments', label: 'Payments', badge: 5 },
  { key: 'reports', label: 'Reports' },
]

const pageMeta: Record<NavKey, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Dashboard',
    subtitle: 'Fast health overview of installment operations',
  },
  customers: {
    title: 'Customers',
    subtitle: 'Manage client records and debt statuses',
  },
  nasiya: {
    title: 'Nasiya',
    subtitle: 'Create and monitor installment contracts',
  },
  payments: {
    title: 'Payments',
    subtitle: 'Record daily payments with minimal clicks',
  },
  reports: {
    title: 'Reports',
    subtitle: 'Analyze trends, overdue amounts, and top payers',
  },
}

const dashboardKpis: KpiItem[] = [
  {
    title: 'Total Nasiya Amount',
    value: 238500000,
    trend: '+12.4% vs last month',
    tone: 'primary',
  },
  {
    title: 'Total Collected',
    value: 176240000,
    trend: '+8.2% vs last month',
    tone: 'success',
  },
  {
    title: 'Remaining Debt',
    value: 62260000,
    trend: '26.1% of total portfolio',
    tone: 'warning',
  },
  {
    title: 'Overdue Debt',
    value: 14120000,
    trend: '-4.7% vs last week',
    tone: 'danger',
  },
]

const customerRows: CustomerRow[] = [
  {
    id: 'c1',
    fullName: 'Abdulloh Karimov',
    phone: '+998 90 123 45 67',
    address: 'Toshkent, Chilonzor-19',
    activeDebtsCount: 2,
    remainingDebt: 7400000,
    lastPaymentDate: '2026-04-21',
    status: 'Active',
  },
  {
    id: 'c2',
    fullName: 'Dilnoza Raximova',
    phone: '+998 91 555 23 90',
    address: 'Toshkent, Yunusobod-4',
    activeDebtsCount: 1,
    remainingDebt: 2800000,
    lastPaymentDate: '2026-04-20',
    status: 'Active',
  },
  {
    id: 'c3',
    fullName: 'Sardor Islomov',
    phone: '+998 99 444 88 11',
    address: 'Andijon, Bobur MFY',
    activeDebtsCount: 1,
    remainingDebt: 3950000,
    lastPaymentDate: '2026-04-12',
    status: 'Overdue',
  },
  {
    id: 'c4',
    fullName: 'Feruza Mamatova',
    phone: '+998 93 700 11 22',
    address: 'Namangan, Davlatobod',
    activeDebtsCount: 0,
    remainingDebt: 0,
    lastPaymentDate: '2026-03-28',
    status: 'Closed',
  },
  {
    id: 'c5',
    fullName: 'Bekzod Soliyev',
    phone: '+998 88 111 09 19',
    address: 'Fargona, Qoqon shahar',
    activeDebtsCount: 1,
    remainingDebt: 5100000,
    lastPaymentDate: '2026-04-14',
    status: 'Overdue',
  },
  {
    id: 'c6',
    fullName: 'Shahnoza Tursunova',
    phone: '+998 95 833 22 77',
    address: 'Samarqand, Registon',
    activeDebtsCount: 2,
    remainingDebt: 9200000,
    lastPaymentDate: '2026-04-22',
    status: 'Active',
  },
]

const todayPayments: PaymentRow[] = [
  {
    id: 'p1',
    date: '2026-04-22 09:10',
    customer: 'Abdulloh Karimov',
    debt: 'iPhone 13 128GB',
    amount: 180000,
    method: 'Cash',
  },
  {
    id: 'p2',
    date: '2026-04-22 10:04',
    customer: 'Shahnoza Tursunova',
    debt: 'LG OLED TV',
    amount: 250000,
    method: 'Card',
  },
  {
    id: 'p3',
    date: '2026-04-22 11:22',
    customer: 'Dilnoza Raximova',
    debt: 'Samsung A35',
    amount: 120000,
    method: 'Transfer',
  },
  {
    id: 'p4',
    date: '2026-04-22 12:17',
    customer: 'Sardor Islomov',
    debt: 'Washing machine',
    amount: 100000,
    method: 'Cash',
  },
  {
    id: 'p5',
    date: '2026-04-22 13:31',
    customer: 'Bekzod Soliyev',
    debt: 'MacBook Air M2',
    amount: 200000,
    method: 'Card',
  },
]

const overdueCustomers: Array<{
  id: string
  customer: string
  daysOverdue: number
  remainingDebt: number
}> = [
  { id: 'o1', customer: 'Sardor Islomov', daysOverdue: 11, remainingDebt: 3950000 },
  { id: 'o2', customer: 'Bekzod Soliyev', daysOverdue: 8, remainingDebt: 5100000 },
  { id: 'o3', customer: 'Sanjar Olimov', daysOverdue: 7, remainingDebt: 2200000 },
  { id: 'o4', customer: 'Kamila Rustamova', daysOverdue: 6, remainingDebt: 1750000 },
  { id: 'o5', customer: 'Mirjalol Yuldashev', daysOverdue: 5, remainingDebt: 1120000 },
]

const debtRows: DebtRow[] = [
  {
    id: 'd1',
    customer: 'Abdulloh Karimov',
    product: 'iPhone 13 128GB',
    startDate: '2026-02-11',
    totalDebt: 11960000,
    dailyPayment: 180000,
    remaining: 5400000,
    status: 'Active',
  },
  {
    id: 'd2',
    customer: 'Shahnoza Tursunova',
    product: 'LG OLED TV',
    startDate: '2026-01-25',
    totalDebt: 16250000,
    dailyPayment: 250000,
    remaining: 2300000,
    status: 'Active',
  },
  {
    id: 'd3',
    customer: 'Sardor Islomov',
    product: 'Washing machine',
    startDate: '2025-12-19',
    totalDebt: 5850000,
    dailyPayment: 100000,
    remaining: 3950000,
    status: 'Overdue',
  },
  {
    id: 'd4',
    customer: 'Feruza Mamatova',
    product: 'Samsung S23',
    startDate: '2025-11-02',
    totalDebt: 10120000,
    dailyPayment: 200000,
    remaining: 0,
    status: 'Closed',
  },
  {
    id: 'd5',
    customer: 'Bekzod Soliyev',
    product: 'MacBook Air M2',
    startDate: '2026-02-01',
    totalDebt: 14500000,
    dailyPayment: 200000,
    remaining: 5100000,
    status: 'Overdue',
  },
]

const paymentHistoryRows: PaymentRow[] = [
  {
    id: 'h1',
    date: '2026-04-22 13:31',
    customer: 'Bekzod Soliyev',
    debt: 'MacBook Air M2',
    amount: 200000,
    method: 'Card',
  },
  {
    id: 'h2',
    date: '2026-04-22 12:17',
    customer: 'Sardor Islomov',
    debt: 'Washing machine',
    amount: 100000,
    method: 'Cash',
  },
  {
    id: 'h3',
    date: '2026-04-22 11:22',
    customer: 'Dilnoza Raximova',
    debt: 'Samsung A35',
    amount: 120000,
    method: 'Transfer',
  },
  {
    id: 'h4',
    date: '2026-04-21 18:04',
    customer: 'Abdulloh Karimov',
    debt: 'iPhone 13 128GB',
    amount: 180000,
    method: 'Cash',
  },
  {
    id: 'h5',
    date: '2026-04-21 16:26',
    customer: 'Shahnoza Tursunova',
    debt: 'LG OLED TV',
    amount: 250000,
    method: 'Card',
  },
]

const reportKpis: KpiItem[] = [
  {
    title: 'Total installment issued',
    value: 955000000,
    trend: '+18.1% year to date',
    tone: 'primary',
  },
  {
    title: 'Total collected',
    value: 732420000,
    trend: '76.6% recovery ratio',
    tone: 'success',
  },
  {
    title: 'Total outstanding',
    value: 222580000,
    trend: 'Open contracts: 144',
    tone: 'warning',
  },
  {
    title: 'Overdue amount',
    value: 42160000,
    trend: '18.9% of outstanding',
    tone: 'danger',
  },
]

const monthlyTrend = [
  { month: 'Jan', amount: 86500000 },
  { month: 'Feb', amount: 93300000 },
  { month: 'Mar', amount: 101200000 },
  { month: 'Apr', amount: 97800000 },
  { month: 'May', amount: 112400000 },
  { month: 'Jun', amount: 125900000 },
]

const topPayingCustomers = [
  { id: 't1', name: 'Shahnoza Tursunova', amount: 8450000, contracts: 2 },
  { id: 't2', name: 'Abdulloh Karimov', amount: 7920000, contracts: 2 },
  { id: 't3', name: 'Dilnoza Raximova', amount: 5080000, contracts: 1 },
  { id: 't4', name: 'Azizbek Tohirov', amount: 4470000, contracts: 1 },
]

function App() {
  const [activePage, setActivePage] = useState<NavKey>('dashboard')
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState('Chilonzor')
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All')
  const [nasiyaForm, setNasiyaForm] = useState<NasiyaFormState>({
    customerId: customerRows[0]?.id ?? '',
    productName: 'Samsung A25 5G',
    unitPrice: 4200000,
    quantity: 1,
    markupPercent: 30,
    startDate: '2026-04-22',
    dailyPayment: 120000,
    notes: '',
  })

  const totalBase = useMemo(
    () => nasiyaForm.unitPrice * nasiyaForm.quantity,
    [nasiyaForm.quantity, nasiyaForm.unitPrice],
  )

  const markupAmount = useMemo(
    () => totalBase * (nasiyaForm.markupPercent / 100),
    [nasiyaForm.markupPercent, totalBase],
  )

  const totalDebt = useMemo(() => totalBase + markupAmount, [markupAmount, totalBase])

  const daysEstimated = useMemo(
    () => Math.ceil(totalDebt / Math.max(nasiyaForm.dailyPayment, 1)),
    [nasiyaForm.dailyPayment, totalDebt],
  )

  const filteredCustomers = useMemo(
    () =>
      customerRows.filter((customer) => {
        const search = searchText.trim().toLowerCase()
        const matchesSearch =
          search.length === 0 ||
          customer.fullName.toLowerCase().includes(search) ||
          customer.phone.includes(search)

        const matchesStatus =
          statusFilter === 'All' ? true : customer.status === statusFilter

        return matchesSearch && matchesStatus
      }),
    [searchText, statusFilter],
  )

  const selectedCustomer = useMemo(
    () => customerRows.find((customer) => customer.id === nasiyaForm.customerId),
    [nasiyaForm.customerId],
  )

  const maxTrendValue = useMemo(
    () => Math.max(...monthlyTrend.map((point) => point.amount)),
    [],
  )

  const todayTotalCollected = useMemo(
    () => todayPayments.reduce((sum, row) => sum + row.amount, 0),
    [],
  )

  const overdueTotal = useMemo(
    () =>
      customerRows
        .filter((customer) => customer.status === 'Overdue')
        .reduce((sum, customer) => sum + customer.remainingDebt, 0),
    [],
  )

  const activePageInfo = pageMeta[activePage]

  const handleNavChange = (page: NavKey) => {
    setActivePage(page)
    setIsMobileNavOpen(false)
  }

  const pageContent = (() => {
    switch (activePage) {
      case 'dashboard':
        return (
          <>
            <section className="kpi-grid">
              {dashboardKpis.map((kpi) => (
                <KpiCard key={kpi.title} {...kpi} />
              ))}
            </section>

            <section className="content-grid">
              <article className="card">
                <div className="card-header">
                  <div className="card-title-group">
                    <h2>Today's Payments</h2>
                    <p className="card-note">Latest transactions updated in real-time</p>
                  </div>
                  <span className="pill">{todayPayments.length} entries</span>
                </div>

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Customer</th>
                        <th>Debt</th>
                        <th>Method</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {todayPayments.map((payment) => (
                        <tr key={payment.id}>
                          <td>{payment.date}</td>
                          <td>{payment.customer}</td>
                          <td>{payment.debt}</td>
                          <td>{payment.method}</td>
                          <td className="amount-cell">
                            <MoneyText amount={payment.amount} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              <article className="card">
                <div className="card-header">
                  <div className="card-title-group">
                    <h2>Overdue Customers</h2>
                    <p className="card-note">Top debtors requiring follow-up</p>
                  </div>
                  <span className="pill pill-danger">
                    <MoneyText amount={overdueTotal} />
                  </span>
                </div>

                <div className="overdue-list">
                  {overdueCustomers.map((row) => (
                    <div key={row.id} className="overdue-item">
                      <div>
                        <p className="overdue-name">{row.customer}</p>
                        <p className="overdue-meta">{row.daysOverdue} days overdue</p>
                      </div>
                      <p className="amount-cell">
                        <MoneyText amount={row.remainingDebt} />
                      </p>
                    </div>
                  ))}
                </div>

                <div className="quick-actions">
                  <button className="btn btn-primary" type="button">
                    Add Customer
                  </button>
                  <button className="btn btn-ghost" type="button">
                    New Nasiya
                  </button>
                  <button className="btn btn-subtle" type="button">
                    Add Payment
                  </button>
                </div>
              </article>
            </section>
          </>
        )

      case 'customers':
        return (
          <section className="card">
            <div className="card-header">
              <div className="card-title-group">
                <h2>Customer List</h2>
                <p className="card-note">
                  Search by name or phone, then filter by debt status
                </p>
              </div>
              <button className="btn btn-primary" type="button">
                + Add Customer
              </button>
            </div>

            <div className="filter-bar">
              <div className="form-field search-field">
                <span>Search</span>
                <input
                  type="text"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  placeholder="Name or phone"
                />
              </div>

              <div className="form-field">
                <span>Status</span>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Overdue">Overdue</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Active Debts</th>
                    <th>Remaining Debt</th>
                    <th>Last Payment</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.fullName}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.address}</td>
                      <td>{customer.activeDebtsCount}</td>
                      <td className="amount-cell">
                        <MoneyText amount={customer.remainingDebt} />
                      </td>
                      <td>{customer.lastPaymentDate}</td>
                      <td>
                        <DebtStatusBadge status={customer.status} />
                      </td>
                      <td>
                        <div className="table-actions">
                          <button className="btn btn-subtle" type="button">
                            View
                          </button>
                          <button className="btn btn-ghost" type="button">
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredCustomers.length === 0 && (
              <div className="empty-state">
                No customers matched current filters. Try another search term.
              </div>
            )}
          </section>
        )

      case 'nasiya':
        return (
          <section className="nasiya-layout">
            <article className="card">
              <div className="card-header">
                <div className="card-title-group">
                  <h2>New Nasiya Form</h2>
                  <p className="card-note">Auto calculations with markup and daily payment</p>
                </div>
                <button className="btn btn-primary" type="button">
                  Confirm Contract
                </button>
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <span>Customer</span>
                  <select
                    value={nasiyaForm.customerId}
                    onChange={(event) =>
                      setNasiyaForm((prev) => ({ ...prev, customerId: event.target.value }))
                    }
                  >
                    {customerRows.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.fullName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <span>Product Name</span>
                  <input
                    type="text"
                    value={nasiyaForm.productName}
                    onChange={(event) =>
                      setNasiyaForm((prev) => ({ ...prev, productName: event.target.value }))
                    }
                    placeholder="Product"
                  />
                </div>

                <div className="form-field">
                  <span>Unit Price</span>
                  <input
                    type="number"
                    min={0}
                    value={nasiyaForm.unitPrice}
                    onChange={(event) =>
                      setNasiyaForm((prev) => ({
                        ...prev,
                        unitPrice: Math.max(0, Number(event.target.value) || 0),
                      }))
                    }
                  />
                </div>

                <div className="form-field">
                  <span>Quantity</span>
                  <input
                    type="number"
                    min={1}
                    value={nasiyaForm.quantity}
                    onChange={(event) =>
                      setNasiyaForm((prev) => ({
                        ...prev,
                        quantity: Math.max(1, Number(event.target.value) || 1),
                      }))
                    }
                  />
                </div>

                <div className="form-field">
                  <span>Markup %</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={nasiyaForm.markupPercent}
                    onChange={(event) =>
                      setNasiyaForm((prev) => ({
                        ...prev,
                        markupPercent: Math.min(
                          100,
                          Math.max(0, Number(event.target.value) || 0),
                        ),
                      }))
                    }
                  />
                </div>

                <div className="form-field">
                  <span>Start Date</span>
                  <input
                    type="date"
                    value={nasiyaForm.startDate}
                    onChange={(event) =>
                      setNasiyaForm((prev) => ({ ...prev, startDate: event.target.value }))
                    }
                  />
                </div>

                <div className="form-field">
                  <span>Daily Payment Amount</span>
                  <input
                    type="number"
                    min={0}
                    value={nasiyaForm.dailyPayment}
                    onChange={(event) =>
                      setNasiyaForm((prev) => ({
                        ...prev,
                        dailyPayment: Math.max(0, Number(event.target.value) || 0),
                      }))
                    }
                  />
                </div>

                <div className="form-field full-width">
                  <span>Notes</span>
                  <textarea
                    value={nasiyaForm.notes}
                    onChange={(event) =>
                      setNasiyaForm((prev) => ({ ...prev, notes: event.target.value }))
                    }
                    placeholder="Optional comments"
                  />
                </div>
              </div>

              <div className="calculation-box">
                <p className="section-label">Live Calculation Preview</p>
                <ul className="summary-list">
                  <li>
                    <span>Total base (unit x qty)</span>
                    <strong>
                      <MoneyText amount={totalBase} />
                    </strong>
                  </li>
                  <li>
                    <span>Markup amount</span>
                    <strong>
                      <MoneyText amount={markupAmount} />
                    </strong>
                  </li>
                  <li>
                    <span>Total debt with markup</span>
                    <strong>
                      <MoneyText amount={totalDebt} />
                    </strong>
                  </li>
                  <li>
                    <span>Estimated days to close</span>
                    <strong>{daysEstimated} days</strong>
                  </li>
                </ul>

                {nasiyaForm.dailyPayment <= 0 && (
                  <p className="warning-text">Daily payment must be greater than 0.</p>
                )}
              </div>
            </article>

            <article className="card">
              <div className="card-header">
                <div className="card-title-group">
                  <h2>Nasiya Detail Preview</h2>
                  <p className="card-note">Contract details and debt overview</p>
                </div>
                <DebtStatusBadge status={totalDebt > 0 ? 'Active' : 'Closed'} />
              </div>

              <ul className="summary-list">
                <li>
                  <span>Customer</span>
                  <strong>{selectedCustomer?.fullName ?? 'Unknown customer'}</strong>
                </li>
                <li>
                  <span>Product</span>
                  <strong>{nasiyaForm.productName || '-'}</strong>
                </li>
                <li>
                  <span>Total debt</span>
                  <strong>
                    <MoneyText amount={totalDebt} />
                  </strong>
                </li>
                <li>
                  <span>Paid amount</span>
                  <strong>
                    <MoneyText amount={0} />
                  </strong>
                </li>
                <li>
                  <span>Remaining amount</span>
                  <strong>
                    <MoneyText amount={totalDebt} />
                  </strong>
                </li>
                <li>
                  <span>Next due date</span>
                  <strong>{nasiyaForm.startDate}</strong>
                </li>
              </ul>

              <h3 className="section-heading">Existing Debts</h3>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Product</th>
                      <th>Total Debt</th>
                      <th>Daily</th>
                      <th>Remaining</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {debtRows.map((debt) => (
                      <tr key={debt.id}>
                        <td>{debt.customer}</td>
                        <td>{debt.product}</td>
                        <td className="amount-cell">
                          <MoneyText amount={debt.totalDebt} />
                        </td>
                        <td className="amount-cell">
                          <MoneyText amount={debt.dailyPayment} />
                        </td>
                        <td className="amount-cell">
                          <MoneyText amount={debt.remaining} />
                        </td>
                        <td>
                          <DebtStatusBadge status={debt.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </section>
        )

      case 'payments':
        return (
          <section className="content-grid">
            <article className="card">
              <div className="card-header">
                <div className="card-title-group">
                  <h2>Daily Payment Entry</h2>
                  <p className="card-note">Action-first flow for cashier operations</p>
                </div>
                <span className="pill">
                  Today collected: <MoneyText amount={todayTotalCollected} />
                </span>
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <span>Customer</span>
                  <select defaultValue="Abdulloh Karimov">
                    {customerRows.map((customer) => (
                      <option key={customer.id} value={customer.fullName}>
                        {customer.fullName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <span>Select active debt</span>
                  <select defaultValue="iPhone 13 128GB">
                    {debtRows
                      .filter((debt) => debt.status !== 'Closed')
                      .map((debt) => (
                        <option key={debt.id} value={debt.product}>
                          {debt.product}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-field">
                  <span>Payment amount</span>
                  <input type="number" min={0} defaultValue={180000} />
                </div>

                <div className="form-field">
                  <span>Payment date</span>
                  <input type="date" defaultValue="2026-04-22" />
                </div>

                <div className="form-field">
                  <span>Method</span>
                  <select defaultValue="Cash">
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Transfer">Transfer</option>
                  </select>
                </div>

                <div className="form-field full-width">
                  <span>Comment</span>
                  <textarea placeholder="Optional comment for this payment" />
                </div>
              </div>

              <div className="card-actions">
                <button className="btn btn-primary" type="button">
                  Save Payment
                </button>
                <button className="btn btn-subtle" type="button">
                  Reset
                </button>
              </div>
            </article>

            <article className="card">
              <div className="card-header">
                <div className="card-title-group">
                  <h2>Payment History</h2>
                  <p className="card-note">Filter by date range, customer, or debt</p>
                </div>
                <button className="btn btn-ghost" type="button">
                  Export (Soon)
                </button>
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Customer</th>
                      <th>Debt</th>
                      <th>Method</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistoryRows.map((payment) => (
                      <tr key={payment.id}>
                        <td>{payment.date}</td>
                        <td>{payment.customer}</td>
                        <td>{payment.debt}</td>
                        <td>{payment.method}</td>
                        <td className="amount-cell">
                          <MoneyText amount={payment.amount} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </section>
        )

      case 'reports':
        return (
          <>
            <section className="kpi-grid">
              {reportKpis.map((kpi) => (
                <KpiCard key={kpi.title} {...kpi} />
              ))}
            </section>

            <section className="reports-grid">
              <article className="card">
                <div className="card-header">
                  <div className="card-title-group">
                    <h2>Monthly Collection Trend</h2>
                    <p className="card-note">Performance over the last 6 months</p>
                  </div>
                </div>

                <div className="trend-list">
                  {monthlyTrend.map((point) => (
                    <div className="trend-row" key={point.month}>
                      <span className="trend-month">{point.month}</span>
                      <div className="trend-track">
                        <div
                          className="trend-fill"
                          style={{ width: `${(point.amount / maxTrendValue) * 100}%` }}
                        />
                      </div>
                      <span className="trend-value">{formatMoney(point.amount)}</span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="card">
                <div className="card-header">
                  <div className="card-title-group">
                    <h2>Top Paying Customers</h2>
                    <p className="card-note">Highest total paid amount in current quarter</p>
                  </div>
                </div>

                <div className="top-payers">
                  {topPayingCustomers.map((customer) => (
                    <div className="top-payer-item" key={customer.id}>
                      <div>
                        <p className="overdue-name">{customer.name}</p>
                        <p className="overdue-meta">{customer.contracts} contracts</p>
                      </div>
                      <p className="amount-cell">
                        <MoneyText amount={customer.amount} />
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          </>
        )

      default:
        return null
    }
  })()

  return (
    <div className="app-shell">
      <aside className={`sidebar ${isMobileNavOpen ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-mark">N</div>
          <div>
            <p className="brand-title">Nasiya Savdo</p>
            <p className="brand-subtitle">Boshqaruv Tizimi</p>
          </div>
        </div>

        <nav className="nav-list" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`nav-item ${activePage === item.key ? 'is-active' : ''}`}
              onClick={() => handleNavChange(item.key)}
            >
              <span>{item.label}</span>
              {item.badge ? <span className="nav-item-badge">{item.badge}</span> : null}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          Last sync: <strong>{dateFormatter.format(new Date())}</strong>
        </div>
      </aside>

      {isMobileNavOpen && (
        <button
          className="sidebar-overlay"
          type="button"
          aria-label="Close navigation"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}

      <div className="main-layout">
        <header className="top-header">
          <div className="top-header-left">
            <button
              className="mobile-nav-button"
              type="button"
              aria-label="Open navigation"
              onClick={() => setIsMobileNavOpen(true)}
            >
              ☰
            </button>

            <div>
              <p className="breadcrumbs">Main App / {activePageInfo.title}</p>
              <h1>{activePageInfo.title}</h1>
              <p className="page-subtitle">{activePageInfo.subtitle}</p>
            </div>
          </div>

          <div className="top-header-right">
            <label className="field-inline">
              <span>Branch</span>
              <select
                value={selectedBranch}
                onChange={(event) => setSelectedBranch(event.target.value)}
              >
                <option value="Chilonzor">Chilonzor</option>
                <option value="Yunusobod">Yunusobod</option>
                <option value="Sergeli">Sergeli</option>
              </select>
            </label>

            <button className="avatar-button" type="button" aria-label="User menu">
              AB
            </button>
          </div>
        </header>

        <main className="page-content">{pageContent}</main>
      </div>
    </div>
  )
}

export default App
