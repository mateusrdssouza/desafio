"use client";

import { useFetchMe } from "@/queries/users";
import { removeToken } from "@/services/apiClient";
import { moneyFormat } from "@/utils/format";
import { useRouter } from "next/navigation";

export function useSidebar() {
  const router = useRouter();

  const { user } = useFetchMe();

  const balance = user?.balance ? moneyFormat(user.balance) : null;

  function handleLogout() {
    removeToken();
    router.push("/signin");
  }

  return {
    balance,
    email: user?.email,
    name: user?.name,
    handleLogout,
  };
}
