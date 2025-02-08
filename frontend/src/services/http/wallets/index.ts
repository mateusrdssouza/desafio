import { api } from "@/services/apiClient";
import {
  CreateWalletType,
  UpdateWalletType,
  WalletType,
} from "@/types/Wallets.types";
import { AxiosPromise } from "axios";

export async function fetchWallets(): AxiosPromise<WalletType[]> {
  const { data } = await api.get(`/wallets`);
  return data;
}

export async function fetchWalletById(uuid: string): AxiosPromise<WalletType> {
  const { data } = await api.get(`/wallets/${uuid}`);
  return data;
}

export const createWallet = (
  data: CreateWalletType
): AxiosPromise<{ message: string }> => {
  return api.post(`/wallets`, data);
};

export const updateWallet = (
  data: UpdateWalletType
): AxiosPromise<WalletType> => {
  const { uuid, ...fields } = data;
  return api.patch(`/wallets/${uuid}`, fields);
};

export const deleteWallet = (
  uuid: string
): AxiosPromise<{ message: string }> => {
  return api.delete(`/wallets/${uuid}`);
};
