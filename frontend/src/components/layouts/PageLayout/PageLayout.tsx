import { Box } from "@mui/material";
import { ReactNode } from "react";
import Sidebar from "../Sidebar/Sidebar";

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "background.default",
          padding: 3,
          marginLeft: { xs: 0, md: "40px" },
          marginRight: { xs: 0, md: "40px" },
          transition: "margin-left 0.3s ease",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
