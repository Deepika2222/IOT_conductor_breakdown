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
  ZAxis,
  ReferenceLine,
  ReferenceDot
} from 'recharts';

export default function ChartCard({ title, subtitle, data, type, dataKey, color, unit, highlightedTime }) {
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
        <div>
          <h3 className="font-semibold text-content/90 tracking-tight">{title}</h3>
          {subtitle && <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1 opacity-70">Range: {subtitle}</p>}
        </div>
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
                tickFormatter={(val) => {
                  const point = data.find(p => p.time === val);
                  return point ? point.displayLabel : val;
                }}
              />
              <YAxis 
                hide 
                domain={['auto', 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {highlightedTime && (
                <ReferenceLine 
                  x={highlightedTime} 
                  stroke={color} 
                  strokeDasharray="3 3" 
                  strokeWidth={2}
                  label={{ 
                    position: 'top', 
                    value: 'Anomaly', 
                    fill: color, 
                    fontSize: 10, 
                    fontWeight: 'bold',
                    className: 'animate-pulse'
                  }}
                />
              )}

              {highlightedTime && data.find(d => d.time === highlightedTime) && (
                <ReferenceDot
                  x={highlightedTime}
                  y={data.find(d => d.time === highlightedTime)[dataKey]}
                  r={6}
                  fill={color}
                  stroke="#fff"
                  strokeWidth={2}
                  className="animate-pulse"
                />
              )}

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
                type="category"
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'rgba(226,232,240,0.3)', fontSize: 10 }} 
                dy={10}
                tickFormatter={(val) => {
                  const point = data.find(p => p.time === val);
                  return point ? point.displayLabel : val;
                }}
              />
              <YAxis 
                type="number" 
                dataKey={dataKey} 
                name={unit} 
                hide 
                domain={[0, 2]} 
              />
              <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.1)' }} />
              
              {highlightedTime && (
                <ReferenceLine 
                  x={highlightedTime} 
                  stroke={color} 
                  strokeDasharray="4 4" 
                  strokeWidth={2}
                />
              )}

              {highlightedTime && data.find(d => d.time === highlightedTime) && (
                <ReferenceDot
                  x={highlightedTime}
                  y={data.find(d => d.time === highlightedTime)[dataKey]}
                  r={6}
                  fill={color}
                  stroke="#fff"
                  strokeWidth={2}
                  className="animate-pulse"
                />
              )}
              
              <Scatter 
                name={title} 
                data={data} 
                dataKey={dataKey}
                fill={color}
              />
            </ScatterChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
