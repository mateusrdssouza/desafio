import { UserType } from "@/components/layouts/Sidebar/hooks/useSidebar.types";
import { api } from "@/services/apiClient";

export async function fetchMe(): Promise<UserType> {
  const { data } = await api.get("/auth/profile");
  return data;
}
