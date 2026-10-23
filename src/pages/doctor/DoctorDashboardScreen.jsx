import DoctorNavbar from "@/components/DoctorNavbar"
import DoctorSidebar from "@/components/DoctorSidebar"
const todayPatients = [
  {
    name: "عبدالله محمد بن صالح",
    age: 45,
    code: "TK-89241-EG",
    time: "11:30 ص",
    type: "استشارة",
    status: "داخل الكشف",
    statusColor: "#090c56",
    statusBg: "#eff0ff",
  },
  {
    name: "فاطمة الزهراء الشريبي",
    age: 61,
    code: "TK-89242-EG",
    time: "11:50 ص",
    type: "رسم قلب (ECG)",
    status: "في الانتظار (التالي)",
    statusColor: "#f79009",
    statusBg: "#fef3c7",
  },
  {
    name: "محمود السيد الجمال",
    age: 52,
    code: "TK-89243-EG",
    time: "12:10 م",
    type: "كشف",
    status: "في الانتظار",
    statusColor: "#f79009",
    statusBg: "#fef3c7",
  },
]
export default function DoctorDashboardScreen({ navigate, currentScreen }) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#f6f7f9" }}
      dir="rtl"
    >
      <DoctorNavbar navigate={navigate} />
      <div className="flex flex-1">
        <DoctorSidebar navigate={navigate} active={currentScreen} />

        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-5xl mx-auto">
            {/* Welcome */}
            <div
              className="rounded-2xl p-5 mb-5 flex items-start justify-between"
              style={{ background: "#fff", border: "1px solid #e8e9f0" }}
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <button
                    className="px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
                    style={{ background: "#ef003d", color: "#fff" }}
                  >
                    نداء المريض التالي (Call Next) ›
                  </button>
                  <button
                    className="px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
                    style={{ background: "#090c56", color: "#fff" }}
                  >
                    + فتح ملف كشف عاجل
                  </button>
                </div>
                <h1
                  className="text-2xl font-black"
                  style={{ color: "#090c56" }}
                >
                  مرحباً، د. مايكل تشن 👋
                </h1>
                <p className="text-sm mt-1" style={{ color: "#12b76a" }}>
                  ● العيادة نشطة ومتاحة لاستقبال المرضى
                </p>
                <p className="text-sm mt-1" style={{ color: "#696a76" }}>
                  اليوم: الأربعاء، 24 أكتوبر 2024 (فرع التجمع الخامس) - غرفة 101
                </p>
              </div>
              <img
                src="https://ui-avatars.com/api/?name=Michael+Chen&background=090c56&color=fff&size=80"
                alt="د. مايكل تشن"
                className="w-20 h-20 rounded-2xl"
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-6 gap-3 mb-5">
              {[
                {
                  label: "إجمالي مواعيد اليوم",
                  value: 24,
                  icon: "📅",
                  color: "#090c56",
                },
                {
                  label: "في صالة الانتظار",
                  value: 5,
                  icon: "⏳",
                  color: "#f79009",
                },
                {
                  label: "الكشوفات المكتملة",
                  value: 11,
                  icon: "✅",
                  color: "#12b76a",
                },
                {
                  label: "المواعيد القادمة",
                  value: 8,
                  icon: "📋",
                  color: "#0ea5e9",
                },
                {
                  label: "الدخل المحصل اليوم",
                  value: "8,400",
                  unit: "ج.م",
                  icon: "💰",
                  color: "#090c56",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="col-span-1 rounded-2xl p-3 text-center"
                  style={{ background: "#fff", border: "1px solid #e8e9f0" }}
                >
                  <div style={{ fontSize: 20 }}>{stat.icon}</div>
                  <div
                    className="text-xl font-black mt-1"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                    {stat.unit || ""}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#696a76" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
              <div
                className="rounded-2xl p-3"
                style={{ background: "#090c56" }}
              >
                <div
                  className="text-xs font-semibold mb-1"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  متوسط الانتظار
                </div>
                <div className="text-xl font-black text-white">12 دقيقة</div>
              </div>
            </div>

            {/* Current patient */}
            <div
              className="rounded-2xl p-5 mb-5"
              style={{ background: "#fff", border: "2px solid #090c56" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs px-2 py-1 rounded-full font-bold animate-pulse"
                    style={{ background: "#ef003d", color: "#fff" }}
                  >
                    ● 14 دقيقة منقضية
                  </span>
                  <span
                    className="font-semibold text-sm"
                    style={{ color: "#696a76" }}
                  >
                    المريض الحالي داخل غرفة الكشف
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black"
                  style={{ background: "#090c56", color: "#fff" }}
                >
                  ع
                </div>
                <div className="flex-1">
                  <h2
                    className="text-xl font-black"
                    style={{ color: "#090c56" }}
                  >
                    عبدالله محمد بن صالح
                  </h2>
                  <p className="text-sm" style={{ color: "#696a76" }}>
                    ملف طبي رقم: #MED-94021 • السن: 45 سنة • البهوية الوطنية:
                    2780912100412
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate("patient-record")}
                    className="px-4 py-2.5 rounded-xl text-sm font-bold"
                    style={{ background: "#ef003d", color: "#fff" }}
                  >
                    📋 إنهاء الكشف وإصدار الروشتة
                  </button>
                  <button
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold"
                    style={{ border: "1px solid #e8e9f0", color: "#696a76" }}
                  >
                    🔬 طلب تحاليل وأشعة
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 mt-4">
                {[
                  { label: "ضغط الدم", value: "135/85 mmHg" },
                  { label: "نبضات القلب", value: "78 bpm" },
                  { label: "سكر الدم العشوائي", value: "110 mg/dl" },
                  { label: "نسبة الأكسجين SpO2", value: "98% طبيعي" },
                ].map((v) => (
                  <div
                    key={v.label}
                    className="p-3 rounded-xl"
                    style={{ background: "#f9f9fb" }}
                  >
                    <div className="text-xs" style={{ color: "#696a76" }}>
                      {v.label}
                    </div>
                    <div
                      className="text-sm font-bold mt-0.5"
                      style={{ color: "#090c56" }}
                    >
                      {v.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's queue */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: "#fff", border: "1px solid #e8e9f0" }}
            >
              <div
                className="p-4"
                style={{ borderBottom: "1px solid #e8e9f0" }}
              >
                <h2 className="font-bold" style={{ color: "#090c56" }}>
                  📋 طابور الانتظار وتدفق المرضى المباشر
                </h2>
              </div>
              <div
                className="flex gap-2 p-3"
                style={{ borderBottom: "1px solid #f0f0f5" }}
              >
                {[
                  "الكل (24)",
                  "في الانتظار (5)",
                  "داخل الكشف (1)",
                  "المكتملة (11)",
                ].map((tab, i) => (
                  <button
                    key={tab}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style={
                      i === 0
                        ? { background: "#090c56", color: "#fff" }
                        : { border: "1px solid #e8e9f0", color: "#696a76" }
                    }
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <table className="w-full">
                <thead>
                  <tr style={{ background: "#f9f9fb" }}>
                    {[
                      "الدور #",
                      "اسم المريض والسن",
                      "كود الحجز",
                      "الموعد المحدد",
                      "نوع الزيارة",
                      "الحالة",
                      "فحص المريض",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-right px-3 py-2.5 text-xs font-semibold"
                        style={{ color: "#696a76" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {todayPatients.map((p, i) => (
                    <tr
                      key={p.code}
                      style={{ borderBottom: "1px solid #f0f0f5" }}
                    >
                      <td className="px-3 py-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                          style={{ background: "#090c56", color: "#fff" }}
                        >
                          #{i + 12}
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div
                          className="font-bold text-sm"
                          style={{ color: "#090c56" }}
                        >
                          {p.name}
                        </div>
                        <div className="text-xs" style={{ color: "#696a76" }}>
                          {p.age} سنة • ذكر
                        </div>
                      </td>
                      <td
                        className="px-3 py-3 text-xs font-mono"
                        style={{ color: "#696a76" }}
                      >
                        {p.code}
                      </td>
                      <td
                        className="px-3 py-3 text-sm"
                        style={{ color: "#171827" }}
                      >
                        {p.time}
                      </td>
                      <td
                        className="px-3 py-3 text-xs"
                        style={{ color: "#696a76" }}
                      >
                        {p.type}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className="text-xs px-2 py-1 rounded-full font-bold"
                          style={{
                            background: p.statusBg,
                            color: p.statusColor,
                          }}
                        >
                          ● {p.status}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <button
                          onClick={() => navigate("patient-record")}
                          className="text-xs px-3 py-1.5 rounded-lg font-bold"
                          style={{
                            background: i === 0 ? "#090c56" : "#f9f9fb",
                            color: i === 0 ? "#fff" : "#696a76",
                            border: i === 0 ? "none" : "1px solid #e8e9f0",
                          }}
                        >
                          {i === 0 ? "داخل الكشف ●" : "🔔 نداء"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                className="p-3 text-xs text-center"
                style={{ color: "#9b9caa" }}
              >
                عرض 5 من إجمالي 24 مراجعاً اليوم
              </div>
            </div>
          </div>
        </main>

        {/* Right mini panel */}
        <aside
          className="w-36 flex-shrink-0 p-3"
          style={{ borderRight: "1px solid #e8e9f0" }}
        >
          <div className="sticky top-20 space-y-3">
            <div
              className="p-3 rounded-xl"
              style={{ background: "#fff0f3", border: "1px solid #ffd6e0" }}
            >
              <div className="text-xs font-bold" style={{ color: "#ef003d" }}>
                🚨 طوارئ
              </div>
              <div className="text-xl font-black" style={{ color: "#090c56" }}>
                19011
              </div>
            </div>
            <div className="p-3 rounded-xl" style={{ background: "#fff" }}>
              <div className="text-xs" style={{ color: "#696a76" }}>
                دعم الأنظمة
              </div>
              <div className="text-sm font-bold" style={{ color: "#090c56" }}>
                02-3344-9988
              </div>
            </div>
            <button
              className="w-full text-xs font-semibold py-2 rounded-lg"
              style={{ color: "#ef003d" }}
            >
              ← تسجيل الخروج
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
