export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  h1Title: string;
  metaTitle: string;
  metaDescription: string;
  sceneDescription: string;
  shortHeadline: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  image: string;
  vehicleTag: string; // e.g. "Toyota Innova Crysta", "Mercedes-Benz E-Class"
  locationTag: string; // e.g. "BKC Mumbai", "Bandra-Worli Sea Link"
  badge: string;
  trustStatement: string; // e.g. "✓ Police Verified · Punctual Mumbai Chauffeur"
  dutyFlexibility: string;
  keyFeatures: string[];
  idealFor: string[];
  vehicleSuitability: string[];
  serviceOverview: {
    whatIs: string;
    whoSuitable: string;
    howDniHelps: string;
  };
  whoIsThisFor: {
    title: string;
    description: string;
    icon: string;
  }[];
  useCases: {
    title: string;
    description: string;
    route: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedServices: {
    slug: string;
    title: string;
  }[];
  servedLocations: {
    slug: string;
    name: string;
  }[];
}

export interface LocationItem {
  id: string;
  name: string;
  district: string;
  image: string;
  seoHeadline: string;
  shortSnippet: string;
  fullContent: string;
  popularHubs: string[];
  avgDispatchTime: string;
  keyRoutes: string[];
  localFaqs: {
    question: string;
    answer: string;
  }[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Verification & Safety' | 'Services & Booking';
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  organization?: string;
  location: string;
  avatar: string;
  category: 'Family' | 'Corporate' | 'Senior Citizen' | 'Luxury Car Owner';
  rating: number;
  text: string;
  carModel?: string;
  date: string;
}

export interface LeadFormData {
  fullName: string;
  phone: string;
  email: string;
  location: string;
  serviceType: string;
  requirementType?: 'Hourly' | 'Part-Time' | 'Full-Time' | 'Temporary' | 'Permanent';
  message?: string;
}
