import { useEffect, useMemo, useState } from "react"
import CenterShell from "@/components/CenterShell"
import Pagination, { pageItems } from "@/components/Pagination"
import { specialties, timeSlots } from "@/data/medicalCenter"
const steps = [
  "المريض",
  "التخصص",
  "الطبيب",
  "الموعد",
  "نوع الزيارة",
  "المراجعة",
]
const dayNames = [
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
]
const dates = Array.from({ length: 14 }, (_, index) => {
  const dayNumber = 18 + index
  const value = new Date(
    `2026-10-${String(dayNumber).padStart(2, "0")}T12:00:00`,
  )
  return {
    date: `2026-10-${String(dayNumber).padStart(2, "0")}`,
    day: dayNames[value.getDay()],
    label: `${dayNumber} أكتوبر`,
  }
})
export default function BookingFlowScreen({
  navigate,
  currentScreen,
  patients,
  doctors,
  appointments,
  createAppointment,
  preselectedPatientId,
}) {
  const [step, setStep] = useState(preselectedPatientId ? 1 : 0)
  const [patientId, setPatientId] = useState(preselectedPatientId)
  const [specialty, setSpecialty] = useState("")
  const [doctorId, setDoctorId] = useState()
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [visitType, setVisitType] = useState("كشف أول مرة")
  const [period, setPeriod] = useState("أسبوع")
  const [search, setSearch] = useState("")
  const [patientPage, setPatientPage] = useState(1)
  const [specialtyPage, setSpecialtyPage] = useState(1)
  const [doctorPage, setDoctorPage] = useState(1)
  const selectedPatient = patients.find((item) => item.id === patientId)
  const selectedDoctor = doctors.find((item) => item.id === doctorId)
  const selectedDate = dates.find((item) => item.date === date)
  const specialtyDoctors = doctors.filter(
    (doctor) => doctor.specialty === specialty && doctor.name.includes(search),
  )
  const bookedSlots = useMemo(
    () =>
      appointments
        .filter((item) => item.doctorId === doctorId && item.date === date)
        .map((item) => item.time),
    [appointments, date, doctorId],
  )
  const doctorDates = selectedDoctor
    ? dates.filter((item) =>
        selectedDoctor.availableDates.length
          ? selectedDoctor.availableDates.includes(item.date)
          : selectedDoctor.workingDays.includes(item.day),
      )
    : dates
  const availableDates =
    period === "يوم"
      ? doctorDates.slice(0, 1)
      : period === "أسبوع"
        ? doctorDates.filter((item) => item.date <= "2026-10-24")
        : doctorDates
  const patientMatches = patients.filter(
    (patient) =>
      patient.name.includes(search) || patient.phone.includes(search),
  )
  const specialtyMatches = specialties.filter((item) => item.includes(search))
  useEffect(() => {
    setPatientPage(1)
    setSpecialtyPage(1)
    setDoctorPage(1)
  }, [search, specialty])
  function next() {
    if (step === 5 && selectedPatient && selectedDoctor && selectedDate) {
      createAppointment({
        patientId: selectedPatient.id,
        doctorId: selectedDoctor.id,
        specialty,
        visitType,
        date,
        day: selectedDate.day,
        time,
        amount: selectedDoctor.fee,
        status: "قادم",
      })
      navigate("reception-receipt")
      return
    }
    setSearch("")
    setStep((current) => Math.min(current + 1, 5))
  }
  const ready = [
    Boolean(patientId),
    Boolean(specialty),
    Boolean(doctorId),
    Boolean(date && time),
    Boolean(visitType),
    true,
  ][step]
  return (
    <CenterShell
      role="reception"
      active={currentScreen}
      navigate={navigate}
      title="إنشاء موعد جديد"
    >
      <div className="mb-5 overflow-x-auto rounded-2xl border border-[#e8e9f0] bg-white p-3">
        <div className="flex min-w-[680px] items-center">
          {steps.map((label, index) => (
            <div
              key={label}
              className="flex flex-1 items-center last:flex-none"
            >
              <button
                onClick={() => index < step && setStep(index)}
                className={`flex items-center gap-2 text-xs font-bold ${
                  index <= step ? "text-[#090c56]" : "text-[#9b9caa]"
                }`}
              >
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full ${
                    index <= step ? "bg-[#090c56] text-white" : "bg-[#e8e9f0]"
                  }`}
                >
                  {index + 1}
                </span>
                {label}
              </button>
              {index < steps.length - 1 && (
                <span
                  className={`mx-3 h-px flex-1 ${
                    index < step ? "bg-[#ef003d]" : "bg-[#e8e9f0]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <section className="min-h-[440px] rounded-2xl border border-[#e8e9f0] bg-white p-5 md:p-7">
        {step === 0 && (
          <>
            <h2 className="text-lg font-black text-[#090c56]">
              اختيار المريض المسجل
            </h2>
            <p className="mb-4 text-sm text-[#696a76]">
              ابحث بالاسم أو الهاتف واختر السجل الصحيح
            </p>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="بحث عن مريض"
              className="mb-4 w-full max-w-md rounded-xl border border-[#e8e9f0] bg-[#f9f9fb] px-4 py-3 text-sm outline-none"
            />
            <div className="grid gap-3 md:grid-cols-2">
              {pageItems(patientMatches, patientPage).map((patient) => (
                <button
                  key={patient.id}
                  onClick={() => setPatientId(patient.id)}
                  className={`rounded-xl border p-4 text-right ${
                    patientId === patient.id
                      ? "border-[#090c56] bg-[#eff0ff]"
                      : "border-[#e8e9f0]"
                  }`}
                >
                  <strong className="block text-[#090c56]">
                    {patient.name}
                  </strong>
                  <span className="mt-1 block text-xs text-[#696a76]">
                    ملف #{patient.id} · {patient.phone} · {patient.gender}
                  </span>
                  <span className="mt-2 block text-xs text-[#696a76]">
                    الأمراض المزمنة: {patient.chronicConditions}
                  </span>
                </button>
              ))}
            </div>
            {!patientMatches.length && (
              <p className="py-10 text-center text-sm text-[#9b9caa]">
                لا توجد سجلات مطابقة
              </p>
            )}
            <Pagination
              total={patientMatches.length}
              page={patientPage}
              onPageChange={setPatientPage}
            />
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="text-lg font-black text-[#090c56]">
              اختيار التخصص الطبي
            </h2>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="بحث في التخصصات"
              className="my-4 w-full max-w-md rounded-xl border border-[#e8e9f0] bg-[#f9f9fb] px-4 py-3 text-sm outline-none"
            />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {pageItems(specialtyMatches, specialtyPage).map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setSpecialty(item)
                    setDoctorId(undefined)
                  }}
                  className={`rounded-xl border p-4 text-sm font-bold ${
                    specialty === item
                      ? "border-[#090c56] bg-[#090c56] text-white"
                      : "border-[#e8e9f0] text-[#090c56]"
                  }`}
                >
                  {item}
                  <span
                    className={`mt-1 block text-xs font-normal ${
                      specialty === item ? "text-white/70" : "text-[#696a76]"
                    }`}
                  >
                    {
                      doctors.filter((doctor) => doctor.specialty === item)
                        .length
                    }{" "}
                    أطباء متاحون
                  </span>
                </button>
              ))}
            </div>
            <Pagination
              total={specialtyMatches.length}
              page={specialtyPage}
              onPageChange={setSpecialtyPage}
            />
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-lg font-black text-[#090c56]">
              أطباء تخصص {specialty}
            </h2>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="بحث باسم الطبيب"
              className="my-4 w-full max-w-md rounded-xl border border-[#e8e9f0] bg-[#f9f9fb] px-4 py-3 text-sm outline-none"
            />
            <div className="grid gap-3 md:grid-cols-3">
              {pageItems(specialtyDoctors, doctorPage).map((doctor) => (
                <button
                  key={doctor.id}
                  onClick={() => setDoctorId(doctor.id)}
                  className={`rounded-xl border p-4 text-right ${
                    doctorId === doctor.id
                      ? "border-[#090c56] bg-[#eff0ff]"
                      : "border-[#e8e9f0]"
                  }`}
                >
                  <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-[#090c56] font-black text-white">
                    {doctor.name.charAt(3)}
                  </div>
                  <strong className="block text-[#090c56]">
                    {doctor.name}
                  </strong>
                  <span className="mt-1 block text-xs text-[#696a76]">
                    {doctor.workingDays.join(" · ")}
                  </span>
                  <span className="mt-2 block text-sm font-bold text-[#ef003d]">
                    {doctor.fee} ج.م
                  </span>
                </button>
              ))}
            </div>
            {!specialtyDoctors.length && (
              <p className="py-10 text-center text-sm text-[#9b9caa]">
                لا يوجد أطباء مطابقون
              </p>
            )}
            <Pagination
              total={specialtyDoctors.length}
              page={doctorPage}
              onPageChange={setDoctorPage}
            />
          </>
        )}

        {step === 3 && selectedDoctor && (
          <>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-black text-[#090c56]">
                  مواعيد {selectedDoctor.name}
                </h2>
                <p className="text-xs text-[#696a76]">
                  ساعات العمل: {selectedDoctor.hours}
                </p>
              </div>
              <div className="flex rounded-xl bg-[#f6f7f9] p-1">
                {["يوم", "أسبوع", "شهر"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setPeriod(item)}
                    className={`rounded-lg px-4 py-2 text-xs font-bold ${
                      period === item
                        ? "bg-white text-[#090c56] shadow-sm"
                        : "text-[#696a76]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-5">
              <div className="grid gap-2 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-1">
                {availableDates.map((item) => (
                  <button
                    key={item.date}
                    onClick={() => {
                      setDate(item.date)
                      setTime("")
                    }}
                    className={`rounded-xl border p-3 text-right ${
                      date === item.date
                        ? "border-[#090c56] bg-[#eff0ff]"
                        : "border-[#e8e9f0]"
                    }`}
                  >
                    <strong className="text-sm text-[#090c56]">
                      {item.day}
                    </strong>
                    <span className="mr-2 text-xs text-[#696a76]">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
              <div className="lg:col-span-3">
                <p className="mb-3 text-sm font-bold text-[#090c56]">
                  {date ? "اختر وقتاً متاحاً" : "اختر التاريخ أولاً"}
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {timeSlots
                    .filter((slot) =>
                      selectedDoctor.hours.startsWith("04")
                        ? slot.includes("م")
                        : slot.includes("ص") ||
                          slot.startsWith("12") ||
                          slot.startsWith("01"),
                    )
                    .map((slot) => {
                      const unavailable =
                        selectedDoctor.unavailableSlots.includes(
                          `${date}|${slot}`,
                        )
                      const booked =
                        !date || bookedSlots.includes(slot) || unavailable
                      return (
                        <button
                          key={slot}
                          disabled={booked}
                          onClick={() => setTime(slot)}
                          className={`rounded-xl border px-2 py-3 text-xs font-bold ${
                            booked
                              ? "cursor-not-allowed border-[#f0f0f5] bg-[#f9f9fb] text-[#c4c5cf] line-through"
                              : time === slot
                                ? "border-[#090c56] bg-[#090c56] text-white"
                                : "border-[#e8e9f0] text-[#171827]"
                          }`}
                        >
                          {slot}
                          {bookedSlots.includes(slot)
                            ? " · محجوز"
                            : unavailable
                              ? " · غير متاح"
                              : ""}
                        </button>
                      )
                    })}
                </div>
                {date && (
                  <p className="mt-3 text-xs text-[#12b76a]">
                    {timeSlots.length - bookedSlots.length} موعداً متاحاً في هذا
                    اليوم
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-lg font-black text-[#090c56]">
              تحديد نوع الزيارة
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {["كشف أول مرة", "متابعة", "استشارة"].map((item) => (
                <button
                  key={item}
                  onClick={() => setVisitType(item)}
                  className={`rounded-2xl border p-6 text-right ${
                    visitType === item
                      ? "border-[#090c56] bg-[#eff0ff]"
                      : "border-[#e8e9f0]"
                  }`}
                >
                  <span className="block font-black text-[#090c56]">
                    {item}
                  </span>
                  <span className="mt-2 block text-xs leading-6 text-[#696a76]">
                    {item === "كشف أول مرة"
                      ? "فتح ملف كشف جديد وتقييم الحالة"
                      : item === "متابعة"
                        ? "متابعة حالة أو علاج تم وصفه سابقاً"
                        : "استشارة طبية متخصصة"}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 5 && selectedPatient && selectedDoctor && selectedDate && (
          <>
            <h2 className="text-lg font-black text-[#090c56]">
              مراجعة وتأكيد الحجز
            </h2>
            <p className="mb-5 text-sm text-[#696a76]">
              راجع جميع البيانات قبل إصدار رقم الحجز والدور
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["المريض", selectedPatient.name],
                ["الهاتف", selectedPatient.phone],
                ["التخصص", specialty],
                ["الطبيب", selectedDoctor.name],
                ["نوع الزيارة", visitType],
                [
                  "التاريخ واليوم",
                  `${selectedDate.day}، ${selectedDate.label} 2026`,
                ],
                ["الوقت", time],
                ["المبلغ المدفوع", `${selectedDoctor.fee} جنيه مصري`],
                [
                  "رقم الحجز المتوقع",
                  `#${Math.max(...appointments.map((item) => item.bookingNumber), 202) + 1}`,
                ],
                [
                  "رقم الدور المتوقع",
                  `#${appointments.filter((item) => item.date === date && item.doctorId === doctorId).length + 1}`,
                ],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-[#f9f9fb] p-3">
                  <span className="text-xs text-[#696a76]">{label}</span>
                  <strong className="mt-1 block text-sm text-[#090c56]">
                    {value}
                  </strong>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() =>
            step ? setStep(step - 1) : navigate("reception-dashboard")
          }
          className="rounded-xl border border-[#e8e9f0] bg-white px-6 py-3 text-sm font-bold text-[#696a76]"
        >
          السابق
        </button>
        <button
          disabled={!ready}
          onClick={next}
          className={`flex-1 rounded-xl py-3 text-sm font-bold ${
            ready ? "bg-[#ef003d] text-white" : "bg-[#e8e9f0] text-[#9b9caa]"
          }`}
        >
          {step === 5 ? "تأكيد الحجز وإصدار الإيصال" : "التالي"}
        </button>
      </div>
    </CenterShell>
  )
}
