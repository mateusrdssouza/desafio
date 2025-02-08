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
import { useCreate } from "./hooks/useCreate";

interface CreateProps {
  open: boolean;
  handleClose: () => void;
}

export default function Create({ open, handleClose }: CreateProps) {
  const { errors, isSubmitting, loading, handleSubmit, onSubmit, register } =
    useCreate({ close: handleClose });

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ "& .MuiDialog-paper": { width: "500px" } }}
      >
        <DialogTitle>Nova carteira</DialogTitle>

        <form id="signup" onSubmit={handleSubmit(onSubmit)} noValidate>
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
              Cadastrar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
}
