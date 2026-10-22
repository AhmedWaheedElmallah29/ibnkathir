import { useState } from "react"
import CenterShell from "../../components/CenterShell.jsx"
import FormField from "../../components/FormField.jsx"
import { focusFirstError } from "../../lib/forms.js"
import { clinicApi } from "../../services/clinicApi.js"

export default function ResetPasswordScreen() {
  const [values, setValues] = useState({ password: "", confirmPassword: "" })
  const [errors, setErrors] = useState({})
  const [complete, setComplete] = useState(false)
  const [pending, setPending] = useState(false)
  const [submitError, setSubmitError] = useState("")
  function update(event) {
    setValues({ ...values, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: undefined })
    setComplete(false)
  }
  async function submit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (values.password.length < 8)
      nextErrors.password = "أدخل كلمة مرور من ٨ أحرف على الأقل."
    if (!values.confirmPassword || values.password !== values.confirmPassword)
      nextErrors.confirmPassword = "تأكد من تطابق كلمتي المرور."
    setErrors(nextErrors)
    focusFirstError(nextErrors)
    if (Object.keys(nextErrors).length) return
    setPending(true)
    setSubmitError("")
    try {
      const token = new URLSearchParams(window.location.search).get("token")
      await clinicApi.resetPassword({ password: values.password, token })
      setComplete(true)
      setValues({ password: "", confirmPassword: "" })
    } catch {
      setSubmitError("تعذر إكمال الطلب. حاول مرة أخرى.")
    } finally {
      setPending(false)
    }
  }
  return (
    <CenterShell
      title="إعادة تعيين كلمة المرور"
      description="اختر كلمة مرور جديدة لحسابك"
      badge="↻"
      footer={
        <p>
          <a href="#/login">العودة لتسجيل الدخول</a>
        </p>
      }
    >
      <form className="auth-form" onSubmit={submit} noValidate>
        <FormField
          label="كلمة المرور الجديدة"
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="٨ أحرف على الأقل"
          value={values.password}
          onChange={update}
          error={errors.password}
          required
        />
        <FormField
          label="تأكيد كلمة المرور"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="أعد كتابة كلمة المرور الجديدة"
          value={values.confirmPassword}
          onChange={update}
          error={errors.confirmPassword}
          required
        />
        <button className="primary-button" disabled={pending} type="submit">
          {pending ? "جارٍ التحقق…" : "حفظ كلمة المرور"}
        </button>
        {submitError && (
          <p className="field-error" role="alert">
            {submitError}
          </p>
        )}
        {complete && (
          <p className="form-success" role="status">
            تم التحقق من كلمة المرور الجديدة. لم يتم تغيير كلمة مرور فعلية في
            النسخة التجريبية.
          </p>
        )}
      </form>
    </CenterShell>
  )
}
