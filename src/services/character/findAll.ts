import { Character } from "@/src/models/Character";
import { ApiResponse, api } from "../api";

export async function findAll(params: Record<string, any>) {
  try {
    const response = await api.get<ApiResponse<Character[]>>('/character', { params })
    return response.data
  }catch(err) {
    throw err
  }
}