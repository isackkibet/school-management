const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export class ApiError extends Error {
  status: number;
  payload: ApiResponse<unknown> | null;

  constructor(message: string, status: number, payload: ApiResponse<unknown> | null = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

type RequestOptions = RequestInit & {
  token?: string | null;
};

export async function apiRequest<T>(path: string, options: RequestOptions = {}) {
  const { token, headers, body, ...requestOptions } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...requestOptions,
    headers: {
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body,
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? ((await response.json()) as ApiResponse<T>)
    : null;

  if (!response.ok || payload?.success === false) {
    throw new ApiError(
      payload?.error || payload?.message || `Request failed with status ${response.status}`,
      response.status,
      payload,
    );
  }

  return payload as ApiResponse<T>;
}

