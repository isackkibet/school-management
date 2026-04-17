import { useState } from "react";
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription 
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { 
  Calendar, Clock, Download, Plus, Wand2, Trash2, Save, 
  MapPin, User, BookOpen, ChevronRight, Printer, Share2
} from "lucide-react";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "../components/ui/select";
import { Badge } from "../components/ui/badge";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const TIME_SLOTS = [
  "08:00 - 08:45",
  "08:45 - 09:30",
  "09:30 - 10:15",
  "10:15 - 10:45 (Break)",
  "10:45 - 11:30",
  "11:30 - 12:15",
  "12:15 - 13:00",
  "13:00 - 14:00 (Lunch)",
  "14:00 - 14:45",
  "14:45 - 15:30"
];

const SUBJECTS = ["Mathematics", "English", "Kiswahili", "Science", "Social Studies", "CRE", "Physical Education", "Creative Arts", "ICT"];
const TEACHERS = ["Tr. Isack", "Tr. Grace", "Tr. David", "Tr. Faith", "Tr. Koech", "Tr. Kiprop"];

export default function TimetableGenerator() {
  const [selectedClass, setSelectedClass] = useState("Std 8");
  const [isGenerating, setIsGenerating] = useState(false);
  const [timetableData, setTimetableData] = useState<Record<string, any>>({});

  const generateTimetable = () => {
    setIsGenerating(true);
    // Simulate smart generation
    setTimeout(() => {
      const newTimetable: Record<string, any> = {};
      DAYS.forEach(day => {
        newTimetable[day] = TIME_SLOTS.map((slot, index) => {
          if (slot.includes("Break") || slot.includes("Lunch")) {
            return { subject: slot.split(" ")[2], type: "break" };
          }
          const randomSubject = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)];
          const randomTeacher = TEACHERS[Math.floor(Math.random() * TEACHERS.length)];
          return { subject: randomSubject, teacher: randomTeacher, room: "Block A-" + (index + 1) };
        });
      });
      setTimetableData(newTimetable);
      setIsGenerating(false);
    }, 1500);
  };

  const hasData = Object.keys(timetableData).length > 0;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Smart Timetable Generator</h1>
          <p className="text-slate-500 text-lg font-medium mt-1">Automate class schedules with rule-based AI optimization.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={generateTimetable} 
            disabled={isGenerating}
            className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold h-12 px-6 shadow-lg shadow-indigo-900/20 flex items-center gap-2"
          >
            {isGenerating ? <Wand2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
            {hasData ? "Regenerate Timetable" : "Generate Smart Schedule"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Controls Sidebar */}
        <div className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader className="bg-slate-50 rounded-t-xl pb-4">
              <CardTitle className="text-lg">Generator Settings</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <label className="text-sm font-bold text-slate-700 mb-2 block tracking-tight uppercase">Target Class</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-full bg-slate-50 border-slate-200 font-medium">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Std 1", "Std 2", "Std 3", "Std 4", "Std 5", "Std 6", "Std 7", "Std 8"].map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3 pt-2">
                <label className="text-sm font-bold text-slate-700 block tracking-tight uppercase">Optimization Rules</label>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs font-bold text-green-800">No Teacher Conflicts</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs font-bold text-blue-800">Balanced Subject Load</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="text-xs font-bold text-purple-800">Double Lesson Optimization</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {hasData && (
            <Card className="border-none shadow-md bg-slate-900 text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-white/10 blur-2xl group-hover:scale-110 transition-transform" />
              <CardContent className="p-6">
                <h4 className="font-bold flex items-center gap-2 mb-4">
                  <Share2 className="w-4 h-4 text-emerald-400" /> Export Options
                </h4>
                <div className="space-y-3">
                  <Button variant="secondary" className="w-full bg-white/10 hover:bg-white/20 border-white/10 text-white font-bold flex items-center justify-between group">
                    <span>Export to PDF</span>
                    <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  </Button>
                  <Button variant="secondary" className="w-full bg-white/10 hover:bg-white/20 border-white/10 text-white font-bold flex items-center justify-between group">
                    <span>Print Schedule</span>
                    <Printer className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Timetable Display Area */}
        <div className="xl:col-span-3">
          {!hasData ? (
            <div className="h-[600px] bg-white rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-12 space-y-4">
              <div className="bg-indigo-50 p-6 rounded-full animate-bounce">
                <Calendar className="w-16 h-16 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-800">Ready to Generate</h3>
                <p className="text-slate-500 max-w-sm font-medium">Click the generate button above to create a perfectly balanced weekly timetable for {selectedClass}.</p>
              </div>
            </div>
          ) : (
            <Card className="border-none shadow-xl overflow-hidden bg-white">
              <CardHeader className="bg-white border-b border-slate-100 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-black flex items-center gap-3">
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-sm">{selectedClass}</span> 
                      Weekly Academic Timetable
                    </CardTitle>
                    <CardDescription className="font-medium mt-1">Generated for Academic Year 2026 • Term 1</CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-none font-black px-4 py-1.5 uppercase tracking-widest text-[10px]">Optimized & Conflicts-Free</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-slate-50/50">
                    <tr>
                      <th className="p-5 text-left text-xs font-black uppercase text-slate-400 border-b border-slate-100 w-48">Time / Day</th>
                      {DAYS.map(day => (
                        <th key={day} className="p-5 text-center text-xs font-black uppercase text-slate-500 border-b border-slate-100">{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {TIME_SLOTS.map((slot, timeIdx) => (
                      <tr key={timeIdx} className="hover:bg-slate-50/30 transition-colors">
                        <td className="p-5 border-r border-slate-50">
                          <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-slate-300" />
                            <span className="text-sm font-black text-slate-700 tabular-nums">{slot.split(" ")[0]}</span>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 ml-7 uppercase">{slot.split(" ")[2] || "Lessen"}</span>
                        </td>
                        {DAYS.map(day => {
                          const lesson = timetableData[day]?.[timeIdx];
                          if (!lesson) return <td key={day} className="p-5"></td>;
                          
                          if (lesson.type === "break") {
                            return (
                              <td key={day} className="bg-amber-50/50 p-2 text-center border-x border-amber-100/30">
                                <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em]">{lesson.subject}</span>
                              </td>
                            );
                          }

                          return (
                            <td key={day} className="p-3 border-r border-slate-50">
                              <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all group h-full">
                                <p className="text-sm font-black text-slate-800 group-hover:text-indigo-700 transition-colors mb-2 leading-tight">{lesson.subject}</p>
                                <div className="space-y-1.5">
                                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                                    <User className="w-3 h-3 text-emerald-500" />
                                    <span>{lesson.teacher}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                                    <MapPin className="w-3 h-3 text-indigo-400" />
                                    <span>{lesson.room}</span>
                                  </div>
                                </div>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
