import { Character } from "@/src/models/Character";
import { api } from "../api";

export async function findById(ids: Array<number>) {
  try {
    const response = await api.get<Character[]>(`/character/[${ids}]`)
    return response.data
  }catch(err) {
    throw err
  }
}