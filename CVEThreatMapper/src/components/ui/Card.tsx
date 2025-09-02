import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowing?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', glowing = false }) => {
  return (
    <div 
      className={`
        bg-gray-900 border border-gray-800 rounded-lg p-4
        ${glowing ? 'shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'shadow-md'}
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;