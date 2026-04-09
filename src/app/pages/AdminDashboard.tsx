import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Users, UserCheck, DollarSign, AlertCircle, BookOpen, TrendingUp, Bell } from "lucide-react";
import { Badge } from "../components/ui/badge";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Students", value: "542", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Attendance Today", value: "94.3%", icon: UserCheck, color: "text-green-600", bg: "bg-green-50" },
    { label: "Fee Collection", value: "KES 2.4M", icon: DollarSign, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Pending Balances", value: "KES 380K", icon: AlertCircle, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  const teachers = [
    { name: "Mrs. Grace Kiprono", subject: "Mathematics", class: "Std 8", image: "https://images.unsplash.com/photo-1632215861513-130b66fe97f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Mr. David Rotich", subject: "English", class: "Std 7", image: "https://images.unsplash.com/photo-1744809482817-9a9d4fc280af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { name: "Mrs. Faith Cherono", subject: "Science", class: "Std 6", image: "https://images.unsplash.com/photo-1666281134747-caa676fc2201?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  ];

  const recentActivities = [
    { type: "success", message: "Exam results uploaded for Standard 8", time: "2 hours ago" },
    { type: "warning", message: "15 students absent today", time: "4 hours ago" },
    { type: "info", message: "Fee payment received: KES 45,000", time: "5 hours ago" },
    { type: "success", message: "New student registered: John Kiplagat", time: "Yesterday" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome to Kipsirwo Primary School</h2>
            <p className="text-green-100 italic">"Education for Excellence" - Empowering Tomorrow's Leaders</p>
            <p className="text-sm text-green-100 mt-2">P.O. Box 213, Kapsabet, Kenya</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4">
              <div className="text-3xl font-bold">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</div>
              <div className="text-sm">{new Date().getFullYear()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.label}</CardTitle>
              <div className={`${stat.bg} p-2 rounded-lg`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center mt-2 text-xs text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>+12% from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Our Teaching Staff
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teachers.map((teacher, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{teacher.name}</h4>
                  <p className="text-sm text-gray-600">{teacher.subject} Teacher</p>
                </div>
                <Badge variant="outline">{teacher.class}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-orange-500' :
                  'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="relative h-48 rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1637148734636-906c24feeb55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
              alt="Students in classroom"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <p className="text-white p-4 font-semibold">Our Students Learning</p>
            </div>
          </div>
          <div className="relative h-48 rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1664990594667-9bd4c60cbcfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
              alt="Students in uniform"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <p className="text-white p-4 font-semibold">School Pride</p>
            </div>
          </div>
          <div className="relative h-48 rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1747854828989-5c8408a8f0bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
              alt="School building"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <p className="text-white p-4 font-semibold">Modern Facilities</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
