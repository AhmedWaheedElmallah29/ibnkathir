import DoctorNavbar from "@/components/DoctorNavbar"
import DoctorSidebar from "@/components/DoctorSidebar"
const errorTypes = [
  {
    code: "404",
    title: "الصفحة غير موجودة",
    desc: "المحتوى الذي تبحث عنه غير متاح أو تم حذفه",
    icon: "🔍",
    bg: "#fff0f3",
    color: "#ef003d",
  },
  {
    code: "500",
    title: "خطأ في الخادم",
    desc: "حدث خطأ داخلي في النظام، يُرجى المحاولة لاحقاً",
    icon: "⚠️",
    bg: "#fef3c7",
    color: "#f79009",
  },
  {
    code: "403",
    title: "وصول مقيد",
    desc: "ليس لديك صلاحية للوصول لهذه البيانات أو الصفحة",
    icon: "🔒",
    bg: "#eff0ff",
    color: "#090c56",
  },
  {
    code: "Timeout",
    title: "انتهت مهلة الاتصال",
    desc: "استغرقت العملية وقتاً أطول من المتوقع، تحقق من الاتصال",
    icon: "⏱️",
    bg: "#e8f9f0",
    color: "#12b76a",
  },
]
export default function ErrorScreen({ navigate, currentScreen }) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#f6f7f9" }}
      dir="rtl"
    >
      <DoctorNavbar navigate={navigate} />
      <div className="flex flex-1">
        <DoctorSidebar navigate={navigate} active={currentScreen} />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <h1
              className="text-2xl font-black mb-2"
              style={{ color: "#090c56" }}
            >
              ⚠️ حالات الأخطاء والإشعارات الطبية
            </h1>
            <p className="text-sm mb-6" style={{ color: "#696a76" }}>
              نماذج لحالات الخطأ المختلفة في عيادة ابن كثير مع إرشادات الاسترداد
            </p>

            {/* Primary error */}
            <div
              className="rounded-2xl p-8 mb-5 text-center"
              style={{ background: "#fff", border: "2px solid #ef003d" }}
            >
              <div style={{ fontSize: 64 }}>❌</div>
              <h2
                className="text-2xl font-black mt-4 mb-2"
                style={{ color: "#090c56" }}
              >
                عذراً، حدث خطأ في التحميل
              </h2>
              <p className="text-sm mb-2" style={{ color: "#696a76" }}>
                لم نتمكن من تحميل بيانات المريض. يُرجى التحقق من الاتصال
                بالإنترنت والمحاولة مرة أخرى.
              </p>
              <div
                className="flex items-center justify-center gap-2 mb-5 text-xs"
                style={{ color: "#9b9caa" }}
              >
                <span>كود الخطأ: ERR-2024-TIMEOUT-CLINIC</span>
                <span>•</span>
                <span>وقت الحدوث: 11:47 ص</span>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => navigate("doctor-dashboard")}
                  className="px-6 py-3 rounded-xl font-bold"
                  style={{ background: "#090c56", color: "#fff" }}
                >
                  🔄 إعادة المحاولة
                </button>
                <button
                  onClick={() => navigate("doctor-schedule")}
                  className="px-6 py-3 rounded-xl font-semibold"
                  style={{ border: "1px solid #e8e9f0", color: "#696a76" }}
                >
                  مراجعة المواعيد
                </button>
              </div>
            </div>

            {/* Error type cards */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              {errorTypes.map((err) => (
                <div
                  key={err.code}
                  className="rounded-2xl p-5"
                  style={{
                    background: err.bg,
                    border: `1px solid ${err.color}30`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span style={{ fontSize: 32 }}>{err.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="font-black"
                          style={{ color: err.color }}
                        >
                          {err.code}
                        </span>
                        <span
                          className="font-bold text-sm"
                          style={{ color: "#090c56" }}
                        >
                          {err.title}
                        </span>
                      </div>
                      <p className="text-sm" style={{ color: "#696a76" }}>
                        {err.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Connection check */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "#fff", border: "1px solid #e8e9f0" }}
            >
              <h2 className="font-bold mb-4" style={{ color: "#090c56" }}>
                قائمة فحص الاتصال والنظام
              </h2>
              <div className="space-y-2">
                {[
                  { check: "الاتصال بالإنترنت", status: true },
                  { check: "قاعدة البيانات الطبية", status: true },
                  { check: "خدمة المصادقة والحسابات", status: true },
                  { check: "خدمة الإشعارات والتنبيهات", status: false },
                  { check: "خادم التقارير والفواتير", status: false },
                ].map((item) => (
                  <div
                    key={item.check}
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: "#f9f9fb" }}
                  >
                    <span className="text-sm" style={{ color: "#171827" }}>
                      {item.check}
                    </span>
                    <span
                      className="text-xs px-2 py-1 rounded-full font-bold"
                      style={{
                        background: item.status ? "#e8f9f0" : "#fff0f3",
                        color: item.status ? "#12b76a" : "#ef003d",
                      }}
                    >
                      {item.status ? "✓ متصل" : "✗ منقطع"}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="mt-4 p-3 rounded-xl flex items-center gap-3"
                style={{ background: "#fff0f3" }}
              >
                <span style={{ fontSize: 24 }}>📞</span>
                <div>
                  <div
                    className="font-bold text-sm"
                    style={{ color: "#ef003d" }}
                  >
                    للدعم الفني الفوري
                  </div>
                  <div className="text-sm" style={{ color: "#090c56" }}>
                    اتصل بـ 02-3344-9988 أو أرسل بريداً إلكترونياً لـ
                    support@altibbaa.com
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
