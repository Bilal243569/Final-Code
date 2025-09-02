import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#121212] text-gray-200 font-mono relative">
      {/* Background grid pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-5" 
        style={{ 
          backgroundImage: `linear-gradient(#0fb 1px, transparent 1px), linear-gradient(90deg, #0fb 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-radial from-transparent via-[#121212] to-[#121212]" 
      />
      
      <Header />
      <main className="relative z-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;