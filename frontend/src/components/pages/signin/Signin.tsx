"use client";

import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useSignin } from "./hooks/useSignin";

export default function Signin() {
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
          marginTop: 10,
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Box style={{ position: "relative", width: "100%", height: "90px" }}>
          <Image
            src="/logo.png"
            alt="logo"
            layout="fill"
            objectFit="contain"
            style={{ marginBottom: 10 }}
          />
        </Box>

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
            variant="contained"
            color="primary"
            loading={isSubmitting || loading}
            disabled={isSubmitting || loading}
            sx={{ mt: 3, mb: 2 }}
            fullWidth
          >
            {isSubmitting || loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <Box display={"flex"} alignSelf={"start"} marginTop={1}>
          <Typography fontSize={14}>
            Não tem conta? <Link href="/signup">Clique aqui</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
