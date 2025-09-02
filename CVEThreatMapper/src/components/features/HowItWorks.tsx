import React from 'react';
import { FileText, Activity, Cpu, Database } from 'lucide-react';

interface StepCardProps {
  step: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ step, icon, title, description }) => {
  return (
    <div className="flex items-start p-6 rounded-lg">
      <div className="mr-4 flex-shrink-0">
        <div className="flex items-center justify-center w-10 h-10 rounded-md bg-cyan-900/40 border border-cyan-800">
          {icon}
        </div>
      </div>
      <div>
        <div className="flex items-center mb-2">
          <div className="bg-cyan-900/30 px-2 py-0.5 text-xs text-cyan-400 rounded font-mono mr-2">
            STEP {step}
          </div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 px-6 bg-gray-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our AI-powered system analyzes vulnerability data to predict potential attack techniques.
          </p>
        </div>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-700 via-gray-700 to-gray-900 -translate-x-1/2 z-0"></div>
          
          <div className="space-y-8 relative z-10">
            <StepCard
              step={1}
              icon={<FileText className="h-5 w-5 text-cyan-500" />}
              title="Input Processing"
              description="Enter a CVE ID (e.g., CVE-2021-44228) or a detailed vulnerability description. Our system parses the input to identify key vulnerability characteristics and attack vectors."
            />
            
            <StepCard
              step={2}
              icon={<Database className="h-5 w-5 text-cyan-500" />}
              title="Knowledge Base Lookup"
              description="The system queries our comprehensive database of vulnerabilities, CVEs, and security incidents to retrieve relevant technical details and historical exploitation patterns."
            />
            
            <StepCard
              step={3}
              icon={<Cpu className="h-5 w-5 text-cyan-500" />}
              title="AI Analysis & Mapping"
              description="Our advanced AI model analyzes the vulnerability characteristics and maps them to the most relevant MITRE ATT&CK framework tactics, techniques, and procedures (TTPs)."
            />
            
            <StepCard
              step={4}
              icon={<Activity className="h-5 w-5 text-cyan-500" />}
              title="Results & Insights"
              description="The system presents the mapped MITRE ATT&CK TTPs along with detailed explanations of how threat actors might leverage the vulnerability in real-world attack scenarios."
            />
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            By understanding the relationship between vulnerabilities and attack techniques, security teams can implement more effective defensive measures and prioritize remediation efforts.
          </p>
          <a 
            href="#model" 
            className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-700 to-cyan-900 hover:from-cyan-600 hover:to-cyan-800 text-white rounded-md font-mono transition-all border border-cyan-700"
          >
            Try the Model Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;