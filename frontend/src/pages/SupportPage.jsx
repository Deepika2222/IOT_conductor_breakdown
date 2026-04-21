import React from 'react';
import { ShieldAlert, Info, Map, Phone, Server, AlertTriangle } from 'lucide-react';
import SupportSection from '../components/SupportSection';
import FAQItem from '../components/FAQItem';

const SupportPage = () => {
  const faqs = [
    {
      question: "No data showing?",
      answer: ["Ensure the backend server is running.", "Check your internet connection."]
    },
    {
      question: "Alerts not coming?",
      answer: ["Verify sensor input connections.", "Check the GSM module status."]
    },
    {
      question: "Graph not updating?",
      answer: ["Verify API connection is active.", "Check polling interval settings."]
    }
  ];

  return (
    <div className="p-8 pb-32 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="mb-10 animate-in fade-in slide-in-from-top duration-700">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
          Support & <span className="text-primary italic">System Info</span>
        </h1>
        <p className="text-text-secondary/70 font-medium">Help, documentation, and troubleshooting for GridSight OS</p>
      </div>

      <div className="space-y-8">
        
        {/* Emergency Note */}
        <div className="bg-primary/10 border-l-4 border-primary rounded-r-2xl p-6 shadow-lg shadow-primary/5 flex items-start gap-4 animate-fade-in-up [animation-delay:100ms]">
          <AlertTriangle className="text-primary shrink-0 animate-pulse mt-0.5" size={28} />
          <div>
            <h3 className="text-primary font-bold text-lg mb-1 uppercase tracking-widest text-sm">Emergency Note</h3>
            <p className="text-primary/90 font-medium">
              ⚠ In case of detected fault, avoid physical contact with wires and inform authorities immediately.
            </p>
          </div>
        </div>

        {/* System Overview */}
        <div className="animate-fade-in-up [animation-delay:200ms]">
          <SupportSection title="System Overview" icon={Info}>
            <div className="bg-background/50 p-6 rounded-xl border border-white/5">
              <p className="text-lg leading-relaxed text-text-secondary/90">
                <strong className="text-white">GridSight OS</strong> monitors low voltage distribution lines and detects faults such as breakage and leakage in real time.
              </p>
            </div>
          </SupportSection>
        </div>

        {/* How It Works */}
        <div className="animate-fade-in-up [animation-delay:300ms]">
          <SupportSection title="How It Works" icon={Map}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
              {['Sensors', 'ESP32', 'Backend', 'Dashboard', 'Alerts'].map((step, index, arr) => (
                <React.Fragment key={step}>
                  <div className="bg-background/80 border border-white/10 shadow-md py-4 px-6 rounded-xl font-bold tracking-wide text-white/90 w-full md:w-auto text-center border-l-4 border-l-primary flex-1">
                    {step}
                  </div>
                  {index < arr.length - 1 && (
                    <div className="hidden md:block text-primary/50 font-black animate-pulse">
                      →
                    </div>
                  )}
                  {index < arr.length - 1 && (
                    <div className="md:hidden text-primary/50 font-black animate-pulse rotate-90 my-1">
                      →
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </SupportSection>
        </div>

        {/* Two Columns for FAQ & System/Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* FAQ */}
          <div className="animate-fade-in-up [animation-delay:400ms]">
            <SupportSection title="Troubleshooting Guide" icon={ShieldAlert}>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <FAQItem key={i} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </SupportSection>
          </div>

          {/* Contact & System Info */}
          <div className="space-y-8">
            <div className="animate-fade-in-up [animation-delay:500ms]">
              <SupportSection title="System Info" icon={Server}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background/50 p-4 rounded-xl border border-white/5">
                    <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest mb-1">Version</p>
                    <p className="text-white font-medium">1.0</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-white/5">
                    <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest mb-1">Last Updated</p>
                    <p className="text-white font-medium">April 2026</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-white/5">
                    <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest mb-1">Backend</p>
                    <p className="text-white font-medium">Node.js</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-white/5">
                    <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest mb-1">Frontend</p>
                    <p className="text-white font-medium">React</p>
                  </div>
                </div>
              </SupportSection>
            </div>

            <div className="animate-fade-in-up [animation-delay:600ms]">
              <SupportSection title="Contact Support" icon={Phone}>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-background/50 p-4 rounded-xl border border-white/5 hover:border-primary/50 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <ShieldAlert size={18} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">GridSight Support</h4>
                      <a href="mailto:support@gridsight.com" className="text-text-secondary text-sm hover:text-primary transition-colors">support@gridsight.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-background/50 p-4 rounded-xl border border-white/5 hover:border-primary/50 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Phone size={18} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">Emergency Hotlines</h4>
                      <p className="text-text-secondary text-sm">+91 XXXXX XXXXX</p>
                    </div>
                  </div>
                </div>
              </SupportSection>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SupportPage;
