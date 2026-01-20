export interface Hobby {
  name: string;
  category: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'Leader' | 'Translator' | 'Redrawer' | 'Typesetter' | 'Quality Check' | 'Raw Provider';
  avatarUrl: string;
  bio: string;
  favManga: string;
  hobbies: Hobby[];
  powerLevel: number; // Just for fun charts
  coffeeConsumption: number; // Cups per day
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string;
}

export interface MascotData {
  gifs: string[];
  quotes: string[];
  fallbackImage: string;
}