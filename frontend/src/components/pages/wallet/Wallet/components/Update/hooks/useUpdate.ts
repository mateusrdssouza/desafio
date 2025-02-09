"use client";

import { updateWallet } from "@/services/http/wallets";
import { queryClient } from "@/services/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { UpdateWalletSchema, UpdateWalletSchemaType } from "../Update.schema";

interface useUpdateProps {
  uuid?: string;
  close?: () => void;
}

export function useUpdate({ uuid, close }: useUpdateProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateWalletSchemaType>({
    resolver: zodResolver(UpdateWalletSchema),
  });

  async function onSubmit(data: UpdateWalletSchemaType) {
    setLoading(true);

    await updateWallet({ uuid: String(uuid), ...data })
      .then(response => {
        toast.success(response?.data?.message || "Sucesso");
        queryClient.invalidateQueries({ queryKey: ["/wallets"] });
        queryClient.invalidateQueries({ queryKey: ["/wallet", uuid] });
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
