import { useState } from "react"
import {
  LuStar,
  LuCircleCheck,
  LuPill,
  LuLock,
  LuArrowRight,
  LuMapPin,
} from "react-icons/lu"
import PublicNavbar from "@/components/PublicNavbar"

const reviews = [
  {
    name: "محمد أحمد",
    rating: 5,
    text: "دكتور ممتاز، شرح الحالة بشكل واضح وأعطى العلاج المناسب. النتائج كانت رائعة والمتابعة مستمرة.",
  },
  {
    name: "فاطمة سالم",
    rating: 5,
    text: "خبرة واسعة وتعامل إنساني راقٍ. التشخيص كان واضحًا والتعامل احترافي.",
  },
  {
    name: "عبدالرحمن خالد",
    rating: 4,
    text: "طبيب محترف ومتميز، والموعد كان في وقته.",
  },
]

const defaultDoctor = {
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
}

const doctorDetails = {
  "د. مايكل تشن": {
    experience: "+15 سنة",
    university: "كلية الطب، جامعة القاهرة",
    languages: "العربية، الإنجليزية",
    clinics: "3 عيادات",
    description:
      "استشاري متخصص في أمراض القلب والأوعية الدموية، مع اهتمام بتقييم الحالات ومتابعتها ووضع خطة العلاج المناسبة.",
    tags: ["أمراض القلب", "قسطرة", "فشل قلبي", "رسم قلب", "إيكو"],
  },
  "د. سارة المنصور": {
    experience: "+12 سنة",
    university: "كلية الطب",
    languages: "العربية، الإنجليزية",
    clinics: "عيادتان",
    description:
      "متخصصة في أمراض الباطنة والجهاز الهضمي، مع الاهتمام بتقييم الأعراض ومتابعة الحالات.",
    tags: ["الباطنة", "الجهاز الهضمي", "متابعة الحالات"],
  },
  "د. أحمد القحطاني": {
    experience: "+10 سنوات",
    university: "كلية الطب",
    languages: "العربية",
    clinics: "عيادتان",
    description:
      "متخصص في جراحة العظام والمفاصل الرياضية وتقييم مشكلات الحركة والمفاصل.",
    tags: ["العظام", "المفاصل", "الإصابات الرياضية"],
  },
  "د. نورة السليمان": {
    experience: "+11 سنة",
    university: "كلية الطب",
    languages: "العربية، الإنجليزية",
    clinics: "3 عيادات",
    description: "متخصصة في طب الأطفال ومتابعة صحة الأطفال والرضع.",
    tags: ["طب الأطفال", "الرضع", "متابعة النمو"],
  },
  "د. خالد إبراهيم": {
    experience: "+14 سنة",
    university: "كلية الطب",
    languages: "العربية، الإنجليزية",
    clinics: "عيادتان",
    description:
      "متخصص في جراحة المخ والأعصاب والعمود الفقري وتقييم الحالات المرتبطة بهما.",
    tags: ["المخ والأعصاب", "العمود الفقري"],
  },
  "د. فاطمة الزهراء": {
    experience: "+9 سنوات",
    university: "كلية الطب",
    languages: "العربية",
    clinics: "عيادتان",
    description: "متخصصة في أمراض النساء والتوليد وصحة المرأة ومتابعة الحالات.",
    tags: ["النساء والتوليد", "صحة المرأة", "المتابعة"],
  },
}

export default function DoctorProfileScreen({
  navigate,
  currentScreen,
  booking,
  selectDoctor,
}) {
  const [activeTab, setActiveTab] = useState("about")

  const doctor = booking?.doctor || defaultDoctor
  const details = doctorDetails[doctor.name] || {
    experience: "غير محدد",
    university: "غير محددة",
    languages: "العربية",
    clinics: "غير محدد",
    description: `معلومات عن تخصص ${doctor.spec || doctor.specialty || "الطبيب"}.`,
    tags: [doctor.specialty || "التخصص الطبي"],
  }

  const doctorName = doctor.name || defaultDoctor.name
  const specialty = doctor.spec || doctor.specialty || "التخصص الطبي"
  const price = doctor.fees ?? doctor.price ?? 0
  const rating = doctor.rating ?? 0
  const reviewCount = doctor.reviews ?? 0
  const location = doctor.location || "لم يُحدد موقع العيادة"
  const available = doctor.available !== false
  const initial = doctorName.replace("د. ", "").charAt(0)

  function startBooking() {
    if (selectDoctor) {
      selectDoctor(doctor, "booking-visit-type")
    } else {
      navigate("booking-visit-type")
    }
  }

  return (
    <div className="min-h-screen" style={{ background: "#f6f7f9" }} dir="rtl">
      <PublicNavbar navigate={navigate} currentScreen={currentScreen} />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <button
          type="button"
          onClick={() => navigate("doctors")}
          className="flex items-center gap-1.5 text-sm mb-5"
          style={{ color: "#696a76" }}
        >
          <LuArrowRight size={16} />
          العودة لدليل الأطباء
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2">
            <div
              className="rounded-2xl p-6 mb-4"
              style={{
                background: "#fff",
                border: "1px solid #e8e9f0",
              }}
            >
              <div className="flex items-start gap-5">
                <div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center text-3xl font-black flex-shrink-0"
                  style={{
                    background: "#090c56",
                    color: "#fff",
                  }}
                >
                  {initial}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-bold"
                        style={{
                          background: "#fff0f3",
                          color: "#ef003d",
                        }}
                      >
                        {available ? "متاح للحجز" : "غير متاح الآن"}
                      </span>

                      <h1
                        className="text-xl md:text-2xl font-black mt-2"
                        style={{ color: "#090c56" }}
                      >
                        {doctorName}
                      </h1>

                      <p
                        className="text-sm font-semibold mt-1"
                        style={{ color: "#ef003d" }}
                      >
                        {specialty}
                      </p>

                      <p
                        className="flex items-center gap-1 text-sm mt-2"
                        style={{ color: "#696a76" }}
                      >
                        <LuMapPin size={15} />
                        {location}
                      </p>
                    </div>

                    <div className="text-left flex-shrink-0">
                      <div
                        className="text-xl md:text-2xl font-black"
                        style={{ color: "#090c56" }}
                      >
                        {price}
                      </div>

                      <div className="text-xs" style={{ color: "#696a76" }}>
                        جنيه / كشف
                      </div>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-4 mt-3 text-sm flex-wrap"
                    style={{ color: "#696a76" }}
                  >
                    <span className="flex items-center gap-1">
                      <LuStar
                        size={14}
                        style={{
                          color: "#f79009",
                          fill: "#f79009",
                        }}
                      />
                      {rating} ({reviewCount} تقييم)
                    </span>

                    <span
                      style={{
                        color: available ? "#12b76a" : "#f79009",
                      }}
                    >
                      ● {doctor.wait || "المواعيد غير محددة"}
                    </span>

                    <span>{details.experience} خبرة</span>
                  </div>

                  <div className="flex gap-2 mt-4 flex-wrap">
                    {details.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          background: "#eff0ff",
                          color: "#090c56",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "#fff",
                border: "1px solid #e8e9f0",
              }}
            >
              <div
                className="flex"
                style={{ borderBottom: "1px solid #e8e9f0" }}
              >
                {[
                  { value: "about", label: "نبذة عن الطبيب" },
                  {
                    value: "reviews",
                    label: `التقييمات (${reviewCount})`,
                  },
                  { value: "schedule", label: "الجدول والمواعيد" },
                ].map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setActiveTab(tab.value)}
                    className="flex-1 py-3.5 text-sm font-semibold transition-all"
                    style={
                      activeTab === tab.value
                        ? {
                            borderBottom: "2px solid #ef003d",
                            color: "#ef003d",
                          }
                        : { color: "#696a76" }
                    }
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-5">
                {activeTab === "about" && (
                  <div className="space-y-4">
                    <div>
                      <h3
                        className="font-bold mb-2"
                        style={{ color: "#090c56" }}
                      >
                        نبذة تعريفية
                      </h3>

                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "#696a76" }}
                      >
                        {details.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        {
                          label: "الكلية والجامعة",
                          value: details.university,
                        },
                        {
                          label: "سنوات الخبرة",
                          value: details.experience,
                        },
                        {
                          label: "اللغات",
                          value: details.languages,
                        },
                        {
                          label: "العيادات والمراكز",
                          value: details.clinics,
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="p-3 rounded-xl"
                          style={{ background: "#f9f9fb" }}
                        >
                          <div
                            className="text-xs font-semibold mb-1"
                            style={{ color: "#696a76" }}
                          >
                            {item.label}
                          </div>

                          <div
                            className="text-sm font-bold"
                            style={{ color: "#171827" }}
                          >
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div
                        key={review.name}
                        className="p-4 rounded-xl"
                        style={{ background: "#f9f9fb" }}
                      >
                        <div className="flex items-center justify-between mb-2 gap-3">
                          <span
                            className="font-semibold text-sm"
                            style={{ color: "#171827" }}
                          >
                            {review.name}
                          </span>

                          <span className="flex gap-0.5">
                            {Array.from({
                              length: review.rating,
                            }).map((_, index) => (
                              <LuStar
                                key={index}
                                size={14}
                                style={{
                                  color: "#f79009",
                                  fill: "#f79009",
                                }}
                              />
                            ))}
                          </span>
                        </div>

                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "#696a76" }}
                        >
                          {review.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "schedule" && (
                  <div className="space-y-3">
                    {["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء"].map(
                      (day) => (
                        <div
                          key={day}
                          className="flex items-center justify-between gap-3 flex-wrap p-3 rounded-xl"
                          style={{ background: "#f9f9fb" }}
                        >
                          <span
                            className="text-sm font-bold"
                            style={{ color: "#090c56" }}
                          >
                            {day}
                          </span>

                          <span
                            className="text-sm"
                            style={{ color: "#696a76" }}
                          >
                            03:00 م – 06:00 م
                          </span>

                          <button
                            type="button"
                            onClick={startBooking}
                            className="text-xs px-3 py-1.5 rounded-lg font-bold"
                            style={{
                              background: "#ef003d",
                              color: "#fff",
                            }}
                          >
                            احجز
                          </button>
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside>
            <div
              className="rounded-2xl p-5 md:sticky md:top-20"
              style={{
                background: "#fff",
                border: "1px solid #e8e9f0",
              }}
            >
              <h3 className="font-bold mb-3" style={{ color: "#090c56" }}>
                احجز موعدًا الآن
              </h3>

              <div
                className="flex items-center justify-between gap-2 p-3 rounded-xl mb-3"
                style={{
                  background: available ? "#e8f9f0" : "#fff4e5",
                }}
              >
                <span
                  className="text-sm font-semibold"
                  style={{
                    color: available ? "#12b76a" : "#b54708",
                  }}
                >
                  ● {available ? "متاح للحجز" : "غير متاح الآن"}
                </span>

                <span
                  className="text-xs"
                  style={{
                    color: available ? "#12b76a" : "#b54708",
                  }}
                >
                  {doctor.wait || "المواعيد غير محددة"}
                </span>
              </div>

              <div
                className="flex items-center justify-between p-3 rounded-xl mb-4"
                style={{ background: "#f9f9fb" }}
              >
                <span className="text-sm" style={{ color: "#696a76" }}>
                  رسوم الكشف
                </span>

                <span className="font-black" style={{ color: "#090c56" }}>
                  {price} جنيه
                </span>
              </div>

              <button
                type="button"
                onClick={startBooking}
                disabled={!available}
                className="w-full py-3.5 rounded-xl font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "#ef003d",
                  color: "#fff",
                }}
              >
                {available ? "احجز موعدًا" : "غير متاح للحجز الآن"}
              </button>

              <div
                className="mt-4 space-y-3 text-xs"
                style={{ color: "#696a76" }}
              >
                <div className="flex items-center gap-2">
                  <LuCircleCheck size={16} style={{ color: "#12b76a" }} />
                  <span>تأكيد الحجز بعد إكمال البيانات</span>
                </div>

                <div className="flex items-center gap-2">
                  <LuPill size={16} style={{ color: "#090c56" }} />
                  <span>متابعة تفاصيل الزيارة</span>
                </div>

                <div className="flex items-center gap-2">
                  <LuLock size={16} style={{ color: "#090c56" }} />
                  <span>الحفاظ على بيانات المريض</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
