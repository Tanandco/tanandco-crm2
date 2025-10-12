import { useState } from 'react';
import { ArrowLeft, Sparkles, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import useEmblaCarousel from 'embla-carousel-react';

interface ShayManicureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ShayManicureDialog({ open, onOpenChange }: ShayManicureDialogProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      {/* Pink/Purple Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-pink-500/20 to-black opacity-90 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-pink-500/10" />
      </div>

      {/* Back Button */}
      <div className="absolute top-6 right-6 z-30">
        <Button
          onClick={() => onOpenChange(false)}
          variant="outline"
          size="icon"
          className="bg-white/10 border-white/20 text-white backdrop-blur-sm h-10 w-10"
          data-testid="button-back-shay"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Content - Split into two sections */}
      <div className="relative w-full h-[90vh] max-w-7xl flex flex-col md:flex-row gap-4">
        
        {/* Right Section - Services & Gallery (גדול) */}
        <div className="w-full md:w-2/3 h-2/3 md:h-full bg-gradient-to-br from-pink-900/30 via-black/80 to-gray-800/90 border-2 border-pink-500/60 rounded-lg p-4 flex flex-col">
          <div className="space-y-3 flex-1 flex flex-col">
            {/* שירותים */}
            <div className="space-y-2">
              <h3 className="text-base md:text-lg font-bold text-white text-center">השירותים שלנו</h3>
              <div className="space-y-1">
                <button className="w-full flex justify-between items-center bg-black/40 rounded-lg p-2 border border-pink-500/20 hover:border-pink-500/60 transition-colors">
                  <span className="text-white text-xs">מניקור ג'ל קלאסי</span>
                  <span className="text-pink-400 font-bold text-sm">הזמן עכשיו</span>
                </button>
                <button className="w-full flex justify-between items-center bg-black/40 rounded-lg p-2 border border-pink-500/20 hover:border-pink-500/60 transition-colors">
                  <span className="text-white text-xs">מניקור ג'ל + עיצוב</span>
                  <span className="text-pink-400 font-bold text-sm">הזמן עכשיו</span>
                </button>
                <button className="w-full flex justify-between items-center bg-black/40 rounded-lg p-2 border border-pink-500/20 hover:border-pink-500/60 transition-colors">
                  <span className="text-white text-xs">מניקור ספא מלא</span>
                  <span className="text-pink-400 font-bold text-sm">הזמן עכשיו</span>
                </button>
                <button className="w-full flex justify-between items-center bg-black/40 rounded-lg p-2 border border-pink-500/20 hover:border-pink-500/60 transition-colors">
                  <span className="text-white text-xs">הסרת ג'ל + מניקור חדש</span>
                  <span className="text-pink-400 font-bold text-sm">הזמן עכשיו</span>
                </button>
              </div>
            </div>

            {/* גלריית תמונות - Carousel */}
            <div className="space-y-2 flex-1">
              <h3 className="text-base md:text-lg font-bold text-white text-center">גלריה</h3>
              <div className="relative">
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex gap-2">
                    <div className="flex-[0_0_33%] min-w-0">
                      <img 
                        src="/attached_assets/4_1760265219421.png" 
                        alt="עיצוב ציפורניים 1"
                        className="aspect-square object-cover rounded-lg border border-pink-500/30"
                      />
                    </div>
                    <div className="flex-[0_0_33%] min-w-0">
                      <img 
                        src="/attached_assets/3_1760265240401.png" 
                        alt="עיצוב ציפורניים 2"
                        className="aspect-square object-cover rounded-lg border border-pink-500/30"
                      />
                    </div>
                    <div className="flex-[0_0_33%] min-w-0">
                      <img 
                        src="/attached_assets/2_1760265240402.png" 
                        alt="עיצוב ציפורניים 3"
                        className="aspect-square object-cover rounded-lg border border-pink-500/30"
                      />
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => emblaApi?.scrollPrev()}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-pink-400 p-1 rounded-full hover:bg-black/70"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => emblaApi?.scrollNext()}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-pink-400 p-1 rounded-full hover:bg-black/70"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* כפתור הזמנה */}
            <button
              onClick={() => console.log('Book with שי לניאדו')}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-bold transition-colors text-sm"
              data-testid="book-shay"
            >
              קביעת תור עם שי
            </button>
          </div>
        </div>

        {/* Left Section - Bio & Details (קטן) */}
        <div className="w-full md:w-1/3 h-1/3 md:h-full bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-800/90 border-2 border-pink-500/60 rounded-lg p-4 flex flex-col">
          <div className="space-y-4 flex-1 flex flex-col justify-center">
            {/* Header with Instagram */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-pink-500 animate-pulse" style={{ filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 1))' }} />
                <h2 className="text-xl md:text-3xl font-bold text-white font-varela">
                  שי לניאדו
                </h2>
              </div>
              <a 
                href="https://instagram.com/shay.nails" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors text-xs"
              >
                <Instagram className="w-4 h-4" />
                <span>@shay.nails</span>
              </a>
            </div>

            {/* Bio */}
            <div className="bg-black/40 rounded-lg p-3 border border-pink-500/30">
              <p className="text-gray-300 text-xs md:text-sm text-center leading-relaxed">
                מומחית למניקור ג'ל מושלם • 8 שנות ניסיון • עיצובים ייחודיים
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
