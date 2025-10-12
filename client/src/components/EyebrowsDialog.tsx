import { useState } from 'react';
import { ArrowLeft, Sparkles, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import useEmblaCarousel from 'embla-carousel-react';

interface EyebrowsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EyebrowsDialog({ open, onOpenChange }: EyebrowsDialogProps) {
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
          data-testid="button-back-eyebrows"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="relative w-full max-w-2xl h-[90vh] bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-800/90 border-2 border-pink-500/60 rounded-lg p-4 flex flex-col">
        <div className="space-y-3 flex-1 flex flex-col">
          {/* Header with Instagram */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-pink-500 animate-pulse" style={{ filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 1))' }} />
              <h2 className="text-2xl md:text-4xl font-bold text-white font-varela">
                Elit Eyebrows
              </h2>
            </div>
            <a 
              href="https://instagram.com/elit.eyebrows" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors text-sm"
            >
              <Instagram className="w-5 h-5" />
              <span>@elit.eyebrows</span>
            </a>
          </div>

          {/* Bio */}
          <div className="bg-black/40 rounded-lg p-3 border border-pink-500/30">
            <p className="text-gray-300 text-sm md:text-base text-center leading-relaxed">
              Elite Eyebrows Studio • עיצוב גבות טבעיות/צביעה • מיקרובליידינג בשיטת השיערה
            </p>
          </div>

          {/* שירותים */}
          <div className="space-y-2">
            <h3 className="text-lg md:text-xl font-bold text-white text-center">השירותים שלנו</h3>
            <div className="space-y-2">
              <button className="w-full flex justify-between items-center bg-black/40 rounded-lg p-3 border border-pink-500/20 hover:border-pink-500/60 transition-colors">
                <span className="text-white text-sm">הרמת ריסים</span>
                <span className="text-pink-400 font-bold text-base">הזמן עכשיו</span>
              </button>
              <button className="w-full flex justify-between items-center bg-black/40 rounded-lg p-3 border border-pink-500/20 hover:border-pink-500/60 transition-colors">
                <span className="text-white text-sm">הרמת גבות</span>
                <span className="text-pink-400 font-bold text-base">הזמן עכשיו</span>
              </button>
              <button className="w-full flex justify-between items-center bg-black/40 rounded-lg p-3 border border-pink-500/20 hover:border-pink-500/60 transition-colors">
                <span className="text-white text-sm">סטודיו לגבות - עיצוב גבות טבעיות</span>
                <span className="text-pink-400 font-bold text-base">הזמן עכשיו</span>
              </button>
              <button className="w-full flex justify-between items-center bg-black/40 rounded-lg p-3 border border-pink-500/20 hover:border-pink-500/60 transition-colors">
                <span className="text-white text-sm">Microblading - מיקרובליידינג בשיטת השיערה</span>
                <span className="text-pink-400 font-bold text-base">הזמן עכשיו</span>
              </button>
            </div>
          </div>

          {/* גלריית תמונות - Carousel */}
          <div className="space-y-2 flex-1">
            <h3 className="text-lg md:text-xl font-bold text-white text-center">גלריה</h3>
            <div className="relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div 
                      key={i}
                      className="flex-[0_0_33%] min-w-0"
                    >
                      <div className="aspect-square bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg border border-pink-500/30 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-pink-400/50" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => emblaApi?.scrollPrev()}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-pink-400 p-1 rounded-full hover:bg-black/70"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => emblaApi?.scrollNext()}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-pink-400 p-1 rounded-full hover:bg-black/70"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* כפתור הזמנה */}
          <button
            onClick={() => console.log('Book with Elit Eyebrows')}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-bold transition-colors text-base"
            data-testid="book-eyebrows"
          >
            קביעת תור
          </button>
        </div>
      </div>
    </div>
  );
}
