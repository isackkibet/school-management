export const classes = ["PP1", "PP2", "Std 1", "Std 2", "Std 3", "Std 4", "Std 5", "Std 6", "Std 7", "Std 8"];

export const subjects = ["English", "Kiswahili", "Mathematics", "Science", "Social Studies", "CRE"];

export const students = [
  {
    id: "001",
    admissionNo: "KPS001",
    name: "Brian Kiprop",
    class: "Std 8",
    parent: "Peter Kiprop",
    phone: "0712345678",
    village: "Kapkwen",
    dob: "2012-03-15",
    gender: "Male",
    balance: 2500,
  },
  {
    id: "002",
    admissionNo: "KPS002",
    name: "Faith Chebet",
    class: "Std 7",
    parent: "Jane Chebet",
    phone: "0723456789",
    village: "Kapsirwo",
    dob: "2013-07-22",
    gender: "Female",
    balance: 0,
  },
  {
    id: "003",
    admissionNo: "KPS003",
    name: "Emmanuel Kibet",
    class: "Std 6",
    parent: "John Kibet",
    phone: "0734567890",
    village: "Kapkwen",
    dob: "2014-01-10",
    gender: "Male",
    balance: 5000,
  },
];

export const attendance = [
  { studentId: "001", date: "2026-04-07", status: "Present" },
  { studentId: "002", date: "2026-04-07", status: "Absent" },
  { studentId: "003", date: "2026-04-07", status: "Present" },
];

export const fees = [
  { type: "Uniform", amount: 2000, required: true },
  { type: "Lunch", amount: 3000, required: true },
  { type: "Activities", amount: 1500, required: false },
  { type: "Trips", amount: 2500, required: false },
  { type: "Extra Tuition", amount: 2000, required: false },
];
