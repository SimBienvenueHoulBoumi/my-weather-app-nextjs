export interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

export interface LocationSelectProps {
  locations: Location[];
  selectedCity: string;
  onChange: (city: string) => void;
}