import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'

import { AppLayout } from './ui/AppLayout'
import { PageNotFound } from './pages/PageNotFound'
import { Customers } from './pages/Cutomers'
import { Loans } from './pages/Loans'
import { Reports } from './pages/Reports'
import { Payments } from './pages/Payments'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected routes */}
        <Route element={<ProtectedRoute/>}>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="loans" element={<Loans />} />
            <Route path="payments" element={<Payments />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Route>
        
        {/* Public routes */}
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
