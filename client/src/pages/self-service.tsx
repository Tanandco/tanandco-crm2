import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import SunBedsDialog from '@/components/SunBedsDialog';
import SprayTanDialog from '@/components/SprayTanDialog';
import HairSalonDialog from '@/components/HairSalonDialog';
import CosmeticsDialog from '@/components/CosmeticsDialog';
import Logo from '@/components/Logo';
import tanningBoothIcon from '@assets/freepik__uv-tanning-booth-variation-a-elegant-3d-neon-pink-__47715_1759394305008.png';
import sprayTanIcon from '@assets/freepik__spray-tan-variation-b-modern-flatbadge-3d-spray-gu__47717_1759394325900.png';
import hairSalonIcon from '@assets/freepik__3d-neon-pink-icon-of-a-hair-salon-symbol-stylized-__47719_1759394333413.png';
import shopIcon from '@assets/freepik__online-store-shopping-bag-variation-a-3d-shopping-__47713_1759394339729.png';
import searchIcon from '@assets/3_1759474572534.png';
import customerIcon from '@assets/Dהורדותfreepik__spray-tan-variation-b-modern-flatbadge-3d-spray-gu__47717.png_1759805942437.png';
import selfServiceIcon from '@assets/1_1759474644978.png';
import { Palette, UserPlus } from 'lucide-react';

export default function SelfService() {
  const [, navigate] = useLocation();
  const [showSplash, setShowSplash] = useState(true);
  const [sunBedsDialogOpen, setSunBedsDialogOpen] = useState(false);
  const [sprayTanDialogOpen, setSprayTanDialogOpen] = useState(false);
  const [hairSalonDialogOpen, setHairSalonDialogOpen] = useState(false);
  const [cosmeticsDialogOpen, setCosmeticsDialogOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSkipIntro = () => {
    setShowSplash(false);
  };

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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { 
          animation: fadeIn 2s ease-out forwards; 
        }
        .neon-glow {
          filter: drop-shadow(0 0 40px hsla(328, 100%, 70%, 0.4)) 
                  drop-shadow(0 0 80px rgba(147,51,234,0.4)) 
                  drop-shadow(0 0 20px rgba(255,105,180,0.5));
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @media (prefers-reduced-motion: reduce) {
          .animate-glow-pulse, .animate-fade-in { animation: none !important; }
        }
      `}</style>

      {/* Splash Screen */}
      {showSplash && (
        <section 
          className="flex flex-col items-center justify-center h-screen fixed inset-0 z-50 bg-[hsl(210,6%,8%)] transition-opacity duration-1000"
          style={{ opacity: showSplash ? 1 : 0 }}
          role="dialog" 
          aria-label="מסך פתיחה"
        >
          <div className="neon-glow animate-glow-pulse mb-6">
            <Logo size="large" showGlow={false} showUnderline={false} />
          </div>
          <div className="w-[200px] h-[2px] bg-gradient-to-r from-transparent via-pink-500/60 to-transparent rounded-full animate-pulse" aria-hidden="true"></div>

          <button 
            onClick={handleSkipIntro}
            className="mt-8 px-4 py-2 rounded-xl border border-white/20 text-white/80 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink-400"
            data-testid="button-skip-intro"
          >
            דלג לפתיחה
          </button>
        </section>
      )}

      <main className="min-h-screen flex flex-col items-center text-center bg-[hsl(210,6%,8%)] text-[hsl(210,15%,92%)]">
        {/* כותרת ראשית */}
        <section className="text-center mt-6 mb-8 px-6 max-w-3xl mx-auto">
          <h2 
            className="text-3xl md:text-4xl font-extrabold text-[hsl(328,100%,70%)] mb-3 animate-fade-in"
            data-testid="title-welcome"
          >
            ברוכים הבאים לעולם החדש של Tan & Co
          </h2>
          <p 
            className="text-white/80 leading-relaxed animate-fade-in"
            style={{ animationDelay: '1s' }}
            data-testid="subtitle-description"
          >
            המתחם הראשון בישראל לשיזוף חכם במודל היברידי – שירות עצמי 24/7 או ליווי אישי מצוות מומחים.
            בחרו את הדרך שלכם לשיזוף מושלם, מתי שנוח לכם.
          </p>
        </section>

        {/* שורת אייקונים אופקית */}
        <section className="w-full">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-stretch gap-5 overflow-x-auto no-scrollbar pb-4">
              {/* מיטות שיזוף */}
              <button 
                onClick={() => setSunBedsDialogOpen(true)}
                className="group shrink-0 grid place-items-center w-[110px] rounded-2xl p-4 bg-[hsl(210,6%,10%)] border border-[hsl(210,8%,18%)] hover:border-[hsl(328,100%,70%)] transition"
                data-testid="icon-sun-beds"
              >
                <img src={tanningBoothIcon} alt="מיטות שיזוף" className="neon-glow w-16 h-16 md:w-20 md:h-20 group-hover:scale-105 transition" />
                <span className="mt-2 text-sm md:text-base font-semibold">מיטות שיזוף</span>
              </button>

              {/* שיזוף בהתזה */}
              <button 
                onClick={() => setSprayTanDialogOpen(true)}
                className="group shrink-0 grid place-items-center w-[110px] rounded-2xl p-4 bg-[hsl(210,6%,10%)] border border-[hsl(210,8%,18%)] hover:border-[hsl(328,100%,70%)] transition"
                data-testid="icon-spray-tan"
              >
                <img src={sprayTanIcon} alt="שיזוף בהתזה" className="neon-glow w-16 h-16 md:w-20 md:h-20 group-hover:scale-105 transition" />
                <span className="mt-2 text-sm md:text-base font-semibold">שיזוף בהתזה</span>
              </button>

              {/* מספרה */}
              <button 
                onClick={() => setHairSalonDialogOpen(true)}
                className="group shrink-0 grid place-items-center w-[110px] rounded-2xl p-4 bg-[hsl(210,6%,10%)] border border-[hsl(210,8%,18%)] hover:border-[hsl(328,100%,70%)] transition"
                data-testid="icon-hair-salon"
              >
                <img src={hairSalonIcon} alt="מספרה" className="neon-glow w-16 h-16 md:w-20 md:h-20 group-hover:scale-105 transition" />
                <span className="mt-2 text-sm md:text-base font-semibold">מספרה</span>
              </button>

              {/* קוסמטיקה */}
              <button 
                onClick={() => setCosmeticsDialogOpen(true)}
                className="group shrink-0 grid place-items-center w-[110px] rounded-2xl p-4 bg-[hsl(210,6%,10%)] border border-[hsl(210,8%,18%)] hover:border-[hsl(328,100%,70%)] transition"
                data-testid="icon-cosmetics"
              >
                <Palette className="neon-glow w-16 h-16 md:w-20 md:h-20 group-hover:scale-105 transition text-pink-400" />
                <span className="mt-2 text-sm md:text-base font-semibold">קוסמטיקה</span>
              </button>

              {/* החנות שלכם */}
              <button 
                onClick={() => navigate('/shop')}
                className="group shrink-0 grid place-items-center w-[110px] rounded-2xl p-4 bg-[hsl(210,6%,10%)] border border-[hsl(210,8%,18%)] hover:border-[hsl(328,100%,70%)] transition"
                data-testid="icon-shop"
              >
                <img src={shopIcon} alt="החנות שלכם" className="neon-glow w-16 h-16 md:w-20 md:h-20 group-hover:scale-105 transition" />
                <span className="mt-2 text-sm md:text-base font-semibold">החנות שלכם</span>
              </button>

              {/* AI TAN */}
              <a 
                href="https://wa.me/972557247033" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group shrink-0 grid place-items-center w-[110px] rounded-2xl p-4 bg-[hsl(210,6%,10%)] border border-[hsl(210,8%,18%)] hover:border-[hsl(328,100%,70%)] transition"
                data-testid="icon-ai-tan"
              >
                <div className="relative rounded-full overflow-hidden w-[72px] h-[72px] md:w-[88px] md:h-[88px] neon-glow">
                  <div className="w-full h-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                    AI
                  </div>
                </div>
                <span className="mt-2 text-sm md:text-base font-semibold">AI TAN</span>
              </a>

              {/* לקוחות */}
              <button 
                onClick={() => navigate('/customers')}
                className="group shrink-0 grid place-items-center w-[110px] rounded-2xl p-4 bg-[hsl(210,6%,10%)] border border-[hsl(210,8%,18%)] hover:border-[hsl(328,100%,70%)] transition"
                data-testid="icon-customers"
              >
                <img src={customerIcon} alt="לקוחות" className="neon-glow w-16 h-16 md:w-20 md:h-20 group-hover:scale-105 transition" />
                <span className="mt-2 text-sm md:text-base font-semibold">לקוחות</span>
              </button>

              {/* חיפוש */}
              <button 
                className="group shrink-0 grid place-items-center w-[110px] rounded-2xl p-4 bg-[hsl(210,6%,10%)] border border-[hsl(210,8%,18%)] hover:border-[hsl(328,100%,70%)] transition"
                data-testid="icon-search"
              >
                <img src={searchIcon} alt="חיפוש" className="neon-glow w-16 h-16 md:w-20 md:h-20 group-hover:scale-105 transition" />
                <span className="mt-2 text-sm md:text-base font-semibold">חיפוש</span>
              </button>

              {/* הרשמה */}
              <button 
                onClick={() => navigate('/onboarding')}
                className="group shrink-0 grid place-items-center w-[110px] rounded-2xl p-4 bg-[hsl(210,6%,10%)] border border-[hsl(210,8%,18%)] hover:border-[hsl(328,100%,70%)] transition"
                data-testid="icon-register"
              >
                <UserPlus className="neon-glow w-16 h-16 md:w-20 md:h-20 group-hover:scale-105 transition text-pink-400" />
                <span className="mt-2 text-sm md:text-base font-semibold">הרשמה</span>
              </button>

              {/* שירות עצמי */}
              <button 
                onClick={() => navigate('/')}
                className="group shrink-0 grid place-items-center w-[110px] rounded-2xl p-4 bg-[hsl(210,6%,10%)] border border-[hsl(210,8%,18%)] hover:border-[hsl(328,100%,70%)] transition"
                data-testid="icon-self-service"
              >
                <img src={selfServiceIcon} alt="שירות עצמי" className="neon-glow w-16 h-16 md:w-20 md:h-20 group-hover:scale-105 transition" />
                <span className="mt-2 text-sm md:text-base font-semibold">שירות עצמי</span>
              </button>
            </div>
          </div>
        </section>
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
