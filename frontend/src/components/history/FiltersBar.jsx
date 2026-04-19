import { Calendar, Filter, MapPin } from 'lucide-react';

export default function FiltersBar() {
  return (
    <div className="bg-card rounded-card border border-white/5 p-4 mb-6 flex flex-col md:flex-row items-center justify-between shadow-layered gap-4 relative z-20">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg text-primary border border-primary/20 shadow-[0_0_10px_rgba(220,38,38,0.1)]">
          <Filter size={18} />
        </div>
        <h2 className="font-semibold text-lg tracking-tight text-white">Data Explorer</h2>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {/* Pole Selection */}
        <div className="flex items-center bg-background/50 rounded-lg p-1 border border-white/10 hover:border-white/20 focus-within:border-primary/50 transition-colors shadow-inner">
          <div className="pl-3 pr-2 text-text-secondary/50">
            <MapPin size={16} />
          </div>
          <select className="bg-transparent border-none outline-none text-sm py-1.5 pr-8 text-text-primary appearance-none cursor-pointer">
            <option className="bg-card text-white" value="all">All Poles</option>
            <option className="bg-card text-white" value="pole-1">Pole #1 (Main St)</option>
            <option className="bg-card text-white" value="pole-2">Pole #2 (Oak Ave)</option>
            <option className="bg-card text-white" value="pole-3">Pole #3 (Pine Rd)</option>
          </select>
        </div>

        {/* Time Selection */}
        <div className="flex items-center bg-background rounded-lg p-1 border border-white/10 shadow-inner">
          <button className="px-4 py-1.5 text-sm rounded-md bg-white/10 text-white shadow-sm font-medium transition-all">
            1H
          </button>
          <button className="px-4 py-1.5 text-sm rounded-md hover:bg-white/5 text-text-secondary hover:text-white transition-all font-medium">
            24H
          </button>
          <button className="px-4 py-1.5 text-sm rounded-md hover:bg-white/5 text-text-secondary hover:text-white transition-all font-medium">
            7D
          </button>
          <div className="w-[1px] h-4 bg-white/10 mx-2"></div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-white/5 text-text-secondary hover:text-white transition-all">
            <Calendar size={14} /> Custom
          </button>
        </div>
      </div>
    </div>
  );
}
