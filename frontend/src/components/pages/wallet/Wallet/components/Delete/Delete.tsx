"use client";

import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Fragment } from "react";

import { useDelete } from "./hooks/useDelete";

interface DeleteProps {
  uuid: string;
  open: boolean;
  handleClose: () => void;
}

export default function Delete({ uuid, open, handleClose }: DeleteProps) {
  const { isSubmitting, loading, handleSubmit, onSubmit } = useDelete({
    uuid,
    close: handleClose,
  });

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ "& .MuiDialog-paper": { width: "500px" } }}
      >
        <DialogTitle>Excluir carteira</DialogTitle>

        <form id="delete" onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogContent sx={{ marginTop: -3 }}>
            <Alert
              severity="warning"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <AlertTitle sx={{ fontWeight: "bold" }}>
                Tem certeza que deseja excluir a carteira?
              </AlertTitle>
              Todos os investimentos serão retornados para seu saldo
            </Alert>
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
              color="error"
              disabled={isSubmitting || loading}
            >
              Excluir
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
}
