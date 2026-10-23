import Logo from "@/components/Logo"
export default function ReceiptScreen({
  navigate,
  appointment,
  patients,
  doctors,
}) {
  if (!appointment) {
    return (
      <div className="grid min-h-screen place-items-center" dir="rtl">
        <button
          onClick={() => navigate("reception-booking")}
          className="rounded-xl bg-[#090c56] px-6 py-3 text-white"
        >
          إنشاء حجز أولاً
        </button>
      </div>
    )
  }
  const patient = patients.find((item) => item.id === appointment.patientId)
  const doctor = doctors.find((item) => item.id === appointment.doctorId)
  return (
    <div className="min-h-screen bg-[#f6f7f9] p-4 md:p-8" dir="rtl">
      <div className="print-actions mx-auto mb-4 flex max-w-2xl justify-between">
        <button
          onClick={() => navigate("reception-dashboard")}
          className="rounded-xl border border-[#e8e9f0] bg-white px-4 py-2 text-sm font-bold text-[#696a76]"
        >
          العودة للاستقبال
        </button>
        <button
          onClick={() => window.print()}
          className="rounded-xl bg-[#ef003d] px-6 py-2 text-sm font-bold text-white"
        >
          طباعة الإيصال
        </button>
      </div>
      <article className="receipt mx-auto max-w-2xl overflow-hidden rounded-3xl border border-[#e8e9f0] bg-white shadow-xl shadow-[#090c56]/5">
        <header className="flex items-center justify-between bg-[#090c56] p-6">
          <Logo size={48} textColor="#ffffff" subtitle="إيصال حجز موعد" />
          <div className="text-left text-white">
            <p className="text-xs opacity-70">رقم الحجز</p>
            <strong className="text-3xl">#{appointment.bookingNumber}</strong>
          </div>
        </header>
        <div className="p-6 md:p-8">
          <div className="mb-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[#fff0f3] p-5 text-center">
              <p className="text-xs font-bold text-[#ef003d]">رقم الدور</p>
              <strong className="mt-1 block text-4xl text-[#090c56]">
                #{appointment.queueNumber}
              </strong>
            </div>
            <div className="rounded-2xl bg-[#eff0ff] p-5 text-center">
              <p className="text-xs font-bold text-[#090c56]">المبلغ المدفوع</p>
              <strong className="mt-1 block text-2xl text-[#090c56]">
                {appointment.amount} ج.م
              </strong>
            </div>
          </div>
          <h1 className="mb-4 text-xl font-black text-[#090c56]">
            تفاصيل الموعد المؤكد
          </h1>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {[
              ["اسم المريض", patient?.name],
              ["رقم الملف", `#${patient?.id}`],
              ["الطبيب", doctor?.name],
              ["التخصص", appointment.specialty],
              ["نوع الزيارة", appointment.visitType],
              ["اليوم والتاريخ", `${appointment.day}، ${appointment.date}`],
              ["وقت الموعد", appointment.time],
              ["حالة الحجز", "مؤكد"],
            ].map(([label, value]) => (
              <div key={label} className="border-b border-[#e8e9f0] pb-3">
                <p className="text-xs text-[#696a76]">{label}</p>
                <strong className="mt-1 block text-sm text-[#171827]">
                  {value}
                </strong>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl bg-[#f9f9fb] p-4 text-xs leading-6 text-[#696a76]">
            يرجى الحضور قبل الموعد بـ 15 دقيقة والاحتفاظ بهذا الإيصال. رقم الحجز
            ورقم الدور مخصصان لهذا اليوم والطبيب.
          </div>
          <p className="mt-6 text-center text-xs text-[#9b9caa]">
            عيادة ابن كثير · فرع القاهرة الرئيسي · 02-3344-9988
          </p>
        </div>
      </article>
    </div>
  )
}
