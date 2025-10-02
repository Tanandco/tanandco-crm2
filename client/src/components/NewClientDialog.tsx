import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';

interface NewClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewClientDialog({ open, onOpenChange }: NewClientDialogProps) {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: ''
  });

  const handleSubmit = () => {
    // Navigate to onboarding page
    onOpenChange(false);
    navigate('/onboarding');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-800/95 border-pink-500/30 max-w-md" dir="rtl">
        <DialogTitle className="text-xl font-bold text-white text-center">
          הרשמת לקוח חדש
        </DialogTitle>
        <DialogDescription className="text-gray-300 text-center text-sm">
          מלא/י את הפרטים הבאים להתחלת תהליך ההרשמה
        </DialogDescription>

        <div className="space-y-4 mt-4">
          <div className="w-16 h-16 mx-auto bg-pink-500/20 rounded-full flex items-center justify-center">
            <UserPlus className="w-8 h-8 text-pink-400" />
          </div>

          <div className="space-y-3">
            <Input
              placeholder="שם מלא"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="bg-black/50 border-pink-500/30 text-white"
              data-testid="input-full-name"
            />
            <Input
              placeholder="מספר טלפון"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-black/50 border-pink-500/30 text-white"
              data-testid="input-phone"
            />
            <Input
              placeholder="כתובת אימייל"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-black/50 border-pink-500/30 text-white"
              data-testid="input-email"
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold"
            data-testid="button-submit-registration"
          >
            המשך להרשמה
          </Button>

          <p className="text-xs text-gray-400 text-center">
            תהליך ההרשמה כולל מילוי טופס בריאות וצילום תמונה
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
