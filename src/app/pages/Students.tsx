import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Download, Edit, Eye, Mail, Plus, Search, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { ApiError } from "../lib/api";
import { getStoredUser, roleToPortalRole } from "../lib/auth";
import { createStudent, fetchClasses, fetchStudents, getStudentBalance, type SchoolClass, type StudentRecord } from "../lib/students";

const initialForm = {
  studentId: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "student123",
  phone: "",
  address: "",
  dateOfBirth: "",
  gender: "",
  classId: "",
  guardianName: "",
  guardianPhone: "",
};

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [form, setForm] = useState(initialForm);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const canRegisterStudents = roleToPortalRole(getStoredUser()?.role) === "admin";

  const loadData = async () => {
    setIsLoading(true);
    setError("");

    try {
      const [studentData, classData] = await Promise.all([
        fetchStudents(),
        fetchClasses(),
      ]);
      setStudents(studentData);
      setClasses(classData);
      setSuccess("Student records loaded from server.");
    } catch (err) {
      setError(getErrorMessage(err, "Student records could not be loaded."));
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredStudents = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return students.filter((student) => {
      const fullName = `${student.user.firstName} ${student.user.lastName}`.toLowerCase();
      return fullName.includes(term) || student.studentId.toLowerCase().includes(term);
    });
  }, [searchTerm, students]);

  const updateForm = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.classId) {
      setFormError("First name, last name, email, and class are required.");
      setFormSuccess("");
      return;
    }

    setIsSubmitting(true);
    setFormError("");
    setFormSuccess("Sending student registration to the server...");

    try {
      const student = await createStudent({
        studentId: form.studentId.trim() || undefined,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password || "student123",
        phone: form.phone.trim(),
        address: form.address.trim(),
        dateOfBirth: form.dateOfBirth || undefined,
        gender: form.gender || null,
        classId: form.classId,
        guardianName: form.guardianName.trim(),
        guardianPhone: form.guardianPhone.trim(),
      });

      setStudents((current) => [student, ...current]);
      setForm(initialForm);
      setFormSuccess(`Registered ${student.user.firstName} ${student.user.lastName} successfully.`);
      setSuccess("Student list updated from the server response.");
      window.setTimeout(() => {
        setOpen(false);
        setFormSuccess("");
      }, 900);
    } catch (err) {
      setFormError(getErrorMessage(err, "Student could not be registered."));
      setFormSuccess("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExport = () => {
    const header = ["Admission No", "Name", "Email", "Class", "Gender", "Parent", "Contact", "Balance"];
    const rows = filteredStudents.map((student) => [
      student.studentId,
      `${student.user.firstName} ${student.user.lastName}`,
      student.user.email,
      `${student.class.name}${student.class.section ? ` ${student.class.section}` : ""}`,
      formatGender(student.user.gender),
      student.guardianName || "",
      student.guardianPhone || student.user.phone || "",
      getStudentBalance(student).toString(),
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "students-export.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

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
            <Button type="button" onClick={handleExport} variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              {canRegisterStudents ? (
                <DialogTrigger asChild>
                  <Button className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg font-semibold transition-all hover:scale-105 duration-200">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Student
                  </Button>
                </DialogTrigger>
              ) : (
                <Button type="button" disabled className="bg-white/70 text-blue-700 font-semibold">
                  <Plus className="w-4 h-4 mr-2" />
                  Admin Only
                </Button>
              )}
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl">Register Student</DialogTitle>
                </DialogHeader>

                {formError && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-3 text-sm font-bold text-red-700">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    {formError}
                  </div>
                )}
                {formSuccess && (
                  <div className="flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-3 text-sm font-bold text-green-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    {formSuccess}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
                  <Field label="Admission Number">
                    <Input value={form.studentId} onChange={(event) => updateForm("studentId", event.target.value)} placeholder="Auto-generated if empty" className="h-11" />
                  </Field>
                  <Field label="Class">
                    <Select value={form.classId} onValueChange={(value) => updateForm("classId", value)}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}{item.section ? ` ${item.section}` : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="First Name">
                    <Input value={form.firstName} onChange={(event) => updateForm("firstName", event.target.value)} placeholder="Brian" className="h-11" />
                  </Field>
                  <Field label="Last Name">
                    <Input value={form.lastName} onChange={(event) => updateForm("lastName", event.target.value)} placeholder="Kiprop" className="h-11" />
                  </Field>
                  <Field label="Email">
                    <Input type="email" value={form.email} onChange={(event) => updateForm("email", event.target.value)} placeholder="student@school.com" className="h-11" />
                  </Field>
                  <Field label="Temporary Password">
                    <Input value={form.password} onChange={(event) => updateForm("password", event.target.value)} placeholder="student123" className="h-11" />
                  </Field>
                  <Field label="Gender">
                    <Select value={form.gender} onValueChange={(value) => updateForm("gender", value)}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Date of Birth">
                    <Input type="date" value={form.dateOfBirth} onChange={(event) => updateForm("dateOfBirth", event.target.value)} className="h-11" />
                  </Field>
                  <Field label="Village / Address">
                    <Input value={form.address} onChange={(event) => updateForm("address", event.target.value)} placeholder="Enter village" className="h-11" />
                  </Field>
                  <Field label="Student Phone">
                    <Input value={form.phone} onChange={(event) => updateForm("phone", event.target.value)} placeholder="Optional" className="h-11" />
                  </Field>
                  <Field label="Parent Name">
                    <Input value={form.guardianName} onChange={(event) => updateForm("guardianName", event.target.value)} placeholder="Parent or guardian" className="h-11" />
                  </Field>
                  <Field label="Parent Phone">
                    <Input value={form.guardianPhone} onChange={(event) => updateForm("guardianPhone", event.target.value)} placeholder="07XXXXXXXX" className="h-11" />
                  </Field>
                  <div className="sm:col-span-2 pt-2">
                    <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base font-semibold shadow-md">
                      {isSubmitting ? "Registering Student..." : "Register Student"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {(error || success) && (
        <div className={`rounded-xl border p-4 text-sm font-bold ${error ? "border-red-100 bg-red-50 text-red-700" : "border-green-100 bg-green-50 text-green-700"}`}>
          {error || success}
        </div>
      )}

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
          {isLoading ? "Loading students..." : <>Showing <span className="text-gray-900">{filteredStudents.length}</span> students</>}
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
                filteredStudents.map((student) => {
                  const balance = getStudentBalance(student);
                  const name = `${student.user.firstName} ${student.user.lastName}`;
                  return (
                    <TableRow key={student.id} className="group hover:bg-blue-50/30 transition-colors">
                      <TableCell className="font-medium text-gray-900">{student.studentId}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shadow-sm">
                            {student.user.firstName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{name}</div>
                            <div className="text-xs text-gray-400">{student.user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-gray-100 text-gray-700 font-medium">
                          {student.class.name}{student.class.section ? ` ${student.class.section}` : ""}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-600">{formatGender(student.user.gender)}</TableCell>
                      <TableCell className="hidden lg:table-cell text-gray-600">{student.guardianName || "Not set"}</TableCell>
                      <TableCell className="hidden lg:table-cell text-gray-600">{student.guardianPhone || student.user.phone || "Not set"}</TableCell>
                      <TableCell>
                        <Badge variant={balance > 0 ? "destructive" : "default"} className={balance > 0 ? "bg-red-50 text-red-700 hover:bg-red-100 border-red-200" : "bg-green-50 text-green-700 hover:bg-green-100 border-green-200"}>
                          KSh {balance.toLocaleString()}
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
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center text-gray-500">
                    {isLoading ? "Loading students from server..." : "No students found matching your search."}
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

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function formatGender(gender?: string | null) {
  if (!gender) return "Not set";
  return gender.charAt(0) + gender.slice(1).toLowerCase();
}

function getErrorMessage(err: unknown, fallback: string) {
  if (err instanceof ApiError) return err.message;
  if (err instanceof TypeError) return "Cannot reach the server. Make sure the backend is running on port 5000.";
  if (err instanceof Error) return err.message;
  return fallback;
}
