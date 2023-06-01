import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

export default function LoginUI() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const [message, setMessage] = useState("");

  const nav = useNavigate();

  async function HandleLogin(e) {
    e.preventDefault();
    setMessage("");
    setLoad(true);

    authService
      .login(email, password)
      .then((res) => {
        if (res === "" || res === false) {
          setMessage("Autenticação inválida.");
          setLoad(false);
        } else {
          setMessage("Autenticação executada com sucesso.");
          setLoad(false);
          nav("/list");
        }
      })
      .catch((error) => {
        setMessage("Erro ao autenticar o utilizador.");
        setLoad(false);
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Autenticação
        </Typography>
        <Stack sx={{ width: "100%" }} spacing={2}>
          {message && (
            <Alert severity="error">
              <AlertTitle>Ocorreu um erro</AlertTitle>
              <strong>{message}</strong>
            </Alert>
          )}
        </Stack>
        <Box component="form" onSubmit={HandleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(value) => setEmail(value.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(value) => setPassword(value.target.value)}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {load ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled
            >
              Entrar
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
          )}
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Ainda não tens uma conta? Regista-te agora"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
