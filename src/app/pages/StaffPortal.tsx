import { useState, useEffect } from "react";
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription 
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { 
  Save, Download, CheckCircle, Search, Award, TrendingUp, 
  Trash2, Bell, BookOpen, Clock, Users, Wand2, FileSpreadsheet,
  ClipboardCheck, Calendar, FileText, MonitorPlay, BrainCircuit,
  BookMarked, ChevronRight, PenTool, Plus
} from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "../components/ui/table";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "../components/ui/select";
import { examResultsAPI, studentAPI } from "../lib/dataStore";
import { students, classes, subjects } from "../lib/mockData";

import { useNavigate } from "react-router";

export default function StaffPortal() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("results");
  const [selectedClass, setSelectedClass] = useState("Std 8");
  const [selectedTerm, setSelectedTerm] = useState("Term 1");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [marks, setMarks] = useState<Record<string, Record<string, number>>>({});
  const [savedStatus, setSavedStatus] = useState<Record<string, boolean>>({});

  const classStudents = studentAPI.getStudentsByClass(selectedClass).filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.admissionNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const newMarks: Record<string, Record<string, number>> = {};
    const studentsInClass = studentAPI.getStudentsByClass(selectedClass);
    studentsInClass.forEach(student => {
      const existingMarks = examResultsAPI.getResultsByStudent(selectedClass, selectedTerm, student.id);
      newMarks[student.id] = existingMarks || {};
    });
    setMarks(newMarks);
    setSavedStatus({});
  }, [selectedClass, selectedTerm]);

  const handleMarkChange = (studentId: string, subject: string, value: number) => {
    setMarks(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [subject]: value
      }
    }));
    setSavedStatus(prev => ({ ...prev, [studentId]: false }));
  };

  const saveStudentMarks = (studentId: string) => {
    const studentMarks = marks[studentId];
    if (studentMarks) {
      Object.entries(studentMarks).forEach(([subject, value]) => {
        examResultsAPI.saveMarks(selectedClass, selectedTerm, studentId, subject, value);
      });
      setSavedStatus(prev => ({ ...prev, [studentId]: true }));
      
      // Dispatch custom event to notify other components (like student results view)
      window.dispatchEvent(new CustomEvent('examResultsUpdated'));
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Premium Header with Smart Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Staff Portal</h1>
          <p className="text-slate-500 text-lg font-medium mt-1 uppercase tracking-widest text-[10px] bg-slate-100 w-fit px-2 rounded">Smart Educator Suite v2.0</p>
          
          <div className="flex flex-wrap gap-2 mt-6">
            <Button 
              onClick={() => setActiveTab("results")}
              variant={activeTab === "results" ? "default" : "secondary"}
              className={`font-bold transition-all ${activeTab === "results" ? "bg-green-700 hover:bg-green-800 shadow-md" : "bg-white border-slate-200 text-slate-600"}`}
            >
              <Award className="w-4 h-4 mr-2" /> Academic Results
            </Button>
            <Button 
              onClick={() => setActiveTab("homework")}
              variant={activeTab === "homework" ? "default" : "secondary"}
              className={`font-bold transition-all ${activeTab === "homework" ? "bg-indigo-700 hover:bg-indigo-800 shadow-md" : "bg-white border-slate-200 text-slate-600"}`}
            >
              <Wand2 className="w-4 h-4 mr-2" /> Smart Homework
            </Button>
            <Button 
              onClick={() => setActiveTab("attendance")}
              variant={activeTab === "attendance" ? "default" : "secondary"}
              className={`font-bold transition-all ${activeTab === "attendance" ? "bg-amber-600 hover:bg-amber-700 shadow-md" : "bg-white border-slate-200 text-slate-600"}`}
            >
              <Users className="w-4 h-4 mr-2" /> Smart Attendance
            </Button>
            <Button 
              onClick={() => setActiveTab("materials")}
              variant={activeTab === "materials" ? "default" : "secondary"}
              className={`font-bold transition-all ${activeTab === "materials" ? "bg-blue-600 hover:bg-blue-700 shadow-md" : "bg-white border-slate-200 text-slate-600"}`}
            >
              <BookOpen className="w-4 h-4 mr-2" /> Learning Lab
            </Button>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="font-bold border-gray-200">
            <Download className="w-4 h-4 mr-2" />
            Class Report
          </Button>
          <Button className="bg-green-700 hover:bg-green-800 text-white font-bold" onClick={() => setShowSuccess(true)}>
            <Save className="w-4 h-4 mr-2" />
            Sync All Data
          </Button>
        </div>
      </div>

      {showSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="font-medium">Success! All AI-generated records and results have been synchronized.</span>
        </div>
      )}

      {/* Conditional Content Based on Active Tab */}
      {activeTab === "results" && (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="space-y-4">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-3 border-b border-gray-50">
                <CardTitle className="text-lg">Filter & Search</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Select Class</label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Examination Term</label>
                  <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Term 1">Term 1, 2026</SelectItem>
                      <SelectItem value="Term 2">Term 2, 2026</SelectItem>
                      <SelectItem value="Term 3">Term 3, 2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Search Student</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input 
                      placeholder="Name or Adm No..." 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-gradient-to-br from-green-800 to-green-900 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10 blur-xl" />
              <CardContent className="p-6 relative z-10">
                <h4 className="font-bold flex items-center gap-2 mb-2">
                  <Bell className="w-4 h-4 text-amber-400" />
                  AI Insight
                </h4>
                <p className="text-sm text-green-50 mb-4 font-medium opacity-90 leading-relaxed">
                  Student performance in {selectedClass} is trending up by 4.2%. 
                  Use <strong>Smart Materials</strong> to maintain this momentum.
                </p>
                <Button 
                  onClick={() => setActiveTab("materials")}
                  variant="secondary" size="sm" className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white font-bold"
                >
                  Explore Materials
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="xl:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-none shadow-sm bg-green-50/50">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-xl text-green-600"><Award className="w-6 h-6" /></div>
                  <div>
                    <p className="text-sm font-bold text-green-700/70 uppercase tracking-tighter">Avg Score</p>
                    <h3 className="text-2xl font-black text-green-900">72.4%</h3>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-blue-50/50">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><TrendingUp className="w-6 h-6" /></div>
                  <div>
                    <p className="text-sm font-bold text-blue-700/70 uppercase tracking-tighter">Performance Trend</p>
                    <h3 className="text-2xl font-black text-blue-900">+4.2%</h3>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-purple-50/50" onClick={() => navigate("/dashboard/timetable-generator")}>
                <CardContent className="p-4 flex items-center gap-4 cursor-pointer group">
                  <div className="bg-purple-100 p-3 rounded-xl text-purple-600 group-hover:bg-purple-200 transition-colors"><Calendar className="w-6 h-6" /></div>
                  <div>
                    <p className="text-sm font-bold text-purple-700/70 uppercase tracking-tighter">Lessons Today</p>
                    <h3 className="text-2xl font-black text-purple-900">6 Lessons</h3>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-none shadow-sm overflow-hidden min-h-[600px]">
              <CardHeader className="bg-white border-b border-gray-100 flex flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle className="text-xl">Academic Results Entry</CardTitle>
                  <CardDescription>Direct grade management for {selectedClass}</CardDescription>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 border-none font-black text-[10px] tracking-widest px-3">SMART SYNC ACTIVE</Badge>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-50/50">
                    <TableRow>
                      <TableHead className="w-[200px] font-bold">Student Name</TableHead>
                      {subjects.map(subject => (
                        <TableHead key={subject} className="text-center font-bold px-2">{subject}</TableHead>
                      ))}
                      <TableHead className="text-center font-bold bg-indigo-50/30">Avg</TableHead>
                      <TableHead className="text-center font-bold bg-indigo-50/30">Grade</TableHead>
                      <TableHead className="text-right pr-6 font-bold">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classStudents.map(student => {
                      const studentMarks = marks[student.id] || {};
                      const isSaved = savedStatus[student.id];
                      const average = examResultsAPI.getStudentAverage(selectedClass, selectedTerm, student.id);
                      const grade = examResultsAPI.getStudentGrade(selectedClass, selectedTerm, student.id);

                      return (
                        <TableRow key={student.id} className="hover:bg-slate-50 transition-colors">
                          <TableCell className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs uppercase">
                                {student.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-bold text-gray-900">{student.name}</p>
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{student.admissionNo}</p>
                              </div>
                            </div>
                          </TableCell>
                          {subjects.map(subject => (
                            <TableCell key={subject} className="px-1 text-center">
                              <Input
                                type="number"
                                value={studentMarks[subject] || ''}
                                onChange={(e) => handleMarkChange(student.id, subject, parseInt(e.target.value) || 0)}
                                className={`w-14 mx-auto text-center font-bold h-9 bg-white transition-all ${
                                  (studentMarks[subject] || 0) < 40 ? 'text-rose-600 border-rose-200 bg-rose-50/30' : 
                                  (studentMarks[subject] || 0) >= 80 ? 'text-emerald-600 border-emerald-200' : 'text-gray-900 border-gray-100'
                                }`}
                              />
                            </TableCell>
                          ))}
                          <TableCell className="text-center bg-indigo-50/20">
                            <span className="text-base font-black text-indigo-700 tabular-nums">{average || '-'}</span>
                          </TableCell>
                          <TableCell className="text-center bg-indigo-50/20">
                            {grade ? (
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest ${
                                grade === "A" ? "bg-emerald-100 text-emerald-800" :
                                grade === "B" ? "bg-blue-100 text-blue-800" :
                                grade === "C" ? "bg-amber-100 text-amber-800" :
                                "bg-rose-100 text-rose-800"
                              }`}>
                                GRADE {grade}
                              </span>
                            ) : (
                              <span className="text-gray-300 font-bold">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right pr-6">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => saveStudentMarks(student.id)}
                              className={`h-8 w-8 p-0 rounded-full transition-all ${
                                isSaved ? "text-emerald-600" : "text-blue-600 hover:bg-blue-50"
                              }`}
                            >
                              {isSaved ? <CheckCircle className="w-5 h-5 shadow-sm" /> : <Save className="w-5 h-5" />}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "homework" && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          <Card className="border-none shadow-2xl bg-gradient-to-br from-indigo-800 via-indigo-900 to-slate-900 text-white overflow-hidden p-12 relative rounded-3xl">
            <div className="absolute top-0 right-0 -mt-24 -mr-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
              <div className="space-y-6 max-w-2xl">
                <Badge className="bg-amber-400 text-amber-900 border-none font-black px-4 py-1 uppercase tracking-widest text-[10px]">AI-Powered Generation</Badge>
                <h3 className="text-5xl font-black tracking-tight leading-none">Smart Homework Generator</h3>
                <p className="text-indigo-100/80 text-xl font-medium leading-relaxed">
                  Design high-impact, adaptive assignments that automatically target student weak spots based on recent exam data.
                </p>
                <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                  <Select defaultValue="Mathematics">
                    <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white font-bold h-12 rounded-xl">
                      <SelectValue placeholder="Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Button className="bg-amber-400 hover:bg-amber-500 text-amber-900 font-black h-12 px-8 rounded-xl shadow-lg flex items-center gap-2">
                    <Wand2 className="w-5 h-5" /> Generate Assignment
                  </Button>
                </div>
              </div>
              <div className="bg-white/5 p-16 rounded-[40px] border border-white/10 backdrop-blur-sm shadow-inner group">
                <BookMarked className="w-32 h-32 text-indigo-300 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4 hover:shadow-xl transition-all group cursor-pointer">
              <div className="bg-indigo-50 p-3 rounded-xl w-fit group-hover:bg-indigo-600 transition-colors">
                <FileText className="w-6 h-6 text-indigo-600 group-hover:text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-800">Adaptive Quizzes</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Auto-generate 10-20 questions varying in difficulty based on class performance.</p>
              <Button variant="link" className="p-0 font-black text-indigo-600 hover:no-underline flex items-center gap-1 group">
                Configure Quiz <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4 hover:shadow-xl transition-all group cursor-pointer">
              <div className="bg-emerald-50 p-3 rounded-xl w-fit group-hover:bg-emerald-600 transition-colors">
                <MonitorPlay className="w-6 h-6 text-emerald-600 group-hover:text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-800">Video Tasks</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Link video lessons from the Learning Lab with auto-generated reflection prompts.</p>
              <Button variant="link" className="p-0 font-black text-emerald-600 hover:no-underline flex items-center gap-1 group">
                Explore Resources <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4 hover:shadow-xl transition-all group cursor-pointer">
              <div className="bg-rose-50 p-3 rounded-xl w-fit group-hover:bg-rose-600 transition-colors">
                <BrainCircuit className="w-6 h-6 text-rose-600 group-hover:text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-800">Performance Link</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Tailor homework specifically for students needing extra support in certain topics.</p>
              <Button variant="link" className="p-0 font-black text-rose-600 hover:no-underline flex items-center gap-1 group">
                Analyze Trends <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "attendance" && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
           <Card className="border-none shadow-xl bg-white overflow-hidden rounded-3xl">
              <CardHeader className="bg-amber-600 p-10 text-white relative">
                <div className="absolute top-0 right-0 h-full w-1/3 bg-amber-500/30 skew-x-[-20deg] translate-x-12" />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h3 className="text-4xl font-black tracking-tight">Smart Attendance Tracker</h3>
                    <p className="text-amber-50 text-xl font-medium mt-2 opacity-90 italic">Intelligent verification for the modern classroom.</p>
                  </div>
                  <div className="bg-white/20 p-5 rounded-3xl backdrop-blur-md ring-4 ring-white/10">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-16 flex flex-col items-center justify-center text-center space-y-8">
                <div className="w-72 h-72 border-4 border-dashed border-amber-200 rounded-[50px] flex items-center justify-center relative group cursor-pointer hover:border-amber-600 transition-all duration-500">
                   <div className="absolute inset-4 bg-amber-50 rounded-[40px] opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-500" />
                   <div className="relative z-10 flex flex-col items-center gap-3">
                      <TrendingUp className="w-24 h-24 text-amber-200 group-hover:text-amber-600 transition-all rotate-45 group-hover:scale-110" />
                      <p className="font-black text-amber-600 text-sm tracking-[0.2em] animate-pulse">SYSTEM READY</p>
                   </div>
                   <Badge className="absolute top-[-10px] right-[-10px] bg-emerald-500 text-white font-black px-3 py-1.5 shadow-lg border-none">HD CAPTURE ACTIVE</Badge>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-slate-800 tracking-tight">Rapid Bulk Capture</h4>
                  <p className="max-w-xl text-slate-500 font-medium text-lg leading-relaxed mt-2">
                    Mark the entire class session in under 5 seconds. Our AI identifies absence patterns and sends instant alerts to student profiles.
                  </p>
                </div>
                <div className="flex gap-4">
                   <Button className="bg-amber-600 hover:bg-amber-700 font-black h-14 px-10 rounded-2xl shadow-xl shadow-amber-900/20 text-lg">Start Intelligent Scan</Button>
                   <Button variant="outline" className="border-2 border-amber-200 text-amber-900 hover:bg-amber-50 font-black h-14 px-10 rounded-2xl text-lg">Manual Bulk Entry</Button>
                </div>
              </CardContent>
           </Card>
        </div>
      )}

      {activeTab === "materials" && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pt-2 animate-in slide-in-from-bottom-4 duration-500">
           <Card className="xl:col-span-2 border-none shadow-xl bg-white overflow-hidden rounded-3xl">
              <CardHeader className="border-b border-gray-100 p-8 flex flex-row justify-between items-center bg-blue-50/30">
                <div>
                  <CardTitle className="text-3xl font-black flex items-center gap-3">
                    <BookOpen className="w-8 h-8 text-blue-600" /> Smart Learning Lab
                  </CardTitle>
                  <CardDescription className="text-blue-900/60 font-bold mt-1 uppercase tracking-widest text-[9px]">Resource Center & Digital Library</CardDescription>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 font-black gap-2 h-12 px-6 rounded-xl shadow-lg">
                  <Plus className="w-4 h-4" /> Upload Asset
                </Button>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { l: "Video Lessons", i: MonitorPlay, c: "text-rose-500" },
                      { l: "Digital Books", i: BookA, c: "text-blue-500" },
                      { l: "Quiz Sets", i: ClipboardCheck, c: "text-emerald-500" },
                      { l: "Flash Cards", i: BrainCircuit, c: "text-amber-500" },
                      { l: "Charts", i: TrendingUp, c: "text-indigo-500" },
                      { l: "Past Papers", i: FileText, c: "text-slate-500" },
                      { l: "Notes", i: PenTool, c: "text-purple-500" },
                      { l: "Audio Guides", i: Bell, c: "text-cyan-500" }
                    ].map(item => (
                      <div key={item.l} className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-blue-400 hover:bg-white hover:shadow-2xl transition-all cursor-pointer group text-center">
                        <item.i className={`w-10 h-10 ${item.c} mx-auto mb-3 group-hover:scale-110 transition-transform`} />
                        <p className="font-black text-slate-700 text-xs">{item.l}</p>
                      </div>
                    ))}
                 </div>
                 <div className="p-12 border-4 border-dashed border-blue-100 rounded-[50px] bg-blue-50/30 relative overflow-hidden group transition-all hover:bg-white hover:border-blue-400">
                    <div className="relative z-10 flex flex-col items-center gap-4">
                       <div className="bg-white p-4 rounded-full shadow-lg text-blue-600 mb-2"><Download className="w-10 h-10" /></div>
                       <h5 className="text-2xl font-black text-slate-800">Intelligent Asset Indexing</h5>
                       <p className="text-slate-500 font-medium max-w-sm text-center">Drag files here for automated curriculum tagging and indexing.</p>
                       <Button variant="link" className="text-blue-600 font-black text-lg p-0 hover:no-underline">Browse Archive</Button>
                    </div>
                 </div>
              </CardContent>
           </Card>

           <Card className="border-none shadow-xl bg-slate-900 text-white overflow-hidden flex flex-col pt-4 rounded-3xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-black flex items-center gap-2">
                  <BrainCircuit className="w-6 h-6 text-amber-400" /> AI Insights
                </CardTitle>
                <CardDescription className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Utilization Analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 flex-1 flex flex-col justify-center">
                <div className="space-y-3">
                   <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                     <span>Resource Coverage</span>
                     <span className="text-emerald-400">82%</span>
                   </div>
                   <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-green-400 w-[82%]" />
                   </div>
                </div>
                
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4 relative group hover:bg-white/10 transition-all">
                   <div className="absolute top-4 right-4 bg-amber-400 text-amber-900 text-[9px] font-black px-2 py-0.5 rounded-full ring-2 ring-slate-900 uppercase">Pro Tip</div>
                   <p className="text-xs font-black uppercase text-amber-400 flex items-center gap-2"><Wand2 className="w-3 h-3" /> Smart Recommendation</p>
                   <p className="text-sm font-medium leading-relaxed italic opacity-90 text-slate-100">
                     "Std 8 Science scores suggest a gap in 'Magnetism'. Our AI suggests more visual charts for this topic."
                   </p>
                   <Button size="sm" className="w-full bg-white text-slate-900 font-black hover:bg-slate-100 rounded-xl mt-4">Suggested Actions</Button>
                </div>
              </CardContent>
           </Card>
        </div>
      )}
    </div>
  );
}
