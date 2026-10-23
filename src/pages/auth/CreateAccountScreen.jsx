import { useState } from "react"
import Logo from "@/components/Logo"
import EmergencyBadge from "@/components/EmergencyBadge"
export default function CreateAccountScreen({ navigate }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    nationalId: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "male",
    role: "patient",
    terms: false,
  })
  const [errors, setErrors] = useState({})
  const [showPw, setShowPw] = useState(false)
  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }))
  }
  function handleSubmit(e) {
    e.preventDefault()
    const errs = {}
    if (!form.fullName) errs.fullName = "الاسم مطلوب"
    if (!form.email) errs.email = "البريد الإلكتروني مطلوب"
    if (!form.phone) errs.phone = "رقم الهاتف مطلوب"
    if (!form.password || form.password.length < 8)
      errs.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل"
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = "كلمتا المرور غير متطابقتين"
    if (!form.terms) errs.terms = "يجب الموافقة على الشروط"
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    navigate(form.role === "doctor" ? "doctor-dashboard" : "patient-dashboard")
  }
  const inputStyle = (field) => ({
    border: `1px solid ${errors[field] ? "#ef003d" : "#e8e9f0"}`,
    outline: "none",
    background: "#f9f9fb",
  })
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, #eff0ff 0%, #f6f7f9 50%, #fff0f3 100%)",
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
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("login")}
            className="text-sm font-semibold px-4 py-2 rounded-lg"
            style={{ color: "#090c56" }}
          >
            تسجيل الدخول
          </button>
          <EmergencyBadge />
        </div>
        <Logo size={40} subtitle="بوابتكم الطبية الموثوقة" />
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div
            className="rounded-2xl p-8 shadow-lg"
            style={{ background: "#fff", border: "1px solid #e8e9f0" }}
          >
            <div className="flex justify-center mb-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "#eff0ff" }}
              >
                <span style={{ fontSize: 28 }}>👤</span>
              </div>
            </div>
            <h1
              className="text-2xl font-black text-center mb-1"
              style={{ color: "#090c56" }}
            >
              إنشاء حساب جديد
            </h1>
            <p
              className="text-sm text-center mb-6"
              style={{ color: "#696a76" }}
            >
              انضم إلى عيادة ابن كثير وابدأ رحلتك الصحية
            </p>

            {/* Role toggle */}
            <div
              className="flex rounded-xl overflow-hidden mb-6"
              style={{ border: "1px solid #e8e9f0" }}
            >
              {["patient", "doctor"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => set("role", r)}
                  className="flex-1 py-2.5 text-sm font-bold transition-all"
                  style={
                    form.role === r
                      ? { background: "#090c56", color: "#fff" }
                      : { background: "#fff", color: "#696a76" }
                  }
                >
                  {r === "patient" ? "🧑‍⚕️ مريض" : "👨‍⚕️ طبيب"}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "#171827" }}
                  >
                    الاسم الكامل
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-xl text-sm"
                    style={inputStyle("fullName")}
                    value={form.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                    placeholder="عبدالله محمد بن صالح"
                  />
                  {errors.fullName && (
                    <p className="text-xs mt-1" style={{ color: "#ef003d" }}>
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "#171827" }}
                  >
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl text-sm"
                    style={inputStyle("email")}
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p className="text-xs mt-1" style={{ color: "#ef003d" }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "#171827" }}
                  >
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl text-sm"
                    style={inputStyle("phone")}
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="01234567890"
                  />
                  {errors.phone && (
                    <p className="text-xs mt-1" style={{ color: "#ef003d" }}>
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "#171827" }}
                  >
                    الرقم القومي
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-xl text-sm"
                    style={inputStyle("nationalId")}
                    value={form.nationalId}
                    onChange={(e) => set("nationalId", e.target.value)}
                    placeholder="30001011234567"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "#171827" }}
                  >
                    تاريخ الميلاد
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-xl text-sm"
                    style={inputStyle("dob")}
                    value={form.dob}
                    onChange={(e) => set("dob", e.target.value)}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "#171827" }}
                  >
                    الجنس
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl text-sm"
                    style={{
                      border: "1px solid #e8e9f0",
                      outline: "none",
                      background: "#f9f9fb",
                    }}
                    value={form.gender}
                    onChange={(e) => set("gender", e.target.value)}
                  >
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "#171827" }}
                  >
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <input
                      type={showPw ? "text" : "password"}
                      className="w-full px-4 py-3 rounded-xl text-sm"
                      style={inputStyle("password")}
                      value={form.password}
                      onChange={(e) => set("password", e.target.value)}
                      placeholder="8 أحرف على الأقل"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-xs"
                      style={{ color: "#9b9caa" }}
                    >
                      {showPw ? "إخفاء" : "إظهار"}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs mt-1" style={{ color: "#ef003d" }}>
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "#171827" }}
                  >
                    تأكيد كلمة المرور
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-xl text-sm"
                    style={inputStyle("confirmPassword")}
                    value={form.confirmPassword}
                    onChange={(e) => set("confirmPassword", e.target.value)}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && (
                    <p className="text-xs mt-1" style={{ color: "#ef003d" }}>
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.terms}
                  onChange={(e) => set("terms", e.target.checked)}
                  className="mt-0.5 rounded"
                />
                <span className="text-sm" style={{ color: "#171827" }}>
                  أوافق على{" "}
                  <button
                    type="button"
                    style={{ color: "#090c56", fontWeight: 700 }}
                  >
                    شروط الاستخدام
                  </button>{" "}
                  و
                  <button
                    type="button"
                    style={{ color: "#090c56", fontWeight: 700 }}
                  >
                    سياسة الخصوصية
                  </button>{" "}
                  الخاصة بعيادة ابن كثير
                </span>
              </label>
              {errors.terms && (
                <p className="text-xs" style={{ color: "#ef003d" }}>
                  {errors.terms}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-sm font-bold"
                style={{ background: "#090c56", color: "#fff" }}
              >
                إنشاء الحساب والبدء
              </button>
            </form>

            <p
              className="text-center text-sm mt-4"
              style={{ color: "#696a76" }}
            >
              لديك حساب؟{" "}
              <button
                onClick={() => navigate("login")}
                className="font-bold"
                style={{ color: "#ef003d" }}
              >
                تسجيل الدخول
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
