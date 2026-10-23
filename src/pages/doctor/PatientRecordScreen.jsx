import { useState } from "react"
import DoctorNavbar from "@/components/DoctorNavbar"
import DoctorSidebar from "@/components/DoctorSidebar"
export default function PatientRecordScreen({ navigate, currentScreen }) {
  const [activeTab, setActiveTab] = useState("السجل السريري والتشخيصات")
  const [doctorNotes, setDoctorNotes] = useState(
    "المريض ملتزم بمواعيد بصفة منتظمة، ولكن يفضل الاطمئنان لضغط الدم الصباحي قبل الذهاب للعمل.",
  )
  const [diagnosis, setDiagnosis] = useState(
    "خفقان واضطراب نظم جيبي مع استقرار نسبي لضغط الدم الشرياني (Tachycardia with controlled HTN)",
  )
  const [saved, setSaved] = useState(false)
  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#f6f7f9" }}
      dir="rtl"
    >
      <DoctorNavbar navigate={navigate} />
      <div className="flex flex-1">
        <DoctorSidebar navigate={navigate} active={currentScreen} />

        <main className="flex-1 p-4 overflow-auto">
          <div className="max-w-5xl mx-auto">
            {/* Search bar */}
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => navigate("waiting-queue")}
                className="text-xs px-3 py-1.5 rounded-lg"
                style={{ border: "1px solid #e8e9f0", color: "#696a76" }}
              >
                آخر المرضى المشاهدين ‹
              </button>
              <div className="flex-1 relative">
                <input
                  className="w-full px-4 py-2.5 rounded-xl text-sm"
                  style={{
                    border: "1px solid #e8e9f0",
                    outline: "none",
                    background: "#fff",
                  }}
                  defaultValue="عبدالله محمد بن صالح"
                  placeholder="🔍 ابحث باسم المريض أو الكود..."
                />
              </div>
              <button
                className="text-xs px-3 py-1.5 rounded-lg"
                style={{ background: "#090c56", color: "#fff" }}
              >
                ← تبديل السجل
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Patient info card */}
              <div
                className="col-span-3 rounded-2xl overflow-hidden"
                style={{ background: "#fff", border: "1px solid #e8e9f0" }}
              >
                <div className="p-4" style={{ background: "#090c56" }}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black"
                        style={{
                          background: "rgba(255,255,255,0.15)",
                          color: "#fff",
                        }}
                      >
                        ع
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-bold"
                            style={{ background: "#ef003d", color: "#fff" }}
                          >
                            ● مريض نشط بالعيادة
                          </span>
                          <span
                            className="text-xs font-mono"
                            style={{ color: "rgba(255,255,255,0.7)" }}
                          >
                            MED-94021#
                          </span>
                        </div>
                        <h1 className="text-xl font-black text-white">
                          عبدالله محمد بن صالح
                        </h1>
                        <p
                          className="text-sm"
                          style={{ color: "rgba(255,255,255,0.7)" }}
                        >
                          العمر: 45 سنة (مواليد 12/03/1979 • القاهرة، مصر) •
                          01023456789 20+
                        </p>
                        <p
                          className="text-sm mt-0.5"
                          style={{ color: "rgba(255,255,255,0.7)" }}
                        >
                          تأمن بنيا الذهبي (Bupa Egypt) 85%
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div
                        className="text-xs px-2 py-1 rounded-full font-bold"
                        style={{ background: "#fff0f3", color: "#ef003d" }}
                      >
                        ⚠️ حساسية من البنسلين (Penicillin Allergy)
                      </div>
                      <div
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          background: "rgba(255,255,255,0.15)",
                          color: "rgba(255,255,255,0.8)",
                        }}
                      >
                        ♥ ارتفاع ضغط الدم الشرياني المزمن (Hypertension)
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        className="px-4 py-2 rounded-xl text-xs font-bold"
                        style={{ background: "#12b76a", color: "#fff" }}
                      >
                        📋 + كتابة روشتة إلكترونية (Rx)
                      </button>
                      <button
                        className="px-4 py-2 rounded-xl text-xs font-bold"
                        style={{ background: "#ef003d", color: "#fff" }}
                      >
                        🔬 + إضافة تشخيص / زيارة
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div
                  className="flex"
                  style={{ borderBottom: "1px solid #e8e9f0" }}
                >
                  {[
                    "السجل السريري والتشخيصات",
                    "الروشتات والأدوية الموصوفة (3)",
                    "نتائج التحاليل والأشعة",
                    "سجل الزيارات السابقة (8)",
                    "الفواتير والمدفوعات",
                  ].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="px-4 py-3 text-xs font-semibold transition-all"
                      style={
                        activeTab === tab
                          ? {
                              borderBottom: "2px solid #ef003d",
                              color: "#ef003d",
                            }
                          : { color: "#696a76" }
                      }
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="p-5">
                  {activeTab === "السجل السريري والتشخيصات" && (
                    <div className="grid grid-cols-2 gap-5">
                      {/* Current visit */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-bold"
                            style={{ background: "#e8f9f0", color: "#12b76a" }}
                          >
                            جلسة الفحص المباشر
                          </span>
                          <span
                            className="font-bold"
                            style={{ color: "#090c56" }}
                          >
                            جلسة كشف اليوم (24 أكتوبر 2024)
                          </span>
                        </div>
                        <div
                          className="p-3 rounded-xl mb-3"
                          style={{ background: "#f9f9fb" }}
                        >
                          <div
                            className="text-xs font-semibold mb-1"
                            style={{ color: "#696a76" }}
                          >
                            الشكوى الرئيسية (Chief Complaint):
                          </div>
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: "#171827" }}
                          >
                            تسارع ملحوظ في ضربات القلب وخفقان مؤخر عند بذل جهد
                            خفيف (صعود الدرج أو المشي السريع)، مصحوب بدوخة بصوخة
                            صباحية متفرقة منذ 4 أيام وجود ألم حاد في الصدر.
                          </p>
                        </div>

                        {/* Vitals */}
                        <div
                          className="p-3 rounded-xl mb-3"
                          style={{ background: "#f9f9fb" }}
                        >
                          <div
                            className="text-xs font-semibold mb-2"
                            style={{ color: "#696a76" }}
                          >
                            المؤشرات والعلامات الحيوية المقاسة (Vitals):
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              {
                                label: "ضغط الدم",
                                value: "138/88 mmHg",
                                alert: true,
                              },
                              { label: "النبض", value: "82 bpm", alert: false },
                              {
                                label: "الأكسجين SpO2",
                                value: "98%",
                                alert: false,
                              },
                              {
                                label: "الحرارة",
                                value: "36.8°C",
                                alert: false,
                              },
                              {
                                label: "مؤشر الكتلة BMI",
                                value: "26.4",
                                alert: true,
                              },
                            ].map((v) => (
                              <div
                                key={v.label}
                                className="p-2 rounded-lg text-center"
                                style={{ background: "#fff" }}
                              >
                                <div
                                  className="text-xs font-bold"
                                  style={{
                                    color: v.alert ? "#ef003d" : "#090c56",
                                  }}
                                >
                                  {v.value}
                                </div>
                                <div
                                  className="text-xs mt-0.5"
                                  style={{ color: "#9b9caa", fontSize: 10 }}
                                >
                                  {v.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Diagnosis */}
                        <div>
                          <div
                            className="text-xs font-semibold mb-1"
                            style={{ color: "#696a76" }}
                          >
                            التشخيص السريري المعتمد (Clinical Diagnosis):
                          </div>
                          <textarea
                            className="w-full px-3 py-2.5 rounded-xl text-sm"
                            style={{
                              border: "1px solid #e8e9f0",
                              outline: "none",
                              background: "#f9f9fb",
                              resize: "none",
                              height: 80,
                            }}
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                          />
                        </div>

                        {/* Treatment plan */}
                        <div className="mt-3">
                          <div
                            className="text-xs font-semibold mb-2"
                            style={{ color: "#696a76" }}
                          >
                            الخطة العلاجية والتوصيات السريرية:
                          </div>
                          <div className="space-y-1.5">
                            {[
                              "تعديل جرعة دواء الضغط كونكور إلى 5 ملجم صباحياً مع تسجيل قراءات الضغط المنزلية اليومية لمدة أسبوعين.",
                              "الامتناع التام عن المنبهات ومصادر الكافيين المفرطة والمقرمشات للوقاية من الخفقان بدقة.",
                              "تركيب جهاز هولتر لمراقبة النبض القلب لمدة 24 ساعة لتقييم توبات الخفقان بدقة.",
                            ].map((item) => (
                              <div
                                key={item}
                                className="flex items-start gap-2 text-xs"
                                style={{ color: "#696a76" }}
                              >
                                <span style={{ color: "#12b76a" }}>✓</span>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Doctor notes + labs */}
                      <div>
                        <div
                          className="text-xs font-semibold mb-2"
                          style={{ color: "#696a76" }}
                        >
                          الفحوصات والتحاليل المخبرية
                        </div>
                        <div className="space-y-2 mb-4">
                          {[
                            {
                              name: "باقة رسم القلب الإيجادي (Stress Test)",
                              date: "18 أكتوبر 2024",
                              result:
                                "النتيجة: سليم - النتيجة: رجاء تروية راجي",
                              status: "معتمدة",
                            },
                            {
                              name: "سكر تراكمي HbA1c وتحليل صورة دم كاملة (CBC)",
                              date: "10 أكتوبر 2024",
                              result: "HbA1c %5.6",
                              status: "معتمدة",
                            },
                            {
                              name: "هولتر مراقبة القلب 24 ساعة (Holter 24h Monitor)",
                              date: "اليوم (كشف 24 أكتوبر 2024) - مخبر المبادة",
                              result: "في الانتظار البدء",
                              status: "بانتظار",
                              urgent: true,
                            },
                          ].map((lab) => (
                            <div
                              key={lab.name}
                              className="p-3 rounded-xl"
                              style={{
                                background: "#f9f9fb",
                                border: `1px solid ${
                                  lab.urgent ? "#ffd6e0" : "#e8e9f0"
                                }`,
                              }}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <div
                                    className="text-xs font-bold"
                                    style={{ color: "#090c56" }}
                                  >
                                    {lab.name}
                                  </div>
                                  <div
                                    className="text-xs mt-0.5"
                                    style={{ color: "#696a76" }}
                                  >
                                    {lab.date}
                                  </div>
                                  <div
                                    className="text-xs mt-0.5"
                                    style={{
                                      color: lab.urgent ? "#f79009" : "#12b76a",
                                    }}
                                  >
                                    {lab.result}
                                  </div>
                                </div>
                                <span
                                  className="text-xs px-2 py-0.5 rounded-full font-bold"
                                  style={{
                                    background: lab.urgent
                                      ? "#fef3c7"
                                      : "#e8f9f0",
                                    color: lab.urgent ? "#f79009" : "#12b76a",
                                  }}
                                >
                                  {lab.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div
                          className="text-xs font-semibold mb-2"
                          style={{ color: "#696a76" }}
                        >
                          ملاحظات الطبيب السريعة
                        </div>
                        <textarea
                          className="w-full px-3 py-2.5 rounded-xl text-sm mb-3"
                          style={{
                            border: "1px solid #e8e9f0",
                            outline: "none",
                            background: "#f9f9fb",
                            resize: "none",
                            height: 70,
                          }}
                          value={doctorNotes}
                          onChange={(e) => setDoctorNotes(e.target.value)}
                        />
                        <div
                          className="text-xs mb-3"
                          style={{ color: "#9b9caa" }}
                        >
                          آخر تعديل: قبل 10 دقائق
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={handleSave}
                            className="flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                            style={{ background: "#090c56", color: "#fff" }}
                          >
                            {saved
                              ? "✓ تم الحفظ!"
                              : "✅ اعتماد وحفظ الكشف الطبي"}
                          </button>
                          <button
                            className="py-2.5 px-4 rounded-xl text-sm font-semibold"
                            style={{
                              border: "1px solid #e8e9f0",
                              color: "#696a76",
                            }}
                          >
                            حفظ كمسودة
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "الروشتات والأدوية الموصوفة (3)" && (
                    <div className="space-y-3">
                      {[
                        {
                          name: "كونكور (Concor 5mg)",
                          dose: "قرص واحد صباحاً على الريق قبل الإفطار لتنظيم نبضات القلب والتحطيم الشرياني.",
                          renewal: "صالح حتى 14 نوفمبر 2024",
                          type: "يومي / يومياً بعد الإفطار (Bisoprolol)",
                        },
                        {
                          name: "أسبوسيد أطفال (Aspocid 75mg)",
                          dose: "قرص مضغ يومياً بعد وجبة الإفطار للوقاية للقلب. الجرعة المدنية: 18 يوماً",
                          renewal: "مستمر بالعلاج",
                          type: "دفع / يومياً",
                        },
                        {
                          name: "أتورفاستاتين (Atorvastatin 20mg)",
                          dose: "قرص واحد مساءً قبل النوم لتنظيم مستوى الكوليسترول والدهون والدم. تاريخ البدء: 02 سبتمبر 2024",
                          renewal: "مستمر بالعلاج",
                          type: "مستمر بالعلاج",
                        },
                      ].map((rx, i) => (
                        <div
                          key={rx.name}
                          className="p-4 rounded-xl"
                          style={{
                            background: "#f9f9fb",
                            border: "1px solid #e8e9f0",
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div
                                className="font-bold text-sm mb-1"
                                style={{ color: "#090c56" }}
                              >
                                {i + 1}. {rx.name}
                              </div>
                              <p
                                className="text-xs"
                                style={{ color: "#696a76" }}
                              >
                                {rx.dose}
                              </p>
                              <p
                                className="text-xs mt-1 font-semibold"
                                style={{ color: "#12b76a" }}
                              >
                                ⏰ {rx.renewal}
                              </p>
                            </div>
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-semibold"
                              style={{
                                background: "#e8f9f0",
                                color: "#12b76a",
                              }}
                            >
                              {rx.type}
                            </span>
                          </div>
                        </div>
                      ))}
                      <button
                        className="w-full py-3 rounded-xl text-sm font-bold"
                        style={{ background: "#ef003d", color: "#fff" }}
                      >
                        + إضافة دواء جديد للروشتة
                      </button>
                    </div>
                  )}

                  {(activeTab === "نتائج التحاليل والأشعة" ||
                    activeTab === "سجل الزيارات السابقة (8)" ||
                    activeTab === "الفواتير والمدفوعات") && (
                    <div className="space-y-3">
                      <div
                        className="text-center py-12"
                        style={{ color: "#9b9caa" }}
                      >
                        <div style={{ fontSize: 36 }}>📋</div>
                        <p className="font-semibold mt-2">
                          البيانات متاحة في النظام
                        </p>
                        <p className="text-sm">انقر للتحميل والعرض</p>
                        <button
                          className="mt-3 px-4 py-2 rounded-xl text-sm font-bold"
                          style={{ background: "#090c56", color: "#fff" }}
                        >
                          تحميل البيانات
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
