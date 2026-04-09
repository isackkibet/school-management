import { useState } from "react";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { CalendarIcon, Save } from "lucide-react";
import { format } from "date-fns";
import { students, classes } from "../lib/mockData";

export default function Attendance() {
  const [selectedClass, setSelectedClass] = useState("Std 8");
  const [date, setDate] = useState<Date>(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, string>>({});

  const classStudents = students.filter(s => s.class === selectedClass);

  const handleAttendanceChange = (studentId: string, status: string) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSave = () => {
    alert("Attendance saved successfully!");
  };

  return (
    <div>
      <h1 className="text-3xl mb-6">Attendance Management</h1>

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
