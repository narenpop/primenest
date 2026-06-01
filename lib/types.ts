export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // in sq ft
  propertyType: "Apartment" | "Villa" | "House" | "Townhouse" | "Commercial";
  images: string[];
  featured: boolean;
  amenities: string[];
  description: string;
  agentId: string;
  floorPlan?: string;
  rating?: number;
  reviews?: number;
}

export interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string;
  image: string;
  agency: string;
  yearsExperience: number;
}

export interface Testimonial {
  id: string;
  name: string;
  image: string;
  text: string;
  rating: number;
}
