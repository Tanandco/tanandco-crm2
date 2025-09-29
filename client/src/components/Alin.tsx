import alinImage from '@assets/עיצוב ללא שם (14)_1759167372502.png';

interface AlinProps {
  className?: string;
  size?: number;
}

export default function Alin({ className = "", size = 20 }: AlinProps) {
  const eyeSize = Math.max(size * 0.15, 3);
  const eyeSpacing = size * 0.25;
  
  return (
    <div 
      className={`relative inline-flex items-center justify-center ${className}`} 
      data-testid="alin-chatbot"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <div className="flex items-center gap-1">
        <div 
          className="bg-pink-400 rounded-full animate-alin-blink"
          style={{
            width: `${eyeSize}px`,
            height: `${eyeSize}px`,
            boxShadow: '0 0 8px rgba(236, 72, 153, 0.8)'
          }}
        />
        <div 
          className="bg-pink-400 rounded-full animate-alin-blink"
          style={{
            width: `${eyeSize}px`,
            height: `${eyeSize}px`,
            boxShadow: '0 0 8px rgba(236, 72, 153, 0.8)'
          }}
        />
      </div>
    </div>
  );
}