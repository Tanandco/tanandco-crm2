import TouchInterface from '@/components/TouchInterface';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLocation } from 'wouter';

export default function SelfService() {
  const [, navigate] = useLocation();

  const handleServiceSelect = (service: string) => {
    console.log(`Self-service: ${service} selected`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950" dir="rtl">
      {/* Header with Back Button */}
      <div className="absolute top-4 right-4 z-50">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="border-pink-500/50 hover:border-pink-500 gap-2"
          data-testid="button-back"
        >
          <ArrowRight className="w-4 h-4" />
          חזרה
        </Button>
      </div>

      {/* Title */}
      <div className="absolute top-20 left-0 right-0 z-40">
        <h1 
          className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(236, 72, 153, 0.5))'
          }}
          data-testid="title-self-service"
        >
          שירות עצמי 24/7
        </h1>
        <p className="text-center text-pink-200/80 mt-2 text-lg" data-testid="subtitle-self-service">
          בחרו את השירות המועדף עליכם
        </p>
      </div>

      {/* Main Touch Interface */}
      <div className="pt-32">
        <TouchInterface onServiceSelect={handleServiceSelect} />
      </div>
    </div>
  );
}
