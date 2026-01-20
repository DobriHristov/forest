import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '../components/theme-provider'
import { ContractorsProvider } from '../contexts/ContractorsContext'
import { Layout } from '../pages/Layout'
import { DashboardPage } from '../pages/DashboardPage'
import { ContractorsPage } from '../pages/ContractorsPage'
import { ClientsPage } from '../pages/ClientsPage'
import { SuppliersPage } from '../pages/SuppliersPage'
import { ContractorDetailsPage } from '../pages/ContractorDetailsPage'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <ContractorsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<DashboardPage />} />
              <Route path="contractors" element={<ContractorsPage />} />
              <Route path="contractors/:id" element={<ContractorDetailsPage />} />
              <Route path="clients" element={<ClientsPage />} />
              <Route path="suppliers" element={<SuppliersPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ContractorsProvider>
    </ThemeProvider>
  )
}

export default App
