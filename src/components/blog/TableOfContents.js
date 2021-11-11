import React, { useEffect } from 'react';
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
import { throttle } from 'lodash';
import { Link } from 'gatsby-theme-material-ui';
import { slug } from 'github-slugger';

const TocButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(8),
  right: '-94px',
  [theme.breakpoints.up('lg')]: {
    top: theme.spacing(9),
    right: theme.spacing(1),
  },
}));

const TableOfContents = ({ headings: h }) => {
  const [state, setState] = React.useState(false);

  const setOpen = (open) => {
    switch (open) {
      case true:
        document.querySelector('#main').classList.add('main-toc-open');
        setState(true);
        break;
      case false:
        document.querySelector('#main').classList.remove('main-toc-open');
        setState(false);
        break;
    }
  };

  const headings = h.map(({ depth, value }) => ({
    depth,
    value,
    id: `${slug(value)}`,
  }));

  const Headings = headings.map(({ id, value, depth }) => (
    <Link sx={{ textDecoration: 'none' }} key={id} to={`#${id}`}>
      <MenuItem>
        <ListItemText id={`toc-${id}`} inset={depth === 1 ? false : true}>
          {value}
        </ListItemText>
      </MenuItem>
    </Link>
  ));

  useEffect(() => {
    const callback = throttle(() => {
      let id = headings[0].id;
      let dist = Math.abs(
        document.querySelector(`#${headings[0].id}`).getBoundingClientRect().y
      );
      for (let i = 0; i < headings.length; i++) {
        let e = document.querySelector(`#${headings[i].id}`);
        let d = Math.abs(e.getBoundingClientRect().y);
      }
      for (let i = 0; i < headings.length; i++) {
        let e = document.querySelector(`#${headings[i].id}`);
        let d = Math.abs(e.getBoundingClientRect().y);
        if (d < dist) {
          id = e.id;
          dist = d;
        }
        document
          .querySelector(`#toc-${e.id}`)
          .classList.remove('active_section');
      }
      document.querySelector(`#toc-${id}`).classList.add('active_section');
    }, 200);
    window.addEventListener('scroll', callback);

    return () => window.removeEventListener('scroll', callback);
  }, [headings]);

  return (
    <>
      <TocButton
        color="secondary"
        variant="extended"
        onClick={() => setOpen(true)}
      >
        <TocIcon sx={{ mr: 1 }} />
        Contents
      </TocButton>
      <Drawer
        variant="persistent"
        anchor="right"
        open={state}
        onClose={() => setOpen(false)}
      >
        <Toolbar />
        <MenuList dense>
          <MenuItem onClick={() => setOpen(false)}>
            <Stack sx={{ width: '100%' }} direction="row">
              <Typography sx={{ flexGrow: 1 }} variant="h6">
                Contents
              </Typography>
              <Button endIcon={<CloseIcon />}>Close</Button>
            </Stack>
          </MenuItem>
          {Headings}
        </MenuList>
      </Drawer>
    </>
  );
};

export default TableOfContents;
