import { useState } from "react"
import CenterShell from "../../components/CenterShell.jsx"
import FormField from "../../components/FormField.jsx"
import { emailPattern } from "../../lib/forms.js"
import { clinicApi } from "../../services/clinicApi.js"

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [sent, setSent] = useState(false)
  const [pending, setPending] = useState(false)
  async function submit(event) {
    event.preventDefault()
    if (!emailPattern.test(email.trim())) {
      setError("أدخل بريدًا إلكترونيًا صحيحًا.")
      document.getElementById("email")?.focus()
      return
    }
    setPending(true)
    try {
      await clinicApi.requestPasswordReset(email.trim())
      setSent(true)
    } catch {
      setError("تعذر إكمال الطلب. حاول مرة أخرى.")
    } finally {
      setPending(false)
    }
  }
  return (
    <CenterShell
      title="نسيت كلمة المرور؟"
      description="أدخل بريدك الإلكتروني لاستعادة الوصول إلى حسابك"
      badge="؟"
      footer={
        <p>
          <a href="#/login">العودة لتسجيل الدخول</a>
        </p>
      }
    >
      <form className="auth-form" onSubmit={submit} noValidate>
        <FormField
          label="البريد الإلكتروني"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            setError("")
            setSent(false)
          }}
          error={error}
          placeholder="example@email.com"
          required
        />
        <button className="primary-button" disabled={pending} type="submit">
          {pending ? "جارٍ التحقق…" : "إرسال رابط الاستعادة"}
        </button>
      </form>
      {sent && (
        <div className="recovery-result">
          <p className="form-success" role="status">
            تمت معاينة طلب الاستعادة. لم تُرسل رسالة بريد في هذه النسخة
            التجريبية.
          </p>
          <a className="outline-button" href="#/reset-password">
            معاينة إعادة تعيين كلمة المرور
          </a>
        </div>
      )}
    </CenterShell>
  )
}
