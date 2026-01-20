import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, ChevronLeft, ChevronRight } from "lucide-react"
import { useContractors } from "@/contexts/ContractorsContext"

export function ClientsPage() {
  const navigate = useNavigate()
  const { availableContacts, setSelectedContractorId } = useContractors()

  const [searchName, setSearchName] = useState("")
  const [searchType, setSearchType] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const filteredClients = availableContacts
    .filter((c) => c.businessRole.includes("Клиент"))
    .filter((c) => c.name.toLowerCase().includes(searchName.toLowerCase()))
    .filter((c) => searchType === "" || c.type === searchType)

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage)
  const paginatedClients = filteredClients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleClientClick = (id: number) => {
    setSelectedContractorId(id)
    navigate(`/contractors/${id}`)
  }

  return (
    <main className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-800">
      <div className="p-4 lg:p-6 h-full flex flex-col">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Клиенти</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Управление на клиенти</p>
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
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="w-full h-10 border-2 border-slate-300 dark:border-slate-600 bg-transparent"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Тип</label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm"
                >
                  <option value="">Всички</option>
                  <option value="Физическо лице">Физическо лице</option>
                  <option value="Юридическо лице">Юридическо лице</option>
                </select>
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
                  Добавяне на клиент
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clients Table */}
        <Card className="shadow-lg border-2 border-slate-300 dark:border-slate-600 flex-1 flex flex-col min-h-0">
          <CardHeader className="py-3">
            <div className="flex items-center justify-between">
              <CardTitle>Списък с клиенти</CardTitle>
              <Badge variant="secondary">{filteredClients.length} резултата</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden pb-4">
            <div className="overflow-auto h-full">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-300 dark:border-slate-600">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Номер
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
                      Тип
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedClients.map((client) => (
                    <tr
                      key={client.id}
                      onClick={() => handleClientClick(client.id)}
                      className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                        #{client.id.toString().padStart(6, "0")}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-slate-100">
                        {client.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{client.address}</td>
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{client.phone}</td>
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{client.email}</td>
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{client.type}</td>
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
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value))
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
                  Страница {currentPage} от {totalPages || 1} ({filteredClients.length} резултата)
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
