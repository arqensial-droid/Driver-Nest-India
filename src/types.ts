export interface ServiceItem {
  id: string;
  slug: string;
  canonicalPath?: string;
  title: string;
  h1Title: string;
  metaTitle: string;
  metaDescription: string;
  sceneDescription: string;
  shortHeadline: string;
  shortDescription: string;
  pricing?: string;
  shortDesc?: string;
  features?: string[];
  fullDescription: string;
  iconName: string;
  image: string;
  vehicleTag: string; // e.g. "Toyota Innova Crysta", "Honda City", "Maruti Dzire"
  locationTag: string; // e.g. "BKC Mumbai", "Bandra-Worli Sea Link"
  badge: string;
  trustStatement: string;
  dutyFlexibility: string;
  keyFeatures: string[];
  idealFor: string[];
  vehicleSuitability: string[];
  serviceOverview: {
    whatIs: string;
    whoSuitable: string;
    howOtdsHelps?: string;
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
  slug?: string;
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
  heroSubtitle?: string;
  keyHubs?: string[];
  metaTitle?: string;
  metaDescription?: string;
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
  car?: string;
  date: string;
}

export type FormType =
  | 'Homepage Quick Booking Form'
  | 'Book a Driver Form'
  | 'Contact Form'
  | 'Personal Driver Service Form'
  | 'Hourly Driver Form'
  | 'Part-Time Driver Form'
  | 'Full-Time Driver Form'
  | 'Permanent Driver Form'
  | 'Corporate Driver Form'
  | 'Outstation Driver Form'
  | 'Airport Driver Form'
  | 'Chauffeur Service Form'
  | 'Senior Citizen Driver Form'
  | 'Event Driver Form'
  | 'Temporary Driver Form'
  | 'Family Driver Form'
  | 'Driver Requirement Form'
  | string;

export interface LeadFormData {
  name: string;
  mobile: string;
  email: string;
  location: string;
  serviceType: string;
  message?: string;
  date?: string;
  time?: string;
  vehicleType?: string;
  companyName?: string;
  flightNumber?: string;
  terminal?: string;
  vehicleModel?: string;
  formName?: FormType;
}

export interface LeadSubmissionRecord extends LeadFormData {
  id: string;
  timestamp: string;
  leadSource: string;
  ipAddress: string;
  targetEmail: string;
  emailSubject: string;
}
