'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const router = useRouter();
  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };
  return (
    <button type="button" className="adm-logout" onClick={logout}>
      <LogOut size={14} aria-hidden="true" />
      Keluar
    </button>
  );
}
