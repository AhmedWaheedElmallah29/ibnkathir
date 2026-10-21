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

function downloadReport(lab, patient) {
  const contents = [
    "عيادة ابن كثير — تقرير تجريبي غير مخصص للاستخدام الطبي",
    `المريض: ${patient.name}`,
    `رقم الملف: ${patient.id}`,
    `التحليل: ${lab.name} (${lab.englishName})`,
    `التاريخ: ${lab.date}`,
    "",
    ...lab.values.map(
      (item) =>
        `${item.name}: ${item.value} ${item.unit} | المرجع: ${item.reference}`,
    ),
  ].join("\n")
  const url = URL.createObjectURL(
    new Blob(["\uFEFF", contents], { type: "text/plain;charset=utf-8" }),
  )
  const link = document.createElement("a")
  link.href = url
  link.download = `${lab.id}-demo-report.txt`
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export default function LabResultsScreen() {
  const {
    data: { labResults, patient },
  } = usePatient()
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [selected, setSelected] = useState(null)
  const filtered = labResults.filter(
    (item) =>
      (filter === "all" || item.status === filter) &&
      matchesQuery([item.name, item.englishName, item.id], query),
  )
  return (
    <>
      <PageHeading
        title="نتائج التحاليل"
        description="تابع حالة الفحوصات واستعرض التقارير الجاهزة."
      />
      <section
        className="stats-grid stats-grid--three"
        aria-label="ملخص التحاليل"
      >
        <div className="panel stat-card">
          <span>إجمالي التحاليل</span>
          <strong>{labResults.length}</strong>
        </div>
        <div className="panel stat-card">
          <span>نتائج جاهزة</span>
          <strong className="text-green">
            {labResults.filter((item) => item.status === "جاهز").length}
          </strong>
        </div>
        <div className="panel stat-card">
          <span>قيد التجهيز</span>
          <strong className="text-amber">
            {labResults.filter((item) => item.status !== "جاهز").length}
          </strong>
        </div>
      </section>
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>الفحوصات المسجلة</h2>
            <p>{filtered.length} نتائج</p>
          </div>
          <div className="filter-toolbar">
            <SearchInput
              label="بحث في التحاليل"
              value={query}
              onChange={setQuery}
              placeholder="اسم التحليل أو رقم التقرير"
            />
            <FilterSelect
              label="حالة التحليل"
              value={filter}
              onChange={setFilter}
            >
              <option value="all">كل الحالات</option>
              <option>جاهز</option>
              <option>قيد التجهيز</option>
            </FilterSelect>
          </div>
        </div>
        {filtered.length ? (
          <div className="table-scroll">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>التحليل</th>
                  <th>التاريخ</th>
                  <th>المعمل</th>
                  <th>الحالة</th>
                  <th>التقرير</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lab) => (
                  <tr key={lab.id}>
                    <td>
                      <strong>{lab.name}</strong>
                      <small className="table-subtitle" dir="ltr">
                        {lab.englishName}
                      </small>
                    </td>
                    <td>{formatDate(lab.date)}</td>
                    <td>{lab.lab}</td>
                    <td>
                      <StatusBadge>{lab.status}</StatusBadge>
                    </td>
                    <td>
                      <button
                        className="soft-button"
                        disabled={lab.status !== "جاهز"}
                        onClick={() => setSelected(lab)}
                        aria-label={`عرض تقرير ${lab.name}`}
                      >
                        {lab.status === "جاهز"
                          ? "عرض التقرير"
                          : "بانتظار النتيجة"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState />
        )}
      </section>
      {selected && (
        <Modal
          title={selected.name}
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
                className="outline-button"
                onClick={() => downloadReport(selected, patient)}
              >
                تحميل ملخص TXT
              </button>
              <button
                className="primary-button button-auto"
                onClick={() => window.print()}
              >
                طباعة التقرير
              </button>
            </>
          }
        >
          <ReportSheet title="تقرير نتائج التحليل">
            <DetailList
              items={[
                ["اسم المريض", patient.name],
                ["رقم التقرير", selected.id],
                ["تاريخ الفحص", formatDate(selected.date)],
                ["المعمل", selected.lab],
              ]}
            />
            <div className="table-scroll">
              <table className="portal-table lab-values">
                <thead>
                  <tr>
                    <th>الفحص</th>
                    <th>النتيجة</th>
                    <th>الوحدة</th>
                    <th>القيمة المرجعية</th>
                  </tr>
                </thead>
                <tbody>
                  {selected.values.map((item) => (
                    <tr key={item.name}>
                      <td>
                        <bdi>{item.name}</bdi>
                      </td>
                      <td>
                        <strong>{item.value}</strong>
                      </td>
                      <td>
                        <bdi>{item.unit}</bdi>
                      </td>
                      <td>
                        <bdi>{item.reference}</bdi>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="form-notice">
              قيم تجريبية لعرض التقرير فقط، ولا تمثل نتائج طبية حقيقية.
            </p>
          </ReportSheet>
        </Modal>
      )}
    </>
  )
}
