import { Home, Store, History, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationItem {
  icon: React.ElementType;
  label: string;
  path: string;
  active?: boolean;
}

interface NavigationBarProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export default function NavigationBar({ currentPath = '/', onNavigate }: NavigationBarProps) {
  const navItems: NavigationItem[] = [
    { icon: Home, label: 'בית', path: '/' },
    { icon: Store, label: 'חנות', path: '/store' },
    { icon: History, label: 'היסטוריה', path: '/history' },
    { icon: HelpCircle, label: 'עזרה', path: '/help' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div 
        className="flex items-center justify-center gap-2 px-4 py-3 mx-4 mb-4 rounded-xl backdrop-blur-xl border border-slate-600/30"
        style={{
          background: 'linear-gradient(to right, rgba(51, 65, 85, 0.8), rgba(71, 85, 105, 0.8))'
        }}
        data-testid="navigation-bar"
      >
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              className={`
                flex flex-col items-center gap-1 p-3 min-w-[60px] h-auto
                text-white hover:text-primary transition-all duration-300
                ${isActive ? 'text-primary bg-primary/10' : ''}
                hover-elevate active-elevate-2
              `}
              onClick={() => {
                console.log(`Navigation to ${item.path} clicked`);
                onNavigate?.(item.path);
              }}
              data-testid={`nav-${item.path.replace('/', '') || 'home'}`}
            >
              <Icon 
                size={20}
                className={isActive ? 'drop-shadow-sm' : ''}
                style={{
                  filter: isActive ? 'drop-shadow(0 0 10px hsl(var(--primary)/0.5))' : 'none'
                }}
              />
              <span className="text-xs font-hebrew">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}