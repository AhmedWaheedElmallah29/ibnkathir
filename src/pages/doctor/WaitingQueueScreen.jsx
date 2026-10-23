import { useState } from "react"
import DoctorNavbar from "@/components/DoctorNavbar"
import DoctorSidebar from "@/components/DoctorSidebar"
const patients = [
  {
    num: 12,
    name: "عبدالله محمد بن صالح",
    age: 45,
    gender: "ذكر",
    code: "TK-89241-EG",
    time: "11:30 ص",
    type: "استشارة ومتابعة",
    status: "داخل الكشف",
    statusColor: "#090c56",
    statusBg: "#eff0ff",
    bp: "135/85",
    notes: "مرتفع",
  },
  {
    num: 13,
    name: "فاطمة الزهراء الشريبي",
    age: 61,
    gender: "أنثى",
    code: "TK-89242-EG",
    time: "11:50 ص",
    type: "فحص رسم قلب (ECG)",
    status: "في الانتظار (التالي)",
    statusColor: "#f79009",
    statusBg: "#fef3c7",
    bp: "150/95",
    notes: "مرتفع",
  },
  {
    num: 14,
    name: "محمود السيد الجمال",
    age: 52,
    gender: "ذكر",
    code: "TK-89243-EG",
    time: "12:10 م",
    type: "كشف",
    status: "في الانتظار",
    statusColor: "#f79009",
    statusBg: "#fef3c7",
    bp: "—",
    notes: "أول مرة",
  },
  {
    num: 15,
    name: "نيرة عادل القافي",
    age: 38,
    gender: "أنثى",
    code: "TK-89244-EG",
    time: "12:30 م",
    type: "استشارة ومتابعة",
    status: "في الانتظار",
    statusColor: "#f79009",
    statusBg: "#fef3c7",
    bp: "—",
    notes: "",
  },
  {
    num: 11,
    name: "حسام الدين عبد الباسط",
    age: 58,
    gender: "ذكر",
    code: "TK-89240-EG",
    time: "11:10 ص",
    type: "دورية",
    status: "مكتمل",
    statusColor: "#12b76a",
    statusBg: "#e8f9f0",
    bp: "120/80",
    notes: "",
  },
]
const commonMeds = [
  { name: "Concor 5mg (Bisoprolol)", desc: "قرص واحد صباحاً بعد الإفطار" },
  {
    name: "Aspocid 75mg (Acetylsalicylic)",
    desc: "قرص مضغ يومياً بعد وجبة الغداء يومياً",
  },
  { name: "Atorvastatin 20mg (Lipitor)", desc: "قرص واحد مساءً قبل النوم" },
]
export default function WaitingQueueScreen({ navigate, currentScreen }) {
  const [activeTab, setActiveTab] = useState("الكل (24)")
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
            <div className="flex items-center justify-between mb-5">
              <div className="flex gap-2">
                {[
                  "الكل (24)",
                  "في الانتظار (5)",
                  "داخل الكشف (1)",
                  "المكتملة (11)",
                ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
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
              <h1 className="text-xl font-black" style={{ color: "#090c56" }}>
                📋 طابور الانتظار وتدفق المرضى المباشر
              </h1>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Queue table */}
              <div
                className="col-span-2 rounded-2xl overflow-hidden"
                style={{ background: "#fff", border: "1px solid #e8e9f0" }}
              >
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
                    {patients.map((p) => (
                      <tr
                        key={p.code}
                        style={{ borderBottom: "1px solid #f0f0f5" }}
                      >
                        <td className="px-3 py-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                            style={{ background: "#090c56", color: "#fff" }}
                          >
                            #{p.num}
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
                            {p.age} سنة • {p.gender}
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
                          <div>{p.time}</div>
                          {p.bp !== "—" && (
                            <div
                              className="text-xs"
                              style={{
                                color:
                                  p.notes === "مرتفع" ? "#ef003d" : "#696a76",
                              }}
                            >
                              ضغط: {p.bp}
                            </div>
                          )}
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
                            style={
                              p.status === "داخل الكشف"
                                ? { background: "#090c56", color: "#fff" }
                                : p.status === "مكتمل"
                                  ? {
                                      background: "#f9f9fb",
                                      color: "#696a76",
                                      border: "1px solid #e8e9f0",
                                    }
                                  : { background: "#ef003d", color: "#fff" }
                            }
                          >
                            {p.status === "داخل الكشف"
                              ? "عرض السجل"
                              : p.status === "مكتمل"
                                ? "✓ مكتمل"
                                : "🔔 نداء"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div
                  className="flex items-center justify-between px-4 py-3 text-xs"
                  style={{ color: "#9b9caa", borderTop: "1px solid #e8e9f0" }}
                >
                  <div className="flex gap-2">
                    {["›", "1", "2", "3", "‹"].map((p, i) => (
                      <button
                        key={i}
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{
                          border: "1px solid #e8e9f0",
                          background: p === "1" ? "#090c56" : "#fff",
                          color: p === "1" ? "#fff" : "#696a76",
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <span>عرض 5 من إجمالي 24 مراجعاً اليوم</span>
                </div>
              </div>

              {/* Evening schedule + common meds */}
              <div className="space-y-4">
                <div
                  className="rounded-2xl p-4"
                  style={{ background: "#fff", border: "1px solid #e8e9f0" }}
                >
                  <h3 className="font-bold mb-3" style={{ color: "#090c56" }}>
                    📅 جدول المساء
                  </h3>
                  {[
                    {
                      time: "05:00 م",
                      label: "متاح للحجز",
                      patient: "أحمد فؤاد صادق (محجوز)",
                    },
                    { time: "05:30 م", label: "محجوز", patient: "عمر رضوان" },
                    { time: "06:00 م", label: "متاح للحجز", patient: "" },
                    { time: "06:30 م", label: "محجوز", patient: "سارة قيمي" },
                  ].map((slot) => (
                    <div
                      key={slot.time}
                      className="flex items-center justify-between py-2"
                      style={{ borderBottom: "1px solid #f0f0f5" }}
                    >
                      <span
                        className="text-xs font-bold"
                        style={{ color: "#090c56" }}
                      >
                        {slot.time}
                      </span>
                      <div className="text-xs text-left">
                        <div
                          style={{
                            color: slot.patient ? "#171827" : "#12b76a",
                          }}
                        >
                          {slot.patient || "متاح للحجز"}
                        </div>
                        {slot.patient && (
                          <div style={{ color: "#696a76" }}>(محجوز)</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="rounded-2xl p-4"
                  style={{ background: "#fff", border: "1px solid #e8e9f0" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <button
                      className="text-xs font-bold"
                      style={{ color: "#ef003d" }}
                    >
                      + إضافة سريعة
                    </button>
                    <h3 className="font-bold" style={{ color: "#090c56" }}>
                      💊 أدوية شائعة لمرضى القلب
                    </h3>
                  </div>
                  {commonMeds.map((med) => (
                    <div
                      key={med.name}
                      className="py-2.5"
                      style={{ borderBottom: "1px solid #f0f0f5" }}
                    >
                      <div
                        className="text-sm font-bold"
                        style={{ color: "#090c56" }}
                      >
                        {med.name}
                      </div>
                      <div className="text-xs" style={{ color: "#696a76" }}>
                        {med.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
