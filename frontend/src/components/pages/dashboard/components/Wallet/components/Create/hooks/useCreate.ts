"use client";

import { createWallet } from "@/services/http/wallets";
import { queryClient } from "@/services/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CreateWalletSchema, CreateWalletSchemaType } from "../Create.schema";

interface useCreateProps {
  close?: () => void;
}

export function useCreate({ close }: useCreateProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateWalletSchemaType>({
    resolver: zodResolver(CreateWalletSchema),
  });

  async function onSubmit(data: CreateWalletSchemaType) {
    setLoading(true);

    await createWallet(data)
      .then(response => {
        toast.success(response?.data?.message || "Sucesso");
        queryClient.invalidateQueries({ queryKey: ["/wallets"] });
        if (close) close();
        reset();
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
