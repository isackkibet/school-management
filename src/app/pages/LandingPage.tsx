import React, { useState } from "react";
import { 
  Menu, 
  X, 
  Search, 
  Calendar, 
  BookOpen, 
  Users, 
  ArrowRight, 
  Mail, 
  User, 
  MessageSquare, 
  Award,
  Clock,
  MapPin,
  Phone,
  GraduationCap
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 text-slate-900 font-sans selection:bg-amber-500 selection:text-white">
      {/* Header & Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-green-800 p-2 rounded-lg">
              <Award className="text-amber-500 w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-green-900">
              KIPSIRWO<span className="text-amber-500">PRIMARY</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {["Home", "News", "Grades", "Admissions", "Open Day", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-semibold hover:text-amber-600 transition-colors"
              >
                {item}
              </a>
            ))}
            <Link to="/login">
              <Button variant="outline" className="border-green-800 text-green-800 hover:bg-green-50 font-bold">
                Staff Portal
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-green-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 animate-in slide-in-from-top duration-300">
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {["Home", "News", "Grades", "Admissions", "Open Day", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-lg font-medium py-2 text-green-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-green-800 hover:bg-green-900 mt-4 h-12 text-lg text-white">Staff Portal</Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center min-h-[80vh]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero_kenyan_students_1775937217321.png" 
            alt="Students background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-950/95 via-green-900/85 to-green-900/40 mix-blend-multiply md:mix-blend-normal" />
        </div>

        <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-green-950 hover:from-amber-500 hover:to-amber-600 px-5 py-2 rounded-full border-none font-bold shadow-lg tracking-wide uppercase text-xs">
              Admissions Open for May 2026
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white drop-shadow-md">
              A Foundation for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Excellence</span> and Discipline.
            </h1>
            <p className="text-lg text-green-50 max-w-lg leading-relaxed font-medium drop-shadow-sm">
              Welcome to Kipsirwo Primary School. We offer a conducive learning environment to ensure our students excel in academics and co-curricular activities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#admissions">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 border-none text-green-950 font-bold h-14 px-8 rounded-xl text-lg group shadow-xl shadow-amber-500/20">
                  Apply Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#grades">
                <Button variant="outline" className="h-14 px-8 rounded-xl w-full sm:w-auto text-lg border-2 font-bold border-white/20 text-white hover:text-green-900 hover:bg-white bg-white/10 backdrop-blur-md transition-colors">
                  View Grades
                </Button>
              </a>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-500/20 rounded-full blur-3xl" />
            <img 
              src="/images/cbc_classroom_1775937350004.png" 
              alt="Kipsirwo Primary Students learning" 
              className="rounded-3xl shadow-2xl relative z-10 w-full object-cover aspect-[4/3] border-4 border-white/80"
            />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative z-20 pb-12 -mt-10 lg:-mt-16">
        <div className="container mx-auto px-4">
          <div className="bg-white/90 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl shadow-green-900/10 p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-black text-green-800">500+</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Students</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-amber-500">25+</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Expert Teachers</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-green-800">JSS</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Approved Center</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-amber-500">100%</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">KPSEA Transition</div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Excellence & Grades Section */}
      <section id="grades" className="py-20 bg-green-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200 px-4 py-1 rounded-full border-none shadow-sm uppercase font-bold tracking-widest text-xs">Academic Performance</Badge>
            <h2 className="text-3xl md:text-5xl font-extrabold text-green-900">Excellence in <span className="text-amber-500">Grades</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">We pride ourselves in consistent top-tier academic performances in national examinations and continuous assessment tests.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-xl bg-gradient-to-br from-green-800 to-green-950 text-white rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300">
              <CardHeader className="border-b border-white/10 pb-4">
                <CardTitle className="flex justify-between items-center text-2xl font-black">
                  <span>KPSEA 2025</span>
                  <Award className="text-amber-400 w-8 h-8 drop-shadow-md" />
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between items-end border-b border-white/10 pb-3">
                  <span className="text-green-100 font-medium">Exceeding Expectations</span>
                  <span className="text-4xl font-black text-amber-400">84%</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-3">
                  <span className="text-green-100 font-medium">Meeting Expectations</span>
                  <span className="text-3xl font-bold">16%</span>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-green-200">Ranked #1 in the sub-county for two consecutive years!</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-white rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300">
              <CardHeader className="bg-amber-50 border-b border-amber-100 pb-4 text-amber-900">
                <CardTitle className="flex justify-between items-center text-xl font-bold">
                  <span>Term 3 Top Classes</span>
                  <GraduationCap className="text-amber-600 w-6 h-6" />
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-black text-xl group-hover:scale-110 group-hover:bg-green-700 group-hover:text-white transition-all">8A</div>
                    <div>
                      <div className="font-bold text-slate-800 text-lg">Standard 8 Alpha</div>
                      <div className="text-sm font-medium text-slate-500">Mean Score: <span className="text-amber-600 font-bold">395 Marks</span></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-black text-xl group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all">7B</div>
                    <div>
                      <div className="font-bold text-slate-800 text-lg">Standard 7 Beta</div>
                      <div className="text-sm font-medium text-slate-500">Mean Score: <span className="text-amber-600 font-bold">382 Marks</span></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-white rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 md:col-span-2 lg:col-span-1">
              <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                <CardTitle className="text-xl font-bold text-slate-800">Recent Grading News</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-5">
                <div className="space-y-1.5 hover:bg-slate-50 p-2 rounded-lg transition-colors">
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 mb-1">Just In</Badge>
                  <p className="font-bold text-slate-800">Term 1 Opening CAT Results released!</p>
                  <p className="text-sm text-slate-500">Parents can log into the portal to check student marks.</p>
                </div>
                <div className="h-px bg-slate-100 w-full" />
                <div className="space-y-1.5 hover:bg-slate-50 p-2 rounded-lg transition-colors">
                  <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 mb-1">Award</Badge>
                  <p className="font-bold text-slate-800">Science Fair Winners</p>
                  <p className="text-sm text-slate-500">Grade 6 students scored maximum points at the regional science fair.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section id="news" className="py-20 relative bg-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-extrabold text-green-900">News & Events</h2>
              <div className="h-2 w-24 bg-amber-500 rounded-full" />
            </div>
            <Button variant="ghost" className="text-green-800 font-bold hover:text-green-900 hover:bg-green-50 group">
              View All News <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group hover:-translate-y-1">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src="/images/cbc_classroom_1775937350004.png" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="CBC Curriculum in session"
                />
                <Badge className="absolute top-4 left-4 bg-green-800 hover:bg-green-900 text-white shadow-lg border-none">CBC Curriculum</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold group-hover:text-amber-600 transition-colors">
                  Competency Based Curriculum & JSS
                </CardTitle>
                <div className="flex items-center text-slate-500 font-semibold text-sm gap-2 mt-2">
                  <BookOpen className="w-4 h-4 text-green-600" /> PP1 - Grade 9
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 line-clamp-3">
                  We have fully embraced the CBC curriculum from PP1 to Junior Secondary School (JSS). We ensure our students pass their KPSEA assessments with flying colors.
                </p>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group hover:-translate-y-1">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src="/images/school_sports_1775937447876.png" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Students playing sports"
                />
                <Badge className="absolute top-4 left-4 bg-amber-500 hover:bg-amber-600 text-green-950 font-black shadow-lg border-none">Co-curricular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold group-hover:text-amber-600 transition-colors">
                  Co-curricular Activities & Talents
                </CardTitle>
                <div className="flex items-center text-slate-500 font-semibold text-sm gap-2 mt-2">
                  <Award className="w-4 h-4 text-amber-500" /> Regional Champions
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 line-clamp-3">
                  Students are encouraged to participate in co-curricular activities including football, athletics, and drama to build their talents outside the classroom.
                </p>
              </CardContent>
            </Card>

            {/* Card 3 - OPEN DAY WITH DEPUTY */}
            <Card id="open-day" className="border-4 border-amber-500/20 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group hover:-translate-y-1 relative">
              {/* Highlight badge specifically for Open day */}
              <div className="absolute top-0 right-0 z-20 w-32 h-32 overflow-hidden pointer-events-none">
                 <div className="absolute top-6 -right-8 w-40 bg-red-600 text-white font-bold text-center py-1 rotate-45 shadow-lg shadow-red-600/30 text-xs tracking-wider uppercase">Don't Miss</div>
              </div>
              <div className="h-80 overflow-hidden relative bg-green-50">
                <img 
                  src="/deputy.jpg" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  alt="Deputy Headteacher at Open Day"
                />
                <Badge className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-600/40 border-none font-bold animate-pulse text-sm px-3 py-1">Open Day Event!</Badge>
                
                {/* Information Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 pt-16">
                  <div className="text-amber-400 font-bold text-lg leading-tight mb-1">Meet Mr. Isack Kibet</div>
                  <p className="text-white/80 font-medium text-sm">Deputy Headteacher</p>
                </div>
              </div>
              <CardHeader className="bg-slate-50">
                <CardTitle className="text-xl font-bold group-hover:text-amber-600 transition-colors">
                  Annual School Open Day
                </CardTitle>
                <div className="flex items-center text-slate-500 font-bold text-sm gap-2 mt-2">
                  <MapPin className="w-4 h-4 text-green-600" /> Main Assembly Ground
                </div>
              </CardHeader>
              <CardContent className="bg-slate-50">
                <p className="text-slate-600">
                  Parents are warmly invited to visit the school during Open Day to interact with the Deputy Headteacher, check on student grades, and consult with teachers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Headteacher's Welcome */}
      <section className="py-24 bg-green-50/50 border-y border-green-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/3 relative">
              <div className="absolute -inset-4 bg-amber-500/10 rounded-full -z-10 blur-2xl" />
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-100">
                <img 
                  src="/images/headteacher_portrait_1775937434285.png" 
                  alt="Headteacher" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-6 -right-6 bg-green-800 text-white p-6 rounded-2xl shadow-xl border border-green-700/50">
                <div className="text-xl font-bold italic">"Hard work pays"</div>
              </div>
            </div>
            <div className="md:w-2/3 space-y-8">
              <div className="space-y-4">
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 px-4 py-1 rounded-full border-none font-bold tracking-widest text-xs uppercase shadow-sm">Administration</Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-green-900 leading-tight">Message from the <br /> <span className="text-amber-500">Headteacher</span></h2>
                <div className="h-2 w-24 bg-amber-500 rounded-full" />
              </div>
              <div className="space-y-6 text-lg text-slate-700 leading-relaxed font-medium">
                <p>
                  It is a great privilege to welcome you to Kipsirwo Primary School. Our main objective is to provide a solid foundation for our learners through discipline, hard work, and good moral values. We work closely with our Deputy Headteacher, Mr. Isack Kibet, and parents to monitor student progress.
                </p>
                <p>
                  We are fully committed to implementing the Competency-Based Curriculum (CBC) to ensure our students get the best practical skills. Feel free to visit the school or contact the administration for any inquiries regarding admissions.
                </p>
                <div className="pt-4">
                  <div className="text-2xl font-black text-green-900 leading-none">Mr. Jonathan Kipruto</div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-2">Headteacher, Kipsirwo Primary</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admissions Callout */}
      <section id="admissions" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-green-800 to-green-950 rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/20 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
            
            <div className="md:w-3/5 space-y-6 relative z-10 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Quality Education <br />
                <span className="text-amber-400">For Your Child.</span>
              </h2>
              <p className="text-green-100 text-lg md:text-xl font-medium max-w-xl">
                We are currently admitting students for the upcoming term. Secure a spot for your child and join our community of academic excellence.
              </p>
              <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-green-950 h-14 px-8 rounded-xl font-bold shadow-lg shadow-amber-500/20 text-lg">
                  Apply for Admission
                </Button>
                <div className="flex items-center text-amber-200 font-medium bg-green-900/50 px-4 py-2 rounded-xl border border-green-700/50 backdrop-blur-sm">
                  <Clock className="mr-2 w-5 h-5 text-amber-400" />
                  <span>Term 1 Deadline: May 12, 2026</span>
                </div>
              </div>
            </div>
            <div className="md:w-2/5 flex justify-center">
              <div className="w-64 h-64 bg-white/5 rounded-[2rem] backdrop-blur-md flex items-center justify-center border border-white/10 p-10 shadow-[0_0_50px_rgba(34,197,94,0.1)] transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <BookOpen className="w-full h-full text-amber-400 drop-shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-green-900">Message Us</h2>
              <div className="h-2 w-24 bg-amber-500 rounded-full mt-4" />
            </div>
            <p className="text-slate-600 text-lg font-medium leading-relaxed">
              For any inquiries regarding school admissions, fee structure, or general information, please reach out to the administration office. We are always happy to hear from you.
            </p>
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-6 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
                <div className="bg-green-50 p-4 rounded-xl text-green-700">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-lg text-slate-800">Give Us a Call</div>
                  <div className="text-slate-500 font-medium mt-1">0759008293</div>
                </div>
              </div>
              <div className="flex items-center gap-6 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
                <div className="bg-amber-50 p-4 rounded-xl text-amber-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-lg text-slate-800">Send an Email</div>
                  <div className="text-slate-500 font-medium mt-1">info@kipsirwo.ac.ke</div>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-none shadow-2xl rounded-[2rem] p-8 md:p-10 bg-white relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-600 to-amber-500" />
            <div className="space-y-6 pt-2">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700 font-bold">Your Name</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-green-600 transition-colors" />
                    <Input id="name" placeholder="John Doe" className="pl-12 h-14 bg-slate-50 border-slate-200 focus:border-green-500 focus:ring-green-500 rounded-xl font-medium" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 font-bold">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-green-600 transition-colors" />
                    <Input id="email" type="email" placeholder="john@example.com" className="pl-12 h-14 bg-slate-50 border-slate-200 focus:border-green-500 focus:ring-green-500 rounded-xl font-medium" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-slate-700 font-bold">Message</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-green-600 transition-colors" />
                  <Textarea id="message" placeholder="How can we help you?" className="min-h-[140px] pl-12 pt-4 bg-slate-50 border-slate-200 focus:border-green-500 focus:ring-green-500 rounded-xl font-medium resize-none" />
                </div>
              </div>
              <Button className="w-full h-14 bg-green-800 text-white font-bold rounded-xl text-lg hover:bg-green-900 transition-all active:scale-[0.98] shadow-lg shadow-green-900/20 pt-1 mt-2">
                Send Message
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* School Gallery */}
      <section className="py-24 bg-green-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-900/40 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-amber-500 tracking-tight">School Gallery</h2>
            <p className="text-green-200 max-w-2xl mx-auto text-xl font-medium">A look at some of the physical facilities and activities at Kipsirwo Primary School.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-6">
              <img src="/images/hero_kenyan_students_1775937217321.png" className="rounded-3xl h-72 w-full object-cover shadow-2xl hover:scale-[1.05] hover:shadow-amber-500/20 transition-all duration-500 border border-green-800/50" alt="Gallery" />
              <img src="/images/athletics_group.jpeg" className="rounded-3xl h-56 w-full object-cover shadow-2xl hover:scale-[1.05] hover:shadow-amber-500/20 transition-all duration-500 border border-green-800/50" alt="Sports Group" />
            </div>
            <div className="space-y-6 pt-12 md:pt-16">
              <img src="/images/athletics_podium.jpeg" className="rounded-3xl h-56 w-full object-cover shadow-2xl hover:scale-[1.05] hover:shadow-amber-500/20 transition-all duration-500 border border-green-800/50" alt="Sports Podium" />
              <img src="/images/cbc_classroom_1775937350004.png" className="rounded-3xl h-72 w-full object-cover shadow-2xl hover:scale-[1.05] hover:shadow-amber-500/20 transition-all duration-500 border border-green-800/50" alt="Gallery" />
            </div>
            <div className="space-y-6">
              <img src="/images/school_sports_1775937447876.png" className="rounded-3xl h-72 w-full object-cover shadow-2xl hover:scale-[1.05] hover:shadow-amber-500/20 transition-all duration-500 border border-green-800/50" alt="Gallery" />
              <img src="/images/athletics_other.jpeg" className="rounded-3xl h-56 w-full object-cover shadow-2xl hover:scale-[1.05] hover:shadow-amber-500/20 transition-all duration-500 border border-green-800/50" alt="Sports Action" />
            </div>
            <div className="space-y-6 pt-12 md:pt-16">
              <img src="https://images.unsplash.com/photo-1523050335192-ce1dea3527a1?q=80&w=2070" className="rounded-3xl h-56 w-full object-cover shadow-2xl hover:scale-[1.05] hover:shadow-amber-500/20 transition-all duration-500 border border-green-800/50" alt="Gallery" />
              <img src="https://images.unsplash.com/photo-1507537243993-c0a35bb2b5b5?q=80&w=2070" className="rounded-3xl h-72 w-full object-cover shadow-2xl hover:scale-[1.05] hover:shadow-amber-500/20 transition-all duration-500 border border-green-800/50" alt="Gallery" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-950 border-t-4 border-amber-500 text-green-100 py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center space-y-8 relative z-10">
          <div className="flex items-center justify-center space-x-3">
            <Award className="text-amber-500 w-10 h-10" />
            <span className="text-4xl font-black tracking-tighter text-white">
              KIPSIRWO<span className="text-amber-500">PRIMARY</span>
            </span>
          </div>
          <p className="text-green-200/80 max-w-md mx-auto text-xl font-medium leading-relaxed">
            A center of excellence committed to academic performance, curriculum development, and discipline.
          </p>
          <div className="border-t border-green-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-green-500 font-semibold">
            <p>Copyright © 2026 KIPSIRWO PRIMARY. All rights reserved.</p>
            <div className="flex gap-10">
              <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
