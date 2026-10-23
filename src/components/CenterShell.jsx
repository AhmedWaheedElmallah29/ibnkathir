import Logo from "@/components/Logo"
const navigation = {
  reception: [
    { label: "لوحة الاستقبال", screen: "reception-dashboard", mark: "01" },
    { label: "سجل المرضى", screen: "reception-patients", mark: "02" },
    { label: "حجز موعد", screen: "reception-booking", mark: "03" },
  ],
  doctor: [
    { label: "لوحة الطبيب", screen: "center-doctor-dashboard", mark: "01" },
    { label: "الجدول والمواعيد", screen: "center-doctor-schedule", mark: "02" },
    { label: "سجلات المرضى", screen: "center-doctor-records", mark: "03" },
  ],
  admin: [
    { label: "نظرة عامة", screen: "admin-dashboard", mark: "01" },
    { label: "الأطباء والتخصصات", screen: "admin-doctors", mark: "02" },
    { label: "الإدارة المالية", screen: "admin-finance", mark: "03" },
    {
      label: "إدارة الأطباء والجداول",
      screen: "admin-doctor-management",
      mark: "04",
    },
  ],
}
const roleNames = {
  reception: "الاستقبال",
  doctor: "الطبيب",
  admin: "إدارة المركز",
}
const logoutScreens = {
  reception: "login",
  doctor: "login",
  admin: "login",
}
export default function CenterShell({
  role,
  active,
  navigate,
  title,
  headerAction,
  children,
}) {
  return (
    <div className="min-h-screen bg-[#f6f7f9]" dir="rtl">
      <header className="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-[#e8e9f0] bg-white px-4 md:px-7">
        <Logo size={42} subtitle={`بوابة ${roleNames[role]}`} />
        <div className="flex items-center gap-3">
          <div className="hidden text-left sm:block">
            <p className="text-sm font-bold text-[#090c56]">
              {role === "doctor"
                ? "د. أحمد منصور"
                : role === "admin"
                  ? "مدير المركز"
                  : "موظف الاستقبال"}
            </p>
            <p className="text-xs text-[#696a76]">فرع القاهرة الرئيسي</p>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#090c56] text-sm font-black text-white">
            {role === "doctor" ? "ط" : role === "admin" ? "إ" : "س"}
          </div>
        </div>
      </header>
      <div className="flex min-h-[calc(100vh-72px)]">
        <aside className="hidden w-64 shrink-0 border-l border-[#e8e9f0] bg-white p-4 md:block">
          <p className="mb-3 px-3 text-xs font-bold text-[#9b9caa]">
            القائمة الرئيسية
          </p>
          <nav className="space-y-1">
            {navigation[role].map((item) => (
              <button
                key={item.screen}
                onClick={() => navigate(item.screen)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-right text-sm transition ${
                  active === item.screen
                    ? "bg-[#090c56] font-bold text-white"
                    : "text-[#171827] hover:bg-[#f6f7f9]"
                }`}
              >
                <span
                  className={`grid h-7 w-7 place-items-center rounded-lg text-[10px] font-black ${
                    active === item.screen
                      ? "bg-white/15"
                      : "bg-[#eff0ff] text-[#090c56]"
                  }`}
                >
                  {item.mark}
                </span>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-8 rounded-xl border border-[#ffd6e0] bg-[#fff0f3] p-3">
            <p className="text-xs font-bold text-[#ef003d]">دعم النظام</p>
            <p className="mt-1 text-sm font-bold text-[#090c56]">
              02-3344-9988
            </p>
          </div>
          <button
            onClick={() => navigate(logoutScreens[role])}
            className="mt-4 w-full rounded-xl px-3 py-2 text-right text-sm font-semibold text-[#ef003d]"
          >
            تسجيل الخروج
          </button>
        </aside>
        <main className="min-w-0 flex-1 p-4 pb-24 md:p-7">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold text-[#ef003d]">
                  {roleNames[role]}
                </p>
                <h1 className="mt-1 text-2xl font-black text-[#090c56]">
                  {title}
                </h1>
              </div>
              {headerAction}
            </div>
            {children}
          </div>
        </main>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-[#e8e9f0] bg-white p-2 md:hidden">
        {navigation[role].map((item) => (
          <button
            key={item.screen}
            onClick={() => navigate(item.screen)}
            className={`flex-1 rounded-lg px-1 py-2 text-[11px] font-bold ${
              active === item.screen
                ? "bg-[#090c56] text-white"
                : "text-[#696a76]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
