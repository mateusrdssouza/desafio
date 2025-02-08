"use client";

import { api } from "@/services/apiClient";
import { queryClient } from "@/services/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SignupSchema, SignupSchemaType } from "../Signup.schema";

export function useSignup() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
  });

  async function onSubmit(data: SignupSchemaType) {
    setLoading(true);
    queryClient.clear();

    try {
      const response = await api.post(
        "/users",
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data?.message || "Cadastro realizado com sucesso");

      router.push("/signin");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Ocorreu um erro");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLParagraphElement>) {
    if (event.key === "Enter") {
      handleSubmit(onSubmit);
    }
  }

  return {
    errors,
    isSubmitting,
    loading,
    handleKeyDown,
    handleSubmit,
    onSubmit,
    register,
  };
}
