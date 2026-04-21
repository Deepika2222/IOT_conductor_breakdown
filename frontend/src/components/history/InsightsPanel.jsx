import { Lightbulb, TrendingDown, Zap, AlertTriangle, ArrowRight } from 'lucide-react';

export default function InsightsPanel({ insights = [], onInsightClick, activeInsightId }) {

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
          <div 
            key={insight.id || idx} 
            className="group cursor-pointer"
            onClick={() => onInsightClick?.(insight)}
          >
            <div className={`flex gap-4 p-4 rounded-2xl border transition-all duration-300 backdrop-blur-sm group-hover:-translate-y-0.5 group-hover:shadow-lg ${
              activeInsightId === insight.id 
                ? `${insight.bg} border-white/20 ring-2 ring-primary/20 scale-[1.02]` 
                : `${insight.bg} border-white/5 hover:border-white/10`
            }`}>
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
              <div className={`transition-opacity flex items-center pr-1 ${activeInsightId === insight.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <ArrowRight size={14} className={activeInsightId === insight.id ? 'text-primary' : 'text-text-secondary/30'} />
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
