import { useEffect, useMemo, useState } from "react"
import CenterShell from "@/components/CenterShell"
import Pagination, { pageItems } from "@/components/Pagination"
export default function ReceptionDashboardScreen({
  navigate,
  currentScreen,
  patients,
  doctors,
  appointments,
}) {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const filtered = useMemo(() => {
    const query = search.trim()
    if (!query) return patients
    return patients.filter(
      (patient) =>
        patient.name.includes(query) || patient.phone.includes(query),
    )
  }, [patients, search])
  useEffect(() => setPage(1), [search])
  const cards = [
    { label: "حجوزات اليوم", value: appointments.length, color: "#090c56" },
    {
      label: "في الانتظار",
      value: appointments.filter((item) => item.status === "في الانتظار")
        .length,
      color: "#f79009",
    },
    { label: "المرضى المسجلون", value: patients.length, color: "#0ea5e9" },
    { label: "الأطباء المتاحون", value: doctors.length, color: "#12b76a" },
  ]
  return (
    <CenterShell
      role="reception"
      active={currentScreen}
      navigate={navigate}
      title="لوحة الاستقبال"
    >
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-[#e8e9f0] bg-white p-4"
          >
            <p className="text-sm text-[#696a76]">{card.label}</p>
            <p
              className="mt-2 text-3xl font-black"
              style={{ color: card.color }}
            >
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <button
          onClick={() => navigate("reception-patients")}
          className="rounded-2xl bg-[#090c56] p-5 text-right text-white"
        >
          <span className="text-xs opacity-70">إجراء سريع</span>
          <strong className="mt-1 block text-lg">تسجيل مريض جديد</strong>
          <span className="mt-2 block text-xs opacity-80">
            إضافة البيانات الطبية وبيانات التواصل
          </span>
        </button>
        <button
          onClick={() => navigate("reception-booking")}
          className="rounded-2xl bg-[#ef003d] p-5 text-right text-white"
        >
          <span className="text-xs opacity-70">إجراء سريع</span>
          <strong className="mt-1 block text-lg">إنشاء حجز</strong>
          <span className="mt-2 block text-xs opacity-80">
            اختيار التخصص والطبيب والموعد
          </span>
        </button>
        <div className="rounded-2xl border border-[#e8e9f0] bg-white p-5">
          <span className="text-xs text-[#696a76]">رقم الدور الحالي</span>
          <strong className="mt-1 block text-3xl text-[#090c56]">#02</strong>
          <span className="mt-2 block text-xs text-[#12b76a]">
            قائمة الانتظار محدثة
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-[#e8e9f0] bg-white">
        <div className="flex flex-col gap-3 border-b border-[#e8e9f0] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-black text-[#090c56]">البحث عن مريض مسجل</h2>
            <p className="text-xs text-[#696a76]">
              ابحث قبل إنشاء سجل جديد لتجنب التكرار
            </p>
          </div>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="الاسم أو رقم الهاتف"
            className="rounded-xl border border-[#e8e9f0] bg-[#f9f9fb] px-4 py-2.5 text-sm outline-none focus:border-[#090c56]"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-sm">
            <thead className="bg-[#f9f9fb] text-[#696a76]">
              <tr>
                {[
                  "رقم الملف",
                  "اسم المريض",
                  "الهاتف",
                  "التاريخ الطبي",
                  "الإجراء",
                ].map((item) => (
                  <th
                    key={item}
                    className="px-4 py-3 text-right text-xs font-bold"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageItems(filtered, page).map((patient) => (
                <tr key={patient.id} className="border-t border-[#f0f0f5]">
                  <td className="px-4 py-3 font-bold text-[#090c56]">
                    #{patient.id}
                  </td>
                  <td className="px-4 py-3 font-bold">{patient.name}</td>
                  <td className="px-4 py-3 text-[#696a76]" dir="ltr">
                    {patient.phone}
                  </td>
                  <td className="max-w-52 truncate px-4 py-3 text-[#696a76]">
                    {patient.chronicConditions}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => navigate("reception-booking")}
                      className="rounded-lg bg-[#eff0ff] px-3 py-1.5 text-xs font-bold text-[#090c56]"
                    >
                      فتح وحجز
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filtered.length && (
            <p className="p-8 text-center text-sm text-[#9b9caa]">
              لا توجد نتائج مطابقة
            </p>
          )}
          <Pagination
            total={filtered.length}
            page={page}
            onPageChange={setPage}
          />
        </div>
      </div>
    </CenterShell>
  )
}
