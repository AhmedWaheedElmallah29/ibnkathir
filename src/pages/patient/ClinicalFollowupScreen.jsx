import { useState } from "react"
import { usePatient } from "../../context/PatientContext.jsx"
import {
  PageHeading,
  StatusBadge,
  EmptyState,
} from "../../components/PortalUI.jsx"
import { formatDate } from "../../lib/format.js"

export default function ClinicalFollowupScreen() {
  const {
    data: { followups, patient },
  } = usePatient()
  const [filter, setFilter] = useState("all")
  const filtered = followups.filter(
    (item) => filter === "all" || item.status === filter,
  )
  return (
    <>
      <PageHeading
        title="المتابعة الطبية"
        description="سجل متابعاتك وملاحظات زياراتك بالترتيب الزمني."
      />
      <div className="followup-layout">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>خطة المتابعة</h2>
              <p>{followups.length} متابعات مسجلة</p>
            </div>
          </div>
          <div className="tabs">
            <button
              className={filter === "all" ? "is-active" : ""}
              aria-pressed={filter === "all"}
              onClick={() => setFilter("all")}
            >
              الكل
            </button>
            <button
              className={filter === "قادم" ? "is-active" : ""}
              aria-pressed={filter === "قادم"}
              onClick={() => setFilter("قادم")}
            >
              القادمة
            </button>
            <button
              className={filter === "مكتمل" ? "is-active" : ""}
              aria-pressed={filter === "مكتمل"}
              onClick={() => setFilter("مكتمل")}
            >
              المكتملة
            </button>
          </div>
          <div className="followup-timeline">
            {filtered.map((item) => (
              <article
                className={`timeline-item${
                  item.status === "قادم" ? " timeline-item--upcoming" : ""
                }`}
                key={item.id}
              >
                <div className="timeline-dot" aria-hidden="true" />
                <div className="timeline-card">
                  <div className="card-topline">
                    <span>{formatDate(item.date)}</span>
                    <StatusBadge>{item.status}</StatusBadge>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="timeline-doctor">
                    {item.doctor} · {item.specialty}
                  </p>
                  <p>{item.description}</p>
                  <div className="timeline-note">{item.notes}</div>
                  {item.appointmentId ? (
                    <a
                      className="text-link"
                      href={`#/appointments/${item.appointmentId}`}
                    >
                      تفاصيل موعد المتابعة ←
                    </a>
                  ) : (
                    <a className="text-link" href="#/medical-records">
                      استعراض السجل الطبي ←
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          {!filtered.length && <EmptyState />}
        </section>
        <aside className="followup-aside">
          <section className="panel">
            <div className="panel-heading">
              <h2>ملخص الحالة المسجلة</h2>
            </div>
            <div className="aside-body">
              <span className="muted">الأمراض المزمنة</span>
              <h3>{patient.chronicConditions.join("، ") || "لا يوجد"}</h3>
              <hr />
              <span className="muted">الحساسية</span>
              <p>{patient.allergies}</p>
              <hr />
              <a className="outline-button" href="#/prescriptions">
                عرض الروشتات
              </a>
              <a className="outline-button" href="#/lab-results">
                عرض التحاليل
              </a>
            </div>
          </section>
          <div className="form-notice">
            <strong>قبل موعدك</strong>
            <p>احتفظ بنسخة من الفحوصات والروشتات السابقة لعرضها خلال زيارتك.</p>
          </div>
        </aside>
      </div>
    </>
  )
}
