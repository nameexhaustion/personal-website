import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { Button } from 'gatsby-theme-material-ui';

const TopAppBar = () => {
  const ButtonContainer = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
    height: theme.spacing(8),
    display: 'flex',
    alignItems: 'stretch',
    '& > *': {
      paddingLeft: `${theme.spacing(3)} !important`,
      paddingRight: `${theme.spacing(3)} !important`,
    },
  }));

  const MenuButton = styled(IconButton)(({ theme }) => ({
    mr: 2,
    [theme.breakpoints.up('md')]: { display: 'none' },
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="secondary" position="fixed">
        <Toolbar>
          <MenuButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </MenuButton>
          <Typography variant="h6" component="div" sx={{ mr: 6 }}>
            a website
          </Typography>
          <ButtonContainer>
            <Button to="/">Home</Button>
            <Button to="/blog">Blog</Button>
            <Button to="/about">About</Button>
          </ButtonContainer>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopAppBar;
