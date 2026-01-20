import { useState } from "react"
import { Link, useLocation, Outlet } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Calendar,
  ClipboardList,
  BarChart3,
  UserPlus,
  HelpCircle,
  Settings,
  ChevronDown,
  Search,
  Bell,
  MessageSquare,
  Menu,
  X,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react"
import { useTheme } from "next-themes"

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedNavItems, setExpandedNavItems] = useState<string[]>(["Контрагенти"])
  const { theme, setTheme } = useTheme()
  const location = useLocation()

  const isContractorsRoute = location.pathname.startsWith("/contractors") ||
                             location.pathname.startsWith("/clients") ||
                             location.pathname.startsWith("/suppliers")

  const isContractorDetails = location.pathname.startsWith("/contractors/")

  const navItems = [
    { icon: LayoutDashboard, label: "Табло", active: false, path: "/" },
    {
      icon: Users,
      label: "Контрагенти",
      active: isContractorsRoute,
      hasChildren: true,
      expanded: expandedNavItems.includes("Контрагенти"),
      children: [
        { label: "Клиенти", active: location.pathname === "/clients", path: "/clients" },
        { label: "Доставчици", active: location.pathname === "/suppliers", path: "/suppliers" },
      ],
      path: "/contractors",
    },
    { icon: CheckSquare, label: "Задачи", active: false, path: "/tasks" },
    { icon: Calendar, label: "График", active: false, path: "/schedule" },
    { icon: ClipboardList, label: "Документи", active: false, path: "/documents" },
    { icon: BarChart3, label: "Отчети", active: false, path: "/reports" },
    { icon: UserPlus, label: "Кандидатстване", active: false, path: "/applications" },
    { icon: HelpCircle, label: "Помощ и поддръжка", active: false, path: "/help" },
    { icon: Settings, label: "Настройки", active: false, path: "/settings" },
  ]

  const toggleNavItem = (label: string) => {
    if (expandedNavItems.includes(label)) {
      setExpandedNavItems(expandedNavItems.filter((item) => item !== label))
    } else {
      setExpandedNavItems([...expandedNavItems, label])
    }
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-white dark:bg-slate-800 border-r-2 border-slate-300 dark:border-slate-700 transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="p-4 border-b-2 border-slate-300 dark:border-slate-700 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">HR</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 dark:text-slate-100">HR Система</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Управление на ресурси</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {navItems.map((item, index) => (
            <div key={index}>
              {item.hasChildren ? (
                <>
                  <button
                    onClick={() => {
                      toggleNavItem(item.label)
                      if (item.path && !expandedNavItems.includes(item.label)) {
                        window.location.href = item.path
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all mb-1 ${
                      item.active
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${item.expanded ? "rotate-180" : ""}`}
                    />
                  </button>
                  {item.expanded && item.children && (
                    <div className="ml-4 mb-1">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          to={child.path}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all mb-1 text-sm ${
                            child.active
                              ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-medium"
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                          }`}
                        >
                          <ChevronRight className="w-4 h-4" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path || "/"}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all mb-1 ${
                    item.active
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="p-3 border-t-2 border-slate-300 dark:border-slate-700">
          <div className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
            <Avatar className="w-10 h-10 border-2 border-emerald-600">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>ИП</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Иван Петров</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Служител</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-white dark:bg-slate-800 border-b-2 border-slate-300 dark:border-slate-700 flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-700 dark:text-slate-300"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div className="relative hidden lg:block">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Търсене..."
                className="pl-10 pr-4 py-2 w-80 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-slate-700 dark:text-slate-300"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="sm" className="relative text-slate-700 dark:text-slate-300">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-700 dark:text-slate-300">
              <MessageSquare className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <Outlet />
      </div>
    </div>
  )
}
