import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldAlert, Terminal } from 'lucide-react';
import TypewriterText from '../ui/TypewriterText';
import Button from '../ui/Button';

const cycleTexts = [
  'CVE-2021-44228 (Log4Shell)',
  'SQL injection in web applications',
  'Remote code execution vulnerabilities',
  'Authentication bypass exploits',
  'Insecure deserialization issues'
];

const HeroSection: React.FC = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showText, setShowText] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setShowText(false);
      setTimeout(() => {
        setCurrentTextIndex(prev => (prev + 1) % cycleTexts.length);
        setShowText(true);
      }, 500);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-20 md:py-32 px-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-700/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-700/10 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block mb-4 px-4 py-1 border border-cyan-600 rounded-full bg-cyan-900/20">
            <span className="text-xs text-cyan-400 font-mono flex items-center">
              <ShieldAlert className="h-3 w-3 mr-1.5" />
              Advanced Cybersecurity Intelligence
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Map <span className="text-cyan-400">CVE Vulnerabilities</span> to <br className="hidden md:inline" />
            MITRE ATT&CK Framework
          </h1>
          
          <div className="font-mono text-gray-300 mb-8 h-16">
            <div className="text-lg mb-2">Analyze vulnerabilities like:</div>
            <div className="h-8 flex justify-center items-center">
              {showText && (
                <span className="text-cyan-400 font-mono transition-opacity duration-500">
                  <TypewriterText text={cycleTexts[currentTextIndex]} delay={25} />
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#model">
              <Button size="lg">
                <Terminal className="h-4 w-4 mr-2" />
                Try the Model
              </Button>
            </a>
            <a href="#how-it-works" className="flex items-center text-gray-400 hover:text-white transition-colors px-4 py-2">
              Learn how it works
              <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;