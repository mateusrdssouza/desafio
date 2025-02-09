"use client";

import { useFetchCompanies } from "@/queries/investments";
import { createInvestment } from "@/services/http/investments";
import { queryClient } from "@/services/queryClient";
import { CompanyType } from "@/types/Investment.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  CreateInvestmentSchema,
  CreateInvestmentSchemaType,
} from "../Invest.schema";

interface useCreateProps {
  close?: () => void;
}

export function useInvest({ close }: useCreateProps) {
  const { uuid } = useParams();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState<CompanyType | undefined>(undefined);

  const { companies } = useFetchCompanies();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateInvestmentSchemaType>({
    resolver: zodResolver(CreateInvestmentSchema),
    defaultValues: {
      walletUuid: String(uuid),
    },
  });

  const companyUuid = watch("companyUuid");

  async function onSubmit(data: CreateInvestmentSchemaType) {
    setLoading(true);

    await createInvestment(data)
      .then(response => {
        toast.success(response?.data?.message || "Sucesso");
        queryClient.invalidateQueries({ queryKey: ["/users", "/me"] });
        queryClient.invalidateQueries({ queryKey: ["/wallets"] });
        queryClient.invalidateQueries({ queryKey: ["/wallet", uuid] });
        if (close) close();
      })
      .catch(error => {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message || "Ocorreu um erro");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    setCompany(companies?.find(c => c.uuid === companyUuid));
  }, [companyUuid]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return {
    companies,
    company,
    companyUuid,
    errors,
    isSubmitting,
    loading,
    open,
    handleClickOpen,
    handleClose,
    handleSubmit,
    onSubmit,
    register,
  };
}
