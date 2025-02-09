"use client";

import { moneyFormat } from "@/utils/format";
import CreateIcon from "@mui/icons-material/Create";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Delete from "./components/Delete/Delete";
import { useDelete } from "./components/Delete/hooks/useDelete";
import Empty from "./components/Empty/Empty";
import { useInvest } from "./components/Investment/components/Invest/hooks/useInvest";
import Invest from "./components/Investment/components/Invest/Invest";
import Investment from "./components/Investment/Investment";
import { useUpdate } from "./components/Update/hooks/useUpdate";
import Update from "./components/Update/Update";
import { useWallet } from "./hooks/useWallet";

export default function Wallet() {
  const router = useRouter();

  const { wallet } = useWallet();

  const {
    open: openUpdate,
    handleClickOpen: handleClickOpenUpdate,
    handleClose: handleCloseUpdate,
  } = useUpdate({
    uuid: wallet?.uuid,
  });

  const {
    open: openDelete,
    handleClickOpen: handleClickOpenDelete,
    handleClose: handleCloseDelete,
  } = useDelete({
    uuid: wallet?.uuid,
  });

  const { open, handleClickOpen, handleClose } = useInvest({});

  if (!wallet) return null;

  return (
    <Container>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: 8,
          padding: 2,
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CreateIcon
                color="info"
                sx={{ cursor: "pointer" }}
                onClick={handleClickOpenUpdate}
              />

              <Typography variant="h4" fontWeight="bold" component="div">
                {wallet.name}
              </Typography>
            </Box>

            <Typography variant="body1" component="div">
              <span style={{ fontWeight: "bold" }}>Total investido: </span>
              {moneyFormat(wallet.balance)}
            </Typography>
          </Box>

          <Button variant="text" color="error" onClick={handleClickOpenDelete}>
            Excluir
          </Button>
        </Box>

        <Divider />

        {wallet.investments?.length ? (
          <>
            <Grid2
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              marginTop={2}
            >
              {wallet.investments.map((investment, index) => (
                <Grid2 key={index} size={{ xs: 4, sm: 6, md: 6 }}>
                  <Investment data={investment} key={index} />
                </Grid2>
              ))}
            </Grid2>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "end",
                gap: 4,
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => router.push("/dashboard")}
              >
                Voltar
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
                sx={{ marginTop: 4 }}
              >
                Fazer novo investimento
              </Button>
            </Box>

            <Invest open={open} handleClose={handleClose} />
          </>
        ) : (
          <Empty />
        )}
      </Paper>

      <Update
        uuid={wallet.uuid}
        open={openUpdate}
        handleClose={handleCloseUpdate}
      />

      <Delete
        uuid={wallet.uuid}
        open={openDelete}
        handleClose={handleCloseDelete}
      />
    </Container>
  );
}
