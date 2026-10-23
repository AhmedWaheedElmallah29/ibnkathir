import { useState } from "react"
import Logo from "@/components/Logo"
import EmergencyBadge from "@/components/EmergencyBadge"
export default function ForgotPasswordScreen({ navigate }) {
  const [method, setMethod] = useState("email")
  const [email, setEmail] = useState("doctor.name@example.com")
  const [phone, setPhone] = useState("")
  const [sent, setSent] = useState(false)
  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => navigate("reset-password"), 2000)
  }
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, #fff0f3 0%, #f6f7f9 60%, #f0f0ff 100%)",
      }}
      dir="rtl"
    >
      <div
        className="flex items-center justify-between px-8 py-4"
        style={{
          borderBottom: "1px solid #e8e9f0",
          background: "rgba(255,255,255,0.85)",
        }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("login")}
            className="text-sm"
            style={{ color: "#696a76" }}
          >
            تسجيل الدخول
          </button>
          <button
            onClick={() => navigate("create-account")}
            className="text-sm"
            style={{ color: "#696a76" }}
          >
            حساب جديد
          </button>
          <button className="text-sm" style={{ color: "#696a76" }}>
            🌐 English
          </button>
          <EmergencyBadge />
        </div>
        <Logo size={40} subtitle="بوابتكم الطبية الموثوقة" />
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div
            className="rounded-2xl p-8 shadow-lg"
            style={{ background: "#fff", border: "1px solid #e8e9f0" }}
          >
            <button
              onClick={() => navigate("login")}
              className="flex items-center gap-1 text-sm mb-6"
              style={{ color: "#090c56" }}
            >
              العودة لتسجيل الدخول ←
            </button>

            <div className="flex justify-center mb-5">
              <div className="relative w-20 h-20">
                <div
                  className="w-20 h-20 rounded-full"
                  style={{ background: "#fff0f3" }}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ fontSize: 32 }}
                >
                  🔑
                </div>
                <div
                  className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: "#090c56", fontSize: 14 }}
                >
                  🛡
                </div>
              </div>
            </div>

            <div
              className="text-xs font-semibold text-center mb-2 px-3 py-1.5 rounded-full inline-block"
              style={{ background: "#eff0ff", color: "#090c56" }}
            >
              🛡 بوابة استرداد آمنة ومشفرة
            </div>

            <h1
              className="text-2xl font-black text-center mb-2 mt-2"
              style={{ color: "#090c56" }}
            >
              استعادة كلمة المرور
            </h1>
            <p
              className="text-sm text-center mb-6"
              style={{ color: "#696a76" }}
            >
              أدخل بريدك الإلكتروني المسجل أو رقم هاتفك المحمول وسنرسل لك رابطاً
              أو رمز تحقق لإعادة ضبط كلمة المرور الخاصة بحسابك الطبي.
            </p>

            {/* Method tabs */}
            <div
              className="flex rounded-xl overflow-hidden mb-5"
              style={{ border: "1px solid #e8e9f0" }}
            >
              <button
                onClick={() => setMethod("email")}
                className="flex-1 py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                style={
                  method === "email"
                    ? { background: "#090c56", color: "#fff" }
                    : { background: "#fff", color: "#696a76" }
                }
              >
                ✉️ عبر البريد الإلكتروني (Email)
              </button>
              <button
                onClick={() => setMethod("sms")}
                className="flex-1 py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                style={
                  method === "sms"
                    ? { background: "#090c56", color: "#fff" }
                    : { background: "#fff", color: "#696a76" }
                }
              >
                💬 عبر رسالة قصيرة (SMS)
              </button>
            </div>

            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {method === "email" ? (
                  <div>
                    <label
                      className="block text-sm font-semibold mb-1"
                      style={{ color: "#171827" }}
                    >
                      البريد الإلكتروني المسجل
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm"
                        style={{
                          border: "1px solid #e8e9f0",
                          outline: "none",
                          background: "#f9f9fb",
                        }}
                        placeholder="doctor.name@example.com"
                      />
                      <span
                        className="absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: "#9b9caa" }}
                      >
                        @
                      </span>
                    </div>
                    <p className="text-xs mt-1" style={{ color: "#9b9caa" }}>
                      البريد الإلكتروني المعتمد لتلقي إشعارات الحجوزات والوصفات
                    </p>
                  </div>
                ) : (
                  <div>
                    <label
                      className="block text-sm font-semibold mb-1"
                      style={{ color: "#171827" }}
                    >
                      رقم الهاتف المسجل
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm"
                      style={{
                        border: "1px solid #e8e9f0",
                        outline: "none",
                        background: "#f9f9fb",
                      }}
                      placeholder="01234567890"
                    />
                  </div>
                )}

                <div
                  className="p-3 rounded-xl"
                  style={{ background: "#eff0ff", border: "1px solid #d0d3f5" }}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-base">ℹ️</span>
                    <div>
                      <p
                        className="text-sm font-bold mb-1"
                        style={{ color: "#090c56" }}
                      >
                        تنبيه سرية السجل الطبي
                      </p>
                      <p className="text-xs" style={{ color: "#696a76" }}>
                        تأكد من إدخال نفس البريد أو الهاتف المسجل في ملفك الطبي
                        للوصول السريع لرمز الأمان وحماية خصوصية بياناتك الصحية.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                  style={{ background: "#ef003d", color: "#fff" }}
                >
                  🔗 إرسال رابط التحقق ورمز الأمان
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="text-4xl mb-3">✅</div>
                <p className="font-bold" style={{ color: "#12b76a" }}>
                  تم إرسال رابط الاسترداد!
                </p>
                <p className="text-sm mt-1" style={{ color: "#696a76" }}>
                  جارٍ التوجيه لصفحة إعادة الضبط...
                </p>
              </div>
            )}

            <div
              className="flex items-center justify-center gap-4 mt-5 pt-4 text-xs"
              style={{ borderTop: "1px solid #e8e9f0", color: "#9b9caa" }}
            >
              <span>🔒 تشفير bit-256</span>
              <span>•</span>
              <span>HIPAA معتمد</span>
              <span>•</span>
              <button
                onClick={() => navigate("login")}
                style={{ color: "#ef003d", fontWeight: 600 }}
              >
                تسجيل دخول مباشر
              </button>
            </div>
          </div>

          <p className="text-center text-xs mt-4" style={{ color: "#9b9caa" }}>
            تواجه صعوبة في استرداد حسابك الطبي؟{" "}
            <a href="tel:19011" style={{ color: "#ef003d", fontWeight: 600 }}>
              📞 اتصل بالدعم الفني 19011
            </a>
          </p>
          <p className="text-center text-xs mt-2" style={{ color: "#9b9caa" }}>
            عيادة ابن كثير الطبية المعتمدة للرعاية الصحية وإدارة العيادات
          </p>
        </div>
      </div>
    </div>
  )
}
