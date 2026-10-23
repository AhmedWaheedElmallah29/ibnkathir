import { useState } from "react"
import BookingSteps from "@/components/BookingSteps"
import PublicNavbar from "@/components/PublicNavbar"
export default function PaymentScreen({ navigate, currentScreen }) {
  const [method, setMethod] = useState("card")
  const [cardNum, setCardNum] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardName, setCardName] = useState("")
  const [errors, setErrors] = useState({})
  function formatCard(v) {
    return v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim()
  }
  function formatExpiry(v) {
    return v
      .replace(/\D/g, "")
      .slice(0, 4)
      .replace(/^(\d{2})/, "$1/")
  }
  function handleSubmit(e) {
    e.preventDefault()
    if (method === "card") {
      const errs = {}
      if (cardNum.replace(/\s/g, "").length < 16)
        errs.cardNum = "رقم البطاقة غير مكتمل"
      if (!expiry || expiry.length < 5) errs.expiry = "تاريخ انتهاء غير صحيح"
      if (!cvv || cvv.length < 3) errs.cvv = "CVV غير صحيح"
      if (!cardName) errs.cardName = "اسم حامل البطاقة مطلوب"
      if (Object.keys(errs).length) {
        setErrors(errs)
        return
      }
    }
    navigate("booking-review")
  }
  const breakdown = [
    { label: "رسوم الكشف الاستشاري", amount: 350 },
    { label: "ضريبة القيمة المضافة (14%)", amount: 49 },
    { label: "رسوم الحجز الإداري", amount: 20 },
  ]
  const total = breakdown.reduce((s, i) => s + i.amount, 0)
  return (
    <div className="min-h-screen" style={{ background: "#f6f7f9" }} dir="rtl">
      <PublicNavbar navigate={navigate} currentScreen={currentScreen} />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <BookingSteps current={4} />

        <h1
          className="text-xl font-black mb-6 text-center"
          style={{ color: "#090c56" }}
        >
          إتمام عملية السداد
        </h1>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            {/* Payment method */}
            <div
              className="rounded-2xl p-5 mb-4"
              style={{ background: "#fff", border: "1px solid #e8e9f0" }}
            >
              <h2 className="font-bold mb-4" style={{ color: "#090c56" }}>
                طريقة الدفع
              </h2>
              <div className="flex gap-3 mb-5">
                {[
                  { id: "card", icon: "💳", label: "بطاقة ائتمانية" },
                  { id: "cash", icon: "💵", label: "نقداً في العيادة" },
                  { id: "insurance", icon: "🏥", label: "تأمين صحي" },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className="flex-1 py-3 rounded-xl flex flex-col items-center gap-1 text-sm font-semibold transition-all"
                    style={
                      method === m.id
                        ? { background: "#090c56", color: "#fff" }
                        : { border: "1px solid #e8e9f0", color: "#696a76" }
                    }
                  >
                    <span style={{ fontSize: 22 }}>{m.icon}</span>
                    {m.label}
                  </button>
                ))}
              </div>

              {method === "card" && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-semibold mb-1"
                      style={{ color: "#171827" }}
                    >
                      رقم البطاقة
                    </label>
                    <input
                      className="w-full px-4 py-3 rounded-xl text-sm font-mono"
                      style={{
                        border: `1px solid ${
                          errors.cardNum ? "#ef003d" : "#e8e9f0"
                        }`,
                        outline: "none",
                        background: "#f9f9fb",
                      }}
                      value={cardNum}
                      onChange={(e) => setCardNum(formatCard(e.target.value))}
                      placeholder="0000 0000 0000 0000"
                    />
                    {errors.cardNum && (
                      <p className="text-xs mt-1" style={{ color: "#ef003d" }}>
                        {errors.cardNum}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label
                        className="block text-sm font-semibold mb-1"
                        style={{ color: "#171827" }}
                      >
                        اسم حامل البطاقة
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-xl text-sm"
                        style={{
                          border: `1px solid ${
                            errors.cardName ? "#ef003d" : "#e8e9f0"
                          }`,
                          outline: "none",
                          background: "#f9f9fb",
                        }}
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="الاسم كما في البطاقة"
                      />
                      {errors.cardName && (
                        <p
                          className="text-xs mt-1"
                          style={{ color: "#ef003d" }}
                        >
                          {errors.cardName}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label
                          className="block text-xs font-semibold mb-1"
                          style={{ color: "#171827" }}
                        >
                          تاريخ الانتهاء
                        </label>
                        <input
                          className="w-full px-3 py-3 rounded-xl text-sm text-center"
                          style={{
                            border: `1px solid ${
                              errors.expiry ? "#ef003d" : "#e8e9f0"
                            }`,
                            outline: "none",
                            background: "#f9f9fb",
                          }}
                          value={expiry}
                          onChange={(e) =>
                            setExpiry(formatExpiry(e.target.value))
                          }
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label
                          className="block text-xs font-semibold mb-1"
                          style={{ color: "#171827" }}
                        >
                          CVV
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-3 rounded-xl text-sm text-center"
                          style={{
                            border: `1px solid ${
                              errors.cvv ? "#ef003d" : "#e8e9f0"
                            }`,
                            outline: "none",
                            background: "#f9f9fb",
                          }}
                          value={cvv}
                          onChange={(e) =>
                            setCvv(e.target.value.replace(/\D/, "").slice(0, 4))
                          }
                          placeholder="•••"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="p-3 rounded-xl flex items-center gap-2"
                    style={{ background: "#e8f9f0" }}
                  >
                    <span>🔒</span>
                    <span className="text-xs" style={{ color: "#12b76a" }}>
                      مدفوعاتك مشفرة بمعيار SSL-256 — بيانات بطاقتك لن تُحفظ
                    </span>
                  </div>
                </form>
              )}

              {method === "cash" && (
                <div
                  className="p-4 rounded-xl"
                  style={{ background: "#fff0f3", border: "1px solid #ffd6e0" }}
                >
                  <p
                    className="font-semibold mb-2"
                    style={{ color: "#090c56" }}
                  >
                    السداد نقداً في العيادة
                  </p>
                  <p className="text-sm" style={{ color: "#696a76" }}>
                    سيتم تأكيد حجزك فوراً. يُرجى دفع المبلغ عند الوصول للعيادة.
                    إجمالي المبلغ:{" "}
                    <strong style={{ color: "#090c56" }}>{total} جنيه</strong>
                  </p>
                </div>
              )}

              {method === "insurance" && (
                <div
                  className="p-4 rounded-xl space-y-3"
                  style={{ background: "#f9f9fb" }}
                >
                  <div>
                    <label
                      className="block text-sm font-semibold mb-1"
                      style={{ color: "#171827" }}
                    >
                      شركة التأمين
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-xl text-sm"
                      style={{
                        border: "1px solid #e8e9f0",
                        outline: "none",
                        background: "#fff",
                      }}
                    >
                      <option>Bupa Egypt</option>
                      <option>MetLife</option>
                      <option>AXA Egypt</option>
                      <option>GIG Insurance</option>
                    </select>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-semibold mb-1"
                      style={{ color: "#171827" }}
                    >
                      رقم وثيقة التأمين
                    </label>
                    <input
                      className="w-full px-4 py-3 rounded-xl text-sm"
                      style={{
                        border: "1px solid #e8e9f0",
                        outline: "none",
                        background: "#fff",
                      }}
                      placeholder="رقم الوثيقة"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate("booking-patient-info")}
                className="flex-1 py-3.5 rounded-xl font-semibold text-sm"
                style={{ border: "1px solid #e8e9f0", color: "#696a76" }}
              >
                السابق
              </button>
              <button
                onClick={
                  method === "card"
                    ? handleSubmit
                    : () => navigate("booking-review")
                }
                className="py-3.5 px-8 rounded-xl font-bold text-sm"
                style={{ background: "#ef003d", color: "#fff", flex: 2 }}
              >
                التالي: مراجعة الحجز ←
              </button>
            </div>
          </div>

          {/* Summary */}
          <div
            className="rounded-2xl p-5 h-fit"
            style={{ background: "#fff", border: "1px solid #e8e9f0" }}
          >
            <h3 className="font-bold mb-3" style={{ color: "#090c56" }}>
              ملخص الحجز
            </h3>
            <div className="text-sm mb-4" style={{ color: "#696a76" }}>
              <div className="font-semibold mb-1" style={{ color: "#090c56" }}>
                د. مايكل تشن
              </div>
              <div>الأربعاء، 30 أكتوبر 2024</div>
              <div>10:30 صباحاً</div>
              <div style={{ color: "#12b76a" }}>● زيارة في العيادة</div>
            </div>

            <div
              className="space-y-2 mb-4 pt-4"
              style={{ borderTop: "1px solid #e8e9f0" }}
            >
              {breakdown.map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span style={{ color: "#171827" }}>
                    {item.amount.toFixed(2)} جنيه
                  </span>
                  <span style={{ color: "#696a76" }}>{item.label}</span>
                </div>
              ))}
            </div>

            <div
              className="flex justify-between font-bold pt-3"
              style={{ borderTop: "2px solid #090c56" }}
            >
              <span style={{ color: "#090c56", fontSize: 18 }}>
                {total} جنيه
              </span>
              <span style={{ color: "#090c56" }}>الإجمالي</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
