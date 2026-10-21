import { useState } from "react"
import { usePatient } from "../../context/PatientContext.jsx"
import {
  PageHeading,
  SearchInput,
  FilterSelect,
  StatusBadge,
  EmptyState,
  Pagination,
  Modal,
  DetailList,
} from "../../components/PortalUI.jsx"
import { formatDate, matchesQuery } from "../../lib/format.js"

export default function MedicalRecordsScreen() {
  const {
    data: { medicalRecords, patient },
  } = usePatient()
  const [query, setQuery] = useState("")
  const [specialty, setSpecialty] = useState("all")
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)
  const filtered = medicalRecords.filter(
    (item) =>
      (specialty === "all" || item.specialty === specialty) &&
      matchesQuery([item.doctor, item.title, item.id, item.date], query),
  )
  const pageSize = 4
  return (
    <>
      <PageHeading
        title="السجل الطبي"
        description="استعرض زياراتك السابقة والتشخيصات وملاحظات الأطباء."
      />
      <div className="summary-strip panel">
        <div>
          <span>رقم الملف</span>
          <strong dir="ltr">#{patient.id}</strong>
        </div>
        <div>
          <span>المريض</span>
          <strong>{patient.name}</strong>
        </div>
        <div>
          <span>إجمالي الزيارات</span>
          <strong>{medicalRecords.length} زيارات</strong>
        </div>
        <div>
          <span>آخر زيارة</span>
          <strong>
            {medicalRecords.length ? formatDate(medicalRecords[0].date) : "—"}
          </strong>
        </div>
      </div>
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>الزيارات المسجلة</h2>
            <p aria-live="polite">{filtered.length} نتائج في السجل الطبي</p>
          </div>
          <div className="filter-toolbar">
            <SearchInput
              label="بحث في السجل الطبي"
              value={query}
              onChange={(value) => {
                setQuery(value)
                setPage(1)
              }}
              placeholder="الطبيب أو نوع الزيارة أو رقمها"
            />
            <FilterSelect
              label="التخصص"
              value={specialty}
              onChange={(value) => {
                setSpecialty(value)
                setPage(1)
              }}
            >
              <option value="all">كل التخصصات</option>
              {[...new Set(medicalRecords.map((item) => item.specialty))].map(
                (item) => (
                  <option key={item}>{item}</option>
                ),
              )}
            </FilterSelect>
          </div>
        </div>
        {filtered.length ? (
          <>
            <div className="table-scroll">
              <table className="portal-table">
                <thead>
                  <tr>
                    <th>رقم الزيارة</th>
                    <th>التاريخ</th>
                    <th>الطبيب</th>
                    <th>التخصص</th>
                    <th>نوع الزيارة</th>
                    <th>الحالة</th>
                    <th>الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered
                    .slice((page - 1) * pageSize, page * pageSize)
                    .map((record) => (
                      <tr key={record.id}>
                        <td>
                          <bdi>{record.id}</bdi>
                        </td>
                        <td>{formatDate(record.date)}</td>
                        <td>
                          <strong>{record.doctor}</strong>
                        </td>
                        <td>{record.specialty}</td>
                        <td>{record.title}</td>
                        <td>
                          <StatusBadge>{record.status}</StatusBadge>
                        </td>
                        <td>
                          <button
                            className="soft-button"
                            onClick={() => setSelected(record)}
                            aria-label={`تفاصيل زيارة ${record.id}`}
                          >
                            عرض التفاصيل
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <Pagination
              page={page}
              total={filtered.length}
              pageSize={pageSize}
              onChange={setPage}
            />
          </>
        ) : (
          <EmptyState />
        )}
      </section>
      {selected && (
        <Modal
          title="تفاصيل الزيارة الطبية"
          onClose={() => setSelected(null)}
          actions={
            <>
              <button
                className="outline-button"
                onClick={() => setSelected(null)}
              >
                إغلاق
              </button>
              {selected.prescriptionId && (
                <a
                  className="primary-button button-auto"
                  href={`#/prescriptions`}
                  onClick={() => setSelected(null)}
                >
                  عرض الروشتات
                </a>
              )}
            </>
          }
        >
          <DetailList
            items={[
              ["رقم الزيارة", selected.id],
              ["التاريخ", formatDate(selected.date)],
              ["الطبيب", selected.doctor],
              ["التخصص", selected.specialty],
              ["نوع الزيارة", selected.title],
              [
                "الحالة",
                <StatusBadge key="status">{selected.status}</StatusBadge>,
              ],
            ]}
          />
          <div className="record-note">
            <h3>ملخص التشخيص</h3>
            <p>{selected.diagnosis}</p>
            <h3>ملاحظات الطبيب</h3>
            <p>{selected.notes}</p>
          </div>
        </Modal>
      )}
    </>
  )
}
