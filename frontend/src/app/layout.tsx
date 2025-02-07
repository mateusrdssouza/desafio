import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import * as React from "react";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />

        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <CssBaseline />
          {props.children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
