import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {FaUserAlt} from 'react-icons/fa'
import { NavLink } from 'react-router-dom';

const theme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
      
    },
  });

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <div>
      <ThemeProvider theme={theme}>
      <Button
        id="basic-button"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <p>Mon Compte</p>
        <FaUserAlt/>
      </Button>
      </ThemeProvider>
      <Menu
        id="accont-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <NavLink to='/login'>
          <MenuItem onClick={handleClose}>se connecter</MenuItem>
        </NavLink>
        <NavLink to='/register'>
          <MenuItem onClick={handleClose}>créer un compte</MenuItem>
        </NavLink>
        
      </Menu>
    </div>
  );
}