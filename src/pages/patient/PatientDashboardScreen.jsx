import { useState } from "react"
import { usePatient } from "../../context/PatientContext.jsx"
import {
  PageHeading,
  StatusBadge,
  EmptyState,
  DetailList,
} from "../../components/PortalUI.jsx"
import { formatDate } from "../../lib/format.js"

export default function PatientDashboardScreen() {
  const { data } = usePatient()
  const { patient, appointments, medicalRecords, prescriptions, labResults } =
    data
  const [tab, setTab] = useState("upcoming")
  const upcoming = appointments.filter((item) => item.status === "مؤكد")
  const shownAppointments =
    tab === "upcoming"
      ? upcoming
      : appointments.filter((item) => item.status !== "مؤكد")
  const stats = [
    ["المواعيد القادمة", upcoming.length, "navy"],
    ["الزيارات المسجلة", medicalRecords.length, "blue"],
    ["الروشتات الطبية", prescriptions.length, "amber"],
    [
      "نتائج تحاليل جاهزة",
      labResults.filter((item) => item.status === "جاهز").length,
      "green",
    ],
  ]
  return (
    <>
      <PageHeading
        title="لوحة المريض"
        description={`أهلًا ${patient.name}، تابع بياناتك الطبية ومواعيدك من هنا.`}
      >
        <span className="file-chip">
          رقم الملف <b dir="ltr">#{patient.id}</b>
        </span>
      </PageHeading>
      <section className="stats-grid" aria-label="ملخص الملف">
        {stats.map(([label, value, tone]) => (
          <div className="panel stat-card" key={label}>
            <span>{label}</span>
            <strong className={`text-${tone}`}>{value}</strong>
          </div>
        ))}
      </section>
      <div className="quick-grid">
        <a href="#/medical-records" className="quick-card quick-card--navy">
          <span>وصول سريع</span>
          <h2>سجلك الطبي في مكان واحد</h2>
          <p>استعرض الزيارات والتشخيصات السابقة</p>
          <b aria-hidden="true">←</b>
        </a>
        <a href="#/lab-results" className="quick-card quick-card--accent">
          <span>وصول سريع</span>
          <h2>نتائج التحاليل</h2>
          <p>راجع النتائج الجاهزة وحمّل ملخص التقرير</p>
          <b aria-hidden="true">←</b>
        </a>
        <div className="panel queue-card">
          <span>موعد المتابعة القادم</span>
          <strong>
            {upcoming.length
              ? formatDate(upcoming[0].date, { year: undefined })
              : "لا توجد مواعيد"}
          </strong>
          {upcoming.length > 0 && (
            <a href={`#/appointments/${upcoming[0].id}`}>عرض تفاصيل الموعد ←</a>
          )}
        </div>
      </div>
      <div className="dashboard-columns">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>مواعيدي</h2>
              <p>كل تفاصيل زياراتك في العيادة</p>
            </div>
            <a className="text-link" href="#/appointments">
              عرض التفاصيل
            </a>
          </div>
          <div className="tabs" aria-label="تصفية المواعيد">
            <button
              className={tab === "upcoming" ? "is-active" : ""}
              onClick={() => setTab("upcoming")}
              aria-pressed={tab === "upcoming"}
            >
              القادمة
            </button>
            <button
              className={tab === "past" ? "is-active" : ""}
              onClick={() => setTab("past")}
              aria-pressed={tab === "past"}
            >
              السابقة
            </button>
          </div>
          <div className="appointment-list">
            {shownAppointments.length ? (
              shownAppointments.map((item) => (
                <div className="appointment-row" key={item.id}>
                  <div className="date-tile">
                    <strong>
                      {new Intl.DateTimeFormat("ar-EG", {
                        day: "numeric",
                      }).format(new Date(`${item.date}T12:00:00`))}
                    </strong>
                    <span>
                      {new Intl.DateTimeFormat("ar-EG", {
                        month: "short",
                      }).format(new Date(`${item.date}T12:00:00`))}
                    </span>
                  </div>
                  <div className="appointment-summary">
                    <h3>{item.doctor}</h3>
                    <p>
                      {item.specialty} · {item.visitType} · {item.time}
                    </p>
                    <StatusBadge>{item.status}</StatusBadge>
                  </div>
                  <a
                    className="outline-button"
                    href={`#/appointments/${item.id}`}
                  >
                    التفاصيل
                  </a>
                </div>
              ))
            ) : (
              <EmptyState
                title="لا توجد مواعيد قادمة"
                description="ستظهر مواعيدك هنا بعد تسجيلها بواسطة المركز."
              />
            )}
          </div>
        </section>
        <section className="panel patient-summary">
          <div className="panel-heading">
            <div>
              <h2>بيانات المريض</h2>
              <p>ملخص بيانات ملفك الطبي</p>
            </div>
            <span className="avatar">{patient.initials}</span>
          </div>
          <DetailList
            items={[
              ["الاسم", patient.name],
              ["رقم الملف", `#${patient.id}`],
              ["فصيلة الدم", <bdi key="blood">{patient.bloodType}</bdi>],
              ["رقم الهاتف", <bdi key="phone">{patient.phone}</bdi>],
            ]}
          />
          <div className="health-note">
            <span>الأمراض المزمنة المسجلة</span>
            <strong>{patient.chronicConditions.join("، ") || "لا يوجد"}</strong>
          </div>
        </section>
      </div>
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>آخر الزيارات الطبية</h2>
            <p>أحدث التحديثات في سجلك</p>
          </div>
          <a href="#/medical-records" className="text-link">
            عرض السجل كاملًا ←
          </a>
        </div>
        <div className="table-scroll">
          <table className="portal-table">
            <thead>
              <tr>
                <th>التاريخ</th>
                <th>الطبيب</th>
                <th>التخصص</th>
                <th>نوع الزيارة</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {medicalRecords.slice(0, 3).map((record) => (
                <tr key={record.id}>
                  <td>{formatDate(record.date)}</td>
                  <td>
                    <strong>{record.doctor}</strong>
                  </td>
                  <td>{record.specialty}</td>
                  <td>{record.title}</td>
                  <td>
                    <StatusBadge>{record.status}</StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
