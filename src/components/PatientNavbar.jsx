import Logo from "./Logo"
import EmergencyBadge from "./EmergencyBadge"
export default function PatientNavbar({ navigate }) {
  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-5 py-2.5"
      style={{
        background: "#fff",
        borderBottom: "1px solid #e8e9f0",
        boxShadow: "0 1px 8px rgb(0 0 0 / 5%)",
      }}
      dir="rtl"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: "#090c56", color: "#fff" }}
          >
            ع
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold" style={{ color: "#171827" }}>
              عبدالله محمد بن صالح
            </div>
            <div className="text-xs" style={{ color: "#696a76" }}>
              مريض مسجل
            </div>
          </div>
        </div>
        <button
          className="relative p-2 rounded-lg"
          style={{ color: "#696a76" }}
        >
          🔔
          <span
            className="absolute top-1 right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold"
            style={{ background: "#ef003d", color: "#fff", fontSize: 9 }}
          >
            3
          </span>
        </button>
        <EmergencyBadge />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("booking-datetime")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold"
          style={{ background: "#ef003d", color: "#fff" }}
        >
          <span>+</span> احجز موعد جديد
        </button>
        <Logo size={36} subtitle="بوابة المريض الرقمية" />
      </div>
    </nav>
  )
}
