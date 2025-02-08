import { api } from "@/services/apiClient";
import { CompanyType, CreateInvestmentType } from "@/types/Investment.type";
import { AxiosPromise } from "axios";

export async function fetchCompanies(): AxiosPromise<CompanyType[]> {
  const { data } = await api.get(`/investments/companies`);
  return data;
}

export const createInvestment = (
  data: CreateInvestmentType
): AxiosPromise<{ message: string }> => {
  return api.post(`/investments`, data);
};

export const deleteInvestment = (
  uuid: string
): AxiosPromise<{ message: string }> => {
  return api.delete(`/investments/${uuid}`);
};
