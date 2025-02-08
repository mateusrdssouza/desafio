"use client";

import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
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
          paddingY: 12,
        }}
      >
        <CurrencyExchangeIcon sx={{ fontSize: 120, marginBottom: 4 }} />

        <Typography variant="h6" gutterBottom>
          Você ainda não tem nenhum investimento nessa carteira
        </Typography>

        <Typography variant="body2" color="textSecondary">
          Faça novos investimentos para expandir seu portfólio e potencializar
          seus ganhos
        </Typography>

        <Divider sx={{ marginTop: 3 }} />

        <Button variant="contained" color="primary">
          Fazer primeiro investimento
        </Button>
      </Box>
    </Container>
  );
}
