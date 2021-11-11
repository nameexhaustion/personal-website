import React from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import TocIcon from '@mui/icons-material/Toc';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CloseIcon from '@mui/icons-material/Close';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import { Link } from 'gatsby-theme-material-ui';
import { slug } from 'github-slugger';

const TocButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(7),
  right: '-94px',
  [theme.breakpoints.up('sm')]: {
    top: theme.spacing(8),
  },
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}));

const TocList = ({ headings: h, title }) => {
  const headings = h.map(({ depth, value }) => ({
    depth,
    value,
    id: `#${slug(value)}`,
  }));

  const Headings = headings.map(({ id, value, depth }) => (
    <Link sx={{ textDecoration: 'none' }} key={id} to={id}>
      <MenuItem>
        <ListItemText
          sx={{ whiteSpace: 'initial' }}
          inset={depth === 1 ? false : true}
        >
          {value}
        </ListItemText>
      </MenuItem>
    </Link>
  ));

  return (
    <MenuList sx={{ maxWidth: 320 }} dense>
      {title}
      {Headings}
    </MenuList>
  );
};

const StaticDrawer = styled(Drawer)(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

const TocDrawer = ({ headings }) => {
  const [state, setState] = React.useState(false);

  return (
    <>
      <TocButton
        color="secondary"
        variant="extended"
        onClick={() => setState(true)}
      >
        <TocIcon sx={{ mr: 1 }} />
        Contents
      </TocButton>
      <Drawer
        variant="persistent"
        anchor="right"
        open={state}
        onClose={() => setState(false)}
      >
        <Toolbar />
        <div onClick={() => setState(false)}>
          <TocList
            headings={headings}
            title={
              <MenuItem>
                <Stack sx={{ width: '100%' }} direction="row">
                  <Typography sx={{ flexGrow: 1 }} variant="h6">
                    Contents
                  </Typography>
                  <Button endIcon={<CloseIcon />}>Close</Button>
                </Stack>
              </MenuItem>
            }
          />
        </div>
      </Drawer>
      <StaticDrawer variant="permanent">
        <Toolbar />
        <TocList
          headings={headings}
          title={
            <MenuItem>
              <Stack direction="row">
                <Typography variant="h6">Contents</Typography>
              </Stack>
            </MenuItem>
          }
        />
      </StaticDrawer>
    </>
  );
};

export default TocDrawer;
