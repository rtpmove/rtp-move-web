import { Container } from '@/components/shared/container';
import { LogoMark } from '@/components/layout/logo';
import { landingMeta } from '@/lib/data/landing';

/** Pie mínimo, sin enlaces, para el modo one page. */
export function LandingFooter() {
  return (
    <footer className="border-border/60 bg-muted border-t">
      <Container className="flex flex-col items-center gap-3 py-8">
        <LogoMark className="h-10 text-neutral-800" />
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} {landingMeta.name}
        </p>
      </Container>
    </footer>
  );
}
