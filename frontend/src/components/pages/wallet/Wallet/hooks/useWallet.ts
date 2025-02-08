"use client";

import { useFetchWalletByUuid } from "@/queries/wallets";
import { useParams } from "next/navigation";

export function useWallet() {
  const { uuid } = useParams();
  const { wallet } = useFetchWalletByUuid(String(uuid));

  return {
    wallet,
  };
}
