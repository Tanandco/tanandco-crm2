export interface Package {
  id: string;
  nameHe: string;
  nameEn: string;
  type: string; // membership type: 'sun-beds', 'spray-tan', etc.
  sessions: number;
  price: number;
  currency: string;
  cardcomItemCode?: string; // Cardcom product code
  description?: string;
  descriptionHe?: string;
}

export const packagesCatalog: Record<string, Package> = {
  // Sun Beds Packages
  "sunbed-10": {
    id: "sunbed-10",
    nameHe: "מנוי 10 כניסות - מיטות שיזוף",
    nameEn: "10 Sessions - Sun Beds",
    type: "sun-beds",
    sessions: 10,
    price: 299,
    currency: "ILS",
    cardcomItemCode: "SUNBED10",
    descriptionHe: "10 כניסות למיטות שיזוף - תוקף 60 יום",
  },
  "sunbed-20": {
    id: "sunbed-20",
    nameHe: "מנוי 20 כניסות - מיטות שיזוף",
    nameEn: "20 Sessions - Sun Beds",
    type: "sun-beds",
    sessions: 20,
    price: 549,
    currency: "ILS",
    cardcomItemCode: "SUNBED20",
    descriptionHe: "20 כניסות למיטות שיזוף - תוקף 90 יום",
  },
  "sunbed-unlimited": {
    id: "sunbed-unlimited",
    nameHe: "מנוי בלתי מוגבל - מיטות שיזוף",
    nameEn: "Unlimited Monthly - Sun Beds",
    type: "sun-beds",
    sessions: 999, // Represent unlimited as high number
    price: 799,
    currency: "ILS",
    cardcomItemCode: "SUNBED_UNLIM",
    descriptionHe: "כניסות בלתי מוגבלות למיטות שיזוף - תוקף 30 יום",
  },

  // Spray Tan Packages
  "spray-5": {
    id: "spray-5",
    nameHe: "מנוי 5 כניסות - שיזוף בריסוס",
    nameEn: "5 Sessions - Spray Tan",
    type: "spray-tan",
    sessions: 5,
    price: 399,
    currency: "ILS",
    cardcomItemCode: "SPRAY5",
    descriptionHe: "5 טיפולי שיזוף בריסוס - תוקף 60 יום",
  },
  "spray-10": {
    id: "spray-10",
    nameHe: "מנוי 10 כניסות - שיזוף בריסוס",
    nameEn: "10 Sessions - Spray Tan",
    type: "spray-tan",
    sessions: 10,
    price: 749,
    currency: "ILS",
    cardcomItemCode: "SPRAY10",
    descriptionHe: "10 טיפולי שיזוף בריסוס - תוקף 90 יום",
  },

  // Combo Packages
  "combo-basic": {
    id: "combo-basic",
    nameHe: "מנוי משולב - 10 מיטות + 3 ריסוס",
    nameEn: "Combo - 10 Beds + 3 Spray",
    type: "combo",
    sessions: 13,
    price: 599,
    currency: "ILS",
    cardcomItemCode: "COMBO_BASIC",
    descriptionHe: "10 כניסות למיטות שיזוף + 3 טיפולי ריסוס - תוקף 90 יום",
  },
  "combo-premium": {
    id: "combo-premium",
    nameHe: "מנוי משולב פרימיום - 20 מיטות + 5 ריסוס",
    nameEn: "Premium Combo - 20 Beds + 5 Spray",
    type: "combo",
    sessions: 25,
    price: 999,
    currency: "ILS",
    cardcomItemCode: "COMBO_PREM",
    descriptionHe: "20 כניסות למיטות שיזוף + 5 טיפולי ריסוס - תוקף 120 יום",
  },
};

export function getPackageById(packageId: string): Package | null {
  return packagesCatalog[packageId] || null;
}

export function getAllPackages(): Package[] {
  return Object.values(packagesCatalog);
}

export function getPackagesByType(type: string): Package[] {
  return Object.values(packagesCatalog).filter((pkg) => pkg.type === type);
}
