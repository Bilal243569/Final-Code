import React from 'react';
import { Github, Shield, Code } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-800 py-8 mt-16 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-3">
              <Shield className="h-5 w-5 text-cyan-500" />
              <span className="font-mono font-bold text-white">CVEThreatMapper</span>
            </div>
            <p className="text-gray-400 text-sm max-w-md font-mono">
              Mapping CVE vulnerabilities to MITRE ATT&CK framework TTPs through advanced AI analysis.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-mono text-white text-sm font-bold mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://cve.mitre.org/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 text-xs font-mono transition-colors">
                    CVE Database
                  </a>
                </li>
                <li>
                  <a href="https://attack.mitre.org/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 text-xs font-mono transition-colors">
                    MITRE ATT&CK
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 text-xs font-mono transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-mono text-white text-sm font-bold mb-3">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 text-xs font-mono transition-colors flex items-center">
                    <Github className="h-3 w-3 mr-1" /> GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 text-xs font-mono transition-colors flex items-center">
                    <Code className="h-3 w-3 mr-1" /> API
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-xs font-mono mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} CVEThreatMapper. All rights reserved.
          </p>
          <div className="text-gray-500 text-xs font-mono">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;