import { type FormEvent, type ReactNode, useState } from "react";
import { useNavigate } from "react-router";
import { AlertCircle, ArrowRight, Award, Brain, CheckCircle2, GraduationCap, Heart, Lock, Mail, Phone, ShieldCheck, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ApiError } from "../lib/api";
import { fetchCurrentUser, loginWithEmail, registerAccount, roleToPortalRole } from "../lib/auth";
import { type LucideIcon } from "lucide-react";

const roleOptions = [
  { value: "SUPER_ADMIN", portalRole: "admin", label: "Institution Admin", icon: ShieldCheck },
  { value: "TEACHER", portalRole: "teacher", label: "Educator Hub", icon: Brain },
  { value: "PARENT", portalRole: "parent", label: "Parent Portal", icon: Heart },
  { value: "STUDENT", portalRole: "student", label: "Learner Center", icon: GraduationCap },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [role, setRole] = useState("SUPER_ADMIN");
  const [email, setEmail] = useState("admin@school.com");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetFeedback = () => {
    setError("");
    setSuccess("");
  };

  const finishAuth = async (user: { role: string; firstName: string }, token: string, message: string) => {
    setSuccess(message);
    await fetchCurrentUser(token);
    setSuccess(`Welcome ${user.firstName}. Redirecting to your dashboard...`);
    navigate("/dashboard");
  };

  const getErrorMessage = (err: unknown, fallback: string) => {
    if (err instanceof ApiError) return err.message;
    if (err instanceof TypeError) return "Cannot reach the server. Make sure the backend is running on port 5000.";
    if (err instanceof Error) return err.message;
    return fallback;
  };

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
    resetFeedback();
    setSuccess("Sending credentials to the server...");

    try {
      const { user, token } = await loginWithEmail(normalizedEmail, password);
      setRole(roleOptions.find((option) => option.portalRole === roleToPortalRole(user.role))?.value || user.role);
      await finishAuth(user, token, "Login accepted. Loading your profile...");
    } catch (err) {
      setError(getErrorMessage(err, "Login failed. Please try again."));
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;

    const normalizedEmail = email.trim().toLowerCase();
    if (!firstName.trim() || !lastName.trim() || !normalizedEmail || password.length < 6) {
      setError("Enter first name, last name, a valid email, and a password with at least 6 characters.");
      setSuccess("");
      return;
    }

    setIsLoading(true);
    resetFeedback();
    setSuccess("Creating your account on the server...");

    try {
      const { user, token } = await registerAccount({
        email: normalizedEmail,
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        role,
        phone: phone.trim(),
        gender,
      });
      await finishAuth(user, token, "Account created. Loading your dashboard...");
    } catch (err) {
      setError(getErrorMessage(err, "Account could not be created. Please try again."));
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  const activeRole = roleOptions.find((option) => option.value === role) || roleOptions[0];

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-hidden font-sans">
      <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden bg-emerald-950">
        <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0 z-0">
          <img src="/images/classroom_modern.png" alt="Students in classroom" className="w-full h-full object-cover opacity-40 mix-blend-overlay scale-110" />
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950 via-emerald-900/80 to-transparent" />
        </motion.div>

        <div className="absolute inset-0 z-20 flex flex-col justify-center px-24 space-y-12">
          <div className="flex items-center gap-4">
            <div className="bg-amber-400 p-4 rounded-2xl shadow-2xl rotate-12">
              <Award className="w-10 h-10 text-emerald-950" />
            </div>
            <div>
              <h1 className="text-5xl font-black text-white tracking-tighter">KIPSIRWO</h1>
              <p className="text-amber-400 font-black tracking-[0.4em] text-xs uppercase leading-none">Center of Excellence</p>
            </div>
          </div>

          <div className="space-y-6 max-w-xl">
            <h2 className="text-6xl font-black text-white leading-[0.9] tracking-tighter">
              Secure <br /> <span className="text-emerald-400">School Access.</span>
            </h2>
            <p className="text-xl text-emerald-100/70 font-medium leading-relaxed">
              Sign in or create an account through the backend API, with live feedback for every request.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-2/5 flex items-center justify-center p-6 sm:p-8 bg-white relative overflow-y-auto">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md space-y-8 py-8">
          <div className="space-y-4">
            <div className="inline-flex rounded-2xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  resetFeedback();
                }}
                className={`rounded-xl px-4 py-2 text-sm font-black transition ${mode === "login" ? "bg-white text-emerald-900 shadow-sm" : "text-slate-500"}`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  resetFeedback();
                }}
                className={`rounded-xl px-4 py-2 text-sm font-black transition ${mode === "register" ? "bg-white text-emerald-900 shadow-sm" : "text-slate-500"}`}
              >
                Create Account
              </button>
            </div>
            <h2 className="text-4xl font-black text-emerald-950 tracking-tighter">
              {mode === "login" ? "Secure Login" : "Create Account"}
            </h2>
            <p className="text-slate-400 font-medium">
              {mode === "login" ? "Access your live school dashboard." : "Create a server-backed account and continue into the portal."}
            </p>
          </div>

          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-0 space-y-5">
              <AnimatePresence mode="wait">
                {error ? (
                  <motion.div key="error" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="bg-rose-50 text-rose-600 p-4 rounded-2xl text-sm font-bold border border-rose-100 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {error}
                  </motion.div>
                ) : success ? (
                  <motion.div key="success" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl text-sm font-bold border border-emerald-100 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    {success}
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <form onSubmit={mode === "login" ? handleLogin : handleRegister} className="space-y-5">
                {mode === "register" && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="First Name" icon={User}>
                      <Input value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="System" className="h-12 pl-11 rounded-xl bg-slate-50 font-bold" />
                    </Field>
                    <Field label="Last Name" icon={User}>
                      <Input value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Admin" className="h-12 pl-11 rounded-xl bg-slate-50 font-bold" />
                    </Field>
                  </div>
                )}

                <Field label="Email Address" icon={Mail}>
                  <Input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@school.com" className="h-14 pl-11 rounded-xl bg-slate-50 font-bold" />
                </Field>

                <Field label="Password" icon={Lock}>
                  <Input id="password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Minimum 6 characters" className="h-14 pl-11 rounded-xl bg-slate-50 font-bold font-mono" />
                </Field>

                {mode === "register" && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Phone" icon={Phone}>
                      <Input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Optional" className="h-12 pl-11 rounded-xl bg-slate-50 font-bold" />
                    </Field>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Gender</Label>
                      <Select value={gender || ""} onValueChange={(value) => setGender(value || null)}>
                        <SelectTrigger className="h-12 rounded-xl bg-slate-50 font-bold">
                          <SelectValue placeholder="Optional" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MALE">Male</SelectItem>
                          <SelectItem value="FEMALE">Female</SelectItem>
                          <SelectItem value="OTHER">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Portal Role</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="h-14 px-5 bg-slate-50 border-slate-100 rounded-xl font-bold text-emerald-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-emerald-50 shadow-2xl">
                      {roleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="font-bold py-3">
                          <div className="flex items-center gap-2">
                            <option.icon className="w-4 h-4 text-emerald-600" />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs font-semibold text-slate-400">Selected role: {activeRole.label}</p>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full bg-emerald-900 hover:bg-emerald-950 text-white h-16 rounded-2xl font-black text-lg shadow-xl shadow-emerald-900/20 active:scale-[0.98] transition-all group">
                  {isLoading ? (
                    <span className="flex items-center gap-3">
                      <span className="h-5 w-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
                      {mode === "login" ? "Connecting..." : "Creating..."}
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                      {mode === "login" ? "Login Dashboard" : "Create Account"}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function Field({ label, icon: Icon, children }: { label: string; icon: LucideIcon; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</Label>
      <div className="relative group">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-600 transition-colors" />
        {children}
      </div>
    </div>
  );
}
