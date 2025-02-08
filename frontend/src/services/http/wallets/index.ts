import { api } from "@/services/apiClient";
import {
  CreateWalletType,
  UpdateWalletType,
  WalletType,
} from "@/types/Wallets.types";

export async function fetchWallets(): Promise<WalletType[]> {
  const { data } = await api.get(`/wallets`);
  return data;
}

export async function fetchWalletById({
  queryKey,
}: {
  queryKey: [string, string];
}): Promise<WalletType> {
  const [, uuid] = queryKey;
  const { data } = await api.get(`/wallets/${uuid}`);
  return data;
}

export const createWallet = (
  data: CreateWalletType
): Promise<{ message: string }> => {
  return api.post(`/wallets`, data);
};

export const updateWallet = (data: UpdateWalletType): Promise<WalletType> => {
  const { uuid, ...fields } = data;
  return api.patch(`/wallets/${uuid}`, fields);
};

export const deleteWallet = (uuid: string): Promise<{ message: string }> => {
  return api.delete(`/wallets/${uuid}`);
};
