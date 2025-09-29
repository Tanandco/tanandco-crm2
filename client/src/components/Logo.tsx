interface LogoProps {
  className?: string;
  showGlow?: boolean;
  showUnderline?: boolean;
}

export default function Logo({ className = "", showGlow = true, showUnderline = true }: LogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`relative ${showGlow ? 'animate-glow-pulse' : ''}`}>
        <h1 
          className="text-6xl md:text-8xl font-bold text-primary font-hebrew"
          style={{
            filter: showGlow ? 'drop-shadow(0 0 30px rgba(255,105,180,1))' : 'none'
          }}
          data-testid="logo-text"
        >
          Tan & Co
        </h1>
      </div>
      {showUnderline && (
        <div 
          className="w-64 h-1 mt-4 rounded-full opacity-90"
          style={{
            background: 'linear-gradient(to right, transparent, #ff69b4, transparent)'
          }}
          data-testid="logo-underline"
        />
      )}
    </div>
  );
}