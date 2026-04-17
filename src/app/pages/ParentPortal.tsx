import { useState } from "react";
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription 
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { 
  Users, Phone, Mail, Calendar, Info, AlertTriangle, TrendingUp, 
  MessageSquare, FileText, Download, Building, Bell, ChevronRight
} from "lucide-react";
import { Badge } from "../components/ui/badge";

export default function ParentPortal() {
  const teachers = [
    { name: "Mr. Isack Kibet", role: "Deputy Headteacher", subject: "Administration", phone: "0759008293", email: "deputy@kipsirwo.ac.ke" },
    { name: "Mrs. Grace Kiprono", role: "Class Teacher (Std 8)", subject: "Mathematics", phone: "0712345678", email: "grace.k@kipsirwo.ac.ke" },
    { name: "Mr. David Rotich", role: "Subject Teacher", subject: "English", phone: "0723456789", email: "david.r@kipsirwo.ac.ke" },
    { name: "Ms. Faith Koech", role: "Subject Teacher", subject: "Science / CRE", phone: "0734567890", email: "faith.k@kipsirwo.ac.ke" },
  ];

  const upcomingMeetings = [
    { title: "PTA General Meeting", date: "Friday, 15th May 2026", time: "10:00 AM", location: "Main Hall", importance: "High" },
    { title: "Standard 8 Academic Day", date: "Saturday, 23rd May 2026", time: "09:00 AM", location: "Classroom Block A", importance: "Critical" },
    { title: "School Annual Open Day", date: "Thursday, 11th June 2026", time: "08:30 AM", location: "School Field", importance: "Medium" },
  ];

  const developmentUpdates = [
    { project: "Classroom Expansion", status: "In Progress", progress: 65, detail: "We are currently adding 3 new classrooms to accommodate the growing number of students." },
    { project: "School Library Upgrade", status: "Planning", progress: 10, detail: "Seeking donations for new e-learning materials and physical books." },
    { project: "Borehole Drilling", status: "Completed", progress: 100, detail: "Reliable clean water is now available for all students and staff." },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Parent Portal</h1>
          <p className="text-slate-500 text-lg font-medium mt-1">Partners in your child's education journey.</p>
        </div>
        <div className="flex gap-3">
          <a href="/school_calendar_2026.txt" download="Kipsirwo_Calendar_2026.txt">
            <Button variant="outline" className="border-slate-200 hover:bg-slate-50 font-bold flex items-center gap-2">
              <Download className="w-5 h-5 text-green-700" />
              School Calendar
            </Button>
          </a>
          <a href="/school_fees_2026.txt" download="Kipsirwo_Fees_2026.txt">
            <Button variant="outline" className="border-slate-200 hover:bg-slate-50 font-bold flex items-center gap-2">
              <Download className="w-5 h-5 text-indigo-700" />
              Fees Structure
            </Button>
          </a>
          <Button className="bg-green-700 hover:bg-green-800 text-white font-bold shadow-md shadow-green-900/20">
            Pay Fees Now
          </Button>
        </div>
      </div>

      {/* Critical Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-xl bg-gradient-to-br from-red-600 to-rose-700 text-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 h-48 w-48 rounded-full bg-white/10 blur-3xl group-hover:scale-110 transition-transform duration-500" />
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-black">Fee Increment Notice</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-red-50 text-lg font-medium opacity-90 leading-relaxed">
              Please note that there will be a <span className="text-amber-300 font-black">15% increase</span> in school fees starting Term 2, 2026 to facilitate the new library expansion and hiring of additional specialist teachers.
            </p>
            <div className="mt-6 flex items-center justify-between">
              <Button variant="secondary" className="bg-white text-red-700 hover:bg-red-50 font-bold border-none">
                View Detailed Memo
              </Button>
              <span className="text-xs font-bold text-red-200 uppercase tracking-widest">Posted: 2 days ago</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-gradient-to-br from-indigo-700 to-indigo-900 text-white overflow-hidden relative group">
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-48 w-48 rounded-full bg-white/10 blur-3xl group-hover:scale-110 transition-transform duration-500" />
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-black">School Progress</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-indigo-50 text-lg font-medium opacity-90 leading-relaxed">
              "Working together to build a better future." We are currently 
              <span className="text-amber-300 font-black"> expanding our classroom blocks</span> to reduce congestion and improve the learning environment.
            </p>
            <div className="mt-6 flex items-center justify-between">
              <Button variant="secondary" className="bg-white/10 text-white hover:bg-white/20 border border-white/20 font-bold">
                View Project Gallery
              </Button>
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Status: 65% Complete</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Academic Meetings & Events */}
        <div className="xl:col-span-2 space-y-8">
          <Card className="border-none shadow-md overflow-hidden bg-white">
            <CardHeader className="border-b border-slate-50 bg-slate-50/50 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-800">
                  <Calendar className="w-6 h-6 text-green-700" />
                  Upcoming Meetings & Events
                </CardTitle>
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Term 1, 2026
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {upcomingMeetings.map((mtg, i) => (
                  <div key={i} className="p-6 hover:bg-slate-50 transition-colors group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-5">
                        <div className="bg-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[70px] border border-slate-200 group-hover:bg-green-50 group-hover:border-green-200 transition-colors">
                          <span className="text-xs font-bold text-slate-500 uppercase">{mtg.date.split(', ')[1].split(' ')[1]}</span>
                          <span className="text-2xl font-black text-slate-800">{mtg.date.split(', ')[1].split(' ')[0].replace(/\D/g,'')}</span>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-slate-800 group-hover:text-green-800 transition-colors">{mtg.title}</h4>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                            <span className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
                              <Bell className="w-4 h-4" /> {mtg.time}
                            </span>
                            <span className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
                              <Building className="w-4 h-4" /> {mtg.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge className={`
                        ${mtg.importance === 'Critical' ? 'bg-red-100 text-red-700 hover:bg-red-100' : 
                          mtg.importance === 'High' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' : 
                          'bg-blue-100 text-blue-700 hover:bg-blue-100'} 
                        border-none font-black px-4 py-1.5 rounded-lg text-[10px] uppercase tracking-widest
                      `}>
                        {mtg.importance} Importance
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* School Progress Visualization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-none shadow-md bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-700" />
                  Staff Growth & Quality
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-6">
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-bold text-slate-600">Specialist Teachers</span>
                      <span className="text-xl font-black text-green-700">85%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[85%] rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-indigo-50 border border-indigo-100 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-indigo-600" />
                      <span className="text-sm font-bold text-indigo-900">New Recruitment Phase</span>
                    </div>
                    <Badge className="bg-indigo-200 text-indigo-900 hover:bg-indigo-300 font-bold border-none">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Building className="w-5 h-5 text-indigo-700" />
                  Infrastructure Needs
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 group cursor-pointer p-2 hover:bg-slate-50 rounded-lg transition-colors">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Info className="w-5 h-5 text-amber-700" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800">New Classroom Block</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] font-black uppercase text-slate-400">Funding Needed</span>
                        <span className="text-[10px] font-black text-amber-600">High Priority</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group cursor-pointer p-2 hover:bg-slate-50 rounded-lg transition-colors">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-5 h-5 text-green-700" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800">ICT Lab Computers</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] font-black uppercase text-slate-400">Acquired</span>
                        <span className="text-[10px] font-black text-green-600">Completed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Teacher Contacts Sidebar */}
        <div className="space-y-8">
          <Card className="border-none shadow-xl bg-white sticky top-6">
            <CardHeader className="bg-slate-800 text-white rounded-t-xl pb-6">
              <CardTitle className="flex items-center gap-3 text-xl font-bold">
                <Phone className="w-6 h-6 text-green-400" />
                Staff Directory
              </CardTitle>
              <CardDescription className="text-slate-300 font-medium mt-2">
                Get in touch with your child's teachers directly for any academic queries.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {teachers.map((teacher, i) => (
                  <div key={i} className="p-5 hover:bg-slate-50 transition-all group">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center text-green-700 font-black text-lg shadow-inner ring-2 ring-white group-hover:ring-green-100 transition-all">
                        {teacher.name.charAt(0)}
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-800 group-hover:text-green-800 transition-colors uppercase tracking-tight">{teacher.name}</h5>
                        <p className="text-xs font-black text-green-600 uppercase tracking-widest">{teacher.role}</p>
                      </div>
                    </div>
                    <div className="space-y-2 mt-4 bg-slate-50 rounded-xl p-3 border border-slate-100 group-hover:bg-white group-hover:border-green-100 transition-all">
                      <a href={`tel:${teacher.phone}`} className="flex items-center gap-3 text-sm font-bold text-slate-600 hover:text-green-700 transition-colors">
                        <Phone className="w-4 h-4" /> {teacher.phone}
                      </a>
                      <a href={`mailto:${teacher.email}`} className="flex items-center gap-3 text-sm font-bold text-slate-600 hover:text-green-700 transition-colors">
                        <Mail className="w-4 h-4" /> {teacher.email}
                      </a>
                    </div>
                    <div className="mt-4 flex items-center justify-end">
                      <button className="text-[10px] font-black text-slate-400 uppercase tracking-tighter hover:text-green-700 flex items-center gap-1 group/btn">
                        Message Online <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 border border-slate-200">
            <CardContent className="p-6 text-center space-y-4">
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <MessageSquare className="w-8 h-8 text-slate-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Support Desk</h4>
                <p className="text-sm text-slate-500 font-medium">Have a general question for the school office?</p>
              </div>
              <Button variant="outline" className="w-full font-bold border-slate-300">Contact Office</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Re-using check circle from lucide-react (already imported)
function CheckCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}
