import Logo from "./Logo"
import EmergencyBadge from "./EmergencyBadge"
export default function DoctorNavbar({ navigate }) {
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
          <img
            src="https://ui-avatars.com/api/?name=Michael+Chen&background=090c56&color=fff&size=64"
            alt="د. مايكل تشن"
            className="w-9 h-9 rounded-full"
          />
          <div className="leading-tight">
            <div className="text-sm font-bold" style={{ color: "#171827" }}>
              د. مايكل تشن
            </div>
            <div className="text-xs" style={{ color: "#ef003d" }}>
              استشاري أمراض القلب والأوعية الدموية
            </div>
          </div>
        </div>
        <div
          className="mx-2 text-xs px-2 py-1 rounded"
          style={{ background: "#e8f9f0", color: "#12b76a" }}
        >
          ● بالعيادة / متاح للكشف
        </div>
        <EmergencyBadge />
        <button
          className="relative p-2 rounded-lg"
          style={{ color: "#696a76" }}
        >
          🔔
          <span
            className="absolute top-1 right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold"
            style={{ background: "#ef003d", color: "#fff", fontSize: 9 }}
          >
            5
          </span>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("waiting-queue")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold"
          style={{ background: "#ef003d", color: "#fff" }}
        >
          نداء المريض التالي ›
        </button>
        <Logo size={36} subtitle="بوابة الطبيب والعيادة السريرية" />
      </div>
    </nav>
  )
}
