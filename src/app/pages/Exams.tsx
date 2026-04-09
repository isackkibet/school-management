import { useState } from "react";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Download } from "lucide-react";
import { students, classes, subjects } from "../lib/mockData";

export default function Exams() {
  const [selectedClass, setSelectedClass] = useState("Std 8");
  const [selectedTerm, setSelectedTerm] = useState("Term 1");

  const getGrade = (marks: number) => {
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    if (marks >= 50) return "D";
    return "E";
  };

  const classStudents = students.filter(s => s.class === selectedClass);

  return (
    <div>
      <h1 className="text-3xl mb-6">Exam Management</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex gap-4">
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
            <label className="text-sm mb-2 block">Select Term</label>
            <Select value={selectedTerm} onValueChange={setSelectedTerm}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Term 1">Term 1</SelectItem>
                <SelectItem value="Term 2">Term 2</SelectItem>
                <SelectItem value="Term 3">Term 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Generate Reports
            </Button>
          </div>
        </div>
      </div>

      {selectedClass === "Std 8" && (
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-lg">KCPE Prediction</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Based on current exam averages, students in Class 8 can view their predicted KCPE scores.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              {subjects.map(subject => (
                <TableHead key={subject}>{subject}</TableHead>
              ))}
              <TableHead>Average</TableHead>
              <TableHead>Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classStudents.map(student => {
              const mockMarks = subjects.map(() => Math.floor(Math.random() * 40) + 60);
              const average = Math.round(mockMarks.reduce((a, b) => a + b, 0) / subjects.length);
              const grade = getGrade(average);

              return (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  {mockMarks.map((mark, idx) => (
                    <TableCell key={idx}>
                      <Input
                        type="number"
                        defaultValue={mark}
                        className="w-20"
                        min="0"
                        max="100"
                      />
                    </TableCell>
                  ))}
                  <TableCell>{average}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded ${
                      grade === "A" ? "bg-green-100 text-green-800" :
                      grade === "B" ? "bg-blue-100 text-blue-800" :
                      grade === "C" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {grade}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
