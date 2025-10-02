import alinVideo from '@assets/freepik__-__91857_1759408899812.mp4';

interface AlinProps {
  className?: string;
  size?: number;
}

export default function Alin({ className = "", size = 20 }: AlinProps) {
  return (
    <div className={`relative inline-block ${className}`} data-testid="alin-chatbot">
      <video 
        src={alinVideo}
        autoPlay
        loop
        muted
        playsInline
        className="object-contain"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          filter: 'drop-shadow(0 0 15px rgba(236, 72, 153, 0.8))'
        }}
      />
    </div>
  );
}