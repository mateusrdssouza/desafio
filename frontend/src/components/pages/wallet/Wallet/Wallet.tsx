"use client";

import CreateIcon from "@mui/icons-material/Create";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useUpdate } from "./components/Update/hooks/useUpdate";
import Update from "./components/Update/Update";
import { useWallet } from "./hooks/useWallet";

export default function Wallet() {
  const { wallet } = useWallet();
  const { open, handleClickOpen, handleClose } = useUpdate({
    uuid: wallet?.uuid,
  });

  if (!wallet) return null;

  return (
    <Container>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 2,
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h4" fontWeight="bold" component="div">
              {wallet?.name}
            </Typography>

            <CreateIcon
              color="info"
              sx={{ cursor: "pointer" }}
              onClick={handleClickOpen}
            />
          </Box>

          <Button variant="text" color="error">
            Excluir
          </Button>
        </Box>
      </Paper>

      <Update uuid={wallet.uuid} open={open} handleClose={handleClose} />
    </Container>
  );
}
