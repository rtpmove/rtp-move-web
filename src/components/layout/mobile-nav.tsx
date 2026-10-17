'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { LogoMark } from '@/components/layout/logo';
import { siteConfig } from '@/config/site';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Abrir menú de navegación"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle className="text-neutral-900">
            <LogoMark className="h-10" />
            <span className="sr-only">{siteConfig.name}</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="hover:bg-muted rounded-lg px-3 py-2.5 text-base font-medium text-neutral-800"
            >
              {item.label}
            </Link>
          ))}
          <Button
            render={<Link href="/contacto" onClick={() => setOpen(false)} />}
            size="lg"
            className="mt-3 h-11 rounded-xl text-base"
          >
            Pedir cita
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
