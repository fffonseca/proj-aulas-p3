import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import authHeader from "../Auth/auth.header";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteDialog() {
  const { id } = useParams();
  const [open, setOpen] = React.useState(true);

  let nav = useNavigate();

  const deleteStudent = () => {
    axios
      .delete("http://localhost:5000/api/v1/student/" + id, {
        headers: authHeader(),
      })
      .then((res) => {
        if (res.status === 204) {
          nav("/list");
        } else {
          console.log("deu buraco!");
          /*setMessage(
            "Lamentamos mas não foi possível apagar os dados do aluno. Dados inválidos."
          );*/
        }
      })
      .catch((error) => {
        console.log("fez pum!");
        /*setMessage(
          "Lamentamos mas de momento não é possível eliminar os dados do aluno. Dados de autenticação inválidos."
        );*/
      });
  };

  const handleClose = () => {
    setOpen(false);
    nav("/list");
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Tem a certeza que deseja eliminar?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Depois de eliminado já não é possível voltar atrás.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Não</Button>
          <Button onClick={deleteStudent} autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
