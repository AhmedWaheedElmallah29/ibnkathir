export default function EmergencyBadge() {
  return (
    <a
      href="tel:19011"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
      style={{
        background: "#fff0f3",
        color: "#ef003d",
        border: "1px solid #ffd6e0",
        textDecoration: "none",
      }}
      dir="rtl"
    >
      <span style={{ fontSize: 14 }}>🚨</span>
      <span>طوارئ مصر: 19011</span>
    </a>
  )
}
