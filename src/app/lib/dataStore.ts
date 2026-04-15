// Centralized Data Store for Real-time Updates
// This manages all data that teachers can update and students can view

const STORAGE_KEYS = {
  EXAM_RESULTS: 'sms_exam_results',
  ATTENDANCE: 'sms_attendance',
  STUDENTS: 'sms_students',
};

// Initialize data from mockData or localStorage
export const initDataStore = () => {
  // Initialize exam results if not exists
  if (!localStorage.getItem(STORAGE_KEYS.EXAM_RESULTS)) {
    const initialResults = {
      "Std 8": {
        "Term 1": {
          "001": { English: 85, Kiswahili: 78, Mathematics: 92, Science: 88, "Social Studies": 75, CRE: 80 },
          "002": { English: 72, Kiswahili: 85, Mathematics: 68, Science: 79, "Social Studies": 82, CRE: 88 },
          "003": { English: 65, Kiswahili: 70, Mathematics: 75, Science: 68, "Social Studies": 72, CRE: 69 },
        },
        "Term 2": {},
        "Term 3": {},
      },
      "Std 7": {
        "Term 1": {
          "002": { English: 80, Kiswahili: 82, Mathematics: 76, Science: 85, "Social Studies": 78, CRE: 84 },
        },
        "Term 2": {},
        "Term 3": {},
      },
    };
    localStorage.setItem(STORAGE_KEYS.EXAM_RESULTS, JSON.stringify(initialResults));
  }

  // Initialize attendance if not exists
  if (!localStorage.getItem(STORAGE_KEYS.ATTENDANCE)) {
    const today = new Date().toISOString().split('T')[0];
    const initialAttendance = {
      [today]: {
        "001": { status: "Present", time: "07:45 AM" },
        "002": { status: "Absent", time: "-" },
        "003": { status: "Present", time: "07:50 AM" },
      },
    };
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(initialAttendance));
  }
};

// Exam Results Management
export const examResultsAPI = {
  getAllResults: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.EXAM_RESULTS) || '{}');
  },

  getResultsByClass: (className: string) => {
    const allResults = examResultsAPI.getAllResults();
    return allResults[className] || {};
  },

  getResultsByStudent: (className: string, term: string, studentId: string) => {
    const allResults = examResultsAPI.getAllResults();
    return allResults[className]?.[term]?.[studentId] || null;
  },

  saveResults: (className: string, term: string, studentId: string, marks: Record<string, number>) => {
    const allResults = examResultsAPI.getAllResults();
    
    if (!allResults[className]) allResults[className] = {};
    if (!allResults[className][term]) allResults[className][term] = {};
    
    allResults[className][term][studentId] = marks;
    localStorage.setItem(STORAGE_KEYS.EXAM_RESULTS, JSON.stringify(allResults));
    
    // Trigger update event for real-time sync
    window.dispatchEvent(new CustomEvent('examResultsUpdated', { 
      detail: { className, term, studentId, marks } 
    }));
    
    return allResults[className][term][studentId];
  },

  getStudentAverage: (className: string, term: string, studentId: string) => {
    const marks = examResultsAPI.getResultsByStudent(className, term, studentId);
    if (!marks) return 0;
    
    const values = Object.values(marks);
    if (values.length === 0) return 0;
    
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  },

  getStudentGrade: (className: string, term: string, studentId: string) => {
    const average = examResultsAPI.getStudentAverage(className, term, studentId);
    if (average >= 80) return "A";
    if (average >= 70) return "B";
    if (average >= 60) return "C";
    if (average >= 50) return "D";
    return "E";
  },
};

// Attendance Management
export const attendanceAPI = {
  getAllAttendance: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ATTENDANCE) || '{}');
  },

  getAttendanceByDate: (date: string) => {
    const allAttendance = attendanceAPI.getAllAttendance();
    return allAttendance[date] || {};
  },

  getStudentAttendance: (studentId: string) => {
    const allAttendance = attendanceAPI.getAllAttendance();
    const studentRecords: any[] = [];
    
    Object.entries(allAttendance).forEach(([date, records]: [string, any]) => {
      if (records[studentId]) {
        studentRecords.push({ date, ...records[studentId] });
      }
    });
    
    return studentRecords.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  markAttendance: (date: string, studentId: string, status: string, time: string) => {
    const allAttendance = attendanceAPI.getAllAttendance();
    
    if (!allAttendance[date]) allAttendance[date] = {};
    
    allAttendance[date][studentId] = { status, time };
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(allAttendance));
    
    // Trigger update event
    window.dispatchEvent(new CustomEvent('attendanceUpdated', { 
      detail: { date, studentId, status, time } 
    }));
    
    return allAttendance[date][studentId];
  },

  markBulkAttendance: (date: string, records: Record<string, { status: string; time: string }>) => {
    const allAttendance = attendanceAPI.getAllAttendance();
    allAttendance[date] = records;
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(allAttendance));
    
    window.dispatchEvent(new CustomEvent('attendanceUpdated', { 
      detail: { date, records } 
    }));
    
    return allAttendance[date];
  },

  getAttendanceStats: (studentId: string) => {
    const records = attendanceAPI.getStudentAttendance(studentId);
    const total = records.length;
    const present = records.filter(r => r.status === "Present").length;
    const absent = records.filter(r => r.status === "Absent").length;
    const late = records.filter(r => r.status === "Late").length;
    
    return {
      total,
      present,
      absent,
      late,
      percentage: total > 0 ? Math.round((present / total) * 100) : 0,
    };
  },
};

// Student Management
export const studentAPI = {
  getAllStudents: () => {
    const students = [
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
    return students;
  },

  getStudentsByClass: (className: string) => {
    return studentAPI.getAllStudents().filter(s => s.class === className);
  },

  getStudentById: (studentId: string) => {
    return studentAPI.getAllStudents().find(s => s.id === studentId);
  },
};

// Initialize on load
initDataStore();

export default {
  examResultsAPI,
  attendanceAPI,
  studentAPI,
};
