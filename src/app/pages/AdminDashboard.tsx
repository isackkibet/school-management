import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { 
  Users, UserCheck, DollarSign, AlertCircle, BookOpen, TrendingUp, Bell, ChevronRight, 
  BrainCircuit, Wand2, CalendarClock, BookA, Medal, Star, BookMarked, MonitorPlay, 
  MessageSquare, Gamepad2, FileText, CheckCircle2, ClipboardCheck, Edit3, Send, Files,
  Users2, HelpCircle, FileBarChart, PenTool
} from "lucide-react";
import { Badge } from "../components/ui/badge";

export default function AdminDashboard() {
  const role = localStorage.getItem("userRole") || "student";

  const getRoleTitle = () => {
    switch(role) {
      case 'admin': return "Admin Portal";
      case 'teacher': return "Teacher Portal";
      case 'student': return "Student Portal";
      case 'parent': return "Parent Portal";
      case 'accountant': return "Finance Portal";
      default: return "Portal";
    }
  }

  // ============== TEACHER DASHBOARD VIEW ==============
  if (role === 'teacher') {
    return (
      <div className="space-y-8 pb-8">
        {/* Top Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-800 via-indigo-700 to-indigo-900 p-8 text-white shadow-xl">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-white/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-1/4 -mb-16 h-48 w-48 rounded-full bg-amber-500/20 blur-2xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-extrabold mb-2 tracking-tight">
                Welcome back to <span className="text-amber-400">{getRoleTitle()}</span>
              </h2>
              <p className="text-indigo-100/90 text-lg font-medium">Manage your classroom, lesson plans, and assignments with ease.</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl px-8 py-5 shadow-inner text-center">
                <div className="text-4xl font-bold tracking-tight text-white">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</div>
                <div className="text-indigo-200 font-medium tracking-widest uppercase text-sm mt-1">{new Date().getFullYear()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Quick Actions Priority Row */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" /> Daily Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white cursor-pointer group">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-blue-50 p-4 rounded-full group-hover:scale-110 transition-transform">
                  <ClipboardCheck className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Take Attendance</h4>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Record daily presence</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white cursor-pointer group">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-orange-50 p-4 rounded-full group-hover:scale-110 transition-transform">
                  <Edit3 className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Post Homework</h4>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Assign new tasks</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white cursor-pointer group">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-green-50 p-4 rounded-full group-hover:scale-110 transition-transform">
                  <Files className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Upload Materials</h4>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Videos & Worksheets</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white cursor-pointer group">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-amber-50 p-4 rounded-full group-hover:scale-110 transition-transform">
                  <PenTool className="w-8 h-8 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Enter Grades</h4>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Feedback & Levels</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Secondary Management Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Class Management Tools */}
          <Card className="border-none shadow-md bg-white">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="flex items-center gap-2 text-xl font-bold">
                <BookOpen className="w-6 h-6 text-indigo-600" /> Class Management
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                <div className="p-5 flex items-center justify-between hover:bg-slate-50 cursor-pointer group transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-50 p-3 rounded-lg text-indigo-600"><FileBarChart className="w-5 h-5"/></div>
                    <div>
                      <p className="font-bold text-slate-800">Generate Progress Reports</p>
                      <p className="text-sm text-slate-500 font-medium">Print or email term report cards</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                </div>

                <div className="p-5 flex items-center justify-between hover:bg-slate-50 cursor-pointer group transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-teal-50 p-3 rounded-lg text-teal-600"><Users2 className="w-5 h-5"/></div>
                    <div>
                      <p className="font-bold text-slate-800">View Student Profiles</p>
                      <p className="text-sm text-slate-500 font-medium">Access medical notes and history</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-teal-600 transition-colors" />
                </div>

                <div className="p-5 flex items-center justify-between hover:bg-slate-50 cursor-pointer group transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-rose-50 p-3 rounded-lg text-rose-600"><CalendarClock className="w-5 h-5"/></div>
                    <div>
                      <p className="font-bold text-slate-800">Schedule Quizzes</p>
                      <p className="text-sm text-slate-500 font-medium">Set up online tests or activities</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-rose-600 transition-colors" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Communication Hub */}
          <Card className="border-none shadow-md bg-white">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="flex items-center gap-2 text-xl font-bold">
                <MessageSquare className="w-6 h-6 text-indigo-600" /> Communication Hub
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-cyan-100 text-cyan-700 p-2 rounded-lg"><Send className="w-4 h-4"/></div>
                  <h4 className="font-bold text-slate-800">Message Students & Parents</h4>
                </div>
                <p className="text-sm text-slate-500 font-medium ml-11">Send direct messages regarding student behavior or performance.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-amber-100 text-amber-700 p-2 rounded-lg"><Bell className="w-4 h-4"/></div>
                  <h4 className="font-bold text-slate-800">Post Class Announcement</h4>
                </div>
                <p className="text-sm text-slate-500 font-medium ml-11">Broadcast notes, reminders, or holiday updates to the entire class.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-purple-100 text-purple-700 p-2 rounded-lg"><Users className="w-4 h-4"/></div>
                  <h4 className="font-bold text-slate-800">Staff Room Chat</h4>
                </div>
                <p className="text-sm text-slate-500 font-medium ml-11">Communicate with other teachers or administration securely.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ============== STUDENT / PARENT DASHBOARD VIEW ==============
  if (role === 'student' || role === 'parent') {
    return (
      <div className="space-y-8 pb-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-800 p-8 text-white shadow-xl">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold mb-2 tracking-tight">
              Welcome to the <span className="text-amber-400">{getRoleTitle()}!</span>
            </h2>
            <p className="text-blue-100/90 text-lg font-medium">Ready to learn and grow today? You have 2 assignments pending.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-none shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 bg-blue-50/50">
              <CardTitle className="text-sm font-bold text-blue-800 uppercase tracking-wider">Attendance</CardTitle>
              <div className="bg-blue-100 p-2.5 rounded-xl"><UserCheck className="w-5 h-5 text-blue-600" /></div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-slate-800">42</span>
                <span className="text-slate-500 font-medium mb-1">Days Present</span>
              </div>
              <p className="text-sm text-slate-500 mt-2 font-medium">1 Day Absent | 0 Lates</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 bg-amber-50/50">
              <CardTitle className="text-sm font-bold text-amber-800 uppercase tracking-wider">Grades & Feedback</CardTitle>
              <div className="bg-amber-100 p-2.5 rounded-xl"><Star className="w-5 h-5 text-amber-600" /></div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center gap-1">
                <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                <Star className="w-6 h-6 text-slate-200 fill-slate-200" />
              </div>
              <p className="text-sm font-bold text-green-600 mt-3 pt-1">Doing Great! Keep it up.</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 bg-purple-50/50">
              <CardTitle className="text-sm font-bold text-purple-800 uppercase tracking-wider">Homework Due</CardTitle>
              <div className="bg-purple-100 p-2.5 rounded-xl"><BookMarked className="w-5 h-5 text-purple-600" /></div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-3xl font-black text-slate-800">2 <span className="text-lg font-medium text-slate-500">Tasks</span></div>
              <p className="text-sm font-bold text-orange-500 mt-2">Needs action today</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 bg-green-50/50">
              <CardTitle className="text-sm font-bold text-green-800 uppercase tracking-wider">Next Class</CardTitle>
              <div className="bg-green-100 p-2.5 rounded-xl"><CalendarClock className="w-5 h-5 text-green-600" /></div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-2xl font-black text-slate-800 tracking-tight leading-none">Mathematics</div>
              <p className="text-sm text-slate-500 mt-3 font-medium">Starts in 15 mins | Room A4</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Card className="border-none shadow-md">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <CalendarClock className="w-6 h-6 text-indigo-600" /> Today's Timetable
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative border-l-2 border-indigo-100 ml-3 space-y-6">
                  <div className="relative pl-6">
                    <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-white shadow-sm bg-green-500"></div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">Mathematics</h4>
                      <p className="text-slate-500 text-sm font-medium">8:00 AM - 9:30 AM | Tr. Grace</p>
                    </div>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-white shadow-sm bg-slate-300"></div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">English</h4>
                      <p className="text-slate-500 text-sm font-medium">9:30 AM - 11:00 AM | Tr. David</p>
                    </div>
                  </div>
                  <div className="relative pl-6 opacity-60">
                    <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-white shadow-sm bg-slate-200"></div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">Break Time</h4>
                      <p className="text-slate-500 text-sm font-medium">11:00 AM - 11:30 AM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-white">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="flex items-center justify-between text-xl font-bold">
                  <span className="flex items-center gap-2"><BookMarked className="w-6 h-6 text-orange-500" /> Pending Homework</span>
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-none font-bold">2 Tasks</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  <div className="p-5 flex items-center justify-between hover:bg-slate-50">
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-md border-2 border-slate-300"></div>
                      <div>
                        <p className="font-bold text-slate-800">Math Algebra Worksheet</p>
                        <p className="text-xs text-red-500 font-bold mt-1">Due: Tomorrow</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-slate-200 text-slate-500 font-semibold">Pending</Badge>
                  </div>
                  <div className="p-5 flex items-center justify-between hover:bg-slate-50">
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-md border-2 border-slate-300"></div>
                      <div>
                        <p className="font-bold text-slate-800">English Essay Reading</p>
                        <p className="text-xs text-slate-500 font-bold mt-1">Due: Friday</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-slate-200 text-slate-500 font-semibold">Pending</Badge>
                  </div>
                  <div className="p-5 flex items-center justify-between bg-green-50/50">
                    <div className="flex items-center gap-4">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                      <div>
                        <p className="font-bold text-slate-600 line-through">Science Project</p>
                        <p className="text-xs text-green-600 font-bold mt-1">Submitted</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-none hover:bg-green-100 font-semibold">Done</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="border-none shadow-md">
              <CardHeader className="border-b border-slate-100 bg-emerald-50/50">
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <MonitorPlay className="w-6 h-6 text-emerald-600" /> Learning Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-2 gap-4">
                <div className="bg-blue-50 hover:bg-blue-100 cursor-pointer transition-colors p-4 rounded-xl flex flex-col items-center justify-center text-center space-y-2 border border-blue-100 hover:shadow-md">
                  <BookA className="w-8 h-8 text-blue-600" />
                  <span className="font-bold text-slate-700">E-Books Lib</span>
                </div>
                <div className="bg-purple-50 hover:bg-purple-100 cursor-pointer transition-colors p-4 rounded-xl flex flex-col items-center justify-center text-center space-y-2 border border-purple-100 hover:shadow-md">
                  <Gamepad2 className="w-8 h-8 text-purple-600" />
                  <span className="font-bold text-slate-700">Edu Games</span>
                </div>
                <div className="bg-rose-50 hover:bg-rose-100 cursor-pointer transition-colors p-4 rounded-xl flex flex-col items-center justify-center text-center space-y-2 border border-rose-100 hover:shadow-md">
                  <MonitorPlay className="w-8 h-8 text-rose-600" />
                  <span className="font-bold text-slate-700">Video Lessons</span>
                </div>
                <div className="bg-amber-50 hover:bg-amber-100 cursor-pointer transition-colors p-4 rounded-xl flex flex-col items-center justify-center text-center space-y-2 border border-amber-100 hover:shadow-md">
                  <FileText className="w-8 h-8 text-amber-600" />
                  <span className="font-bold text-slate-700">Worksheets</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <MessageSquare className="w-6 h-6 text-cyan-600" /> Class Board & Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 shadow-sm relative">
                  <Badge className="absolute -top-2 -right-2 bg-red-500 shadow-sm font-bold">Important</Badge>
                  <div className="flex items-center gap-3 mb-2">
                    <img src="/deputy.jpg" className="w-8 h-8 rounded-full border border-slate-300" 
                      onError={e => (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544717297-fa95b452accd?w=100'} 
                    />
                    <span className="font-bold text-sm text-slate-700">Mr. Isack (Deputy)</span>
                  </div>
                  <p className="text-sm font-medium text-slate-800">Don't forget tomorrow is Open Day! Make sure your uniforms are neat and clean.</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-black text-xs border border-blue-200">TR</div>
                    <span className="font-bold text-sm text-slate-700">Tr. Grace (Class Teacher)</span>
                  </div>
                  <p className="text-sm font-medium text-slate-600">Please remind your parents about the upcoming P.T.A meeting scheduled for next week.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // ============== ADMIN / ACCOUNTANT DASHBOARD VIEW ==============
  
  const showFinances = role === 'admin' || role === 'accountant';
  const showStaffStats = role === 'admin';

  const teachers = [
    { name: "Mr. Isack Kibet", subject: "Deputy Headteacher", class: "Administration", image: "/deputy.jpg" },
    { name: "Mrs. Grace Kiprono", subject: "Mathematics", class: "Std 8", image: "https://images.unsplash.com/photo-1632215861513-130b66fe97f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Mr. David Rotich", subject: "English", class: "Std 7", image: "https://images.unsplash.com/photo-1744809482817-9a9d4fc280af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  ];

  const recentActivities = [
    { type: "success", message: "Exam results uploaded for Standard 8", time: "2 hours ago" },
    { type: "info", message: "Term 1 School Calendar updated", time: "5 hours ago" },
    { type: "warning", message: "School fees deadline approaching", time: "Yesterday" },
  ];

  return (
    <div className="space-y-8 pb-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-800 via-green-700 to-green-900 p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-white/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 -mb-16 h-48 w-48 rounded-full bg-green-500/20 blur-2xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-extrabold mb-2 tracking-tight content-center">
              Welcome back to <span className="text-amber-400 font-black">{getRoleTitle()}</span>
            </h2>
            <p className="text-green-100/90 text-lg font-medium">"Education for Excellence" - Empowering Tomorrow's Leaders</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl px-8 py-5 shadow-inner text-center hover:bg-black/30 transition-colors cursor-pointer">
              <div className="text-4xl font-bold tracking-tight text-white">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</div>
              <div className="text-green-200 font-medium tracking-widest uppercase text-sm mt-1">{new Date().getFullYear()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white group cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-50/50 bg-slate-50/30">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Attendance</CardTitle>
            <div className={`bg-green-100/50 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
              <UserCheck className={`w-5 h-5 text-green-600`} />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-black text-slate-800 tracking-tight">94.3%</div>
            <div className="flex items-center mt-3 text-sm font-bold text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+2.1% from last month</span>
            </div>
          </CardContent>
        </Card>

        {showStaffStats && (
          <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white group cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-50/50 bg-slate-50/30">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Students</CardTitle>
              <div className={`bg-blue-100/50 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                <Users className={`w-5 h-5 text-blue-600`} />
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-3xl font-black text-slate-800 tracking-tight">542</div>
              <div className="flex items-center mt-3 text-sm font-bold text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+12 enrollments</span>
              </div>
            </CardContent>
          </Card>
        )}

        {showStaffStats && (
          <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white group cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-50/50 bg-slate-50/30">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">AI Operations</CardTitle>
              <div className={`bg-amber-100/50 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                <BrainCircuit className={`w-5 h-5 text-amber-600`} />
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-3xl font-black text-slate-800 tracking-tight">14</div>
              <div className="flex items-center mt-3 text-sm font-bold text-amber-600">
                <Wand2 className="w-4 h-4 mr-1" />
                <span>Smart reports generated</span>
              </div>
            </CardContent>
          </Card>
        )}

        {showFinances && (
          <>
            <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white group cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-50/50 bg-slate-50/30">
                <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Fee Collection</CardTitle>
                <div className={`bg-purple-100/50 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <DollarSign className={`w-5 h-5 text-purple-600`} />
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-3xl font-black text-slate-800 tracking-tight">KES 2.4M</div>
                <div className="flex items-center mt-3 text-sm font-bold text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+8.4% on track</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white group cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-50/50 bg-slate-50/30">
                <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Pending Balances</CardTitle>
                <div className={`bg-orange-100/50 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <AlertCircle className={`w-5 h-5 text-orange-600`} />
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-3xl font-black text-slate-800 tracking-tight">KES 380K</div>
                <div className="flex items-center mt-3 text-sm font-bold text-red-500">
                  <TrendingUp className="w-4 h-4 mr-1 rotate-180" />
                  <span>Needs follow-up</span>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {role !== 'accountant' && (
          <Card className="border-none shadow-md h-full bg-white">
            <CardHeader className="border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl font-bold text-slate-800">
                  <BookA className="w-6 h-6 text-green-600" /> Administration & Staff
                </CardTitle>
                <button className="text-sm font-bold text-green-600 hover:text-green-700 flex items-center gap-1 group">
                  View Directory <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {teachers.map((teacher, index) => (
                  <div key={index} className={`flex items-center gap-4 p-5 hover:bg-slate-50 cursor-pointer transition-colors group ${index === 0 ? 'bg-amber-50/30' : ''}`}>
                    <div className="relative">
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544717297-fa95b452accd?q=80&w=400';
                        }}
                        className={`w-12 h-12 rounded-full object-cover ring-2 transition-all ${index === 0 ? 'ring-amber-300 w-14 h-14' : 'ring-transparent group-hover:ring-green-100'}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold text-slate-800 ${index === 0 ? 'text-lg text-amber-900' : 'text-base'}`}>
                        {teacher.name}
                      </h4>
                      <p className={`text-sm font-medium ${index === 0 ? 'text-amber-700 font-semibold' : 'text-slate-500'}`}>
                        {teacher.subject}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-none shadow-md h-full bg-white">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-slate-800">
              <Bell className="w-6 h-6 text-green-600" />
              Notices / Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative border-l-2 border-slate-100 ml-3 space-y-6">
              {recentActivities.map((activity, index) => (
                <div key={index} className="relative pl-6">
                  <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm flex items-center justify-center ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-orange-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div className="bg-slate-50 p-4 rounded-xl rounded-tl-none border border-slate-100 hover:shadow-sm transition-shadow">
                    <p className="text-sm font-bold text-slate-800">{activity.message}</p>
                    <p className="text-xs font-medium text-slate-500 mt-1.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
