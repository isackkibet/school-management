import { type FormEvent, type ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AlertCircle, ArrowRight, Award, CheckCircle2, GraduationCap, Lock, Mail, Server, UserPlus } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ApiError } from "../lib/api";
import { fetchCurrentUser, loginWithEmail } from "../lib/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@school.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      setError("Enter your email and password to continue.");
      setSuccess("");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("Connecting to the school server...");

    try {
      const { user, token } = await loginWithEmail(normalizedEmail, password);
      setSuccess("Login accepted. Loading your profile...");
      await fetchCurrentUser(token);
      setSuccess(`Welcome ${user.firstName}. Redirecting to your dashboard...`);
      navigate("/dashboard");
    } catch (err) {
      const message = err instanceof ApiError
        ? err.message
        : err instanceof TypeError
          ? "Backend offline. Start the server in backend with npm run dev, then try again."
          : err instanceof Error
            ? err.message
            : "Login failed. Please try again.";

      setError(message);
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 grid lg:grid-cols-[1fr_0.9fr]">
      <section className="hidden lg:flex relative overflow-hidden bg-emerald-950 p-12 text-white">
        <img src="/images/classroom_modern.png" alt="Students in classroom" className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900/90 to-teal-900/70" />
        <div className="relative z-10 flex max-w-xl flex-col justify-center">
          <div className="mb-8 flex items-center gap-4">
            <div className="rounded-2xl bg-amber-400 p-4 text-emerald-950 shadow-xl">
              <Award className="h-9 w-9" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight">KIPSIRWO</h1>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-300">School Portal</p>
            </div>
          </div>
          <h2 className="text-5xl font-black leading-none tracking-tight">Welcome back to your school workspace.</h2>
          <p className="mt-6 text-lg font-medium leading-relaxed text-emerald-50/75">
            Sign in through the backend API and continue into a role-aware dashboard powered by server data.
          </p>
          <div className="mt-8 flex w-fit items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold text-white/80">
            <Server className="h-4 w-4 text-amber-300" />
            API target: http://localhost:5000/api
          </div>
        </div>
      </section>

      <main className="flex items-center justify-center p-5 sm:p-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="mb-7">
            <div className="mb-5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-emerald-700">Authenticated Access</p>
            <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Secure Login</h2>
            <p className="mt-3 font-medium text-slate-500">Enter your account details to load your server-backed dashboard.</p>
          </div>

          <Card className="border-slate-100 shadow-sm">
            <CardContent className="space-y-5 p-5 sm:p-7">
              <AnimatePresence mode="wait">
                {error ? (
                  <motion.div key="error" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm font-bold text-rose-600">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                      <div>
                        <p>{error}</p>
                        <p className="mt-2 text-xs font-semibold text-rose-500/80">Expected server: backend API on port 5000.</p>
                      </div>
                    </div>
                  </motion.div>
                ) : success ? (
                  <motion.div key="success" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-bold text-emerald-700">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    {success}
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <form onSubmit={handleLogin} className="space-y-5">
                <Field label="Email Address" icon={Mail}>
                  <Input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@school.com" className="h-13 pl-11 rounded-xl bg-slate-50 font-bold" />
                </Field>

                <Field label="Password" icon={Lock}>
                  <Input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" className="h-13 pl-11 rounded-xl bg-slate-50 font-bold" />
                </Field>

                <Button type="submit" disabled={isLoading} className="h-14 w-full rounded-2xl bg-emerald-900 text-base font-black text-white shadow-lg shadow-emerald-900/20 hover:bg-emerald-950">
                  {isLoading ? (
                    <span className="flex items-center gap-3">
                      <span className="h-5 w-5 rounded-full border-4 border-white border-t-transparent animate-spin" />
                      Connecting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Login Dashboard
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-black text-slate-800">Need an account?</p>
                    <p className="text-sm font-medium text-slate-500">Create one on the dedicated signup page.</p>
                  </div>
                  <Button asChild variant="outline" className="rounded-xl border-emerald-200 font-black text-emerald-800 hover:bg-emerald-50">
                    <Link to="/signup">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Sign up
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}

function Field({ label, icon: Icon, children }: { label: string; icon: LucideIcon; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</Label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
        {children}
      </div>
    </div>
  );
}

