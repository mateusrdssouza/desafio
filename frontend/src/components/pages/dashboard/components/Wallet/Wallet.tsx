"use client";

import { WalletType } from "@/types/Wallets.types";
import { moneyFormat } from "@/utils/format";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Box, Link, Paper, Typography } from "@mui/material";

interface WalletProps {
  data: WalletType;
}

export default function Wallet({ data }: WalletProps) {
  return (
    <Link href={`/dashboard/wallets/${data.uuid}`} sx={{ all: "unset" }}>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          cursor: "pointer",
          padding: 2,
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="h5" fontWeight="bold" component="div">
            {data.name}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            <span style={{ fontWeight: "bold" }}>Valor: </span>
            {moneyFormat(data.balance)}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            <span style={{ fontWeight: "bold" }}>Investimentos: </span>
            {data.investments?.length || 0}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "end" }}>
          <OpenInNewIcon />
        </Box>
      </Paper>
    </Link>
  );
}
