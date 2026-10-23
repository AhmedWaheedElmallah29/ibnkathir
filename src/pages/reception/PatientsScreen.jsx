import { useEffect, useState } from "react"
import CenterShell from "@/components/CenterShell"
import Pagination, { pageItems } from "@/components/Pagination"
const emptyForm = {
  name: "",
  phone: "",
  birthDate: "",
  gender: "ذكر",
  address: "",
  chronicConditions: "",
  history: "",
}
export default function PatientsScreen({
  navigate,
  currentScreen,
  patients,
  addPatient,
  selectPatientForBooking,
}) {
  const [form, setForm] = useState(emptyForm)
  const [search, setSearch] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const [savedPatientId, setSavedPatientId] = useState()
  const matches = [...patients]
    .filter(
      (patient) =>
        patient.name.includes(search) || patient.phone.includes(search),
    )
    .sort((a, b) => b.id - a.id)
  useEffect(() => setPage(1), [search])
  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }
  function submit(event) {
    event.preventDefault()
    setMessage("")
    if (!form.name.trim() || !/^01\d{9}$/.test(form.phone) || !form.birthDate) {
      setError("يرجى إدخال الاسم وتاريخ الميلاد ورقم هاتف مصري صحيح")
      return
    }
    if (patients.some((patient) => patient.phone === form.phone)) {
      setError(
        "يوجد مريض مسجل بهذا الهاتف. افتح السجل الموجود بدلاً من إنشاء سجل مكرر.",
      )
      return
    }
    const id = addPatient(form)
    setSavedPatientId(id)
    setPage(1)
    setForm(emptyForm)
    setError("")
    setMessage("تم إنشاء سجل المريض بنجاح ويمكنك الآن إنشاء موعد له")
  }
  const inputClass =
    "mt-1.5 w-full rounded-xl border border-[#e8e9f0] bg-[#f9f9fb] px-3 py-2.5 text-sm outline-none focus:border-[#090c56]"
  return (
    <CenterShell
      role="reception"
      active={currentScreen}
      navigate={navigate}
      title="تسجيل وبحث المرضى"
    >
      <div className="grid gap-5 lg:grid-cols-5">
        <form
          onSubmit={submit}
          className="rounded-2xl border border-[#e8e9f0] bg-white p-5 lg:col-span-3"
        >
          <h2 className="mb-1 font-black text-[#090c56]">بيانات المريض</h2>
          <p className="mb-5 text-xs text-[#696a76]">
            جميع الحقول قابلة للتعديل وتحفظ في السجل الطبي
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-bold">
              اسم المريض الكامل
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="text-sm font-bold">
              رقم الهاتف
              <input
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={inputClass}
                dir="ltr"
                placeholder="01xxxxxxxxx"
              />
            </label>
            <label className="text-sm font-bold">
              تاريخ الميلاد
              <input
                type="date"
                value={form.birthDate}
                onChange={(e) => update("birthDate", e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="text-sm font-bold">
              النوع
              <select
                value={form.gender}
                onChange={(e) => update("gender", e.target.value)}
                className={inputClass}
              >
                <option>ذكر</option>
                <option>أنثى</option>
              </select>
            </label>
            <label className="text-sm font-bold sm:col-span-2">
              العنوان وبيانات التواصل
              <input
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="text-sm font-bold">
              الأمراض المزمنة
              <textarea
                value={form.chronicConditions}
                onChange={(e) => update("chronicConditions", e.target.value)}
                className={`${inputClass} min-h-24`}
              />
            </label>
            <label className="text-sm font-bold">
              التاريخ الطبي والمعلومات السابقة
              <textarea
                value={form.history}
                onChange={(e) => update("history", e.target.value)}
                className={`${inputClass} min-h-24`}
              />
            </label>
          </div>
          {error && (
            <p className="mt-4 rounded-xl bg-[#fff0f3] p-3 text-sm font-bold text-[#ef003d]">
              {error}
            </p>
          )}
          {message && (
            <div className="mt-4 flex flex-col gap-3 rounded-xl bg-[#e8f9f0] p-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-bold text-[#087a4b]">{message}</p>
              <button
                type="button"
                onClick={() => navigate("reception-booking")}
                className="rounded-lg bg-[#090c56] px-4 py-2 text-xs font-bold text-white"
              >
                متابعة إلى حجز موعد
              </button>
            </div>
          )}
          <button className="mt-5 rounded-xl bg-[#ef003d] px-7 py-3 text-sm font-bold text-white">
            حفظ سجل المريض
          </button>
        </form>

        <section className="rounded-2xl border border-[#e8e9f0] bg-white p-5 lg:col-span-2">
          <h2 className="font-black text-[#090c56]">السجلات الحالية</h2>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث بالاسم أو الهاتف"
            className={`${inputClass} mb-4`}
          />
          <div className="space-y-3">
            {pageItems(matches, page).map((patient) => (
              <article
                key={patient.id}
                className="rounded-xl border border-[#e8e9f0] p-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#090c56]">
                      {patient.name}
                    </h3>
                    <p className="text-xs text-[#696a76]">
                      ملف #{patient.id} · {patient.phone}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      selectPatientForBooking(patient.id)
                      navigate("reception-booking")
                    }}
                    className={`text-xs font-bold ${
                      patient.id === savedPatientId
                        ? "rounded-lg bg-[#ef003d] px-3 py-1.5 text-white"
                        : "text-[#ef003d]"
                    }`}
                  >
                    حجز
                  </button>
                </div>
                <p className="mt-2 text-xs text-[#696a76]">
                  {patient.chronicConditions || "لا توجد أمراض مزمنة مسجلة"}
                </p>
              </article>
            ))}
          </div>
          {!matches.length && (
            <p className="py-8 text-center text-xs text-[#9b9caa]">
              لا توجد سجلات مطابقة
            </p>
          )}
          <Pagination
            total={matches.length}
            page={page}
            onPageChange={setPage}
          />
        </section>
      </div>
    </CenterShell>
  )
}
