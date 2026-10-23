import { useEffect, useMemo, useState } from "react"
import CenterShell from "@/components/CenterShell"
import Pagination, { pageItems } from "@/components/Pagination"
import { filterAppointmentsByPeriod, specialties } from "@/data/medicalCenter"
const periodButtons = [
  { label: "اليوم", value: "day" },
  { label: "هذا الأسبوع", value: "week" },
  { label: "هذا الشهر", value: "month" },
]
function PeriodControl({ value, onChange }) {
  return (
    <div className="flex gap-2">
      {periodButtons.map((item) => (
        <button
          key={item.value}
          onClick={() => onChange(item.value)}
          className={`rounded-xl px-4 py-2 text-xs font-bold ${
            value === item.value
              ? "bg-[#090c56] text-white"
              : "border border-[#e8e9f0] bg-white text-[#696a76]"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
export function AdminDashboardScreen(props) {
  const [period, setPeriod] = useState("day")
  const [specialtyPage, setSpecialtyPage] = useState(1)
  const filtered = filterAppointmentsByPeriod(props.appointments, period)
  const revenue = filtered.reduce((sum, item) => sum + item.amount, 0)
  const visitCounts = (type) =>
    filtered.filter((item) => item.visitType === type).length
  const doctorShare = filtered.reduce(
    (sum, item) =>
      sum +
      item.amount *
        ((props.doctors.find((doctor) => doctor.id === item.doctorId)?.share ||
          0) /
          100),
    0,
  )
  const patientCount = new Set(filtered.map((item) => item.patientId)).size
  return (
    <CenterShell
      role="admin"
      active={props.currentScreen}
      navigate={props.navigate}
      title="نظرة عامة على المركز"
    >
      <div className="mb-5">
        <PeriodControl value={period} onChange={setPeriod} />
      </div>
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ["إجمالي الأطباء", props.doctors.length],
          [
            "التخصصات",
            new Set(props.doctors.map((doctor) => doctor.specialty)).size,
          ],
          ["مرضى الفترة", patientCount],
          ["مواعيد الفترة", filtered.length],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-[#e8e9f0] bg-white p-4"
          >
            <p className="text-sm text-[#696a76]">{label}</p>
            <strong className="mt-2 block text-3xl text-[#090c56]">
              {value}
            </strong>
          </div>
        ))}
      </div>
      <div className="mb-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl bg-[#090c56] p-5 text-white">
          <p className="text-xs text-white/65">إجمالي الإيرادات</p>
          <strong className="mt-2 block text-3xl">
            {revenue.toLocaleString("ar-EG")} ج.م
          </strong>
        </div>
        <div className="rounded-2xl border border-[#e8e9f0] bg-white p-5">
          <p className="text-xs text-[#696a76]">نصيب الأطباء</p>
          <strong className="mt-2 block text-2xl text-[#ef003d]">
            {doctorShare.toLocaleString("ar-EG")} ج.م
          </strong>
        </div>
        <div className="rounded-2xl border border-[#e8e9f0] bg-white p-5">
          <p className="text-xs text-[#696a76]">نصيب المركز</p>
          <strong className="mt-2 block text-2xl text-[#087a4b]">
            {(revenue - doctorShare).toLocaleString("ar-EG")} ج.م
          </strong>
        </div>
      </div>
      {!filtered.length ? (
        <div className="rounded-2xl border border-[#e8e9f0] bg-white p-12 text-center text-sm text-[#9b9caa]">
          لا توجد مواعيد في هذه الفترة
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          <section className="rounded-2xl border border-[#e8e9f0] bg-white p-5">
            <h2 className="font-black text-[#090c56]">أنواع الزيارات</h2>
            {["كشف أول مرة", "متابعة", "استشارة"].map((type) => {
              const count = visitCounts(type)
              return (
                <div key={type} className="mt-4">
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{type}</span>
                    <strong>{count}</strong>
                  </div>
                  <div className="h-2 rounded-full bg-[#f0f0f5]">
                    <div
                      className="h-2 rounded-full bg-[#ef003d]"
                      style={{ width: `${(count / filtered.length) * 100}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </section>
          <section className="overflow-hidden rounded-2xl border border-[#e8e9f0] bg-white p-5">
            <h2 className="font-black text-[#090c56]">المرضى حسب التخصص</h2>
            {pageItems(specialties, specialtyPage).map((specialty) => (
              <div
                key={specialty}
                className="flex items-center justify-between border-b border-[#f0f0f5] py-2.5 text-sm"
              >
                <span>{specialty}</span>
                <strong className="text-[#090c56]">
                  {
                    filtered.filter((item) => item.specialty === specialty)
                      .length
                  }{" "}
                  مريض
                </strong>
              </div>
            ))}
            <Pagination
              total={specialties.length}
              page={specialtyPage}
              onPageChange={setSpecialtyPage}
            />
          </section>
        </div>
      )}
    </CenterShell>
  )
}
export function AdminDoctorsScreen(props) {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const visible = useMemo(
    () =>
      props.doctors.filter(
        (item) => item.name.includes(search) || item.specialty.includes(search),
      ),
    [props.doctors, search],
  )
  useEffect(() => setPage(1), [search])
  return (
    <CenterShell
      role="admin"
      active={props.currentScreen}
      navigate={props.navigate}
      title="الأطباء والتخصصات والجداول"
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="بحث باسم الطبيب أو التخصص"
        className="mb-4 w-full max-w-md rounded-xl border border-[#e8e9f0] bg-white px-4 py-3 text-sm outline-none"
      />
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {pageItems(visible, page).map((doctor) => (
          <article
            key={doctor.id}
            className="rounded-2xl border border-[#e8e9f0] bg-white p-4"
          >
            <div className="flex justify-between">
              <div>
                <strong className="text-sm text-[#090c56]">
                  {doctor.name}
                </strong>
                <p className="text-xs font-bold text-[#ef003d]">
                  {doctor.specialty}
                </p>
              </div>
              <span className="rounded-lg bg-[#eff0ff] px-2 py-1 text-xs font-bold text-[#090c56]">
                {
                  props.appointments.filter(
                    (item) => item.doctorId === doctor.id,
                  ).length
                }{" "}
                مرضى
              </span>
            </div>
            <p className="mt-3 text-xs text-[#696a76]">
              {doctor.workingDays.join(" · ")}
            </p>
            <p className="mt-1 text-xs text-[#696a76]">
              {doctor.hours} · {doctor.clinic}
            </p>
            <p className="mt-3 text-xs font-bold text-[#ef003d]">
              {doctor.share}% نسبة الطبيب
            </p>
          </article>
        ))}
      </div>
      {!visible.length && (
        <div className="rounded-2xl border border-[#e8e9f0] bg-white p-10 text-center text-sm text-[#9b9caa]">
          لا يوجد أطباء مطابقون
        </div>
      )}
      <Pagination total={visible.length} page={page} onPageChange={setPage} />
    </CenterShell>
  )
}
export function AdminFinanceScreen(props) {
  const [period, setPeriod] = useState("day")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const filteredAppointments = filterAppointmentsByPeriod(
    props.appointments,
    period,
  )
  const visibleDoctors = props.doctors.filter((doctor) =>
    doctor.name.includes(search),
  )
  useEffect(() => setPage(1), [period, search])
  return (
    <CenterShell
      role="admin"
      active={props.currentScreen}
      navigate={props.navigate}
      title="لوحة الإدارة المالية"
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PeriodControl value={period} onChange={setPeriod} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="بحث عن طبيب"
          className="rounded-xl border border-[#e8e9f0] bg-white px-4 py-2 text-sm outline-none"
        />
      </div>
      <div className="overflow-x-auto rounded-2xl border border-[#e8e9f0] bg-white">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-[#f9f9fb] text-[#696a76]">
            <tr>
              {[
                "الطبيب",
                "التخصص",
                "عدد المرضى",
                "إجمالي التحصيل",
                "نسبة الطبيب",
                "مستحق الطبيب",
                "نصيب المركز",
              ].map((item) => (
                <th key={item} className="px-4 py-3 text-right text-xs">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageItems(visibleDoctors, page).map((doctor) => {
              const related = filteredAppointments.filter(
                (item) => item.doctorId === doctor.id,
              )
              const total = related.reduce((sum, item) => sum + item.amount, 0)
              const doctorAmount = (total * doctor.share) / 100
              return (
                <tr key={doctor.id} className="border-t border-[#f0f0f5]">
                  <td className="px-4 py-3 font-bold text-[#090c56]">
                    {doctor.name}
                  </td>
                  <td className="px-4 py-3">{doctor.specialty}</td>
                  <td className="px-4 py-3">{related.length}</td>
                  <td className="px-4 py-3 font-bold">{total} ج.م</td>
                  <td className="px-4 py-3">{doctor.share}%</td>
                  <td className="px-4 py-3 text-[#ef003d]">
                    {doctorAmount} ج.م
                  </td>
                  <td className="px-4 py-3 text-[#087a4b]">
                    {total - doctorAmount} ج.م
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Pagination
          total={visibleDoctors.length}
          page={page}
          onPageChange={setPage}
        />
      </div>
      <p className="mt-3 text-xs text-[#696a76]">
        الحسابات مرتبطة بالمواعيد الفعلية في الفترة المحددة وتستخدم نسبة كل طبيب
        القابلة للتهيئة.
      </p>
    </CenterShell>
  )
}
const days = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس"]
const emptyDoctor = {
  name: "",
  specialty: specialties[0],
  fee: 300,
  share: 60,
  workingDays: ["الأحد"],
  hours: "09:00 ص - 03:00 م",
  clinic: "",
  availableDates: [],
  unavailableSlots: [],
}
export function DoctorManagementScreen(props) {
  const [form, setForm] = useState(emptyDoctor)
  const [editingId, setEditingId] = useState()
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const visible = props.doctors.filter(
    (doctor) =>
      doctor.name.includes(search) || doctor.specialty.includes(search),
  )
  useEffect(() => setPage(1), [search])
  function edit(doctor) {
    setEditingId(doctor.id)
    setForm({
      name: doctor.name,
      specialty: doctor.specialty,
      fee: doctor.fee,
      share: doctor.share,
      workingDays: [...doctor.workingDays],
      hours: doctor.hours,
      clinic: doctor.clinic,
      availableDates: [...doctor.availableDates],
      unavailableSlots: [...doctor.unavailableSlots],
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  function submit(event) {
    event.preventDefault()
    if (!form.name.trim() || !form.clinic.trim() || !form.workingDays.length)
      return
    if (editingId) props.updateDoctor(editingId, form)
    else props.addDoctor(form)
    setEditingId(undefined)
    setForm(emptyDoctor)
  }
  function remove(doctor) {
    if (props.appointments.some((item) => item.doctorId === doctor.id)) {
      window.alert(
        "لا يمكن حذف طبيب لديه مواعيد تاريخية. يمكن تعديل جدوله أو إيقاف توافره بدلاً من ذلك.",
      )
      return
    }
    if (
      window.confirm(
        `هل تريد حذف ${doctor.name}؟ لا يمكن التراجع عن هذا الإجراء.`,
      )
    )
      props.deleteDoctor(doctor.id)
    setPage(1)
  }
  const input =
    "mt-1 w-full rounded-xl border border-[#e8e9f0] bg-[#f9f9fb] px-3 py-2.5 text-sm outline-none focus:border-[#090c56]"
  return (
    <CenterShell
      role="admin"
      active={props.currentScreen}
      navigate={props.navigate}
      title="إدارة الأطباء والجداول والتوافر"
    >
      <form
        onSubmit={submit}
        className="mb-5 rounded-2xl border border-[#e8e9f0] bg-white p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-black text-[#090c56]">
              {editingId ? "تعديل بيانات الطبيب" : "إضافة طبيب جديد"}
            </h2>
            <p className="text-xs text-[#696a76]">
              تنعكس التعديلات فوراً في الاستقبال وبوابة الطبيب
            </p>
          </div>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(undefined)
                setForm(emptyDoctor)
              }}
              className="text-xs font-bold text-[#ef003d]"
            >
              إلغاء التعديل
            </button>
          )}
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <label className="text-xs font-bold">
            اسم الطبيب
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={input}
            />
          </label>
          <label className="text-xs font-bold">
            التخصص
            <select
              value={form.specialty}
              onChange={(e) => setForm({ ...form, specialty: e.target.value })}
              className={input}
            >
              {specialties.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="text-xs font-bold">
            العيادة / الغرفة
            <input
              required
              value={form.clinic}
              onChange={(e) => setForm({ ...form, clinic: e.target.value })}
              className={input}
              placeholder="عيادة القلب - غرفة 101"
            />
          </label>
          <label className="text-xs font-bold">
            ساعات العمل
            <input
              value={form.hours}
              onChange={(e) => setForm({ ...form, hours: e.target.value })}
              className={input}
            />
          </label>
          <label className="text-xs font-bold">
            سعر الكشف
            <input
              type="number"
              min="0"
              value={form.fee}
              onChange={(e) =>
                setForm({ ...form, fee: Number(e.target.value) })
              }
              className={input}
            />
          </label>
          <label className="text-xs font-bold">
            نسبة الطبيب %
            <input
              type="number"
              min="0"
              max="100"
              value={form.share}
              onChange={(e) =>
                setForm({ ...form, share: Number(e.target.value) })
              }
              className={input}
            />
          </label>
          <label className="text-xs font-bold md:col-span-2">
            تواريخ متاحة محددة (اختياري)
            <input
              value={form.availableDates.join(", ")}
              onChange={(e) =>
                setForm({
                  ...form,
                  availableDates: e.target.value
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
                })
              }
              className={input}
              placeholder="2026-10-18, 2026-10-22"
            />
          </label>
          <label className="text-xs font-bold">
            أوقات غير متاحة (اختياري)
            <input
              value={form.unavailableSlots.join(", ")}
              onChange={(e) =>
                setForm({
                  ...form,
                  unavailableSlots: e.target.value
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
                })
              }
              className={input}
              placeholder="2026-10-18|10:00 ص"
            />
          </label>
        </div>
        <fieldset className="mt-4">
          <legend className="mb-2 text-xs font-bold">أيام العمل</legend>
          <div className="flex flex-wrap gap-2">
            {days.map((day) => (
              <label
                key={day}
                className={`cursor-pointer rounded-lg border px-3 py-2 text-xs font-bold ${
                  form.workingDays.includes(day)
                    ? "border-[#090c56] bg-[#eff0ff] text-[#090c56]"
                    : "border-[#e8e9f0] text-[#696a76]"
                }`}
              >
                <input
                  type="checkbox"
                  className="ml-2"
                  checked={form.workingDays.includes(day)}
                  onChange={() =>
                    setForm({
                      ...form,
                      workingDays: form.workingDays.includes(day)
                        ? form.workingDays.filter((item) => item !== day)
                        : [...form.workingDays, day],
                    })
                  }
                />
                {day}
              </label>
            ))}
          </div>
        </fieldset>
        <button className="mt-5 rounded-xl bg-[#ef003d] px-6 py-3 text-sm font-bold text-white">
          {editingId ? "حفظ التعديلات" : "إضافة الطبيب"}
        </button>
      </form>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-black text-[#090c56]">الأطباء المسجلون</h2>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="بحث عن طبيب"
          className="rounded-xl border border-[#e8e9f0] bg-white px-4 py-2 text-sm outline-none"
        />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {pageItems(visible, page).map((doctor) => (
          <article
            key={doctor.id}
            className="rounded-2xl border border-[#e8e9f0] bg-white p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <strong className="text-[#090c56]">{doctor.name}</strong>
                <p className="text-xs font-bold text-[#ef003d]">
                  {doctor.specialty}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => edit(doctor)}
                  className="rounded-lg bg-[#eff0ff] px-3 py-1.5 text-xs font-bold text-[#090c56]"
                >
                  تعديل
                </button>
                <button
                  onClick={() => remove(doctor)}
                  className="rounded-lg bg-[#fff0f3] px-3 py-1.5 text-xs font-bold text-[#ef003d]"
                >
                  حذف
                </button>
              </div>
            </div>
            <p className="mt-3 text-xs text-[#696a76]">
              {doctor.clinic} · {doctor.hours}
            </p>
            <p className="mt-1 text-xs text-[#696a76]">
              {doctor.workingDays.join(" · ")}
            </p>
            <p className="mt-2 text-xs text-[#087a4b]">
              {doctor.availableDates.length
                ? `${doctor.availableDates.length} تواريخ متاحة محددة`
                : "التوافر حسب أيام العمل الأسبوعية"}
            </p>
          </article>
        ))}
      </div>
      <Pagination total={visible.length} page={page} onPageChange={setPage} />
    </CenterShell>
  )
}
