import * as React from 'react';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { Button, Link } from 'gatsby-theme-material-ui';

const TopAppBar = () => {
  const [state, setState] = React.useState(false);

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
    marginRight: theme.spacing(2),
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
            onClick={() => setState(true)}
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
      <Drawer anchor="left" open={state} onClose={() => setState(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setState(false)}
          onKeyDown={() => setState(false)}
        >
          <List>
            <ListItem>
              <Typography variant="h6">a website</Typography>
            </ListItem>
            <Link underline="none" to="/">
              <ListItem button key="home">
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link underline="none" to="/blog">
              <ListItem button key="blog">
                <ListItemText primary="Blog" />
              </ListItem>
            </Link>
            <Link underline="none" to="/about">
              <ListItem button key="about">
                <ListItemText primary="About" />
              </ListItem>
            </Link>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

const Layout = (props) => {
  const L = styled('main')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8),
    },
  }));

  const P = styled(Paper)(({ theme }) => ({
    margin: `auto ${theme.spacing(1)}`,
    width: '100%',
    padding: `${theme.spacing(6)} ${theme.spacing(8)}`,
    maxWidth: theme.breakpoints.values.md,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4),
      borderRadius: 0,
      boxShadow: 'none',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(6),
      padding: `${theme.spacing(8)} ${theme.spacing(12)}`,
    },
    '> *': {
      marginBottom: theme.spacing(4),
    },
  }));

  return (
    <>
      <TopAppBar />
      <L>
        <P>{props.children}</P>
      </L>
    </>
  );
};

export default Layout;
