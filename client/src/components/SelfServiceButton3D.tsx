interface SelfServiceButton3DProps {
  onClick: () => void;
  className?: string;
}

export const SelfServiceButton3D = ({ 
  onClick, 
  className = "" 
}: SelfServiceButton3DProps) => {
  return (
    <div className={`w-full max-w-md mx-auto mt-10 md:mt-16 ${className}`}>
      <button
        onClick={onClick}
        className="relative w-full h-12 md:h-14 rounded-md backdrop-blur-sm touch-target transition-all duration-300 active:scale-98 hover:scale-[1.02] group overflow-hidden"
        data-testid="button-self-service-3d"
      >
        {/* מסגרת גרדיאנטית זורמת */}
        <div 
          className="absolute -inset-1 rounded-md opacity-90"
          style={{
            background: 'linear-gradient(90deg, rgb(59, 130, 246), #ec4899, rgb(59, 130, 246))',
            backgroundSize: '200% 100%',
            animation: 'gradientFlow 3s ease infinite',
            filter: 'blur(8px)'
          }}
        />

        {/* רקע הכפתור - חצי כחול חצי ורוד */}
        <div className="absolute inset-0 rounded-md overflow-hidden">
          {/* חצי שמאלי - כחול ניאון */}
          <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-blue-500 to-blue-400" 
               style={{ 
                 background: 'linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(96, 165, 250) 100%)',
                 boxShadow: 'inset 0 0 30px rgba(59, 130, 246, 0.6)'
               }} 
          />
          {/* חצי ימני - ורוד ניאון */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-pink-500 to-pink-400" 
               style={{ 
                 background: 'linear-gradient(135deg, rgb(236, 72, 153) 0%, rgb(244, 114, 182) 100%)',
                 boxShadow: 'inset 0 0 30px rgba(236, 72, 153, 0.6)'
               }} 
          />
          
          {/* קו מפריד מרכזי עם זוהר */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/60" 
               style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)' }} 
          />
        </div>

        {/* תוכן הכפתור */}
        <div className="relative h-full flex items-center justify-center px-4">
          <h2 className="text-base md:text-lg font-extrabold text-white drop-shadow-2xl" 
              style={{ 
                fontFamily: 'Varela Round, sans-serif',
                textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.5)'
              }}>
            מעבר לשירות עצמי
          </h2>
        </div>

        {/* אפקט hover נוסף */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-md" />
      </button>

      {/* הודעת מצב מתחת לכפתור */}
      <div className="mt-2 flex items-center justify-center gap-1 text-white/50 text-[10px] md:text-xs" style={{ fontFamily: 'Varela Round, sans-serif' }}>
        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
        <span>24/7 • שירות עצמי זמין</span>
      </div>
    </div>
  );
};

export default SelfServiceButton3D;
