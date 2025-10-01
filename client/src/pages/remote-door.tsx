import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DoorOpen, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export default function RemoteDoor() {
  const [lastOpened, setLastOpened] = useState<Date | null>(null);
  const { toast } = useToast();

  const openDoorMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest('/api/biostar/open-door', {
        method: 'POST',
        body: JSON.stringify({ doorId: '1' }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    },
    onSuccess: () => {
      setLastOpened(new Date());
      toast({
        title: '🚪 הדלת נפתחה!',
        description: 'הדלת נפתחה בהצלחה',
      });
    },
    onError: (error: any) => {
      toast({
        title: '❌ שגיאה',
        description: error.message || 'לא ניתן לפתוח את הדלת',
        variant: 'destructive'
      });
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-8 flex items-center justify-center" dir="rtl">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">🚪 פתיחה מרחוק</CardTitle>
          <CardDescription className="text-lg">
            לחץ על הכפתור לפתיחת הדלת
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Door Button */}
          <Button
            onClick={() => openDoorMutation.mutate()}
            disabled={openDoorMutation.isPending}
            className="w-full h-32 text-2xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-lg shadow-pink-500/50"
            data-testid="button-open-door"
          >
            {openDoorMutation.isPending ? (
              <>
                <Loader2 className="w-8 h-8 ml-3 animate-spin" />
                פותח...
              </>
            ) : (
              <>
                <DoorOpen className="w-8 h-8 ml-3" />
                פתח דלת
              </>
            )}
          </Button>

          {/* Status Messages */}
          {openDoorMutation.isSuccess && (
            <div className="flex items-center justify-center gap-2 p-4 bg-green-500/10 border border-green-500/50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="text-green-500 font-semibold">הדלת נפתחה בהצלחה!</span>
            </div>
          )}

          {openDoorMutation.isError && (
            <div className="flex items-center justify-center gap-2 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-500 font-semibold">
                {(openDoorMutation.error as any)?.message || 'שגיאה בפתיחת הדלת'}
              </span>
            </div>
          )}

          {/* Last Opened Time */}
          {lastOpened && (
            <div className="text-center text-sm text-muted-foreground">
              נפתחה לאחרונה: {lastOpened.toLocaleTimeString('he-IL')}
            </div>
          )}

          {/* Info Box */}
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <p className="text-sm text-muted-foreground text-center">
              💡 הדלת תיפתח לכמה שניות ותינעל אוטומטית
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
