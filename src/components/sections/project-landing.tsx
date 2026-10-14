import type { BlogPostMeta } from '@/types';
import { Logo } from '@/components/layout/logo';
import { HeroSlider } from '@/components/sections/hero-slider';
import { BlogSection } from '@/components/sections/blog-section';
import { AboutUs } from '@/components/sections/about-us';
import { heroSlides, landingIntro } from '@/lib/data/landing';

const ABOUT_SECTION_ID = 'quienes-somos';
const BLOG_SECTION_ID = 'blog';

/** Página única de presentación del proyecto (modo one page). */
export function ProjectLanding({ posts }: { posts: BlogPostMeta[] }) {
  return (
    <>
      <HeroSlider
        slides={heroSlides}
        eyebrow={landingIntro.eyebrow}
        title={landingIntro.title}
        description={landingIntro.description}
        actions={[
          { label: 'Quiénes somos', href: `#${ABOUT_SECTION_ID}` },
          { label: 'Ver el blog', href: `#${BLOG_SECTION_ID}` },
        ]}
        topSlot={<Logo className="text-neutral-0" />}
      />
      <AboutUs id={ABOUT_SECTION_ID} />
      <BlogSection
        id={BLOG_SECTION_ID}
        posts={posts}
        eyebrow="Nuestro blog"
        title="Lo que vamos compartiendo"
        description="Artículos y consejos prácticos de fisioterapia escritos por nuestro equipo."
      />
    </>
  );
}
