import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/5 rounded-xl bg-background/50 overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors focus:outline-none text-left ${isOpen ? 'bg-white/5' : ''}`}
      >
        <div className="flex items-center gap-3">
          <HelpCircle size={18} className={`transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-text-secondary'}`} />
          <span className="font-semibold text-white/90">{question}</span>
        </div>
        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'rotate-0 text-text-secondary'}`}>
          <ChevronDown size={18} />
        </div>
      </button>
      
      <div 
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-4 pt-0 text-text-secondary/80 text-sm">
            <ul className="list-disc pl-11 space-y-2">
              {answer.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
