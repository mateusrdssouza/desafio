"use client";

import CreateIcon from "@mui/icons-material/Create";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import Delete from "./components/Delete/Delete";
import { useDelete } from "./components/Delete/hooks/useDelete";
import { useUpdate } from "./components/Update/hooks/useUpdate";
import Update from "./components/Update/Update";
import { useWallet } from "./hooks/useWallet";

export default function Wallet() {
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

  if (!wallet) return null;

  return (
    <Container>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 2,
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h4" fontWeight="bold" component="div">
              {wallet?.name}
            </Typography>

            <CreateIcon
              color="info"
              sx={{ cursor: "pointer" }}
              onClick={handleClickOpenUpdate}
            />
          </Box>

          <Button variant="text" color="error" onClick={handleClickOpenDelete}>
            Excluir
          </Button>
        </Box>

        <p>{JSON.stringify(wallet)}</p>
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
