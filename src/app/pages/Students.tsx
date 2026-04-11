import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Plus, Search, Download, Users, Eye, Edit, Mail } from "lucide-react";
import { students, classes } from "../lib/mockData";
import { Badge } from "../components/ui/badge";

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.admissionNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-8">
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl p-8 mb-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        <div className="flex flex-col md:flex-row md:items-center justify-between relative z-10 gap-4">
          <div className="flex items-center gap-5">
            <div className="bg-white/20 backdrop-blur-md text-white rounded-2xl w-16 h-16 flex items-center justify-center border border-white/20 shadow-inner">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-1">Student Management</h1>
              <p className="text-blue-100 font-medium">Manage student records, features and enrollments</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg font-semibold transition-all hover:scale-105 duration-200">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl">Add New Student</DialogTitle>
                </DialogHeader>
                <form className="grid grid-cols-2 gap-5 mt-4">
                  <div className="space-y-2">
                    <Label>Admission Number</Label>
                    <Input placeholder="KPS001" className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input placeholder="Enter full name" className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label>Class</Label>
                    <Select>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Input type="date" className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label>Village</Label>
                    <Input placeholder="Enter village" className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label>Parent Name</Label>
                    <Input placeholder="Enter parent name" className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label>Parent Phone</Label>
                    <Input placeholder="07XXXXXXXX" className="h-11" />
                  </div>
                  <div className="col-span-2 pt-2">
                    <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base font-semibold shadow-md">
                      Register Student
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search by name or admission number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-11 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg w-full bg-gray-50/50"
          />
        </div>
        <div className="text-sm font-medium text-gray-500">
          Showing <span className="text-gray-900">{filteredStudents.length}</span> students
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/80">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold text-gray-600 h-14">Adm No</TableHead>
                <TableHead className="font-semibold text-gray-600">Student Profile</TableHead>
                <TableHead className="font-semibold text-gray-600">Class</TableHead>
                <TableHead className="font-semibold text-gray-600 hidden md:table-cell">Gender</TableHead>
                <TableHead className="font-semibold text-gray-600 hidden lg:table-cell">Parent</TableHead>
                <TableHead className="font-semibold text-gray-600 hidden px-2 lg:table-cell">Contact</TableHead>
                <TableHead className="font-semibold text-gray-600">Balance</TableHead>
                <TableHead className="font-semibold text-gray-600 text-right pr-6">Features</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <TableRow key={student.id} className="group hover:bg-blue-50/30 transition-colors">
                    <TableCell className="font-medium text-gray-900">{student.admissionNo}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shadow-sm">
                          {student.name.charAt(0)}
                        </div>
                        <div className="font-semibold text-gray-800">{student.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700 font-medium">
                        {student.class}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-gray-600">{student.gender}</TableCell>
                    <TableCell className="hidden lg:table-cell text-gray-600">{student.parent}</TableCell>
                    <TableCell className="hidden lg:table-cell text-gray-600">{student.phone}</TableCell>
                    <TableCell>
                      <Badge variant={student.balance > 0 ? "destructive" : "default"} className={student.balance > 0 ? "bg-red-50 text-red-700 hover:bg-red-100 border-red-200" : "bg-green-50 text-green-700 hover:bg-green-100 border-green-200"}>
                        KSh {student.balance.toLocaleString()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex items-center justify-end gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-full" title="View Grades & Attendance">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full" title="Message Parent">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-orange-500 hover:text-orange-600 hover:bg-orange-100 rounded-full" title="Edit Student">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center text-gray-500">
                    No students found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
