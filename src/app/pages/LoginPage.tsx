import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import {
  GraduationCap,
  Award,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  User,
  Lock,
  ArrowRight,
  Heart,
  Brain,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ApiError } from "../lib/api";
import { fetchCurrentUser, loginWithEmail, roleToPortalRole } from "../lib/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("admin");
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
    setSuccess("Sending credentials to the server...");

    try {
      const { user, token } = await loginWithEmail(normalizedEmail, password);
      const portalRole = roleToPortalRole(user.role);

      if (portalRole !== role) setRole(portalRole);

      setSuccess("Login accepted. Loading your profile...");
      await fetchCurrentUser(token);
      setSuccess(`Welcome ${user.firstName}. Redirecting to your dashboard...`);
      navigate("/dashboard");
    } catch (err) {
      const message = err instanceof ApiError
        ? err.message
        : err instanceof TypeError
          ? "Cannot reach the server. Make sure the backend is running on port 5000."
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
    <div className="min-h-screen flex bg-slate-50 overflow-hidden font-sans">
      <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden bg-emerald-950">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/images/classroom_modern.png"
            alt="Students in classroom"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950 via-emerald-900/80 to-transparent" />
        </motion.div>

        <div className="absolute inset-0 z-20 flex flex-col justify-center px-24 space-y-12">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4"
          >
            <div className="bg-amber-400 p-4 rounded-[2rem] shadow-2xl rotate-12">
              <Award className="w-10 h-10 text-emerald-950" />
            </div>
            <div>
              <h1 className="text-5xl font-black text-white tracking-tighter">KIPSIRWO</h1>
              <p className="text-amber-400 font-black tracking-[0.4em] text-xs uppercase leading-none">Center of Excellence</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-6 max-w-xl"
          >
            <h2 className="text-6xl font-black text-white leading-[0.9] tracking-tighter">
              Empowering <br /> <span className="text-emerald-400">Future Leaders.</span>
            </h2>
            <p className="text-xl text-emerald-100/60 font-medium leading-relaxed">
              Access the school management portal with secure, server-backed authentication and live account verification.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 bg-white relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md space-y-10"
        >
          <div className="space-y-4">
            <div className="flex gap-2 mb-2">
              {[1, 2, 3].map((i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500" />)}
            </div>
            <h2 className="text-4xl font-black text-emerald-950 tracking-tighter">Secure Login</h2>
            <p className="text-slate-400 font-medium italic">Welcome back to the portal. Access your school dashboard.</p>
          </div>

          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-0 space-y-6">
              <AnimatePresence mode="wait">
                {error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-rose-50 text-rose-600 p-4 rounded-2xl text-sm font-bold border border-rose-100 flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {error}
                  </motion.div>
                ) : success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl text-sm font-bold border border-emerald-100 flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    {success}
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-emerald-600 transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="admin@school.com"
                      className="h-16 pl-12 bg-slate-50 border-slate-100 rounded-2xl font-bold focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-emerald-600 transition-colors" />
                    <Input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter password"
                      className="h-16 pl-12 bg-slate-50 border-slate-100 rounded-2xl font-bold focus:ring-emerald-500 focus:border-emerald-500 transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Portal Role</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="h-16 px-6 bg-slate-50 border-slate-100 rounded-2xl font-bold text-emerald-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-emerald-50 shadow-2xl">
                      <SelectItem value="admin" className="font-bold py-3">
                        <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Institution Admin</div>
                      </SelectItem>
                      <SelectItem value="teacher" className="font-bold py-3">
                        <div className="flex items-center gap-2"><Brain className="w-4 h-4 text-emerald-600" /> Educator Hub</div>
                      </SelectItem>
                      <SelectItem value="parent" className="font-bold py-3">
                        <div className="flex items-center gap-2"><Heart className="w-4 h-4 text-emerald-600" /> Parent Portal</div>
                      </SelectItem>
                      <SelectItem value="student" className="font-bold py-3">
                        <div className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-emerald-600" /> Learner Center</div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-900 hover:bg-emerald-950 text-white h-20 rounded-[2rem] font-black text-xl shadow-2xl shadow-emerald-900/30 active:scale-[0.98] transition-all group overflow-hidden relative"
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3"
                      >
                        <div className="h-5 w-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
                        Connecting...
                      </motion.div>
                    ) : (
                      <motion.div
                        key="ready"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-3"
                      >
                        Login Dashboard <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </form>

              <div className="pt-4 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span className="hover:text-emerald-700 cursor-pointer transition-colors">Forgot Password?</span>
                <span className="hover:text-emerald-700 cursor-pointer transition-colors">Need Support?</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="absolute bottom-8 text-center text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">
          2026 Kipsirwo Primary - Advanced Information Systems
        </div>
      </div>
    </div>
  );
}
