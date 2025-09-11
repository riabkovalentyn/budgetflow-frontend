import axios, { AxiosRequestConfig } from "axios";
import type { BankConnection } from "@/components/types/types";

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

export const bankApi = {
  listProviders: () => http.get<{ providers: { id: string; name: string }[] }>("/bank/providers"),
  listConnections: () => http.get<{ connections: BankConnection[] }>("/bank/connections"),
  startConnect: (providerId: string) => http.post<{ url?: string; connectionId?: string }>(`/bank/connect`, { providerId }),
  disconnect: (connectionId: string) => http.post<void>(`/bank/connections/${connectionId}/disconnect`),
  syncNow: (connectionId: string) => http.post<{ started: boolean }>(`/bank/connections/${connectionId}/sync`),
  getSchedule: () => http.get<{ schedule: { enabled: boolean; intervalHours: number; nextRunAt?: string | null } }>(
    "/bank/schedule"
  ),
  updateSchedule: (enabled: boolean, intervalHours: number) =>
    http.post<{ schedule: { enabled: boolean; intervalHours: number; nextRunAt?: string | null } }>(
      "/bank/schedule",
      { enabled, intervalHours }
    ),
};

export const goalsApi = {
  list: () => http.get<{ items: { id: string; title: string; description: string; image: string }[] }>("/goals"),
  create: (goal: { title: string; description: string; image: string }) =>
    http.post<{ id: string }>("/goals", goal),
};