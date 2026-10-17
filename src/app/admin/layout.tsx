import type { Metadata } from 'next';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { Container } from '@/components/shared/container';
import { LogoMark } from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/actions/admin-auth';
import { createSessionClient } from '@/lib/supabase/server';

// El panel depende de la sesión: nunca se cachea.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Administración',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-full bg-neutral-50">
      <header className="border-border/60 bg-neutral-0 border-b">
        <Container className="flex h-14 items-center justify-between gap-4">
          <Link href="/admin" className="flex items-center gap-3 font-semibold text-neutral-900">
            <LogoMark className="h-9" />
            Panel del blog
          </Link>
          {user && (
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground hidden sm:inline">{user.email}</span>
              <form action={signOut}>
                <Button type="submit" variant="ghost" size="sm">
                  <LogOut />
                  Salir
                </Button>
              </form>
            </div>
          )}
        </Container>
      </header>
      <Container className="py-10">{children}</Container>
    </div>
  );
}
