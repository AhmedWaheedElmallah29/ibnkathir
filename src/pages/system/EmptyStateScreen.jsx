import PatientNavbar from "@/components/PatientNavbar"
import PatientSidebar from "@/components/PatientSidebar"
const emptyStates = [
  {
    icon: "📅",
    title: "لا توجد مواعيد مسجلة",
    desc: "لم تقم بحجز أي موعد طبي بعد. احجز أول موعد مع أحد أطبائنا المعتمدين.",
    action: "احجز موعدك الأول",
    actionScreen: "doctors",
    bg: "#eff0ff",
  },
  {
    icon: "💊",
    title: "لا توجد وصفات طبية",
    desc: "لم يتم إصدار أي وصفة طبية بعد. ستظهر هنا بعد أول زيارة طبية.",
    action: "احجز زيارة طبية",
    actionScreen: "doctors",
    bg: "#fff0f3",
  },
  {
    icon: "🔬",
    title: "لا توجد نتائج تحاليل",
    desc: "لم يتم طلب أي تحاليل بعد. سيتم عرض نتائجك هنا بعد طلبها من الطبيب.",
    action: "عرض ملفك الطبي",
    actionScreen: "medical-records",
    bg: "#e8f9f0",
  },
  {
    icon: "📋",
    title: "السجل الطبي فارغ",
    desc: "لا توجد سجلات طبية حتى الآن. أنشئ ملفك الطبي وأضف بياناتك الصحية.",
    action: "إنشاء الملف الطبي",
    actionScreen: "patient-dashboard",
    bg: "#fef3c7",
  },
]
export default function EmptyStateScreen({ navigate, currentScreen }) {
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
              🗂 الحالات الفارغة (Empty States)
            </h1>
            <p className="text-sm mb-6" style={{ color: "#696a76" }}>
              نماذج تفاعلية لحالات انعدام البيانات في بوابة المريض
            </p>

            <div className="grid grid-cols-2 gap-5">
              {emptyStates.map((state) => (
                <div
                  key={state.title}
                  className="rounded-2xl p-8 text-center"
                  style={{
                    background: state.bg,
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <div style={{ fontSize: 52 }}>{state.icon}</div>
                  <h2
                    className="text-lg font-black mt-4 mb-2"
                    style={{ color: "#090c56" }}
                  >
                    {state.title}
                  </h2>
                  <p className="text-sm mb-5" style={{ color: "#696a76" }}>
                    {state.desc}
                  </p>
                  <button
                    onClick={() => navigate(state.actionScreen)}
                    className="px-6 py-2.5 rounded-xl font-bold text-sm"
                    style={{ background: "#090c56", color: "#fff" }}
                  >
                    {state.action}
                  </button>
                </div>
              ))}
            </div>

            {/* New user welcome */}
            <div
              className="rounded-2xl p-8 mt-5 text-center"
              style={{ background: "#090c56" }}
            >
              <div style={{ fontSize: 52 }}>👋</div>
              <h2 className="text-2xl font-black mt-4 mb-2 text-white">
                مرحباً بك في عيادة ابن كثير!
              </h2>
              <p
                className="text-sm mb-6"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                هذه أول مرة لك في المنصة. ابدأ بحجز موعدك الأول مع أحد أطبائنا
                المعتمدين.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => navigate("doctors")}
                  className="px-6 py-3 rounded-xl font-bold"
                  style={{ background: "#ef003d", color: "#fff" }}
                >
                  🔍 ابحث عن طبيب الآن
                </button>
                <button
                  onClick={() => navigate("patient-dashboard")}
                  className="px-6 py-3 rounded-xl font-bold"
                  style={{
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "#fff",
                  }}
                >
                  أكمل ملفي الطبي
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
