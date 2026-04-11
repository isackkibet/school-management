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
  Phone
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-orange-50 text-slate-900 font-sans selection:bg-orange-500 selection:text-white">
      {/* Header & Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-indigo-100 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-900 p-2 rounded-lg">
              <Award className="text-orange-500 w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-blue-900">
              KIPSIRWO<span className="text-orange-500">PRIMARY</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {["Home", "News", "Grades", "Admissions", "Open Day", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-semibold hover:text-orange-500 transition-colors"
              >
                {item}
              </a>
            ))}
            <Link to="/login">
              <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                Staff Login
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
                  className="text-lg font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-blue-900 mt-4">Staff Login</Button>
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
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/80 to-indigo-900/40 mix-blend-multiply md:mix-blend-normal" />
        </div>

        <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600 px-5 py-2 rounded-full border-none font-bold shadow-lg shadow-orange-500/30 tracking-wide uppercase text-xs">
              Admissions Open for May 2026
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white drop-shadow-md">
              A Foundation for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">Excellence</span> and Discipline.
            </h1>
            <p className="text-lg text-blue-50 max-w-lg leading-relaxed font-medium drop-shadow-sm">
              Welcome to Kipsirwo Primary School. We offer a conducive learning environment to ensure our students excel in academics and co-curricular activities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 border-none text-white h-14 px-8 rounded-xl text-lg group shadow-xl shadow-orange-500/20">
                Apply Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="h-14 px-8 rounded-xl text-lg border-2 border-white/20 text-white hover:bg-white/10 bg-white/5 backdrop-blur-md">
                View Grades
              </Button>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-900/10 rounded-full blur-3xl" />
            <img 
              src="/images/cbc_classroom_1775937350004.png" 
              alt="Kipsirwo Primary Students learning" 
              className="rounded-3xl shadow-2xl relative z-10 w-full object-cover aspect-[4/3] border-4 border-white"
            />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative z-20 pb-12 -mt-10 lg:-mt-16">
        <div className="container mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl shadow-indigo-900/10 p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-black text-blue-900">500+</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Students</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-orange-500">25+</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Expert Teachers</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-blue-900">JSS</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Approved Center</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-orange-500">100%</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">KPSEA Transition</div>
            </div>
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section id="news" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/60 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900">News & Events</h2>
              <div className="h-1.5 w-20 bg-orange-500 rounded-full" />
            </div>
            <Button variant="ghost" className="text-blue-900 font-bold group">
              View All News <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow rounded-2xl overflow-hidden group">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="/images/cbc_classroom_1775937350004.png" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="CBC Curriculum in session"
                />
                <Badge className="absolute top-4 left-4 bg-blue-900">CBC Curriculum</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-orange-500 transition-colors">
                  Competency Based Curriculum & JSS
                </CardTitle>
                <div className="flex items-center text-slate-500 text-sm gap-2">
                  <BookOpen className="w-4 h-4" /> PP1 - Grade 9
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 line-clamp-3">
                  We have fully embraced the CBC curriculum from PP1 to Junior Secondary School (JSS). We ensure our students pass their KPSEA assessments with flying colors.
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="link" className="p-0 text-blue-900 font-bold h-auto">Read More</Button>
              </CardFooter>
            </Card>

            {/* Card 2 */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow rounded-2xl overflow-hidden group">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="/images/school_sports_1775937447876.png" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Students playing sports"
                />
                <Badge className="absolute top-4 left-4 bg-orange-500">Co-curricular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-orange-500 transition-colors">
                  Co-curricular Activities & Talents
                </CardTitle>
                <div className="flex items-center text-slate-500 text-sm gap-2">
                  <Award className="w-4 h-4" /> Regional Champions
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 line-clamp-3">
                  Students are encouraged to participate in co-curricular activities including football, athletics, and drama to build their talents outside the classroom.
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="link" className="p-0 text-blue-900 font-bold h-auto">Read More</Button>
              </CardFooter>
            </Card>

            {/* Card 3 */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow rounded-2xl overflow-hidden group">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1523050335192-ce1dea3527a1?q=80&w=2070" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Open Day"
                />
                <Badge className="absolute top-4 left-4 bg-red-900 text-white">Event</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-orange-500 transition-colors">
                  Annual School Open Day
                </CardTitle>
                <div className="flex items-center text-slate-500 text-sm gap-2">
                  <MapPin className="w-4 h-4" /> Primary Section
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 line-clamp-3">
                  Parents are invited to visit the school during Open Day to check on their children's academic progress and consult with the teachers.
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="link" className="p-0 text-blue-900 font-bold h-auto">Read More</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Headteacher's Welcome */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/3 relative">
              <div className="absolute -inset-4 bg-orange-500/10 rounded-full -z-10 blur-2xl" />
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-100">
                <img 
                  src="/images/headteacher_portrait_1775937434285.png" 
                  alt="Headteacher" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-6 -right-6 bg-blue-900 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-xl font-bold italic">"Hard work pays"</div>
              </div>
            </div>
            <div className="md:w-2/3 space-y-8">
              <div className="space-y-4">
                <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100 px-4 py-1 rounded-full border-none">Headteacher</Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-blue-900">Message from the <br /> <span className="text-orange-500">Headteacher</span></h2>
                <div className="h-1.5 w-20 bg-orange-500 rounded-full" />
              </div>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  It is a great privilege to welcome you to Kipsirwo Primary School. Our main objective is to provide a solid foundation for our learners through discipline, hard work, and good moral values. We work closely with parents to monitor student progress.
                </p>
                <p>
                  We are fully committed to implementing the Competency-Based Curriculum (CBC) to ensure our students get the best practical skills. Feel free to visit the school or contact the administration for any inquiries regarding admissions.
                </p>
                <div className="pt-4">
                  <div className="text-2xl font-black text-blue-900 leading-none">Mr. Jonathan Kipruto</div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Headteacher, Kipsirwo Primary</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admissions Callout */}
      <section id="admissions" className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-blue-900 rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
            
            <div className="md:w-3/5 space-y-6 relative z-10 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Quality Education <br />
                <span className="text-orange-400">For Your Child.</span>
              </h2>
              <p className="text-blue-100 text-lg md:text-xl font-medium max-w-xl">
                We are currently admitting students for the upcoming term. Secure a spot for your child and join our community of academic excellence.
              </p>
              <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white h-14 px-8 rounded-xl font-bold">
                  Apply for Admission
                </Button>
                <div className="flex items-center text-blue-200">
                  <Clock className="mr-2 w-5 h-5" />
                  <span>Term 1 Deadline: May 12, 2026</span>
                </div>
              </div>
            </div>
            <div className="md:w-2/5 flex justify-center">
              <div className="w-64 h-64 bg-white/10 rounded-3xl backdrop-blur-md flex items-center justify-center border border-white/20 p-8">
                <BookOpen className="w-full h-full text-orange-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900">Message Us</h2>
              <div className="h-1.5 w-20 bg-orange-500 rounded-full mt-4" />
            </div>
            <p className="text-slate-600 text-lg">
              For any inquiries regarding school admissions, fee structure, or general information, please reach out to the school administration office.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-blue-900">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold">Call Us</div>
                  <div className="text-slate-600">0759008293</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-blue-900">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold">Email Us</div>
                  <div className="text-slate-600">info@kipsirwo.ac.ke</div>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-none shadow-2xl rounded-3xl p-8 bg-white border border-slate-50">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700 font-semibold">Your Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input id="name" placeholder="John Doe" className="pl-10 h-11 bg-slate-50 border-none rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 font-semibold">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input id="email" type="email" placeholder="john@example.com" className="pl-10 h-11 bg-slate-50 border-none rounded-xl" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-slate-700 font-semibold">Message</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Textarea id="message" placeholder="How can we help you?" className="min-h-[120px] pl-10 pt-3 bg-slate-50 border-none rounded-xl" />
                </div>
              </div>
              <Button className="w-full h-12 bg-blue-900 font-bold rounded-xl text-lg hover:bg-blue-800 transition-all active:scale-[0.98]">
                Send Message
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* School Gallery */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">School Gallery</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">A look at some of the physical facilities and activities at Kipsirwo Primary School.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-4">
              <img src="/images/hero_kenyan_students_1775937217321.png" className="rounded-2xl h-64 w-full object-cover shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-all duration-300" alt="Gallery" />
              <img src="/images/athletics_group.jpeg" className="rounded-2xl h-48 w-full object-cover shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-all duration-300" alt="Sports Group" />
            </div>
            <div className="space-y-4 pt-8">
              <img src="/images/athletics_podium.jpeg" className="rounded-2xl h-48 w-full object-cover shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-all duration-300" alt="Sports Podium" />
              <img src="/images/cbc_classroom_1775937350004.png" className="rounded-2xl h-64 w-full object-cover shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-all duration-300" alt="Gallery" />
            </div>
            <div className="space-y-4">
              <img src="/images/school_sports_1775937447876.png" className="rounded-2xl h-64 w-full object-cover shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-all duration-300" alt="Gallery" />
              <img src="/images/athletics_other.jpeg" className="rounded-2xl h-48 w-full object-cover shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-all duration-300" alt="Sports Action" />
            </div>
            <div className="space-y-4 pt-8">
              <img src="https://images.unsplash.com/photo-1523050335192-ce1dea3527a1?q=80&w=2070" className="rounded-2xl h-48 w-full object-cover shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-all duration-300" alt="Gallery" />
              <img src="https://images.unsplash.com/photo-1507537243993-c0a35bb2b5b5?q=80&w=2070" className="rounded-2xl h-64 w-full object-cover shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-all duration-300" alt="Gallery" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-white py-12">
        <div className="container mx-auto px-4 text-center space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <Award className="text-orange-500 w-8 h-8" />
            <span className="text-3xl font-black tracking-tighter">
              KIPSIRWO<span className="text-orange-500">PRIMARY & JSS</span>
            </span>
          </div>
          <p className="text-blue-200 max-w-md mx-auto">
            A center of excellence committed to academic performance and discipline.
          </p>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-400">
            <p>Copyright 2026 KIPSIRWO PRIMARY. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
