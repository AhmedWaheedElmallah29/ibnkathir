import { useState } from "react"
import { usePatient } from "../../context/PatientContext.jsx"
import {
  PageHeading,
  SearchInput,
  FilterSelect,
  StatusBadge,
  EmptyState,
  Modal,
  DetailList,
  ReportSheet,
} from "../../components/PortalUI.jsx"
import { formatDate, matchesQuery } from "../../lib/format.js"

export default function PrescriptionsScreen() {
  const {
    data: { prescriptions, patient },
  } = usePatient()
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [selected, setSelected] = useState(null)
  const filtered = prescriptions.filter(
    (item) =>
      (filter === "all" || item.status === filter) &&
      matchesQuery(
        [
          item.id,
          item.doctor,
          ...item.medicines.map((medicine) => medicine.name),
        ],
        query,
      ),
  )
  return (
    <>
      <PageHeading
        title="الروشتات الطبية"
        description="روشتاتك الحالية والسابقة كما سُجلت في ملفك الطبي."
      />
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>الروشتات المسجلة</h2>
            <p>{filtered.length} روشتة</p>
          </div>
          <div className="filter-toolbar">
            <SearchInput
              label="بحث في الروشتات"
              value={query}
              onChange={setQuery}
              placeholder="الطبيب أو اسم الدواء أو رقم الروشتة"
            />
            <FilterSelect
              label="حالة الروشتة"
              value={filter}
              onChange={setFilter}
            >
              <option value="all">كل الروشتات</option>
              <option>حالية</option>
              <option>سابقة</option>
            </FilterSelect>
          </div>
        </div>
        <div className="prescription-grid">
          {filtered.map((item) => (
            <article className="prescription-card" key={item.id}>
              <div className="card-topline">
                <span className="document-icon" aria-hidden="true">
                  Rx
                </span>
                <StatusBadge>{item.status}</StatusBadge>
              </div>
              <h3>{item.doctor}</h3>
              <p>
                {item.specialty} · {formatDate(item.date)}
              </p>
              <div className="prescription-lines">
                {item.medicines.map((medicine) => (
                  <div key={medicine.name}>
                    <strong>{medicine.name}</strong>
                    <span>{medicine.dose}</span>
                  </div>
                ))}
              </div>
              <div className="card-bottomline">
                <bdi>{item.id}</bdi>
                <button
                  className="soft-button"
                  onClick={() => setSelected(item)}
                  aria-label={`عرض روشتة ${item.id}`}
                >
                  عرض الروشتة
                </button>
              </div>
            </article>
          ))}
        </div>
        {!filtered.length && <EmptyState />}
      </section>
      <p className="data-disclaimer">
        الأدوية والروشتات المعروضة بيانات توضيحية لتجربة الواجهة فقط.
      </p>
      {selected && (
        <Modal
          title={`روشتة طبية — ${selected.id}`}
          onClose={() => setSelected(null)}
          actions={
            <>
              <button
                className="outline-button"
                onClick={() => setSelected(null)}
              >
                إغلاق
              </button>
              <button
                className="primary-button button-auto"
                onClick={() => window.print()}
              >
                طباعة الروشتة
              </button>
            </>
          }
        >
          <ReportSheet title="عيادة ابن كثير — روشتة تجريبية">
            <DetailList
              items={[
                ["المريض", patient.name],
                ["رقم الملف", `#${patient.id}`],
                ["الطبيب", selected.doctor],
                ["التاريخ", formatDate(selected.date)],
              ]}
            />
            <div className="table-scroll">
              <table className="portal-table">
                <thead>
                  <tr>
                    <th>الدواء</th>
                    <th>الجرعة</th>
                    <th>التكرار</th>
                    <th>المدة</th>
                  </tr>
                </thead>
                <tbody>
                  {selected.medicines.map((medicine) => (
                    <tr key={medicine.name}>
                      <td>
                        <strong>{medicine.name}</strong>
                      </td>
                      <td>{medicine.dose}</td>
                      <td>{medicine.frequency}</td>
                      <td>{medicine.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="form-notice">{selected.notes}</p>
          </ReportSheet>
        </Modal>
      )}
    </>
  )
}
