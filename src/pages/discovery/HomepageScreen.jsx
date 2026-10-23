import { useState } from "react"
import {
  LuHeartPulse,
  LuBone,
  LuBaby,
  LuBrain,
  LuStethoscope,
  LuSmile,
  LuSearch,
  LuStar,
  LuShieldCheck,
  LuLock,
  LuPhone,
} from "react-icons/lu"
import PublicNavbar from "@/components/PublicNavbar"
import Logo from "@/components/Logo"

// filter = نفس قيم التخصصات المستخدمة في DoctorsScreen
const specialties = [
  {
    icon: LuHeartPulse,
    name: "طب وجراحة القلب",
    count: 48,
    label: "استشارية",
    filter: "قلب",
  },
  {
    icon: LuBone,
    name: "جراحة العظام والمفاصل",
    count: 35,
    label: "استشارية",
    filter: "عظام",
  },
  {
    icon: LuBaby,
    name: "طب الأطفال وحديثي الولادة",
    count: 52,
    label: "استشارية",
    filter: "أطفال",
  },
  {
    icon: LuBrain,
    name: "الأمراض الباطنية والجهاز الهضمي",
    count: 41,
    label: "استشارية",
    filter: "باطنة",
  },
  {
    icon: LuStethoscope,
    name: "النساء والتوليد وصحة المرأة",
    count: 29,
    label: "استشارية",
    filter: "نساء",
  },
  {
    icon: LuSmile,
    name: "طب وجراحة الأسنان",
    count: 33,
    label: "استشارية",
    filter: "الكل",
  },
]

// نفس شكل بيانات الأطباء في DoctorsScreen عشان البروفايل والحجز يشتغلوا صح
const doctors = [
  {
    name: "د. مايكل تشن",
    spec: "استشاري أمراض القلب والأوعية الدموية",
    specialty: "قلب",
    rating: 4.9,
    reviews: 189,
    price: 350,
    fees: 350,
    wait: "متاح الآن",
    available: true,
    location: "التجمع الخامس",
    gender: "ذكر",
    tag: "مميز",
  },
  {
    name: "د. سارة المنصور",
    spec: "أمراض الباطنة والجهاز الهضمي",
    specialty: "باطنة",
    rating: 4.8,
    reviews: 132,
    price: 300,
    fees: 300,
    wait: "15 دقيقة",
    available: true,
    location: "مدينة نصر",
    gender: "أنثى",
    tag: "موثوق",
  },
  {
    name: "د. أحمد القحطاني",
    spec: "استشاري جراحة العظام والمفاصل الرياضية",
    specialty: "عظام",
    rating: 4.7,
    reviews: 98,
    price: 300,
    fees: 300,
    wait: "40 دقيقة",
    available: true,
    location: "الإسكندرية",
    gender: "ذكر",
    tag: "",
  },
]

// تحويل اختيار قائمة البحث لقيمة فلتر صفحة الأطباء
const searchSpecialtyToFilter = {
  "أمراض القلب": "قلب",
  "جراحة العظام": "عظام",
  "طب الأطفال": "أطفال",
}

export default function HomepageScreen({
  navigate,
  currentScreen,
  selectDoctor,
  setSpecialtyFilter,
}) {
  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("القاهرة والمحافظات")
  const [specialty, setSpecialty] = useState("جميع التخصصات الطبية")

  function goToDoctors(filter = "الكل") {
    setSpecialtyFilter?.(filter)
    navigate("doctors")
  }

  return (
    <div className="min-h-screen" style={{ background: "#f6f7f9" }} dir="rtl">
      <PublicNavbar navigate={navigate} currentScreen={currentScreen} />

      {/* Hero */}
      <section
        className="py-16 px-6"
        style={{
          background: "linear-gradient(135deg, #090c56 0%, #1a1f8c 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm mb-2 opacity-70" style={{ color: "#ffd6e0" }}>
            الرعاية الصحية الرقمية المعتمدة لعام 2024
          </p>
          <h1
            className="text-4xl font-black mb-3 leading-tight"
            style={{ color: "#fff" }}
          >
            رعايتكم الصحية أولويتنا..
          </h1>
          <h2 className="text-3xl font-black mb-4" style={{ color: "#ef003d" }}>
            احجز موعدك الطبي بكل ثقة وسهولة
          </h2>
          <p
            className="text-sm mb-8 opacity-80"
            style={{ color: "#e8e9f0", maxWidth: 600, margin: "0 auto 2rem" }}
          >
            منصة طبية متكاملة تجمع بين الإتقان والابتكار للتخصصات الطبية، مع
            خبرة قرن من الزمان والتزام صارم بمعايير الرعاية الصحية.
          </p>

          {/* Search card */}
          <div className="bg-white rounded-2xl p-5 shadow-xl max-w-3xl mx-auto">
            <div className="flex gap-3 flex-wrap">
              <div className="flex-1 min-w-48 relative">
                <LuSearch
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: "#9b9caa" }}
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pr-11 pl-4 py-3 rounded-xl text-sm"
                  style={{
                    border: "1px solid #e8e9f0",
                    outline: "none",
                    background: "#f9f9fb",
                  }}
                  placeholder="ابحث بالطبيب، التخصص، أو المرض..."
                />
              </div>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="px-4 py-3 rounded-xl text-sm"
                style={{
                  border: "1px solid #e8e9f0",
                  outline: "none",
                  background: "#f9f9fb",
                  minWidth: 180,
                }}
              >
                <option>القاهرة والمحافظات</option>
                <option>التجمع الخامس</option>
                <option>المعادي</option>
                <option>مدينة نصر</option>
              </select>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="px-4 py-3 rounded-xl text-sm"
                style={{
                  border: "1px solid #e8e9f0",
                  outline: "none",
                  background: "#f9f9fb",
                  minWidth: 200,
                }}
              >
                <option>جميع التخصصات الطبية</option>
                <option>أمراض القلب</option>
                <option>جراحة العظام</option>
                <option>طب الأطفال</option>
              </select>
              <button
                type="button"
                onClick={() =>
                  goToDoctors(searchSpecialtyToFilter[specialty] || "الكل")
                }
                className="px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2"
                style={{ background: "#ef003d", color: "#fff" }}
              >
                <LuSearch size={16} /> ابحث عن طبيب
              </button>
            </div>
            <div
              className="flex items-center gap-4 mt-3 text-xs"
              style={{ color: "#696a76" }}
            >
              <span className="flex items-center gap-1">
                <LuShieldCheck size={14} /> محمي وموثوق 100%
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <LuLock size={14} /> 100% مري وبرمجي
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#090c56" }} className="py-6 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-4 gap-4">
          {[
            { num: "+50,000", label: "استشارة طبية ناجحة" },
            { num: "+120", label: "استشاري طبيب متخصص" },
            { num: "4.9", label: "متوسط التقييم الطبي", star: true },
            { num: "24/7", label: "خدمة طوارئ ودعم على مدار الساعة" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="flex items-center justify-center gap-1 text-2xl font-black"
                style={{ color: "#ef003d" }}
              >
                {stat.star && <LuStar size={22} style={{ fill: "#ef003d" }} />}
                {stat.num}
              </div>
              <div
                className="text-xs mt-1"
                style={{ color: "#e8e9f0", opacity: 0.8 }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Specialties */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => goToDoctors("الكل")}
            className="text-sm font-semibold"
            style={{ color: "#ef003d" }}
          >
            عرض جميع التخصصات ←
          </button>
          <div>
            <h2 className="text-2xl font-black" style={{ color: "#090c56" }}>
              العيادات التخصصية المتاحة
            </h2>
            <p className="text-sm mt-1" style={{ color: "#696a76" }}>
              اختر من الأقسام الطبية المتاحة التالية لبناء شبكة رعايتك الشخصية
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {specialties.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.name}
                onClick={() => goToDoctors(s.filter)}
                className="p-4 rounded-2xl text-right transition-all hover:shadow-md cursor-pointer"
                style={{ background: "#fff", border: "1px solid #e8e9f0" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "#eff0ff", color: "#090c56" }}
                  >
                    {s.label}
                  </span>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "#eff0ff", color: "#090c56" }}
                  >
                    <Icon size={26} />
                  </div>
                </div>
                <h3
                  className="font-bold text-sm mb-1"
                  style={{ color: "#171827" }}
                >
                  {s.name}
                </h3>
                <p className="text-xs" style={{ color: "#696a76" }}>
                  {s.count} استشاري
                </p>
                <button
                  type="button"
                  className="mt-3 w-full py-2 rounded-xl text-xs font-bold"
                  style={{ background: "#fff0f3", color: "#ef003d" }}
                >
                  احجز الآن
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-8 px-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => goToDoctors("الكل")}
            className="text-sm font-semibold"
            style={{ color: "#ef003d" }}
          >
            عرض الكل ←
          </button>
          <div>
            <h2 className="text-2xl font-black" style={{ color: "#090c56" }}>
              نخبة الأطباء والاستشاريين المعتمدين
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {doctors.map((doc) => (
            <div
              key={doc.name}
              className="rounded-2xl overflow-hidden shadow-sm"
              style={{ background: "#fff", border: "1px solid #e8e9f0" }}
            >
              <div className="p-4">
                {doc.tag && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-bold"
                    style={{ background: "#fff0f3", color: "#ef003d" }}
                  >
                    {doc.tag}
                  </span>
                )}
                <div className="flex items-center gap-3 mt-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                    style={{ background: "#090c56", color: "#fff" }}
                  >
                    {doc.name[3]}
                  </div>
                  <div>
                    <div
                      className="font-bold text-sm"
                      style={{ color: "#090c56" }}
                    >
                      {doc.name}
                    </div>
                    <div className="text-xs" style={{ color: "#ef003d" }}>
                      {doc.spec}
                    </div>
                  </div>
                </div>
                <div
                  className="flex items-center justify-between mt-3 text-xs"
                  style={{ color: "#696a76" }}
                >
                  <span className="flex items-center gap-1">
                    <LuStar
                      size={13}
                      style={{ color: "#f79009", fill: "#f79009" }}
                    />{" "}
                    {doc.rating} ({doc.reviews} تقييم)
                  </span>
                  <span style={{ color: "#12b76a" }}>● {doc.wait}</span>
                </div>
                <div
                  className="mt-2 text-sm font-bold"
                  style={{ color: "#171827" }}
                >
                  {doc.price} جنيه
                </div>
              </div>
              <div className="flex gap-2 px-4 pb-4">
                <button
                  type="button"
                  onClick={() => selectDoctor(doc, "doctor-profile")}
                  className="flex-1 py-2 rounded-xl text-xs font-bold"
                  style={{ border: "1px solid #e8e9f0", color: "#090c56" }}
                >
                  عرض الملف
                </button>
                <button
                  type="button"
                  onClick={() => selectDoctor(doc, "booking-visit-type")}
                  className="flex-1 py-2 rounded-xl text-xs font-bold"
                  style={{ background: "#ef003d", color: "#fff" }}
                >
                  احجز موعد
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6" style={{ background: "#090c56" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-4" style={{ color: "#fff" }}>
            ماذا تنتظر الآن؟
          </h2>
          <p className="text-sm mb-8 opacity-80" style={{ color: "#e8e9f0" }}>
            هيا قبل ضياع الفرصة، احجز موعدك مع نخبة الأطباء والاستشاريين من
            القائمة المعتمدة
          </p>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={() => goToDoctors("الكل")}
              className="px-8 py-4 rounded-xl font-bold"
              style={{ background: "#ef003d", color: "#fff" }}
            >
              احجز موعد طبي الآن
            </button>
            <button
              type="button"
              onClick={() => navigate("login")}
              className="px-8 py-4 rounded-xl font-bold"
              style={{
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
              }}
            >
              تواصل مع الدعم الطبي
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-6"
        style={{ background: "#06093d", color: "#e8e9f0" }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-4 gap-6 mb-6">
          <div>
            <Logo
              size={40}
              showText
              textColor="#fff"
              subtitle="بوابتكم الطبية الموثوقة"
            />
            <p className="text-xs mt-3 opacity-70">
              عيادة ابن كثير الطبية المعتمدة
            </p>
          </div>
          {[
            {
              title: "روابط سريعة",
              items: [
                "التخصصات الطبية",
                "دليل الأطباء",
                "الكشوفات",
                "الوصفات الطبية",
              ],
            },
            {
              title: "أوقات العمل والتواصل",
              items: [
                "السبت - الخميس",
                "09:00 ص - 09:00 م",
                "الجمعة 11:00 ص - 05:00 م",
              ],
            },
            {
              title: "التواصل والدعم",
              items: ["19011", "02-3344-9988", "support@altibbaa.com"],
              phone: true,
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-sm mb-3">{col.title}</h4>
              {col.items.map((item, i) => (
                <p
                  key={item}
                  className="flex items-center gap-1.5 text-xs mb-1.5 opacity-70"
                >
                  {col.phone && i === 0 && <LuPhone size={13} />}
                  {item}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div
          className="text-center text-xs opacity-50 pt-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          © 2024 عيادة ابن كثير — جميع الحقوق محفوظة
        </div>
      </footer>
    </div>
  )
}
