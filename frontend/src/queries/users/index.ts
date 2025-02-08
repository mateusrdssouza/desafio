import { fetchMe } from "@/services/http/user";
import { useQuery } from "@tanstack/react-query";
import { parseCookies } from "nookies";

export function useFetchMe() {
  const { "backend.token": token } = parseCookies();

  const query = useQuery({
    queryKey: ["/users", "/me"],
    queryFn: fetchMe,
    enabled: !!token,
    staleTime: Infinity,
  });

  return {
    ...query,
    user: query.data,
  };
}
