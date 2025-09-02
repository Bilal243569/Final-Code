import React from 'react';
import { Shield, Zap, BarChart, RefreshCw } from 'lucide-react';
import Card from '../ui/Card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="border border-gray-800 hover:border-cyan-900 hover:bg-gray-800/20 transition-colors duration-300">
      <div className="p-2 w-10 h-10 rounded-md bg-cyan-900/30 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg text-white font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </Card>
  );
};

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">About CVEThreatMapper</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our AI-powered system bridges the gap between identified vulnerabilities and the tactics, techniques, and procedures used by adversaries.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Shield className="h-5 w-5 text-cyan-500" />}
            title="Vulnerability Analysis"
            description="Analyze CVEs and vulnerability descriptions to understand potential attack vectors and risk factors."
          />
          <FeatureCard
            icon={<Zap className="h-5 w-5 text-cyan-500" />}
            title="Real-time Mapping"
            description="Instantly map vulnerabilities to relevant MITRE ATT&CK framework tactics and techniques."
          />
          <FeatureCard
            icon={<BarChart className="h-5 w-5 text-cyan-500" />}
            title="Threat Intelligence"
            description="Gain actionable threat intelligence to prioritize security measures and mitigations."
          />
          <FeatureCard
            icon={<RefreshCw className="h-5 w-5 text-cyan-500" />}
            title="Continuous Updates"
            description="Stay current with the latest CVE database and MITRE ATT&CK framework knowledge."
          />
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-6 md:p-8 border border-gray-800">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                Bridging Vulnerability Data with Tactical Knowledge
              </h3>
              <p className="text-gray-400 mb-4">
                CVEThreatMapper uses advanced AI to analyze the technical details of vulnerabilities and determine how threat actors could potentially exploit them in real-world attacks.
              </p>
              <p className="text-gray-400">
                By connecting CVEs to the MITRE ATT&CK framework, security teams can better understand attack patterns, implement appropriate mitigations, and strengthen their defense strategies.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <div className="flex-1 text-center text-gray-400 font-mono text-xs">threat-analysis.sh</div>
              </div>
              <div className="font-mono text-xs">
                <p className="text-green-400">$ ./analyze_cve CVE-2021-44228</p>
                <p className="text-gray-500">Analyzing vulnerability patterns...</p>
                <p className="text-cyan-400">Identified MITRE ATT&CK techniques:</p>
                <ul className="text-white space-y-1">
                  <li>T1190: Exploit Public-Facing Application</li>
                  <li>T1059: Command and Scripting Interpreter</li>
                  <li>T1547: Boot or Logon Autostart Execution</li>
                </ul>
                <p className="text-gray-500 mt-2">Generating mitigation strategies...</p>
                <p className="text-yellow-400">High priority: Patch affected Log4j instances</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;