"use client";

import WalletIcon from "@mui/icons-material/Wallet";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import Create from "../Wallet/components/Create/Create";
import { useCreate } from "../Wallet/components/Create/hooks/useCreate";

export default function Empty() {
  const { open, handleClickOpen, handleClose } = useCreate({});

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

        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Criar nova carteira
        </Button>
      </Box>

      <Create open={open} handleClose={handleClose} />
    </Container>
  );
}
