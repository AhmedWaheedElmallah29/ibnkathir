import { useState } from "react"
import PatientNavbar from "@/components/PatientNavbar"
import PatientSidebar from "@/components/PatientSidebar"
const records = [
  {
    date: "14 أكتوبر 2024",
    doctor: "د. مايكل تشن",
    type: "متابعة روتينية ومراجعة ضغط الدم",
    status: "مكتمل",
    tags: ["قلب", "ضغط الدم"],
  },
  {
    date: "02 سبتمبر 2024",
    doctor: "د. سارة المنصور",
    type: "استشارة اضطرابات الجهاز الهضمي والارتجاع",
    status: "مكتمل",
    tags: ["باطنة", "هضمي"],
  },
  {
    date: "15 أغسطس 2024",
    doctor: "د. نورة السليمان",
    type: "فحص دوري شامل - أطفال",
    status: "مكتمل",
    tags: ["أطفال", "دوري"],
  },
]
export default function MedicalRecordsScreen({ navigate, currentScreen }) {
  const [activeTab, setActiveTab] = useState("السجل السريري")
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
            <h1
              className="text-2xl font-black mb-2"
              style={{ color: "#090c56" }}
            >
              📋 السجلات الطبية
            </h1>
            <p className="text-sm mb-5" style={{ color: "#696a76" }}>
              أرشيف كامل لكشوفاتك وسجلاتك الطبية المعتمدة
            </p>

            {/* Tabs */}
            <div className="flex gap-2 mb-5">
              {[
                "السجل السريري",
                "الروشتات (3)",
                "نتائج التحاليل",
                "الفواتير والمدفوعات",
                "سجل الزيارات السابقة (8)",
              ].map((tab) => (
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
              ))}
            </div>

            <div className="space-y-3">
              {records.map((rec) => (
                <div
                  key={rec.date}
                  className="rounded-2xl p-5"
                  style={{ background: "#fff", border: "1px solid #e8e9f0" }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-sm font-bold"
                          style={{ color: "#090c56" }}
                        >
                          {rec.type}
                        </span>
                        {rec.tags.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{ background: "#eff0ff", color: "#090c56" }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm" style={{ color: "#696a76" }}>
                        {rec.doctor} • {rec.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs px-2 py-1 rounded-full font-bold"
                        style={{ background: "#e8f9f0", color: "#12b76a" }}
                      >
                        ✓ {rec.status}
                      </span>
                      <button
                        className="text-sm px-3 py-1.5 rounded-xl font-semibold"
                        style={{
                          border: "1px solid #e8e9f0",
                          color: "#090c56",
                        }}
                      >
                        📄 عرض التقرير
                      </button>
                      <button
                        className="text-sm px-3 py-1.5 rounded-xl font-semibold"
                        style={{ background: "#f9f9fb", color: "#696a76" }}
                      >
                        ⬇️ PDF
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Patient summary card */}
            <div
              className="rounded-2xl p-5 mt-5"
              style={{ background: "#fff", border: "1px solid #e8e9f0" }}
            >
              <h2 className="font-bold mb-4" style={{ color: "#090c56" }}>
                ملخص الملف الطبي - عبدالله محمد بن صالح
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "فصيلة الدم", value: "O+" },
                  { label: "ضغط الدم", value: "138/88 mmHg" },
                  { label: "نبضات القلب", value: "82 bpm" },
                  { label: "الوزن/الطول", value: "85 كج / 178 سم" },
                  { label: "السكر", value: "110 mg/dl" },
                  { label: "الأكسجين SpO2", value: "98%" },
                  { label: "الحساسية", value: "بنسلين" },
                  { label: "الأمراض المزمنة", value: "ضغط دم مزمن" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-3 rounded-xl"
                    style={{ background: "#f9f9fb" }}
                  >
                    <div
                      className="text-xs mb-0.5"
                      style={{ color: "#696a76" }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="text-sm font-bold"
                      style={{ color: "#171827" }}
                    >
                      {item.value}
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
