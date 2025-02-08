"use client";

import { InvestmentType } from "@/types/Investment.types";
import { moneyFormat } from "@/utils/format";
import { Alert, Box, Button, Paper, Typography } from "@mui/material";
import { MarketRiskAlert, MarketRiskDescription } from "./Investment.types";
import Redeem from "./components/Redeem/Redeem";
import { useRedeem } from "./components/Redeem/hooks/useRedeem";

interface InvestmentProps {
  data: InvestmentType;
}

export default function Investment({ data }: InvestmentProps) {
  const { open, handleClickOpen, handleClose } = useRedeem({
    uuid: data.uuid,
  });

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 1,
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <img
          srcSet={data.company.logoUrl}
          src={data.company.logoUrl}
          alt={data.company.name}
          style={{
            height: 50,
            padding: 8,
          }}
        />

        <Button variant="text" size="medium" onClick={handleClickOpen}>
          Resgatar
        </Button>
      </Box>

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

      <Redeem uuid={data.uuid} open={open} handleClose={handleClose} />
    </Paper>
  );
}
