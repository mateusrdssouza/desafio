import { api } from "@/services/apiClient";
import { CompanyType, CreateInvestmentType } from "@/types/Investment.types";
import { AxiosPromise } from "axios";

export async function fetchCompanies(): Promise<CompanyType[]> {
  const { data } = await api.get(`/investments/companies`);
  return data;
}

export const createInvestment = (data: CreateInvestmentType): AxiosPromise => {
  return api.post(`/investments`, data);
};

export const redeemInvestment = (uuid: string): AxiosPromise => {
  return api.delete(`/investments/${uuid}`);
};
