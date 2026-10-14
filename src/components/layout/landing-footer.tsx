import { Container } from '@/components/shared/container';
import { landingMeta } from '@/lib/data/landing';

/** Pie mínimo, sin enlaces, para el modo one page. */
export function LandingFooter() {
  return (
    <footer className="border-border/60 bg-muted border-t">
      <Container className="flex justify-center py-8">
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} {landingMeta.name}
        </p>
      </Container>
    </footer>
  );
}
