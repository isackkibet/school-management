import { apiRequest } from "./api";

export type AuthUser = {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  isActive?: boolean;
};

type LoginPayload = {
  user: AuthUser;
  token: string;
};

const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";
const ROLE_KEY = "userRole";
const STUDENT_ID_KEY = "studentID";

export function roleToPortalRole(role?: string) {
  switch (role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      return "admin";
    case "TEACHER":
      return "teacher";
    case "PARENT":
      return "parent";
    case "STUDENT":
      return "student";
    default:
      return "student";
  }
}

export function saveAuthSession(user: AuthUser, token: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(ROLE_KEY, roleToPortalRole(user.role));

  if (user.role === "STUDENT") {
    localStorage.setItem(STUDENT_ID_KEY, user.email);
  } else {
    localStorage.removeItem(STUDENT_ID_KEY);
  }
}

export function clearAuthSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(STUDENT_ID_KEY);
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser() {
  const rawUser = localStorage.getItem(USER_KEY);
  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser) as AuthUser;
  } catch {
    clearAuthSession();
    return null;
  }
}

export async function loginWithEmail(email: string, password: string) {
  const response = await apiRequest<LoginPayload>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!response.data?.token || !response.data.user) {
    throw new Error("Login succeeded but the server response was incomplete.");
  }

  saveAuthSession(response.data.user, response.data.token);
  return response.data;
}

export async function fetchCurrentUser(token = getAuthToken()) {
  if (!token) throw new Error("Please sign in to continue.");

  const response = await apiRequest<AuthUser>("/auth/me", { token });
  if (!response.data) throw new Error("The server did not return your profile.");

  saveAuthSession(response.data, token);
  return response.data;
}

