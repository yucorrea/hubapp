import axios from "axios";

export type ApiResponse<T> = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: null | string;
  },
  results: T;
}

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL
})