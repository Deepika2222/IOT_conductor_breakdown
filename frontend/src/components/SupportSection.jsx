import React from 'react';

const SupportSection = ({ title, icon: Icon, children, className = '' }) => {
  return (
    <section className={`bg-card rounded-2xl border border-white/5 p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 hover:border-white/10 hover:-translate-y-1 ${className}`}>
      {title && (
        <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
          {Icon && (
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Icon size={20} />
            </div>
          )}
          <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
        </div>
      )}
      <div className="text-text-secondary">
        {children}
      </div>
    </section>
  );
};

export default SupportSection;
