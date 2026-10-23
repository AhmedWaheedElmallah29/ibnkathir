import { useState } from "react"
import BookingSteps from "@/components/BookingSteps"
import PublicNavbar from "@/components/PublicNavbar"
const DAYS = [
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
]
const TIMES = [
  "09:00 ص",
  "09:30 ص",
  "10:00 ص",
  "10:30 ص",
  "11:00 ص",
  "11:30 ص",
  "12:00 م",
  "12:30 م",
  "03:00 م",
  "03:30 م",
  "04:00 م",
  "04:30 م",
  "05:00 م",
  "05:30 م",
]
const BOOKED = [2, 5, 8, 11]
const today = new Date(2024, 9, 20) // Oct 20 2024
function getMonthDays(year, month) {
  const days = []
  const firstDay = new Date(year, month, 1).getDay()
  for (let i = 0; i < firstDay; i++) days.push(null)
  const numDays = new Date(year, month + 1, 0).getDate()
  for (let d = 1; d <= numDays; d++) days.push(d)
  return days
}
const MONTHS_AR = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
]
export default function DateTimeScreen({ navigate, currentScreen }) {
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const days = getMonthDays(currentYear, currentMonth)
  const canContinue = selectedDay !== null && selectedTime !== null
  return (
    <div className="min-h-screen" style={{ background: "#f6f7f9" }} dir="rtl">
      <PublicNavbar navigate={navigate} currentScreen={currentScreen} />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <BookingSteps current={1} />

        {/* Doctor summary */}
        <div
          className="rounded-2xl p-4 mb-6 flex items-center gap-4"
          style={{ background: "#fff", border: "1px solid #e8e9f0" }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0"
            style={{ background: "#090c56", color: "#fff" }}
          >
            م
          </div>
          <div className="flex-1">
            <div className="font-bold" style={{ color: "#090c56" }}>
              د. مايكل تشن
            </div>
            <div className="text-sm" style={{ color: "#ef003d" }}>
              استشاري أمراض القلب والأوعية الدموية
            </div>
            <div className="text-xs mt-0.5" style={{ color: "#696a76" }}>
              عيادة التجمع الخامس • 350 جنيه
            </div>
          </div>
          <button
            onClick={() => navigate("doctors")}
            className="text-xs"
            style={{ color: "#ef003d" }}
          >
            تغيير الطبيب
          </button>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {/* Calendar */}
          <div
            className="col-span-3 rounded-2xl p-5"
            style={{ background: "#fff", border: "1px solid #e8e9f0" }}
          >
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => {
                  if (currentMonth === 0) {
                    setCurrentMonth(11)
                    setCurrentYear((y) => y - 1)
                  } else setCurrentMonth((m) => m - 1)
                }}
                style={{ color: "#696a76" }}
              >
                ›
              </button>
              <h2 className="font-bold" style={{ color: "#090c56" }}>
                {MONTHS_AR[currentMonth]} {currentYear}
              </h2>
              <button
                onClick={() => {
                  if (currentMonth === 11) {
                    setCurrentMonth(0)
                    setCurrentYear((y) => y + 1)
                  } else setCurrentMonth((m) => m + 1)
                }}
                style={{ color: "#696a76" }}
              >
                ‹
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map((d) => (
                <div
                  key={d}
                  className="text-center text-xs font-semibold py-1"
                  style={{ color: "#696a76" }}
                >
                  {d.slice(0, 2)}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, i) => (
                <button
                  key={i}
                  disabled={
                    !day ||
                    (currentMonth === today.getMonth() && day < today.getDate())
                  }
                  onClick={() => day && setSelectedDay(day)}
                  className="aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all"
                  style={
                    !day
                      ? { visibility: "hidden" }
                      : selectedDay === day
                        ? {
                            background: "#090c56",
                            color: "#fff",
                            fontWeight: 700,
                          }
                        : currentMonth === today.getMonth() &&
                            day < today.getDate()
                          ? { color: "#d1d1e0" }
                          : day === today.getDate() &&
                              currentMonth === today.getMonth()
                            ? {
                                border: "2px solid #ef003d",
                                color: "#ef003d",
                                fontWeight: 700,
                              }
                            : { color: "#171827" }
                  }
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Time slots */}
          <div
            className="col-span-2 rounded-2xl p-4"
            style={{ background: "#fff", border: "1px solid #e8e9f0" }}
          >
            <h2 className="font-bold mb-3 text-sm" style={{ color: "#090c56" }}>
              {selectedDay
                ? `الأوقات المتاحة - ${MONTHS_AR[currentMonth]} ${selectedDay}`
                : "اختر يوماً أولاً"}
            </h2>
            {selectedDay ? (
              <div
                className="space-y-1.5 overflow-y-auto"
                style={{ maxHeight: 320 }}
              >
                {TIMES.map((t, i) => {
                  const booked = BOOKED.includes(i)
                  return (
                    <button
                      key={t}
                      disabled={booked}
                      onClick={() => !booked && setSelectedTime(t)}
                      className="w-full py-2.5 rounded-xl text-sm font-medium text-right px-3 transition-all"
                      style={
                        booked
                          ? {
                              background: "#f9f9fb",
                              color: "#d1d1e0",
                              cursor: "not-allowed",
                            }
                          : selectedTime === t
                            ? { background: "#090c56", color: "#fff" }
                            : { border: "1px solid #e8e9f0", color: "#171827" }
                      }
                    >
                      {booked ? <span className="line-through">{t}</span> : t}
                      {booked && (
                        <span
                          className="text-xs mr-2"
                          style={{ color: "#d1d1e0" }}
                        >
                          محجوز
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12" style={{ color: "#d1d1e0" }}>
                <div style={{ fontSize: 36 }}>📅</div>
                <p className="text-sm mt-2">اختر تاريخ الزيارة</p>
              </div>
            )}
          </div>
        </div>

        {/* Selected summary */}
        {canContinue && (
          <div
            className="mt-4 p-4 rounded-2xl flex items-center justify-between"
            style={{ background: "#e8f9f0", border: "1px solid #a8e6c8" }}
          >
            <div className="text-sm font-bold" style={{ color: "#12b76a" }}>
              ✓ {MONTHS_AR[currentMonth]} {selectedDay}، {currentYear} - الساعة{" "}
              {selectedTime}
            </div>
            <span className="text-xs" style={{ color: "#12b76a" }}>
              الموعد محدد
            </span>
          </div>
        )}

        <div className="flex gap-3 mt-5">
          <button
            onClick={() => navigate("doctors")}
            className="flex-1 py-3.5 rounded-xl font-semibold text-sm"
            style={{ border: "1px solid #e8e9f0", color: "#696a76" }}
          >
            السابق
          </button>
          <button
            onClick={() => canContinue && navigate("booking-visit-type")}
            disabled={!canContinue}
            className="flex-2 px-8 py-3.5 rounded-xl font-bold text-sm"
            style={{
              background: canContinue ? "#ef003d" : "#e8e9f0",
              color: canContinue ? "#fff" : "#9b9caa",
              flex: 2,
            }}
          >
            التالي: نوع الزيارة ←
          </button>
        </div>
      </div>
    </div>
  )
}
