import React from 'react';
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

const AppBarLinkButton = styled(Button)(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
}));

const TopAppBar = (props) => {
  const [state, setState] = React.useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar {...props} color="secondary" position="fixed" id="top-app-bar">
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

export default TopAppBar;
