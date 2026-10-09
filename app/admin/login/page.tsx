'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

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
        <img src="/images/logo-badge.png" alt="Logo SMK Citra Negara" className="login-logo" />
        <h1>Masuk Admin</h1>
        <p>Panel pengelola situs SMK Citra Negara</p>
        {error && <div className="login-error" role="alert">{error}</div>}
        <label htmlFor="adm-pass" className="login-label">Password</label>
        <div className="login-pass">
          <input
            id="adm-pass"
            type={show ? 'text' : 'password'}
            autoFocus
            autoComplete="current-password"
            placeholder="Masukkan password admin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" className="login-eye" onClick={() => setShow((v) => !v)} aria-label={show ? 'Sembunyikan password' : 'Tampilkan password'}>
            {show ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
        <button type="submit" className="login-submit" disabled={loading || !password}>
          {loading ? 'Memeriksa…' : 'Masuk'}
        </button>
        <Link href="/" className="login-back">← Kembali ke situs</Link>
      </form>

      <style>{`
        .login-wrap { min-height: 100vh; display: grid; place-items: center; background: radial-gradient(120% 80% at 50% 0%, #15803d 0%, #0B3D2E 55%, #052e16 100%); padding: 24px; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
        .login-card { width: 100%; max-width: 360px; background: #fff; border-radius: 18px; padding: 32px 28px 26px; box-shadow: 0 24px 60px rgba(0,0,0,0.3); display: flex; flex-direction: column; gap: 10px; border-top: 4px solid #C8973A; }
        .login-logo { width: 80px; height: 80px; object-fit: contain; align-self: center; margin-bottom: 6px; }
        .login-card h1 { font-size: 21px; font-weight: 800; color: #0A1628; text-align: center; }
        .login-card p { font-size: 13px; color: #6b7280; margin: -4px 0 8px; text-align: center; }
        .login-label { font-size: 12.5px; font-weight: 700; color: #374151; }
        .login-pass { position: relative; }
        .login-pass input { width: 100%; padding: 11px 42px 11px 13px; border: 1.5px solid #d1d5db; border-radius: 10px; font-size: 14px; font-family: inherit; color: #0A1628; }
        .login-pass input:focus { outline: none; border-color: #C8973A; box-shadow: 0 0 0 3px rgba(200,151,58,0.15); }
        .login-eye { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border: none; background: none; color: #6b7280; cursor: pointer; border-radius: 8px; }
        .login-eye:hover { background: #f3f4f6; color: #0A1628; }
        .login-submit { margin-top: 6px; padding: 12px; border: none; border-radius: 10px; background: linear-gradient(135deg,#C8973A,#E8B84B); color: #0A1628; font-weight: 800; font-size: 14px; cursor: pointer; font-family: inherit; box-shadow: 0 4px 14px rgba(200,151,58,0.35); }
        .login-submit:disabled { opacity: 0.55; cursor: default; box-shadow: none; }
        .login-back { align-self: center; margin-top: 6px; font-size: 12.5px; color: #6b7280; text-decoration: none; }
        .login-back:hover { color: #0A1628; }
        .login-error { background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; font-size: 13px; padding: 8px 11px; border-radius: 8px; }
      `}</style>
    </div>
  );
}
