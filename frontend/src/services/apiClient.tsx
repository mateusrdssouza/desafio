import axios, { AxiosError, AxiosHeaders } from "axios";
import Router from "next/router";
import { parseCookies, setCookie } from "nookies";

export const setupAPIClient = () => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  });

  api.interceptors.request.use(async config => {
    const cookies = parseCookies();
    const token = cookies["backend.token"];

    if (token) {
      (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
    }

    return config;
  });

  api.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
      if (error.response?.status === 403) {
        Router.push("/");
      }

      return Promise.reject(error);
    }
  );

  return api;
};

export const setupToken = (token: string) => {
  setCookie(undefined, "backend.token", token, {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
};

export const api = setupAPIClient();
