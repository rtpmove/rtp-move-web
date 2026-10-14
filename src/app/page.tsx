import type { Metadata } from 'next';
import { Hero } from '@/components/sections/hero';
import { Services } from '@/components/sections/services';
import { HowWeWork } from '@/components/sections/how-we-work';
import { WhyChooseUs } from '@/components/sections/why-choose-us';
import { Testimonials } from '@/components/sections/testimonials';
import { Faq } from '@/components/sections/faq';
import { Cta } from '@/components/sections/cta';
import { ContactSection } from '@/components/sections/contact-section';
import { ProjectLanding } from '@/components/sections/project-landing';
import { features } from '@/config/features';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo/metadata';
import { getAllPosts } from '@/lib/blog';
import { landingMeta } from '@/lib/data/landing';

export const metadata: Metadata = features.onePage
  ? buildMetadata({
      title: landingMeta.title,
      description: landingMeta.description,
      keywords: landingMeta.keywords,
      path: '/',
    })
  : buildMetadata({
      title: `${siteConfig.name} — Fisioterapia y Rehabilitación en Arganzuela, Madrid`,
      description: siteConfig.description,
      path: '/',
    });

export default function HomePage() {
  if (features.onePage) return <ProjectLanding posts={getAllPosts()} />;

  return (
    <>
      <Hero />
      <Services />
      <HowWeWork />
      <WhyChooseUs />
      <Testimonials />
      <Faq />
      <Cta />
      <ContactSection />
    </>
  );
}
