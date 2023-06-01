import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import authHeader from "../Auth/auth.header";

import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";

/*esta constante define as colunas*/
/*const columns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Nome" },
  { field: "address", headerName: "Morada", sortable: false },
  { field: "nif", headerName: "NIF", type: "number" },
  {
    field: "subjects",
    headerName: "Disciplinas",
    //valueGetter: (params) =>
    //  `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];*/

//constante que define as linhas (que por norma ela não existe!)
/*const rows = [
  {
    id: 1,
    name: "João Pedro",
    address: "Rua A, 35",
    nif: 123456789,
    subjects: "Programação I, Produção Áudio",
  },
  {
    id: 2,
    name: "Rui Mendes",
    address: "Rua X, 44",
    nif: 123456789,
    subjects: "Programação III, Laboratório Multimédia I",
  },
  {
    id: 3,
    name: "Figueiredo Antunes",
    address: "Rua K, 1",
    nif: 123456789,
    subjects: "Xpto Xpte",
  },
  {
    id: 4,
    name: "Leo Patrick",
    address: "Rua N, 145 1º Dir.",
    nif: 123456789,
    subjects: "Escrita Criativa, Fundamentos do Design",
  },
  {
    id: 5,
    name: "Juliana Silva",
    address: "Rua L, 3, 15º Esq.",
    nif: null,
    subjects: "Programação II, Desenvolvimento de Jogos Multimédia",
  },
];*/

function setHeaders(data, nav) {
  const headers = [];

  let headersName = Object.keys(data[0]);
  headersName.forEach((_element, key) => {
    //console.log(`{ field: ${headersName[key]}, headerName: ${headersName[key]}}`);
    headers.push({
      field: headersName[key],
      headerName: headersName[key].toUpperCase(),
      flex: 1,
      minWidth: 150,
    });

    if (key === headersName.length - 1) {
      headers.push({
        field: "actions",
        headerName: "Ações",
        type: "actions",
        width: 300,
        renderCell: (params) => (
          <>
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2, marginRight: 1 }}
              onClick={() => {
                nav("/edit/" + params.id);
              }}
            >
              Editar
            </Button>
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                nav("/delete/" + params.id);
              }}
            >
              Apagar
            </Button>
          </>
        ),
      });
    }
  });
  //});

  return headers;
}

export default function TableList() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  let nav = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/students", { headers: authHeader() })
      .then((res) => {
        if (res.data.success) {
          setColumns(setHeaders(res.data.data, nav));
          setRows(res.data.data);
        } else {
          //alert("Ocorreu um erro na execução do pedido.");
        }
      })
      .catch((error) => {
        //alert("Erro na ligação à API. " + error);
      });
  }, []);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      getRowId={(row) => row.id} //assumo que a chave primária chama-se 'id'
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
      autoHeight
      components={{
        NoRowsOverlay: () => (
          <Stack height="100%" alignItems="center" justifyContent="center">
            Não existem resultados para mostrar.
          </Stack>
        ),
        NoResultsOverlay: () => (
          <Stack height="100%" alignItems="center" justifyContent="center">
            A aplicação dos filtros não obtém resultados para mostrar.
          </Stack>
        ),
      }}
    />
  );
}
