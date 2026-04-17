export interface Sponsor {
  name: string;
  logo: string;
  url: string;
  desc?: string;
}

export interface Speaker {
  name: string;
  role: string;
  image: string;
}

export interface AgendaItem {
  time: string;
  title: string;
  desc: string;
}

export interface Event {
  id: number;
  title_en: string;
  title_gr: string;
  status: "upcoming" | "past";
  type: string;
  date: string;
  time: string;
  description_en: string;
  description_gr: string;
  details_en: string;
  details_gr: string;
  registrationUrl?: string; // External link:Google Form, Eventbrite, etc.
  image: string;
  speakers?: string;
  // speakers?: Speaker[];
  // sponsors: Sponsor[];
  // agenda?: AgendaItem[];
  // photos: number[];
}
