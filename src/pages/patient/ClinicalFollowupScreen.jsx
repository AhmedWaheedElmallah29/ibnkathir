import PatientNavbar from "@/components/PatientNavbar"
import PatientSidebar from "@/components/PatientSidebar"
export default function ClinicalFollowupScreen({ navigate, currentScreen }) {
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
            <h1
              className="text-2xl font-black mb-2"
              style={{ color: "#090c56" }}
            >
              📊 المتابعة الإكلينيكية
            </h1>
            <p className="text-sm mb-5" style={{ color: "#696a76" }}>
              التغذية الراجعة السريرية (Clinical Feedback Principles) — تتعهد
              عيادة ابن كثير في التأكد والإشعارات الرسمية
            </p>

            {/* Progress */}
            <div className="grid grid-cols-3 gap-4 mb-5">
              {[
                {
                  label: "الزيارات المكتملة",
                  value: 8,
                  total: 10,
                  color: "#12b76a",
                },
                {
                  label: "الأدوية النشطة",
                  value: 3,
                  total: 3,
                  color: "#090c56",
                },
                {
                  label: "التحاليل المعلقة",
                  value: 1,
                  total: 4,
                  color: "#f79009",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl p-5"
                  style={{ background: "#fff", border: "1px solid #e8e9f0" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "#696a76" }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="text-xl font-black"
                      style={{ color: item.color }}
                    >
                      {item.value}/{item.total}
                    </span>
                  </div>
                  <div
                    className="h-2 rounded-full"
                    style={{ background: "#e8e9f0" }}
                  >
                    <div
                      className="h-2 rounded-full"
                      style={{
                        background: item.color,
                        width: `${(item.value / item.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div
              className="rounded-2xl p-5 mb-5"
              style={{ background: "#fff", border: "1px solid #e8e9f0" }}
            >
              <h2 className="font-bold mb-4" style={{ color: "#090c56" }}>
                مسار العلاج والمتابعة
              </h2>
              <div className="space-y-4">
                {[
                  {
                    date: "24 أكتوبر 2024",
                    event: "كشف سريري - د. مايكل تشن",
                    status: "مكتمل",
                    notes: "ضغط الدم استقر، استمرار الأدوية الحالية",
                  },
                  {
                    date: "14 أكتوبر 2024",
                    event: "متابعة نتائج التحاليل",
                    status: "مكتمل",
                    notes: "HbA1c مرتفع - تعديل الجرعة",
                  },
                  {
                    date: "28 أكتوبر 2024",
                    event: "موعد المتابعة القادم",
                    status: "قادم",
                    notes: "مراجعة هولتر القلب ونتائج HbA1c",
                  },
                ].map((item) => (
                  <div key={item.date} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={
                          item.status === "مكتمل"
                            ? { background: "#12b76a", color: "#fff" }
                            : { background: "#090c56", color: "#fff" }
                        }
                      >
                        {item.status === "مكتمل" ? "✓" : "→"}
                      </div>
                      <div
                        className="flex-1 w-0.5 mt-1"
                        style={{ background: "#e8e9f0" }}
                      />
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between">
                        <span
                          className="font-bold text-sm"
                          style={{ color: "#090c56" }}
                        >
                          {item.event}
                        </span>
                        <span className="text-xs" style={{ color: "#9b9caa" }}>
                          {item.date}
                        </span>
                      </div>
                      <p className="text-sm mt-1" style={{ color: "#696a76" }}>
                        {item.notes}
                      </p>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-semibold mt-1 inline-block"
                        style={
                          item.status === "مكتمل"
                            ? { background: "#e8f9f0", color: "#12b76a" }
                            : { background: "#eff0ff", color: "#090c56" }
                        }
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Doctor notes */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "#eff0ff", border: "1px solid #d0d3f5" }}
            >
              <h2 className="font-bold mb-3" style={{ color: "#090c56" }}>
                📝 ملاحظات الطبيب الأخيرة
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#696a76" }}
              >
                المريض ملتزم بمواعيد بصفة منتظمة، ولكن يفضل الاطمئنان لضغط الدم
                الصباحي قبل الذهاب للعمل. تعديل جرعة كونكور من 5mg إلى 7.5mg
                لمدة 4 أسابيع وإعادة التقييم. المتابعة القادمة خلال 4 أسابيع.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: "#090c56", color: "#fff" }}
                >
                  م
                </div>
                <div>
                  <div
                    className="text-xs font-bold"
                    style={{ color: "#090c56" }}
                  >
                    د. مايكل تشن
                  </div>
                  <div className="text-xs" style={{ color: "#9b9caa" }}>
                    24 أكتوبر 2024
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
