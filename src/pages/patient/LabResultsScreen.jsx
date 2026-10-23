import { useState } from "react"
import PatientNavbar from "@/components/PatientNavbar"
import PatientSidebar from "@/components/PatientSidebar"
const labs = [
  {
    name: "رسم قلب كهربائي 12-Lead (ECG)",
    date: "18 أكتوبر 2024",
    doctor: "د. فاطمة الشريف",
    status: "معتمدة",
    statusColor: "#12b76a",
    result: "تحليل الكشف الشرياني: منذ 20 دقيقة",
    urgent: false,
  },
  {
    name: "وظائف كبد وكلى كاملة (LFT/KFT)",
    date: "18 أكتوبر 2024",
    doctor: "طارق بدر",
    status: "معتمدة",
    statusColor: "#12b76a",
    result: "محمل • معامل فرع التجمع",
    urgent: false,
  },
  {
    name: "سكر تراكمي HbA1c (7.8%)",
    date: "18 أكتوبر 2024",
    doctor: "د. مايكل تشن",
    status: "تنبيه: أعلى من المعدل الطبيعي",
    statusColor: "#ef003d",
    result: "مراجعة فورية مطلوبة",
    urgent: true,
  },
  {
    name: "هولتر مراقبة القلب 24 ساعة",
    date: "اليوم - طلب جديد",
    doctor: "د. مايكل تشن",
    status: "بانتظار البدء",
    statusColor: "#f79009",
    result: "جهاز هولتر لمراقبة نبضات القلب 24 ساعة لتقييم توبات الخفقان بدقة",
    urgent: false,
  },
]
const vitals = [
  {
    label: "ضغط الدم",
    value: "138/88",
    unit: "mmHg",
    status: "مرتفع قليلاً",
    color: "#f79009",
  },
  {
    label: "نبضات القلب",
    value: "82",
    unit: "bpm",
    status: "طبيعي",
    color: "#12b76a",
  },
  {
    label: "الأكسجين",
    value: "98",
    unit: "%",
    status: "طبيعي",
    color: "#12b76a",
  },
  {
    label: "سكر الدم",
    value: "110",
    unit: "mg/dl",
    status: "طبيعي",
    color: "#12b76a",
  },
  {
    label: "مؤشر الكتلة",
    value: "26.4",
    unit: "BMI",
    status: "وزن زائد",
    color: "#f79009",
  },
  {
    label: "الحرارة",
    value: "36.8",
    unit: "°C",
    status: "طبيعي",
    color: "#12b76a",
  },
]
export default function LabResultsScreen({ navigate, currentScreen }) {
  const [activeTab, setActiveTab] = useState("الكل")
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
                🔬 نتائج التحاليل والفحوصات المخبرية
              </h1>
              <button
                className="text-sm font-bold px-4 py-2 rounded-xl flex items-center gap-2"
                style={{ background: "#ef003d", color: "#fff" }}
              >
                + طلب فحص جديد
              </button>
            </div>

            {/* Vitals */}
            <div
              className="rounded-2xl p-5 mb-5"
              style={{ background: "#fff", border: "1px solid #e8e9f0" }}
            >
              <h2 className="font-bold mb-3" style={{ color: "#090c56" }}>
                المؤشرات الحيوية المقاسة
              </h2>
              <div className="grid grid-cols-6 gap-3">
                {vitals.map((v) => (
                  <div
                    key={v.label}
                    className="p-3 rounded-xl text-center"
                    style={{ background: "#f9f9fb" }}
                  >
                    <div
                      className="text-lg font-black"
                      style={{ color: "#090c56" }}
                    >
                      {v.value}
                    </div>
                    <div className="text-xs" style={{ color: "#696a76" }}>
                      {v.unit}
                    </div>
                    <div
                      className="text-xs mt-1 font-semibold"
                      style={{ color: v.color }}
                    >
                      {v.status}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "#9b9caa" }}
                    >
                      {v.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 mb-4">
              {[
                "الكل",
                "قيد الانتظار (1)",
                "في الانتظار (5)",
                "داخل الكشف (1)",
                "المكتملة (11)",
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

            {/* Lab results */}
            <div className="space-y-3">
              {labs.map((lab) => (
                <div
                  key={lab.name}
                  className="rounded-2xl p-4"
                  style={{
                    background: "#fff",
                    border: `1px solid ${lab.urgent ? "#ffd6e0" : "#e8e9f0"}`,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {lab.urgent && (
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-bold"
                            style={{ background: "#fff0f3", color: "#ef003d" }}
                          >
                            ⚠️ عاجل
                          </span>
                        )}
                        <span
                          className="font-bold text-sm"
                          style={{ color: "#090c56" }}
                        >
                          {lab.name}
                        </span>
                      </div>
                      <p className="text-sm" style={{ color: "#696a76" }}>
                        {lab.result}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "#9b9caa" }}>
                        {lab.doctor} • {lab.date}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className="text-xs px-2 py-1 rounded-full font-bold"
                        style={{
                          background:
                            lab.statusColor === "#12b76a"
                              ? "#e8f9f0"
                              : lab.statusColor === "#ef003d"
                                ? "#fff0f3"
                                : "#fef3c7",
                          color: lab.statusColor,
                        }}
                      >
                        {lab.status}
                      </span>
                      <div className="flex gap-1">
                        <button
                          className="text-xs px-3 py-1.5 rounded-lg font-semibold"
                          style={{ background: "#090c56", color: "#fff" }}
                        >
                          عرض النتيجة
                        </button>
                        <button
                          className="text-xs px-3 py-1.5 rounded-lg font-semibold"
                          style={{
                            border: "1px solid #e8e9f0",
                            color: "#696a76",
                          }}
                        >
                          PDF ⬇️
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-xs" style={{ color: "#9b9caa" }}>
              إجمالي التحاليل بالأرشيف: 14 تقرير • فتح مجلد التحاليل الكامل →
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
