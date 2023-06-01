import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import authHeader from "../Auth/auth.header";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function BasicForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [nif, setNif] = useState("");
  const { id } = useParams();
  const [message, setMessage] = useState("");

  let nav = useNavigate();

  function updateData() {
    const data = {
      id: id,
      name: name,
      address: address,
      nif: nif,
    };

    axios
      .put("http://localhost:5000/api/v1/student/" + id, data, {
        headers: authHeader(),
      })
      .then((res) => {
        if (res.data.success === true) {
          nav("/list");
        } else {
          setMessage(
            "Lamentamos mas não foi possível atualizar os dados do aluno. Dados inválidos."
          );
        }
      })
      .catch((error) => {
        setMessage(
          "Lamentamos mas de momento não é possível atualizar os dados do aluno. Dados de autenticação inválidos."
        );
      });
  }

  function createData() {
    const data = {
      id: id,
      name: name,
      address: address,
      nif: nif,
    };

    axios
      .post("http://localhost:5000/api/v1/student/", data, {
        headers: authHeader(),
      })
      .then((res) => {
        if (res.data.success === true) {
          nav("/list");
        } else {
          setMessage(
            "Lamentamos mas não foi possível criar um novo aluno. Dados inválidos."
          );
        }
      })
      .catch((error) => {
        setMessage(
          "Lamentamos mas de momento não é possível atualizar os dados do aluno. Dados de autenticação inválidos."
        );
      });
  }

  useEffect(() => {
    if (id !== undefined)
      axios
        .get("http://localhost:5000/api/v1/student/" + id, {
          headers: authHeader(),
        })
        .then((res) => {
          if (res.data.success) {
            const dados = res.data.data[0];
            setName(dados.name);
            setAddress(dados.address);
            setNif(dados.nif);
          } else {
            setMessage(
              "Lamentamos mas de momento não é possível atualizar os dados do aluno. Aluno desconhecido."
            );
          }
        })
        .catch((error) => {
          setMessage(
            "Lamentamos mas de momento não é possível atualizar os dados do aluno. Dados de autenticação inválidos."
          );
        });
  }, []);

  return (
    <Box display="flex" justifyContent="center" marginTop="1vh">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          {message && (
            <Alert variant="filled" severity="error" sx={{ margin: 3 }}>
              <AlertTitle>Ocorreu um erro</AlertTitle>
              <strong>{message}</strong>
            </Alert>
          )}
        </Grid>
        <Grid item xs={6} sx={{ margin: 3 }}>
          <TextField
            id="id"
            label="Read Only"
            defaultValue="0"
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            value={id}
            sx={{ marginBottom: 3 }}
          />
          <br />
          <TextField
            id="name"
            label="Nome"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            value={name}
            onChange={(value) => setName(value.target.value)}
            fullWidth
            sx={{ marginBottom: 3 }}
          />
          <br />
          <TextField
            id="address"
            label="Morada"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            value={address}
            onChange={(value) => setAddress(value.target.value)}
            fullWidth
            sx={{ marginBottom: 3 }}
          />
          <br />
          <TextField
            id="nif"
            label="NIF"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={nif}
            onChange={(value) => setNif(value.target.value)}
            fullWidth
            sx={{ marginBottom: 3 }}
          />
          <br />
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            {id ? (
              <Button variant="contained" color="success" onClick={updateData}>
                Atualizar
              </Button>
            ) : (
              <Button variant="contained" color="success" onClick={createData}>
                Criar
              </Button>
            )}
            <Button
              variant="outlined"
              color="info"
              onClick={() => {
                nav("/list");
              }}
            >
              Voltar
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
