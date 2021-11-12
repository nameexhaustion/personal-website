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
import { Link } from 'gatsby-theme-material-ui';
import { slug } from 'github-slugger';
import store from '../../redux/blogtocstore';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveHeading } from '../../redux/blogtocslice';

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

const TocListItem = ({ id, value, depth }) => {
  const activeHeading = useSelector((state) => state.activeHeading.payload);
  const dispatch = useDispatch();

  useEffect(() => {
    const IOCallback = ([entry]) => {
      if (entry.isIntersecting) {
        dispatch(setActiveHeading(id));
      }
    };

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(IOCallback, options);

    const e = document.querySelector(id);

    observer.observe(e);

    return () => {
      observer.unobserve(e);
    };
  }, [dispatch, id]);

  return (
    <Link sx={{ textDecoration: 'none' }} key={id} to={id}>
      <MenuItem>
        <ListItemText
          sx={{
            whiteSpace: 'initial',
            '& > *': {
              fontWeight: id === activeHeading ? '500' : '400',
            },
          }}
          inset={depth === 1 ? false : true}
        >
          {value}
        </ListItemText>
      </MenuItem>
    </Link>
  );
};

const TocList = ({ headings: h, title }) => {
  const headings = h.map(({ depth, value }) => ({
    depth,
    value,
    id: `#${slug(value)}`,
  }));

  const Headings = headings.map(({ id, value, depth }) =>
    TocListItem({ id, value, depth })
  );

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
    <Provider store={store}>
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
    </Provider>
  );
};

export default TocDrawer;
