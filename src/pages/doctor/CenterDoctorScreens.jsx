import { useEffect, useMemo, useState } from "react"
import CenterShell from "@/components/CenterShell"
import Pagination, { pageItems } from "@/components/Pagination"
import { filterAppointmentsByPeriod } from "@/data/medicalCenter"
const periodLabels = [
  { label: "يوم", value: "day" },
  { label: "أسبوع", value: "week" },
  { label: "شهر", value: "month" },
]
function QueueTable({ appointments, patients, updateAppointment }) {
  const [status, setStatus] = useState("الكل")
  const [page, setPage] = useState(1)
  const visible =
    status === "الكل"
      ? appointments
      : appointments.filter((item) => item.status === status)
  useEffect(() => setPage(1), [status, appointments.length])
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8e9f0] bg-white">
      <div className="flex flex-wrap gap-2 border-b border-[#e8e9f0] p-4">
        {["الكل", "في الانتظار", "داخل الكشف", "مكتمل", "قادم"].map((item) => (
          <button
            key={item}
            onClick={() => setStatus(item)}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
              status === item
                ? "bg-[#090c56] text-white"
                : "bg-[#f6f7f9] text-[#696a76]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-sm">
          <thead className="bg-[#f9f9fb] text-[#696a76]">
            <tr>
              {[
                "الدور",
                "المريض",
                "الموعد",
                "نوع الزيارة",
                "الحالة",
                "الإجراء",
              ].map((item) => (
                <th key={item} className="px-4 py-3 text-right text-xs">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageItems(visible, page).map((appointment) => {
              const patient = patients.find(
                (item) => item.id === appointment.patientId,
              )
              return (
                <tr key={appointment.id} className="border-t border-[#f0f0f5]">
                  <td className="px-4 py-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#090c56] font-black text-white">
                      #{appointment.queueNumber}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <strong className="text-[#090c56]">{patient?.name}</strong>
                    <span className="block text-xs text-[#696a76]">
                      ملف #{patient?.id}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {appointment.time}
                    <span className="block text-xs text-[#696a76]">
                      {appointment.day} · {appointment.date}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#696a76]">
                    {appointment.visitType}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-bold ${
                        appointment.status === "مكتمل"
                          ? "bg-[#e8f9f0] text-[#087a4b]"
                          : appointment.status === "داخل الكشف"
                            ? "bg-[#eff0ff] text-[#090c56]"
                            : "bg-[#fff5e6] text-[#a15c00]"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={appointment.status}
                      onChange={(e) =>
                        updateAppointment(appointment.id, {
                          status: e.target.value,
                        })
                      }
                      className="rounded-lg border border-[#e8e9f0] px-2 py-1.5 text-xs"
                    >
                      <option>في الانتظار</option>
                      <option>داخل الكشف</option>
                      <option>مكتمل</option>
                      <option>قادم</option>
                    </select>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {!visible.length && (
          <p className="p-10 text-center text-sm text-[#9b9caa]">
            لا توجد مواعيد في هذه الفترة
          </p>
        )}
      </div>
      <Pagination total={visible.length} page={page} onPageChange={setPage} />
    </div>
  )
}
export function CenterDoctorDashboard(props) {
  const [search, setSearch] = useState("")
  const assigned = props.appointments.filter((item) => item.doctorId === 1)
  const searched = assigned.filter((item) =>
    props.patients
      .find((patient) => patient.id === item.patientId)
      ?.name.includes(search),
  )
  const cards = [
    [
      "في الانتظار",
      assigned.filter((item) => item.status === "في الانتظار").length,
    ],
    [
      "داخل الكشف",
      assigned.filter((item) => item.status === "داخل الكشف").length,
    ],
    ["حالات مكتملة", assigned.filter((item) => item.status === "مكتمل").length],
    ["مرضى قادمون", assigned.filter((item) => item.status === "قادم").length],
  ]
  return (
    <CenterShell
      role="doctor"
      active={props.currentScreen}
      navigate={props.navigate}
      title="لوحة الطبيب"
    >
      <div className="mb-5 rounded-2xl bg-[#090c56] p-5 text-white">
        <p className="text-xs text-white/65">
          {props.doctors.find((doctor) => doctor.id === 1)?.clinic}
        </p>
        <h2 className="mt-1 text-xl font-black">مرحباً، د. أحمد منصور</h2>
        <p className="mt-2 text-sm text-white/75">
          يمكنك متابعة قائمة الانتظار وتحديث حالة كل زيارة مباشرة.
        </p>
      </div>
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map(([label, value]) => (
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
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-black text-[#090c56]">
            المرضى القادمون وقائمة اليوم
          </h2>
          <p className="text-xs text-[#696a76]">
            ابحث لمعرفة حالة وموعد أي مريض
          </p>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="بحث باسم المريض"
          className="rounded-xl border border-[#e8e9f0] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#090c56]"
        />
      </div>
      <QueueTable
        appointments={searched}
        patients={props.patients}
        updateAppointment={props.updateAppointment}
      />
    </CenterShell>
  )
}
export function CenterDoctorSchedule(props) {
  const [period, setPeriod] = useState("week")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const assigned = filterAppointmentsByPeriod(
    props.appointments.filter((item) => item.doctorId === 1),
    period,
  ).filter((appointment) =>
    props.patients
      .find((patient) => patient.id === appointment.patientId)
      ?.name.includes(search),
  )
  const activeDoctor = props.doctors.find((doctor) => doctor.id === 1)
  useEffect(() => setPage(1), [period, search])
  return (
    <CenterShell
      role="doctor"
      active={props.currentScreen}
      navigate={props.navigate}
      title="جدول مواعيد الطبيب"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {periodLabels.map((item) => (
            <button
              key={item.value}
              onClick={() => setPeriod(item.value)}
              className={`rounded-xl px-5 py-2 text-sm font-bold ${
                period === item.value
                  ? "bg-[#090c56] text-white"
                  : "border border-[#e8e9f0] bg-white text-[#696a76]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="بحث باسم المريض"
          className="w-full max-w-xs rounded-xl border border-[#e8e9f0] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#090c56]"
        />
      </div>
      {activeDoctor && (
        <div className="mb-4 rounded-xl border border-[#e8e9f0] bg-white px-4 py-3 text-xs text-[#696a76]">
          <strong className="text-[#090c56]">التوافر الحالي:</strong>{" "}
          {activeDoctor.workingDays.join(" · ")} · {activeDoctor.hours} ·{" "}
          {activeDoctor.clinic}
        </div>
      )}
      <div className="overflow-hidden rounded-2xl border border-[#e8e9f0] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead className="bg-[#f9f9fb] text-[#696a76]">
              <tr>
                {[
                  "التاريخ",
                  "اليوم",
                  "الوقت",
                  "المريض",
                  "نوع الزيارة",
                  "الحالة",
                ].map((item) => (
                  <th key={item} className="px-4 py-3 text-right text-xs">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageItems(assigned, page).map((item) => (
                <tr key={item.id} className="border-t border-[#f0f0f5]">
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">{item.day}</td>
                  <td className="px-4 py-3 font-bold text-[#090c56]">
                    {item.time}
                  </td>
                  <td className="px-4 py-3 font-bold">
                    {
                      props.patients.find(
                        (patient) => patient.id === item.patientId,
                      )?.name
                    }
                  </td>
                  <td className="px-4 py-3">{item.visitType}</td>
                  <td className="px-4 py-3">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!assigned.length && (
            <p className="p-12 text-center text-sm text-[#9b9caa]">
              لا توجد مواعيد في هذه الفترة
            </p>
          )}
        </div>
        <Pagination
          total={assigned.length}
          page={page}
          onPageChange={setPage}
        />
      </div>
    </CenterShell>
  )
}
export function CenterDoctorRecords(props) {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState()
  const [note, setNote] = useState("")
  const [saved, setSaved] = useState(false)
  const [page, setPage] = useState(1)
  const visible = useMemo(
    () =>
      props.patients.filter(
        (item) => item.name.includes(search) || item.phone.includes(search),
      ),
    [props.patients, search],
  )
  useEffect(() => setPage(1), [search])
  const searchField = (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="بحث عن مريض"
      className="w-full rounded-xl border border-[#e8e9f0] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#090c56] sm:w-72"
    />
  )
  return (
    <CenterShell
      role="doctor"
      active={props.currentScreen}
      navigate={props.navigate}
      title="السجل الطبي والمتابعة السريرية"
      headerAction={searchField}
    >
      <div className="grid gap-5 lg:grid-cols-3">
        <section className="overflow-hidden rounded-2xl border border-[#e8e9f0] bg-white p-4">
          {pageItems(visible, page).map((patient) => (
            <button
              key={patient.id}
              onClick={() => {
                setSelected(patient)
                setSaved(false)
              }}
              className={`mb-2 w-full rounded-xl border p-3 text-right ${
                selected?.id === patient.id
                  ? "border-[#090c56] bg-[#eff0ff]"
                  : "border-[#e8e9f0]"
              }`}
            >
              <strong className="block text-sm text-[#090c56]">
                {patient.name}
              </strong>
              <span className="text-xs text-[#696a76]">ملف #{patient.id}</span>
            </button>
          ))}
          {!visible.length && (
            <p className="py-10 text-center text-xs text-[#9b9caa]">
              لا توجد سجلات مطابقة
            </p>
          )}
          <Pagination
            total={visible.length}
            page={page}
            onPageChange={setPage}
          />
        </section>
        <section className="rounded-2xl border border-[#e8e9f0] bg-white p-5 lg:col-span-2">
          {selected ? (
            <>
              <h2 className="text-xl font-black text-[#090c56]">
                {selected.name}
              </h2>
              <p className="text-xs text-[#696a76]">
                الهاتف: {selected.phone} · الميلاد: {selected.birthDate} ·{" "}
                {selected.gender}
              </p>
              <div className="my-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-[#fff0f3] p-4">
                  <p className="text-xs font-bold text-[#ef003d]">
                    الأمراض المزمنة
                  </p>
                  <p className="mt-2 text-sm">{selected.chronicConditions}</p>
                </div>
                <div className="rounded-xl bg-[#f9f9fb] p-4">
                  <p className="text-xs font-bold text-[#090c56]">
                    التاريخ الطبي
                  </p>
                  <p className="mt-2 text-sm">{selected.history}</p>
                </div>
              </div>
              <h3 className="font-black text-[#090c56]">الزيارات السابقة</h3>
              {props.appointments
                .filter((item) => item.patientId === selected.id)
                .map((item) => (
                  <div
                    key={item.id}
                    className="mt-2 rounded-xl border border-[#e8e9f0] p-3 text-sm"
                  >
                    {item.date} · {item.specialty} · {item.visitType} ·{" "}
                    {item.status}
                  </div>
                ))}
              <label className="mt-5 block text-sm font-bold">
                متابعة الزيارة الحالية
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="mt-2 min-h-28 w-full rounded-xl border border-[#e8e9f0] bg-[#f9f9fb] p-3 font-normal outline-none"
                  placeholder="التشخيص، الملاحظات السريرية وخطة المتابعة"
                />
              </label>
              <button
                onClick={() => setSaved(true)}
                className="mt-3 rounded-xl bg-[#ef003d] px-6 py-2.5 text-sm font-bold text-white"
              >
                حفظ المتابعة في السجل
              </button>
              {saved && (
                <span className="mr-3 text-xs font-bold text-[#087a4b]">
                  تم الحفظ محلياً
                </span>
              )}
            </>
          ) : (
            <p className="py-24 text-center text-sm text-[#9b9caa]">
              اختر مريضاً لعرض سجله الطبي
            </p>
          )}
        </section>
      </div>
    </CenterShell>
  )
}
