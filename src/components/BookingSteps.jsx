const steps = [
    { id: 1, label: "التاريخ والوقت" },
    { id: 2, label: "نوع الزيارة" },
    { id: 3, label: "بيانات المريض" },
    { id: 4, label: "الدفع" },
    { id: 5, label: "المراجعة" },
];
export default function BookingSteps({ current }) {
    return (<div className="flex items-center justify-center gap-0 py-4" dir="rtl">
      {steps.map((step, i) => (<div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={step.id < current
                ? { background: "#12b76a", color: "#fff" }
                : step.id === current
                    ? { background: "#090c56", color: "#fff" }
                    : { background: "#e8e9f0", color: "#696a76" }}>
              {step.id < current ? "✓" : step.id}
            </div>
            <span className="text-xs mt-1 whitespace-nowrap" style={{ color: step.id === current ? "#090c56" : "#696a76", fontWeight: step.id === current ? 700 : 400 }}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (<div className="w-12 h-0.5 mb-4 mx-1" style={{ background: step.id < current ? "#12b76a" : "#e8e9f0" }}/>)}
        </div>))}
    </div>);
}
