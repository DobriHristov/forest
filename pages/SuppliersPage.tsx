import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, UserPlus, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { useContractors } from "@/contexts/ContractorsContext"

export function SuppliersPage() {
  const navigate = useNavigate()
  const { availableContacts, setSelectedContractorId } = useContractors()

  const [searchName, setSearchName] = useState("")
  const [searchType, setSearchType] = useState("")
  const [supplierAreaFilter, setSupplierAreaFilter] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const allSupplierAreas = ["Вода", "Алкохол", "Хотели", "Канцеларски материали", "Компютърна техника"]

  const filteredSuppliers = availableContacts
    .filter((c) => c.businessRole.includes("Доставчик"))
    .filter((c) => c.name.toLowerCase().includes(searchName.toLowerCase()))
    .filter((c) => searchType === "" || c.type === searchType)
    .filter((c) => supplierAreaFilter.length === 0 || supplierAreaFilter.some((a) => c.supplierArea.includes(a)))

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage)
  const paginatedSuppliers = filteredSuppliers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSupplierClick = (id: number) => {
    setSelectedContractorId(id)
    navigate(`/contractors/${id}`)
  }

  return (
    <main className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-800">
      <div className="p-4 lg:p-6 h-full flex flex-col">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Доставчици</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Управление на доставчици</p>
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
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Област</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between border-2 border-slate-300 dark:border-slate-600 bg-transparent"
                    >
                      {supplierAreaFilter.length === 0
                        ? "Всички области"
                        : `Избрани (${supplierAreaFilter.length})`}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {allSupplierAreas.map((area) => (
                      <div key={area} className="flex items-center px-2 py-2 hover:bg-slate-100 dark:hover:bg-slate-800">
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
                        <label htmlFor={`supplier-area-${area}`} className="text-sm cursor-pointer flex-1">
                          {area}
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
                  Добавяне на доставчик
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suppliers Table */}
        <Card className="shadow-lg border-2 border-slate-300 dark:border-slate-600 flex-1 flex flex-col min-h-0">
          <CardHeader className="py-3">
            <div className="flex items-center justify-between">
              <CardTitle>Списък с доставчици</CardTitle>
              <Badge variant="secondary">{filteredSuppliers.length} резултата</Badge>
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
                      Област
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Тип
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedSuppliers.map((supplier) => (
                    <tr
                      key={supplier.id}
                      onClick={() => handleSupplierClick(supplier.id)}
                      className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                        #{supplier.id.toString().padStart(6, "0")}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-slate-100">
                        {supplier.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{supplier.address}</td>
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{supplier.phone}</td>
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{supplier.email}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {supplier.supplierArea.map((area, idx) => (
                            <Badge key={idx} className="text-xs bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">{supplier.type}</td>
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
                  Страница {currentPage} от {totalPages || 1} ({filteredSuppliers.length} резултата)
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
