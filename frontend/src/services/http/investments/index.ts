import { api } from "@/services/apiClient";
import { CompanyType, CreateInvestmentType } from "@/types/Investment.type";

export async function fetchCompanies(): Promise<CompanyType[]> {
  const { data } = await api.get(`/investments/companies`);
  return data;
}

export const createInvestment = (
  data: CreateInvestmentType
): Promise<{ message: string }> => {
  return api.post(`/investments`, data);
};

export const deleteInvestment = (
  uuid: string
): Promise<{ message: string }> => {
  return api.delete(`/investments/${uuid}`);
};
