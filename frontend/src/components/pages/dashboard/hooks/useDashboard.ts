"use client";

import { useFetchWallets } from "@/queries/wallets";

export function useDashboard() {
  const { wallets } = useFetchWallets();

  return {
    wallets,
  };
}
