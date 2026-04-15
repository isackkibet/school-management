import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { CalendarIcon, Save, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { students, classes } from "../lib/mockData";
import { attendanceAPI, studentAPI } from "../lib/dataStore";

export default function Attendance() {
  const [selectedClass, setSelectedClass] = useState("Std 8");
  const [date, setDate] = useState<Date>(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, { status: string; time: string }>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const role = localStorage.getItem("userRole") || "admin";

  const classStudents = studentAPI.getStudentsByClass(selectedClass);
  const dateStr = format(date, "yyyy-MM-dd");

  // Load existing attendance when date/class changes
  useEffect(() => {
    const existingRecords = attendanceAPI.getAttendanceByDate(dateStr);
    setAttendanceRecords(existingRecords);
  }, [dateStr, selectedClass]);

  const handleAttendanceChange = (studentId: string, status: string) => {
    const currentTime = format(new Date(), "hh:mm a");
    setAttendanceRecords(prev => ({
      ...prev,
      [studentId]: { status, time: status === "Absent" ? "-" : currentTime }
    }));
  };

  const handleSave = () => {
    attendanceAPI.markBulkAttendance(dateStr, attendanceRecords);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Student view - see own attendance
  if (role === "student" || role === "parent") {
    const studentId = "001"; // Would come from authenticated user
    const studentAttendance = attendanceAPI.getStudentAttendance(studentId);
    const stats = attendanceAPI.getAttendanceStats(studentId);

    return (
      <div>
        <h1 className="text-3xl mb-6">{role === "parent" ? "Student Attendance" : "My Attendance"}</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-500 mb-1">Total Days</p>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-green-600 mb-1">Present</p>
            <p className="text-3xl font-bold text-green-600">{stats.present}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-red-600 mb-1">Absent</p>
            <p className="text-3xl font-bold text-red-600">{stats.absent}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-blue-600 mb-1">Attendance %</p>
            <p className="text-3xl font-bold text-blue-600">{stats.percentage}%</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentAttendance.map((record: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell>{format(new Date(record.date), "PPP")}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        record.status === "Present" ? "default" :
                        record.status === "Late" ? "secondary" : "destructive"
                      }
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {record.time}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl">Attendance Management</h1>
        <Button onClick={handleSave} className="bg-green-700 hover:bg-green-800">
          <Save className="w-4 h-4 mr-2" />
          Save Attendance
        </Button>
      </div>
    
      {showSuccess && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 animate-pulse">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-800 font-semibold">Attendance saved successfully! Students can now view their attendance.</span>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="text-sm mb-2 block">Select Class</label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {classes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="text-sm mb-2 block">Select Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} />
              </PopoverContent>
            </Popover>
          </div>
          <Button onClick={handleSave} className="bg-green-700 hover:bg-green-800">
            <Save className="w-4 h-4 mr-2" />
            Save Attendance
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Adm No</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classStudents.map(student => (
              <TableRow key={student.id}>
                <TableCell>{student.admissionNo}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Badge
                      variant={attendanceRecords[student.id] === "Present" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleAttendanceChange(student.id, "Present")}
                    >
                      Present
                    </Badge>
                    <Badge
                      variant={attendanceRecords[student.id] === "Absent" ? "destructive" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleAttendanceChange(student.id, "Absent")}
                    >
                      Absent
                    </Badge>
                    <Badge
                      variant={attendanceRecords[student.id] === "Late" ? "secondary" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleAttendanceChange(student.id, "Late")}
                    >
                      Late
                    </Badge>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
