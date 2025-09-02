import React, { useEffect, useState, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
  className?: string;
  cursor?: boolean;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  delay = 30,
  onComplete,
  className = '',
  cursor = true
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Reset on text change
    setDisplayedText('');
    setCurrentIndex(0);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text]);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
    } else if (onComplete) {
      onComplete();
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, delay, onComplete, text]);
  
  return (
    <span className={`font-mono ${className}`}>
      {displayedText}
      {cursor && currentIndex < text.length && (
        <span className="inline-block w-2 h-4 bg-cyan-500 ml-0.5 animate-pulse">
          &nbsp;
        </span>
      )}
    </span>
  );
};

export default TypewriterText;