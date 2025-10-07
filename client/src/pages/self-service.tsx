import { useState } from 'react';
import { Palette } from 'lucide-react';
import SunBedsDialog from '@/components/SunBedsDialog';
import SprayTanDialog from '@/components/SprayTanDialog';
import HairSalonDialog from '@/components/HairSalonDialog';
import CosmeticsDialog from '@/components/CosmeticsDialog';
import tanningBoothIcon from '@assets/freepik__uv-tanning-booth-variation-a-elegant-3d-neon-pink-__47715_1759394305008.png';
import sprayTanIcon from '@assets/freepik__spray-tan-variation-b-modern-flatbadge-3d-spray-gu__47717_1759394325900.png';
import hairSalonIcon from '@assets/freepik__3d-neon-pink-icon-of-a-hair-salon-symbol-stylized-__47719_1759394333413.png';
import memberCardIcon from '@assets/member-card-icon.png';

export default function SelfService() {
  const [sunBedsDialogOpen, setSunBedsDialogOpen] = useState(false);
  const [sprayTanDialogOpen, setSprayTanDialogOpen] = useState(false);
  const [hairSalonDialogOpen, setHairSalonDialogOpen] = useState(false);
  const [cosmeticsDialogOpen, setCosmeticsDialogOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes glowPulse {
          0%, 100% { 
            filter: drop-shadow(0 0 20px hsla(328, 100%, 70%, 0.4)) 
                    drop-shadow(0 0 40px rgba(147,51,234,0.3)) 
                    drop-shadow(0 0 10px rgba(255,105,180,0.5)); 
            transform: scale(1); 
          }
          50% { 
            filter: drop-shadow(0 0 30px hsla(328, 100%, 70%, 0.6)) 
                    drop-shadow(0 0 60px rgba(147,51,234,0.5)) 
                    drop-shadow(0 0 15px rgba(255,105,180,0.7)); 
            transform: scale(1.05); 
          }
        }
        .animate-glow-pulse { 
          animation: glowPulse 2.5s ease-in-out infinite; 
        }
        .neon-glow {
          filter: drop-shadow(0 0 40px hsla(328, 100%, 70%, 0.4)) 
                  drop-shadow(0 0 80px rgba(147,51,234,0.4)) 
                  drop-shadow(0 0 20px rgba(255,105,180,0.5));
        }
      `}</style>

      <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[hsl(210,6%,8%)] text-[hsl(210,15%,92%)]">
        <h1 
          className="text-4xl font-bold mb-6 text-[hsl(328,100%,70%)]"
          data-testid="title-self-service"
        >
          שירות עצמי 24/7
        </h1>
        
        <p 
          className="text-white/80 mb-8"
          data-testid="subtitle-choose-service"
        >
          בחרו שירות או כרטיסיה להמשך
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {/* מיטות שיזוף */}
          <button
            onClick={() => setSunBedsDialogOpen(true)}
            className="h-[160px] w-[150px] rounded-2xl p-4 bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-800/90 border border-[hsla(328,100%,70%,0.6)] hover:border-[hsl(328,100%,70%)] transition-all duration-300 ease-in-out hover:scale-105 flex flex-col items-center justify-center"
            data-testid="card-sun-beds"
          >
            <img 
              src={tanningBoothIcon} 
              alt="מיטות שיזוף" 
              className="w-10 h-10 mb-3 neon-glow" 
            />
            <span className="font-bold">מיטות שיזוף</span>
          </button>

          {/* שיזוף בהתזה */}
          <button
            onClick={() => setSprayTanDialogOpen(true)}
            className="h-[160px] w-[150px] rounded-2xl p-4 bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-800/90 border border-[hsla(328,100%,70%,0.6)] hover:border-[hsl(328,100%,70%)] transition-all duration-300 ease-in-out hover:scale-105 flex flex-col items-center justify-center"
            data-testid="card-spray-tan"
          >
            <img 
              src={sprayTanIcon} 
              alt="שיזוף בהתזה" 
              className="w-10 h-10 mb-3 neon-glow" 
            />
            <span className="font-bold">שיזוף בהתזה</span>
          </button>

          {/* מספרה */}
          <button
            onClick={() => setHairSalonDialogOpen(true)}
            className="h-[160px] w-[150px] rounded-2xl p-4 bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-800/90 border border-[hsla(328,100%,70%,0.6)] hover:border-[hsl(328,100%,70%)] transition-all duration-300 ease-in-out hover:scale-105 flex flex-col items-center justify-center"
            data-testid="card-hair-salon"
          >
            <img 
              src={hairSalonIcon} 
              alt="מספרה" 
              className="w-10 h-10 mb-3 neon-glow" 
            />
            <span className="font-bold">מספרה</span>
          </button>

          {/* קוסמטיקה */}
          <button
            onClick={() => setCosmeticsDialogOpen(true)}
            className="h-[160px] w-[150px] rounded-2xl p-4 bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-800/90 border border-[hsla(328,100%,70%,0.6)] hover:border-[hsl(328,100%,70%)] transition-all duration-300 ease-in-out hover:scale-105 flex flex-col items-center justify-center"
            data-testid="card-cosmetics"
          >
            <Palette className="w-10 h-10 mb-3 neon-glow text-pink-400" />
            <span className="font-bold">קוסמטיקה</span>
          </button>

          {/* כרטיסיות (עם glow pulse) */}
          <div 
            className="h-[160px] w-[150px] rounded-2xl p-4 bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-800/90 border border-[hsla(328,100%,70%,0.6)] hover:border-[hsl(328,100%,70%)] transition-all duration-300 ease-in-out hover:scale-105 flex flex-col items-center justify-center"
            data-testid="card-membership"
          >
            <img 
              src={memberCardIcon} 
              alt="כרטיסיות" 
              className="w-20 h-20 mb-3 rounded-xl neon-glow animate-glow-pulse" 
            />
            <span className="font-bold">כרטיסיות</span>
          </div>

          {/* AI TAN (אלין) */}
          <a
            href="https://wa.me/972557247033"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[160px] w-[150px] rounded-2xl p-4 bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-800/90 border border-[hsla(328,100%,70%,0.6)] hover:border-[hsl(328,100%,70%)] transition-all duration-300 ease-in-out hover:scale-105 flex flex-col items-center justify-center"
            data-testid="card-ai-tan"
          >
            <div className="w-16 h-16 mb-3 rounded-full overflow-hidden neon-glow">
              <img 
                src="https://i.imgur.com/placeholder-alin.jpg" 
                alt="AI TAN" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            <span className="font-bold">AI TAN (אלין)</span>
          </a>
        </div>
      </main>

      {/* Dialogs */}
      <SunBedsDialog 
        open={sunBedsDialogOpen} 
        onOpenChange={setSunBedsDialogOpen}
      />
      <SprayTanDialog 
        open={sprayTanDialogOpen} 
        onOpenChange={setSprayTanDialogOpen}
      />
      <HairSalonDialog 
        open={hairSalonDialogOpen} 
        onOpenChange={setHairSalonDialogOpen}
      />
      <CosmeticsDialog 
        open={cosmeticsDialogOpen} 
        onOpenChange={setCosmeticsDialogOpen}
      />
    </>
  );
}
