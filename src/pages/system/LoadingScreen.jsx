import DoctorNavbar from "@/components/DoctorNavbar"
import DoctorSidebar from "@/components/DoctorSidebar"
const sections = [
  {
    title: "إحصائيات لوحة التحكم والتدفق السريري",
    count: 5,
    type: "Dynamic KPI Skeleton Metric Matrix",
  },
  {
    title: "دليل الأطباء والاستشاريين (Doctor Profiles)",
    count: 3,
    type: "Clinician Grid Skeleton Layout",
  },
  {
    title: "قائمة المواعيد والكشوفات السريرية",
    count: 4,
    type: "Live Consultation Data Rows",
  },
  {
    title: "ملف وسجلات المريض والروشتة (EMR & Rx)",
    count: 2,
    type: "Patient Chart Encounter Skeleton",
  },
  {
    title: "نتائج الفحوصات والتحاليل المخبرية (Diagnostic Labs)",
    count: 3,
    type: "Lab Status & Reports Shimmer",
  },
]
function SkeletonBar({ width = "100%", height = 12 }) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 8,
        background:
          "linear-gradient(90deg, #e8e9f0 25%, #f0f0f5 50%, #e8e9f0 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
      }}
    />
  )
}
export default function LoadingScreen({ navigate, currentScreen }) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#f6f7f9" }}
      dir="rtl"
    >
      <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
      <DoctorNavbar navigate={navigate} />
      <div className="flex flex-1">
        <DoctorSidebar navigate={navigate} active={currentScreen} />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-5xl mx-auto">
            {/* Loading badge */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{
                  background: "#fef3c7",
                  color: "#f79009",
                  border: "1px solid #fde68a",
                }}
              >
                ⚡ جارٍ جلب البيانات الطبية (... Fetching Data)
              </div>
              <div
                className="flex items-center gap-2 text-xs"
                style={{ color: "#696a76" }}
              >
                <span>TL: 5.3</span>
                <span>•</span>
                <span>رن الاستجابة: 320ms</span>
              </div>
            </div>

            <h1
              className="text-2xl font-black mb-2"
              style={{ color: "#090c56" }}
            >
              ❌ حالات التحميل التفاعلية والهيكل العظمي (Skeleton States)
            </h1>
            <p className="text-sm mb-6" style={{ color: "#696a76" }}>
              محاكاة فورية لحالات تحميل البيانات واستجابة واجهات برمجة التطبيقات
              (API Loading States) لكافة الأقسام المنصة المتقدمة السريرية.
            </p>

            {/* Section filter tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {[
                "الكل (1 وحدة)",
                "إحصائيات المنصة",
                "دليل الأطباء",
                "المواعيد والكشوفات",
                "السجل الطبي (EMR)",
                "المختبر والفحوصات",
              ].map((tab, i) => (
                <button
                  key={tab}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                  style={
                    i === 0
                      ? { background: "#090c56", color: "#fff" }
                      : {
                          background: "#fff",
                          color: "#696a76",
                          border: "1px solid #e8e9f0",
                        }
                  }
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-5">
              {sections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-2xl overflow-hidden"
                  style={{ background: "#fff", border: "1px solid #e8e9f0" }}
                >
                  <div
                    className="p-4"
                    style={{ borderBottom: "1px solid #e8e9f0" }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: "#9b9caa" }}>
                        نموذج: {section.type}
                      </span>
                      <span
                        className="font-bold text-sm"
                        style={{ color: "#090c56" }}
                      >
                        📊 {section.title}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    {section.count === 5 ? (
                      <div>
                        <div className="grid grid-cols-5 gap-3 mb-4">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <div
                                key={i}
                                className="p-4 rounded-xl"
                                style={{ border: "1px solid #e8e9f0" }}
                              >
                                <SkeletonBar height={10} width="60%" />
                                <div className="mt-2">
                                  <SkeletonBar height={28} width="80%" />
                                </div>
                                <div className="mt-2">
                                  <SkeletonBar height={8} />
                                </div>
                                <div className="mt-1">
                                  <SkeletonBar height={8} width="70%" />
                                </div>
                              </div>
                            ))}
                        </div>
                        <div
                          className="rounded-xl p-4"
                          style={{ border: "1px solid #e8e9f0" }}
                        >
                          <SkeletonBar height={10} width="30%" />
                          <div className="flex gap-2 mt-3">
                            {[40, 65, 50, 80, 55, 70].map((h, i) => (
                              <div
                                key={i}
                                className="flex-1 rounded-t-lg"
                                style={{ height: h, background: "#e8e9f0" }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : section.count === 3 && section.type.includes("Grid") ? (
                      <div className="grid grid-cols-3 gap-4">
                        {Array(3)
                          .fill(0)
                          .map((_, i) => (
                            <div
                              key={i}
                              className="p-4 rounded-xl"
                              style={{ border: "1px solid #e8e9f0" }}
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <div
                                  className="w-12 h-12 rounded-full"
                                  style={{ background: "#e8e9f0" }}
                                />
                                <div className="flex-1">
                                  <SkeletonBar height={10} />
                                  <div className="mt-1">
                                    <SkeletonBar height={8} width="70%" />
                                  </div>
                                </div>
                              </div>
                              <SkeletonBar height={8} />
                              <div className="mt-1">
                                <SkeletonBar height={8} width="60%" />
                              </div>
                              <div className="mt-3">
                                <SkeletonBar height={32} />
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {Array(section.count)
                          .fill(0)
                          .map((_, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 p-3 rounded-xl"
                              style={{ border: "1px solid #e8e9f0" }}
                            >
                              <div
                                className="w-8 h-8 rounded-full"
                                style={{ background: "#e8e9f0", flexShrink: 0 }}
                              />
                              <div className="flex-1">
                                <SkeletonBar height={10} width="40%" />
                                <div className="mt-1">
                                  <SkeletonBar height={8} width="70%" />
                                </div>
                              </div>
                              <div>
                                <SkeletonBar height={10} width="60px" />
                                <div className="mt-1">
                                  <SkeletonBar height={20} width="80px" />
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-5 text-xs text-center"
              style={{ color: "#9b9caa" }}
            >
              ℹ️ البنايات النطبيقية (Skeleton Screens) تحافظ على ثبات التخطيط
              البصري، وتقلل من [الهزازة] الإدراكية، أثناء تحميل البيانات.
            </div>
            <button
              onClick={() => navigate("doctor-dashboard")}
              className="mx-auto flex items-center gap-1 mt-2 text-xs"
              style={{ color: "#090c56" }}
            >
              ↑ العودة للأعلى
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
