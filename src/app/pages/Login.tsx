import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { BookOpen, User, Lock, ArrowRight } from "lucide-react";

export default function Login() {
  const [role, setRole] = useState("admin"); 
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      alert("Please select your account type first.");
      return;
    }
    localStorage.setItem("userRole", role);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-slate-50 relative overflow-hidden">
      {/* Interactive Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-green-500/10 blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

      {/* Left Side - Image/Branding */}
      <div className="hidden lg:flex w-1/2 relative bg-green-950 border-r overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop" 
          alt="School building" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-110 ease-linear"
        />
        <div className="relative z-20 flex flex-col justify-end p-12 h-full text-white transform transition-transform duration-700 hover:-translate-y-2">
          <div className="bg-green-600/90 backdrop-blur-md p-4 w-fit rounded-2xl mb-6 shadow-2xl border border-green-400/30 group-hover:bg-green-500 transition-colors duration-500">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-5xl font-extrabold mb-4 leading-tight tracking-tight drop-shadow-lg">
            Kipsirwo Primary<br />
            <span className="text-green-400">School Portal</span>
          </h2>
          <p className="text-xl text-gray-200 max-w-md leading-relaxed font-medium drop-shadow-md">
            Education for Excellence. Empowering tomorrow's leaders through technology and innovation.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative z-10">
        
        <div className="w-full max-w-md bg-white/70 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white transition-all hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Welcome back</h1>
            <p className="text-slate-500 text-lg font-medium">Please enter your details to sign in.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2 group">
              <Label htmlFor="username" className="text-sm font-bold text-slate-700 ml-1 transition-colors group-focus-within:text-green-600">Username</Label>
              <div className="relative transition-transform duration-300 group-hover:-translate-y-0.5">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-green-600 transition-colors" />
                <Input 
                  id="username" 
                  placeholder="Enter your username" 
                  required 
                  className="w-full pl-12 p-4 h-12 border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-xl transition-all duration-300 bg-slate-50/50 hover:bg-white shadow-sm"
                />
              </div>
            </div>
            
            <div className="space-y-2 group">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" className="text-sm font-bold text-slate-700 transition-colors group-focus-within:text-green-600">Password</Label>
                <a href="#" className="text-sm text-green-600 hover:text-green-700 font-bold hover:underline transition-colors">Forgot password?</a>
              </div>
              <div className="relative transition-transform duration-300 group-hover:-translate-y-0.5">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-green-600 transition-colors" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  className="w-full pl-12 p-4 h-12 border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-xl transition-all duration-300 bg-slate-50/50 hover:bg-white shadow-sm"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-bold text-slate-700 ml-1">Account Type</Label>
              <div className="transition-transform duration-300 hover:-translate-y-0.5">
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger className="w-full h-12 border-slate-200 focus:ring-2 focus:ring-green-500 rounded-xl bg-slate-50/50 hover:bg-white transition-all duration-300 text-base font-semibold shadow-sm">
                    <SelectValue placeholder="Choose account type" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl shadow-2xl border-slate-100">
                    <SelectItem value="admin" className="cursor-pointer focus:bg-green-50 py-3 font-bold text-slate-700">Principal / Admin</SelectItem>
                    <SelectItem value="teacher" className="cursor-pointer focus:bg-green-50 py-3 font-bold text-slate-700">Teacher</SelectItem>
                    <SelectItem value="accountant" className="cursor-pointer focus:bg-green-50 py-3 font-bold text-slate-700">Accountant</SelectItem>
                    <SelectItem value="parent" className="cursor-pointer focus:bg-green-50 py-3 font-bold text-slate-700">Parent / Guardian</SelectItem>
                    <SelectItem value="student" className="cursor-pointer focus:bg-green-50 py-3 font-bold text-slate-700">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-14 mt-4 text-lg font-bold bg-green-700 hover:bg-green-800 text-white rounded-xl shadow-lg shadow-green-700/20 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] group"
            >
              Sign In
              <ArrowRight className="w-5 h-5 ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500 font-medium">
              Having trouble logging in? <a href="#" className="text-green-600 font-bold hover:underline ml-1">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
