"use client";

import { queryClient } from "@/services/queryClient";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout(props: { children: React.ReactNode }) {
  const [queryClientState] = React.useState(queryClient);

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />

        <QueryClientProvider client={queryClientState}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <CssBaseline />
            {props.children}
            <ToastContainer />
          </AppRouterCacheProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
