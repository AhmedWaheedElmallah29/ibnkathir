import logoImg from "@/assets/attachment-2.png"
export default function Logo({
  size = 40,
  showText = true,
  textColor = "#090c56",
  subtitle,
}) {
  return (
    <div className="flex items-center gap-2" dir="rtl">
      <img
        src={logoImg}
        alt="عيادة ابن كثير"
        width={size}
        height={size}
        style={{ borderRadius: "50%", flexShrink: 0 }}
        draggable={false}
      />
      {showText && (
        <div className="flex flex-col leading-tight">
          <span
            style={{
              color: textColor,
              fontWeight: 800,
              fontSize: size * 0.45,
              lineHeight: 1.2,
            }}
          >
            عيادة ابن كثير
          </span>
          {subtitle && (
            <span
              style={{
                color: "#696a76",
                fontWeight: 400,
                fontSize: size * 0.28,
                lineHeight: 1.3,
              }}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
