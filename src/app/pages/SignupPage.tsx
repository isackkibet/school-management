import { type FormEvent, type ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AlertCircle, ArrowRight, Brain, CheckCircle2, DollarSign, GraduationCap, Heart, Lock, Mail, Phone, ShieldCheck, User } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ApiError } from "../lib/api";
import { fetchCurrentUser, registerAccount } from "../lib/auth";

const roleOptions = [
  { value: "SUPER_ADMIN", label: "Institution Admin", icon: ShieldCheck },
  { value: "TEACHER", label: "Educator Hub", icon: Brain },
  { value: "ACCOUNTANT", label: "Finance Office", icon: DollarSign },
  { value: "PARENT", label: "Parent Portal", icon: Heart },
  { value: "STUDENT", label: "Learner Center", icon: GraduationCap },
];

export default function SignupPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("STUDENT");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;

    const normalizedEmail = email.trim().toLowerCase();
    if (!firstName.trim() || !lastName.trim() || !normalizedEmail || password.length < 6) {
      setError("Enter first name, last name, a valid email, and a password with at least 6 characters.");
      setSuccess("");
      return;
    }

    setIsLoading(true);
    setError("");
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

      setSuccess("Account created. Loading your profile...");
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
            : "Account could not be created. Please try again.";

      setError(message);
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 grid lg:grid-cols-[0.9fr_1.1fr]">
      <section className="hidden lg:flex relative overflow-hidden bg-emerald-950 p-12 text-white">
        <img src="/images/classroom_modern.png" alt="Students in classroom" className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900/90 to-teal-900/70" />
        <div className="relative z-10 flex max-w-xl flex-col justify-center">
          <div className="mb-8 flex items-center gap-4">
            <div className="rounded-2xl bg-amber-400 p-4 text-emerald-950 shadow-xl">
              <GraduationCap className="h-9 w-9" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight">KIPSIRWO</h1>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-300">School Portal</p>
            </div>
          </div>
          <h2 className="text-5xl font-black leading-none tracking-tight">Create your school account.</h2>
          <p className="mt-6 text-lg font-medium leading-relaxed text-emerald-50/75">
            Every signup is sent to the backend, validated, logged by the server, and connected to the dashboard session.
          </p>
        </div>
      </section>

      <main className="flex items-center justify-center p-5 sm:p-8">
        <div className="w-full max-w-2xl">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-emerald-700">New Account</p>
              <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Sign up</h2>
              <p className="mt-2 font-medium text-slate-500">Create an account and continue into the portal.</p>
            </div>
            <Link to="/login" className="text-sm font-black text-emerald-700 hover:text-emerald-900">
              Already have an account?
            </Link>
          </div>

          <Card className="border-slate-100 shadow-sm">
            <CardContent className="space-y-5 p-5 sm:p-7">
              {error && (
                <div className="flex items-center gap-3 rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm font-bold text-rose-600">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  {error}
                </div>
              )}
              {success && (
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-bold text-emerald-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  {success}
                </div>
              )}

              <form onSubmit={handleSignup} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="First Name" icon={User}>
                    <Input value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="Jane" className="h-12 pl-11 rounded-xl bg-slate-50 font-bold" />
                  </Field>
                  <Field label="Last Name" icon={User}>
                    <Input value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Smith" className="h-12 pl-11 rounded-xl bg-slate-50 font-bold" />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Email" icon={Mail}>
                    <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="jane@school.com" className="h-12 pl-11 rounded-xl bg-slate-50 font-bold" />
                  </Field>
                  <Field label="Password" icon={Lock}>
                    <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Minimum 6 characters" className="h-12 pl-11 rounded-xl bg-slate-50 font-bold" />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone" icon={Phone}>
                    <Input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Optional" className="h-12 pl-11 rounded-xl bg-slate-50 font-bold" />
                  </Field>
                  <div className="space-y-2">
                    <Label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Gender</Label>
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

                <div className="space-y-2">
                  <Label className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Account Role</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="h-12 rounded-xl bg-slate-50 font-bold text-emerald-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="font-bold">
                          <div className="flex items-center gap-2">
                            <option.icon className="h-4 w-4 text-emerald-600" />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" disabled={isLoading} className="h-14 w-full rounded-2xl bg-emerald-900 text-base font-black text-white shadow-lg shadow-emerald-900/20 hover:bg-emerald-950">
                  {isLoading ? (
                    <span className="flex items-center gap-3">
                      <span className="h-5 w-5 rounded-full border-4 border-white border-t-transparent animate-spin" />
                      Creating account...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Create Account
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
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
