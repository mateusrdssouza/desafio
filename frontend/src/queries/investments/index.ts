import { fetchCompanies } from "@/services/http/investments";
import { useQuery } from "@tanstack/react-query";

export function useFetchCompanies() {
  const query = useQuery({
    queryKey: ["/companies"],
    queryFn: fetchCompanies,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    companies: query.data,
  };
}
