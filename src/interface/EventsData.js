export interface EventsData {
  result: Result;
  errors: any[];
}

export interface Result {
  success: boolean;
  counters: Counters;
  items: Item[];
}

export interface Counters {
  total: number;
}

export interface Item {
  id: number;
  langcode: Langcode;
  author: Author;
  title: string;
  created: number;
  updated: number;
  body: string;
  category: Category[];
  cost: null;
  views: Views;
  email: null | string;
  entity_image: null;
  featured: boolean;
  finish_date: number;
  geofield: Geofield | null;
  image: Image[];
  likes: Likes;
  moderation_status: ModerationStatus;
  organizer: string;
  other_contacts: null;
  phone: string;
  price: Price;
  push: boolean;
  start_date: number;
  tags: Category[];
  target_audience: null;
  time: Time;
  video: any[];
  website: Website;
  link: string;
  type: Type;
  body_summary: string;
}

export interface Author {
  target_id: number;
  target_type: any;
  target_uuid: string;
  url: String;
  user_picture: null;
  user_full_name: any;
  twitter_account: null;
}

export interface Category {
  target_id: number;
  target_type: any;
  target_uuid: string;
  url: string;
  taxonomy_term_name: string;
  parent: any[];
  icon_taxonomy?: null;
}

export interface Geofield {
  address: string;
  lat: number;
  lon: number;
}

export interface Image {
  target_id: number;
  target_type: any;
  url: string;
  preview: Preview;
  alt: any;
  title: string;
  width: number;
  height: number;
}

export interface Preview {
  medium: string;
  thumbnail: string;
}

export interface Likes {
  likes: number;
  state: boolean;
}

export interface ModerationStatus {
  state: number;
  reason: string;
}

export interface Price {
  type: number;
  amount: null;
  range: Range;
}

export interface Range {
  from: null;
  to: null;
}

export interface Time {
  start_time: number;
  finish_time: number;
}

export interface Views {
  count_views: number;
}

export interface Website {
  uri: string;
  title: string;
  options: any[];
}
