import { usePatient } from "../../context/PatientContext.jsx"
import {
  PageHeading,
  StatusBadge,
  EmptyState,
  DetailList,
} from "../../components/PortalUI.jsx"
import Logo from "../../components/Logo.jsx"
import { formatDate, currency } from "../../lib/format.js"

export default function AppointmentDetailsScreen({ appointmentId }) {
  const {
    data: { appointments, patient },
  } = usePatient()
  const appointment = appointmentId
    ? appointments.find((item) => item.id === appointmentId)
    : (appointments.find((item) => item.status === "مؤكد") ?? appointments[0])
  if (!appointment)
    return (
      <>
        <PageHeading title="تفاصيل الموعد" />
        <section className="panel">
          <EmptyState
            title="الموعد غير موجود"
            description="تحقق من رقم الموعد أو ارجع إلى لوحة المريض."
          >
            <a className="outline-button" href="#/dashboard">
              العودة إلى لوحة المريض
            </a>
          </EmptyState>
        </section>
      </>
    )
  return (
    <>
      <PageHeading
        title="تفاصيل الموعد"
        description="بيانات الحجز والزيارة وإيصال الموعد."
      >
        <button
          className="primary-button button-auto"
          onClick={() => window.print()}
        >
          طباعة الإيصال
        </button>
      </PageHeading>
      <nav className="appointment-picker" aria-label="اختيار الموعد">
        {appointments.map((item) => (
          <a
            key={item.id}
            href={`#/appointments/${item.id}`}
            className={appointment.id === item.id ? "is-active" : ""}
            aria-current={appointment.id === item.id ? "page" : undefined}
          >
            <span>حجز #{item.id}</span>
            <small>{formatDate(item.date)}</small>
          </a>
        ))}
      </nav>
      <article
        className="receipt-paper print-area"
        aria-labelledby="receipt-title"
      >
        <header className="receipt-header">
          <div>
            <Logo />
            <span>إيصال حجز موعد — نسخة تجريبية</span>
          </div>
          <div className="receipt-number">
            <span>رقم الحجز</span>
            <strong dir="ltr">#{appointment.id}</strong>
          </div>
        </header>
        <div className="receipt-body">
          <div className="receipt-highlights">
            <div>
              <span>رقم الدور</span>
              <strong dir="ltr">#{appointment.queueNumber}</strong>
            </div>
            <div>
              <span>المبلغ المدفوع</span>
              <strong>{currency(appointment.paid)}</strong>
            </div>
          </div>
          <h2 id="receipt-title">
            تفاصيل الموعد {appointment.status === "مؤكد" ? "المؤكد" : "المسجل"}
          </h2>
          <DetailList
            items={[
              ["اسم المريض", patient.name],
              ["رقم الملف", <bdi key="id">#{patient.id}</bdi>],
              ["الطبيب", appointment.doctor],
              ["التخصص", appointment.specialty],
              ["نوع الزيارة", appointment.visitType],
              [
                "اليوم والتاريخ",
                formatDate(appointment.date, { weekday: "long" }),
              ],
              ["وقت الموعد", appointment.time],
              [
                "حالة الحجز",
                <StatusBadge key="status">{appointment.status}</StatusBadge>,
              ],
              ["الفرع", appointment.branch],
              ["مكان العيادة", appointment.room],
              ["قيمة الزيارة", currency(appointment.fee)],
              ["المبلغ المتبقي", currency(appointment.fee - appointment.paid)],
            ]}
          />
          <p className="receipt-notice">
            يرجى الحضور قبل الموعد بـ ١٥ دقيقة والاحتفاظ بهذا الإيصال. رقم الحجز
            ورقم الدور مخصصان لهذا اليوم والطبيب.
          </p>
          <p className="receipt-contact">
            عيادة ابن كثير · {appointment.branch} · <bdi>02-3344-9988</bdi>
          </p>
        </div>
      </article>
    </>
  )
}
