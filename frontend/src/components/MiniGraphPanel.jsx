import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

function SmallGraph({ data, dataKey, color, title }) {
  return (
    <div className="bg-card rounded-[20px] p-6 shadow-layered border border-white/5 flex flex-col h-[240px] backdrop-blur-xl">
      <h3 className="text-text-secondary/50 text-[10px] font-black mb-4 uppercase tracking-[0.2em]">{title}</h3>
      <div className="flex-grow w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
            <Tooltip 
              contentStyle={{ backgroundColor: '#0D0D0D', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
              itemStyle={{ color: '#F1F5F9', fontWeight: 'bold' }}
              labelStyle={{ display: 'none' }}
              cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
            />
            <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={4}
              dot={false}
              activeDot={{ r: 6, fill: color, stroke: '#000000', strokeWidth: 3 }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function MiniGraphPanel({ historyData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      <SmallGraph 
        data={historyData} 
        dataKey="current" 
        color="#DC2626" 
        title="Current Dynamic (A)"
      />
      <SmallGraph 
        data={historyData} 
        dataKey="voltage" 
        color="#16A34A" 
        title="Voltage Stability (V)"
      />
    </div>
  );
}
