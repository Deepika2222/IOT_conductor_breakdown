import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';

export default function ChartCard({ title, data, type, dataKey, color, unit }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-white/10 p-3 rounded-lg shadow-2xl backdrop-blur-md">
          <p className="text-content/50 text-xs mb-1 font-medium">{label}</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
            <p className="text-white font-bold">
              {payload[0].value} <span className="text-xs font-normal text-content/70">{unit}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-card border border-white/5 p-6 shadow-layered relative overflow-hidden group">
      {/* Decorative gradient corner */}
      <div 
        className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-[40px] opacity-20 transition-opacity group-hover:opacity-40"
        style={{ backgroundColor: color }}
      ></div>

      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-content/90 tracking-tight">{title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-content/40 uppercase tracking-widest">Live Feed</span>
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></div>
        </div>
      </div>

      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'rgba(226,232,240,0.3)', fontSize: 10 }} 
                dy={10}
              />
              <YAxis 
                hide 
                domain={['auto', 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey={dataKey} 
                stroke={color} 
                strokeWidth={2} 
                fillOpacity={1} 
                fill={`url(#gradient-${dataKey})`} 
                animationDuration={1500}
              />
            </AreaChart>
          ) : (
            <ScatterChart>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
               <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'rgba(226,232,240,0.3)', fontSize: 10 }} 
                dy={10}
              />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.1)' }} />
              <Scatter 
                name={title} 
                data={data} 
                fill={color}
              />
            </ScatterChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
