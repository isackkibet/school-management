import { useState, useEffect } from "react";
import { 
  Menu, X, Search, Calendar, BookOpen, BookMarked, Users, ArrowRight, 
  Mail, User, MessageSquare, Award, Clock, MapPin, Phone, 
  GraduationCap, Star, ShieldCheck, Sparkles, TrendingUp,
  Brain, Heart, Target, Globe, ChevronDown
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Excellence", href: "#excellence" },
    { name: "News", href: "#news" },
    { name: "Admissions", href: "#admissions" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      {/* Dynamic Navigation */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? "bg-white/80 backdrop-blur-2xl py-4 shadow-lg border-b border-emerald-100" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="bg-emerald-900 p-2.5 rounded-2xl shadow-xl shadow-emerald-900/20"
            >
              <Award className="text-amber-400 w-7 h-7" />
            </motion.div>
            <div className="flex flex-col -space-y-1">
              <span className={`text-2xl font-black tracking-tighter ${scrolled ? "text-emerald-950" : "text-white"}`}>
                KIPSIRWO<span className="text-amber-500">PRIMARY</span>
              </span>
              <span className={`text-[10px] font-bold tracking-[0.3em] uppercase ${scrolled ? "text-emerald-700" : "text-emerald-200/60"}`}>
                Center of Excellence
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ y: -2 }}
                className={`text-sm font-bold tracking-wide transition-colors relative group ${
                  scrolled ? "text-slate-600 hover:text-emerald-700" : "text-emerald-50/80 hover:text-white"
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
            <Link to="/login">
              <Button className="bg-amber-500 hover:bg-amber-600 text-emerald-950 font-black px-8 py-6 rounded-2xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all">
                Portal Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white hover:text-emerald-950 font-black px-6 py-6 rounded-2xl">
                Sign Up
              </Button>
            </Link>
          </nav>

          <button className={`lg:hidden p-2 rounded-xl border transition-colors ${
            scrolled ? "border-emerald-100 text-emerald-900" : "border-white/20 text-white"
          }`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[110] bg-emerald-950 text-white lg:hidden flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-16">
              <Award className="w-10 h-10 text-amber-500" />
              <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white/10 rounded-full"><X /></button>
            </div>
            <div className="flex flex-col space-y-8">
              {navItems.map((item) => (
                <a key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-4xl font-black hover:text-amber-400 transition-colors">
                  {item.name}
                </a>
              ))}
            </div>
            <div className="mt-auto">
               <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-amber-500 text-emerald-900 font-black py-8 text-xl rounded-3xl">Portal Login</Button>
               </Link>
               <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="mt-4 w-full border-white/20 text-white hover:bg-white/10 font-black py-8 text-xl rounded-3xl">Create Account</Button>
               </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Hero Section */}
      <section id="home" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <img 
            src="/images/hero_school.png" 
            alt="School Aerial View" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/95 via-emerald-900/60 to-transparent" />
        </motion.div>

        {/* Floating Interactive Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden h-full w-full">
           <motion.div 
             animate={{ 
               y: [0, -40, 0],
               x: [0, 30, 0],
               scale: [1, 1.2, 1]
             }} 
             transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} 
             className="absolute top-[10%] left-[5%] w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full blur-[120px]" 
           />
           <motion.div 
             animate={{ 
               y: [0, 50, 0],
               x: [0, -30, 0],
               scale: [1, 1.1, 1]
             }} 
             transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }} 
             className="absolute bottom-[20%] right-[10%] w-[35rem] h-[35rem] bg-amber-400/10 rounded-full blur-[100px]" 
           />
           <motion.div 
             animate={{ 
               rotate: 360,
               scale: [1, 1.3, 1]
             }} 
             transition={{ duration: 30, repeat: Infinity, ease: "linear" }} 
             className="absolute top-1/2 left-1/3 w-[20rem] h-[20rem] bg-indigo-500/5 rounded-full blur-[80px]" 
           />
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-4xl space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="bg-white/10 backdrop-blur-md border border-white/20 text-amber-400 px-6 py-2.5 rounded-full font-black tracking-[0.2em] text-xs uppercase shadow-2xl">
                ✨ Pioneering Academic Innovation
              </Badge>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-6xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter"
            >
              Inspiring <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200">Greatness.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="max-w-2xl text-xl md:text-2xl text-emerald-50/80 font-medium leading-relaxed"
            >
              Kipsirwo Primary School is a world-class educational sanctuary where discipline meets discovery, and every child is a future leader.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 pt-6"
            >
               <Button className="bg-amber-500 hover:bg-amber-600 text-emerald-950 font-black h-20 px-12 rounded-3xl text-xl shadow-2xl shadow-amber-500/30 group">
                Apply for 2026 <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform h-6 w-6" />
              </Button>
              <Link to="/signup">
                <Button className="bg-white text-emerald-950 hover:bg-emerald-50 h-20 px-12 rounded-3xl text-xl font-black">
                  Create Portal Account
                </Button>
              </Link>
              <Button variant="outline" className="h-20 px-12 rounded-3xl text-xl font-black border-2 border-white/30 text-white hover:bg-white hover:text-emerald-950 backdrop-blur-sm transition-all duration-300">
                Explore Curriculum
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-[10px] uppercase font-black tracking-widest">Scroll Down</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* Smart Stats Section */}
      <div className="relative z-20 pb-20 -mt-20">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white/95 backdrop-blur-3xl border border-white p-12 rounded-[3rem] shadow-[0_50px_100px_-15px_rgba(6,78,59,0.15)] grid grid-cols-2 lg:grid-cols-4 gap-12"
          >
            {[
              { label: "Active Students", value: "850+", color: "text-emerald-700", sub: "Growing community" },
              { label: "KPSEA Success", value: "100%", color: "text-amber-500", sub: "Consistent results" },
              { label: "Qualified Staff", value: "34+", color: "text-emerald-700", sub: "TSC Certified" },
              { label: "Sports Titles", value: "12", color: "text-amber-500", sub: "Annual champions" }
            ].map((stat, i) => (
              <div key={stat.label} className="text-center space-y-2 group">
                <div className={`text-5xl font-black ${stat.color} group-hover:scale-110 transition-transform duration-500 font-mono`}>{stat.value}</div>
                <div className="text-xs uppercase font-black text-slate-400 tracking-widest">{stat.label}</div>
                <div className="text-[10px] font-bold text-slate-300 italic">{stat.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Academic Excellence Section */}
      <section id="excellence" className="py-32 bg-white relative overflow-hidden">
         <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
               initial={{ x: -100, opacity: 0 }}
               whileInView={{ x: 0, opacity: 1 }}
               viewport={{ once: true }}
               className="space-y-8"
            >
               <Badge className="bg-emerald-100 text-emerald-800 border-none px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-widest">Educational Standards</Badge>
               <h2 className="text-5xl md:text-7xl font-black text-emerald-950 leading-[1.1] tracking-tighter">
                  Where Potential Meets <span className="text-amber-500">Excellence.</span>
               </h2>
               <p className="text-xl text-slate-500 leading-relaxed font-medium">
                  Our curriculum is designed to challenge, inspire, and prepare students for the demands of a globalized future through rigorous academic standards and holistic development.
               </p>
               <div className="grid sm:grid-cols-2 gap-6 pt-4">
                  {[
                    { title: "CBC Integrated", icon: Brain, desc: "Modern competency-based approach." },
                    { title: "Digital Literacy", icon: Sparkles, desc: "Tech-forward learning labs." },
                    { title: "Value Based", icon: ShieldCheck, desc: "Character and leadership training." },
                    { title: "Global Vision", icon: Globe, desc: "Connecting students to the world." }
                  ].map(item => (
                    <div key={item.title} className="flex gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-emerald-200 hover:bg-white hover:shadow-xl transition-all group">
                       <item.icon className="w-8 h-8 text-emerald-600 group-hover:scale-110 transition-transform" />
                       <div>
                          <h4 className="font-black text-slate-800 uppercase tracking-tighter text-sm">{item.title}</h4>
                          <p className="text-xs text-slate-400 font-bold mt-1">{item.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </motion.div>
            <motion.div 
               initial={{ x: 100, opacity: 0 }}
               whileInView={{ x: 0, opacity: 1 }}
               viewport={{ once: true }}
               className="relative"
            >
               <div className="absolute -inset-10 bg-emerald-100 rounded-[5rem] blur-3xl opacity-30 -rotate-6" />
               <img 
                  src="/images/classroom_modern.png" 
                  alt="Modern Classroom" 
                  className="relative z-10 w-full rounded-[4rem] shadow-4xl border-white border-[16px] object-cover aspect-[4/5]"
               />
               <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[3rem] shadow-2xl z-20 border border-slate-50 max-w-[280px]">
                  <div className="flex items-center gap-4 mb-4">
                     <div className="flex -space-x-4">
                        {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white" />)}
                     </div>
                     <span className="text-xs font-black text-slate-400">+50 more</span>
                  </div>
                  <p className="text-sm font-bold text-slate-700 leading-tight">Join <span className="text-emerald-600">800+</span> parents who reached excellence with us.</p>
               </div>
            </motion.div>
         </div>
      </section>

      {/* Interactive Feature Cards */}
      <section id="news" className="py-32 bg-emerald-950 text-white relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center space-y-6 mb-24">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Stay <span className="text-amber-500">Integrated.</span></h2>
            <p className="text-emerald-100/60 max-w-2xl mx-auto text-xl font-medium uppercase tracking-widest text-xs">Latest News & Strategic Updates</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                tag: "Sports", 
                date: "Apr 28, 2026",
                title: "Annual Athletics Mastery", 
                desc: "Our champions secured the first position in the Nandi County Inter-School Games with a record-breaking performance.",
                icon: Award,
                img: "/images/athletics_group.jpeg"
              },
              { 
                tag: "Academic", 
                date: "May 02, 2026",
                title: "Excellence in Action", 
                desc: "Celebrating our top performers who have demonstrated outstanding discipline and academic growth this term.",
                icon: BookOpen,
                img: "/images/athletics_podium.jpeg"
              },
              { 
                tag: "Community", 
                date: "Jun 15, 2026",
                title: "Regional Sports Day", 
                desc: "Witness the spirit of competition and teamwork at our upcoming regional sports event held at the school grounds.",
                icon: Users,
                img: "/images/athletics_other.jpeg"
              }
            ].map((news, i) => (
              <motion.div 
                key={news.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative bg-white/5 rounded-[3rem] border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-500"
              >
                <div className="h-72 overflow-hidden relative">
                   <img src={news.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" alt={news.title} />
                   <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <Badge className="bg-amber-500 text-emerald-950 font-black border-none px-4 py-1.5 rounded-xl uppercase tracking-widest text-[10px]">{news.tag}</Badge>
                      <Badge className="bg-white/20 backdrop-blur-md text-white font-bold border-none px-4 py-1.5 rounded-xl text-[10px]">{news.date}</Badge>
                   </div>
                </div>
                <div className="p-10 space-y-6">
                   <h3 className="text-3xl font-black leading-tight group-hover:text-amber-400 transition-colors">{news.title}</h3>
                   <p className="text-emerald-100/70 font-medium leading-relaxed">{news.desc}</p>
                   <Button variant="link" className="p-0 text-amber-500 font-black uppercase tracking-widest text-xs h-auto group-hover:gap-4 transition-all">
                      Read Full Article <ArrowRight className="ml-2 w-4 h-4" />
                   </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Headteacher Profile */}
      <section className="py-32 bg-slate-50 relative">
         <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-24">
               <motion.div 
                  initial={{ rotate: -5, opacity: 0 }}
                  whileInView={{ rotate: 0, opacity: 1 }}
                  whileHover={{ rotate: 3, scale: 1.02 }}
                  className="lg:w-1/3 relative"
               >
                  <div className="absolute inset-x-8 -bottom-12 h-24 bg-emerald-900/50 rounded-[4rem] blur-3xl -z-10" />
                  <div className="relative aspect-[3/4] rounded-[4rem] overflow-hidden border-[12px] border-white shadow-3xl bg-slate-200">
                     <img src="/images/headteacher_portrait_1775937434285.png" alt="Headteacher" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-8 -right-8 bg-amber-500 p-8 rounded-3xl shadow-2xl rotate-6 group cursor-default">
                     <Heart className="w-10 h-10 text-emerald-950 mb-3 animate-pulse" />
                     <p className="font-black text-emerald-950 uppercase tracking-tighter text-sm leading-tight">Led with Passion <br /> Since 2012</p>
                  </div>
               </motion.div>
               <div className="lg:w-2/3 space-y-10">
                  <div className="space-y-4">
                     <Badge className="bg-amber-100 text-amber-700 font-extrabold px-4 py-1.5 rounded-xl text-[10px] uppercase tracking-[0.2em] shadow-sm">Leadership Message</Badge>
                     <h2 className="text-5xl md:text-7xl font-black text-emerald-950 leading-tight tracking-tighter">Wisdom from our <span className="text-amber-500">Visionary.</span></h2>
                  </div>
                  <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-white space-y-8 relative">
                     <span className="text-9xl font-serif text-slate-100 absolute top-4 left-6 pointer-events-none">"</span>
                     <p className="text-2xl text-slate-600 leading-relaxed font-medium italic relative z-10">
                        "At Kipsirwo, we don't just teach students how to count; we teach them what counts. Our focus remains on the triad of Discipline, academic Excellence, and spiritual Integrity."
                     </p>
                     <div className="flex items-center gap-6 border-t border-slate-50 pt-8">
                        <div>
                           <h5 className="text-2xl font-black text-emerald-900">Mr. Jonathan Kipruto</h5>
                           <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Headteacher & Chief Strategist</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Modern Contact & Admissions CTA */}
      <section id="admissions" className="py-40 bg-white relative">
         <div className="container mx-auto px-6">
            <div className="bg-emerald-900 rounded-[5rem] p-16 lg:p-24 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(6,78,59,0.4)]">
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
               <div className="relative z-10 flex flex-col lg:flex-row gap-20 items-center text-center lg:text-left">
                  <div className="lg:w-1/2 space-y-8">
                     <h2 className="text-5xl lg:text-7xl font-black text-white leading-tight">Secure their <br /> <span className="text-amber-400">Future Today.</span></h2>
                     <p className="text-xl text-emerald-50 max-w-lg font-medium opacity-80">Join our next intake. Applications for the 2026 Academic Year are now being processed with priority indexing.</p>
                     <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                        <Button className="bg-amber-500 hover:bg-amber-600 text-emerald-950 font-black h-20 px-12 rounded-3xl text-xl shadow-2xl active:scale-95 transition-all">Start Application</Button>
                         <Button 
                           variant="outline" 
                           className="h-20 px-12 rounded-3xl text-xl font-black border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                           onClick={() => {
                             const link = document.createElement('a');
                             link.href = '/school_fees_2026.txt';
                             link.download = 'Kipsirwo_Primary_Fees_2026.txt';
                             link.click();
                           }}
                         >
                           Download Fee Structure
                         </Button>
                     </div>
                  </div>
                  <div className="lg:w-1/2 w-full max-w-md">
                     <Card className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[4rem] space-y-6">
                        <div className="text-center space-y-2 mb-4">
                           <h4 className="text-2xl font-black text-white">Direct Inquiry</h4>
                           <p className="text-xs text-emerald-200 uppercase font-black tracking-widest">Instant response system</p>
                        </div>
                        <Input className="bg-white/5 border-white/10 h-16 rounded-2xl text-white placeholder:text-emerald-100/30 font-bold" placeholder="Parent Name" />
                        <Input className="bg-white/5 border-white/10 h-16 rounded-2xl text-white placeholder:text-emerald-100/30 font-bold" placeholder="Mobile Number" />
                        <Button className="w-full bg-white text-emerald-900 font-black h-16 rounded-2xl hover:bg-emerald-50 transition-colors uppercase tracking-widest text-xs">Request Callback</Button>
                     </Card>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* School Contact Footer */}
      <footer id="contact" className="bg-slate-950 text-white py-32 border-t-8 border-amber-500 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-900/20 rounded-full blur-[150px] pointer-events-none translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-4 gap-20 mb-20 text-center lg:text-left">
            <div className="lg:col-span-1 space-y-8">
               <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <Award className="text-amber-500 w-10 h-10" />
                  <span className="text-3xl font-black tracking-tighter">KIPSIRWO<span className="text-amber-500">PRIMARY</span></span>
               </div>
               <p className="text-slate-400 font-medium leading-relaxed">Dedicated to a standard of excellence that prepares every learner for the opportunities and challenges of tomorrow.</p>
               <div className="flex justify-center lg:justify-start gap-4">
                  {[Globe, Users, Heart, Target].map((Icon, i) => (
                    <motion.div whileHover={{ scale: 1.2, rotate: 15 }} key={i} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-emerald-600 transition-colors">
                       <Icon className="w-6 h-6" />
                    </motion.div>
                  ))}
               </div>
            </div>
            <div>
               <h4 className="text-lg font-black uppercase tracking-widest mb-10 text-amber-500">Quick Portal</h4>
               <ul className="space-y-5 text-slate-400 font-bold">
                  {["Student Login", "Teacher Dashboard", "Parent Access", "Admin Control", "Fee Payments"].map(item => (
                    <li key={item} className="hover:text-white transition-colors cursor-pointer flex items-center justify-center lg:justify-start gap-2">
                       <ArrowRight className="w-3 h-3 text-emerald-600" /> {item}
                    </li>
                  ))}
               </ul>
            </div>
            <div>
               <h4 className="text-lg font-black uppercase tracking-widest mb-10 text-amber-500">The School</h4>
               <ul className="space-y-5 text-slate-400 font-bold">
                  <li className="hover:text-white transition-colors cursor-pointer flex items-center justify-center lg:justify-start gap-2">
                    <a href="/school_calendar_2026.txt" download="Kipsirwo_Calendar_2026.txt" className="flex items-center gap-2">
                      <ArrowRight className="w-3 h-3 text-emerald-600" /> Academic Calendar
                    </a>
                  </li>
                  {["Our History", "Curriculum Guide", "Sports & Arts", "School Bus Routes"].map(item => (
                    <li key={item} className="hover:text-white transition-colors cursor-pointer flex items-center justify-center lg:justify-start gap-2">
                       <ArrowRight className="w-3 h-3 text-emerald-600" /> {item}
                    </li>
                  ))}
               </ul>
            </div>
            <div className="space-y-8">
               <h4 className="text-lg font-black uppercase tracking-widest mb-10 text-amber-500">The Office</h4>
               <div className="space-y-6">
                  <div className="flex items-center justify-center lg:justify-start gap-4 group">
                     <Phone className="w-6 h-6 text-emerald-600 group-hover:rotate-12 transition-transform" />
                     <span className="text-xl font-bold">0759008293</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-4 group">
                     <Mail className="w-6 h-6 text-emerald-600 group-hover:-translate-y-1 transition-transform" />
                     <span className="text-lg font-bold">info@kipsirwo.ac.ke</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-4 group">
                     <MapPin className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" />
                     <span className="text-sm font-bold opacity-70">Nandi, Kenya</span>
                  </div>
               </div>
            </div>
          </div>
          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-xs font-black uppercase tracking-[0.3em] text-slate-600">
             <p>© 2026 Kipsirwo Primary Center of Excellence.</p>
             <div className="flex gap-10">
                <span className="cursor-pointer hover:text-white transition-colors">Digital Governance</span>
                <span className="cursor-pointer hover:text-white transition-colors">Ethics Policy</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
