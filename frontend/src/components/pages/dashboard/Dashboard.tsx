"use client";

import { Button, Container, Grid2 } from "@mui/material";
import Empty from "./components/Empty/Empty";
import Create from "./components/Wallet/components/Create/Create";
import { useCreate } from "./components/Wallet/components/Create/hooks/useCreate";
import Wallet from "./components/Wallet/Wallet";
import { useDashboard } from "./hooks/useDashboard";

export default function Dashboard() {
  const { wallets } = useDashboard();
  const { open, handleClickOpen, handleClose } = useCreate({});

  if (!wallets?.length) return <Empty />;

  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
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

      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Criar nova carteira
      </Button>

      <Create open={open} handleClose={handleClose} />
    </Container>
  );
}
