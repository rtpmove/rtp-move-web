import type { LucideIcon } from 'lucide-react';

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: LucideIcon;
}

export interface WorkStep {
  step: number;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Differentiator {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  author: string;
  coverImage: string;
  tags: string[];
  readingTime?: string;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}
