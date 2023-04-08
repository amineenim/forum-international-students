import React, { useState } from 'react';
import { Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import UniversityImage from '../assets/bg-university.avif';

const ChangePasswordPage = () => {

  const [oldPassword, setOldPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
    setOldPasswordError(event.target.value.trim() === '');
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    setNewPasswordError(event.target.value.trim() === '');
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError(event.target.value.trim() === '');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (oldPassword.trim() === '') {
      setOldPasswordError(true);
      
    }
    if (newPassword.trim() === '') {
      setNewPasswordError(true);
      
    }
    if (confirmPassword.trim() === '') {
      setConfirmPasswordError(true);
      return;
    }
    // TODO: Changer le mot de passe
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div
      style={{
        backgroundImage: `url(${UniversityImage})`,
        height: '100vh',
        backgroundSize: 'cover',

      }}>
      <div style={{
        backgroundColor: 'rgb(255, 241, 224)',
        width: '60%',
        margin: 'auto'


      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',



        }}>
          <Typography variant="h5" style={{ marginBottom: 10 }}>Changer de mot de passe</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="mot de passe actuel"
              type={showPassword ? 'text' : 'password'}
              value={oldPassword}
              onChange={handleOldPasswordChange}
              margin="normal"
              error={oldPasswordError}
              helperText={oldPasswordError ? 'Le mot de passe actuel est obligatoire' : ''}
              
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                style: {

                  backgroundColor: 'white',
                },
              }}
              onBlur={() => {
                if (oldPassword.trim() === '') {
                  setOldPasswordError(true);
                }
              }}
            />
            <TextField
              label="Nouveau mot de passe"
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={handleNewPasswordChange}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                style: {

                  backgroundColor: 'white',
                },
              }}
              error={newPasswordError}
              helperText={newPasswordError ? 'Le nouveau mot de passe est obligatoire' : ''}
              onBlur={() => {
                if (newPassword.trim() === '') {
                  setNewPasswordError(true);
                }
              }}
            />
            <TextField
              label="Confirmer mot de passe"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                style: {

                  backgroundColor: 'white',
                },
              }}
              error={confirmPasswordError}
              helperText={confirmPasswordError ? 'Le nouveau mot de passe est obligatoire' : ''}
              onBlur={() => {
                if (confirmPassword.trim() === '') {
                  setConfirmPasswordError(true);
                }
              }}
            />
            <Button variant="contained" color="primary" type="submit" style={{ backgroundColor: 'gray', marginTop: '1rem' }}>
              Valider
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
