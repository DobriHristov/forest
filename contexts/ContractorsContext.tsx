import { createContext, useContext, useState, ReactNode } from "react"

type Contractor = {
  id: number
  name: string
  type: string
  quality: string[]
  businessRole: string[]
  email: string
  phone: string
  address: string
  supplierArea: string[]
}

type ContractorsContextType = {
  availableContacts: Contractor[]
  selectedContractorId: number | null
  setSelectedContractorId: (id: number | null) => void
}

const ContractorsContext = createContext<ContractorsContextType | undefined>(undefined)

export function ContractorsProvider({ children }: { children: ReactNode }) {
  const [selectedContractorId, setSelectedContractorId] = useState<number | null>(null)

  const availableContacts: Contractor[] = [
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
      email: "petar.vasilev@example.com",
      phone: "+359 888 999 000",
      address: "Бургас, България",
      supplierArea: ["Хотели"],
    },
    {
      id: 6,
      name: "Иновейшън Груп ООД",
      type: "Юридическо лице",
      quality: ["Доставчик"],
      businessRole: ["Доставчик"],
      email: "office@innovation-group.bg",
      phone: "+359 888 222 333",
      address: "София, България",
      supplierArea: ["Канцеларски материали"],
    },
  ]

  return (
    <ContractorsContext.Provider
      value={{
        availableContacts,
        selectedContractorId,
        setSelectedContractorId,
      }}
    >
      {children}
    </ContractorsContext.Provider>
  )
}

export function useContractors() {
  const context = useContext(ContractorsContext)
  if (context === undefined) {
    throw new Error("useContractors must be used within a ContractorsProvider")
  }
  return context
}
