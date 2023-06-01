import "./App.css";
import { BrowserRouter as Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import TableList from "./components/List/TableList";
import BasicForm from "./components/Form/BasicForm";
import DeleteDialog from "./components/Dialog/DeleteDialog";
import Button from "@mui/material/Button";

import { useEffect, useState } from "react";
import authService from "./services/auth.service";
import LoginUI from "./components/Auth/LoginUI";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function App() {
  const [user, setUser] = useState(null);
  const pages = [
    ["Alunos", "/list"],
    ["Novo Aluno", "/create"],
    ["Disciplinas", "/subjects"],
  ];
  const nav = useNavigate();

  useEffect(() => {
    updateUser();
  });

  function updateUser() {
    if (user == null) {
      const user = authService.getCurrentUser();
      if (user) {
        setUser({ user: user });
      }
    }
  }

  function logOut() {
    authService.logout();
    setUser(null);
    nav("/");
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Aplicação Web (realizada na aula)
            </Typography>

            <>
              {user && (
                <>
                  <>
                    {pages.map((page) => {
                      return (
                        <>
                          <Link
                            key={page[0]}
                            to={page[1]}
                            style={{
                              color: "white",
                              display: "block",
                              padding: 8,
                              textDecoration: "none",
                              fontSize: 14,
                            }}
                          >
                            {page[0].toUpperCase()}
                          </Link>
                        </>
                      );
                    })}
                  </>
                  <Button color="inherit" onClick={logOut}>
                    Logout
                  </Button>
                </>
              )}
            </>
          </Toolbar>
        </AppBar>
      </Box>
      <Routes>
        <Route path="/" element={<LoginUI />} />
        <Route path="/list" element={<TableList />} />
        {/* Criar um aluno */}
        <Route path="/create" element={<BasicForm />} />
        {/* Editar um aluno */}
        <Route path="/edit/:id" element={<BasicForm />} />
        {/* Elimina um aluno */}
        <Route path="/delete/:id" element={<DeleteDialog />} />
      </Routes>
    </>
  );
}

export default App;
