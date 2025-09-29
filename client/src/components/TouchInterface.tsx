import { useState } from 'react';
import { Sun, Droplets, CreditCard, Plus, FileText, Headphones } from 'lucide-react';
import Logo from './Logo';
import ServiceCard from './ServiceCard';
import StatusDisplay from './StatusDisplay';
import NavigationBar from './NavigationBar';

interface TouchInterfaceProps {
  onServiceSelect?: (service: string) => void;
  onNavigate?: (path: string) => void;
}

export default function TouchInterface({ onServiceSelect, onNavigate }: TouchInterfaceProps) {
  // todo: remove mock functionality
  const [currentCustomer, setCurrentCustomer] = useState<any>(null);
  const [currentPath, setCurrentPath] = useState('/');

  const services = [
    { title: 'מיטות שיזוף UV', icon: Sun, id: 'uv-beds' },
    { title: 'שיזוף בהתזה', icon: Droplets, id: 'spray-tan' },
    { title: 'רכישת כרטיסיה', icon: CreditCard, id: 'buy-package' },
    { title: 'טעינת יתרה', icon: Plus, id: 'add-credit' },
    { title: 'טפסי בריאות', icon: FileText, id: 'health-forms' },
    { title: 'שירות לקוחות', icon: Headphones, id: 'customer-service' },
  ];

  const handleServiceClick = (serviceId: string) => {
    console.log(`Service selected: ${serviceId}`);
    onServiceSelect?.(serviceId);
  };

  const handleNavigation = (path: string) => {
    setCurrentPath(path);
    onNavigate?.(path);
  };

  const handleCustomerIdentification = () => {
    // todo: remove mock functionality - simulate customer login
    setCurrentCustomer({
      name: 'דוד',
      balance: 8,
      lastVisit: '15/1/2025'
    });
  };

  return (
    <div 
      className="min-h-screen text-white font-hebrew relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--background)/0.95) 50%, hsl(var(--primary)/0.05) 100%)'
      }}
      data-testid="touch-interface"
    >
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)`,
            border: `2px solid hsl(var(--primary)/0.3)`,
            animation: 'pulse 4s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-20 left-20 w-48 h-48 rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)`,
            border: `2px solid hsl(var(--primary)/0.3)`,
            animation: 'pulse 6s ease-in-out infinite reverse'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 py-8 pb-24">
        {/* Logo */}
        <Logo className="mb-8" />

        {/* Customer Status */}
        <StatusDisplay 
          customer={currentCustomer}
          onScanQR={handleCustomerIdentification}
          onPhoneLogin={handleCustomerIdentification}
        />

        {/* Service Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-items-center mb-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              icon={service.icon}
              onClick={() => handleServiceClick(service.id)}
            />
          ))}
        </div>

        {/* Brand Banner - todo: remove mock functionality */}
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-slate-800/20 to-slate-700/20 p-3 border border-slate-600/30">
          <div className="animate-scroll-horizontal whitespace-nowrap text-sm text-gray-300 font-hebrew">
            ברוכים הבאים ל-Tan & Co - הסלון המתקדם ביותר לשיזוף בישראל
          </div>
        </div>
      </div>

      {/* Navigation */}
      <NavigationBar 
        currentPath={currentPath}
        onNavigate={handleNavigation}
      />
    </div>
  );
}