import { useState } from "react"
import PatientNavbar from "@/components/PatientNavbar"
import PatientSidebar from "@/components/PatientSidebar"
const upcomingAppts = [
  {
    status: "Pending",
    statusAr: "قيد تأكيد العيادة",
    statusColor: "#f79009",
    statusBg: "#fef3c7",
    ref: "TK-89510-EG#",
    doctor: "د. أحمد القحطاني",
    spec: "استشاري جراحة العظام والمفاصل الرياضية",
    clinic: "عيادة العظام التخصصية - فرع سمنة، الإسكندرية",
    date: "الخميس 24 أكتوبر 2024",
    time: "06:15 مساءً",
    fees: "300.00",
    type: "مراجعة جدول الطبيب",
  },
  {
    status: "Confirmed",
    statusAr: "مؤكد",
    statusColor: "#12b76a",
    statusBg: "#e8f9f0",
    ref: "TK-89241-EG#",
    doctor: "د. مايكل تشن",
    spec: "استشاري أمراض القلب الدموية والقسطرة",
    clinic: "عيادة القلب - عيادة ابن كثير، التجمع الخامس، القاهرة",
    date: "الاثنين 21 أكتوبر 2024",
    time: "05:30 مساءً (القاهرة)",
    fees: "350.00",
    type: "كشف سريري ومتابعة",
  },
]
const pastAppts = [
  {
    ref: "#TK-89332-EG",
    doctor: "د. ريم الدوسري",
    spec: "استشاري طب جلدية وتجميل وعلاج بالليزر",
    branch: "فرع التجمع الخامس",
    date: "اليوم",
    time: "10:15 ص",
    fees: 250,
    status: "In Progress",
    statusAr: "داخل الكشف",
    statusColor: "#090c56",
    actions: "متابعة حية",
  },
  {
    ref: "#TK-87120-EG",
    doctor: "د. سارة المنصور",
    spec: "أمراض الباطنة والجهاز الهضمي",
    branch: "فرع الشيخ زايد",
    date: "14 أكتوبر 2024",
    time: "04:00 م",
    fees: 400,
    status: "Completed",
    statusAr: "مكتمل",
    statusColor: "#12b76a",
    actions: "عرض الروشتة والتقرير",
  },
  {
    ref: "#TK-86504-EG",
    doctor: "د. نورة السليمان",
    spec: "استشاري طب الأطفال والرضع والولادة",
    branch: "فرع المعادي",
    date: "28 سبتمبر 2024",
    time: "07:00 م",
    fees: 300,
    status: "Completed",
    statusAr: "مكتمل",
    statusColor: "#12b76a",
    actions: "عرض الروشتة والتقرير",
  },
  {
    ref: "#TK-85211-EG",
    doctor: "د. خالد إبراهيم",
    spec: "استشاري جراحة المخ والعمود الفقري والأعصاب",
    branch: "المركز الطبي التخصصي",
    date: "12 سبتمبر 2024",
    time: "05:00 م",
    fees: 450,
    status: "Cancelled",
    statusAr: "ملغي",
    statusColor: "#ef003d",
    actions: "حجز بديل",
  },
]
const stats = [
  { label: "المواعيد النشطة والقادمة", icon: "📅", value: 2 },
  { label: "الكشوفات المكتملة", icon: "✅", value: 3 },
  {
    label: "حالة الحضور الحالية",
    value: "1 داخل العيادة",
    icon: "🏥",
    highlight: true,
  },
  { label: "الملاحظات وعدم الحضور", icon: "❌", value: 2 },
]
export default function PatientDashboardScreen({ navigate, currentScreen }) {
  const [search, setSearch] = useState("")
  const [filterTab, setFilterTab] = useState("الكل (6)")
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#f6f7f9" }}
      dir="rtl"
    >
      <PatientNavbar navigate={navigate} />

      <div className="flex flex-1">
        <PatientSidebar navigate={navigate} active={currentScreen} />

        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <button
                onClick={() => navigate("booking-datetime")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold"
                style={{ background: "#ef003d", color: "#fff" }}
              >
                + احجز موعد كشف جديد
              </button>
              <div>
                <h1
                  className="text-2xl font-black"
                  style={{ color: "#090c56" }}
                >
                  📅 مواعيدي وكشوفاتي الطبية
                </h1>
                <p className="text-sm mt-1" style={{ color: "#696a76" }}>
                  إدارة ومتابعة جميع مواعيد الكشف والزيارات السابقة والقائمة مع
                  الأطباء المعتمدين
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-5">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-4 flex items-center gap-3"
                  style={{ background: "#fff", border: "1px solid #e8e9f0" }}
                >
                  <div className="text-2xl">{s.icon}</div>
                  <div>
                    <div
                      className="text-2xl font-black"
                      style={{ color: "#090c56" }}
                    >
                      {s.value}
                    </div>
                    <div className="text-xs" style={{ color: "#696a76" }}>
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Filter + search */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="flex gap-1 p-1 rounded-xl"
                style={{ background: "#fff", border: "1px solid #e8e9f0" }}
              >
                {[
                  "الكل (6)",
                  "المواعيد القادمة (2)",
                  "المكتملة (3)",
                  "الملغاة / عدم الحضور (2)",
                ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilterTab(tab)}
                    className="px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                    style={
                      filterTab === tab
                        ? { background: "#090c56", color: "#fff" }
                        : { color: "#696a76" }
                    }
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm"
                style={{
                  border: "1px solid #e8e9f0",
                  outline: "none",
                  background: "#fff",
                }}
                placeholder="🔍 ابحث برقم الموعد، اسم الطبيب، أو التخصص..."
              />
            </div>

            {/* Upcoming */}
            <div className="mb-6">
              <h2
                className="font-bold mb-3 flex items-center gap-2"
                style={{ color: "#090c56" }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#12b76a", display: "inline-block" }}
                />
                المواعيد القادمة والنشطة (2)
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {upcomingAppts.map((appt) => (
                  <div
                    key={appt.ref}
                    className="rounded-2xl p-5"
                    style={{ background: "#fff", border: "1px solid #e8e9f0" }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-xs font-bold px-2 py-1 rounded-full"
                        style={{
                          background: appt.statusBg,
                          color: appt.statusColor,
                        }}
                      >
                        {appt.status === "Pending" ? "⏳" : "●"} {appt.statusAr}{" "}
                        ({appt.status})
                      </span>
                      <span className="text-xs" style={{ color: "#9b9caa" }}>
                        رقم الموعد: {appt.ref}
                      </span>
                    </div>
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                        style={{ background: "#090c56", color: "#fff" }}
                      >
                        {appt.doctor[3]}
                      </div>
                      <div>
                        <div className="font-bold" style={{ color: "#090c56" }}>
                          {appt.doctor}
                        </div>
                        <div className="text-xs" style={{ color: "#ef003d" }}>
                          {appt.spec}
                        </div>
                        <div
                          className="text-xs mt-0.5"
                          style={{ color: "#696a76" }}
                        >
                          📍 {appt.clinic}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {[
                        { icon: "⏰", label: "وقت الكشف", value: appt.time },
                        { icon: "📅", label: "تاريخ الكشف", value: appt.date },
                        {
                          icon: "💳",
                          label: "رسوم الكشف",
                          value: `${appt.fees} ج.م`,
                        },
                        {
                          icon: "📋",
                          label: "حالة الاعتماد",
                          value: appt.type,
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="p-2 rounded-lg"
                          style={{ background: "#f9f9fb" }}
                        >
                          <div className="text-xs" style={{ color: "#696a76" }}>
                            {item.icon} {item.label}
                          </div>
                          <div
                            className="text-sm font-semibold mt-0.5"
                            style={{ color: "#171827" }}
                          >
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate("appointment-details")}
                        className="flex-1 py-2 rounded-xl text-xs font-bold"
                        style={{ background: "#090c56", color: "#fff" }}
                      >
                        📋 تفاصيل الموعد
                      </button>
                      <button
                        className="py-2 px-3 rounded-xl text-xs font-semibold"
                        style={{
                          border: "1px solid #e8e9f0",
                          color: "#696a76",
                        }}
                      >
                        ✏️ تعديل
                      </button>
                      <button
                        className="py-2 px-3 rounded-xl text-xs font-semibold"
                        style={{ color: "#ef003d" }}
                      >
                        إلغاء الطلب
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past appointments table */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-2">
                  <button
                    className="text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"
                    style={{ border: "1px solid #e8e9f0", color: "#696a76" }}
                  >
                    📄 تصفية متقدمة
                  </button>
                  <button
                    className="text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"
                    style={{ border: "1px solid #e8e9f0", color: "#696a76" }}
                  >
                    ⬇️ تصدير السجل (PDF)
                  </button>
                </div>
                <h2 className="font-bold" style={{ color: "#090c56" }}>
                  المواعيد السابقة وسجل الزيارات السريرية
                </h2>
              </div>

              <div
                className="rounded-2xl overflow-hidden"
                style={{ background: "#fff", border: "1px solid #e8e9f0" }}
              >
                <table className="w-full">
                  <thead>
                    <tr
                      style={{
                        background: "#f9f9fb",
                        borderBottom: "1px solid #e8e9f0",
                      }}
                    >
                      {[
                        "رقم الموعد",
                        "الطبيب والتخصص",
                        "العيادة والفرع",
                        "التاريخ والوقت",
                        "الرسوم",
                        "الحالة السريرية",
                        "الإجراءات",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-right px-4 py-3 text-xs font-semibold"
                          style={{ color: "#696a76" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pastAppts.map((appt) => (
                      <tr
                        key={appt.ref}
                        style={{ borderBottom: "1px solid #f0f0f5" }}
                      >
                        <td
                          className="px-4 py-3 text-xs font-mono"
                          style={{ color: "#090c56" }}
                        >
                          {appt.ref}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                              style={{ background: "#090c56", color: "#fff" }}
                            >
                              {appt.doctor[3]}
                            </div>
                            <div>
                              <div
                                className="text-xs font-bold"
                                style={{ color: "#090c56" }}
                              >
                                {appt.doctor}
                              </div>
                              <div
                                className="text-xs"
                                style={{ color: "#696a76" }}
                              >
                                {appt.spec}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td
                          className="px-4 py-3 text-xs"
                          style={{ color: "#696a76" }}
                        >
                          🏥 {appt.branch}
                        </td>
                        <td className="px-4 py-3">
                          <div
                            className="text-xs font-semibold"
                            style={{
                              color:
                                appt.date === "اليوم" ? "#ef003d" : "#171827",
                            }}
                          >
                            {appt.date}
                          </div>
                          <div className="text-xs" style={{ color: "#696a76" }}>
                            ص {appt.time}
                          </div>
                        </td>
                        <td
                          className="px-4 py-3 text-sm font-bold"
                          style={{ color: "#090c56" }}
                        >
                          {appt.fees} ج.م
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="text-xs px-2 py-1 rounded-full font-bold"
                            style={{
                              background:
                                appt.statusColor === "#12b76a"
                                  ? "#e8f9f0"
                                  : appt.statusColor === "#ef003d"
                                    ? "#fff0f3"
                                    : "#eff0ff",
                              color: appt.statusColor,
                            }}
                          >
                            {appt.statusAr} ({appt.status})
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => navigate("appointment-details")}
                            className="text-xs px-2 py-1.5 rounded-lg font-semibold"
                            style={{
                              background: "#f9f9fb",
                              color: "#090c56",
                              border: "1px solid #e8e9f0",
                            }}
                          >
                            {appt.actions}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div
                  className="flex items-center justify-between px-4 py-3 text-xs"
                  style={{ color: "#696a76", borderTop: "1px solid #e8e9f0" }}
                >
                  <div className="flex gap-2">
                    {["التالي", "1", "السابق"].map((p) => (
                      <button
                        key={p}
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          border: "1px solid #e8e9f0",
                          color: p === "1" ? "#090c56" : "#696a76",
                          fontWeight: p === "1" ? 700 : 400,
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <span>
                    عرض 5 من أصل 6 مواعيد مسجلة • آخر تحديث لقاعدة البيانات:
                    اليوم 11:30 ص
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Emergency sidebar */}
        <aside
          className="w-44 flex-shrink-0 p-3"
          style={{ borderRight: "1px solid #e8e9f0" }}
        >
          <div className="sticky top-20">
            <div
              className="p-3 rounded-xl mb-3"
              style={{ background: "#fff0f3", border: "1px solid #ffd6e0" }}
            >
              <div
                className="text-xs font-bold mb-1"
                style={{ color: "#ef003d" }}
              >
                🚨 طوارئ مصر
              </div>
              <div className="text-xl font-black" style={{ color: "#090c56" }}>
                19011
              </div>
              <button
                className="mt-2 text-xs font-semibold"
                style={{ color: "#ef003d" }}
              >
                ← تسجيل الخروج
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
