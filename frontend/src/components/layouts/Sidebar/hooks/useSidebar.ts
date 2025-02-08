"use client";

import { useFetchMe } from "@/queries/users";
import { moneyFormat } from "@/utils/format";

export function useSidebar() {
  const { user } = useFetchMe();

  const balance = user?.balance ? moneyFormat(user.balance) : null;

  return {
    name: user?.name,
    email: user?.email,
    balance,
  };
}
