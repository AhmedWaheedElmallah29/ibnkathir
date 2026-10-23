import PatientNavbar from "@/components/PatientNavbar"
import PatientSidebar from "@/components/PatientSidebar"
export default function AppointmentDetailsScreen({ navigate, currentScreen }) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#f6f7f9" }}
      dir="rtl"
    >
      <PatientNavbar navigate={navigate} />
      <div className="flex flex-1">
        <PatientSidebar navigate={navigate} active={currentScreen} />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => navigate("patient-dashboard")}
              className="flex items-center gap-1 text-sm mb-5"
              style={{ color: "#696a76" }}
            >
              ← العودة للمواعيد
            </button>

            <div
              className="rounded-2xl overflow-hidden mb-5"
              style={{ border: "1px solid #e8e9f0" }}
            >
              <div className="p-5" style={{ background: "#090c56" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-bold"
                        style={{ background: "#12b76a", color: "#fff" }}
                      >
                        مؤكد
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                      >
                        TK-89241-EG#
                      </span>
                    </div>
                    <h1 className="text-xl font-black text-white">
                      د. مايكل تشن
                    </h1>
                    <p className="text-sm" style={{ color: "#ffd6e0" }}>
                      استشاري أمراض القلب والأوعية الدموية
                    </p>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-black text-white">
                      350 جنيه
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      مدفوع بالكامل
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white grid grid-cols-3 gap-4">
                {[
                  {
                    icon: "📅",
                    label: "تاريخ ووقت الكشف",
                    value: "الاثنين 21 أكتوبر 2024، 05:30 مساءً",
                  },
                  {
                    icon: "🏥",
                    label: "العيادة والفرع",
                    value: "عيادة القلب - مجمع التجمع الخامس، القاهرة",
                  },
                  {
                    icon: "🚗",
                    label: "نوع الزيارة",
                    value: "كشف سريري ومتابعة",
                  },
                  {
                    icon: "👤",
                    label: "المريض",
                    value: "عبدالله محمد بن صالح - MED-94821#",
                  },
                  { icon: "💳", label: "طريقة الدفع", value: "VISA •••• 4092" },
                  {
                    icon: "📋",
                    label: "الشكوى",
                    value: "متابعة خفقان ودوخة متكررة",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-3 rounded-xl"
                    style={{ background: "#f9f9fb" }}
                  >
                    <div
                      className="text-xs mb-0.5"
                      style={{ color: "#696a76" }}
                    >
                      {item.icon} {item.label}
                    </div>
                    <div
                      className="text-sm font-semibold"
                      style={{ color: "#171827" }}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation instructions */}
            <div
              className="rounded-2xl p-5 mb-4"
              style={{ background: "#eff0ff", border: "1px solid #d0d3f5" }}
            >
              <h2 className="font-bold mb-3" style={{ color: "#090c56" }}>
                ℹ️ توصيات سريرية هامة قبل الوصول:
              </h2>
              <ul className="space-y-2 text-sm" style={{ color: "#696a76" }}>
                <li className="flex items-start gap-2">
                  <span>•</span> يُرجى التواجد بمقر العيادة 15 دقيقة قبل الموعد
                  المحدد
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span> إجراء الفحوصات التمهيدية (قياس ضغط الدم، ودرجة
                  السكر، ودرجة الحرارة) بالاستقبال
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span> إحضار البطاقة القومية أو جواز السفر للتحقق من
                  الهوية
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 py-3 rounded-xl font-bold"
                style={{ background: "#090c56", color: "#fff" }}
              >
                🎫 تحميل تذكرة الموعد (PDF)
              </button>
              <button
                className="py-3 px-5 rounded-xl font-semibold"
                style={{ border: "1px solid #e8e9f0", color: "#696a76" }}
              >
                📅 إضافة لتقويم Google / Apple
              </button>
              <button
                className="py-3 px-5 rounded-xl font-semibold"
                style={{ color: "#ef003d" }}
              >
                إلغاء الموعد
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
