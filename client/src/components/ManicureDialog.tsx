import { useState } from 'react';
import { ArrowLeft, Sparkles, Calendar, User, Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ManicureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ManicureDialog({ open, onOpenChange }: ManicureDialogProps) {
  if (!open) return null;

  const manicureServices = [
    {
      title: "מניקור ג'ל קלאסי",
      price: "₪120",
      duration: "45 דקות"
    },
    {
      title: "מניקור ג'ל + עיצוב",
      price: "₪150",
      duration: "60 דקות"
    },
    {
      title: "מניקור ספא מלא",
      price: "₪180",
      duration: "75 דקות"
    },
    {
      title: "הסרת ג'ל + מניקור חדש",
      price: "₪140",
      duration: "60 דקות"
    }
  ];

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
          data-testid="button-back-manicure"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Content - Split into two sections */}
      <div className="relative w-full h-[90vh] max-w-7xl flex flex-col md:flex-row gap-4">
        
        {/* Right Section - שי לניאדו */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-800/90 border-2 border-pink-500/60 rounded-lg p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Header with Instagram */}
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-3">
                <Sparkles className="w-8 h-8 text-pink-500 animate-pulse" style={{ filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 1))' }} />
                <h2 className="text-2xl md:text-4xl font-bold text-white font-varela">
                  שי לניאדו
                </h2>
              </div>
              <a 
                href="https://instagram.com/shay.nails" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-sm">@shay.nails</span>
              </a>
            </div>

            {/* Bio */}
            <div className="bg-black/40 rounded-lg p-4 border border-pink-500/30">
              <p className="text-gray-300 text-sm md:text-base text-center leading-relaxed">
                💅 מומחית למניקור ג'ל מושלם
                <br />
                ✨ ניסיון של 8 שנים
                <br />
                🎨 עיצובים ייחודיים ומקוריים
              </p>
            </div>

            {/* מחירון */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white text-center">מחירון</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-black/40 rounded-lg p-3 border border-pink-500/20">
                  <span className="text-white text-sm">מניקור ג'ל קלאסי</span>
                  <span className="text-pink-400 font-bold">₪120</span>
                </div>
                <div className="flex justify-between items-center bg-black/40 rounded-lg p-3 border border-pink-500/20">
                  <span className="text-white text-sm">מניקור + עיצוב</span>
                  <span className="text-pink-400 font-bold">₪150</span>
                </div>
                <div className="flex justify-between items-center bg-black/40 rounded-lg p-3 border border-pink-500/20">
                  <span className="text-white text-sm">הסרה + מניקור חדש</span>
                  <span className="text-pink-400 font-bold">₪140</span>
                </div>
              </div>
            </div>

            {/* גלריית תמונות */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white text-center">גלריה</h3>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div 
                    key={i}
                    className="aspect-square bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg border border-pink-500/30 flex items-center justify-center"
                  >
                    <Sparkles className="w-6 h-6 text-pink-400/50" />
                  </div>
                ))}
              </div>
            </div>

            {/* כפתור הזמנה */}
            <button
              onClick={() => console.log('Book with שי לניאדו')}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-bold transition-colors"
              data-testid="book-shay"
            >
              קביעת תור עם שי
            </button>
          </div>
        </div>

        {/* Left Section - רבקה סולטן */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gradient-to-br from-pink-900/30 via-black/80 to-gray-800/90 border-2 border-pink-500/60 rounded-lg p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Header with Instagram */}
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-3">
                <Sparkles className="w-8 h-8 text-pink-500 animate-pulse" style={{ filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 1))' }} />
                <h2 className="text-2xl md:text-4xl font-bold text-white font-varela">
                  רבקה סולטן
                </h2>
              </div>
              <a 
                href="https://instagram.com/rivka.nails" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-sm">@rivka.nails</span>
              </a>
            </div>

            {/* Bio */}
            <div className="bg-black/40 rounded-lg p-4 border border-pink-500/30">
              <p className="text-gray-300 text-sm md:text-base text-center leading-relaxed">
                💅 מעצבת ציפורניים מובילה
                <br />
                ✨ התמחות בעיצובים מיוחדים
                <br />
                🌟 10 שנות ניסיון בתחום
              </p>
            </div>

            {/* מחירון */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white text-center">מחירון</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-black/40 rounded-lg p-3 border border-pink-500/20">
                  <span className="text-white text-sm">מניקור ג'ל קלאסי</span>
                  <span className="text-pink-400 font-bold">₪130</span>
                </div>
                <div className="flex justify-between items-center bg-black/40 rounded-lg p-3 border border-pink-500/20">
                  <span className="text-white text-sm">מניקור + עיצוב מיוחד</span>
                  <span className="text-pink-400 font-bold">₪160</span>
                </div>
                <div className="flex justify-between items-center bg-black/40 rounded-lg p-3 border border-pink-500/20">
                  <span className="text-white text-sm">טיפול SPA מלא</span>
                  <span className="text-pink-400 font-bold">₪180</span>
                </div>
              </div>
            </div>

            {/* גלריית תמונות */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white text-center">גלריה</h3>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div 
                    key={i}
                    className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-pink-500/30 flex items-center justify-center"
                  >
                    <Sparkles className="w-6 h-6 text-pink-400/50" />
                  </div>
                ))}
              </div>
            </div>

            {/* כפתור הזמנה */}
            <button
              onClick={() => console.log('Book with רבקה סולטן')}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-bold transition-colors"
              data-testid="book-rivka"
            >
              קביעת תור עם רבקה
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
