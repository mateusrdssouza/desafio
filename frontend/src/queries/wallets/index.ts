import { fetchWalletByUuid, fetchWallets } from "@/services/http/wallets";
import { useQuery } from "@tanstack/react-query";

export function useFetchWallets() {
  const query = useQuery({
    queryKey: ["/wallets"],
    queryFn: fetchWallets,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    wallets: query.data,
  };
}

export function useFetchWalletByUuid(uuid: string) {
  const query = useQuery({
    queryKey: ["/wallet", uuid],
    queryFn: fetchWalletByUuid,
    enabled: !!uuid,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    wallet: query.data,
  };
}
