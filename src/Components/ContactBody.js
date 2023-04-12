import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UniversityImage from '../assets/bg-university.avif';

const theme = createTheme({
  palette: {
    primary: {
      main: "#808080",
    },

  },
});

export default function ConatctBody() {

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError(event.target.value.trim() === '');
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(event.target.value.trim() === '');
  };
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
    setMessageError(event.target.value.trim() === '');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim() === '') {
      setNameError(true);

    }
    if (email.trim() === '') {
      setEmailError(true);

    }
    if (message.trim() === '') {
      setMessageError(true);
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
              border : 'solid black 2px',
              width: '50%'
              

            }}
          >
          <Typography component="h1" variant="h5">
            Contactez nous
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  value={name}
                  onChange={handleNameChange}
                  fullWidth
                  id="name"
                  label="Nom"
                  autoFocus
                  InputProps={{
                    style: {

                      backgroundColor: 'white',
                    },
                  }}
                  error={nameError}
                  helperText={nameError ? 'Le nom est obligatoire' : ''}
                  onBlur={() => {
                    if (name.trim() === '') {
                      setNameError(true);
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="email"
                  label="Adresse mail"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  autoComplete="family-name"
                  InputProps={{
                    style: {

                      backgroundColor: 'white',
                    },
                  }}
                  error={emailError}
                  helperText={emailError ? "L'adresse mail est obligatoire" : ''}
                  onBlur={() => {
                    if (email.trim() === '') {
                      setEmailError(true);
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="message"
                  label="Message"
                  name="message"
                  value={message}
                  onChange={handleMessageChange}
                  autoComplete="message"
                  multiline
                  rows={4}
                  InputProps={{
                    style: {

                      backgroundColor: 'white',
                    },
                  }}
                  error={messageError}
                  helperText={messageError ? 'Le message est obligatoire' : ''}
                  onBlur={() => {
                    if (message.trim() === '') {
                      setMessageError(true);
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
              Envoyer
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
    </ThemeProvider >
  );
}