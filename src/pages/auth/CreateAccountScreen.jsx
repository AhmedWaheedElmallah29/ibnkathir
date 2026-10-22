import { useState } from "react"
import CenterShell from "../../components/CenterShell.jsx"
import FormField from "../../components/FormField.jsx"
import { focusFirstError, validateCreateAccount } from "../../lib/forms.js"
import { clinicApi } from "../../services/clinicApi.js"

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
}

export default function CreateAccountScreen() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [complete, setComplete] = useState(false)
  const [pending, setPending] = useState(false)
  const [submitError, setSubmitError] = useState("")

  function update(event) {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
    setErrors((previous) => ({ ...previous, [name]: undefined }))
    setComplete(false)
  }

  async function submit(event) {
    event.preventDefault()
    const nextErrors = validateCreateAccount(values)
    setErrors(nextErrors)
    const valid = Object.keys(nextErrors).length === 0
    focusFirstError(nextErrors)
    if (!valid) return
    setPending(true)
    setSubmitError("")
    try {
      await clinicApi.createAccount({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone,
        password: values.password,
      })
      setComplete(true)
      setValues(initialValues)
    } catch {
      setSubmitError("تعذر إكمال الطلب. حاول مرة أخرى.")
    } finally {
      setPending(false)
    }
  }

  return (
    <CenterShell
      wide
      title="إنشاء حساب جديد"
      description="أدخل بياناتك لإنشاء حساب في عيادة ابن كثير"
      badge={
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <circle cx="10" cy="8" r="3.5" />
          <path
            d="M3.5 20v-2a6.5 6.5 0 0 1 13 0v2M19.5 6v6M16.5 9h6"
            strokeLinecap="round"
          />
        </svg>
      }
      footer={
        <p>
          لديك حساب بالفعل؟ <a href="#/login">تسجيل الدخول</a>
        </p>
      }
    >
      <form className="auth-form" onSubmit={submit} noValidate>
        <FormField
          label="الاسم بالكامل"
          id="fullName"
          name="fullName"
          autoComplete="name"
          placeholder="أدخل اسمك بالكامل"
          value={values.fullName}
          onChange={update}
          error={errors.fullName}
          required
        />
        <FormField
          label="البريد الإلكتروني"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="example@email.com"
          value={values.email}
          onChange={update}
          error={errors.email}
          required
        />
        <FormField
          label="رقم الموبايل"
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="01012345678"
          value={values.phone}
          onChange={update}
          error={errors.phone}
          required
        />
        <FormField
          label="كلمة المرور"
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="أدخل كلمة مرور من ٨ أحرف على الأقل"
          value={values.password}
          onChange={update}
          error={errors.password}
          required
          minLength={8}
        />
        <FormField
          label="تأكيد كلمة المرور"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="أعد كتابة كلمة المرور"
          value={values.confirmPassword}
          onChange={update}
          error={errors.confirmPassword}
          required
        />
        <button className="primary-button" type="submit" disabled={pending}>
          {pending ? "جارٍ التحقق…" : "إنشاء الحساب"}
        </button>
        {submitError && (
          <p className="field-error" role="alert">
            {submitError}
          </p>
        )}
        {complete && (
          <div className="form-success" role="status">
            تم التحقق من البيانات بنجاح. هذه معاينة للواجهة فقط، ولم يتم إنشاء
            حساب فعلي أو حفظ البيانات.
          </div>
        )}
      </form>
    </CenterShell>
  )
}
