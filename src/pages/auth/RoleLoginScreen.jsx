import { useState } from "react"
import CenterShell from "../../components/CenterShell.jsx"
import FormField from "../../components/FormField.jsx"
import { focusFirstError, validateLogin } from "../../lib/forms.js"
import { clinicApi } from "../../services/clinicApi.js"

const roles = { reception: "الاستقبال", doctor: "الطبيب", admin: "الإدارة" }

export default function RoleLoginScreen() {
  const [role, setRole] = useState("reception")
  const [values, setValues] = useState({ username: "", password: "" })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState("")
  const [pending, setPending] = useState(false)
  function update(event) {
    setValues({ ...values, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: undefined })
    setStatus("")
  }
  async function submit(event) {
    event.preventDefault()
    const nextErrors = validateLogin(values)
    setErrors(nextErrors)
    focusFirstError(nextErrors)
    if (Object.keys(nextErrors).length) return
    setPending(true)
    try {
      await clinicApi.login({ ...values, role })
      setStatus(
        `تمت معاينة دخول ${roles[role]}. شاشات إدارة الفريق خارج نطاق نسخة المريض الحالية.`,
      )
    } catch {
      setStatus("تعذر إكمال الطلب. حاول مرة أخرى.")
    } finally {
      setPending(false)
    }
  }
  return (
    <CenterShell
      title={`تسجيل دخول ${roles[role]}`}
      description="بوابة فريق المركز الطبي"
      badge={{ reception: "س", doctor: "ط", admin: "إ" }[role]}
      footer={
        <p>
          <a href="#/login">العودة إلى تسجيل دخول المريض</a>
        </p>
      }
    >
      <form className="auth-form" onSubmit={submit} noValidate>
        <div className="form-field">
          <label htmlFor="role">الدور الوظيفي</label>
          <select
            className="auth-select"
            id="role"
            value={role}
            onChange={(event) => {
              setRole(event.target.value)
              setStatus("")
            }}
          >
            {Object.entries(roles).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <FormField
          label="البريد الإلكتروني أو اسم المستخدم"
          id="username"
          name="username"
          autoComplete="username"
          value={values.username}
          onChange={update}
          error={errors.username}
          placeholder="أدخل البريد الإلكتروني أو اسم المستخدم"
          required
        />
        <FormField
          label="كلمة المرور"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={values.password}
          onChange={update}
          error={errors.password}
          placeholder="أدخل أي ٤ أحرف لتجربة النموذج"
          required
        />
        <a className="forgot-link" href="#/forgot-password">
          نسيت كلمة المرور؟
        </a>
        <button className="primary-button" disabled={pending} type="submit">
          {pending ? "جارٍ التحقق…" : "تسجيل الدخول"}
        </button>
        {status && (
          <p className="form-notice" role="status">
            {status}
          </p>
        )}
      </form>
    </CenterShell>
  )
}
