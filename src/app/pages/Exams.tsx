import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Download, Save, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { students, classes, subjects } from "../lib/mockData";
import { examResultsAPI, studentAPI } from "../lib/dataStore";

export default function Exams() {
  const [selectedClass, setSelectedClass] = useState("Std 8");
  const [selectedTerm, setSelectedTerm] = useState("Term 1");
  const role = localStorage.getItem("userRole") || "admin";

  const getGrade = (marks: number) => {
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    if (marks >= 50) return "D";
    return "E";
  };

  const classStudents = students.filter(s => s.class === selectedClass);

  // Teacher/Admin view - can edit marks with live saving
  if (role === "teacher" || role === "admin") {
    const [marks, setMarks] = useState<Record<string, Record<string, number>>>({});
    const [savedStatus, setSavedStatus] = useState<Record<string, boolean>>({});
    const [showSuccess, setShowSuccess] = useState(false);

    // Load existing marks when class/term changes
    useEffect(() => {
      const newMarks: Record<string, Record<string, number>> = {};
      classStudents.forEach(student => {
        const existingMarks = examResultsAPI.getResultsByStudent(selectedClass, selectedTerm, student.id);
        newMarks[student.id] = existingMarks || {};
      });
      setMarks(newMarks);
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
      examResultsAPI.saveResults(selectedClass, selectedTerm, studentId, marks[studentId] || {});
      setSavedStatus(prev => ({ ...prev, [studentId]: true }));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    };

    const saveAllMarks = () => {
      classStudents.forEach(student => {
        if (marks[student.id]) {
          examResultsAPI.saveResults(selectedClass, selectedTerm, student.id, marks[student.id]);
        }
      });
      setSavedStatus({});
      classStudents.forEach(s => setSavedStatus(prev => ({ ...prev, [s.id]: true })));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    };
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl">Exam Results Management</h1>
          <Button onClick={saveAllMarks} className="bg-green-700 hover:bg-green-800">
            <Save className="w-4 h-4 mr-2" />
            Save All Results
          </Button>
        </div>

        {showSuccess && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 animate-pulse">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-semibold">Results saved successfully! Students can now view their updated results.</span>
          </div>
        )}

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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classStudents.map(student => {
                const studentMarks = marks[student.id] || {};
                const isSaved = savedStatus[student.id];
                const average = examResultsAPI.getStudentAverage(selectedClass, selectedTerm, student.id);
                const grade = examResultsAPI.getStudentGrade(selectedClass, selectedTerm, student.id);

                return (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div>
                        <p className="font-semibold">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.admissionNo}</p>
                      </div>
                    </TableCell>
                    {subjects.map(subject => (
                      <TableCell key={subject}>
                        <Input
                          type="number"
                          value={studentMarks[subject] || ''}
                          onChange={(e) => handleMarkChange(student.id, subject, parseInt(e.target.value) || 0)}
                          className="w-20"
                          min="0"
                          max="100"
                          placeholder="-"
                        />
                      </TableCell>
                    ))}
                    <TableCell>
                      <span className="text-lg font-bold">{average || '-'}</span>
                    </TableCell>
                    <TableCell>
                      {grade ? (
                        <span className={`px-2 py-1 rounded ${
                          grade === "A" ? "bg-green-100 text-green-800" :
                          grade === "B" ? "bg-blue-100 text-blue-800" :
                          grade === "C" ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {grade}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => saveStudentMarks(student.id)}
                          className={isSaved ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"}
                        >
                          {isSaved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                        </Button>
                      </div>
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

  // Student/Parent view - read-only results from dataStore
  const loggedInAdmNo = localStorage.getItem("studentID") || "KPS001";
  const student = studentAPI.getAllStudents().find(s => s.admissionNo === loggedInAdmNo) || studentAPI.getAllStudents()[0];
  const studentId = student.id;
  const studentClass = student.class;
  const [studentResults, setStudentResults] = useState<Record<string, number> | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Listen for updates from teachers
  useEffect(() => {
    const handleUpdate = () => {
      setRefreshKey(prev => prev + 1);
    };
    
    window.addEventListener('examResultsUpdated', handleUpdate);
    return () => window.removeEventListener('examResultsUpdated', handleUpdate);
  }, []);

  // Load student results
  useEffect(() => {
    const results = examResultsAPI.getResultsByStudent(studentClass, selectedTerm, studentId);
    setStudentResults(results);
  }, [selectedTerm, refreshKey]);
  const averageMarks = examResultsAPI.getStudentAverage(studentClass, selectedTerm, studentId);
  const overallGrade = examResultsAPI.getStudentGrade(studentClass, selectedTerm, studentId);

  return (
    <div>
      <h1 className="text-3xl mb-6">{role === "parent" ? "Student Results" : "My Results"}</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex gap-4">
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
              Download Report
            </Button>
          </div>
        </div>
      </div>

      {role === "student" && selectedTerm === "Term 1" && (
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-lg">Term 1, 2026 - Academic Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Keep up the good work! Your performance has improved by 5% from last term.
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Student Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-semibold">{student.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Admission No</p>
              <p className="font-semibold">{student.admissionNo}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Class</p>
              <p className="font-semibold">{student.class}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Term</p>
              <p className="font-semibold">{selectedTerm}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Marks</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((subject, idx) => {
              const mark = studentResults ? studentResults[subject] : 0;
              const grade = getGrade(mark);
              const remarks = mark >= 80 ? "Excellent" : mark >= 70 ? "Very Good" : mark >= 60 ? "Good" : mark >= 50 ? "Satisfactory" : mark > 0 ? "Needs Improvement" : "-";

              return (
                <TableRow key={idx}>
                  <TableCell className="font-semibold">{subject}</TableCell>
                  <TableCell>
                    <span className={`text-lg font-bold ${mark > 0 ? '' : 'text-gray-300'}`}>{mark || '-'}</span>
                    <span className="text-gray-500 text-sm">/100</span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      mark === 0 ? "bg-gray-100 text-gray-400" :
                      grade === "A" ? "bg-green-100 text-green-800" :
                      grade === "B" ? "bg-blue-100 text-blue-800" :
                      grade === "C" ? "bg-yellow-100 text-yellow-800" :
                      grade === "D" ? "bg-orange-100 text-orange-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {mark > 0 ? grade : "-"}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm">{remarks}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <Card className="mt-6 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-lg">Overall Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Average Marks</p>
              <p className="text-3xl font-bold text-green-700">{averageMarks || '-'}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Overall Grade</p>
              <p className="text-3xl font-bold text-blue-700">{overallGrade || '-'}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Class Position</p>
              <p className="text-3xl font-bold text-purple-700">--</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
