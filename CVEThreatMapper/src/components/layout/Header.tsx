import React from 'react';
import { ShieldAlert, Terminal, ExternalLink } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-800 py-4 px-6 backdrop-blur-md bg-black/70 fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="h-6 w-6 text-cyan-500" />
          <span className="font-mono text-lg font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            CVE<span className="text-white">Threat</span>Mapper
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#about" className="text-gray-300 hover:text-white text-sm font-mono transition-colors">
            About
          </a>
          <a href="#how-it-works" className="text-gray-300 hover:text-white text-sm font-mono transition-colors">
            How It Works
          </a>
          <a 
            href="https://attack.mitre.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white text-sm font-mono transition-colors flex items-center"
          >
            MITRE ATT&CK <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </nav>
        
        <a 
          href="#model" 
          className="px-4 py-1.5 rounded bg-gradient-to-r from-cyan-700 to-cyan-900 text-white text-sm font-mono border border-cyan-700 hover:from-cyan-600 hover:to-cyan-800 transition-all flex items-center"
        >
          <Terminal className="mr-1 h-4 w-4" /> Try Model
        </a>
      </div>
    </header>
  );
};

export default Header;