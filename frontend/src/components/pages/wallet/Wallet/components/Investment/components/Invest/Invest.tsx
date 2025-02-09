"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Fragment } from "react";
import Company from "./components/Company/Company";
import { useInvest } from "./hooks/useInvest";

interface InvestProps {
  open: boolean;
  handleClose: () => void;
}

export default function Invest({ open, handleClose }: InvestProps) {
  const {
    companies,
    company,
    companyUuid,
    errors,
    isSubmitting,
    loading,
    handleSubmit,
    onSubmit,
    register,
  } = useInvest({ close: handleClose });

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ "& .MuiDialog-paper": { width: "1200px" } }}
      >
        <DialogTitle>Realizar investimento</DialogTitle>

        <form id="invest" onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogContent sx={{ marginTop: -3 }}>
            <Box sx={{ paddingBottom: 3 }}>
              {company && <Company company={company} />}
            </Box>

            <FormControl error={!!errors.companyUuid} fullWidth>
              <InputLabel id="companyUuid-label">Empresa</InputLabel>

              <Select
                variant="outlined"
                id="companyUuid-select"
                labelId="companyUuid-label"
                label="Empresa"
                fullWidth
                autoFocus
                error={!!errors.companyUuid}
                value={companyUuid || ""}
                {...register("companyUuid")}
              >
                {companies?.map(company => (
                  <MenuItem key={company.uuid} value={company.uuid}>
                    {company.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              variant="outlined"
              margin="normal"
              id="shares"
              label="Quantidade de ações"
              type="text"
              fullWidth
              autoFocus
              error={!!errors.shares}
              helperText={errors.shares?.message}
              inputMode="numeric"
              {...register("shares")}
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
              Confirmar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
}
