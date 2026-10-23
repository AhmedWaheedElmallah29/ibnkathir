import { useState } from "react"
import PatientNavbar from "@/components/PatientNavbar"
import PatientSidebar from "@/components/PatientSidebar"
const prescriptions = [
  {
    drug: "كونكور 5mg (Bisoprolol)",
    dose: "قرص واحد صباحاً على الريق قبل الإفطار لتنظيم ضغط الدم والتحطيم الشرياني",
    renewal: "صالح حتى 14 نوفمبر 2024",
    status: "نشط",
    statusColor: "#12b76a",
  },
  {
    drug: "أسبوسيد أطفال 75mg (Aspocid)",
    dose: "قرص مضغ يومياً بعد الإفطار للوقاية للقلب. الجرعة المدنية: 18 يوماً",
    renewal: "مستمر بالعلاج",
    status: "نشط",
    statusColor: "#12b76a",
  },
  {
    drug: "أتورفاستاتين 20mg (Atorvastatin)",
    dose: "قرص مساءً قبل النوم لتنظيم مستوى الكوليسترول والدهون بالدم. تاريخ البدء: 02 سبتمبر 2024",
    renewal: "مستمر بالعلاج",
    status: "نشط",
    statusColor: "#12b76a",
  },
]
export default function PrescriptionsScreen({ navigate, currentScreen }) {
  const [activeTab, setActiveTab] = useState("الروشتات النشطة")
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#f6f7f9" }}
      dir="rtl"
    >
      <PatientNavbar navigate={navigate} />
      <div className="flex flex-1">
        <PatientSidebar navigate={navigate} active={currentScreen} />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-2xl font-black" style={{ color: "#090c56" }}>
                💊 الروشتات والوصفات الطبية
              </h1>
              <span
                className="px-3 py-1 rounded-full text-sm font-bold"
                style={{ background: "#e8f9f0", color: "#12b76a" }}
              >
                3 أدوية نشطة
              </span>
            </div>

            <div className="flex gap-2 mb-5">
              {["الروشتات النشطة", "الروشتات السابقة", "تذكيرات الأدوية"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                    style={
                      activeTab === tab
                        ? { background: "#090c56", color: "#fff" }
                        : {
                            background: "#fff",
                            color: "#696a76",
                            border: "1px solid #e8e9f0",
                          }
                    }
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>

            <div
              className="rounded-2xl overflow-hidden mb-5"
              style={{ background: "#fff", border: "1px solid #e8e9f0" }}
            >
              <div className="p-4" style={{ background: "#e8f9f0" }}>
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm font-bold"
                    style={{ color: "#12b76a" }}
                  >
                    ✅ الروشتة الدوائية الفعالة - 3 أدوية • بتاريخ 24 أكتوبر
                    2024
                  </span>
                  <div className="flex gap-2">
                    <button
                      className="text-xs px-3 py-1.5 rounded-lg font-semibold"
                      style={{ background: "#090c56", color: "#fff" }}
                    >
                      🖨️ طباعة الروشتة
                    </button>
                    <button
                      className="text-xs px-3 py-1.5 rounded-lg font-semibold"
                      style={{ border: "1px solid #12b76a", color: "#12b76a" }}
                    >
                      ⬇️ PDF
                    </button>
                  </div>
                </div>
                <p className="text-xs mt-1" style={{ color: "#696a76" }}>
                  وصفة من: د. مايكل تشن • استشاري أمراض القلب والأوعية الدموية
                </p>
              </div>

              <div className="p-4 space-y-3">
                {prescriptions.map((rx, i) => (
                  <div
                    key={rx.drug}
                    className="p-4 rounded-xl"
                    style={{
                      background: "#f9f9fb",
                      border: "1px solid #e8e9f0",
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="font-bold text-sm"
                            style={{ color: "#090c56" }}
                          >
                            {i + 1}. {rx.drug}
                          </span>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-bold"
                            style={{
                              background: "#e8f9f0",
                              color: rx.statusColor,
                            }}
                          >
                            ● {rx.status}
                          </span>
                        </div>
                        <p className="text-sm" style={{ color: "#696a76" }}>
                          {rx.dose}
                        </p>
                        <p
                          className="text-xs mt-1 font-semibold"
                          style={{ color: "#f79009" }}
                        >
                          ⏰ {rx.renewal}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <button
                          className="text-xs px-3 py-1.5 rounded-lg font-semibold"
                          style={{ background: "#090c56", color: "#fff" }}
                        >
                          تجديد الروشتة
                        </button>
                        <button
                          className="text-xs px-3 py-1.5 rounded-lg font-semibold"
                          style={{
                            border: "1px solid #e8e9f0",
                            color: "#696a76",
                          }}
                        >
                          الإشعارات
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reminders */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "#fff0f3", border: "1px solid #ffd6e0" }}
            >
              <h2 className="font-bold mb-3" style={{ color: "#ef003d" }}>
                ⏰ تذكيرات الأدوية
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { time: "08:00 ص", drug: "كونكور 5mg", icon: "🌅" },
                  { time: "01:00 م", drug: "أسبوسيد 75mg", icon: "☀️" },
                  { time: "10:00 م", drug: "أتورفاستاتين 20mg", icon: "🌙" },
                ].map((reminder) => (
                  <div
                    key={reminder.drug}
                    className="p-3 rounded-xl bg-white flex items-center gap-2"
                  >
                    <span style={{ fontSize: 20 }}>{reminder.icon}</span>
                    <div>
                      <div
                        className="text-sm font-bold"
                        style={{ color: "#090c56" }}
                      >
                        {reminder.time}
                      </div>
                      <div className="text-xs" style={{ color: "#696a76" }}>
                        {reminder.drug}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
