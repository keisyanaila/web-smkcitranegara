'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Gagal masuk');
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal masuk');
      setLoading(false);
    }
  };

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={submit}>
        <h1>Masuk Admin</h1>
        <p>SMK Citra Negara</p>
        {error && <div className="login-error">{error}</div>}
        <input
          type="password"
          autoFocus
          placeholder="Password admin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading || !password}>
          {loading ? 'Memeriksa…' : 'Masuk'}
        </button>
      </form>

      <style>{`
        .login-wrap { min-height: 100vh; display: grid; place-items: center; background: linear-gradient(160deg,#052e16,#15803d); padding: 24px; font-family: system-ui, sans-serif; }
        .login-card { width: 100%; max-width: 340px; background: #fff; border-radius: 16px; padding: 32px 26px; box-shadow: 0 24px 60px rgba(0,0,0,0.3); display: flex; flex-direction: column; gap: 12px; }
        .login-card h1 { font-size: 20px; font-weight: 800; color: #0A1628; }
        .login-card p { font-size: 12px; color: #6b7280; margin-top: -8px; }
        .login-card input { padding: 11px 13px; border: 1.5px solid #d1d5db; border-radius: 10px; font-size: 14px; }
        .login-card input:focus { outline: none; border-color: #C8973A; box-shadow: 0 0 0 3px rgba(200,151,58,0.15); }
        .login-card button { margin-top: 4px; padding: 11px; border: none; border-radius: 10px; background: linear-gradient(135deg,#C8973A,#E8B84B); color: #0A1628; font-weight: 800; font-size: 14px; cursor: pointer; }
        .login-card button:disabled { opacity: 0.6; cursor: default; }
        .login-error { background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; font-size: 13px; padding: 8px 11px; border-radius: 8px; }
      `}</style>
    </div>
  );
}
