import { Lightbulb, TrendingDown, Zap, AlertTriangle, ArrowRight } from 'lucide-react';

export default function InsightsPanel() {
  const insights = [
    {
      type: "danger",
      icon: TrendingDown,
      text: "Current dropped sharply at 10:05 AM",
      description: "Detected a 45% decrease within 2 seconds. Potential conductor fatigue.",
      highlight: "10:05 AM",
      color: "text-danger",
      bg: "bg-danger/10"
    },
    {
      type: "warning",
      icon: Zap,
      text: "Voltage spike detected before fault",
      description: "Pre-breakdown surge observed on Pole #3 (Oak Ave). Correlation with previous events matches.",
      highlight: "Voltage spike",
      color: "text-warning",
      bg: "bg-warning/10"
    },
    {
      type: "primary",
      icon: AlertTriangle,
      text: "Tilt triggered at same timestamp as breakage",
      description: "Physical movement synchronized with electrical discontinuity confirms physical breakdown.",
      highlight: "tilt",
      color: "text-primary",
      bg: "bg-primary/10"
    }
  ];

  return (
    <div className="bg-card rounded-[20px] border border-white/5 p-6 shadow-layered h-full flex flex-col backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-primary/10 rounded-xl text-primary border border-primary/20">
          <Lightbulb size={20} />
        </div>
        <div>
          <h3 className="font-bold text-lg leading-tight text-white tracking-tight">AI Insights</h3>
          <p className="text-[10px] text-text-secondary/40 tracking-[0.2em] uppercase font-black">Core Intelligence</p>
        </div>
      </div>

      <div className="space-y-4 flex-grow">
        {insights.map((insight, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className={`flex gap-4 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 ${insight.bg} backdrop-blur-sm group-hover:-translate-y-0.5 group-hover:shadow-lg`}>
              <div className={`p-2 rounded-lg bg-black/40 h-fit ${insight.color} border border-white/5 shadow-inner`}>
                <insight.icon size={18} />
              </div>
              <div className="flex-grow">
                <p className="text-sm font-semibold text-white leading-snug">
                  {insight.text.split(insight.highlight).map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className={`font-black underline decoration-2 underline-offset-4 ${insight.color}`}>
                          {insight.highlight}
                        </span>
                      )}
                    </span>
                  ))}
                </p>
                <p className="text-xs text-text-secondary/70 mt-3 leading-relaxed">
                  {insight.description}
                </p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center pr-1">
                <ArrowRight size={14} className="text-text-secondary/30" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-white/[0.02] rounded-xl border border-dashed border-white/10">
        <p className="text-[10px] text-text-secondary/40 text-center uppercase tracking-[0.3em] font-black">
          Engine: GridTracker v4.2 • Sync: Active
        </p>
      </div>
    </div>
  );
}
