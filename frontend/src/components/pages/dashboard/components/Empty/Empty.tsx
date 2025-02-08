"use client";

import WalletIcon from "@mui/icons-material/Wallet";
import { Box, Button, Container, Divider, Typography } from "@mui/material";

export default function Empty() {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          height: "100vh",
        }}
      >
        <WalletIcon sx={{ fontSize: 120 }} />

        <Typography variant="h6" gutterBottom>
          Você ainda não tem nenhuma carteira de investimento
        </Typography>

        <Typography variant="body2" color="textSecondary">
          Crie uma nova carteira para começar a investir e gerenciar seus ativos
        </Typography>

        <Divider sx={{ marginTop: 3 }} />

        <Button variant="contained" color="primary">
          Criar Nova Carteira
        </Button>
      </Box>
    </Container>
  );
}
