import React from 'react';
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
import { Helmet } from 'react-helmet';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { Button, Link } from 'gatsby-theme-material-ui';
import favicon from '../images/favicon.png';

const TopAppBar = () => {
  const [state, setState] = React.useState(false);

  const AppBarLinkButton = styled(Button)(({ theme }) => ({
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Helmet
        htmlAttributes={{
          lang: 'en',
        }}
      >
        <meta charSet="utf-8" />
        <link rel="icon" href={favicon} />
      </Helmet>
      <AppBar color="secondary" position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ marginRight: 2, display: { md: 'none' } }}
            onClick={() => setState(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ mr: 6 }}>
            a website
          </Typography>
          <Box
            sx={{
              height: '64px',
              display: { xs: 'none', md: 'flex' },
              alignItems: 'stretch',
            }}
          >
            <AppBarLinkButton to="/">Home</AppBarLinkButton>
            <AppBarLinkButton to="/blog">Blog</AppBarLinkButton>
            <AppBarLinkButton to="/about">About</AppBarLinkButton>
          </Box>
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
      margin: `${theme.spacing(6)} auto`,
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
