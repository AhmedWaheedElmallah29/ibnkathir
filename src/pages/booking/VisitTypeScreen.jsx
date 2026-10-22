import { useState } from "react";
import { LuHospital, LuVideo, LuHouse, LuCheck } from "react-icons/lu";
import BookingSteps from "@/components/BookingSteps";
import PublicNavbar from "@/components/PublicNavbar";

const visitTypes = [
    {
        id: "clinic",
        icon: LuHospital,
        title: "زيارة في العيادة",
        subtitle: "كشف مباشر في العيادة مع الطبيب",
        price: 350,
        details: ["كشف شامل ومفصل", "رسم قلب فوري", "وصفة إلكترونية", "تقرير سريري كامل"],
        badge: "",
    },
    {
        id: "online",
        icon: LuVideo,
        title: "استشارة أونلاين",
        subtitle: "مشاورة طبية عبر الفيديو",
        price: 200,
        details: ["مكالمة فيديو HD", "مراجعة نتائج التحاليل", "وصفة إلكترونية", "متابعة بعد الاستشارة"],
        badge: "خصم 43%",
    },
    {
        id: "home",
        icon: LuHouse,
        title: "زيارة منزلية",
        subtitle: "يزورك الطبيب في منزلك",
        price: 650,
        details: ["كشف منزلي كامل", "تحاليل في الموقع", "طوارئ ومتابعة سريعة", "تقرير شامل"],
        badge: "طارئ",
    },
];

export default function VisitTypeScreen({ navigate, currentScreen, booking, updateBooking }) {
    // لو المستخدم رجع للشاشة دي، نرجّع اختياره القديم
    const [selected, setSelected] = useState(booking?.visitType?.id || "clinic");

    function next() {
        // نشيل الأيقونة (كومبوننت) قبل ما نحفظ الكائن في الـ state المشترك
        const { icon, ...visitType } = visitTypes.find((vt) => vt.id === selected);
        updateBooking({ visitType });
        navigate("booking-patient-info");
    }

    return (<div className="min-h-screen" style={{ background: "#f6f7f9" }} dir="rtl">
      <PublicNavbar navigate={navigate} currentScreen={currentScreen}/>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <BookingSteps current={2}/>

        <h1 className="text-xl font-black mb-2 text-center" style={{ color: "#090c56" }}>اختر نوع الزيارة</h1>
        <p className="text-sm text-center mb-6" style={{ color: "#696a76" }}>
          حدد الطريقة المناسبة لك للتواصل مع الطبيب
        </p>

        <div className="space-y-3 mb-6">
          {visitTypes.map((vt) => {
            const Icon = vt.icon;
            return (<button type="button" key={vt.id} onClick={() => setSelected(vt.id)} className="w-full p-4 rounded-2xl text-right transition-all" style={{
                background: selected === vt.id ? "#eff0ff" : "#fff",
                border: `2px solid ${selected === vt.id ? "#090c56" : "#e8e9f0"}`,
            }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: selected === vt.id ? "#090c56" : "#f9f9fb", color: selected === vt.id ? "#fff" : "#090c56" }}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold" style={{ color: "#090c56" }}>{vt.title}</span>
                      {vt.badge && (<span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "#fff0f3", color: "#ef003d" }}>
                          {vt.badge}
                        </span>)}
                    </div>
                    <div className="text-right">
                      <span className="font-black text-lg" style={{ color: "#090c56" }}>{vt.price}</span>
                      <span className="text-xs mr-1" style={{ color: "#696a76" }}>جنيه</span>
                    </div>
                  </div>
                  <p className="text-sm mt-0.5 mb-2" style={{ color: "#696a76" }}>{vt.subtitle}</p>
                  <div className="flex flex-wrap gap-2">
                    {vt.details.map((d) => (<span key={d} className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: selected === vt.id ? "#d0d3f5" : "#f9f9fb", color: "#696a76" }}>
                        <LuCheck size={12} /> {d}
                      </span>))}
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full border-2 flex-shrink-0 mt-1 flex items-center justify-center" style={{
                borderColor: selected === vt.id ? "#090c56" : "#e8e9f0",
                background: selected === vt.id ? "#090c56" : "#fff",
                color: "#fff",
            }}>
                  {selected === vt.id && <LuCheck size={12} />}
                </div>
              </div>
            </button>);
          })}
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={() => navigate("doctor-profile")} className="flex-1 py-3.5 rounded-xl font-semibold text-sm" style={{ border: "1px solid #e8e9f0", color: "#696a76" }}>
            السابق
          </button>
          <button type="button" onClick={next} className="py-3.5 px-8 rounded-xl font-bold text-sm" style={{ background: "#ef003d", color: "#fff", flex: 2 }}>
            التالي: بيانات المريض ←
          </button>
        </div>
      </div>
    </div>);
}