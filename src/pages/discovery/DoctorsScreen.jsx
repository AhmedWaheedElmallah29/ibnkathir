
import { useEffect, useState } from "react";
import { LuSearch, LuStar, LuMapPin, LuUser } from "react-icons/lu";
import PublicNavbar from "@/components/PublicNavbar";

const allDoctors = [
  {
    name: "د. مايكل تشن",
    spec: "استشاري أمراض القلب والأوعية الدموية",
    specialty: "قلب",
    rating: 4.9,
    reviews: 189,
    price: 350,
    wait: "متاح الآن",
    available: true,
    location: "التجمع الخامس",
    fees: 350,
    gender: "ذكر",
  },
  {
    name: "د. سارة المنصور",
    spec: "أمراض الباطنة والجهاز الهضمي",
    specialty: "باطنة",
    rating: 4.8,
    reviews: 132,
    price: 300,
    wait: "15 دقيقة",
    available: true,
    location: "مدينة نصر",
    fees: 300,
    gender: "أنثى",
  },
  {
    name: "د. أحمد القحطاني",
    spec: "استشاري جراحة العظام والمفاصل الرياضية",
    specialty: "عظام",
    rating: 4.7,
    reviews: 98,
    price: 300,
    wait: "40 دقيقة",
    available: true,
    location: "الإسكندرية",
    fees: 300,
    gender: "ذكر",
  },
  {
    name: "د. نورة السليمان",
    spec: "استشاري طب الأطفال والرضع والولادة",
    specialty: "أطفال",
    rating: 4.9,
    reviews: 215,
    price: 250,
    wait: "متاح الآن",
    available: true,
    location: "الشيخ زايد",
    fees: 250,
    gender: "أنثى",
  },
  {
    name: "د. خالد إبراهيم",
    spec: "استشاري جراحة المخ والعمود الفقري",
    specialty: "مخ وأعصاب",
    rating: 4.6,
    reviews: 76,
    price: 400,
    wait: "غداً",
    available: false,
    location: "مدينة نصر",
    fees: 400,
    gender: "ذكر",
  },
  {
    name: "د. فاطمة الزهراء",
    spec: "استشاري نساء وتوليد وصحة المرأة",
    specialty: "نساء",
    rating: 4.8,
    reviews: 164,
    price: 280,
    wait: "10 دقائق",
    available: true,
    location: "التجمع الخامس",
    fees: 280,
    gender: "أنثى",
  },
];

const specialtyOpts = [
  "الكل",
  "قلب",
  "باطنة",
  "عظام",
  "أطفال",
  "مخ وأعصاب",
  "نساء",
];

export default function DoctorsScreen({
  navigate,
  currentScreen,
  selectDoctor,
  specialtyFilter,
  setSpecialtyFilter,
}) {
  const [search, setSearch] = useState("");
  const [selectedSpec, setSelectedSpec] = useState(
    specialtyFilter || "الكل"
  );
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    if (specialtyFilter) {
      setSelectedSpec(specialtyFilter);
    }
  }, [specialtyFilter]);

  function handleSpecialtyChange(specialty) {
    setSelectedSpec(specialty);

    if (setSpecialtyFilter) {
      setSpecialtyFilter(specialty);
    }
  }

  function handleDoctorSelection(doctor, nextScreen) {
    if (selectDoctor) {
      selectDoctor(doctor, nextScreen);
    } else {
      navigate(nextScreen);
    }
  }

  const filtered = allDoctors
    .filter((doctor) => {
      const matchesSearch =
        !search ||
        doctor.name.includes(search) ||
        doctor.spec.includes(search) ||
        doctor.specialty.includes(search);

      const matchesSpecialty =
        selectedSpec === "الكل" ||
        doctor.specialty === selectedSpec;

      const matchesAvailability =
        !onlyAvailable || doctor.available;

      return (
        matchesSearch &&
        matchesSpecialty &&
        matchesAvailability
      );
    })
    .sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      if (sortBy === "price") {
        return a.price - b.price;
      }

      return 0;
    });

  return (
    <div
      className="min-h-screen"
      style={{ background: "#f6f7f9" }}
      dir="rtl"
    >
      <PublicNavbar
        navigate={navigate}
        currentScreen={currentScreen}
      />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1
            className="text-2xl font-black mb-1"
            style={{ color: "#090c56" }}
          >
            دليل الأطباء والاستشاريين المعتمدين
          </h1>

          <p
            className="text-sm"
            style={{ color: "#696a76" }}
          >
            تصفح وابحث بين أكثر من 120 استشاري طبي معتمد
          </p>
        </div>

        <div className="flex gap-6">
          {/* فلاتر البحث */}
          <aside className="w-56 flex-shrink-0">
            <div
              className="rounded-2xl p-4 mb-4"
              style={{
                background: "#fff",
                border: "1px solid #e8e9f0",
              }}
            >
              <h3
                className="font-bold text-sm mb-3"
                style={{ color: "#090c56" }}
              >
                التخصص الطبي
              </h3>

              <div className="space-y-1">
                {specialtyOpts.map((specialty) => (
                  <button
                    key={specialty}
                    type="button"
                    onClick={() =>
                      handleSpecialtyChange(specialty)
                    }
                    className="w-full text-right px-3 py-2 rounded-lg text-sm transition-all"
                    style={
                      selectedSpec === specialty
                        ? {
                          background: "#090c56",
                          color: "#fff",
                          fontWeight: 700,
                        }
                        : { color: "#171827" }
                    }
                  >
                    {specialty}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl p-4 mb-4"
              style={{
                background: "#fff",
                border: "1px solid #e8e9f0",
              }}
            >
              <h3
                className="font-bold text-sm mb-3"
                style={{ color: "#090c56" }}
              >
                خيارات التصفية
              </h3>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyAvailable}
                  onChange={(event) =>
                    setOnlyAvailable(event.target.checked)
                  }
                />

                <span className="text-sm">
                  متاح الآن فقط
                </span>
              </label>
            </div>

            <div
              className="rounded-2xl p-4"
              style={{
                background: "#fff",
                border: "1px solid #e8e9f0",
              }}
            >
              <h3
                className="font-bold text-sm mb-3"
                style={{ color: "#090c56" }}
              >
                ترتيب النتائج
              </h3>

              {[
                { value: "rating", label: "الأعلى تقييماً" },
                { value: "price", label: "الأقل سعراً" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSortBy(option.value)}
                  className="w-full text-right px-3 py-2 rounded-lg text-sm transition-all mb-1"
                  style={
                    sortBy === option.value
                      ? {
                        background: "#fff0f3",
                        color: "#ef003d",
                        fontWeight: 700,
                      }
                      : { color: "#171827" }
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </aside>

          {/* نتائج الأطباء */}
          <main className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 relative">
                <LuSearch
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: "#9b9caa" }}
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  className="w-full pr-11 pl-4 py-3 rounded-xl text-sm"
                  style={{
                    border: "1px solid #e8e9f0",
                    outline: "none",
                    background: "#fff",
                  }}
                  placeholder="ابحث باسم الطبيب أو التخصص..."
                />
              </div>

              <span
                className="text-sm font-medium whitespace-nowrap"
                style={{ color: "#696a76" }}
              >
                {filtered.length} طبيب
              </span>
            </div>

            <div className="space-y-3">
              {filtered.map((doctor) => (
                <div
                  key={doctor.name}
                  className="rounded-2xl p-4 transition-all hover:shadow-md"
                  style={{
                    background: "#fff",
                    border: "1px solid #e8e9f0",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0"
                      style={{
                        background: "#090c56",
                        color: "#fff",
                      }}
                    >
                      {doctor.name[3]}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3
                            className="font-bold"
                            style={{ color: "#090c56" }}
                          >
                            {doctor.name}
                          </h3>

                          <p
                            className="text-sm"
                            style={{ color: "#ef003d" }}
                          >
                            {doctor.spec}
                          </p>

                          <p
                            className="flex items-center gap-1 text-xs mt-1"
                            style={{ color: "#696a76" }}
                          >
                            <LuMapPin size={13} />
                            {doctor.location}
                          </p>
                        </div>

                        <div className="text-left flex-shrink-0">
                          <div
                            className="text-sm font-bold"
                            style={{ color: "#171827" }}
                          >
                            {doctor.price} جنيه
                          </div>

                          <div
                            className="text-xs"
                            style={{ color: "#696a76" }}
                          >
                            رسوم الكشف
                          </div>
                        </div>
                      </div>

                      <div
                        className="flex items-center gap-4 mt-2 text-xs flex-wrap"
                        style={{ color: "#696a76" }}
                      >
                        <span className="flex items-center gap-1">
                          <LuStar
                            size={13}
                            style={{
                              color: "#f79009",
                              fill: "#f79009",
                            }}
                          />
                          {doctor.rating} ({doctor.reviews} تقييم)
                        </span>

                        <span
                          style={{
                            color: doctor.available
                              ? "#12b76a"
                              : "#f79009",
                          }}
                        >
                          ● {doctor.wait}
                        </span>

                        <span className="flex items-center gap-1">
                          <LuUser size={13} />
                          {doctor.gender}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() =>
                        handleDoctorSelection(
                          doctor,
                          "doctor-profile"
                        )
                      }
                      className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                      style={{
                        border: "1px solid #e8e9f0",
                        color: "#090c56",
                      }}
                    >
                      عرض الملف الكامل
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDoctorSelection(
                          doctor,
                          "booking-visit-type"
                        )
                      }
                      className="flex-1 py-2.5 rounded-xl text-sm font-bold"
                      style={{
                        background: "#ef003d",
                        color: "#fff",
                      }}
                    >
                      احجز موعداً
                    </button>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div
                  className="flex flex-col items-center text-center py-16"
                  style={{ color: "#696a76" }}
                >
                  <LuSearch
                    size={40}
                    className="mb-3"
                    style={{ color: "#9b9caa" }}
                  />

                  <p className="font-semibold">
                    لا توجد نتائج لبحثك
                  </p>

                  <p className="text-sm mt-1">
                    جرب تغيير معايير البحث
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
