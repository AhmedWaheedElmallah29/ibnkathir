import { LuCircleCheck, LuUser, LuStethoscope, LuHospital, LuCalendar, LuCreditCard, LuTicket, LuArrowLeft, LuPlus } from "react-icons/lu";
import PublicNavbar from "@/components/PublicNavbar";

// يعرض بيانات آخر حجز تم تأكيده (booking = lastBooking من App.jsx)
export default function BookingSuccessScreen({ navigate, currentScreen, booking }) {
    // لو المستخدم عمل refresh أو فتح الصفحة مباشرة، مفيش حجز نعرضه
    if (!booking) {
        return (<div className="min-h-screen" style={{ background: "#f6f7f9" }} dir="rtl">
        <PublicNavbar navigate={navigate} currentScreen={currentScreen}/>
        <div className="max-w-md mx-auto px-6 py-20 text-center">
          <h1 className="text-xl font-black mb-2" style={{ color: "#090c56" }}>لا يوجد حجز لعرضه</h1>
          <p className="text-sm mb-6" style={{ color: "#696a76" }}>ابدأ بحجز موعد جديد مع أحد الأطباء.</p>
          <button type="button" onClick={() => navigate("doctors")} className="px-6 py-3 rounded-xl font-bold" style={{ background: "#ef003d", color: "#fff" }}>
            تصفح الأطباء
          </button>
        </div>
      </div>);
    }

    const show = (value) => (value === null || value === undefined || value === "" ? "غير محدد" : value);
    const doctor = booking.doctor;
    const patient = booking.patient;
    const price = booking.visitType?.price ?? doctor?.price;
    const dateTime = [booking.date, booking.time].filter(Boolean).join(" - ");

    const items = [
        { icon: LuUser, label: "المريض", value: show(patient?.name) },
        { icon: LuStethoscope, label: "الطبيب المعالج", value: show(doctor?.name) },
        { icon: LuHospital, label: "التخصص والعيادة", value: `${show(doctor?.spec)} • ${show(doctor?.location)}` },
        { icon: LuCalendar, label: "موعد وتاريخ الكشف", value: show(dateTime) },
        { icon: LuCreditCard, label: "نوع الزيارة والرسوم", value: `${show(booking.visitType?.title)} • ${price != null ? `${price} جنيه` : "غير محدد"}` },
    ];

    return (<div className="min-h-screen" style={{ background: "#f6f7f9" }} dir="rtl">
      <PublicNavbar navigate={navigate} currentScreen={currentScreen}/>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e8e9f0" }}>
          <div className="p-6 text-center" style={{ background: "#e8f9f0" }}>
            <LuCircleCheck size={44} className="mx-auto mb-2" style={{ color: "#12b76a" }} />
            <h1 className="text-2xl font-black" style={{ color: "#090c56" }}>تم تأكيد الحجز بنجاح!</h1>
            <p className="text-sm mt-1" style={{ color: "#696a76" }}>احتفظ برقم الحجز ورقم الدور عند الحضور للعيادة</p>

            <div className="flex justify-center gap-3 mt-4">
              <div className="px-5 py-2 rounded-xl bg-white" style={{ border: "1px solid #e8e9f0" }}>
                <div className="text-xs" style={{ color: "#696a76" }}>رقم الحجز</div>
                <div className="text-lg font-black" style={{ color: "#090c56" }}>#{booking.bookingNumber}</div>
              </div>
              <div className="px-5 py-2 rounded-xl bg-white" style={{ border: "1px solid #e8e9f0" }}>
                <div className="text-xs" style={{ color: "#696a76" }}>رقم الدور</div>
                <div className="text-lg font-black" style={{ color: "#ef003d" }}>{booking.queueNumber}</div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-white space-y-3">
            {items.map((item) => {
                const ItemIcon = item.icon;
                return (<div key={item.label} className="flex items-start gap-3 text-sm">
                <ItemIcon size={18} className="mt-0.5 flex-shrink-0" style={{ color: "#090c56" }} />
                <div>
                  <div className="text-xs font-semibold" style={{ color: "#696a76" }}>{item.label}</div>
                  <div className="font-medium" style={{ color: "#171827" }}>{item.value}</div>
                </div>
              </div>);
            })}
          </div>

          <div className="p-4 print-actions" style={{ borderTop: "1px solid #e8e9f0", background: "#fff" }}>
            <button type="button" onClick={() => window.print()} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold" style={{ background: "#090c56", color: "#fff" }}>
              <LuTicket size={16} /> طباعة تذكرة الموعد
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6 justify-center flex-wrap print-actions">
          <button type="button" onClick={() => navigate("doctors")} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold" style={{ background: "#ef003d", color: "#fff" }}>
            <LuPlus size={18} /> حجز موعد جديد
          </button>
          <button type="button" onClick={() => navigate("homepage")} className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold" style={{ border: "1px solid #e8e9f0", color: "#696a76" }}>
            العودة للرئيسية <LuArrowLeft size={18} />
          </button>
        </div>
      </div>
    </div>);
}