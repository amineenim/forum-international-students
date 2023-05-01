import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormHelperText from '@mui/material/FormHelperText';
import UniversityImage from '../assets/bg-university.avif';


const theme = createTheme({
  palette: {
    primary: {
      main: "#808080",
    },

  },
});

function NouveauPoste() {
  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState(false);
  const [titre, setTitre] = useState('');
  const [titreError, setTitreError] = useState(false);
  const [texte, setTexte] = useState('');
  const [texteError, setTexteError] = useState(false);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory === '') {
      setCategoryError(true);
    } else {
      setCategory(selectedCategory);
      setCategoryError(false);
    }
  };

  const handleTitreChange = (event) => {
    setTitre(event.target.value);
    setTitreError(event.target.value.trim() === '');
  };
  const handleTexteChange = (event) => {
    setTexte(event.target.value);
    setTexteError(event.target.value.trim() === '');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (category.trim() === '') {
      setCategoryError(true);

    }

    if (titre.trim() === '') {
      setTitreError(true);

    }
    if (texte.trim() === '') {
      setTexteError(true);
      return;
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="m">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundImage: `url(${UniversityImage})`,
            height: '100vh',
            padding: '2rem'
          }}
        >
          <Box
            sx={{
              marginTop: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgb(255, 241, 224)',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
              border: 'solid black 2px',
              width: '50%'


            }}
          >
            <Typography component="h1" variant="h5">
              Nouveau Poste
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} >
                  <FormControl fullWidth error={categoryError} >
                    <InputLabel id="category-label">Catégorie*</InputLabel>
                    <Select
                      labelId="category-label"
                      id="category"
                      value={category}
                      label="Catégorie*"
                      onChange={handleCategoryChange}
                      style={{backgroundColor: "white"}}
                      onBlur={() => {
                        if (category.trim() === '') {
                          setCategoryError(true);
                        }
                      }}
                      
                    >
                      <MenuItem value={1}>categorie 1</MenuItem>
                      <MenuItem value={2}>categorie 2</MenuItem>
                      <MenuItem value={3}>categorie 3</MenuItem>
                    </Select>
                    {categoryError && <FormHelperText>La categorie est obligatoire</FormHelperText>}
                  </FormControl>
                  
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    fullWidth
                    id="titre"
                    label="Titre*"
                    category="titre"
                    value={titre}
                    onChange={handleTitreChange}
                    autoComplete="family-category"
                    InputProps={{
                      style: {

                        backgroundColor: 'white',
                      },
                    }}
                    error={titreError}
                    helperText={titreError ? "Le titre est obligatoire" : ''}
                    onBlur={() => {
                      if (titre.trim() === '') {
                        setTitreError(true);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="texte"
                    label="Texte*"
                    category="texte"
                    value={texte}
                    onChange={handleTexteChange}
                    autoComplete="texte"
                    multiline
                    rows={4}
                    InputProps={{
                      style: {

                        backgroundColor: 'white',
                      },
                    }}
                    error={texteError}
                    helperText={texteError ? 'Le texte est obligatoire' : ''}
                    onBlur={() => {
                      if (texte.trim() === '') {
                        setTexteError(true);
                      }
                    }}
                  />
                </Grid>


              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Poster
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider >
  );
}

export default NouveauPoste;
