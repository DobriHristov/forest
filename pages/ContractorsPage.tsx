import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, UserPlus, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { useContractors } from "@/contexts/ContractorsContext"

export function ContractorsPage() {
  const navigate = useNavigate()
  const { availableContacts, setSelectedContractorId } = useContractors()

  const [contractorSearchName, setContractorSearchName] = useState("")
  const [contractorSearchType, setContractorSearchType] = useState("")
  const [contractorBusinessRoleFilter, setContractorBusinessRoleFilter] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [contractorsPerPage, setContractorsPerPage] = useState(10)

  const filteredContractors = availableContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(contractorSearchName.toLowerCase()) &&
      (contractorSearchType === "" || contact.type === contractorSearchType) &&
      (contractorBusinessRoleFilter.length === 0 ||
        contractorBusinessRoleFilter.some((r) => contact.businessRole.includes(r))),
  )

  const totalPages = Math.ceil(filteredContractors.length / contractorsPerPage)
  const paginatedContractors = filteredContractors.slice(
    (currentPage - 1) * contractorsPerPage,
    currentPage * contractorsPerPage,
  )

  const handleContractorClick = (id: number) => {
    setSelectedContractorId(id)
    navigate(`/contractors/${id}`)
  }

  return (
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
                        <label htmlFor={`contractor-role-${role}`} className="text-sm cursor-pointer flex-1">
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
                  onClick={() => {}}
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
            <div className="flex flex-col gap-4 mt-6 pt-4 border-t-2 border-slate-300 dark:border-slate-600">
              <div className="flex items-center justify-between">
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
                  Страница {currentPage} от {totalPages || 1} ({filteredContractors.length} резултата)
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="border-2"
                >
                  <ChevronLeft className="w-3 h-3" />
                  <ChevronLeft className="w-3 h-3 -ml-2" />
                </Button>
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
                {(() => {
                  const pages = []
                  const maxVisible = 5
                  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
                  let endPage = Math.min(totalPages || 1, startPage + maxVisible - 1)

                  if (endPage - startPage < maxVisible - 1) {
                    startPage = Math.max(1, endPage - maxVisible + 1)
                  }

                  if (startPage > 1) {
                    pages.push(
                      <Button
                        key={1}
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(1)}
                        className="border-2 min-w-[40px]"
                      >
                        1
                      </Button>,
                    )
                    if (startPage > 2) {
                      pages.push(
                        <span key="ellipsis1" className="px-2 text-slate-500">
                          ...
                        </span>,
                      )
                    }
                  }

                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <Button
                        key={i}
                        variant={currentPage === i ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(i)}
                        className={`border-2 min-w-[40px] ${
                          currentPage === i ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white" : ""
                        }`}
                      >
                        {i}
                      </Button>,
                    )
                  }

                  if (endPage < totalPages) {
                    if (endPage < totalPages - 1) {
                      pages.push(
                        <span key="ellipsis2" className="px-2 text-slate-500">
                          ...
                        </span>,
                      )
                    }
                    pages.push(
                      <Button
                        key={totalPages}
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(totalPages)}
                        className="border-2 min-w-[40px]"
                      >
                        {totalPages}
                      </Button>,
                    )
                  }

                  return pages
                })()}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages || 1, currentPage + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="border-2"
                >
                  Напред
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages || 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="border-2"
                >
                  <ChevronRight className="w-3 h-3" />
                  <ChevronRight className="w-3 h-3 -ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
