export function DashboardPage() {
  return (
    <main className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-800">
      <div className="p-4 lg:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Табло dodo</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Общ преглед на системата</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Контрагенти</h3>
            <p className="text-3xl font-bold text-emerald-600">6</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Общо контрагенти</p>
          </div>
          <div className="bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Клиенти</h3>
            <p className="text-3xl font-bold text-blue-600">4</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Общо клиенти</p>
          </div>
          <div className="bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Доставчици</h3>
            <p className="text-3xl font-bold text-cyan-600">4</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Общо доставчици</p>
          </div>
        </div>
      </div>
    </main>
  )
}
