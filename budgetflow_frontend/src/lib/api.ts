// Simple Axios instance with base URL from env
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  withCredentials: false,
});

export type ApiError = {
  message?: string;
};

export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const axErr = err as typeof err;
    const msg = (axErr.response?.data as ApiError | undefined)?.message;
    return msg || axErr.message || "Request failed";
  }
  if (isErrorWithMessage(err)) return err.message;
  return "Unknown error";
}

function isErrorWithMessage(e: unknown): e is { message: string } {
  if (!e || typeof e !== "object") return false;
  const rec = e as Record<string, unknown>;
  return typeof rec.message === "string";
}
