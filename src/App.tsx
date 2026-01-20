import { EmployeeDashboard } from '../components/employee-dashboard'
import { ThemeProvider } from '../components/theme-provider'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <EmployeeDashboard />
    </ThemeProvider>
  )
}

export default App
