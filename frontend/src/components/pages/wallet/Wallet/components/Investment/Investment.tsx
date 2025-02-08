"use client";

import { InvestmentType } from "@/types/Investment.types";
import { moneyFormat } from "@/utils/format";
import { Alert, Box, Paper, Typography } from "@mui/material";
import { MarketRiskAlert, MarketRiskDescription } from "./Investment.types";

interface InvestmentProps {
  data: InvestmentType;
}

export default function Investment({ data }: InvestmentProps) {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        padding: 1,
        gap: 2,
      }}
    >
      <img
        srcSet={data.company.logoUrl}
        src={data.company.logoUrl}
        alt={data.company.name}
        style={{
          height: 50,
          padding: 8,
        }}
      />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="body1" component="div">
          <span style={{ fontWeight: "bold" }}>Empresa: </span>
          {data.company.name}
        </Typography>

        <Typography variant="body1" component="div">
          <span style={{ fontWeight: "bold" }}>Quantidade de ações: </span>
          {data.shares}
        </Typography>

        <Typography variant="body1" component="div">
          <span style={{ fontWeight: "bold" }}>Valor investido: </span>
          {moneyFormat(data.amount)}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body1" component="div">
            <span style={{ fontWeight: "bold" }}>Risco avaliado: </span>
          </Typography>

          <Alert
            severity={MarketRiskAlert[data.company.marketRiskLevel]}
            sx={{ paddingX: 1, paddingY: 0 }}
          >
            {MarketRiskDescription[data.company.marketRiskLevel]}
          </Alert>
        </Box>
      </Box>
    </Paper>
  );
}
