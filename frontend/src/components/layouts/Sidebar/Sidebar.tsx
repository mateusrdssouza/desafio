"use client";

import { Avatar, Box, Button, Drawer, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { useSidebar } from "./hooks/useSidebar";

export default function Sidebar() {
  const { balance, email, name, handleLogout } = useSidebar();

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        height: "100vh",
        "& .MuiDrawer-paper": {
          width: 240,
          height: "100vh",
          backgroundColor: grey[200],
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          gap: 2,
          marginTop: 3,
          width: "100%",
        }}
      >
        <Avatar
          sx={{
            height: 100,
            width: 100,
            fontSize: 40,
            bgcolor: blue[500],
          }}
          alt="Mateus Rodrigues de Souza"
        >
          MR
        </Avatar>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <Typography sx={{ textAlign: "center", fontSize: 16 }}>
            {name}
          </Typography>

          <Typography
            sx={{ textAlign: "center", fontSize: 12, lineBreak: "anywhere" }}
          >
            {email}
          </Typography>
        </Box>

        <Typography
          sx={{ textAlign: "center", fontSize: 18, lineBreak: "anywhere" }}
        >
          <span style={{ fontWeight: "bold" }}>Saldo: </span>
          {balance}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <Button variant="contained" onClick={handleLogout}>
            Sair
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
