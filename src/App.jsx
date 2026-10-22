
import { useEffect, useState } from "react";

import HomepageScreen from "@/pages/discovery/HomepageScreen";
import DoctorsScreen from "@/pages/discovery/DoctorsScreen";
import DoctorProfileScreen from "@/pages/discovery/DoctorProfileScreen";
import VisitTypeScreen from "@/pages/booking/VisitTypeScreen";
import PatientInfoScreen from "@/pages/booking/PatientInfoScreen";
import ReviewScreen from "@/pages/booking/ReviewScreen";
import BookingSuccessScreen from "@/pages/booking/BookingSuccessScreen";
import PatientsScreen from "@/pages/reception/PatientsScreen";

const initialPatients = [
  { id: 1001, name: "عبدالله محمد بن صالح", phone: "01012345678", birthDate: "1979-05-14", gender: "ذكر", address: "مدينة نصر", chronicConditions: "ارتفاع ضغط الدم", history: "" },
  { id: 1002, name: "فاطمة الزهراء الشريبي", phone: "01123456789", birthDate: "1963-08-22", gender: "أنثى", address: "مصر الجديدة", chronicConditions: "السكري", history: "" },
  { id: 1003, name: "محمود السيد الجمال", phone: "01234567890", birthDate: "1986-02-03", gender: "ذكر", address: "التجمع الخامس", chronicConditions: "", history: "" },
];

const emptyBooking = {
  doctor: null, date: "", time: "", visitType: null, patient: null, paymentMethod: "",
};

const menu = [
  { title: "الاكتشاف", screens: [["homepage", "الصفحة الرئيسية"], ["doctors", "الأطباء"], ["doctor-profile", "ملف الطبيب"]] },
  { title: "خطوات الحجز", screens: [["booking-visit-type", "نوع الزيارة"], ["booking-patient-info", "بيانات المريض"], ["booking-review", "المراجعة"], ["booking-success", "نجاح الحجز"]] },
  { title: "الاستقبال", screens: [["reception-patients", "المرضى"]] },
];

function getInitialScreen() {
  return window.location.hash.slice(1) || "homepage";
}

export default function App() {
  const [screen, setScreen] = useState(getInitialScreen);
  const [menuOpen, setMenuOpen] = useState(false);
  const [patients, setPatients] = useState(initialPatients);
  const [, setSelectedPatientId] = useState();
  const [booking, setBooking] = useState(emptyBooking);
  const [bookings, setBookings] = useState([]);
  const [lastBooking, setLastBooking] = useState(null);
  const [specialtyFilter, setSpecialtyFilter] = useState("الكل");

  // Sync the screen with the URL
  useEffect(() => {
    const handleHashChange = () => setScreen(getInitialScreen());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Navigation
  function navigate(next) {
    window.location.hash = next;
    setScreen(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  }

  // Booking
  function updateBooking(changes) {
    setBooking((current) => ({ ...current, ...changes }));
  }

  function selectDoctor(doctor, next = "doctor-profile") {
    setBooking({ ...emptyBooking, doctor });
    navigate(next);
  }

  function confirmBooking() {
    const number = 203 + bookings.length;
    const queue = bookings.filter(
      (item) => item.doctor?.name === booking.doctor?.name && item.date === booking.date
    ).length + 1;

    const saved = { ...booking, id: bookings.length + 1, bookingNumber: number, queueNumber: queue };
    setBookings((current) => [...current, saved]);
    setLastBooking(saved);
    setBooking({ ...emptyBooking });
    navigate("booking-success");
  }

  // Patients
  function addPatient(patient) {
    const id = Math.max(...patients.map((item) => item.id), 1000) + 1;
    setPatients((current) => [...current, { ...patient, id }]);
    setSelectedPatientId(id);
    return id;
  }

  const shared = { navigate, currentScreen: screen };

  // Screens
  function renderScreen() {
    switch (screen) {
      case "homepage":
        return <HomepageScreen {...shared} selectDoctor={selectDoctor} setSpecialtyFilter={setSpecialtyFilter} />;

      case "doctors":
        return <DoctorsScreen {...shared} selectDoctor={selectDoctor} specialtyFilter={specialtyFilter} setSpecialtyFilter={setSpecialtyFilter} />;

      case "doctor-profile":
        return <DoctorProfileScreen {...shared} booking={booking} selectDoctor={selectDoctor} />;

      case "booking-visit-type":
        return <VisitTypeScreen {...shared} booking={booking} updateBooking={updateBooking} />;

      case "booking-patient-info":
        return <PatientInfoScreen {...shared} booking={booking} updateBooking={updateBooking} />;

      case "booking-review":
        return <ReviewScreen {...shared} booking={booking} confirmBooking={confirmBooking} />;

      case "booking-success":
        return <BookingSuccessScreen {...shared} booking={lastBooking} />;

      case "reception-patients":
        return <PatientsScreen {...shared} patients={patients} addPatient={addPatient} selectPatientForBooking={setSelectedPatientId} />;

      default:
        return <div />;
    }
  }

  return (
    <div dir="rtl">
      {renderScreen()}

      <button className="proto-toggle print-actions" type="button" aria-label="قائمة الشاشات" onClick={() => setMenuOpen((open) => !open)}>
        <span /><span /><span />
      </button>

      {menuOpen && (
        <>
          <button className="proto-backdrop" aria-label="إغلاق" onClick={() => setMenuOpen(false)} />
          <aside className="proto-menu" dir="ltr">
            <header>
              <strong>Ibn Kathir Clinic</strong>
              <button onClick={() => setMenuOpen(false)} aria-label="Close">×</button>
            </header>

            <nav>
              {menu.map((section) => (
                <section key={section.title}>
                  <h2>{section.title}</h2>
                  {section.screens.map(([id, label]) => (
                    <button key={id} className={id === screen ? "active" : ""} onClick={() => navigate(id)}>
                      {label}
                    </button>
                  ))}
                </section>
              ))}
            </nav>
          </aside>
        </>
      )}
    </div>
  );
}
