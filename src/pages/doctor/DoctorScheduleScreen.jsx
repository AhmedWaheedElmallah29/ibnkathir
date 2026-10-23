import { useState } from "react"
import DoctorNavbar from "@/components/DoctorNavbar"
import DoctorSidebar from "@/components/DoctorSidebar"
const weekDays = [
  {
    name: "السبت",
    date: "16/18",
    patients: 10,
    type: "كشوفات مسائية",
    color: "#090c56",
  },
  {
    name: "الأحد",
    date: "16/18",
    patients: 3,
    type: "مرضى (استشاري)",
    color: "#12b76a",
  },
  {
    name: "الاثنين",
    date: "14/18",
    patients: 18,
    type: "مريض الحالي (مشغول)",
    color: "#ef003d",
    current: true,
  },
  {
    name: "الثلاثاء",
    date: "15/18",
    patients: 5,
    type: "مرضى وأحداث...",
    color: "#12b76a",
  },
  {
    name: "الأربعاء",
    date: "12/18",
    patients: 6,
    type: "كشوفات متأخرة",
    color: "#090c56",
  },
  {
    name: "الخميس",
    date: "مفاق",
    type: "عمليات قسطرة وجراحة",
    color: "#696a76",
  },
  {
    name: "الجمعة",
    date: "عطلة",
    type: "إجازة أسبوعية رسمية للراحة والتقييم الذاتي",
    color: "#696a76",
  },
]
const stats = [
  {
    label: "أيام العمل الأسبوعية",
    value: "5 أيام",
    sub: "السبت إلى الأربعاء انتظاماً",
  },
  {
    label: "ساعات العمل اليومية",
    value: "6 ساعات",
    sub: "من 03:00 م حق 09:00 م",
  },
  { label: "معدل وقت الكشف", value: "20 دقيقة", sub: "لكل استشارة / رسم قلب" },
  {
    label: "الحد الأقصى للمرضى",
    value: "18 مريضاً",
    sub: "طاقة الاستيعاب اليومية للفترة",
  },
  { label: "نسبة الإشغال الأسبوعي", value: "88%", sub: "مكتمل تقريباً" },
]
export default function DoctorScheduleScreen({ navigate, currentScreen }) {
  const [week, setWeek] = useState(
    "الأسبوع الحالي (20 أكتوبر - 26 أكتوبر 2024)",
  )
  const [selectedDay, setSelectedDay] = useState("الاثنين")
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
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <button
                  className="px-4 py-2.5 rounded-xl text-sm font-bold"
                  style={{ background: "#090c56", color: "#fff" }}
                >
                  + إضافة فترة كشف جديدة
                </button>
                <button
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ border: "1px solid #e8e9f0", color: "#696a76" }}
                >
                  📅 تعديل الإجازات الاستثنائية
                </button>
              </div>
              <div>
                <h1 className="text-xl font-black" style={{ color: "#090c56" }}>
                  🗓 إدارة جدول مواعيد العيادة وساعات الكشف السريري
                </h1>
                <p className="text-xs mt-1" style={{ color: "#696a76" }}>
                  تخصيص أيام العمل الأسبوعية، فترات الراحة، وتوزيع الفترات
                  الزمنية المتاحة للحجز الإلكتروني واليدوي
                </p>
              </div>
            </div>

            {/* Week navigator */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex gap-3">
                {[
                  "عطلة / غطلية / عطلة",
                  "فترة متاحة للحجز",
                  "محجوز مؤكد",
                  "استراحة سريرية",
                ].map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center gap-1.5 text-xs"
                    style={{ color: "#696a76" }}
                  >
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{
                        background:
                          i === 0
                            ? "#e8e9f0"
                            : i === 1
                              ? "#e8f9f0"
                              : i === 2
                                ? "#090c56"
                                : "#ef003d",
                      }}
                    />
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 rounded-lg"
                  style={{ border: "1px solid #e8e9f0" }}
                >
                  ›
                </button>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#090c56" }}
                >
                  📅 {week}
                </span>
                <button
                  className="p-2 rounded-lg"
                  style={{ border: "1px solid #e8e9f0" }}
                >
                  ‹
                </button>
              </div>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-5 gap-3 mb-5">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-3"
                  style={{ background: "#fff", border: "1px solid #e8e9f0" }}
                >
                  <div
                    className="text-lg font-black"
                    style={{ color: "#090c56" }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-xs font-semibold"
                    style={{ color: "#696a76" }}
                  >
                    {s.label}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#9b9caa" }}>
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Weekly calendar grid */}
            <div
              className="rounded-2xl overflow-hidden mb-5"
              style={{ background: "#fff", border: "1px solid #e8e9f0" }}
            >
              <div
                className="p-4"
                style={{ borderBottom: "1px solid #e8e9f0" }}
              >
                <h2 className="font-bold" style={{ color: "#090c56" }}>
                  المخطط الأسبوعي للعيادة (20 - 26 أكتوبر 2024) 📅 عيادة القلب
                  التخصصية
                </h2>
              </div>
              <div className="grid grid-cols-7 gap-0 p-4">
                {weekDays.map((day) => (
                  <div
                    key={day.name}
                    onClick={() => setSelectedDay(day.name)}
                    className="border rounded-xl p-3 m-1 cursor-pointer transition-all"
                    style={{
                      borderColor:
                        selectedDay === day.name ? "#090c56" : "#e8e9f0",
                      background: day.current
                        ? "#fff0f3"
                        : selectedDay === day.name
                          ? "#eff0ff"
                          : "#fff",
                    }}
                  >
                    <div
                      className="font-bold text-sm mb-1"
                      style={{ color: day.current ? "#ef003d" : "#090c56" }}
                    >
                      {day.name}
                    </div>
                    {day.date && (
                      <div className="text-xs" style={{ color: "#9b9caa" }}>
                        {day.date}
                      </div>
                    )}
                    <div className="text-xs mt-2" style={{ color: day.color }}>
                      {day.patients && `${day.patients} مرضى`}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "#696a76", fontSize: 10 }}
                    >
                      {day.type}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Day details */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "#fff", border: "1px solid #e8e9f0" }}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#696a76" }}
                >
                  قيمة الكشف: 650 ج.م | عيادة القلب - غرفة 101
                </span>
                <h2 className="font-bold" style={{ color: "#090c56" }}>
                  📋 إعدادات فترات يوم {selectedDay} (عيادة القلب - غرفة 101)
                </h2>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: "الفترة الأولى: كشوفات عامة واستشارات قلبية",
                    from: "03:00 م",
                    to: "06:00 م",
                    slots: 9,
                    type: "حجز مسبق وعيادة",
                    color: "#090c56",
                  },
                  {
                    name: "فترة راحة الطبيب واستراحة طاقم التمريض",
                    from: "06:00 م",
                    to: "06:30 م",
                    slots: 0,
                    type: "راحة مستقطعة",
                    color: "#f79009",
                    isBreak: true,
                  },
                  {
                    name: "الفترة الثانية: مراجعات وفحوصات رسم قلب متقدمة",
                    from: "06:30 م",
                    to: "09:00 م",
                    slots: 8,
                    type: "إيكو + رسم قلب",
                    color: "#090c56",
                  },
                ].map((period) => (
                  <div
                    key={period.name}
                    className="p-4 rounded-xl"
                    style={{
                      background: period.isBreak ? "#fef3c7" : "#f9f9fb",
                      border: `1px solid ${
                        period.isBreak ? "#fde68a" : "#e8e9f0"
                      }`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        {!period.isBreak && (
                          <div
                            className="w-2 h-2 rounded-full inline-block mr-2 mb-0.5"
                            style={{ background: period.color }}
                          />
                        )}
                        <span
                          className="font-bold text-sm"
                          style={{ color: period.color }}
                        >
                          {period.isBreak ? "☕ " : ""}
                          {period.name}
                        </span>
                        {period.isBreak && (
                          <span
                            className="text-xs mr-2"
                            style={{ color: "#f79009" }}
                          >
                            30 دقيقة مستقطعة
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span style={{ color: "#696a76" }}>
                          وقت البدء:{" "}
                          <strong style={{ color: "#090c56" }}>
                            {period.from}
                          </strong>
                        </span>
                        <span style={{ color: "#696a76" }}>
                          وقت الانتهاء:{" "}
                          <strong style={{ color: "#090c56" }}>
                            {period.to}
                          </strong>
                        </span>
                        {!period.isBreak && (
                          <>
                            <span style={{ color: "#696a76" }}>
                              {period.slots} فترات (20 دقيقة لكل كشف)
                            </span>
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-semibold"
                              style={{
                                background: "#eff0ff",
                                color: "#090c56",
                              }}
                            >
                              نوع الحجز المسموح: {period.type}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  className="px-5 py-2.5 rounded-xl font-bold text-sm"
                  style={{ background: "#090c56", color: "#fff" }}
                >
                  حفظ التحديثات والتحديث الفوري
                </button>
                <button
                  className="px-5 py-2.5 rounded-xl font-semibold text-sm"
                  style={{ border: "1px solid #e8e9f0", color: "#696a76" }}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
