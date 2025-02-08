import { api } from "@/services/apiClient";
import { UserType } from "@/types/Users.types";

export async function fetchMe(): Promise<UserType> {
  const { data } = await api.get("/auth/profile");
  return data;
}
