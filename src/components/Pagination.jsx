export const PAGE_SIZE = 6
export function pageItems(items, page, pageSize = PAGE_SIZE) {
  return items.slice((page - 1) * pageSize, page * pageSize)
}
export default function Pagination({
  total,
  page,
  onPageChange,
  pageSize = PAGE_SIZE,
}) {
  const pages = Math.ceil(total / pageSize)
  if (pages <= 1) return null
  return (
    <div
      className="flex items-center justify-center gap-2 border-t border-[#e8e9f0] p-4"
      dir="rtl"
    >
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-lg border border-[#e8e9f0] px-3 py-1.5 text-xs font-bold text-[#696a76] disabled:opacity-40"
      >
        السابق
      </button>
      {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          aria-current={page === number ? "page" : undefined}
          className={`grid h-8 w-8 place-items-center rounded-lg text-xs font-bold ${
            page === number
              ? "bg-[#090c56] text-white"
              : "border border-[#e8e9f0] text-[#696a76]"
          }`}
        >
          {number}
        </button>
      ))}
      <button
        disabled={page === pages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-lg border border-[#e8e9f0] px-3 py-1.5 text-xs font-bold text-[#696a76] disabled:opacity-40"
      >
        التالي
      </button>
    </div>
  )
}
