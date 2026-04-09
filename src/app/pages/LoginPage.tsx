import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { GraduationCap, BookOpen, Award } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("admin");

  const handleLogin = () => {
    localStorage.setItem("userRole", role);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 to-green-700/90 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1637148734636-906c24feeb55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Students in classroom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-full w-24 h-24 flex items-center justify-center mb-6">
            <GraduationCap className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-center">Kipsirwo Primary School</h1>
          <p className="text-xl mb-2 italic">"Education for Excellence"</p>
          <p className="text-lg opacity-90">P.O. Box 213, Kapsabet, Kenya</p>
          <div className="mt-12 grid grid-cols-3 gap-8">
            <div className="text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">542</div>
              <div className="text-sm">Students</div>
            </div>
            <div className="text-center">
              <Award className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">28</div>
              <div className="text-sm">Teachers</div>
            </div>
            <div className="text-center">
              <GraduationCap className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">10</div>
              <div className="text-sm">Classes</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center pb-8">
            <div className="bg-green-700 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">School Management System</h2>
            <p className="text-sm text-gray-600 mt-2">Sign in to access your account</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Username</Label>
              <Input placeholder="Enter username" className="mt-1" />
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" placeholder="Enter password" className="mt-1" />
            </div>
            <div>
              <Label>Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="accountant">Accountant</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleLogin} className="w-full bg-green-700 hover:bg-green-800 h-11">
              Login to Dashboard
            </Button>
            <p className="text-xs text-center text-gray-500 mt-4">
              Secure access to student records, attendance, exams, and fees
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
