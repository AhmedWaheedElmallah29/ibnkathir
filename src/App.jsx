import { useEffect, useMemo, useState } from "react"

// Data
import {
  doctors as initialDoctors,
  initialAppointments,
  initialPatients,
} from "@/data/medicalCenter"

// Discovery Screens
import HomepageScreen from "@/pages/discovery/HomepageScreen"
import DoctorsScreen from "@/pages/discovery/DoctorsScreen"
import DoctorProfileScreen from "@/pages/discovery/DoctorProfileScreen"

// Booking Screens
import DateTimeScreen from "@/pages/booking/DateTimeScreen"
import VisitTypeScreen from "@/pages/booking/VisitTypeScreen"
import PatientInfoScreen from "@/pages/booking/PatientInfoScreen"
import PaymentScreen from "@/pages/booking/PaymentScreen"
import ReviewScreen from "@/pages/booking/ReviewScreen"
import BookingSuccessScreen from "@/pages/booking/BookingSuccessScreen"

// Auth Screens
import LoginScreen from "@/pages/auth/LoginScreen"
import CreateAccountScreen from "@/pages/auth/CreateAccountScreen"
import ForgotPasswordScreen from "@/pages/auth/ForgotPasswordScreen"
import ResetPasswordScreen from "@/pages/auth/ResetPasswordScreen"
import RoleLoginScreen from "@/pages/auth/RoleLoginScreen"

// Patient Portal Screens
import PatientDashboardScreen from "@/pages/patient/PatientDashboardScreen"
import AppointmentDetailsScreen from "@/pages/patient/AppointmentDetailsScreen"
import MedicalRecordsScreen from "@/pages/patient/MedicalRecordsScreen"
import PrescriptionsScreen from "@/pages/patient/PrescriptionsScreen"
import LabResultsScreen from "@/pages/patient/LabResultsScreen"
import ClinicalFollowupScreen from "@/pages/patient/ClinicalFollowupScreen"

// Reception Screens
import ReceptionDashboardScreen from "@/pages/reception/ReceptionDashboardScreen"
import PatientsScreen from "@/pages/reception/PatientsScreen"
import BookingFlowScreen from "@/pages/reception/BookingFlowScreen"
import ReceiptScreen from "@/pages/reception/ReceiptScreen"

// Doctor Portal Screens
import DoctorDashboardScreen from "@/pages/doctor/DoctorDashboardScreen"
import DoctorScheduleScreen from "@/pages/doctor/DoctorScheduleScreen"
import WaitingQueueScreen from "@/pages/doctor/WaitingQueueScreen"
import PatientRecordScreen from "@/pages/doctor/PatientRecordScreen"
import {
  CenterDoctorDashboard,
  CenterDoctorSchedule,
  CenterDoctorRecords,
} from "@/pages/doctor/CenterDoctorScreens"

// Admin Screens
import {
  AdminDashboardScreen,
  AdminDoctorsScreen,
  AdminFinanceScreen,
  DoctorManagementScreen,
} from "@/pages/admin/AdminScreens"

// System Screens
import LoadingScreen from "@/pages/system/LoadingScreen"
import ErrorScreen from "@/pages/system/ErrorScreen"
import EmptyStateScreen from "@/pages/system/EmptyStateScreen"

const sections = [
  {
    number: "01",
    title: "الاكتشاف والجمهور",
    screens: [
      { id: "homepage", title: "الصفحة الرئيسية" },
      { id: "doctors", title: "دليل الأطباء" },
      { id: "doctor-profile", title: "ملف الطبيب" },
    ],
  },
  {
    number: "02",
    title: "خطوات حجز المريض",
    screens: [
      { id: "booking-datetime", title: "اختيار التاريخ والوقت" },
      { id: "booking-visit-type", title: "نوع الزيارة" },
      { id: "booking-patient-info", title: "بيانات المريض" },
      { id: "booking-payment", title: "الدفع والتأكيد" },
      { id: "booking-review", title: "مراجعة الحجز" },
      { id: "booking-success", title: "تأكيد الحجز بنجاح" },
    ],
  },
  {
    number: "03",
    title: "الحسابات وتسجيل الدخول",
    screens: [
      { id: "login", title: "تسجيل الدخول" },
      { id: "create-account", title: "إنشاء حساب جديد" },
      { id: "forgot-password", title: "نسيت كلمة المرور" },
      { id: "reset-password", title: "إعادة ضبط كلمة المرور" },
    ],
  },
  {
    number: "04",
    title: "بوابة المريض",
    screens: [
      { id: "patient-dashboard", title: "لوحة تحكم المريض" },
      { id: "appointment-details", title: "تفاصيل الموعد" },
      { id: "medical-records", title: "السجلات الطبية" },
      { id: "prescriptions", title: "الروشتات والوصفات" },
      { id: "lab-results", title: "نتائج التحاليل" },
      { id: "clinical-followup", title: "المتابعة الإكلينيكية" },
    ],
  },
  {
    number: "05",
    title: "بوابة الاستقبال",
    screens: [
      { id: "reception-dashboard", title: "لوحة الاستقبال" },
      { id: "reception-patients", title: "سجل المرضى" },
      { id: "reception-booking", title: "حجز موعد بالمركز" },
      { id: "reception-receipt", title: "إيصال الحجز للطباعة" },
    ],
  },
  {
    number: "06",
    title: "بوابة الطبيب والعيادة",
    screens: [
      { id: "doctor-dashboard", title: "لوحة الطبيب والعيادة" },
      { id: "doctor-schedule", title: "جدول المواعيد" },
      { id: "waiting-queue", title: "طابور الانتظار" },
      { id: "patient-record", title: "ملف وسجل المريض" },
      { id: "center-doctor-dashboard", title: "طابور المركز الرئيسي" },
      { id: "center-doctor-schedule", title: "جدول أطباء المركز" },
      { id: "center-doctor-records", title: "أرشيف سجلات المركز" },
    ],
  },
  {
    number: "07",
    title: "إدارة المركز الطبي",
    screens: [
      { id: "admin-dashboard", title: "نظرة عامة على المركز" },
      { id: "admin-doctors", title: "الأطباء والتخصصات" },
      { id: "admin-finance", title: "الإدارة المالية" },
      { id: "admin-doctor-management", title: "إدارة الأطباء والجداول" },
    ],
  },
  {
    number: "08",
    title: "شاشات النظام",
    screens: [
      { id: "system-loading", title: "شاشة التحميل" },
      { id: "system-error", title: "شاشة الخطأ" },
      { id: "system-empty", title: "شاشة الحالة الفارغة" },
    ],
  },
]

const validScreens = [
  ...sections.flatMap((section) => section.screens.map((screen) => screen.id)),
  "reception-login",
  "doctor-login",
  "admin-login",
]

const emptyBooking = {
  doctor: null,
  date: "",
  time: "",
  visitType: null,
  patient: null,
  paymentMethod: "",
}

function getInitialScreen() {
  const hash = window.location.hash.slice(1)
  return validScreens.includes(hash) ? hash : "homepage"
}

export default function App() {
  const [screen, setScreen] = useState(getInitialScreen)
  const [menuOpen, setMenuOpen] = useState(false)

  // Shared Data States
  const [patients, setPatients] = useState(initialPatients)
  const [appointments, setAppointments] = useState(initialAppointments)
  const [doctors, setDoctors] = useState(initialDoctors)

  // Selection / Flow States
  const [lastAppointmentId, setLastAppointmentId] = useState()
  const [selectedPatientId, setSelectedPatientId] = useState()
  const [booking, setBooking] = useState(emptyBooking)
  const [bookings, setBookings] = useState([])
  const [lastBooking, setLastBooking] = useState(null)
  const [specialtyFilter, setSpecialtyFilter] = useState("الكل")

  // Hash Navigation Sync
  useEffect(() => {
    const handleHashChange = () => setScreen(getInitialScreen())
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  function navigate(nextScreen) {
    window.location.hash = nextScreen
    setScreen(nextScreen)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: "instant" })
  }

  // Booking Flow Actions
  function updateBooking(changes) {
    setBooking((current) => ({ ...current, ...changes }))
  }

  function selectDoctor(doctor, next = "doctor-profile") {
    setBooking({ ...emptyBooking, doctor })
    navigate(next)
  }

  function confirmBooking() {
    const number = 203 + bookings.length
    const queue =
      bookings.filter(
        (item) =>
          item.doctor?.name === booking.doctor?.name &&
          item.date === booking.date,
      ).length + 1

    const saved = {
      ...booking,
      id: bookings.length + 1,
      bookingNumber: number,
      queueNumber: queue,
    }
    setBookings((current) => [...current, saved])
    setLastBooking(saved)
    setBooking({ ...emptyBooking })
    navigate("booking-success")
  }

  // Patient Actions
  function addPatient(patient) {
    const id = Math.max(...patients.map((item) => item.id), 1000) + 1
    setPatients((current) => [...current, { ...patient, id }])
    setSelectedPatientId(id)
    return id
  }

  // Appointment Actions
  function createAppointment(data) {
    setAppointments((current) => {
      const id = Math.max(...current.map((item) => item.id), 0) + 1
      const next = {
        ...data,
        id,
        bookingNumber:
          Math.max(...current.map((item) => item.bookingNumber), 202) + 1,
        queueNumber:
          current.filter(
            (item) =>
              item.date === data.date && item.doctorId === data.doctorId,
          ).length + 1,
      }
      setLastAppointmentId(id)
      return [...current, next]
    })
  }

  function updateAppointment(id, changes) {
    setAppointments((current) =>
      current.map((item) => (item.id === id ? { ...item, ...changes } : item)),
    )
  }

  // Doctor Management Actions
  function addDoctor(doctor) {
    setDoctors((current) => [
      ...current,
      { ...doctor, id: Math.max(...current.map((item) => item.id), 0) + 1 },
    ])
  }

  function updateDoctor(id, doctor) {
    setDoctors((current) =>
      current.map((item) => (item.id === id ? { ...doctor, id } : item)),
    )
  }

  function deleteDoctor(id) {
    setDoctors((current) => current.filter((item) => item.id !== id))
  }

  const lastAppointment = useMemo(
    () => appointments.find((item) => item.id === lastAppointmentId),
    [appointments, lastAppointmentId],
  )

  const shared = {
    navigate,
    currentScreen: screen,
    patients,
    doctors,
    appointments,
  }

  function renderScreen() {
    switch (screen) {
      // 01. Discovery
      case "homepage":
        return (
          <HomepageScreen
            {...shared}
            selectDoctor={selectDoctor}
            setSpecialtyFilter={setSpecialtyFilter}
          />
        )
      case "doctors":
        return (
          <DoctorsScreen
            {...shared}
            selectDoctor={selectDoctor}
            specialtyFilter={specialtyFilter}
            setSpecialtyFilter={setSpecialtyFilter}
          />
        )
      case "doctor-profile":
        return (
          <DoctorProfileScreen
            {...shared}
            booking={booking}
            selectDoctor={selectDoctor}
          />
        )

      // 02. Booking Steps
      case "booking-datetime":
        return <DateTimeScreen {...shared} />
      case "booking-visit-type":
        return (
          <VisitTypeScreen
            {...shared}
            booking={booking}
            updateBooking={updateBooking}
          />
        )
      case "booking-patient-info":
        return (
          <PatientInfoScreen
            {...shared}
            booking={booking}
            updateBooking={updateBooking}
          />
        )
      case "booking-payment":
        return <PaymentScreen {...shared} />
      case "booking-review":
        return (
          <ReviewScreen
            {...shared}
            booking={booking}
            confirmBooking={confirmBooking}
          />
        )
      case "booking-success":
        return <BookingSuccessScreen {...shared} booking={lastBooking} />

      // 03. Authentication
      case "login":
      case "reception-login":
      case "doctor-login":
      case "admin-login":
        return <LoginScreen navigate={navigate} />
      case "create-account":
        return <CreateAccountScreen navigate={navigate} />
      case "forgot-password":
        return <ForgotPasswordScreen navigate={navigate} />
      case "reset-password":
        return <ResetPasswordScreen navigate={navigate} />

      // 04. Patient Portal
      case "patient-dashboard":
        return <PatientDashboardScreen {...shared} />
      case "appointment-details":
        return <AppointmentDetailsScreen {...shared} />
      case "medical-records":
        return <MedicalRecordsScreen {...shared} />
      case "prescriptions":
        return <PrescriptionsScreen {...shared} />
      case "lab-results":
        return <LabResultsScreen {...shared} />
      case "clinical-followup":
        return <ClinicalFollowupScreen {...shared} />

      // 05. Reception Portal
      case "reception-dashboard":
        return <ReceptionDashboardScreen {...shared} />
      case "reception-patients":
        return (
          <PatientsScreen
            navigate={navigate}
            currentScreen={screen}
            patients={patients}
            addPatient={addPatient}
            selectPatientForBooking={setSelectedPatientId}
          />
        )
      case "reception-booking":
        return (
          <BookingFlowScreen
            {...shared}
            createAppointment={createAppointment}
            preselectedPatientId={selectedPatientId}
          />
        )
      case "reception-receipt":
        return (
          <ReceiptScreen
            navigate={navigate}
            appointment={lastAppointment}
            patients={patients}
            doctors={doctors}
          />
        )

      // 06. Doctor Portal
      case "doctor-dashboard":
        return <DoctorDashboardScreen {...shared} />
      case "doctor-schedule":
        return <DoctorScheduleScreen {...shared} />
      case "waiting-queue":
        return <WaitingQueueScreen {...shared} />
      case "patient-record":
        return <PatientRecordScreen {...shared} />
      case "center-doctor-dashboard":
        return (
          <CenterDoctorDashboard
            {...shared}
            updateAppointment={updateAppointment}
          />
        )
      case "center-doctor-schedule":
        return (
          <CenterDoctorSchedule
            {...shared}
            updateAppointment={updateAppointment}
          />
        )
      case "center-doctor-records":
        return (
          <CenterDoctorRecords
            {...shared}
            updateAppointment={updateAppointment}
          />
        )

      // 07. Admin Portal
      case "admin-dashboard":
        return <AdminDashboardScreen {...shared} />
      case "admin-doctors":
        return <AdminDoctorsScreen {...shared} />
      case "admin-finance":
        return <AdminFinanceScreen {...shared} />
      case "admin-doctor-management":
        return (
          <DoctorManagementScreen
            {...shared}
            addDoctor={addDoctor}
            updateDoctor={updateDoctor}
            deleteDoctor={deleteDoctor}
          />
        )

      // 08. System Screens
      case "system-loading":
        return <LoadingScreen {...shared} />
      case "system-error":
        return <ErrorScreen {...shared} />
      case "system-empty":
        return <EmptyStateScreen {...shared} />

      default:
        return (
          <HomepageScreen
            {...shared}
            selectDoctor={selectDoctor}
            setSpecialtyFilter={setSpecialtyFilter}
          />
        )
    }
  }

  return (
    <div dir="rtl">
      {renderScreen()}

      {/* Floating Toggle Button for Prototype Menu */}
      <button
        className="proto-toggle print-actions"
        type="button"
        aria-label="فتح قائمة الشاشات"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Prototype Screen Switcher Sidebar */}
      {menuOpen && (
        <>
          <button
            className="proto-backdrop"
            aria-label="إغلاق قائمة الشاشات"
            onClick={() => setMenuOpen(false)}
          />
          <aside
            className="proto-menu"
            dir="ltr"
            aria-label="Prototype screens"
          >
            <header>
              <strong>عيادة ابن كثير — النماذج التفاعلية</strong>
              <button onClick={() => setMenuOpen(false)} aria-label="Close">
                ×
              </button>
            </header>
            <nav>
              {sections.map((section) => (
                <section key={section.number}>
                  <h2>
                    <span>{section.number}</span> {section.title}
                  </h2>
                  {section.screens.map((item) => (
                    <button
                      key={item.id}
                      className={item.id === screen ? "active" : ""}
                      onClick={() => navigate(item.id)}
                    >
                      {item.title}
                    </button>
                  ))}
                </section>
              ))}
            </nav>
          </aside>
        </>
      )}
    </div>
  )
}
