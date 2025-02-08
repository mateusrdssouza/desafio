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
import { useRedeem } from "./hooks/useRedeem";

interface RedeemProps {
  uuid: string;
  open: boolean;
  handleClose: () => void;
}

export default function Redeem({ uuid, open, handleClose }: RedeemProps) {
  const { isSubmitting, loading, handleSubmit, onSubmit } = useRedeem({
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
        <DialogTitle>Resgatar investimento</DialogTitle>

        <form id="redeem" onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogContent sx={{ marginTop: -3 }}>
            <Alert
              severity="warning"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <AlertTitle sx={{ fontWeight: "bold" }}>
                Tem certeza que deseja resgatar o investimento?
              </AlertTitle>
              O valor será retornado para seu saldo
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
