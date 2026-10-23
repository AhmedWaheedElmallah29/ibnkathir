import { LuGlobe } from "react-icons/lu"
import Logo from "./Logo"
import EmergencyBadge from "./EmergencyBadge"

const navLinkClass =
  "relative whitespace-nowrap text-sm font-medium transition-colors duration-200 hover:text-[#D4145A] after:absolute after:right-0 after:-bottom-2 after:h-0.5 after:w-0 after:rounded-full after:bg-[#D4145A] after:transition-all after:duration-300 hover:after:w-full"

export default function PublicNavbar({ navigate }) {
  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between gap-6 border-b border-[#e8e9f0] bg-white/95 px-6 py-3 shadow-sm backdrop-blur-md"
      dir="rtl"
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("login")}
          className="rounded-lg px-4 py-2 text-sm font-semibold text-[#090c56] transition-all duration-200 hover:bg-[#090c56]/5"
        >
          تسجيل الدخول
        </button>

        <button
          onClick={() => navigate("create-account")}
          className="rounded-lg bg-[#090c56] px-4 py-2 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#151b78] hover:shadow-md active:translate-y-0"
        >
          حساب جديد
        </button>

        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-[#696a76] transition-colors duration-200 hover:bg-gray-100 hover:text-[#090c56]"
          aria-label="Change language"
        >
          <LuGlobe size={16} />
          English
        </button>

        <EmergencyBadge />
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={() => navigate("doctors")}
          className={navLinkClass}
          style={{ color: "#171827" }}
        >
          الأطباء
        </button>

        <button
          type="button"
          onClick={() => navigate("doctors")}
          className={navLinkClass}
          style={{ color: "#171827" }}
        >
          التخصصات والعيادات
        </button>

        <button
          type="button"
          onClick={() => navigate("reception-patients")}
          className={navLinkClass}
          style={{ color: "#171827" }}
        >
          بوابة الاستقبال والإدارة
        </button>

        <button
          onClick={() => navigate("homepage")}
          className={navLinkClass}
          style={{ color: "#171827" }}
        >
          الرئيسية
        </button>

        <div className="transition-transform duration-200 hover:scale-[1.03]">
          <Logo size={38} subtitle="بوابتكم الطبية الموثوقة" />
        </div>
      </div>
    </nav>
  )
}
