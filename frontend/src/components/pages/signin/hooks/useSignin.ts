"use client";

import { api, setupToken } from "@/services/apiClient";
import { queryClient } from "@/services/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FormSchema, FormSchemaType } from "../Signin.schema";

export function useSignin() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: FormSchemaType) {
    setLoading(true);
    queryClient.clear();

    try {
      const response = await api.post(
        "/auth/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { access_token } = response.data;
      setupToken(access_token);

      router.push("/dashboard");
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
