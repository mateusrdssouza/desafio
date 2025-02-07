"use client";

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useSignin } from "./hooks/useSignin";

export default function SignIn() {
  const {
    errors,
    isSubmitting,
    loading,
    handleKeyDown,
    handleSubmit,
    onSubmit,
    register,
  } = useSignin();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        <form id="signin" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            id="email"
            label="E-mail"
            type="text"
            fullWidth
            autoFocus
            onKeyDown={handleKeyDown}
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          />

          <TextField
            variant="outlined"
            margin="normal"
            id="password"
            label="Senha"
            type="password"
            fullWidth
            onKeyDown={handleKeyDown}
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            loading={isSubmitting || loading}
            disabled={isSubmitting || loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {isSubmitting || loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}
