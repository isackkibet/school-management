import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { GraduationCap, BookOpen, Award, AlertCircle, ShieldCheck, User, Lock, ArrowRight, Sparkles, Heart, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setError("");
    
    setTimeout(() => {
      // Simple authentication logic
      if (role === 'admin') {
        if (username.toLowerCase() === 'admin' && password === 'admin123') {
          localStorage.setItem("userRole", role);
          navigate("/dashboard");
        } else {
          setError("Invalid admin verification. Check credentials.");
        }
      } else if (role === 'student') {
        const validAdmissionNumbers = ['KPS001', 'KPS002', 'KPS003'];
        if (validAdmissionNumbers.includes(username.toUpperCase()) && password === 'student123') {
          localStorage.setItem("userRole", role);
          localStorage.setItem("studentID", username.toUpperCase());
          navigate("/dashboard");
        } else {
          setError("Invalid Admission No. Use KPS001 / student123");
        }
      } else {
        if (username && password) {
          localStorage.setItem("userRole", role);
          navigate("/dashboard");
        } else {
          setError("Authentication required to continue.");
        }
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-hidden font-sans">
      {/* Left Decoration Panel - World Class Branding */}
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
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950 via-emerald-900/80 to-transparent"></div>
        </motion.div>

        {/* Floating Abstract Elements */}
        <div className="absolute inset-0 z-10 pointer-events-none">
           <motion.div animate={{ y: [0, 50, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-[10%] left-[10%] w-32 h-32 bg-amber-400/10 rounded-full blur-3xl" />
           <motion.div animate={{ x: [0, 50, 0] }} transition={{ duration: 15, repeat: Infinity }} className="absolute bottom-[20%] right-[20%] w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]" />
        </div>

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
               Access the most advanced school management portal in the region. Real-time grades, smart attendance, and AI-driven insights — all tailored for your excellence.
            </p>
          </motion.div>

          {/* Mini Stats Card */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="grid grid-cols-3 gap-8 bg-white/5 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10 max-w-lg"
          >
            <div className="text-center space-y-1">
               <div className="text-3xl font-black text-emerald-400">850+</div>
               <div className="text-[10px] font-black uppercase tracking-widest text-white/50">Students</div>
            </div>
            <div className="text-center space-y-1">
               <div className="text-3xl font-black text-amber-400">100%</div>
               <div className="text-[10px] font-black uppercase tracking-widest text-white/50">Transition</div>
            </div>
            <div className="text-center space-y-1">
               <div className="text-3xl font-black text-emerald-400">TSC</div>
               <div className="text-[10px] font-black uppercase tracking-widest text-white/50">Certified</div>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-12 left-24 text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500/50">
           Digital Governance Framework v4.0
        </div>
      </div>

      {/* Right Login Panel - Elegant & Interactive */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 bg-white relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md space-y-10"
        >
          <div className="space-y-4">
             <div className="flex gap-2 mb-2">
                {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500" />)}
             </div>
             <h2 className="text-4xl font-black text-emerald-950 tracking-tighter">Secure Login</h2>
             <p className="text-slate-400 font-medium italic">Welcome back to the portal. Access your school universe.</p>
          </div>

          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-0 space-y-6">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-rose-50 text-rose-600 p-4 rounded-2xl text-sm font-bold border border-rose-100 flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-6">
                <div className="space-y-2">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Identity Access</Label>
                   <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-emerald-600 transition-colors" />
                      <Input 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Admission No or Username" 
                        className="h-16 pl-12 bg-slate-50 border-slate-100 rounded-2xl font-bold focus:ring-emerald-500 focus:border-emerald-500 transition-all" 
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Security Key</Label>
                   <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-emerald-600 transition-colors" />
                      <Input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="••••••••" 
                        className="h-16 pl-12 bg-slate-50 border-slate-100 rounded-2xl font-bold focus:ring-emerald-500 focus:border-emerald-500 transition-all font-mono" 
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Engagement Role</Label>
                   <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="h-16 px-6 bg-slate-50 border-slate-100 rounded-2xl font-bold text-emerald-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-emerald-50 shadow-2xl">
                      <SelectItem value="admin" className="font-bold py-3"><div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Institution Admin</div></SelectItem>
                      <SelectItem value="teacher" className="font-bold py-3"><div className="flex items-center gap-2"><Brain className="w-4 h-4 text-emerald-600" /> Educator Hub</div></SelectItem>
                      <SelectItem value="parent" className="font-bold py-3"><div className="flex items-center gap-2"><Heart className="w-4 h-4 text-emerald-600" /> Parent Portal</div></SelectItem>
                      <SelectItem value="student" className="font-bold py-3"><div className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-emerald-600" /> Learner Center</div></SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleLogin} 
                  disabled={isLoading}
                  className="w-full bg-emerald-900 hover:bg-emerald-950 text-white h-20 rounded-[2rem] font-black text-xl shadow-2xl shadow-emerald-900/30 active:scale-[0.98] transition-all group overflow-hidden relative"
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3"
                      >
                        <div className="h-5 w-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
                        Verifying...
                      </motion.div>
                    ) : (
                      <motion.div 
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
              </div>

              <div className="pt-4 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                 <span className="hover:text-emerald-700 cursor-pointer transition-colors">Forgot Password?</span>
                 <span className="hover:text-emerald-700 cursor-pointer transition-colors">Need Support?</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <div className="absolute bottom-8 text-center text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">
           © 2026 Kipsirwo Primary • Advanced Information Systems
        </div>
      </div>
    </div>
  );
}
