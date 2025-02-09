"use client";

import { CompanyType } from "@/types/Investment.types";
import { moneyFormat } from "@/utils/format";
import { Box, Grid2, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { MarketRiskDescription } from "../../../../Investment.types";

interface EmptyProps {
  company: CompanyType;
}

export default function Company({ company }: EmptyProps) {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        gap: 2,
        border: `1px solid ${grey[300]}`,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <img
          srcSet={company.logoUrl}
          src={company.logoUrl}
          alt={company.name}
          style={{
            height: 50,
            padding: 8,
          }}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <Typography variant="body1" fontWeight="bold">
              {company.name}
            </Typography>

            <Typography variant="subtitle2">{company.description}</Typography>
          </Grid2>

          <Grid2 size={6}>
            <Typography variant="body1" fontWeight="bold">
              Setor
            </Typography>

            <Typography variant="body1">{company.sector}</Typography>
          </Grid2>

          <Grid2 size={6}>
            <Typography variant="body1" fontWeight="bold">
              Ticker
            </Typography>

            <Typography variant="body1">{company.ticker}</Typography>
          </Grid2>

          <Grid2 size={6}>
            <Typography variant="body1" fontWeight="bold">
              Bolsa
            </Typography>

            <Typography variant="body1">{company.stockExchange}</Typography>
          </Grid2>

          <Grid2 size={6}>
            <Typography variant="body1" fontWeight="bold">
              Valor da ação
            </Typography>

            <Typography variant="body1">
              {moneyFormat(company.stockPrice)}
            </Typography>
          </Grid2>

          <Grid2 size={6}>
            <Typography variant="body1" fontWeight="bold">
              Valor de mercado
            </Typography>

            <Typography variant="body1">
              {company.marketCapitalization}
            </Typography>
          </Grid2>

          <Grid2 size={6}>
            <Typography variant="body1" fontWeight="bold">
              Risco
            </Typography>

            <Typography variant="body1">
              {MarketRiskDescription[company.marketRiskLevel]}
            </Typography>
          </Grid2>
        </Grid2>
      </Box>
    </Paper>
  );
}
