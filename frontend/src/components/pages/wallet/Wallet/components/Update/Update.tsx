"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Fragment } from "react";
import { useUpdate } from "./hooks/useUpdate";

interface UpdateProps {
  uuid: string;
  open: boolean;
  handleClose: () => void;
}

export default function Update({ uuid, open, handleClose }: UpdateProps) {
  const { errors, isSubmitting, loading, handleSubmit, onSubmit, register } =
    useUpdate({ uuid, close: handleClose });

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ "& .MuiDialog-paper": { width: "500px" } }}
      >
        <DialogTitle>Atualizar carteira</DialogTitle>

        <form id="update" onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogContent sx={{ marginTop: -3 }}>
            <TextField
              variant="outlined"
              margin="normal"
              id="name"
              label="Nome"
              type="text"
              fullWidth
              autoFocus
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register("name")}
            />
          </DialogContent>

          <DialogActions
            sx={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <Button onClick={handleClose} disabled={isSubmitting || loading}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting || loading}
            >
              Atualizar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
}
