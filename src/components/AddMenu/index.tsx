import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { MenuList, MenuItem, ListItemText, ListItemIcon } from '@mui/material';
import { TrendingDownOutlined, TrendingUpOutlined } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Divider } from '@mui/material';
import AddTransactionModal from '../AddTransactionModal';

const theme = createTheme({
  components: {
    MuiListItemText: {
      styleOverrides: {
        root: {
          fontFamily: 'Poppins',
          color: '#666666',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: 0, // modifique de acordo com suas necessidades
          fullWidth: {
            margin: 0, // modifique de acordo com suas necessidades
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          paddingTop: '14px',
          paddingBottom: '14px',
        },
      },
    },
  },
});

const AddButtonMenu = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          width: 175,
          position: 'absolute',
          borderRadius: '.5rem',
          top: '62px',
          zIndex: 1,
          padding: 0,
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 3px 5px',
          transition: 'all 0.5s ease-in-out',
        }}
      >
        <MenuList>
          <MenuItem onClick={handleOpen}>
            <ListItemIcon>
              <TrendingUpOutlined fontSize='small' sx={{ color: '#22c58b' }} />
            </ListItemIcon>
            <ListItemText>Receita</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleOpen}>
            <ListItemIcon>
              <TrendingDownOutlined fontSize='small' sx={{ color: '#eb3d3d' }} />
            </ListItemIcon>
            <ListItemText>Despesa</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
      <AddTransactionModal onClose={handleClose} open={open} type='despesa' />
    </ThemeProvider>
  );
};
export default AddButtonMenu;
