import { useState } from "react"
import Logo from "@/components/Logo"
import { LuLock, LuUser, LuEye, LuEyeOff, LuShieldCheck } from "react-icons/lu"

export default function LoginScreen({ navigate, role }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [errors, setErrors] = useState({})

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!username.trim()) {
      nextErrors.username = "الرجاء إدخال البريد الإلكتروني أو اسم المستخدم"
    }
    if (!password) {
      nextErrors.password = "الرجاء إدخال كلمة المرور"
    } else if (password.length < 4) {
      nextErrors.password = "كلمة المرور يجب أن لا تقل عن 4 أحرف"
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      const val = username.toLowerCase().trim()
      if (val.includes("admin") || val.includes("مدير") || val.includes("إدارة")) {
        navigate("admin-dashboard")
      } else if (
        val.includes("doctor") ||
        val.includes("طبيب") ||
        val.includes("دكتور")
      ) {
        navigate("center-doctor-dashboard")
      } else if (val.includes("patient") || val.includes("مريض")) {
        navigate("patient-dashboard")
      } else if (role === "admin") {
        navigate("admin-dashboard")
      } else if (role === "doctor") {
        navigate("center-doctor-dashboard")
      } else if (role === "patient") {
        navigate("patient-dashboard")
      } else {
        // Default staff portal (Reception)
        navigate("reception-dashboard")
      }
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center p-5"
      dir="rtl"
      style={{
        background: "linear-gradient(135deg, #fff0f3, #f6f7f9 52%, #eff0ff)",
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Logo size={54} subtitle="نظام إدارة المركز الطبي" />
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-[#e8e9f0] bg-white p-7 shadow-xl shadow-[#090c56]/5">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[#090c56] text-white shadow-md shadow-[#090c56]/20">
              <LuLock className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-black text-[#090c56]">تسجيل الدخول</h1>
            <p className="mt-2 text-sm leading-6 text-[#696a76]">
              مرحباً بك في نظام إدارة عيادة ابن كثير الطبية
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Username / Email Field */}
            <div>
              <label className="block text-sm font-bold text-[#171827]">
                البريد الإلكتروني أو اسم المستخدم
              </label>
              <div className="relative mt-2">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="أدخل البريد الإلكتروني أو اسم المستخدم"
                  className={`w-full rounded-xl border bg-[#f9f9fb] px-4 py-3 pl-10 text-sm font-normal outline-none transition-all focus:border-[#090c56] focus:bg-white ${
                    errors.username ? "border-[#ef003d]" : "border-[#e8e9f0]"
                  }`}
                />
                <LuUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#9b9caa]" />
              </div>
              {errors.username && (
                <span className="mt-1 block text-xs font-semibold text-[#ef003d]">
                  {errors.username}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-[#171827]">
                  كلمة المرور
                </label>
                <button
                  type="button"
                  onClick={() => navigate("forgot-password")}
                  className="text-xs font-semibold text-[#ef003d] transition-colors hover:underline"
                >
                  نسيت كلمة المرور؟
                </button>
              </div>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  className={`w-full rounded-xl border bg-[#f9f9fb] px-4 py-3 pl-10 text-sm font-normal outline-none transition-all focus:border-[#090c56] focus:bg-white ${
                    errors.password ? "border-[#ef003d]" : "border-[#e8e9f0]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#9b9caa] transition-colors hover:text-[#090c56]"
                  aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                >
                  {showPassword ? <LuEyeOff /> : <LuEye />}
                </button>
              </div>
              {errors.password && (
                <span className="mt-1 block text-xs font-semibold text-[#ef003d]">
                  {errors.password}
                </span>
              )}
            </div>

            {/* Remember Me */}
            <label className="flex cursor-pointer items-center gap-2 pt-1">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#090c56] focus:ring-[#090c56]"
              />
              <span className="text-xs font-semibold text-[#696a76]">
                تذكر بيانات الدخول على هذا الجهاز
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-[#ef003d] py-3.5 text-sm font-bold text-white shadow-md shadow-[#ef003d]/20 transition-all hover:bg-[#d40035] hover:shadow-lg active:scale-[0.99]"
            >
              تسجيل الدخول
            </button>
          </form>

          {/* Create Account Link */}
          <div className="mt-6 border-t border-[#e8e9f0] pt-4 text-center">
            <p className="text-xs text-[#696a76]">
              ليس لديك حساب؟{" "}
              <button
                type="button"
                onClick={() => navigate("create-account")}
                className="font-bold text-[#090c56] hover:underline"
              >
                إنشاء حساب جديد
              </button>
            </p>
          </div>
        </div>

        {/* Security badge footer */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#9b9caa]">
          <LuShieldCheck className="text-sm text-green-600" />
          <span>اتصال آمن ومشفّر 256-bit • عيادة ابن كثير</span>
        </div>
      </div>
    </div>
  )
}
