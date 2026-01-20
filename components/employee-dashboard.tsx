"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { CardContent } from "@/components/ui/card"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import React from "react"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  Mail,
  Phone,
  Clock,
  MapPin,
  ChevronRight,
  Menu,
  X,
  DollarSign,
  Award,
  FileText,
  Target,
  CheckCircle2,
  Download,
  Trash2,
  ArrowUpDown,
  ChevronLeft,
  Moon,
  Sun,
  TreePine,
  Star,
  TrendingUp,
  Building2,
  User,
  Briefcase,
  Edit2,
  Check,
  Plus,
  Minus,
  Maximize2,
} from "lucide-react"
// Removed unused imports: useMemo, MaterialReactTable, type MRT_ColumnDef, useMaterialReactTable, Eye
// Added new imports: Download, Trash2

type Document = {
  id: number
  name: string
  type: string
  acceptDate: string
  completionDate: string
  price: string
  status: string
  description: string
  quality: string[] // Added quality field to track quality badges
}

type Payslip = {
  name: string
  date: string
  amount: string
  status: string
}

type Task = {
  id: number
  name: string
  startDate: string
  endDate: string
  progress: number
  assignee: string
}

// Added type for contractor view state
type ContractorView = "contractors-list" | "contractor-details" | "clients-list" | "suppliers-list"

export function EmployeeDashboard() {
  const [windowPositions, setWindowPositions] = useState<{
    address: { x: number; y: number; width: number; height: number }
    contractor: { x: number; y: number; width: number; height: number }
  }>({
    address: { x: 100, y: 100, width: 600, height: 600 },
    contractor: {
      x: 20,
      y: 20,
      width: 1600,
      height: 900,
    },
  })

  // Center windows on mount (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const contractorWidth = Math.min(window.innerWidth * 0.95, 1800)
      const contractorHeight = Math.min(window.innerHeight * 0.95, 950)

      setWindowPositions({
        address: {
          x: window.innerWidth / 2 - 300,
          y: window.innerHeight / 2 - 300,
          width: 600,
          height: 600
        },
        contractor: {
          x: (window.innerWidth - contractorWidth) / 2,
          y: (window.innerHeight - contractorHeight) / 2,
          width: contractorWidth,
          height: contractorHeight,
        },
      })
    }
  }, [])

  const [dragging, setDragging] = useState<{ window: string | null; offsetX: number; offsetY: number }>({
    window: null,
    offsetX: 0,
    offsetY: 0,
  })

  const [minimizedWindows, setMinimizedWindows] = useState<
    Array<{ id: string; title: string; type: "address" | "contractor" }>
  >([])

  const [currentView, setCurrentView] = useState<ContractorView>("contractors-list")
  const [selectedContractorId, setSelectedContractorId] = useState<number | null>(null)

  const [activeTab, setActiveTab] = useState("documents")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [addContactPanelOpen, setAddContactPanelOpen] = useState(false)
  const [contactSearchQuery, setContactSearchQuery] = useState("")
  const [selectedContactForDetails, setSelectedContactForDetails] = useState<{
    id: number
    name: string
    type: string
    quality?: string[] // Added quality
    isMol?: boolean // Added isMol
    isContactPerson?: boolean // Added isContactPerson
    nationality?: string // Added nationality
  } | null>(null)
  const [showNewContactForm, setShowNewContactForm] = useState(false)
  const [pendingSavedContacts, setPendingSavedContacts] = useState<
    Array<{
      name: string
      type: string
      representation: string
      quality: string[] // Changed to array for multi-select
      isMol: boolean
      isContactPerson: boolean
      nationality: string // Added nationality field
    }>
  >([])
  const [newContactData, setNewContactData] = useState({
    name: "",
    type: "", // Changed from "Физическо лице" to empty for user selection
    nationality: "България",
    representation: "Се представлява от",
    quality: [] as string[], // Changed to array for multi-select
    isMol: false,
    isContactPerson: false,
  })

  const [accordionOpen, setAccordionOpen] = useState<{ [key: string]: boolean }>({
    clients: false,
    info: false,
    representedBy: true, // Default to true for "Се представлява от"
    represents: false,
    contact: true, // Default to true for Contact Info
    address: true, // Default to true for Address Info
  })

  const [editingField, setEditingField] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    personType: "Физическо лице",
    country: "България",
    fullName: "Мария Илиева",
    egn: "9512154321",
    lnch: "123456789",
    bulstat: "-",
    otherIdNumber: "-",
    vatId: "BG9512154321",
    otherTaxId: "-",
    iban: "BG80 BNBG 9661 1020 3456 78",
  })

  const countries = [
    { name: "България", flag: "🇧🇬", code: "BG" },
    { name: "Германия", flag: "🇩🇪", code: "DE" },
    { name: "Франция", flag: "🇫🇷", code: "FR" },
    { name: "Италия", flag: "🇮🇹", code: "IT" },
    { name: "Испания", flag: "🇪🇸", code: "ES" },
    { name: "Великобритания", flag: "🇬🇧", code: "GB" },
    { name: "САЩ", flag: "🇺🇸", code: "US" },
    { name: "Канада", flag: "🇨🇦", code: "CA" },
    { name: "Австралия", flag: "🇦🇺", code: "AU" },
    { name: "Япония", flag: "🇯🇵", code: "JP" },
  ]

  const personTypes = ["Физическо лице", "Юридическо лице"]
  const qualityOptions = ["Клиент", "Доставчик", "Подизпълнител", "Партньор", "Платец"] // Added quality options

  const [selectedContactQuality, setSelectedContactQuality] = useState<string[]>([])
  const [selectedContactMol, setSelectedContactMol] = useState(false)
  const [selectedContactContactPerson, setSelectedContactContactPerson] = useState(false)

  const [filterName, setFilterName] = useState("")
  const [filterType, setFilterType] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [filterQuality, setFilterQuality] = useState<string[]>([])

  const [showQualityFilterPopup, setShowQualityFilterPopup] = useState(false)

  const [showFilteredOrdersPopup, setShowFilteredOrdersPopup] = useState(false)
  const [selectedQualityFilter, setSelectedQualityFilter] = useState("")

  const [rightPanelWidth, setRightPanelWidth] = useState(1100)
  const [isResizing, setIsResizing] = useState(false)
  const [addressPanelWidth, setAddressPanelWidth] = useState(500)
  const [isAddressPanelResizing, setIsAddressPanelResizing] = useState(false)
  const [supplierScope, setSupplierScope] = useState("")
  const [supplierDescription, setSupplierDescription] = useState("")

  // Added state for editing address and panel visibility
  const [addAddressPanelOpen, setAddAddressPanelOpen] = useState(false)
  const [editingAddressIndex, setEditingAddressIndex] = useState<number | null>(null)
  const [editingAddress, setEditingAddress] = useState<any>(null) // State to hold the address being edited
  const [isAddressPanelOpen, setIsAddressPanelOpen] = useState(false) // State to control the visibility of the address panel
  const [addresses, setAddresses] = useState([
    {
      type: "Постоянен адрес",
      country: "България",
      city: "София",
      street: "бул. Витоша 15",
      postalCode: "1000",
    },
  ])
  const [newAddressData, setNewAddressData] = useState({
    type: "Постоянен адрес",
    country: "България",
    region: "",
    municipality: "",
    city: "",
    street: "",
    postalCode: "",
    purpose: "",
    description: "",
  })

  const [contactInfo, setContactInfo] = useState({
    email: "maria.ilieva@example.com",
    phone: "+359 2 123 4567",
    mobile: "+359 88 123 4567",
    website: "www.example.com",
  })

  const [addContractorDialogOpen, setAddContractorDialogOpen] = useState(false)
  const [contractorFormMode, setContractorFormMode] = useState<"short" | "full">("short")
  const [sectionModes, setSectionModes] = useState<{ [key: string]: "short" | "full" }>({
    identification: "short",
    taxInfo: "short",
    financialInfo: "short",
    classification: "short",
    contactInfo: "short",
    addressInfo: "short",
    metadata: "short",
  })
  // Initialize newContractorData here
  const [newContractorData, setNewContractorData] = useState({
    type: "Физическо лице",
    country: "България",
    name: "",
    alias: "",
    egn: "",
    birthDate: "",
    vatId: "",
    otherTaxId: "",
    iban: "",
    currency: "",
    organizationalForm: "",
    legalStatus: "",
    taxStatus: "",
    professionalCategory: "",
    phone: "",
    phoneType: "",
    email: "",
    phonePurpose: "",
    emailType: "",
    emailPurpose: "",
    // Address fields
    addressCountry: "България",
    region: "",
    municipality: "",
    city: "",
    postalCode: "",
    address: "",
    addressType: "Постоянен адрес",
    addressPurpose: "",
    addressDescription: "",
    // Metadata fields
    externalId: "",
    status: "Активен",
    version: "1.0",
  })
  const [contractorFormData, setContractorFormData] = useState({
    // Идентификация
    name: "",
    alias: "",
    egn: "",
    birthDate: "",
    // Данъчна информация
    vatId: "",
    otherTaxId: "",
    // Финансово/Банкова информация
    iban: "",
    currency: "",
    // Класификация и статут
    organizationalForm: "",
    legalStatus: "",
    taxStatus: "",
    professionalCategory: "",
    // Контактна информация
    phone: "",
    phoneType: "",
    email: "",
    phonePurpose: "",
    emailType: "",
    emailPurpose: "",
    // Address fields
    city: "",
    postalCode: "",
    address: "",
    addressCountry: "България",
    region: "",
    municipality: "",
    addressType: "Постоянен адрес",
    addressPurpose: "",
    addressDescription: "",
    // Metadata fields
    externalId: "",
    status: "Активен",
    version: "1.0",
  })

  const handleContractorFieldChange = (field: string, value: string) => {
    setContractorFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFieldEdit = (field: string) => {
    setEditingField(field)
  }

  const handleFieldSave = () => {
    setEditingField(null)
  }

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getCountryFlag = (countryName: string) => {
    return countries.find((c) => c.name === countryName)?.flag || "🌍"
  }

  const handleEditAddress = (index: number) => {
    setEditingAddressIndex(index)
    setNewAddressData(addresses[index])
    setIsAddressPanelOpen(true) // Open the address panel
  }

  const handleSaveAddress = () => {
    if (editingAddressIndex !== null) {
      // Edit existing address
      const updatedAddresses = [...addresses]
      updatedAddresses[editingAddressIndex] = newAddressData
      setAddresses(updatedAddresses)
    } else {
      // Add new address
      setAddresses([...addresses, newAddressData])
    }
    setIsAddressPanelOpen(false) // Close the panel
    setEditingAddressIndex(null)
    setNewAddressData({
      type: "Постоянен адрес",
      country: "България",
      region: "",
      municipality: "",
      city: "",
      street: "",
      postalCode: "",
      purpose: "",
      description: "",
    })
  }

  const handleDeleteAddress = (index: number) => {
    setAddresses(addresses.filter((_, i) => i !== index))
  }

  // Added state for contractor list filters and pagination
  const [contractorSearchName, setContractorSearchName] = useState("")
  const [contractorSearchType, setContractorSearchType] = useState("")
  const [contractorSearchQuality, setContractorSearchQuality] = useState<string[]>([])
  const [contractorBusinessRoleFilter, setContractorBusinessRoleFilter] = useState<string[]>([])
  const [supplierAreaFilter, setSupplierAreaFilter] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [contractorsPerPage, setContractorsPerPage] = useState(10)
  const [expandedNavItems, setExpandedNavItems] = useState<string[]>(["Контрагенти"])
  const [clientSearchMode, setClientSearchMode] = useState<"clients" | "all">("clients")
  const [supplierSearchMode, setSupplierSearchMode] = useState<"suppliers" | "all">("suppliers")

  // Pagination for clients
  const [clientsCurrentPage, setClientsCurrentPage] = useState(1)
  const [clientsPerPage, setClientsPerPage] = useState(10)

  // Pagination for suppliers
  const [suppliersCurrentPage, setSuppliersCurrentPage] = useState(1)
  const [suppliersPerPage, setSuppliersPerPage] = useState(10)
  
  const allSupplierAreas = ["Вода", "Алкохол", "Хотели", "Канцеларски материали", "Компютърна техника"]

  const toggleNavExpand = (label: string) => {
    if (expandedNavItems.includes(label)) {
      setExpandedNavItems(expandedNavItems.filter((item) => item !== label))
    } else {
      setExpandedNavItems([...expandedNavItems, label])
    }
  }

  const navItems = [
    { icon: LayoutDashboard, label: "Табло", active: false, onClick: () => {} },
    {
      icon: Users,
      label: "Контрагенти",
      active: currentView === "contractors-list" || currentView === "clients-list" || currentView === "suppliers-list",
      hasChildren: true,
      expanded: expandedNavItems.includes("Контрагенти"),
      onClick: () => {
        setCurrentView("contractors-list")
        if (!expandedNavItems.includes("Контрагенти")) {
          setExpandedNavItems([...expandedNavItems, "Контрагенти"])
        }
      },
      children: [
        {
          label: "Клиенти",
          active: currentView === "clients-list",
          onClick: () => setCurrentView("clients-list"),
        },
        {
          label: "Доставчици",
          active: currentView === "suppliers-list",
          onClick: () => setCurrentView("suppliers-list"),
        },
      ],
    },
    {
      icon: FileText,
      label: "Поръчки",
      active: currentView === "contractor-details",
      onClick: () => setCurrentView("contractor-details"),
    },
    { icon: CheckSquare, label: "Страница", active: false, onClick: () => {} },
    { icon: Calendar, label: "Страница", active: false, onClick: () => {} },
    { icon: ClipboardList, label: "Страница", active: false, onClick: () => {} },
    { icon: ClipboardList, label: "Страница", active: false, onClick: () => {} },
    { icon: BarChart3, label: "Страница", active: false, onClick: () => {} },
    { icon: UserPlus, label: "Страница", active: false, onClick: () => {} },
  ]

  const tabs = [
    { id: "documents", label: "Поръчки" }, // Changed from "Проекти" to "Поръчки"
    { id: "general", label: "Таб" },
    { id: "job", label: "Таб" },
    { id: "payroll", label: "Таб" },
    { id: "performance", label: "Таб" },
    { id: "setting", label: "Таб" },
  ]

  const documents: Document[] = [
    {
      id: 1,
      name: "Редизайн на Уебсайт",
      type: "Уеб Дизайн",
      acceptDate: "2024-01-15",
      completionDate: "2024-03-20",
      price: "8,500 лв",
      status: "Завършен",
      description: "Пълен редизайн на корпоративен уебсайт с модерен интерфейс и подобрено потребителско изживяване.",
      quality: ["Клиент", "Партньор"], // Added quality badges for first document
    },
    {
      id: 2,
      name: "Мобилно Приложение",
      type: "UI/UX Дизайн",
      acceptDate: "2024-02-01",
      completionDate: "2024-05-15",
      price: "12,000 лв",
      status: "Завършен",
      description: "Дизайн на iOS и Android мобилно приложение за електронна търговия с интуитивна навигация.",
      quality: ["Подизпълнител", "Доставчик"], // Added quality badges for second document
    },
    {
      id: 3,
      name: "Брандинг Пакет",
      type: "Брандинг",
      acceptDate: "2024-03-10",
      completionDate: "2024-06-30",
      price: "15,500 лв",
      status: "В процес",
      description: "Изработка на цялостна корпоративна идентичност - лого, цветова палитра, типография и стил гайд.",
      quality: ["Клиент", "Платец"], // Added quality badges for third document
    },
    {
      id: 4,
      name: "Маркетинг Кампания",
      type: "Графичен Дизайн",
      acceptDate: "2024-04-05",
      completionDate: "2024-07-20",
      price: "6,800 лв",
      description:
        "Създаване на визуални материали за дигитална маркетинг кампания - банери, постове, рекламни материали.",
      quality: ["Контактно лице", "Доставчик"], // Added quality badges for fourth document
    },
    {
      id: 5,
      name: "Dashboard Система",
      type: "UI Дизайн",
      acceptDate: "2024-05-12",
      completionDate: "2024-08-30",
      price: "18,200 лв",
      status: "Планиран",
      description: "Проектиране на аналитична dashboard система с визуализация на данни и интерактивни компоненти.",
      quality: ["Партньор", "Клиент", "МОЛ"], // Added quality badges for fifth document
    },
  ]

  const payslips: Payslip[] = [
    { name: "Заплата_20_Авг.pdf", date: "Август 2024", amount: "10,400 лв", status: "Платено" },
    { name: "Заплата_20_Сеп.pdf", date: "Септември 2024", amount: "10,400 лв", status: "Платено" },
    { name: "Заплата_20_Окт.pdf", date: "Октомври 2024", amount: "10,800 лв", status: "Платено" },
    { name: "Заплата_20_Ное.pdf", date: "Ноември 2024", amount: "10,800 лв", status: "Платено" },
    { name: "Заплата_20_Дек.pdf", date: "Декември 2024", amount: "11,200 лв", status: "Обработва се" },
  ]

  const tasks: Task[] = [
    {
      id: 1,
      name: "Q1 Преглед на Дизайн",
      startDate: "2024-01-01",
      endDate: "2024-01-15",
      progress: 100,
      assignee: "Пристия",
    },
    {
      id: 2,
      name: "Нова Корпоративна Идентичност",
      startDate: "2024-01-10",
      endDate: "2024-02-28",
      progress: 100,
      assignee: "Пристия",
    },
    {
      id: 3,
      name: "Редизайн на Интерфейс",
      startDate: "2024-02-15",
      endDate: "2024-04-30",
      progress: 100,
      assignee: "Екип",
    },
    {
      id: 4,
      name: "Презентация за Клиент",
      startDate: "2024-03-01",
      endDate: "2024-03-15",
      progress: 100,
      assignee: "Пристия",
    },
    {
      id: 5,
      name: "Курс 3D Моделиране",
      startDate: "2024-09-01",
      endDate: "2024-10-20",
      progress: 100,
      assignee: "Пристия",
    },
    {
      id: 6,
      name: "Q4 Кампания Ресурси",
      startDate: "2024-10-01",
      endDate: "2024-12-15",
      progress: 75,
      assignee: "Пристия",
    },
    {
      id: 7,
      name: "Подготовка Годишен Преглед",
      startDate: "2024-11-15",
      endDate: "2024-12-31",
      progress: 60,
      assignee: "Пристия",
    },
  ]

  const GanttChart = () => {
    const months = ["Ян", "Фев", "Мар", "Апр", "Май", "Юни", "Юли", "Авг", "Сеп", "Окт", "Ное", "Дек"]

    const getTaskPosition = (startDate: string, endDate: string) => {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const yearStart = new Date(2024, 0, 1)
      const yearEnd = new Date(2024, 11, 31)

      const totalDays = (yearEnd.getTime() - yearStart.getTime()) / (1000 * 60 * 60 * 24)
      const startOffset = (start.getTime() - yearStart.getTime()) / (1000 * 60 * 60 * 24)
      const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)

      return {
        left: `${(startOffset / totalDays) * 100}%`,
        width: `${(duration / totalDays) * 100}%`,
      }
    }

    return (
      <div className="space-y-3">
        <div className="flex border-b pb-2">
          {months.map((month, i) => (
            <div key={i} className="flex-1 text-center text-xs font-medium text-slate-600">
              {month}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {tasks.map((task) => {
            const position = getTaskPosition(task.startDate, task.endDate)
            return (
              <div key={task.id} className="relative">
                <div className="text-xs font-medium text-slate-900 mb-1 truncate">{task.name}</div>
                <div className="relative h-8 bg-slate-100 rounded-lg">
                  <div
                    className="absolute top-1 bottom-1 rounded-md bg-gradient-to-r from-orange-400 to-orange-500 flex items-center px-2"
                    style={{ left: position.left, width: position.width }}
                  >
                    <span className="text-xs text-white font-medium">{task.progress}%</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const timelineEvents = [
    {
      date: "15 Дек, 2024",
      title: "Годишен Преглед Завършен",
      description: "Оценка на ефективността: 4.5/5",
      type: "success",
      icon: Award,
    },
    {
      date: "30 Ное, 2024",
      title: "Заплата Генерирана",
      description: "Налична е заплатата за ноември 2024",
      type: "info",
      icon: DollarSign,
    },
    {
      date: "20 Окт, 2024",
      title: "Обучение Завършено",
      description: "Усъвършенстван курс по 3D моделиране",
      type: "success",
      icon: CheckCircle2,
    },
    {
      date: "15 Сеп, 2024",
      title: "Етап от Проект",
      description: "Доставени дизайн ресурси за Q3",
      type: "success",
      icon: Target,
    },
    {
      date: "10 Авг, 2024",
      title: "Договор Актуализиран",
      description: "Трудовият договор е подновен",
      type: "info",
      icon: FileText,
    },
  ]

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  // Added toggleAccordion function
  const toggleAccordion = (section: string) => {
    setAccordionOpen((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleDocumentClick = (doc: Document) => {
    setSelectedDocument(doc)
  }

  const closeDocumentDetails = () => {
    setSelectedDocument(null)
  }

  const availableContacts = [
    {
      id: 1,
      name: "Георги Петков",
      type: "Физическо лице",
      quality: ["Клиент", "Платец"],
      businessRole: ["Клиент"],
      email: "georgi.petkov@example.com",
      phone: "+359 888 111 222",
      address: "София, България",
      supplierArea: [],
    },
    {
      id: 2,
      name: "Анна Стоянова",
      type: "Физическо лице",
      quality: ["Партньор", "Доставчик"],
      businessRole: ["Доставчик"],
      email: "anna.stoyanova@example.com",
      phone: "+359 888 333 444",
      address: "Пловдив, България",
      supplierArea: ["Вода", "Алкохол"],
    },
    {
      id: 3,
      name: "Технолинк ЕООД",
      type: "Юридическо лице",
      quality: ["Подизпълнител", "МОЛ"],
      businessRole: ["Клиент", "Доставчик"],
      email: "info@technolink.bg",
      phone: "+359 888 555 666",
      address: "Варна, България",
      supplierArea: ["Компютърна техника"],
    },
    {
      id: 4,
      name: "Дигитал Солюшънс АД",
      type: "Юридическо лице",
      quality: ["Клиент", "Контактно лице"],
      businessRole: ["Клиент"],
      email: "contact@digitalsolutions.com",
      phone: "+359 888 777 888",
      address: "София, България",
      supplierArea: [],
    },
    {
      id: 5,
      name: "Петър Василев",
      type: "Физическо лице",
      quality: ["Платец"],
      businessRole: ["Доставчик"],
      email: "petar.vassilev@example.com",
      phone: "+359 888 999 000",
      address: "Бургас, България",
      supplierArea: ["Хотели", "Канцеларски материали"],
    },
    {
      id: 6,
      name: "Крийтив Студио ООД",
      type: "Юридическо лице",
      quality: ["Партньор"],
      businessRole: ["Клиент"],
      email: "studio@creative.bg",
      phone: "+359 888 123 123",
      address: "Пловдив, България",
      supplierArea: [],
    },
    {
      id: 7,
      name: "Мартин Колев",
      type: "Физическо лице",
      quality: ["Доставчик"],
      businessRole: ["Доставчик"],
      email: "martin.kolev@example.com",
      phone: "+359 888 456 456",
      address: "Варна, България",
      supplierArea: ["Вода", "Канцеларски материали"],
    },
    {
      id: 8,
      name: "Иновейт Груп АД",
      type: "Юридическо лице",
      quality: ["Клиент", "Платец"],
      businessRole: ["Клиент", "Доставчик"],
      email: "info@innovate.bg",
      phone: "+359 888 789 789",
      address: "София, България",
      supplierArea: ["Компютърна техника", "Алкохол"],
    },
    {
      id: 9,
      name: "Мария Димитрова",
      type: "Физическо лице",
      quality: ["Клиент"],
      businessRole: ["Клиент"],
      email: "maria.dimitrova@example.com",
      phone: "+359 888 234 567",
      address: "Русе, България",
      supplierArea: [],
    },
    {
      id: 10,
      name: "Търговия 2000 ООД",
      type: "Юридическо лице",
      quality: ["Доставчик"],
      businessRole: ["Доставчик"],
      email: "trade2000@example.bg",
      phone: "+359 888 345 678",
      address: "Плевен, България",
      supplierArea: ["Канцеларски материали"],
    },
    {
      id: 11,
      name: "Елена Георгиева",
      type: "Физическо лице",
      quality: ["Клиент", "Платец"],
      businessRole: ["Клиент"],
      email: "elena.georgieva@example.com",
      phone: "+359 888 456 789",
      address: "Стара Загора, България",
      supplierArea: [],
    },
    {
      id: 12,
      name: "Мега Трейд АД",
      type: "Юридическо лице",
      quality: ["Партньор"],
      businessRole: ["Доставчик"],
      email: "office@megatrade.bg",
      phone: "+359 888 567 890",
      address: "Бургас, България",
      supplierArea: ["Хотели", "Алкохол", "Вода"],
    },
    {
      id: 13,
      name: "Иван Стоянов",
      type: "Физическо лице",
      quality: ["Клиент"],
      businessRole: ["Клиент"],
      email: "ivan.stoyanov@example.com",
      phone: "+359 888 678 901",
      address: "Благоевград, България",
      supplierArea: [],
    },
    {
      id: 14,
      name: "Софт Солюшън ООД",
      type: "Юридическо лице",
      quality: ["Клиент", "МОЛ"],
      businessRole: ["Клиент"],
      email: "contact@softsolution.bg",
      phone: "+359 888 789 012",
      address: "София, България",
      supplierArea: [],
    },
    {
      id: 15,
      name: "Николай Иванов",
      type: "Физическо лице",
      quality: ["Доставчик"],
      businessRole: ["Доставчик"],
      email: "nikolay.ivanov@example.com",
      phone: "+359 888 890 123",
      address: "Велико Търново, България",
      supplierArea: ["Канцеларски материали", "Компютърна техника"],
    },
    {
      id: 16,
      name: "Бизнес Консулт АД",
      type: "Юридическо лице",
      quality: ["Партньор", "Клиент"],
      businessRole: ["Клиент", "Доставчик"],
      email: "info@bizconsult.bg",
      phone: "+359 888 901 234",
      address: "Пловдив, България",
      supplierArea: ["Хотели"],
    },
    {
      id: 17,
      name: "Светлана Петрова",
      type: "Физическо лице",
      quality: ["Клиент"],
      businessRole: ["Клиент"],
      email: "svetlana.petrova@example.com",
      phone: "+359 888 012 345",
      address: "Добрич, България",
      supplierArea: [],
    },
    {
      id: 18,
      name: "Престиж Груп ЕООД",
      type: "Юридическо лице",
      quality: ["Доставчик"],
      businessRole: ["Доставчик"],
      email: "prestige@example.bg",
      phone: "+359 888 123 456",
      address: "Варна, България",
      supplierArea: ["Вода", "Алкохол"],
    },
    {
      id: 19,
      name: "Христо Маринов",
      type: "Физическо лице",
      quality: ["Клиент", "Платец"],
      businessRole: ["Клиент"],
      email: "hristo.marinov@example.com",
      phone: "+359 888 234 567",
      address: "Шумен, България",
      supplierArea: [],
    },
    {
      id: 20,
      name: "Динамик Системс ООД",
      type: "Юридическо лице",
      quality: ["Клиент"],
      businessRole: ["Клиент"],
      email: "office@dynamic.bg",
      phone: "+359 888 345 678",
      address: "София, България",
      supplierArea: [],
    },
    {
      id: 21,
      name: "Диана Христова",
      type: "Физическо лице",
      quality: ["Доставчик"],
      businessRole: ["Доставчик"],
      email: "diana.hristova@example.com",
      phone: "+359 888 456 789",
      address: "Кърджали, България",
      supplierArea: ["Канцеларски материали"],
    },
    {
      id: 22,
      name: "Евротрейд АД",
      type: "Юридическо лице",
      quality: ["Партньор", "Доставчик"],
      businessRole: ["Доставчик"],
      email: "eurotrade@example.bg",
      phone: "+359 888 567 890",
      address: "Пловдив, България",
      supplierArea: ["Компютърна техника", "Хотели"],
    },
    {
      id: 23,
      name: "Стефан Георгиев",
      type: "Физическо лице",
      quality: ["Клиент"],
      businessRole: ["Клиент"],
      email: "stefan.georgiev@example.com",
      phone: "+359 888 678 901",
      address: "Хасково, България",
      supplierArea: [],
    },
    {
      id: 24,
      name: "Прогрес Индъстрис ООД",
      type: "Юридическо лице",
      quality: ["Клиент", "МОЛ"],
      businessRole: ["Клиент"],
      email: "progress@example.bg",
      phone: "+359 888 789 012",
      address: "Бургас, България",
      supplierArea: [],
    },
    {
      id: 25,
      name: "Радост Николова",
      type: "Физическо лице",
      quality: ["Клиент", "Платец"],
      businessRole: ["Клиент"],
      email: "radost.nikolova@example.com",
      phone: "+359 888 890 123",
      address: "Монтана, България",
      supplierArea: [],
    },
  ]

  const filteredContacts = availableContacts.filter((contact) =>
    contact.name.toLowerCase().includes(contactSearchQuery.toLowerCase()),
  )

  // Filtered contractors based on search name, type, quality, and business role
  const filteredContractors = availableContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(contractorSearchName.toLowerCase()) &&
      (contractorSearchType === "" || contact.type === contractorSearchType) &&
      (contractorSearchQuality.length === 0 || contractorSearchQuality.some((q) => contact.quality.includes(q))) &&
      (contractorBusinessRoleFilter.length === 0 || contractorBusinessRoleFilter.some((r) => contact.businessRole.includes(r))),
  )

  const totalPages = Math.ceil(filteredContractors.length / contractorsPerPage)
  const paginatedContractors = filteredContractors.slice(
    (currentPage - 1) * contractorsPerPage,
    currentPage * contractorsPerPage,
  )

  // Clients pagination
  const filteredClients = availableContacts
    .filter((c) => clientSearchMode === "all" || c.businessRole.includes("Клиент"))
    .filter((c) => c.name.toLowerCase().includes(contractorSearchName.toLowerCase()))
    .filter((c) => contractorSearchType === "" || c.type === contractorSearchType)

  const clientsTotalPages = Math.ceil(filteredClients.length / clientsPerPage)
  const paginatedClients = filteredClients.slice(
    (clientsCurrentPage - 1) * clientsPerPage,
    clientsCurrentPage * clientsPerPage,
  )

  // Suppliers pagination
  const filteredSuppliers = availableContacts
    .filter((c) => supplierSearchMode === "all" || c.businessRole.includes("Доставчик"))
    .filter((c) => c.name.toLowerCase().includes(contractorSearchName.toLowerCase()))
    .filter((c) => contractorSearchType === "" || c.type === contractorSearchType)
    .filter((c) => supplierAreaFilter.length === 0 || supplierAreaFilter.some((a) => c.supplierArea.includes(a)))

  const suppliersTotalPages = Math.ceil(filteredSuppliers.length / suppliersPerPage)
  const paginatedSuppliers = filteredSuppliers.slice(
    (suppliersCurrentPage - 1) * suppliersPerPage,
    suppliersCurrentPage * suppliersPerPage,
  )

  const handleContractorClick = (id: number) => {
    const contractorDetails = availableContacts.find((c) => c.id === id)
    if (contractorDetails) {
      setSelectedContractorId(id)
      setSelectedContactForDetails({
        id: contractorDetails.id,
        name: contractorDetails.name,
        type: contractorDetails.type,
        quality: contractorDetails.quality,
        nationality: "България", // Assuming default or fetched value
      })
      setCurrentView("contractor-details")
    }
  }

  const handleNewContactClick = () => {
    setShowNewContactForm(true)
    setSelectedContactForDetails(null)
    setNewContactData({
      name: "",
      type: "", // Reset to empty for user selection
      representation: "Се представлява от",
      isMol: false,
      isContactPerson: false,
      quality: [], // Reset quality to empty array
      nationality: "България", // Reset nationality as well
    })
    // Reset quality states when creating a new contact form
    setSelectedContactQuality([])
    setSelectedContactMol(false)
    setSelectedContactContactPerson(false)
  }

  const handleSaveContact = () => {
    const contactToSave = showNewContactForm
      ? newContactData
      : {
          name: selectedContactForDetails?.name || "",
          type: selectedContactForDetails?.type || "",
          representation: "Се представлява от",
          quality: selectedContactQuality,
          isMol: selectedContactMol,
          isContactPerson: selectedContactContactPerson,
          nationality: (selectedContactForDetails as any)?.nationality || "България",
        }

    // Simulate adding to a temporary list or directly to backend
    console.log("Saving contact:", contactToSave)
    setPendingSavedContacts((prev) => [...prev, contactToSave])

    // Reset states and close panel/form
    setSelectedContactForDetails(null)
    setShowNewContactForm(false)
    setExpandedContactRow(null) // Collapse the row after saving
    // Reset quality selections on save
    setSelectedContactQuality([])
    setSelectedContactMol(false)
    setSelectedContactContactPerson(false)
    setAddContactPanelOpen(false) // Close the panel if it was open
  }

  const handleCancelContact = () => {
    setSelectedContactForDetails(null)
    setShowNewContactForm(false)
    setExpandedContactRow(null) // Collapse the row on cancel
    // Reset quality selections on cancel
    setSelectedContactQuality([])
    setSelectedContactMol(false)
    setSelectedContactContactPerson(false)
  }

  const handleRemovePendingContact = (index: number) => {
    setPendingSavedContacts((prev) => prev.filter((_, i) => i !== index))
  }

  const handleEditPendingContact = (index: number) => {
    const contactToEdit = pendingSavedContacts[index]
    setNewContactData(contactToEdit)
    setShowNewContactForm(true)
    // Set quality states when editing a pending contact
    setSelectedContactQuality(contactToEdit.quality)
    setSelectedContactMol(contactToEdit.isMol)
    setSelectedContactContactPerson(contactToEdit.isContactPerson)
    // Remove from pending list as it will be re-added after editing
    setPendingSavedContacts((prev) => prev.filter((_, i) => i !== index))
  }

  const handleConfirmAllContacts = () => {
    console.log("Confirming all contacts:", pendingSavedContacts)
    // Here you would save to backend
    setPendingSavedContacts([])
    setAddContactPanelOpen(false)
    setExpandedContactRow(null) // Collapse all rows
    // Reset quality selections after confirming all
    setSelectedContactQuality([])
    setSelectedContactMol(false)
    setSelectedContactContactPerson(false)
  }

  const [expandedContactRow, setExpandedContactRow] = useState<number | null>(null)

  // Added handleDownload function
  const handleDownload = (filename: string) => {
    console.log(`Downloading ${filename}...`)
    // In a real application, you would trigger a download here
  }

  const filteredDocuments = documents.filter((doc) => {
    const nameMatch = filterName === "" || doc.name.toLowerCase().includes(filterName.toLowerCase())
    const typeMatch = filterType === "" || doc.type.toLowerCase().includes(filterType.toLowerCase())
    const statusMatch = filterStatus === "" || doc.status === filterStatus
    const qualityMatch = filterQuality.length === 0 || filterQuality.some((q) => doc.quality.includes(q))

    return nameMatch && typeMatch && statusMatch && qualityMatch
  })

  const handleQualityBadgeClick = (quality: string) => {
    setSelectedQualityFilter(quality)
    setShowFilteredOrdersPopup(true)
  }

  const qualityFilteredDocuments = documents.filter((doc) => doc.quality.includes(selectedQualityFilter))

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return
      const newWidth = window.innerWidth - e.clientX
      if (newWidth >= 300 && newWidth <= 800) {
        setRightPanelWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing])

  const handleAddressPanelMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsAddressPanelResizing(true)
  }

  React.useEffect(() => {
    const handleAddressPanelMouseMove = (e: MouseEvent) => {
      if (!isAddressPanelResizing) return
      const newWidth = window.innerWidth - e.clientX
      if (newWidth >= 300 && newWidth <= 800) {
        setAddressPanelWidth(newWidth)
      }
    }

    const handleAddressPanelMouseUp = () => {
      setIsAddressPanelResizing(false)
    }

    if (isAddressPanelResizing) {
      document.addEventListener("mousemove", handleAddressPanelMouseMove)
      document.addEventListener("mouseup", handleAddressPanelMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleAddressPanelMouseMove)
      document.removeEventListener("mouseup", handleAddressPanelMouseUp)
    }
  }, [isAddressPanelResizing])

  const qualityCount = {
    Клиент: documents.filter((doc) => doc.quality?.includes("Клиент")).length,
    Партньор: documents.filter((doc) => doc.quality?.includes("Партньор")).length,
    Подизпълнител: documents.filter((doc) => doc.quality?.includes("Подизпълнител")).length,
    Платец: documents.filter((doc) => doc.quality?.includes("Платец")).length,
    "Контактно лице": documents.filter((doc) => doc.quality?.includes("Контактно лице")).length,
    Доставчик: documents.filter((doc) => doc.quality?.includes("Доставчик")).length,
    МОЛ: documents.filter((doc) => doc.quality?.includes("МОЛ")).length,
  }

  const allQualities = ["Клиент", "Партньор", "Подизпълнител", "Платец", "Контактно лице", "Доставчик", "МОЛ"]

  const handleWindowMouseDown = (e: React.MouseEvent, windowType: string) => {
    if ((e.target as HTMLElement).closest("input, button, select, textarea")) return
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setDragging({
      window: windowType,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging.window) {
        setWindowPositions((prev) => ({
          ...prev,
          [dragging.window as keyof typeof prev]: {
            ...prev[dragging.window as keyof typeof prev],
            x: e.clientX - dragging.offsetX,
            y: e.clientY - dragging.offsetY,
          },
        }))
      }
    }

    const handleMouseUp = () => {
      setDragging({ window: null, offsetX: 0, offsetY: 0 })
    }

    if (dragging.window) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [dragging])

  const handleMinimize = (windowType: "address" | "contractor", title: string) => {
    if (windowType === "address") {
      setIsAddressPanelOpen(false)
      setMinimizedWindows((prev) => [...prev, { id: windowType, title, type: windowType }])
    } else {
      setAddContractorDialogOpen(false)
      setMinimizedWindows((prev) => [...prev, { id: windowType, title, type: windowType }])
    }
  }

  const handleRestore = (windowType: "address" | "contractor") => {
    if (windowType === "address") {
      setIsAddressPanelOpen(true)
    } else {
      setAddContractorDialogOpen(true)
    }
    setMinimizedWindows((prev) => prev.filter((w) => w.id !== windowType))
  }

  const handleCloseMinimized = (windowType: string) => {
    setMinimizedWindows((prev) => prev.filter((w) => w.id !== windowType))
  }

  return (
    <div className={`flex h-screen ${isDarkMode ? "dark" : ""}`}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-transparent lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-white dark:bg-slate-900 border-r-2 border-slate-300 dark:border-slate-600 shadow-lg transition-all duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${sidebarCollapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between gap-3 p-6 border-b-2 border-slate-300 dark:border-slate-600">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 flex items-center justify-center shadow-lg ring-2 ring-emerald-200 dark:ring-emerald-800">
              <TreePine className="text-white w-5 h-5" />
            </div>
            {!sidebarCollapsed && (
              <span className="font-bold text-lg bg-gradient-to-r from-emerald-700 to-teal-700 dark:from-emerald-400 dark:to-emerald-400 bg-clip-text text-transparent">
                Forest
              </span>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => item.onClick && item.onClick()}
                  className={`w-full flex items-center ${sidebarCollapsed ? "justify-center" : "justify-between"} gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    item.active
                      ? "bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 text-emerald-700 dark:text-emerald-400"
                      : "text-slate-600 dark:text-slate-300 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:text-emerald-700 dark:hover:text-emerald-400"
                  }`}
                >
                  <div className={`flex items-center ${sidebarCollapsed ? "" : "gap-3"}`}>
                    <item.icon className="w-5 h-5" />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </div>
                  {!sidebarCollapsed && item.hasChildren && (
  <ChevronDown className={`w-4 h-4 opacity-60 transition-transform ${item.expanded ? "rotate-180" : ""}`} />
)}
                </button>
{!sidebarCollapsed && item.hasChildren && item.expanded && item.children && (
  <div className="ml-4 mt-1 space-y-1">
    {item.children.map((child, childIndex) => (
      <button
        key={childIndex}
        onClick={() => child.onClick && child.onClick()}
        className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${
          child.active
            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-medium"
            : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
        }`}
      >
        {child.label}
      </button>
    ))}
  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="p-4 border-t-2 border-slate-300 dark:border-slate-600 space-y-1">
            <button
              className={`w-full flex items-center ${sidebarCollapsed ? "justify-center" : ""} gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-colors`}
            >
              <HelpCircle className="w-5 h-5" />
              {!sidebarCollapsed && (
                <>
                  <span>Помощен Център</span>
                  <Badge className="ml-auto bg-red-500 text-white hover:bg-red-500">8</Badge>
                </>
              )}
            </button>
            <button
              className={`w-full flex items-center ${sidebarCollapsed ? "justify-center" : ""} gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-colors`}
            >
              <Settings className="w-5 h-5" />
              {!sidebarCollapsed && <span>Настройки</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? "lg:blur-0 blur-sm" : ""}`}
      >
        <header className="border-b-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-md">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Търсене..."
                  className="w-80 pl-10 bg-slate-50 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 shadow-sm"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="relative">
                {isDarkMode ? <Sun className="w-5 h-5 text-slate-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
              </Button>
              <span className="hidden md:block text-sm text-slate-500 dark:text-slate-400">⌘ F</span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageSquare className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                </Button>
                <Avatar className="w-9 h-9 border-2 border-orange-400 shadow-md">
                  <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                  <AvatarFallback>АД</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        {currentView === "contractors-list" ? (
          // Contractors List View
          <main className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-800">
            <div className="p-4 lg:p-6 h-full flex flex-col">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Контрагенти</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Управление на всички контрагенти</p>
              </div>

              {/* Search Filters */}
              <Card className="mb-4 shadow-lg border-2 border-slate-300 dark:border-slate-600">
                <CardHeader className="py-3">
                  <CardTitle className="text-lg">Търсене на контрагенти</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex flex-col lg:flex-row items-stretch lg:items-end gap-3">
                    <div className="flex-1">
                      <label className="text-sm font-medium mb-2 block">Име</label>
                      <Input
                        placeholder="Търсене по име..."
                        value={contractorSearchName}
                        onChange={(e) => setContractorSearchName(e.target.value)}
                        className="w-full h-10 border-2 border-slate-300 dark:border-slate-600 bg-transparent"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm font-medium mb-2 block">Тип</label>
                      <select
                        value={contractorSearchType}
                        onChange={(e) => setContractorSearchType(e.target.value)}
                        className="w-full h-10 px-3 rounded-md border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm"
                      >
                        <option value="">Всички</option>
                        <option value="Физическо лице">Физическо лице</option>
                        <option value="Юридическо лице">Юридическо лице</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="text-sm font-medium mb-2 block">Бизнес роли</label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between border-2 border-slate-300 dark:border-slate-600 bg-transparent"
                          >
                            {contractorBusinessRoleFilter.length === 0
                              ? "Всички роли"
                              : `Избрани (${contractorBusinessRoleFilter.length})`}
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          {["Клиент", "Доставчик"].map((role) => (
                            <div
                              key={role}
                              className="flex items-center px-2 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                              <input
                                type="checkbox"
                                id={`contractor-role-${role}`}
                                checked={contractorBusinessRoleFilter.includes(role)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setContractorBusinessRoleFilter([...contractorBusinessRoleFilter, role])
                                  } else {
                                    setContractorBusinessRoleFilter(contractorBusinessRoleFilter.filter((r) => r !== role))
                                  }
                                }}
                                className="mr-2"
                              />
                              <label
                                htmlFor={`contractor-role-${role}`}
                                className="text-sm cursor-pointer flex-1"
                              >
                                {role}
                              </label>
                            </div>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        className="h-10 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md"
                        onClick={() => setCurrentPage(1)}
                      >
                        <Search className="w-4 h-4 mr-2" />
                        Търси
                      </Button>
                      <Button
                        className="h-10 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md"
                        onClick={() => setAddContractorDialogOpen(true)}
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Добавяне на контрагент
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contractors Table */}
              <Card className="shadow-lg border-2 border-slate-300 dark:border-slate-600 flex-1 flex flex-col min-h-0">
                <CardHeader className="py-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Списък с контрагенти</CardTitle>
                    <Badge variant="secondary">{filteredContractors.length} резултата</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden pb-4">
                  <div className="overflow-auto h-full">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-slate-300 dark:border-slate-600">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Клиентски номер
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Име
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Адрес
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Телефон
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Имейл
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Бизнес роли
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Тип
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedContractors.map((contractor) => (
                          <tr
                            key={contractor.id}
                            onClick={() => handleContractorClick(contractor.id)}
                            className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                          >
                            <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                              #{contractor.id.toString().padStart(6, "0")}
                            </td>
                            <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-slate-100">
                              {contractor.name}
                            </td>
                            <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                              {contractor.address || "София, България"}
                            </td>
                            <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{contractor.phone}</td>
                            <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{contractor.email}</td>
                            <td className="py-3 px-4">
                              <div className="flex flex-wrap gap-1">
                                {contractor.businessRole.map((role, idx) => {
                                  const roleColors: Record<string, string> = {
                                    Клиент: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
                                    Доставчик: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
                                  }
                                  return (
                                    <Badge key={idx} className={`text-xs ${roleColors[role] || ""}`}>
                                      {role}
                                    </Badge>
                                  )
                                })}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{contractor.type}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t-2 border-slate-300 dark:border-slate-600">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Редове на страница:</span>
                      <select
                        value={contractorsPerPage}
                        onChange={(e) => {
                          setContractorsPerPage(Number(e.target.value))
                          setCurrentPage(1)
                        }}
                        className="px-3 py-1.5 border-2 border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-sm"
                      >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Страница {currentPage} от {totalPages} ({filteredContractors.length} резултата)
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="border-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Назад
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="border-2"
                      >
                        Напред
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
) : currentView === "clients-list" ? (
  // Clients List View
  <main className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-800">
    <div className="p-4 lg:p-6 h-full flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Клиенти</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Управление на клиенти</p>
      </div>

      {/* Search Mode Toggle */}
  <div className="flex flex-wrap gap-3 mb-4">
  <Button
  variant={clientSearchMode === "clients" ? "default" : "outline"}
  onClick={() => setClientSearchMode("clients")}
  className={`${clientSearchMode === "clients" ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white ring-2 ring-emerald-400" : "bg-transparent border-2 border-slate-300 dark:border-slate-600"}`}
  >
  Търси клиенти
  </Button>
  <Button
  variant={clientSearchMode === "all" ? "default" : "outline"}
  onClick={() => setClientSearchMode("all")}
  className={`${clientSearchMode === "all" ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white ring-2 ring-emerald-400" : "bg-transparent border-2 border-slate-300 dark:border-slate-600"}`}
  >
  Търси всички контрагенти
  </Button>
  </div>

      {/* Search Filters */}
      <Card className="mb-4 shadow-lg border-2 border-slate-300 dark:border-slate-600">
        <CardHeader className="py-3">
          <CardTitle className="text-lg">Търсене на клиенти</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-end gap-3">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Име</label>
              <Input
                placeholder="Търсене по име..."
                value={contractorSearchName}
                onChange={(e) => setContractorSearchName(e.target.value)}
                className="w-full h-10 border-2 border-slate-300 dark:border-slate-600 bg-transparent"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Тип</label>
              <select
                value={contractorSearchType}
                onChange={(e) => setContractorSearchType(e.target.value)}
                className="w-full h-10 px-3 rounded-md border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm"
              >
                <option value="">Всички</option>
                <option value="Физическо лице">Физическо лице</option>
                <option value="Юридическо лице">Юридическо лице</option>
              </select>
            </div>
            <div className="flex gap-3">
              <Button className="h-10 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                <Search className="w-4 h-4 mr-2" />
                Търси
              </Button>
              <Button
                onClick={() => setAddContractorDialogOpen(true)}
                className="h-10 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md"
              >
                <Plus className="w-4 h-4 mr-2" />
                Добавяне на клиент
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card className="shadow-lg border-2 border-slate-300 dark:border-slate-600 flex-1 flex flex-col min-h-0">
        <CardContent className="p-0 flex-1 overflow-hidden">
          <div className="overflow-auto h-full">
            <table className="w-full">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr className="border-b-2 border-slate-300 dark:border-slate-600">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Клиентски номер
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Име
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Адрес
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Телефон
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Имейл
                  </th>
                  {clientSearchMode === "all" && (
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Бизнес роли
                    </th>
                  )}
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Тип
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedClients.map((contractor) => (
                    <tr
                      key={contractor.id}
                      onClick={() => handleContractorClick(contractor.id)}
                      className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                        #{contractor.id.toString().padStart(6, "0")}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-slate-100">
                        {contractor.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                        {contractor.address}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{contractor.phone}</td>
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{contractor.email}</td>
                      {clientSearchMode === "all" && (
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {contractor.businessRole.map((role, idx) => {
                              const roleColors: Record<string, string> = {
                                Клиент: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
                                Доставчик: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
                              }
                              return (
                                <Badge key={idx} className={`text-xs ${roleColors[role] || ""}`}>
                                  {role}
                                </Badge>
                              )
                            })}
                          </div>
                        </td>
                      )}
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{contractor.type}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 px-4 border-t-2 border-slate-300 dark:border-slate-600">
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600 dark:text-slate-400">Редове на страница:</span>
              <select
                value={clientsPerPage}
                onChange={(e) => {
                  setClientsPerPage(Number(e.target.value))
                  setClientsCurrentPage(1)
                }}
                className="px-3 py-1.5 border-2 border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-sm"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Страница {clientsCurrentPage} от {clientsTotalPages} ({filteredClients.length} резултата)
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setClientsCurrentPage(Math.max(1, clientsCurrentPage - 1))}
                disabled={clientsCurrentPage === 1}
                className="border-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Назад
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setClientsCurrentPage(Math.min(clientsTotalPages, clientsCurrentPage + 1))}
                disabled={clientsCurrentPage === clientsTotalPages}
                className="border-2"
              >
                Напред
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </main>
) : currentView === "suppliers-list" ? (
  // Suppliers List View
  <main className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-800">
    <div className="p-4 lg:p-6 h-full flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Доставчици</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Управление на доставчици</p>
      </div>

      {/* Search Mode Toggle */}
  <div className="flex flex-wrap gap-3 mb-4">
  <Button
  variant={supplierSearchMode === "suppliers" ? "default" : "outline"}
  onClick={() => setSupplierSearchMode("suppliers")}
  className={`${supplierSearchMode === "suppliers" ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white ring-2 ring-emerald-400" : "bg-transparent border-2 border-slate-300 dark:border-slate-600"}`}
  >
  Търси доставчици
  </Button>
  <Button
  variant={supplierSearchMode === "all" ? "default" : "outline"}
  onClick={() => setSupplierSearchMode("all")}
  className={`${supplierSearchMode === "all" ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white ring-2 ring-emerald-400" : "bg-transparent border-2 border-slate-300 dark:border-slate-600"}`}
  >
  Търси всички контрагенти
  </Button>
  </div>

      {/* Search Filters */}
      <Card className="mb-4 shadow-lg border-2 border-slate-300 dark:border-slate-600">
        <CardHeader className="py-3">
          <CardTitle className="text-lg">Търсене на доставчици</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-end gap-3">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Име</label>
              <Input
                placeholder="Търсене по име..."
                value={contractorSearchName}
                onChange={(e) => setContractorSearchName(e.target.value)}
                className="w-full h-10 border-2 border-slate-300 dark:border-slate-600 bg-transparent"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Тип</label>
              <select
                value={contractorSearchType}
                onChange={(e) => setContractorSearchType(e.target.value)}
                className="w-full h-10 px-3 rounded-md border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm"
              >
                <option value="">Всички</option>
                <option value="Физическо лице">Физическо лице</option>
                <option value="Юридическо лице">Юридическо лице</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Сфера на доставки</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between border-2 border-slate-300 dark:border-slate-600 bg-transparent"
                  >
                    {supplierAreaFilter.length === 0
                      ? "Всички сфери"
                      : `Избрани (${supplierAreaFilter.length})`}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {allSupplierAreas.map((area) => (
                    <div
                      key={area}
                      className="flex items-center px-2 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <input
                        type="checkbox"
                        id={`supplier-area-${area}`}
                        checked={supplierAreaFilter.includes(area)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSupplierAreaFilter([...supplierAreaFilter, area])
                          } else {
                            setSupplierAreaFilter(supplierAreaFilter.filter((a) => a !== area))
                          }
                        }}
                        className="mr-2"
                      />
                      <label
                        htmlFor={`supplier-area-${area}`}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {area}
                      </label>
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex gap-3">
              <Button className="h-10 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                <Search className="w-4 h-4 mr-2" />
                Търси
              </Button>
              <Button
                onClick={() => setAddContractorDialogOpen(true)}
                className="h-10 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md"
              >
                <Plus className="w-4 h-4 mr-2" />
                Добавяне на доставчик
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suppliers Table */}
      <Card className="shadow-lg border-2 border-slate-300 dark:border-slate-600 flex-1 flex flex-col min-h-0">
        <CardContent className="p-0 flex-1 overflow-hidden">
          <div className="overflow-auto h-full">
            <table className="w-full">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr className="border-b-2 border-slate-300 dark:border-slate-600">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Клиентски номер
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Име
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Адрес
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Телефон
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Имейл
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Сфера на доставки
                  </th>
                  {supplierSearchMode === "all" && (
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Бизнес роли
                    </th>
                  )}
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Тип
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedSuppliers.map((contractor) => (
                    <tr
                      key={contractor.id}
                      onClick={() => handleContractorClick(contractor.id)}
                      className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                        #{contractor.id.toString().padStart(6, "0")}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-slate-100">
                        {contractor.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                        {contractor.address}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{contractor.phone}</td>
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{contractor.email}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {contractor.supplierArea.length > 0 ? (
                            contractor.supplierArea.map((area, idx) => (
                              <Badge key={idx} className="text-xs bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                                {area}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-slate-400 text-xs">-</span>
                          )}
                        </div>
                      </td>
                      {supplierSearchMode === "all" && (
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {contractor.businessRole.map((role, idx) => {
                              const roleColors: Record<string, string> = {
                                Клиент: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
                                Доставчик: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
                              }
                              return (
                                <Badge key={idx} className={`text-xs ${roleColors[role] || ""}`}>
                                  {role}
                                </Badge>
                              )
                            })}
                          </div>
                        </td>
                      )}
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{contractor.type}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 px-4 border-t-2 border-slate-300 dark:border-slate-600">
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600 dark:text-slate-400">Редове на страница:</span>
              <select
                value={suppliersPerPage}
                onChange={(e) => {
                  setSuppliersPerPage(Number(e.target.value))
                  setSuppliersCurrentPage(1)
                }}
                className="px-3 py-1.5 border-2 border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-sm"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Страница {suppliersCurrentPage} от {suppliersTotalPages} ({filteredSuppliers.length} резултата)
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSuppliersCurrentPage(Math.max(1, suppliersCurrentPage - 1))}
                disabled={suppliersCurrentPage === 1}
                className="border-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Назад
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSuppliersCurrentPage(Math.min(suppliersTotalPages, suppliersCurrentPage + 1))}
                disabled={suppliersCurrentPage === suppliersTotalPages}
                className="border-2"
              >
                Напред
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </main>
) : currentView === "contractor-details" ? (
  // Contractor Details View
          <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 relative">
            {selectedDocument && (
              <>
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-2xl border-2 border-slate-300 dark:border-slate-600 z-40 max-h-[90vh] overflow-y-auto">
                  <div className="sticky top-0 bg-white dark:bg-slate-800 px-6 py-4 border-b border-slate-300 dark:border-slate-600 z-10 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                        Детайли за {selectedDocument.name}
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={closeDocumentDetails}
                        className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <Avatar className="w-16 h-16 border-2 border-orange-400">
                          <AvatarImage src="https://i.pravatar.cc/150?img=5" />
                          <AvatarFallback>МИ</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                          {selectedDocument.name}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">{selectedDocument.type}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedDocument.quality.map((qual, index) => (
                            <Badge
                              key={index}
                              className={`${
                                qual === "Клиент"
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                  : qual === "Доставчик"
                                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                                    : qual === "Подизпълнител"
                                      ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                                      : qual === "Партньор"
                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                                        : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
                              } text-xs`}
                            >
                              {qual}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
                      <p>{selectedDocument.description}</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <div>
                          <span className="font-medium text-slate-900 dark:text-slate-100">Цена:</span>{" "}
                          {selectedDocument.price}
                        </div>
                        <div>
                          <span className="font-medium text-slate-900 dark:text-slate-100">Приет на:</span>{" "}
                          {selectedDocument.acceptDate}
                        </div>
                        <div>
                          <span className="font-medium text-slate-900 dark:text-slate-100">Завършен на:</span>{" "}
                          {selectedDocument.completionDate}
                        </div>
                        <div>
                          <span className="font-medium text-slate-900 dark:text-slate-100">Статус:</span>{" "}
                          <Badge
                            className={`${
                              selectedDocument.status === "Завършен"
                                ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                                : selectedDocument.status === "В процес"
                                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                            }`}
                          >
                            {selectedDocument.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button
                        variant="outline"
                        className="border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 bg-transparent"
                        onClick={closeDocumentDetails}
                      >
                        Затвори
                      </Button>
                      <Button
                        className="bg-emerald-500 hover:bg-emerald-600 text-white"
                        onClick={() => handleDownload(selectedDocument.name)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Изтегляне
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {addContactPanelOpen && (
              <>
                {/* Resize handle */}
                <div
                  onMouseDown={handleMouseDown}
                  className="fixed top-0 bottom-0 z-50 w-1 cursor-ew-resize hover:bg-emerald-500 transition-colors"
                  style={{ right: `${rightPanelWidth}px` }}
                />
                <div
                  className="fixed top-0 right-0 bottom-0 bg-white dark:bg-slate-800 shadow-2xl border-l-2 border-slate-300 dark:border-slate-600 z-40 overflow-y-auto"
                  style={{ width: `${rightPanelWidth}px` }}
                >
                  <div className="sticky top-0 bg-white dark:bg-slate-800 border-b-2 border-slate-300 dark:border-slate-600 p-6 z-10 shadow-md">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                          Добавяне на контрагент
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-600 dark:text-slate-400">Бизнес роля:</span>
                          <Badge
                            className={`${
                              currentView === "clients-list"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                : currentView === "suppliers-list"
                                  ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300"
                                  : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                            } text-xs`}
                          >
                            {currentView === "clients-list"
                              ? "Клиент"
                              : currentView === "suppliers-list"
                                ? "Доставчик"
                                : "Партньор"}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setAddContactPanelOpen(false)
                          setSelectedContactForDetails(null)
                          setShowNewContactForm(false)
                          setPendingSavedContacts([])
                          setExpandedContactRow(null)
                          setSelectedContactQuality([])
                          setSelectedContactMol(false)
                          setSelectedContactContactPerson(false)
                          setSupplierScope("")
                          setSupplierDescription("")
                        }}
                        className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            placeholder="Търси контрагент..."
                            value={contactSearchQuery}
                            onChange={(e) => setContactSearchQuery(e.target.value)}
                            className="pl-10 bg-slate-50 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 shadow-sm"
                          />
                        </div>
                        <Button
                          variant="outline"
                          className="border-2 border-emerald-400 dark:border-emerald-600 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 bg-transparent shadow-sm"
                        >
                          Търси
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden shadow-md">
                      <table className="w-full">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 border-b-2 border-slate-300 dark:border-slate-600">
                          <tr>
                            <th className="text-left px-4 py-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                              Име
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                          {filteredContacts.map((contact) => (
                            <React.Fragment key={contact.id}>
                              <tr
                                onClick={() => {
                                  if (expandedContactRow === contact.id) {
                                    setExpandedContactRow(null)
                                    setSelectedContactForDetails(null)
                                  } else {
                                    setExpandedContactRow(contact.id)
                                    handleContractorClick(contact.id) // Use the correct handler
                                  }
                                }}
                                className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer"
                              >
                                <td className="px-4 py-3">
                                  <div>
                                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                      {contact.name}
                                    </div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">{contact.type}</div>
                                  </div>
                                </td>
                              </tr>
                              {expandedContactRow === contact.id && selectedContactForDetails && (
                                <tr>
                                  <td colSpan={1} className="px-0 py-0">
                                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border-t-2 border-emerald-300 dark:border-emerald-600 shadow-inner space-y-3">
                                      <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-lg border-2 border-slate-300 dark:border-slate-600 shadow-sm">
                                        <Avatar className="w-10 h-10 border-2 border-emerald-500 shadow-md">
                                          <AvatarImage
                                            src={`https://i.pravatar.cc/150?img=${selectedContactForDetails.id}`}
                                          />
                                          <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
                                            {selectedContactForDetails.name
                                              .split(" ")
                                              .map((n) => n[0])
                                              .join("")}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-100">
                                            {selectedContactForDetails.name}
                                          </h4>
                                          <p className="text-xs text-emerald-700 dark:text-emerald-300">
                                            {selectedContactForDetails.type}
                                          </p>
                                          <p className="text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-1 mt-1">
                                            <img
                                              src={`https://flagcdn.com/w20/${countries.find((c) => c.name === (selectedContactForDetails as any).nationality)?.code.toLowerCase() || "bg"}.png`}
                                              alt=""
                                              className="w-4 h-3 object-cover rounded-sm"
                                            />
                                            {(selectedContactForDetails as any).nationality || "България"}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Representation Dropdown */}
                                      <div>
                                        <label className="text-xs font-medium text-emerald-900 dark:text-emerald-100 mb-2 block">
                                          Представителство
                                        </label>
                                        <select
                                          value={newContactData.representation}
                                          onChange={(e) =>
                                            setNewContactData({ ...newContactData, representation: e.target.value })
                                          }
                                          className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-md text-slate-900 dark:text-slate-100 shadow-sm"
                                        >
                                          <option value="Се представлява от">Се представлява от</option>
                                          <option value="Представлява">Представлява</option>
                                        </select>
                                      </div>

                                      <div className="pt-3 border-t-2 border-slate-300 dark:border-slate-600 space-y-3">
                                        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-lg border-2 border-slate-300 dark:border-slate-600 shadow-sm">
                                          <Avatar className="w-10 h-10 border-2 border-emerald-500 shadow-md">
                                            <AvatarImage
                                              src={`https://i.pravatar.cc/150?img=${selectedContactForDetails.id}`}
                                            />
                                            <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
                                              {selectedContactForDetails.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                            </AvatarFallback>
                                          </Avatar>
                                          <div>
                                            <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-100">
                                              {selectedContactForDetails.name}
                                            </h4>
                                            <p className="text-xs text-emerald-700 dark:text-emerald-300">
                                              {selectedContactForDetails.type}
                                            </p>
                                            <p className="text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-1 mt-1">
                                              <img
                                                src={`https://flagcdn.com/w20/${countries.find((c) => c.name === (selectedContactForDetails as any).nationality)?.code.toLowerCase() || "bg"}.png`}
                                                alt=""
                                                className="w-4 h-3 object-cover rounded-sm"
                                              />
                                              {(selectedContactForDetails as any).nationality || "България"}
                                            </p>
                                          </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                          <div>
                                            <span className="text-slate-600 dark:text-slate-400">Адрес:</span>
                                            <p className="text-slate-900 dark:text-slate-100 font-medium">
                                              гр. София, ул. Витоша 15
                                            </p>
                                          </div>
                                          <div>
                                            <span className="text-slate-600 dark:text-slate-400">ЕГН/ЕИК:</span>
                                            <p className="text-slate-900 dark:text-slate-100 font-medium">9512154321</p>
                                          </div>
                                          <div>
                                            <span className="text-slate-600 dark:text-slate-400">Телефон:</span>
                                            <p className="text-slate-900 dark:text-slate-100 font-medium">
                                              +359 888 123 456
                                            </p>
                                          </div>
                                          <div>
                                            <span className="text-slate-600 dark:text-slate-400">Имейл:</span>
                                            <p className="text-slate-900 dark:text-slate-100 font-medium">
                                              contact@example.com
                                            </p>
                                          </div>
                                        </div>

                                        <div>
                                          <label className="text-xs font-medium text-emerald-900 dark:text-emerald-100 mb-2 block">
                                            Бизнес роли
                                          </label>
                                          <div className="grid grid-cols-2 gap-2">
                                            {qualityOptions.map((option) => (
                                              <label key={option} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                  type="checkbox"
                                                  checked={selectedContactQuality.includes(option)}
                                                  onChange={(e) => {
                                                    if (e.target.checked) {
                                                      setSelectedContactQuality([...selectedContactQuality, option])
                                                    } else {
                                                      setSelectedContactQuality(
                                                        selectedContactQuality.filter((q) => q !== option),
                                                      )
                                                    }
                                                  }}
                                                  className="w-4 h-4 rounded border-2 border-emerald-400 dark:border-emerald-600 text-emerald-600 focus:ring-emerald-500 shadow-sm"
                                                />
                                                <span className="text-sm text-emerald-900 dark:text-emerald-100">
                                                  {option}
                                                </span>
                                              </label>
                                            ))}
                                            <label className="flex items-center gap-2 cursor-pointer">
                                              <input
                                                type="checkbox"
                                                checked={selectedContactMol}
                                                onChange={(e) => setSelectedContactMol(e.target.checked)}
                                                className="w-4 h-4 rounded border-2 border-emerald-400 dark:border-emerald-600 text-emerald-600 focus:ring-emerald-500 shadow-sm"
                                              />
                                              <span className="text-sm text-emerald-900 dark:text-emerald-100">
                                                Мол
                                              </span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                              <input
                                                type="checkbox"
                                                checked={selectedContactContactPerson}
                                                onChange={(e) => setSelectedContactContactPerson(e.target.checked)}
                                                className="w-4 h-4 rounded border-2 border-emerald-400 dark:border-emerald-600 text-emerald-600 focus:ring-emerald-500 shadow-sm"
                                              />
                                              <span className="text-sm text-emerald-900 dark:text-emerald-100">
                                                Контактно лице
                                              </span>
                                            </label>
                                          </div>
                                        </div>

                                        {/* Supplier-specific fields */}
                                        {currentView === "suppliers-list" && (
                                          <>
                                            <div>
                                              <label className="text-xs font-medium text-emerald-900 dark:text-emerald-100 mb-2 block">
                                                Сфера на доставки
                                              </label>
                                              <select
                                                value={supplierScope}
                                                onChange={(e) => setSupplierScope(e.target.value)}
                                                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-md text-slate-900 dark:text-slate-100 shadow-sm"
                                              >
                                                <option value="">Избери сфера...</option>
                                                <option value="IT услуги">IT услуги</option>
                                                <option value="Строителство">Строителство</option>
                                                <option value="Транспорт">Транспорт</option>
                                                <option value="Консултации">Консултации</option>
                                                <option value="Материали">Материали</option>
                                                <option value="Оборудване">Оборудване</option>
                                                <option value="Друго">Друго</option>
                                              </select>
                                            </div>
                                            <div>
                                              <label className="text-xs font-medium text-emerald-900 dark:text-emerald-100 mb-2 block">
                                                Описание
                                              </label>
                                              <textarea
                                                value={supplierDescription}
                                                onChange={(e) => setSupplierDescription(e.target.value)}
                                                placeholder="Кратко описание на доставчика..."
                                                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-md text-slate-900 dark:text-slate-100 shadow-sm resize-none"
                                                rows={3}
                                              />
                                            </div>
                                          </>
                                        )}
                                      </div>

                                      <div className="flex gap-3 pt-2">
                                        <Button
                                          onClick={handleSaveContact}
                                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                                        >
                                          <Check className="w-4 h-4 mr-2" />
                                          Запази
                                        </Button>
                                        <Button
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            handleCancelContact()
                                            setExpandedContactRow(null)
                                          }}
                                          variant="outline"
                                          className="flex-1 border-2 border-emerald-400 dark:border-emerald-600 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 bg-transparent shadow-sm"
                                        >
                                          <X className="w-4 h-4 mr-2" />
                                          Отказ
                                        </Button>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <Button
                      onClick={handleNewContactClick}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Добави нов
                    </Button>

                    {showNewContactForm && !selectedContactForDetails && (
                      <div className="mt-4 p-6 bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-300 dark:border-emerald-600 rounded-lg shadow-md space-y-5">
                        <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-lg border-2 border-slate-300 dark:border-slate-600 shadow-sm">
                          <Avatar className="w-14 h-14 border-2 border-emerald-500 shadow-md">
                            <AvatarImage src="https://i.pravatar.cc/150?img=5" />
                            <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
                              МИ
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">Мария Илиева</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
                              <User className="w-4 h-4" />
                              Физическо лице
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-1">
                              <img
                                src="https://flagcdn.com/bg.png"
                                alt="BG"
                                className="w-5 h-4 object-cover rounded-sm"
                              />
                              България
                            </p>
                          </div>
                        </div>

                        <div>
                          <select
                            value={newContactData.representation}
                            onChange={(e) => setNewContactData({ ...newContactData, representation: e.target.value })}
                            className="w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-md text-slate-900 dark:text-slate-100 shadow-sm"
                          >
                            <option value="Се представлява от">Се представлява от</option>
                            <option value="Представлява">Представлява</option>
                          </select>
                        </div>

                        <div className="pt-4 border-t-2 border-slate-300 dark:border-slate-600 space-y-5">
                          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                            <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                              <User className="w-4 h-4" />
                              Основна информация
                            </h5>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div className="lg:col-span-2">
                                <label className="text-xs font-medium text-slate-900 dark:text-slate-100 mb-2 block">
                                  Име/Наименование
                                </label>
                                <Input
                                  value={newContactData.name}
                                  onChange={(e) => setNewContactData({ ...newContactData, name: e.target.value })}
                                  placeholder="Въведете име или наименование"
                                  className="w-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 shadow-sm"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-medium text-slate-900 dark:text-slate-100 mb-2 block">
                                  Тип на лицето
                                </label>
                                <select
                                  value={newContactData.type}
                                  onChange={(e) => setNewContactData({ ...newContactData, type: e.target.value })}
                                  className="w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-md text-slate-900 dark:text-slate-100 shadow-sm"
                                >
                                  <option value="">Изберете тип</option>
                                  <option value="Физическо лице">Физическо лице</option>
                                  <option value="Юридическо лице">Юридическо лице</option>
                                  <option value="Публично Правна организация">Публично Правна организация</option>
                                  <option value="Юридическо лице с нестопанска цел">
                                    Юридическо лице с нестопанска цел
                                  </option>
                                </select>
                              </div>
                              <div>
                                <label className="text-xs font-medium text-slate-900 dark:text-slate-100 mb-2 block">
                                  Националност
                                </label>
                                <select
                                  value={newContactData.nationality}
                                  onChange={(e) => setNewContactData({ ...newContactData, nationality: e.target.value })}
                                  className="w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-md text-slate-900 dark:text-slate-100 shadow-sm"
                                >
                                  {countries.map((country) => (
                                    <option key={country.code} value={country.name}>
                                      {country.flag} {country.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                            <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              Контактни данни
                            </h5>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div className="lg:col-span-2">
                                <label className="text-xs font-medium text-slate-900 dark:text-slate-100 mb-2 block">
                                  Адрес
                                </label>
                                <Input
                                  placeholder="Въведете адрес"
                                  className="w-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 shadow-sm"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-medium text-slate-900 dark:text-slate-100 mb-2 block">
                                  ЕГН/ЕИК
                                </label>
                                <Input
                                  placeholder="Въведете ЕГН/ЕИК"
                                  className="w-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 shadow-sm"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-medium text-slate-900 dark:text-slate-100 mb-2 block">
                                  Телефон
                                </label>
                                <Input
                                  placeholder="Въведете телефон"
                                  className="w-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 shadow-sm"
                                />
                              </div>
                              <div className="lg:col-span-2">
                                <label className="text-xs font-medium text-slate-900 dark:text-slate-100 mb-2 block">
                                  Имейл
                                </label>
                                <Input
                                  type="email"
                                  placeholder="Въведете имейл"
                                  className="w-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 shadow-sm"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                            <h5 className="text-sm font-semibold text-emerald-900 dark:text-emerald-100 mb-3">
                              Качество
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {qualityOptions.map((option) => (
                                <label key={option} className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors">
                                  <input
                                    type="checkbox"
                                    checked={newContactData.quality.includes(option)}
                                    onChange={(e) => {
                                      const updatedQuality = e.target.checked
                                        ? [...newContactData.quality, option]
                                        : newContactData.quality.filter((q) => q !== option)
                                      setNewContactData({ ...newContactData, quality: updatedQuality })
                                    }}
                                    className="w-4 h-4 rounded border-2 border-emerald-400 dark:border-emerald-600 text-emerald-600 focus:ring-emerald-500 shadow-sm"
                                  />
                                  <span className="text-sm text-emerald-900 dark:text-emerald-100">{option}</span>
                                </label>
                              ))}
                              <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors">
                                <input
                                  type="checkbox"
                                  checked={newContactData.isMol}
                                  onChange={(e) => setNewContactData({ ...newContactData, isMol: e.target.checked })}
                                  className="w-4 h-4 rounded border-2 border-emerald-400 dark:border-emerald-600 text-emerald-600 focus:ring-emerald-500 shadow-sm"
                                />
                                <span className="text-sm text-emerald-900 dark:text-emerald-100">Мол</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors">
                                <input
                                  type="checkbox"
                                  checked={newContactData.isContactPerson}
                                  onChange={(e) =>
                                    setNewContactData({ ...newContactData, isContactPerson: e.target.checked })
                                  }
                                  className="w-4 h-4 rounded border-2 border-emerald-400 dark:border-emerald-600 text-emerald-600 focus:ring-emerald-500 shadow-sm"
                                />
                                <span className="text-sm text-emerald-900 dark:text-emerald-100">Контактно лице</span>
                              </label>
                            </div>
                          </div>

                          {currentView === "suppliers-list" && (
                            <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-lg border-2 border-cyan-300 dark:border-cyan-700">
                              <h5 className="text-sm font-semibold text-cyan-900 dark:text-cyan-100 mb-3 flex items-center gap-2">
                                <Building2 className="w-4 h-4" />
                                Информация за доставчик
                              </h5>
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-xs font-medium text-cyan-900 dark:text-cyan-100 mb-2 block">
                                    Сфера на доставки
                                  </label>
                                  <select
                                    value={supplierScope}
                                    onChange={(e) => setSupplierScope(e.target.value)}
                                    className="w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border-2 border-cyan-300 dark:border-cyan-600 rounded-md text-slate-900 dark:text-slate-100 shadow-sm"
                                  >
                                    <option value="">Избери сфера...</option>
                                    <option value="IT услуги">IT услуги</option>
                                    <option value="Строителство">Строителство</option>
                                    <option value="Транспорт">Транспорт</option>
                                    <option value="Консултации">Консултации</option>
                                    <option value="Материали">Материали</option>
                                    <option value="Оборудване">Оборудване</option>
                                    <option value="Друго">Друго</option>
                                  </select>
                                </div>
                                <div className="lg:col-span-2">
                                  <label className="text-xs font-medium text-cyan-900 dark:text-cyan-100 mb-2 block">
                                    Описание
                                  </label>
                                  <textarea
                                    value={supplierDescription}
                                    onChange={(e) => setSupplierDescription(e.target.value)}
                                    placeholder="Кратко описание на доставчика..."
                                    className="w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border-2 border-cyan-300 dark:border-cyan-600 rounded-md text-slate-900 dark:text-slate-100 shadow-sm resize-none"
                                    rows={3}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-3 pt-4">
                          <Button
                            onClick={handleSaveContact}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3"
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Запази
                          </Button>
                          <Button
                            onClick={handleCancelContact}
                            variant="outline"
                            className="flex-1 border-2 border-emerald-400 dark:border-emerald-600 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 bg-transparent shadow-sm py-3"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Отказ
                          </Button>
                        </div>
                      </div>
                    )}

                    {pendingSavedContacts.length > 0 && (
                      <div className="mt-6 space-y-3">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          Добавени контрагенти ({pendingSavedContacts.length})
                        </h4>
                        <div className="space-y-2">
                          {pendingSavedContacts.map((contact, index) => (
                            <div
                              key={index}
                              onClick={() => handleEditPendingContact(index)}
                              className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors shadow-sm hover:shadow-md"
                            >
                              <div className="flex items-center gap-3 flex-1">
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs">
                                    {contact.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                    {contact.name}
                                  </p>
                                  <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {contact.type} • {contact.representation}
                                  </p>
                                  {(contact.quality.length > 0 || contact.isMol || contact.isContactPerson) && (
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {contact.quality.map((qual) => (
                                        <Badge
                                          key={qual}
                                          className={`text-xs px-2 py-0 ${
                                            qual === "Клиент"
                                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                              : qual === "Доставчик"
                                                ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                                                : qual === "Подизпълнител"
                                                  ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                                                  : qual === "Партньор"
                                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                                                    : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
                                          }`}
                                        >
                                          {qual}
                                        </Badge>
                                      ))}
                                      {contact.isMol && (
                                        <Badge className="text-xs px-2 py-0 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                                          Мол
                                        </Badge>
                                      )}
                                      {contact.isContactPerson && (
                                        <Badge className="text-xs px-2 py-0 bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                                          Контактно лице
                                        </Badge>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation() // Prevent triggering edit when clicking delete
                                  handleRemovePendingContact(index)
                                }}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 h-8 w-8"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>

                        <Button
                          onClick={handleConfirmAllContacts}
                          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Потвърди всички контрагенти
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}


            <div className="max-w-full mx-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <ChevronRight className="w-4 h-4" />
                  <span className="font-medium text-slate-900 dark:text-slate-100">Детайли за Контрагент</span>
                </div>
                <Button
                  size="default"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Създаване на поръчка
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
                {/* Left Sidebar - Employee Profile */}
                <div className="lg:col-span-3">
                  <Card className="p-3 bg-white dark:bg-slate-800 shadow-lg border-2 border-slate-300 dark:border-slate-600">
                    <div className="flex items-start gap-2 mb-3">
                      <div className="relative group flex-shrink-0">
                        <Avatar className="w-16 h-16 border-2 border-orange-200 dark:border-orange-800 shadow-md">
                          <AvatarImage src="https://i.pravatar.cc/150?img=5" />
                          <AvatarFallback className="text-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                            МИ
                          </AvatarFallback>
                        </Avatar>
                        {/* Replaced SVG with Button and Edit2 icon */}
                        <Button
                          size="icon"
                          className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="space-y-1 flex-1">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Мария Илиева</h2>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">ФИЗИЧЕСКО ЛИЦЕ</span>
                      </div>
                    </div>

                    {/* Updated contact info section */}
                    <div className="w-full space-y-2 text-left">
                      {" "}
                      {/* Reduced spacing */}
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-slate-600 dark:text-slate-300 break-all">{contactInfo.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-slate-600 dark:text-slate-300">{contactInfo.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-slate-600 dark:text-slate-300">ЕГН/ЕИК: {formData.egn}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-slate-600 dark:text-slate-300">
                          {addresses[0]?.city}, {addresses[0]?.street}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <img
                          src={`https://flagcdn.com/24x18/${countries.find((c) => c.name === formData.country)?.code.toLowerCase()}.png`}
                          alt={formData.country}
                          className="w-6 h-4 object-cover rounded shadow-sm ml-0"
                        />
                        <span className="text-slate-600 dark:text-slate-300">{formData.country}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {allQualities.map((quality) => {
                          const count = qualityCount[quality as keyof typeof qualityCount]
                          if (count === 0) return null

                          const badgeColors: Record<string, string> = {
                            Клиент:
                              "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:ring-blue-400",
                            Партньор:
                              "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 hover:ring-emerald-400",
                            Подизпълнител:
                              "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 hover:ring-purple-400",
                            Платец:
                              "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 hover:ring-amber-400",
                            "Контактно лице":
                              "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 hover:ring-pink-400",
                            Доставчик:
                              "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300 hover:ring-cyan-400",
                            МОЛ: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 hover:ring-orange-400",
                          }

                          return (
                            <Badge
                              key={quality}
                              className={`${badgeColors[quality]} text-xs cursor-pointer hover:ring-2 transition-all`}
                              onClick={() => handleQualityBadgeClick(quality)}
                            >
                              {quality}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>

                    <div className="w-full space-y-2 border-t-2 border-slate-300 dark:border-slate-600 pt-2 mt-2">
                      {/* Контактна информация - moved to first position */}
                      <div className="border-2 border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden shadow-sm">
                        <button
                          onClick={() => toggleAccordion("contact")}
                          className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            Контактна информация
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-500 transition-transform ${accordionOpen.contact ? "rotate-180" : ""}`}
                          />
                        </button>
                        {accordionOpen.contact && (
                          <div className="p-3 space-y-3 bg-white dark:bg-slate-800">
                            <div className="grid grid-cols-1 gap-3">
                              {/* Phone Section */}
                              <div className="space-y-2 p-2 border border-slate-200 dark:border-slate-700 rounded">
                                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  Телефон
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="col-span-3">
                                    <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">
                                      Телефон
                                    </label>
                                    <Input
                                      value={contactInfo.phone}
                                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                                      className="text-xs h-8"
                                      placeholder="+359..."
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">
                                      Тип телефон
                                    </label>
                                    <select className="w-full h-8 px-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs">
                                      <option>Мобилен</option>
                                      <option>Стационарен</option>
                                      <option>Работен</option>
                                    </select>
                                  </div>
                                  <div className="col-span-2">
                                    <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">
                                      Предназначение на телефон
                                    </label>
                                    <select className="w-full h-8 px-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs">
                                      <option>Основен</option>
                                      <option>Допълнителен</option>
                                      <option>Служебен</option>
                                    </select>
                                  </div>
                                </div>
                              </div>

                              {/* Email Section */}
                              <div className="space-y-2 p-2 border border-slate-200 dark:border-slate-700 rounded">
                                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  Имейл
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="col-span-3">
                                    <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">
                                      Имейл
                                    </label>
                                    <Input
                                      value={contactInfo.email}
                                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                                      className="text-xs h-8"
                                      placeholder="email@example.com"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">
                                      Тип имейл
                                    </label>
                                    <select className="w-full h-8 px-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs">
                                      <option>Личен</option>
                                      <option>Служебен</option>
                                    </select>
                                  </div>
                                  <div className="col-span-2">
                                    <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">
                                      Предназначение на имейл
                                    </label>
                                    <select className="w-full h-8 px-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs">
                                      <option>Основен</option>
                                      <option>Допълнителен</option>
                                      <option>Фактуриране</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Адресна информация - moved to second position */}
                      <div className="border-2 border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden shadow-sm mt-3">
                        <button
                          onClick={() => toggleAccordion("address")}
                          className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            Адресна информация
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-500 transition-transform ${accordionOpen.address ? "rotate-180" : ""}`}
                          />
                        </button>
                        {accordionOpen.address && (
                          <div className="bg-white dark:bg-slate-800">
                            {/* Address list */}
                            <div className="divide-y-2 divide-slate-200 dark:divide-slate-700">
                              {addresses.map((address, index) => (
                                <div
                                  key={index}
                                  className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <MapPin className="w-4 h-4 text-emerald-600" />
                                        <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                                          {address.type}
                                        </span>
                                      </div>
                                      <div className="text-xs text-slate-600 dark:text-slate-400 space-y-0.5 ml-6">
                                        <div>{address.street}</div>
                                        <div>
                                          {address.city}, {address.postalCode}
                                        </div>
                                        <div>{address.country}</div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-7 w-7"
                                        onClick={() => {
                                          setEditingAddress(address) // Set editingAddress state
                                          setIsAddressPanelOpen(true) // Use setIsAddressPanelOpen to control visibility
                                        }}
                                      >
                                        <Edit2 className="w-3 h-3 text-slate-400" />
                                      </Button>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-7 w-7"
                                        onClick={() => handleDeleteAddress(index)}
                                      >
                                        <Trash2 className="w-3 h-3 text-red-400" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {/* Add address button */}
                            <div className="p-3 border-t-2 border-slate-200 dark:border-slate-700">
                              <Button
                                size="sm"
                                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md"
                                onClick={() => {
                                  setEditingAddress(null) // Ensure editingAddress is null when adding new
                                  setIsAddressPanelOpen(true) // Open the address panel
                                }}
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Добави адрес
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Свързани Контрагенти - moved to third position */}
                      <div className="border-2 border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden shadow-sm mt-3">
                        <button
                          onClick={() => toggleAccordion("clients")}
                          className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            Свързани Контрагенти
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-500 transition-transform ${accordionOpen.clients ? "rotate-180" : ""}`}
                          />
                        </button>
                        {accordionOpen.clients && (
                          <div className="bg-white dark:bg-slate-800">
                            {/* Tabs for Свързани Контрагенти */}
                            <div className="flex border-b-2 border-slate-300 dark:border-slate-600">
                              <button
                                onClick={() =>
                                  setAccordionOpen((prev) => ({ ...prev, representedBy: true, represents: false }))
                                }
                                className={`flex-1 px-3 py-4 text-xs font-medium transition-colors ${
                                  accordionOpen.representedBy
                                    ? "border-b-2 border-emerald-500 text-emerald-600 dark:text-emerald-400"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                                }`}
                              >
                                Се представлява от
                              </button>
                              <button
                                onClick={() =>
                                  setAccordionOpen((prev) => ({ ...prev, representedBy: false, represents: true }))
                                }
                                className={`flex-1 px-3 py-4 text-xs font-medium transition-colors ${
                                  accordionOpen.represents
                                    ? "border-b-2 border-emerald-500 text-emerald-600 dark:text-emerald-400"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                                }`}
                              >
                                Представлява
                              </button>
                            </div>

                            {/* Client list with max 3 visible and scroll */}
                            <div
                              className="p-3 py-4 max-h-60 overflow-y-auto space-y-2"
                              style={{ backgroundColor: "#ECFDF5" }}
                            >
                              {accordionOpen.representedBy &&
                                [
                                  { name: "Петър Стоянов", type: "person", label: "Физическо лице" },
                                  { name: "Георги Николов", type: "person", label: "Физическо лице" },
                                ].map((client, idx) => (
                                  <button
                                    key={idx}
                                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors group"
                                  >
                                    <Avatar className="w-9 h-9 border-2 border-slate-200 dark:border-slate-600">
                                      <AvatarImage src={`https://i.pravatar.cc/150?img=${idx + 20}`} />
                                      <AvatarFallback className="text-xs bg-slate-100 dark:bg-slate-700">
                                        {client.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 text-left">
                                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100 transition-colors">
                                        {client.name}
                                      </div>
                                      <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                                        {client.type === "building" ? (
                                          <Building2 className="w-3 h-3" />
                                        ) : (
                                          <User className="w-3 h-3" />
                                        )}
                                        <span>{client.label}</span>
                                      </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </button>
                                ))}

                              {accordionOpen.represents &&
                                [
                                  { name: "Иван Петров", type: "building", label: "Юридическо лице" },
                                  { name: "Елена Георгиева", type: "person", label: "Физическо лице" },
                                  { name: "Стоян Димитров", type: "person", label: "Физическо лице" },
                                  { name: "Мария Василева", type: "building", label: "Юридическо лице" },
                                  { name: "Калин Тодоров", type: "person", label: "Физическо лице" },
                                ].map((client, idx) => (
                                  <button
                                    key={idx}
                                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors group"
                                  >
                                    <Avatar className="w-9 h-9 border-2 border-slate-200 dark:border-slate-600">
                                      <AvatarImage src={`https://i.pravatar.cc/150?img=${idx + 10}`} />
                                      <AvatarFallback className="text-xs bg-slate-100 dark:bg-slate-700">
                                        {client.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 text-left">
                                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100 transition-colors">
                                        {client.name}
                                      </div>
                                      <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                                        {client.type === "building" ? (
                                          <Building2 className="w-3 h-3" />
                                        ) : (
                                          <User className="w-3 h-3" />
                                        )}
                                        <span>{client.label}</span>
                                      </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </button>
                                ))}
                            </div>

                            {/* Add new button */}
                            <div className="p-3 border-t-2 border-slate-300 dark:border-slate-600">
                              <Button
                                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl"
                                onClick={() => setAddContactPanelOpen(true)}
                              >
                                <User className="w-4 h-4 mr-2" />
                                Добавяне на контрагент
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                      {/* Основна информация - moved to fourth position */}
                      <div className="border-2 border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden shadow-sm mt-3">
                        <button
                          onClick={() => toggleAccordion("info")}
                          className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            Основна информация
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-500 transition-transform ${accordionOpen.info ? "rotate-180" : ""}`}
                          />
                        </button>
                        {accordionOpen.info && (
                          <div className="p-3 space-y-4 bg-white dark:bg-slate-800">
                            {" "}
                            {/* Reduced from p-6 to p-3 */}
                            {/* Правен профил */}
                            <div className="space-y-2">
                              {" "}
                              {/* Reduced from space-y-3 */}
                              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-1.5">
                                {" "}
                                {/* Reduced padding */}
                                Правен профил
                              </h4>
                              <div className="grid grid-cols-1 gap-2">
                                {" "}
                                {/* Reduced gap from gap-3 */}
                                {/* Тип на лицето */}
                                <div className="group">
                                  <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">
                                    Тип на лицето
                                  </label>
                                  {editingField === "personType" ? (
                                    <div className="flex items-center gap-2">
                                      <select
                                        value={formData.personType}
                                        onChange={(e) => handleFieldChange("personType", e.target.value)}
                                        className="flex-1 text-xs px-2 py-1.5 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                                      >
                                        {personTypes.map((type) => (
                                          <option key={type} value={type}>
                                            {type}
                                          </option>
                                        ))}
                                      </select>
                                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleFieldSave}>
                                        <Check className="w-4 h-4 text-green-600" />
                                      </Button>
                                    </div>
                                  ) : (
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-slate-700 dark:text-slate-300">
                                        {formData.personType}
                                      </span>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => handleFieldEdit("personType")}
                                      >
                                        <Edit2 className="w-3 h-3 text-slate-400" />
                                      </Button>
                                    </div>
                                  )}
                                </div>
                                {/* Държава */}
                                <div className="group">
                                  <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">
                                    Държава
                                  </label>
                                  {editingField === "country" ? (
                                    <div className="flex items-center gap-2">
                                      <select
                                        value={formData.country}
                                        onChange={(e) => handleFieldChange("country", e.target.value)}
                                        className="flex-1 text-xs px-2 py-1.5 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                                      >
                                        {countries.map((country) => (
                                          <option key={country.name} value={country.name}>
                                            {country.flag} {country.name}
                                          </option>
                                        ))}
                                      </select>
                                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleFieldSave}>
                                        <Check className="w-4 h-4 text-green-600" />
                                      </Button>
                                    </div>
                                  ) : (
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <img
                                          src={`https://flagcdn.com/24x18/${countries.find((c) => c.name === formData.country)?.code.toLowerCase()}.png`}
                                          alt={formData.country}
                                          className="w-6 h-4 object-cover rounded shadow-sm"
                                        />
                                        <span className="text-xs text-slate-700 dark:text-slate-300">
                                          {formData.country}
                                        </span>
                                      </div>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => handleFieldEdit("country")}
                                      >
                                        <Edit2 className="w-3 h-3 text-slate-400" />
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            {/* Идентификация */}
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-1.5">
                                Идентификация
                              </h4>
                              <div className="grid grid-cols-1 gap-2">
                                {[
                                  { field: "fullName", label: "Име/Наименование" },
                                  { field: "egn", label: "ЕГН/ЕИК" },
                                  { field: "lnch", label: "ЛНЧ" },
                                  { field: "bulstat", label: "Булстат" },
                                  { field: "otherIdNumber", label: "Друг идентификационен номер" },
                                ].map(({ field, label }) => (
                                  <div key={field} className="group">
                                    <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">
                                      {label}
                                    </label>
                                    {editingField === field ? (
                                      <div className="flex items-center gap-2">
                                        <Input
                                          value={formData[field as keyof typeof formData]}
                                          onChange={(e) => handleFieldChange(field, e.target.value)}
                                          className="flex-1 text-xs h-8"
                                        />
                                        <Button
                                          size="icon"
                                          variant="ghost"
                                          className="h-7 w-7"
                                          onClick={handleFieldSave}
                                        >
                                          <Check className="w-4 h-4 text-green-600" />
                                        </Button>
                                      </div>
                                    ) : (
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs text-slate-700 dark:text-slate-300">
                                          {formData[field as keyof typeof formData]}
                                        </span>
                                        <Button
                                          size="icon"
                                          variant="ghost"
                                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                          onClick={() => handleFieldEdit(field)}
                                        >
                                          <Edit2 className="w-3 h-3 text-slate-400" />
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                            {/* Данъчна информация */}
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-1.5">
                                Данъчна информация
                              </h4>
                              <div className="grid grid-cols-1 gap-2">
                                {[
                                  { field: "vatId", label: "ДДС № (VAT ID)" },
                                  { field: "otherTaxId", label: "Друг данъчен идентификатор" },
                                ].map(({ field, label }) => (
                                  <div key={field} className="group">
                                    <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">
                                      {label}
                                    </label>
                                    {editingField === field ? (
                                      <div className="flex items-center gap-2">
                                        <Input
                                          value={formData[field as keyof typeof formData]}
                                          onChange={(e) => handleFieldChange(field, e.target.value)}
                                          className="flex-1 text-xs h-8"
                                        />
                                        <Button
                                          size="icon"
                                          variant="ghost"
                                          className="h-7 w-7"
                                          onClick={handleFieldSave}
                                        >
                                          <Check className="w-4 h-4 text-green-600" />
                                        </Button>
                                      </div>
                                    ) : (
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs text-slate-700 dark:text-slate-300">
                                          {formData[field as keyof typeof formData]}
                                        </span>
                                        <Button
                                          size="icon"
                                          variant="ghost"
                                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                          onClick={() => handleFieldEdit(field)}
                                        >
                                          <Edit2 className="w-3 h-3 text-slate-400" />
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                            {/* Банкова информация */}
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-1.5">
                                Банкова информация
                              </h4>
                              <div className="grid grid-cols-1 gap-2">
                                <div className="group">
                                  <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">IBAN</label>
                                  {editingField === "iban" ? (
                                    <div className="flex items-center gap-2">
                                      <Input
                                        value={formData.iban}
                                        onChange={(e) => handleFieldChange("iban", e.target.value)}
                                        className="flex-1 text-xs h-8"
                                      />
                                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleFieldSave}>
                                        <Check className="w-4 h-4 text-green-600" />
                                      </Button>
                                    </div>
                                  ) : (
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-slate-700 dark:text-slate-300">
                                        {formData.iban}
                                      </span>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => handleFieldEdit("iban")}
                                      >
                                        <Edit2 className="w-3 h-3 text-slate-400" />
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>

                  <Card className="mt-3 p-3 bg-white dark:bg-slate-800 shadow-sm border-slate-200 dark:border-slate-700">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                      Хронология на Дейности
                    </h3>
                    <div className="space-y-3">
                      {timelineEvents.map((event, index) => {
                        const Icon = event.icon
                        return (
                          <div key={index} className="flex gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                event.type === "success"
                                  ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                  : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{event.title}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{event.description}</p>
                              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{event.date}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-9">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <Card className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">Поръчки</p>
                          <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">{qualityCount.Клиент}</p>
                        </div>
                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-blue-500 dark:bg-blue-600 flex items-center justify-center">
                          <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-3 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-200 dark:border-emerald-800 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1">Изплатени</p>
                          <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">42,800 лв</p>
                        </div>
                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-emerald-500 dark:bg-emerald-600 flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-3 bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20 border-rose-200 dark:border-rose-800 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-rose-600 dark:text-rose-400 mb-1">Неизплатени</p>
                          <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">15,500 лв</p>
                        </div>
                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-rose-500 dark:bg-rose-600 flex items-center justify-center">
                          <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-3 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mb-1">Рейтинг</p>
                          <div className="flex items-center gap-1">
                            <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">4.8</p>
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                          </div>
                        </div>
                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-amber-500 dark:bg-amber-600 flex items-center justify-center">
                          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Tabs */}
                  <Card className="p-1 bg-white dark:bg-slate-800 shadow-md border-2 border-slate-300 dark:border-slate-600">
                    <div className="border-b border-slate-200 dark:border-slate-700 px-3 sm:px-4">
                      <div className="flex gap-3 sm:gap-4 overflow-x-auto">
                        {tabs.map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-2 sm:py-3 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                              activeTab === tab.id
                                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                                : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 sm:p-4 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        <div>
                          <Input
                            placeholder="Търсене по име..."
                            value={filterName}
                            onChange={(e) => setFilterName(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-9 text-sm"
                          />
                        </div>
                        <div>
                          <Input
                            placeholder="Търсене по тип..."
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-9 text-sm"
                          />
                        </div>
                        <div>
                          <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full h-9 px-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-sm text-slate-900 dark:text-slate-100"
                          >
                            <option value="">Всички статуси</option>
                            <option value="Завършен">Завършен</option>
                            <option value="В процес">В процес</option>
                            <option value="Планиран">Планиран</option>
                          </select>
                        </div>
                        <div className="relative">
                          <button
                            onClick={() => setShowQualityFilterPopup(!showQualityFilterPopup)}
                            className="w-full h-9 px-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-sm text-slate-900 dark:text-slate-100 text-left flex items-center justify-between"
                          >
                            <span>
                              {filterQuality.length === 0 ? "Всички качества" : `${filterQuality.length} избрани`}
                            </span>
                            <ChevronDown className="w-4 h-4" />
                          </button>
                          {showQualityFilterPopup && (
                            <div className="absolute z-50 mt-1 w-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-md shadow-lg p-3 space-y-2">
                              {[
                                "Клиент",
                                "Подизпълнител",
                                "Платец",
                                "Контактно лице",
                                "Доставчик",
                                "Партньор",
                                "МОЛ",
                              ].map((quality) => (
                                <label
                                  key={quality}
                                  className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 p-2 rounded"
                                >
                                  <input
                                    type="checkbox"
                                    checked={filterQuality.includes(quality)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setFilterQuality([...filterQuality, quality])
                                      } else {
                                        setFilterQuality(filterQuality.filter((q) => q !== quality))
                                      }
                                    }}
                                    className="w-4 h-4 rounded border-2 border-emerald-400 dark:border-emerald-600 text-emerald-600 focus:ring-emerald-500"
                                  />
                                  <span className="text-sm text-slate-900 dark:text-slate-100">{quality}</span>
                                </label>
                              ))}
                              <div className="flex gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setFilterQuality([])}
                                  className="flex-1 text-xs"
                                >
                                  Изчисти
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => setShowQualityFilterPopup(false)}
                                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs"
                                >
                                  Готово
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                        <Button
                          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6"
                          onClick={() => {
                            // Filters are already applied via state
                            console.log("[v0] Filtering with:", { filterName, filterType, filterStatus, filterQuality })
                          }}
                        >
                          <Search className="w-4 h-4 mr-2" />
                          Търсене
                        </Button>
                      </div>

                      {activeTab === "documents" && (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-slate-200 dark:border-slate-700">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                                  <div className="flex items-center gap-2 cursor-pointer hover:text-emerald-600">
                                    Име на проект
                                    <ArrowUpDown className="w-4 h-4" />
                                  </div>
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                                  Тип
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                                  Дата на приемане
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                                  Дата на приключване
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                                  Цена
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                                  Качество
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                                  Статус
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                                  Действия
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredDocuments.map((doc) => (
                                <tr
                                  key={doc.id}
                                  className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer"
                                  onClick={() => handleDocumentClick(doc)}
                                >
                                  <td className="py-3 px-4 text-sm text-slate-900 dark:text-slate-100 font-medium">
                                    {doc.name}
                                  </td>
                                  <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-300">{doc.type}</td>
                                  <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-300">
                                    {doc.acceptDate}
                                  </td>
                                  <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-300">
                                    {doc.completionDate}
                                  </td>
                                  <td className="py-3 px-4 text-sm text-slate-900 dark:text-slate-100 font-semibold">
                                    {doc.price}
                                  </td>
                                  <td className="py-3 px-4">
                                    <div className="flex flex-wrap gap-1">
                                      {doc.quality.map((qual, index) => {
                                        // Different colors for each quality type
                                        const badgeColors = {
                                          Клиент: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
                                          Подизпълнител:
                                            "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
                                          Платец:
                                            "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
                                          "Контактно лице":
                                            "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300",
                                          Доставчик: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300",
                                          Партньор:
                                            "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
                                          МОЛ: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
                                        }
                                        const colorClass =
                                          badgeColors[qual as keyof typeof badgeColors] ||
                                          "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"

                                        return (
                                          <Badge key={index} className={`${colorClass} text-xs`}>
                                            {qual}
                                          </Badge>
                                        )
                                      })}
                                    </div>
                                  </td>
                                  <td className="py-3 px-4">
                                    <Badge
                                      className={`${
                                        doc.status === "Завършен"
                                          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                                          : doc.status === "В процес"
                                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                                      } hover:bg-opacity-80`}
                                    >
                                      {doc.status}
                                    </Badge>
                                  </td>
                                  <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                      <button
                                        className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/30"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleDownload(doc.name)
                                        }}
                                      >
                                        <Download className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Payslips Table */}
                      {activeTab === "payroll" && (
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Заплати</h2>
                            <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                              <DollarSign className="w-4 h-4 mr-2" />
                              Генериране на Заплата
                            </Button>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-700">
                                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                                    <button className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-200">
                                      Име на Документ
                                      <ArrowUpDown className="w-3 h-3" />
                                    </button>
                                  </th>
                                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                                    <button className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-200">
                                      Период
                                      <ArrowUpDown className="w-3 h-3" />
                                    </button>
                                  </th>
                                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                                    <button className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-200">
                                      Сума
                                      <ArrowUpDown className="w-3 h-3" />
                                    </button>
                                  </th>
                                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                                    Статус
                                  </th>
                                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                                    Действия
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {payslips.map((payslip, index) => (
                                  <tr
                                    key={index}
                                    className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                  >
                                    <td className="py-3 px-4 text-sm text-slate-900 dark:text-slate-100 font-medium">
                                      {payslip.name}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                                      {payslip.date}
                                    </td>
                                    <td className="py-3 px-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                                      {payslip.amount}
                                    </td>
                                    <td className="py-3 px-4">
                                      <Badge
                                        className={
                                          payslip.status === "Платено"
                                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30"
                                            : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30"
                                        }
                                      >
                                        {payslip.status}
                                      </Badge>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                      <div className="flex items-center justify-end gap-2">
                                        <Button
                                          size="icon"
                                          variant="ghost"
                                          className="w-8 h-8 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            handleDownload(payslip.name)
                                          }}
                                        >
                                          <Download className="w-4 h-4" />
                                        </Button>
                                        <Button
                                          size="icon"
                                          variant="ghost"
                                          className="w-8 h-8 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        ) : (
          // Default/Fallback view if not contractors-list or contractor-details
          <main className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-800">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Добре дошли в Таблото!</h1>
              <p className="text-slate-600 dark:text-slate-400">Изберете секция от навигацията.</p>
            </div>
          </main>
        )}
      </div>
      {showFilteredOrdersPopup && (
        <>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl max-h-[80vh] bg-white dark:bg-slate-800 rounded-lg shadow-2xl border-2 border-slate-300 dark:border-slate-600 overflow-hidden">
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b-2 border-slate-300 dark:border-slate-600 p-6 z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Поръчки - {selectedQualityFilter}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFilteredOrdersPopup(false)}
                  className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        Име на проект
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        Тип
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        Цена
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        Статус
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {qualityFilteredDocuments.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-500 dark:text-slate-400">
                          Няма намерени поръчки за {selectedQualityFilter}
                        </td>
                      </tr>
                    ) : (
                      qualityFilteredDocuments.map((doc) => (
                        <tr
                          key={doc.id}
                          className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                        >
                          <td className="py-3 px-4 text-sm text-slate-900 dark:text-slate-100 font-medium">
                            {doc.name}
                          </td>
                          <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-300">{doc.type}</td>
                          <td className="py-3 px-4 text-sm text-slate-900 dark:text-slate-100 font-semibold">
                            {doc.price}
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              className={`${
                                doc.status === "Завършен"
                                  ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                                  : doc.status === "В процес"
                                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                              }`}
                            >
                              {doc.status}
                            </Badge>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Address Panel - similar to Add Contact Panel */}
      {isAddressPanelOpen && (
        <>

          {/* Draggable Window */}
          <div
            className="fixed bg-white dark:bg-slate-900 shadow-2xl rounded-lg border-2 border-slate-300 dark:border-slate-600 z-50 flex flex-col"
            style={{
              left: `${windowPositions.address.x}px`,
              top: `${windowPositions.address.y}px`,
              width: `${windowPositions.address.width}px`,
              height: `${windowPositions.address.height}px`,
            }}
          >
            {/* Header - draggable area */}
            <div
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-4 rounded-t-lg flex items-center justify-between cursor-move"
              onMouseDown={(e) => handleWindowMouseDown(e, "address")}
            >
              <h3 className="text-lg font-semibold">
                {editingAddressIndex !== null ? "Редактиране на адрес" : "Добавяне на адрес"}
              </h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-white/20"
                  onClick={() => handleMinimize("address", "Добавяне на адрес")}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-white/20"
                  onClick={() => {
                    setIsAddressPanelOpen(false)
                    setEditingAddressIndex(null)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-auto p-6">
              <div className="space-y-4">
                {/* Държава */}
                <div>
                  <label className="block text-sm font-medium mb-2">Държава</label>
                  <select
                    value={newAddressData.country}
                    onChange={(e) => setNewAddressData({ ...newAddressData, country: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800"
                  >
                    {countries.map((country) => (
                      <option key={country.name} value={country.name}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Област</label>
                  <Input
                    placeholder="Област"
                    value={newAddressData.region || ""}
                    onChange={(e) => setNewAddressData({ ...newAddressData, region: e.target.value })}
                    className="border-2 border-slate-300 dark:border-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Община</label>
                  <Input
                    placeholder="Община"
                    value={newAddressData.municipality || ""}
                    onChange={(e) => setNewAddressData({ ...newAddressData, municipality: e.target.value })}
                    className="border-2 border-slate-300 dark:border-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Населено място</label>
                  <Input
                    placeholder="Населено място"
                    value={newAddressData.city}
                    onChange={(e) => setNewAddressData({ ...newAddressData, city: e.target.value })}
                    className="border-2 border-slate-300 dark:border-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Пощенски код</label>
                  <Input
                    placeholder="Пощенски код"
                    value={newAddressData.postalCode}
                    onChange={(e) => setNewAddressData({ ...newAddressData, postalCode: e.target.value })}
                    className="border-2 border-slate-300 dark:border-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Адрес</label>
                  <Input
                    placeholder="Адрес"
                    value={newAddressData.street}
                    onChange={(e) => setNewAddressData({ ...newAddressData, street: e.target.value })}
                    className="border-2 border-slate-300 dark:border-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Тип на адреса</label>
                  <select
                    className="w-full px-3 py-2 border-2 border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800"
                    value={newAddressData.type}
                    onChange={(e) => setNewAddressData({ ...newAddressData, type: e.target.value })}
                  >
                    <option value="Постоянен адрес">Постоянен адрес</option>
                    <option value="Настоящ адрес">Настоящ адрес</option>
                    <option value="Адрес на управление">Адрес на управление</option>
                    <option value="Адрес за кореспонденция">Адрес за кореспонденция</option>
                    <option value="Друг адрес">Друг адрес</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Предназначение на адреса</label>
                  <Input
                    placeholder="Предназначение"
                    value={newAddressData.purpose}
                    onChange={(e) => setNewAddressData({ ...newAddressData, purpose: e.target.value })}
                    className="border-2 border-slate-300 dark:border-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Допълнително описание</label>
                  <textarea
                    className="w-full px-3 py-2 border-2 border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 min-h-[100px]"
                    placeholder="Допълнително описание"
                    value={newAddressData.description}
                    onChange={(e) => setNewAddressData({ ...newAddressData, description: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="border-t-2 border-slate-300 dark:border-slate-600 p-4 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddressPanelOpen(false)
                  setEditingAddressIndex(null)
                }}
              >
                Откажи
              </Button>
              <Button
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                onClick={handleSaveAddress}
              >
                {editingAddressIndex !== null ? "Запази промените" : "Добави адрес"}
              </Button>
            </div>
          </div>
        </>
      )}

      {addContractorDialogOpen && (
        <>

          {/* Draggable Window */}
          <div
            className="fixed bg-white dark:bg-slate-900 shadow-2xl rounded-lg border-2 border-slate-300 dark:border-slate-600 z-50 flex flex-col"
            style={{
              left: `${windowPositions.contractor.x}px`,
              top: `${windowPositions.contractor.y}px`,
              width: `${windowPositions.contractor.width}px`,
              height: `${windowPositions.contractor.height}px`,
            }}
          >
            {/* Header - draggable area */}
            <div
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-4 rounded-t-lg flex items-center justify-between cursor-move"
              onMouseDown={(e) => handleWindowMouseDown(e, "contractor")}
            >
              <h3 className="text-lg font-semibold">Добавяне на контрагент</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-white/20"
                  onClick={() => handleMinimize("contractor", "Добавяне на контрагент")}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-white/20"
                  onClick={() => setAddContractorDialogOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Content area - scrollable */}
            <div className="flex-1 overflow-auto p-8">
              {/* Mode toggle and dropdowns */}
              <div className="space-y-6 mb-8">
                <div className="flex flex-col lg:flex-row items-stretch lg:items-end gap-6">
                  <div className="flex-1 min-w-[250px]">
                    <label className="block text-base font-medium mb-3 text-slate-900 dark:text-slate-100">Тип Лице</label>
                    <select
                      value={newContractorData.type}
                      onChange={(e) => setNewContractorData({ ...newContractorData, type: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-base shadow-sm hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                    >
                      <option value="Физическо лице">Физическо лице</option>
                      <option value="Юридическо лице">Юридическо лице</option>
                    </select>
                  </div>
                  <div className="flex-1 min-w-[250px]">
                    <label className="block text-base font-medium mb-3 text-slate-900 dark:text-slate-100">Държава</label>
                    <select
                      value={newContractorData.country}
                      onChange={(e) => setNewContractorData({ ...newContractorData, country: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-base shadow-sm hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                    >
                      {countries.map((country) => (
                        <option key={country.code} value={country.name}>
                          {country.flag} {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end">
                    <div className="inline-flex rounded-xl border-2 border-slate-300 dark:border-slate-600 p-1.5 bg-slate-50 dark:bg-slate-900 shadow-sm">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setContractorFormMode("short")
                          setSectionModes({
                            identification: "short",
                            taxInfo: "short",
                            financialInfo: "short",
                            classification: "short",
                            contactInfo: "short",
                            addressInfo: "short",
                            metadata: "short",
                          })
                        }}
                        className={`px-6 py-2.5 rounded-lg text-base font-semibold transition-all ${
                          contractorFormMode === "short"
                            ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md"
                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                        }`}
                      >
                        Кратък режим
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setContractorFormMode("full")
                          setSectionModes({
                            identification: "full",
                            taxInfo: "full",
                            financialInfo: "full",
                            classification: "full",
                            contactInfo: "full",
                            addressInfo: "full",
                            metadata: "full",
                          })
                        }}
                        className={`px-6 py-2.5 rounded-lg text-base font-semibold transition-all ${
                          contractorFormMode === "full"
                            ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md"
                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                        }`}
                      >
                        Пълен режим
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sections */}
              {[
                { key: "identification", title: "Идентификация" },
                { key: "taxInfo", title: "Данъчна информация" },
                { key: "financialInfo", title: "Финансово/Банкова информация" },
                { key: "classification", title: "Класификация и статут" },
                { key: "contactInfo", title: "Контактна информация" },
                { key: "addressInfo", title: "Адресна информация" },
                { key: "metadata", title: "Мета данни" },
              ].map((section) => (
                <div
                  key={section.key}
                  className="border-2 border-slate-300 dark:border-slate-600 rounded-xl p-6 shadow-lg mt-6 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{section.title}</h3>
                    <div className="inline-flex rounded-lg border-2 border-slate-300 dark:border-slate-600 p-1 bg-slate-100 dark:bg-slate-900 shadow-sm">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSectionModes({ ...sectionModes, [section.key]: "short" })}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${
                          sectionModes[section.key] === "short"
                            ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800"
                        }`}
                      >
                        Кратък
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSectionModes({ ...sectionModes, [section.key]: "full" })}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${
                          sectionModes[section.key] === "full"
                            ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800"
                        }`}
                      >
                        Пълен
                      </Button>
                    </div>
                  </div>

                  <div className="mt-5">
                    {section.key === "identification" ? (
                      sectionModes[section.key] === "short" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                          <Input
                            placeholder="Имена"
                            value={contractorFormData.name}
                            onChange={(e) => handleContractorFieldChange("name", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Псевдоним"
                            value={contractorFormData.alias}
                            onChange={(e) => handleContractorFieldChange("alias", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="ЕГН"
                            value={contractorFormData.egn}
                            onChange={(e) => handleContractorFieldChange("egn", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                          <Input
                            placeholder="Имена"
                            value={contractorFormData.name}
                            onChange={(e) => handleContractorFieldChange("name", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Псевдоним"
                            value={contractorFormData.alias}
                            onChange={(e) => handleContractorFieldChange("alias", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="ЕГН"
                            value={contractorFormData.egn}
                            onChange={(e) => handleContractorFieldChange("egn", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            type="date"
                            placeholder="Дата на раждане"
                            value={contractorFormData.birthDate}
                            onChange={(e) => handleContractorFieldChange("birthDate", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                        </div>
                      )
                    ) : section.key === "taxInfo" ? (
                      sectionModes[section.key] === "short" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <Input
                            placeholder="ДДС № (VAT ID)"
                            value={contractorFormData.vatId}
                            onChange={(e) => handleContractorFieldChange("vatId", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                          <Input
                            placeholder="ДДС № (VAT ID)"
                            value={contractorFormData.vatId}
                            onChange={(e) => handleContractorFieldChange("vatId", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Друг данъчен идентификатор"
                            value={contractorFormData.otherTaxId}
                            onChange={(e) => handleContractorFieldChange("otherTaxId", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                        </div>
                      )
                    ) : section.key === "financialInfo" ? (
                      sectionModes[section.key] === "short" ? (
                        <div className="text-sm text-slate-500 dark:text-slate-400 italic p-3 bg-slate-100/50 dark:bg-slate-800/50 rounded">
                          Няма полета в кратък режим
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                          <Input
                            placeholder="IBAN"
                            value={contractorFormData.iban}
                            onChange={(e) => handleContractorFieldChange("iban", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Валута"
                            value={contractorFormData.currency}
                            onChange={(e) => handleContractorFieldChange("currency", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                        </div>
                      )
                    ) : section.key === "classification" ? (
                      sectionModes[section.key] === "short" ? (
                        <div className="text-sm text-slate-500 dark:text-slate-400 italic p-3 bg-slate-100/50 dark:bg-slate-800/50 rounded">
                          Няма полета в кратък режим
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                          <Input
                            placeholder="Организационна форма"
                            value={contractorFormData.organizationalForm}
                            onChange={(e) => handleContractorFieldChange("organizationalForm", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Правен режим"
                            value={contractorFormData.legalStatus}
                            onChange={(e) => handleContractorFieldChange("legalStatus", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Данъчен статут"
                            value={contractorFormData.taxStatus}
                            onChange={(e) => handleContractorFieldChange("taxStatus", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Професионална категория"
                            value={contractorFormData.professionalCategory}
                            onChange={(e) => handleContractorFieldChange("professionalCategory", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                        </div>
                      )
                    ) : section.key === "contactInfo" ? (
                      sectionModes[section.key] === "short" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                          <Input
                            placeholder="Телефон"
                            value={contractorFormData.phone}
                            onChange={(e) => handleContractorFieldChange("phone", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Имейл"
                            value={contractorFormData.email}
                            onChange={(e) => handleContractorFieldChange("email", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                          <Input
                            placeholder="Телефон"
                            value={contractorFormData.phone}
                            onChange={(e) => handleContractorFieldChange("phone", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Тип телефон"
                            value={contractorFormData.phoneType}
                            onChange={(e) => handleContractorFieldChange("phoneType", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Имейл"
                            value={contractorFormData.email}
                            onChange={(e) => handleContractorFieldChange("email", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Предназначение на телефон"
                            value={contractorFormData.phonePurpose}
                            onChange={(e) => handleContractorFieldChange("phonePurpose", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Тип имейл"
                            value={contractorFormData.emailType}
                            onChange={(e) => handleContractorFieldChange("emailType", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Предназначение на имейл"
                            value={contractorFormData.emailPurpose}
                            onChange={(e) => handleContractorFieldChange("emailPurpose", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                        </div>
                      )
                    ) : section.key === "addressInfo" ? (
                      /* CHANGE: Updated Адресна информация section with specific fields */
                      sectionModes[section.key] === "short" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                          <Input
                            placeholder="Населено място"
                            value={contractorFormData.city}
                            onChange={(e) => handleContractorFieldChange("city", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Пощенски код"
                            value={contractorFormData.postalCode}
                            onChange={(e) => handleContractorFieldChange("postalCode", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Адрес"
                            value={contractorFormData.address}
                            onChange={(e) => handleContractorFieldChange("address", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm md:col-span-2"
                          />
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                          <Input
                            placeholder="Държава"
                            value={contractorFormData.addressCountry}
                            onChange={(e) => handleContractorFieldChange("addressCountry", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Област"
                            value={contractorFormData.region}
                            onChange={(e) => handleContractorFieldChange("region", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Община"
                            value={contractorFormData.municipality}
                            onChange={(e) => handleContractorFieldChange("municipality", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Населено място"
                            value={contractorFormData.city}
                            onChange={(e) => handleContractorFieldChange("city", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Пощенски код"
                            value={contractorFormData.postalCode}
                            onChange={(e) => handleContractorFieldChange("postalCode", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Адрес"
                            value={contractorFormData.address}
                            onChange={(e) => handleContractorFieldChange("address", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Тип на адреса"
                            value={contractorFormData.addressType}
                            onChange={(e) => handleContractorFieldChange("addressType", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Предназначение на адреса"
                            value={contractorFormData.addressPurpose}
                            onChange={(e) => handleContractorFieldChange("addressPurpose", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Допълнително описание"
                            value={contractorFormData.addressDescription}
                            onChange={(e) => handleContractorFieldChange("addressDescription", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm lg:col-span-3"
                          />
                        </div>
                      )
                    ) : section.key === "metadata" ? (
                      /* CHANGE: Updated Мета данни section with specific fields */
                      sectionModes[section.key] === "short" ? (
                        <div className="text-sm text-slate-500 dark:text-slate-400 italic p-3 bg-slate-100/50 dark:bg-slate-800/50 rounded">
                          Няма полета в кратък режим
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                          <Input
                            placeholder="Външен идентификатор"
                            value={contractorFormData.externalId}
                            onChange={(e) => handleContractorFieldChange("externalId", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Статус"
                            value={contractorFormData.status}
                            onChange={(e) => handleContractorFieldChange("status", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                          <Input
                            placeholder="Версия"
                            value={contractorFormData.version}
                            onChange={(e) => handleContractorFieldChange("version", e.target.value)}
                            className="border-2 border-slate-300 dark:border-slate-600 shadow-sm h-11 px-4 text-base hover:border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 transition-all"
                          />
                        </div>
                      )
                    ) : null}
                  </div>
                </div>
              ))}

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t-2 border-slate-300 dark:border-slate-600 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setAddContractorDialogOpen(false)}
                  className="border-2 hover:bg-slate-100 dark:hover:bg-slate-700 px-8 py-3 text-base font-semibold"
                >
                  Отказ
                </Button>
                <Button
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg px-8 py-3 text-base font-semibold"
                  onClick={() => {
                    // Save logic here
                    setAddContractorDialogOpen(false)
                  }}
                >
                  Запази
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Minimized windows bar */}
      {minimizedWindows.length > 0 && (
        <div className="fixed bottom-0 left-64 right-0 bg-white dark:bg-slate-900 border-t-2 border-slate-300 dark:border-slate-600 p-3 flex items-center gap-3 z-50 shadow-lg">
          {minimizedWindows.map((window) => (
            <div
              key={window.id}
              className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 shadow-md hover:shadow-lg transition-shadow"
            >
              <span className="text-sm font-medium">{window.title}</span>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleRestore(window.type)}>
                <Maximize2 className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleCloseMinimized(window.id)}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
