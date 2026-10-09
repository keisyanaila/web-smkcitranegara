'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Newspaper, Trophy, CalendarDays, ExternalLink } from 'lucide-react';

const LINKS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/berita', label: 'Berita', icon: Newspaper },
  { href: '/admin/prestasi', label: 'Prestasi', icon: Trophy },
  { href: '/admin/spmb', label: 'Jadwal SPMB', icon: CalendarDays },
];

/** Menu admin dengan penanda halaman aktif. */
export default function AdminNav() {
  const path = usePathname();
  const isActive = (href: string) => (href === '/admin' ? path === '/admin' : path.startsWith(href));
  const navRef = useRef<HTMLElement>(null);

  // Di HP menu bisa digeser; pastikan tab aktif terlihat.
  useEffect(() => {
    navRef.current?.querySelector('.is-active')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [path]);

  return (
    <nav className="adm-nav" aria-label="Menu admin" ref={navRef}>
      {LINKS.map(({ href, label, icon: Icon }) => (
        <Link key={href} href={href} className={isActive(href) ? 'is-active' : ''} aria-current={isActive(href) ? 'page' : undefined}>
          <Icon size={16} aria-hidden="true" />
          {label}
        </Link>
      ))}
      <a href="/" target="_blank" rel="noreferrer" className="adm-nav-site">
        <ExternalLink size={15} aria-hidden="true" />
        Lihat situs
      </a>
    </nav>
  );
}
