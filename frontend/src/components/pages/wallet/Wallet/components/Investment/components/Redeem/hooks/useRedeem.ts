"use client";

import { redeemInvestment } from "@/services/http/investments";
import { queryClient } from "@/services/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  RedeemInvestmentSchema,
  RedeemInvestmentSchemaType,
} from "../Redeem.schema";

interface useRedeemProps {
  uuid?: string;
  close?: () => void;
}

export function useRedeem({ uuid, close }: useRedeemProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RedeemInvestmentSchemaType>({
    resolver: zodResolver(RedeemInvestmentSchema),
    defaultValues: {
      uuid,
    },
  });

  async function onSubmit(data: RedeemInvestmentSchemaType) {
    setLoading(true);

    await redeemInvestment(data.uuid)
      .then(response => {
        toast.success(response?.data?.message || "Sucesso");
        queryClient.invalidateQueries({ queryKey: ["/users", "/me"] });
        queryClient.invalidateQueries({ queryKey: ["/wallets"] });
        queryClient.invalidateQueries({ queryKey: ["/wallet", uuid] });
        if (close) close();
        window.location.reload();
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return {
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
