import { useState } from "react"
import Logo from "@/components/Logo"
export default function ResetPasswordScreen({ navigate }) {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [step, setStep] = useState("verify")
  const [errors, setErrors] = useState({})
  function handleVerify(e) {
    e.preventDefault()
    if (code.join("").length < 6) {
      setErrors({ code: "أدخل الرمز المكون من 6 أرقام" })
      return
    }
    setErrors({})
    setStep("reset")
  }
  function handleReset(e) {
    e.preventDefault()
    const errs = {}
    if (!password || password.length < 8)
      errs.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل"
    if (password !== confirm) errs.confirm = "كلمتا المرور غير متطابقتين"
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setStep("done")
    setTimeout(() => navigate("login"), 2500)
  }
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        background:
          "linear-gradient(135deg, #fff0f3 0%, #f6f7f9 60%, #f0f0ff 100%)",
      }}
      dir="rtl"
    >
      <div className="mb-8">
        <Logo size={48} subtitle="بوابتكم الطبية الموثوقة" />
      </div>

      <div
        className="w-full max-w-md rounded-2xl p-8 shadow-lg"
        style={{ background: "#fff", border: "1px solid #e8e9f0" }}
      >
        {step === "verify" && (
          <>
            <div className="flex justify-center mb-4">
              <span style={{ fontSize: 48 }}>🔢</span>
            </div>
            <h1
              className="text-xl font-black text-center mb-2"
              style={{ color: "#090c56" }}
            >
              أدخل رمز التحقق
            </h1>
            <p
              className="text-sm text-center mb-6"
              style={{ color: "#696a76" }}
            >
              تم إرسال رمز التحقق المكون من 6 أرقام إلى بريدك الإلكتروني
            </p>
            <form onSubmit={handleVerify} className="space-y-5">
              <div className="flex justify-center gap-2">
                {code.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newCode = [...code]
                      newCode[i] = e.target.value.replace(/\D/, "")
                      setCode(newCode)
                    }}
                    className="w-12 h-12 text-center text-xl font-bold rounded-xl"
                    style={{ border: "2px solid #e8e9f0", outline: "none" }}
                  />
                ))}
              </div>
              {errors.code && (
                <p className="text-xs text-center" style={{ color: "#ef003d" }}>
                  {errors.code}
                </p>
              )}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold"
                style={{ background: "#090c56", color: "#fff" }}
              >
                التحقق من الرمز
              </button>
              <button
                type="button"
                className="w-full text-sm"
                style={{ color: "#ef003d" }}
              >
                إعادة إرسال الرمز (60 ثانية)
              </button>
            </form>
          </>
        )}

        {step === "reset" && (
          <>
            <div className="flex justify-center mb-4">
              <span style={{ fontSize: 48 }}>🔐</span>
            </div>
            <h1
              className="text-xl font-black text-center mb-2"
              style={{ color: "#090c56" }}
            >
              إعادة ضبط كلمة المرور
            </h1>
            <p
              className="text-sm text-center mb-6"
              style={{ color: "#696a76" }}
            >
              أدخل كلمة المرور الجديدة الخاصة بك
            </p>
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-semibold mb-1"
                  style={{ color: "#171827" }}
                >
                  كلمة المرور الجديدة
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm"
                  style={{
                    border: `1px solid ${
                      errors.password ? "#ef003d" : "#e8e9f0"
                    }`,
                    outline: "none",
                    background: "#f9f9fb",
                  }}
                  placeholder="8 أحرف على الأقل"
                />
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
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm"
                  style={{
                    border: `1px solid ${
                      errors.confirm ? "#ef003d" : "#e8e9f0"
                    }`,
                    outline: "none",
                    background: "#f9f9fb",
                  }}
                  placeholder="••••••••"
                />
                {errors.confirm && (
                  <p className="text-xs mt-1" style={{ color: "#ef003d" }}>
                    {errors.confirm}
                  </p>
                )}
              </div>

              <div className="p-3 rounded-xl" style={{ background: "#f9f9fb" }}>
                <p
                  className="text-xs font-semibold mb-2"
                  style={{ color: "#696a76" }}
                >
                  قوة كلمة المرور:
                </p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex-1 h-1.5 rounded-full"
                      style={{
                        background:
                          password.length >= i * 2 ? "#12b76a" : "#e8e9f0",
                      }}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold"
                style={{ background: "#ef003d", color: "#fff" }}
              >
                حفظ كلمة المرور الجديدة
              </button>
            </form>
          </>
        )}

        {step === "done" && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✅</div>
            <h1
              className="text-xl font-black mb-2"
              style={{ color: "#090c56" }}
            >
              تم تغيير كلمة المرور!
            </h1>
            <p className="text-sm" style={{ color: "#696a76" }}>
              جارٍ التوجيه لصفحة تسجيل الدخول...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
