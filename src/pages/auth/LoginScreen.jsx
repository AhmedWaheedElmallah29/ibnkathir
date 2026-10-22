import { useState } from "react"
import CenterShell from "../../components/CenterShell.jsx"
import FormField from "../../components/FormField.jsx"
import { focusFirstError, validateLogin } from "../../lib/forms.js"
import { clinicApi } from "../../services/clinicApi.js"

export default function LoginScreen() {
  const [values, setValues] = useState({ username: "", password: "" })
  const [errors, setErrors] = useState({})
  const [pending, setPending] = useState(false)
  const [submitError, setSubmitError] = useState("")

  function update(event) {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
    setErrors((previous) => ({ ...previous, [name]: undefined }))
  }

  async function submit(event) {
    event.preventDefault()
    const nextErrors = validateLogin(values)
    setErrors(nextErrors)
    focusFirstError(nextErrors)
    if (Object.keys(nextErrors).length) return
    setPending(true)
    setSubmitError("")
    try {
      await clinicApi.login({
        username: values.username.trim(),
        password: values.password,
        role: "patient",
      })
      window.location.hash = "/dashboard"
    } catch {
      setSubmitError("تعذر تسجيل الدخول. حاول مرة أخرى.")
    } finally {
      setPending(false)
    }
  }

  return (
    <CenterShell
      title="تسجيل دخول المريض"
      description="تابع مواعيدك وسجلك الطبي ونتائج تحاليلك في مكان واحد"
      badge="م"
      footer={
        <p>
          ليس لديك حساب؟ <a href="#/create-account">إنشاء حساب جديد</a>
        </p>
      }
    >
      <form className="auth-form" onSubmit={submit} noValidate>
        <FormField
          label="البريد الإلكتروني أو اسم المستخدم"
          id="username"
          name="username"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="patient@example.com"
          value={values.username}
          onChange={update}
          error={errors.username}
          required
        />
        <FormField
          label="كلمة المرور"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="أدخل أي ٤ أحرف لتجربة النموذج"
          value={values.password}
          onChange={update}
          error={errors.password}
          required
          minLength={4}
        />
        <a className="forgot-link" href="#/forgot-password">
          نسيت كلمة المرور؟
        </a>
        <button className="primary-button" type="submit" disabled={pending}>
          {pending ? "جارٍ الدخول…" : "تسجيل الدخول"}
        </button>
        <a className="outline-button demo-entry" href="#/dashboard">
          استعراض بوابة المريض التجريبية
        </a>
        {submitError && (
          <p className="field-error" role="alert">
            {submitError}
          </p>
        )}
      </form>
    </CenterShell>
  )
}
