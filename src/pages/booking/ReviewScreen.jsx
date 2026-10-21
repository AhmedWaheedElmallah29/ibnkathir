
import { LuInfo, LuCircleCheck } from "react-icons/lu";
import BookingSteps from "@/components/BookingSteps";
import PublicNavbar from "@/components/PublicNavbar";

// booking: بيانات الحجز التي جمعتها الشاشات السابقة.
// confirmBooking: الوظيفة المسؤولة عن حفظ الحجز والانتقال لصفحة النجاح.
export default function ReviewScreen({
  navigate,
  currentScreen,
  booking,
  confirmBooking,
}) {
  // استخراج البيانات لتسهيل قراءتها واستخدامها داخل الشاشة.
  const doctor = booking?.doctor;
  const visitType = booking?.visitType;
  const patient = booking?.patient;

  // إظهار شرطة بدل ترك مكان فارغ عند عدم توفر معلومة.
  const showValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return "غير محدد";
    }

    return value;
  };

  // تجهيز تفاصيل الحجز من البيانات المشتركة، وليس من بيانات تجريبية ثابتة.
  const details = [
    {
      label: "الطبيب",
      value: doctor?.name || "لم يتم اختيار الطبيب",
    },
    {
      label: "التخصص",
      value: doctor?.spec,
    },
    {
      label: "التاريخ والوقت",
      value: [booking?.date, booking?.time]
        .filter(Boolean)
        .join(" - "),
    },
    {
      label: "نوع الزيارة",
      value: visitType?.title,
    },
    {
      label: "العنوان",
      value: doctor?.location,
    },
    {
      label: "اسم المريض",
      value: patient?.name,
    },
    {
      label: "الهاتف",
      value: patient?.phone,
    },
    {
      label: "الشكوى الرئيسية",
      value: patient?.complaint,
    },
    {
      label: "طريقة الدفع",
      value: booking?.paymentMethod,
    },
  ];

  // استخدام السعر المتاح في بيانات الحجز بدل كتابة مبلغ ثابت.
  const totalPrice = visitType?.price ?? doctor?.price;

  return (
    <div
      className="min-h-screen"
      style={{ background: "#f6f7f9" }}
      dir="rtl"
    >
      <PublicNavbar
        navigate={navigate}
        currentScreen={currentScreen}
      />

      <div className="max-w-2xl mx-auto px-6 py-8">
        <BookingSteps current={5} />

        <h1
          className="text-xl font-black mb-2 text-center"
          style={{ color: "#090c56" }}
        >
          مراجعة وتأكيد الحجز
        </h1>

        <p
          className="text-sm text-center mb-6"
          style={{ color: "#696a76" }}
        >
          تأكد من صحة جميع التفاصيل قبل تأكيد الحجز
        </p>

        {/* ملخص الطبيب والسعر */}
        <div
          className="rounded-2xl overflow-hidden mb-4"
          style={{
            background: "#fff",
            border: "1px solid #e8e9f0",
          }}
        >
          <div
            className="p-4"
            style={{ background: "#090c56" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                }}
              >
                {doctor?.name?.charAt(0) || "ط"}
              </div>

              <div>
                <div className="font-bold text-white">
                  {showValue(doctor?.name)}
                </div>

                <div
                  className="text-sm"
                  style={{ color: "#ffd6e0" }}
                >
                  {showValue(doctor?.spec)}
                </div>
              </div>

              <div className="mr-auto text-left">
                <div className="text-xl font-black text-white">
                  {totalPrice != null
                    ? `${totalPrice} جنيه`
                    : "غير محدد"}
                </div>

                <div
                  className="text-xs"
                  style={{ color: "#ffd6e0" }}
                >
                  إجمالي المبلغ
                </div>
              </div>
            </div>
          </div>

          {/* عرض تفاصيل الحجز التي أدخلها المستخدم */}
          <div className="p-5 space-y-3">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="flex items-start justify-between gap-4 py-2.5"
                style={{ borderBottom: "1px solid #f0f0f5" }}
              >
                <span
                  className="text-sm font-bold break-words"
                  style={{ color: "#171827" }}
                >
                  {showValue(detail.value)}
                </span>

                <span
                  className="text-xs font-semibold flex-shrink-0"
                  style={{
                    color: "#696a76",
                    minWidth: 100,
                    textAlign: "left",
                  }}
                >
                  {detail.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* تذكير المريض بتعليمات الحضور */}
        <div
          className="p-4 rounded-2xl mb-5"
          style={{
            background: "#eff0ff",
            border: "1px solid #d0d3f5",
          }}
        >
          <p
            className="flex items-center gap-2 font-bold text-sm mb-2"
            style={{ color: "#090c56" }}
          >
            <LuInfo size={18} />
            توصيات هامة قبل الوصول:
          </p>

          <ul
            className="text-sm space-y-1"
            style={{ color: "#696a76" }}
          >
            <li>
              • يُرجى التواجد بمقر العيادة قبل الموعد بـ15 دقيقة.
            </li>
            <li>
              • اصطحاب أي قراءات طبية حديثة إن وجدت.
            </li>
            <li>
              • إحضار البطاقة القومية أو جواز السفر للتحقق.
            </li>
          </ul>
        </div>

        {/* لا نستخدم booking-payment لأنه غير مربوط حاليًا في App.jsx */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate("booking-patient-info")}
            className="flex-1 py-3.5 rounded-xl font-semibold text-sm"
            style={{
              border: "1px solid #e8e9f0",
              color: "#696a76",
            }}
          >
            السابق
          </button>

          <button
            type="button"
            onClick={confirmBooking}
            disabled={!doctor || !patient || !confirmBooking}
            className="py-3.5 px-8 rounded-xl font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
            style={{
              background: "#ef003d",
              color: "#fff",
              flex: 2,
            }}
          >
            <LuCircleCheck size={18} />
            تأكيد الحجز الآن
          </button>
        </div>
      </div>
    </div>
  );
}
