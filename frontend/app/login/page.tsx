"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../../lib/auth";
import { useAuth } from "../context/AuthContext";
export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("admin@observability.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await loginUser(email, password);

      if (!result.success || !result.data) {
        setError(result.message || "Login başarısız.");
        return;
      }

      login(result.data?.token as string, result.data?.user as any);

      router.push("/dashboard");
    } catch {
      setError("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0">
        <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute right-[-6rem] top-1/3 h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_35%),linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(2,6,23,1))]" />
      </div>

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-white/8 shadow-[0_30px_80px_rgba(2,6,23,0.55)] backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
        <section className="hidden flex-col justify-between border-r border-white/10 bg-white/6 p-10 lg:flex xl:p-12">
          <div className="space-y-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">
              Live Monitoring
            </div>

            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-300/80">
                Enterprise Observability
              </p>
              <h1 className="max-w-md text-4xl font-semibold leading-tight text-white xl:text-5xl">
                Sistem sağlığını tek ekranda takip et.
              </h1>
              <p className="max-w-lg text-base leading-7 text-slate-300">
                Servis durumu, incident hareketleri ve hata oranlarını anlık
                izlemek için güvenli paneline giriş yap.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Uptime
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">99.98%</p>
              <p className="mt-2 text-sm text-emerald-300">Stable</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Active Alerts
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">12</p>
              <p className="mt-2 text-sm text-cyan-300">Triaged</p>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-8 text-slate-900 sm:px-8 sm:py-10 lg:px-10 xl:px-12 xl:py-12">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">
                  Secure Access
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                  Welcome back
                </h2>
              </div>
              <div className="rounded-2xl bg-slate-950 px-4 py-3 text-right text-white shadow-lg shadow-slate-950/15">
                <p className="text-[11px] uppercase tracking-[0.25em] text-slate-300">
                  Dashboard
                </p>
                <p className="mt-1 text-sm font-medium text-cyan-300">Ready</p>
              </div>
            </div>

            <p className="mb-8 text-sm leading-6 text-slate-500">
              Enterprise Observability Dashboard hesabına giriş yaparak servis
              metriklerini ve operasyonel durumu görüntüleyin.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@company.com"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <span className="text-xs font-medium text-slate-400">
                    Protected session
                  </span>
                </div>
                <input
                  type="password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sifrenizi girin"
                />
              </div>

              {error && (
                <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </button>
            </form>

            <div className="mt-8 grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-slate-900">Demo kullanıcı</p>
                <p className="mt-1">admin@observability.com</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Hızlı erişim</p>
                <p className="mt-1">Varsayılan bilgiler formda hazır.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
