"use client";

import { Container, Grid2 } from "@mui/material";
import Empty from "./components/Empty/Empty";
import Wallet from "./components/Wallet/Wallet";
import { useDashboard } from "./hooks/useDashboard";

export default function Dashboard() {
  const { wallets } = useDashboard();

  if (!wallets) return <Empty />;

  return (
    <Container>
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        marginTop={8}
      >
        {wallets.map((wallet, index) => (
          <Grid2 key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <Wallet data={wallet} key={index} />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}
