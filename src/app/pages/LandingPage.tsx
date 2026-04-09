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
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Header & Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-900 p-2 rounded-lg">
              <Award className="text-orange-500 w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-blue-900">
              KIPSIRWO<span className="text-orange-500">PICTURE</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {["Home", "News", "Courses", "RPL", "Open Day", "Contact"].map((item) => (
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
              {["Home", "News", "Courses", "RPL", "Open Day", "Contact"].map((item) => (
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
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -z-10 skew-x-12 transform translate-x-20" />
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100 px-4 py-1.5 rounded-full border-none font-semibold">
              Admissions Open for May 2026
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-blue-900">
              Transforming <span className="text-red-900 underline decoration-orange-500">Skills</span> into Careers.
            </h1>
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              KIPSIRWO PICTURE provides world-class technical training and skill recognition protocols to empower the next generation of professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-blue-900 hover:bg-blue-800 h-14 px-8 rounded-xl text-lg group">
                Apply Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="h-14 px-8 rounded-xl text-lg border-2 border-slate-200">
                Explore Courses
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-900/10 rounded-full blur-3xl" />
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070" 
              alt="Education" 
              className="rounded-3xl shadow-2xl relative z-10 w-full object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section id="news" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
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
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="RPL"
                />
                <Badge className="absolute top-4 left-4 bg-blue-900">May 2026 Intake</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-orange-500 transition-colors">
                  Recognition of Prior Learning (RPL)
                </CardTitle>
                <div className="flex items-center text-slate-500 text-sm gap-2">
                  <Calendar className="w-4 h-4" /> May 15, 2026
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 line-clamp-3">
                  Get your skills certified! We are now accepting applications for RPL assessments in various Technical fields for the upcoming semester.
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
                  src="https://images.unsplash.com/photo-1544928147-79a2bc170ce8?q=80&w=2070" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Courses"
                />
                <Badge className="absolute top-4 left-4 bg-orange-500">Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-orange-500 transition-colors">
                  Intake Courses May 2026
                </CardTitle>
                <div className="flex items-center text-slate-500 text-sm gap-2">
                  <BookOpen className="w-4 h-4" /> Comprehensive Enrollment
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 line-clamp-3">
                  Discover over 45 diverse courses in Engineering, ICT, Business, and Applied Sciences. Registration closes on May 5th, 2026.
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
                  Annual Campus Open Day
                </CardTitle>
                <div className="flex items-center text-slate-500 text-sm gap-2">
                  <MapPin className="w-4 h-4" /> Main Campus
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 line-clamp-3">
                  Join us for a day of exploration. Meet tutors, tour the labs, and get career guidance from industry leading experts visiting our campus.
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="link" className="p-0 text-blue-900 font-bold h-auto">Read More</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* RPL Callout */}
      <section id="rpl" className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-blue-900 rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
            
            <div className="md:w-3/5 space-y-6 relative z-10 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Got Experience? <br />
                <span className="text-orange-400">Get Certified.</span>
              </h2>
              <p className="text-blue-100 text-lg md:text-xl font-medium max-w-xl">
                Our Recognition of Prior Learning (RPL) protocol evaluates your work experience and turns it into a formal qualification. 
              </p>
              <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white h-14 px-8 rounded-xl font-bold">
                  Apply for May 2026 Intake
                </Button>
                <div className="flex items-center text-blue-200">
                  <Clock className="mr-2 w-5 h-5" />
                  <span>Deadline: May 12, 2026</span>
                </div>
              </div>
            </div>
            <div className="md:w-2/5 flex justify-center">
              <div className="w-64 h-64 bg-white/10 rounded-3xl backdrop-blur-md flex items-center justify-center border border-white/20 p-8">
                <Users className="w-full h-full text-orange-400" />
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
              Have questions about our programs or admissions? Send us a message and our counselor team will get back to you within 24 hours.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-blue-900">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold">Call Us</div>
                  <div className="text-slate-600">+254 700 000 000</div>
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

      {/* Footer */}
      <footer className="bg-blue-950 text-white py-12">
        <div className="container mx-auto px-4 text-center space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <Award className="text-orange-500 w-8 h-8" />
            <span className="text-3xl font-black tracking-tighter">
              KIPSIRWO<span className="text-orange-500">PICTURE</span>
            </span>
          </div>
          <p className="text-blue-200 max-w-md mx-auto">
            Providing industry-aligned education and skill certification for regional development.
          </p>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-400">
            <p>© 2026 KIPSIRWO PICTURE. All rights reserved.</p>
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
