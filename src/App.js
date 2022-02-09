import "./App.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";

import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

function App() {
  const [data, setData] = useState({ verbe: [], verbeLoaded: false });
  const [open, setOpen] = React.useState({ text: "error", isError: false });
  const conjugationFR = require("conjugation-fr");

  const handleSubmit = (event) => {
    event.preventDefault();
    const datao = new FormData(event.currentTarget);
    let verbeEntrer = datao.get("verbe").toLowerCase();

    try {
      let vpresent = conjugationFR.conjugate(
        verbeEntrer,
        "indicative",
        "present"
      )[0];
      let vpasse = conjugationFR.conjugate(
        verbeEntrer,
        "indicative",
        "perfect-tense"
      )[0];
      let nouvVerbe = [
        createData(0, verbeEntrer, vpresent, vpasse, verbeEntrer),
      ];

      if (data.verbe.length > 0) {
        let verbeAjout = data.verbe;
        verbeAjout.push(
          createData(
            data.verbe.length,
            verbeEntrer,
            vpresent,
            vpasse,
            verbeEntrer
          )
        );
        nouvVerbe = verbeAjout;
      }

      setData({ verbe: nouvVerbe, verbeLoaded: true });
      setOpen({ text: "", isError: false });
    } catch (err) {
      console.log(err);
      if (verbeEntrer === "") {
        setOpen({
          text: `Oups, vous n'avez rien écrit!`,
          isError: true,
        });
      } else {
        setOpen({
          text: `Le verbe "${verbeEntrer}" n'existe pas.`,
          isError: true,
        });
      }
    }
  };

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
          <Typography component="h1" variant="h5">
            Conjugaison des verbes
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="verbe"
              label="Verbe à conjuguer"
              name="verbe"
              autoFocus
            />
            <Box sx={{ width: "100%" }}>
              <Collapse in={open.isError}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="error"
                      size="md"
                      onClick={() => {
                        setOpen({ text: "error", isError: false });
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 5 }}
                >
                  {open.text}
                </Alert>
              </Collapse>
            </Box>

            <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
              <FormLabel component="legend">Modes</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="present"
                      color="primary"
                      disabled={true}
                      checked={true}
                    />
                  }
                  label="Présent"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="perfect-tense"
                      color="primary"
                      disabled={true}
                      checked={true}
                    />
                  }
                  label="Passé composé"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="future"
                      color="primary"
                      disabled={true}
                      checked={true}
                    />
                  }
                  label="Futur proche"
                />
              </FormGroup>
            </FormControl>

            <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
              <FormLabel component="legend">Pronoms</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="je"
                      color="primary"
                      disabled={true}
                      checked={true}
                    />
                  }
                  label="Je"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="tu"
                      color="primary"
                      disabled={true}
                      checked={false}
                    />
                  }
                  label="Tu"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="il"
                      color="primary"
                      disabled={true}
                      checked={false}
                    />
                  }
                  label="Il/elle/on"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="nous"
                      color="primary"
                      disabled={true}
                      checked={false}
                    />
                  }
                  label="Nous"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="vous"
                      color="primary"
                      disabled={true}
                      checked={false}
                    />
                  }
                  label="Vous"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="ils"
                      color="primary"
                      disabled={true}
                      checked={false}
                    />
                  }
                  label="Ils/Elles"
                />
              </FormGroup>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Conjuguer
            </Button>
          </Box>
        </Box>
      </Container>
      {data.verbeLoaded && (
        <Container component="main" maxWidth="md">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 250 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Verbe</TableCell>
                  <TableCell align="right">Présent</TableCell>
                  <TableCell align="right">Passé composé</TableCell>
                  <TableCell align="right">Futur proche</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.verbe.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.verbe}
                    </TableCell>
                    <TableCell align="right">
                      {row.present.pronoun + " " + row.present.verb}
                    </TableCell>
                    <TableCell align="right">
                      {row.passe.pronoun + " " + row.passe.verb}
                    </TableCell>
                    <TableCell align="right">
                      {"je vais " + row.fproche}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}
    </ThemeProvider>
  );
}

export default App;

function createData(id, verbe, present, passe, fproche) {
  return { id, verbe, present, passe, fproche };
}
