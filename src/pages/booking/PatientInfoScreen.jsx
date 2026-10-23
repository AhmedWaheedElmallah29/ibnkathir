import { useState } from "react"
import { LuLock } from "react-icons/lu"
import BookingSteps from "@/components/BookingSteps"
import PublicNavbar from "@/components/PublicNavbar"

const emptyForm = {
  name: "",
  phone: "",
  age: "",
  gender: "ذكر",
  complaint: "",
  notes: "",
  isForOther: false,
  otherName: "",
  otherPhone: "",
  otherRelation: "",
}

export default function PatientInfoScreen({
  navigate,
  currentScreen,
  booking,
  updateBooking,
}) {
  // لو المستخدم رجع من صفحة المراجعة، نكمل من البيانات اللي كتبها قبل كده
  const [form, setForm] = useState(() => ({
    ...emptyForm,
    ...(booking?.patient || {}),
  }))
  const [errors, setErrors] = useState({})

  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = "اسم المريض مطلوب"
    if (!form.phone.trim()) errs.phone = "رقم الهاتف مطلوب"
    else if (!/^01\d{9}$/.test(form.phone))
      errs.phone = "أدخل رقم هاتف مصري صحيح (11 رقم يبدأ بـ 01)"
    if (!form.complaint.trim()) errs.complaint = "الشكوى الرئيسية مطلوبة"
    if (form.isForOther && !form.otherName.trim())
      errs.otherName = "اسم صاحب الحجز مطلوب"
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    // حفظ بيانات المريض في الحجز المشترك (ReviewScreen بيقراها من booking.patient)
    updateBooking({ patient: { ...form } })
    navigate("booking-review")
  }

  const inputCls = "w-full px-4 py-3 rounded-xl text-sm"
  const inputStyle = (field) => ({
    border: `1px solid ${errors[field] ? "#ef003d" : "#e8e9f0"}`,
    outline: "none",
    background: "#f9f9fb",
  })

  return (
    <div className="min-h-screen" style={{ background: "#f6f7f9" }} dir="rtl">
      <PublicNavbar navigate={navigate} currentScreen={currentScreen} />

      <div className="max-w-2xl mx-auto px-6 py-8">
        <BookingSteps current={3} />

        <h1
          className="text-xl font-black mb-2 text-center"
          style={{ color: "#090c56" }}
        >
          بيانات المريض
        </h1>
        <p className="text-sm text-center mb-6" style={{ color: "#696a76" }}>
          أدخل بيانات المريض لإتمام الحجز
        </p>

        <form onSubmit={handleSubmit}>
          <div
            className="rounded-2xl p-6 mb-4"
            style={{ background: "#fff", border: "1px solid #e8e9f0" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold" style={{ color: "#090c56" }}>
                هل الحجز لشخص آخر؟
              </h2>
              <button
                type="button"
                onClick={() => set("isForOther", !form.isForOther)}
                className="relative w-12 h-6 rounded-full transition-all"
                style={{ background: form.isForOther ? "#090c56" : "#e8e9f0" }}
              >
                <div
                  className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
                  style={{
                    right: form.isForOther ? 2 : "auto",
                    left: form.isForOther ? "auto" : 2,
                  }}
                />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-semibold mb-1"
                  style={{ color: "#171827" }}
                >
                  اسم المريض الكامل
                </label>
                <input
                  className={inputCls}
                  style={inputStyle("name")}
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="الاسم الرباعي"
                />
                {errors.name && (
                  <p className="text-xs mt-1" style={{ color: "#ef003d" }}>
                    {errors.name}
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
                  className={inputCls}
                  style={inputStyle("phone")}
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="01234567890"
                  dir="ltr"
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
                  العمر
                </label>
                <input
                  type="number"
                  className={inputCls}
                  style={inputStyle("age")}
                  value={form.age}
                  onChange={(e) => set("age", e.target.value)}
                  placeholder="العمر"
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
                  className={inputCls}
                  style={{
                    border: "1px solid #e8e9f0",
                    outline: "none",
                    background: "#f9f9fb",
                  }}
                  value={form.gender}
                  onChange={(e) => set("gender", e.target.value)}
                >
                  <option value="ذكر">ذكر</option>
                  <option value="أنثى">أنثى</option>
                </select>
              </div>

              <div className="col-span-2">
                <label
                  className="block text-sm font-semibold mb-1"
                  style={{ color: "#171827" }}
                >
                  الشكوى الرئيسية
                </label>
                <textarea
                  className={inputCls}
                  style={{
                    ...inputStyle("complaint"),
                    resize: "none",
                    height: 80,
                  }}
                  value={form.complaint}
                  onChange={(e) => set("complaint", e.target.value)}
                  placeholder="اكتب الشكوى الرئيسية والأعراض بالتفصيل..."
                />
                {errors.complaint && (
                  <p className="text-xs mt-1" style={{ color: "#ef003d" }}>
                    {errors.complaint}
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <label
                  className="block text-sm font-semibold mb-1"
                  style={{ color: "#171827" }}
                >
                  ملاحظات إضافية{" "}
                  <span style={{ color: "#9b9caa" }}>(اختياري)</span>
                </label>
                <textarea
                  className={inputCls}
                  style={{
                    border: "1px solid #e8e9f0",
                    outline: "none",
                    background: "#f9f9fb",
                    resize: "none",
                    height: 60,
                  }}
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder="حساسية من أدوية، أمراض مزمنة، أدوية حالية..."
                />
              </div>
            </div>

            {form.isForOther && (
              <div
                className="mt-4 p-4 rounded-xl"
                style={{ background: "#eff0ff" }}
              >
                <p
                  className="text-sm font-bold mb-3"
                  style={{ color: "#090c56" }}
                >
                  بيانات صاحب الحجز
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      className={inputCls}
                      style={inputStyle("otherName")}
                      value={form.otherName}
                      onChange={(e) => set("otherName", e.target.value)}
                      placeholder="اسمك الكامل"
                    />
                    {errors.otherName && (
                      <p className="text-xs mt-1" style={{ color: "#ef003d" }}>
                        {errors.otherName}
                      </p>
                    )}
                  </div>
                  <input
                    className={inputCls}
                    style={inputStyle("")}
                    value={form.otherPhone}
                    onChange={(e) => set("otherPhone", e.target.value)}
                    placeholder="رقم هاتفك"
                    dir="ltr"
                  />
                  <input
                    className={inputCls}
                    style={inputStyle("")}
                    value={form.otherRelation}
                    onChange={(e) => set("otherRelation", e.target.value)}
                    placeholder="صلة القرابة"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Privacy note */}
          <div
            className="p-3 rounded-xl mb-4"
            style={{ background: "#eff0ff", border: "1px solid #d0d3f5" }}
          >
            <p
              className="flex items-center gap-2 text-xs"
              style={{ color: "#090c56" }}
            >
              <LuLock size={16} className="flex-shrink-0" />
              <span>
                <strong>سرية البيانات الطبية:</strong> جميع بياناتك مشفرة ومحمية
                وفق معايير HIPAA. لن يتم مشاركتها مع أي جهة ثالثة.
              </span>
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("booking-visit-type")}
              className="flex-1 py-3.5 rounded-xl font-semibold text-sm"
              style={{ border: "1px solid #e8e9f0", color: "#696a76" }}
            >
              السابق
            </button>
            <button
              type="submit"
              className="py-3.5 px-8 rounded-xl font-bold text-sm"
              style={{ background: "#ef003d", color: "#fff", flex: 2 }}
            >
              التالي: المراجعة ←
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
