import axios, { AxiosRequestConfig } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const api = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: false,
  headers: { Accept: "application/json" },
});

export type ApiErrorPayload = { message?: string };

function isErrorWithMessage(x: unknown): x is { message: string } {
  return typeof (x as { message?: unknown })?.message === "string";
}

export function errorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as ApiErrorPayload | undefined;
    if (data && typeof data.message === "string" && data.message) return data.message;
    return typeof err.message === "string" && err.message ? err.message : "Request failed";
  }
  return isErrorWithMessage(err) ? err.message : "Unknown error";
}

export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const res = await api.request<T>(config);
  return res.data as T;
}

export const http = {
  get: async <T>(url: string, config?: AxiosRequestConfig) => (await api.get<T>(url, config)).data,
  post: async <T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) =>
    (await api.post<T>(url, body, config)).data,
  put: async <T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) =>
    (await api.put<T>(url, body, config)).data,
  patch: async <T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) =>
    (await api.patch<T>(url, body, config)).data,
  delete: async <T>(url: string, config?: AxiosRequestConfig) => (await api.delete<T>(url, config)).data,
};