"use client";

import { deleteWallet } from "@/services/http/wallets";
import { queryClient } from "@/services/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { DeleteWalletSchema, DeleteWalletSchemaType } from "../Delete.schema";

interface useDeleteProps {
  uuid?: string;
  close?: () => void;
}

export function useDelete({ uuid, close }: useDeleteProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<DeleteWalletSchemaType>({
    resolver: zodResolver(DeleteWalletSchema),
    defaultValues: {
      uuid,
    },
  });

  async function onSubmit(data: DeleteWalletSchemaType) {
    setLoading(true);

    await deleteWallet(data.uuid)
      .then(response => {
        toast.success(response?.data?.message || "Sucesso");
        queryClient.invalidateQueries({ queryKey: ["/users", "/me"] });
        queryClient.invalidateQueries({ queryKey: ["/wallets"] });
        queryClient.invalidateQueries({ queryKey: ["/wallet", uuid] });
        if (close) close();
        router.push("/dashboard");
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
