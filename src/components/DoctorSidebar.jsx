const items = [
  { label: "نظرة عامة واللوحة", icon: "⊞", screen: "doctor-dashboard" },
  { label: "مواعيد اليوم والانتظار", icon: "📅", screen: "waiting-queue" },
  { label: "طابور وتدفق المرضى", icon: "👥", screen: "waiting-queue" },
  { label: "سجلات وملفات المرضى", icon: "📋", screen: "patient-record" },
  { label: "الروشتات والوصفات الطبية", icon: "💊", screen: "patient-record" },
  { label: "جدول ومواعيد الطبيب", icon: "🗓", screen: "doctor-schedule" },
  { label: "الاستشارات والتقارير", icon: "📊", screen: "patient-record" },
  { label: "الملف الشخصي والإعدادات", icon: "⚙️", screen: "doctor-dashboard" },
]
export default function DoctorSidebar({ navigate, active }) {
  return (
    <aside
      className="flex-shrink-0 w-64 min-h-screen pt-4 pb-8"
      style={{ background: "#fff", borderLeft: "1px solid #e8e9f0" }}
      dir="rtl"
    >
      <div className="px-4 mb-3">
        <div
          className="text-xs font-semibold mb-1"
          style={{ color: "#696a76" }}
        >
          الفرع النشط
        </div>
        <div className="text-sm font-bold" style={{ color: "#090c56" }}>
          عيادة القلب - التجمع الخامس
        </div>
      </div>
      <nav className="px-3">
        {items.map((item) => (
          <button
            key={item.screen + item.label}
            onClick={() => navigate(item.screen)}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl mb-1 text-sm font-medium text-right transition-all"
            style={
              active === item.screen
                ? { background: "#090c56", color: "#fff", fontWeight: 700 }
                : { color: "#171827" }
            }
          >
            <span style={{ fontSize: 15, opacity: 0.8 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div
        className="mt-8 mx-3 p-3 rounded-xl"
        style={{ background: "#fff0f3", border: "1px solid #ffd6e0" }}
      >
        <div className="text-xs font-bold mb-1" style={{ color: "#ef003d" }}>
          دعم العيادات والأنظمة
        </div>
        <div className="text-sm font-bold" style={{ color: "#090c56" }}>
          02-3344-9988
        </div>
        <button
          className="mt-2 text-xs font-semibold"
          style={{ color: "#ef003d" }}
        >
          ← تسجيل الخروج
        </button>
      </div>
    </aside>
  )
}
