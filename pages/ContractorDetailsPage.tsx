import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, Mail, Phone, MapPin } from "lucide-react"
import { useContractors } from "@/contexts/ContractorsContext"

export function ContractorDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { availableContacts } = useContractors()

  const contractor = availableContacts.find((c) => c.id === Number(id))

  if (!contractor) {
    return (
      <main className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Контрагентът не е намерен</h1>
          <Button onClick={() => navigate("/contractors")}>Обратно към списъка</Button>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-800">
      <div className="p-4 lg:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{contractor.name}</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Контрагент #{contractor.id.toString().padStart(6, "0")}
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate("/contractors")}>
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Обратно
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg border-2 border-slate-300 dark:border-slate-600">
            <CardHeader className="py-3">
              <CardTitle className="text-lg">Основна информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Тип</label>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-1">{contractor.type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Качество</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {contractor.quality.map((q, idx) => (
                    <Badge key={idx} className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                      {q}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Бизнес роли</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {contractor.businessRole.map((role, idx) => {
                    const roleColors: Record<string, string> = {
                      Клиент: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
                      Доставчик: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
                    }
                    return (
                      <Badge key={idx} className={roleColors[role] || ""}>
                        {role}
                      </Badge>
                    )
                  })}
                </div>
              </div>
              {contractor.supplierArea.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Област на доставка</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {contractor.supplierArea.map((area, idx) => (
                      <Badge key={idx} className="bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg border-2 border-slate-300 dark:border-slate-600">
            <CardHeader className="py-3">
              <CardTitle className="text-lg">Контактна информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Имейл</label>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{contractor.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Телефон</label>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{contractor.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Адрес</label>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{contractor.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
