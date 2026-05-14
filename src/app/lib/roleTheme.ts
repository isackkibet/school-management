export function getRoleTheme(role: string) {
  switch (role) {
    case "admin":
      return {
        label: "Administration",
        header: "from-emerald-800 via-emerald-700 to-teal-700",
        badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
        accent: "text-emerald-700",
        button: "bg-emerald-700 hover:bg-emerald-800",
      };
    case "teacher":
      return {
        label: "Teacher Portal",
        header: "from-indigo-800 via-indigo-700 to-sky-700",
        badge: "bg-indigo-100 text-indigo-800 border-indigo-200",
        accent: "text-indigo-700",
        button: "bg-indigo-700 hover:bg-indigo-800",
      };
    case "parent":
      return {
        label: "Parent Portal",
        header: "from-rose-800 via-rose-700 to-orange-600",
        badge: "bg-rose-100 text-rose-800 border-rose-200",
        accent: "text-rose-700",
        button: "bg-rose-700 hover:bg-rose-800",
      };
    case "student":
      return {
        label: "Student Portal",
        header: "from-blue-800 via-blue-700 to-cyan-700",
        badge: "bg-blue-100 text-blue-800 border-blue-200",
        accent: "text-blue-700",
        button: "bg-blue-700 hover:bg-blue-800",
      };
    case "accountant":
      return {
        label: "Finance Portal",
        header: "from-amber-800 via-amber-700 to-yellow-600",
        badge: "bg-amber-100 text-amber-900 border-amber-200",
        accent: "text-amber-700",
        button: "bg-amber-700 hover:bg-amber-800",
      };
    default:
      return {
        label: "School Portal",
        header: "from-slate-800 via-slate-700 to-slate-600",
        badge: "bg-slate-100 text-slate-800 border-slate-200",
        accent: "text-slate-700",
        button: "bg-slate-700 hover:bg-slate-800",
      };
  }
}

