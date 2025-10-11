interface SelfServiceButton3DProps {
  onClick: () => void;
  className?: string;
}

export const SelfServiceButton3D = ({ 
  onClick, 
  className = "" 
}: SelfServiceButton3DProps) => {
  return (
    <div className={`w-full max-w-xs mx-auto mt-10 md:mt-16 ${className}`}>
      <button
        onClick={onClick}
        className="relative w-full h-6 md:h-8 rounded-lg bg-gradient-to-r from-gray-900/90 to-black/90 border border-pink-500 backdrop-blur-sm shadow-xl touch-target transition-all duration-500 active:scale-95 hover:scale-105 group overflow-hidden"
        style={{
          backdropFilter: 'blur(20px)',
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(0, 0, 0, 0.95))',
          boxShadow: '0 20px 60px -15px rgba(236, 72, 153, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)'
        }}
        data-testid="button-self-service-3d"
      >
        {/* טבעת זוהרת מסתובבת */}
        <div 
          className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-75 blur-sm"
          style={{
            animation: 'spin 4s linear infinite'
          }}
        />

        {/* רקע פנימי */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 rounded-lg" />

        {/* תוכן הכפתור */}
        <div className="relative h-full flex items-center justify-center gap-1 px-1">
          {/* כדור מסתובב משמאל */}
          <div className="w-4 h-4 md:w-5 md:h-5 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-sm animate-pulse" />
            <div 
              className="relative w-full h-full rounded-full bg-gradient-to-br from-pink-500 to-purple-600"
              style={{
                animation: 'spin 3s linear infinite',
                boxShadow: '0 0 8px rgba(236, 72, 153, 0.6), inset 0 0 5px rgba(139, 92, 246, 0.4)'
              }}
            >
              <div className="absolute inset-0.5 rounded-full bg-gradient-to-tl from-pink-400/50 to-purple-500/50 backdrop-blur-sm" />
            </div>
          </div>

          {/* טקסט */}
          <div className="flex-1 text-center">
            <div className="flex items-center justify-center gap-0.5">
              <div className="w-0.5 h-0.5 bg-pink-500 rounded-full animate-ping" />
              <h2 className="text-[10px] md:text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 drop-shadow-lg animate-pulse" style={{ fontFamily: 'Varela Round, sans-serif' }}>
                מעבר לשירות עצמי
              </h2>
              <div 
                className="w-0.5 h-0.5 bg-purple-500 rounded-full animate-ping"
                style={{ animationDelay: '0.5s' }}
              />
            </div>
          </div>

          {/* כדור מסתובב מימין */}
          <div className="w-4 h-4 md:w-5 md:h-5 relative">
            <div 
              className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-sm animate-pulse" 
              style={{ animationDelay: '1s' }} 
            />
            <div 
              className="relative w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-cyan-600"
              style={{
                animation: 'spin 3s linear infinite reverse',
                boxShadow: '0 0 8px rgba(139, 92, 246, 0.6), inset 0 0 5px rgba(34, 211, 238, 0.4)'
              }}
            >
              <div className="absolute inset-0.5 rounded-full bg-gradient-to-tl from-purple-400/50 to-cyan-500/50 backdrop-blur-sm" />
            </div>
          </div>
        </div>

        {/* חלקיקים זוהרים */}
        <div className="absolute top-1 left-1/4 w-0.5 h-0.5 bg-pink-400 rounded-full animate-ping opacity-60" />
        <div className="absolute bottom-1 right-1/4 w-0.5 h-0.5 bg-purple-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.3s' }} />
        <div className="absolute top-1/2 left-2 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.6s' }} />
        <div className="absolute top-1/3 right-3 w-0.5 h-0.5 bg-pink-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '0.9s' }} />

        {/* אפקט hover זוהר */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-pink-500/10 group-hover:via-purple-500/10 group-hover:to-cyan-500/10 transition-all duration-500 rounded-lg" />
      </button>

      {/* הודעת מצב מתחת לכפתור */}
      <div className="mt-1 flex items-center justify-center gap-0.5 text-white/50 text-[8px] md:text-[10px]" style={{ fontFamily: 'Varela Round, sans-serif' }}>
        <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
        <span>מערכת פעילה • מוכנה לשירות</span>
      </div>
    </div>
  );
};

export default SelfServiceButton3D;
