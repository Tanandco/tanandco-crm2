import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, CreditCard, Package } from 'lucide-react';

interface AdvancedPurchaseOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function AdvancedPurchaseOverlay({ open, onClose }: AdvancedPurchaseOverlayProps) {
  const packages = [
    {
      id: 'single',
      title: 'כניסה בודדת',
      price: 70,
      sessions: 1,
      description: 'כניסה אחת למיטת שיזוף'
    },
    {
      id: '8-sessions',
      title: 'כרטיסיית 8 כניסות',
      price: 220,
      sessions: 8,
      pricePerSession: 27.5,
      description: 'חבילה אישית - לא ניתן להעברה'
    },
    {
      id: 'home',
      title: 'כרטיסיית הבית',
      price: 300,
      sessions: 20,
      pricePerSession: 15,
      description: 'החבילה המשתלמת ביותר! כולל ברונזר בית',
      isHighlighted: true
    }
  ];

  const handlePurchase = (packageId: string) => {
    console.log('Purchase package:', packageId);
    // TODO: Implement payment flow
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-800/95 border-pink-500/30 max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogTitle className="text-2xl font-bold text-white text-center">
          רכישת חבילות שיזוף
        </DialogTitle>
        <DialogDescription className="text-gray-300 text-center">
          בחר/י את החבילה המתאימה לך
        </DialogDescription>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`p-6 ${
                pkg.isHighlighted
                  ? 'bg-gradient-to-br from-pink-900/40 to-purple-900/40 border-pink-500/50 ring-2 ring-pink-500/30'
                  : 'bg-slate-900/60 border-slate-700/50'
              }`}
            >
              <div className="text-center space-y-4">
                <Package className={`w-12 h-12 mx-auto ${pkg.isHighlighted ? 'text-pink-400' : 'text-gray-400'}`} />
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{pkg.title}</h3>
                  <p className="text-sm text-gray-400">{pkg.description}</p>
                </div>

                <div>
                  <div className="text-3xl font-bold text-white">₪{pkg.price}</div>
                  {pkg.pricePerSession && (
                    <div className="text-sm text-gray-400 mt-1">
                      ₪{pkg.pricePerSession} לכניסה
                    </div>
                  )}
                </div>

                <div className="text-sm text-gray-300">
                  {pkg.sessions} {pkg.sessions === 1 ? 'כניסה' : 'כניסות'}
                </div>

                <Button
                  onClick={() => handlePurchase(pkg.id)}
                  className={`w-full ${
                    pkg.isHighlighted
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700'
                      : 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500'
                  }`}
                  data-testid={`button-purchase-${pkg.id}`}
                >
                  <CreditCard className="w-4 h-4 ml-2" />
                  רכישה
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-sm text-yellow-200 text-center">
            💳 התשלום מאובטח ומבוצע דרך מערכת Cardcom
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
