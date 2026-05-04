export type Profile = {
  name: string;
  banner_url: string;
  tagline: string;
  headline: string;
  subheadline: string;
  avatar_url: string;
  footer_text: string;
  website: string;
};

export type Social = {
  platform: string;
  label: string;
  handle: string;
  url: string;
  icon_color: string;
  active: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  original_price: number;
  badge?: string;
  image_url?: string;
  cta_url: string;
  active: string;
  sort_order: number;
};
