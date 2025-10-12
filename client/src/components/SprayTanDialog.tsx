import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import sprayTanImage from '@assets/שיזוף בהתזה (1920 x 1080 פיקסל) (2)_1760223839174.png';

interface SprayTanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SprayTanDialog({ open, onOpenChange }: SprayTanDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-[95vw] bg-gradient-to-b from-gray-900 to-black border-2 rounded-lg p-4 md:p-8 max-h-[95vh] overflow-y-auto" style={{ borderColor: '#2c2c2c' }}>
        
        {/* כפתור חזרה */}
        <Button 
          onClick={() => onOpenChange(false)} 
          variant="outline" 
          size="icon" 
          className="absolute top-4 left-4 md:left-6 hover:border-[#2c2c2c] z-10 h-8 w-8"
          style={{ borderColor: '#2c2c2c' }}
          data-testid="button-back-spray-tan"
        >
          <ArrowLeft className="w-5 h-5" style={{ color: '#2c2c2c' }} />
        </Button>

        {/* כותרת עליונה */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-4" style={{ 
            color: '#e064d5',
            textShadow: '0 0 30px rgba(224, 100, 213, 0.8)',
            fontFamily: 'Varela Round, sans-serif'
          }}>
            השיזוף המושלם והבטוח במרכז התדה
          </h1>
          
          {/* טקסט הסבר */}
          <p className="text-xs md:text-sm leading-relaxed max-w-5xl mx-auto" style={{ fontFamily: 'Varela Round, sans-serif', color: '#e064d5' }}>
            שיזוף בהתזה הוא למעשה תהליך קוסמטי מהיר ובטוח ליצירת גוון שיזוף באופן מלאכותי, ללא צורך בחשיפה לשמש או לקרינת UV מזיקה. הוא מבוסס על תומצית סוכר טבעי (DHA) שצובע את שכבת העור העליונה, ומספק תוצאה אחידה ומזהירה.
          </p>
        </div>

        {/* 5 כפתורי מחירון עם כפתורי הזמנה */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8 max-w-6xl mx-auto">
          <div className="flex flex-col gap-2">
            <div className="border-2 rounded-lg p-3 md:p-4 flex flex-col items-center" style={{ borderColor: '#2c2c2c', backgroundColor: 'rgba(44, 44, 44, 0.15)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)' }}>
              <div className="text-xs md:text-sm mb-1" style={{ fontFamily: 'Varela Round, sans-serif', color: '#e064d5' }}>טיפול בודד</div>
              <div className="text-lg md:text-xl font-bold" style={{ fontFamily: 'Varela Round, sans-serif', color: '#e064d5' }}>170 ש״ח</div>
            </div>
            <Button
              variant="outline"
              className="border-2 hover:border-[#2c2c2c] w-full"
              style={{ borderColor: '#e064d5', backgroundColor: 'rgba(224, 100, 213, 0.1)', color: '#e064d5', fontFamily: 'Varela Round, sans-serif' }}
              data-testid="book-single"
            >
              הזמן עכשיו
            </Button>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="border-2 rounded-lg p-3 md:p-4 flex flex-col items-center" style={{ borderColor: '#2c2c2c', backgroundColor: 'rgba(44, 44, 44, 0.15)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)' }}>
              <div className="text-xs md:text-sm mb-1" style={{ fontFamily: 'Varela Round, sans-serif', color: '#e064d5' }}>חבילה 3 טיפולים</div>
              <div className="text-lg md:text-xl font-bold" style={{ fontFamily: 'Varela Round, sans-serif', color: '#e064d5' }}>450 ש״ח</div>
            </div>
            <Button
              variant="outline"
              className="border-2 hover:border-[#2c2c2c] w-full"
              style={{ borderColor: '#e064d5', backgroundColor: 'rgba(224, 100, 213, 0.1)', color: '#e064d5', fontFamily: 'Varela Round, sans-serif' }}
              data-testid="book-package-3"
            >
              הזמן עכשיו
            </Button>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="border-2 rounded-lg p-3 md:p-4 flex flex-col items-center" style={{ borderColor: '#2c2c2c', backgroundColor: 'rgba(44, 44, 44, 0.15)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)' }}>
              <div className="text-xs md:text-sm mb-1" style={{ fontFamily: 'Varela Round, sans-serif', color: '#e064d5' }}>חבילה 6 טיפולים</div>
              <div className="text-lg md:text-xl font-bold" style={{ fontFamily: 'Varela Round, sans-serif', color: '#e064d5' }}>800 ש״ח</div>
            </div>
            <Button
              variant="outline"
              className="border-2 hover:border-[#2c2c2c] w-full"
              style={{ borderColor: '#e064d5', backgroundColor: 'rgba(224, 100, 213, 0.1)', color: '#e064d5', fontFamily: 'Varela Round, sans-serif' }}
              data-testid="book-package-6"
            >
              הזמן עכשיו
            </Button>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="border-2 rounded-lg p-3 md:p-4 flex flex-col items-center" style={{ borderColor: '#2c2c2c', backgroundColor: 'rgba(44, 44, 44, 0.15)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)' }}>
              <div className="text-xs md:text-sm mb-1" style={{ fontFamily: 'Varela Round, sans-serif', color: '#e064d5' }}>חבילה לכלה</div>
              <div className="text-lg md:text-xl font-bold" style={{ fontFamily: 'Varela Round, sans-serif', color: '#e064d5' }}>340 ש״ח</div>
            </div>
            <Button
              variant="outline"
              className="border-2 hover:border-[#2c2c2c] w-full"
              style={{ borderColor: '#e064d5', backgroundColor: 'rgba(224, 100, 213, 0.1)', color: '#e064d5', fontFamily: 'Varela Round, sans-serif' }}
              data-testid="book-bride"
            >
              הזמן עכשיו
            </Button>
          </div>
          
          <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
            <div className="border-2 rounded-lg p-3 md:p-4 flex flex-col items-center" style={{ borderColor: '#2c2c2c', backgroundColor: 'rgba(44, 44, 44, 0.15)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)' }}>
              <div className="text-xs md:text-sm mb-1" style={{ fontFamily: 'Varela Round, sans-serif', color: '#e064d5' }}>שירות עד הבית</div>
              <div className="text-lg md:text-xl font-bold" style={{ fontFamily: 'Varela Round, sans-serif', color: '#e064d5' }}>350 ש״ח</div>
            </div>
            <Button
              variant="outline"
              className="border-2 hover:border-[#2c2c2c] w-full"
              style={{ borderColor: '#e064d5', backgroundColor: 'rgba(224, 100, 213, 0.1)', color: '#e064d5', fontFamily: 'Varela Round, sans-serif' }}
              data-testid="book-home-service"
            >
              הזמן עכשיו
            </Button>
          </div>
        </div>

        {/* יומן זמנים אנכי */}
        <div className="mb-6 md:mb-8 max-w-6xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-4" style={{ 
            color: '#e064d5',
            fontFamily: 'Varela Round, sans-serif',
            textShadow: '0 0 10px rgba(224, 100, 213, 0.5)'
          }}>
            יומן זמנים פתוח
          </h3>
          <div className="border-2 rounded-lg p-4 md:p-6 space-y-3" style={{ borderColor: '#2c2c2c', backgroundColor: 'rgba(44, 44, 44, 0.15)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)' }}>
            {['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'].map((day, index) => (
              <div key={day} className="flex items-center justify-between border-b pb-2" style={{ borderColor: '#2c2c2c' }}>
                <span className="text-sm md:text-base font-bold" style={{ fontFamily: 'Varela Round, sans-serif', color: '#e064d5' }}>
                  {day}
                </span>
                <span className="text-sm md:text-base" style={{ fontFamily: 'Varela Round, sans-serif', color: '#e064d5' }}>
                  {index === 5 ? 'סגור' : index === 6 ? '09:00 - 14:00' : '09:00 - 20:00'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3 בלוקים עיקריים */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          
          {/* בלוק ראשון - הנחיות לפני ואחרי טיפול */}
          <div className="border-2 rounded-lg p-4 md:p-6" style={{ borderColor: '#2c2c2c', backgroundColor: 'rgba(44, 44, 44, 0.15)', boxShadow: '8px 0 12px rgba(0, 0, 0, 0.6)' }} data-testid="block-guidelines">
            <h3 className="text-lg md:text-xl font-bold text-center mb-4" style={{ 
              color: '#e064d5',
              fontFamily: 'Varela Round, sans-serif'
            }}>
              הנחיות לפני ואחרי טיפול
            </h3>
            <div className="text-xs md:text-sm leading-relaxed space-y-3" style={{ fontFamily: 'Varela Round, sans-serif', color: '#e064d5' }}>
              <p><strong>לפני הטיפול:</strong> קלחת סבון פילינג/גרגירים יום לפני. גילוח במידת הצורך 24 שעות לפני. אין למרוח שמן/קרם/דאודורנט ביום הטיפול. הגיעו בבגדים קלילים, רחבים, כהים וכפכפים.</p>
              <p><strong>אחרי הטיפול:</strong> המתנה 4 שעות. הימנעו מהזעה ומגע מים עד למקלחת הראשונה. שטפו עם מים זורמים ללא סבון/קירצוף. התנגבו בטפיחות.</p>
              <p><strong>תחזוקה:</strong> הגוון הסופי יתפתח למחרת. הימנעו מפילינג/ליפה במהלך השבוע. המרחו פעמיים ביום בחמאת גוף איכותית לשימור תוצאת השיזוף.</p>
            </div>
          </div>

          {/* בלוק אמצעי - עמידות והתאמה אישית */}
          <div className="border-2 rounded-lg p-4 md:p-6" style={{ borderColor: '#2c2c2c', backgroundColor: 'rgba(44, 44, 44, 0.15)', boxShadow: '8px 0 12px rgba(0, 0, 0, 0.6)' }} data-testid="block-durability">
            <h3 className="text-lg md:text-xl font-bold text-center mb-4" style={{ 
              color: '#e064d5',
              fontFamily: 'Varela Round, sans-serif'
            }}>
              עמידות והתאמה אישית
            </h3>
            <div className="text-xs md:text-sm leading-relaxed space-y-3" style={{ fontFamily: 'Varela Round, sans-serif', color: '#e064d5' }}>
              <p><strong>עמידות:</strong> השיזוף מחזיק 5-10 ימים, תלוי בסוג העור והטיפול. דהייה הדרגתית ואחידה בדומה לשיזוף טבעי.</p>
              <p><strong>התאמה אישית:</strong> התאמה לפי גוון עור טבעי ולאירועים ספציפיים. עבודה עם המותגים המובילים בעולם - תמיסות איכותיות, טבעיות, ללא פראבנים, עם רכיבי לחות וויטמינים.</p>
              <p><strong>מיתוסים:</strong> עם תכשירים איכותיים התוצאה טבעית ואחידה, ללא כתמים או גוון כתום. תכשירים מודרניים פתרו את בעיית הריח האופייני.</p>
            </div>
          </div>

          {/* בלוק שלישי - יתרונות והסתרת פגמים */}
          <div className="border-2 rounded-lg p-4 md:p-6" style={{ borderColor: '#2c2c2c', backgroundColor: 'rgba(44, 44, 44, 0.15)', boxShadow: '8px 0 12px rgba(0, 0, 0, 0.6)' }} data-testid="block-benefits">
            <h3 className="text-lg md:text-xl font-bold text-center mb-4" style={{ 
              color: '#e064d5',
              fontFamily: 'Varela Round, sans-serif'
            }}>
              יתרונות והסתרת פגמים
            </h3>
            <div className="text-xs md:text-sm leading-relaxed space-y-3" style={{ fontFamily: 'Varela Round, sans-serif', color: '#e064d5' }}>
              <p><strong>אלטרנטיבה בריאה:</strong> אלטרנטיבה מעולה לשיזוף בשמש, ללא סיכונים בריאותיים. מתאים לכל סוגי העור, כולל בהירי עור שעלולים להיכוות בשמש.</p>
              <p><strong>הסתרת פגמים:</strong> טשטוש קל של צלקות, ורידים, סימני מתיחה או אקנה על ידי יצירת גוון אחיד. מראה בריא, זוהר וחטוב באופן מיידי.</p>
              <p><strong>תיאום:</strong> יש לתאם את הטיפול יום/יומיים לפני השיזוף הרצוי לקבלת התוצאה האופטימלית.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
