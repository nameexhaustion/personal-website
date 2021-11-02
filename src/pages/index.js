import * as React from 'react';
import TopAppBar from '../components/TopAppBar';
import Layout from '../components/Layout';
import { Box, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import ProfilePicture from '../images/profile.png';

const AboutMe = () => {
  const A = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
    '> *': {
      padding: theme.spacing(2),
    },
    '> * > *': {
      marginBottom: theme.spacing(2),
    },
  }));

  const L = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexBasis: '100%',
    height: '100%',
    [theme.breakpoints.up('md')]: {
      flexBasis: '40%',
    },
  }));

  const R = styled('div')(({ theme }) => ({
    height: '100%',
    flexGrow: 1,
  }));

  const Picture = () => {
    const I = styled('img')(() => ({
      width: '160px',
      height: '160px',
    }));

    return <I src={ProfilePicture} />;
  };

  return (
    <A>
      <L>
        <Picture />
        <Typography variant="h5">Simon Lin</Typography>
      </L>
      <Divider orientation="vertical" flexItem />
      <R>Right</R>
    </A>
  );
};

const Index = () => (
  <>
    <TopAppBar />
    <Layout>
      <div>
        <Typography variant="h5" textAlign="center">
          Hello
        </Typography>
        <Typography variant="subtitle1" textAlign="center">
          Welcome to my website
        </Typography>
      </div>
      <div>
        <Box marginBottom="16px">
          <Typography variant="h5">About Me</Typography>
        </Box>
        <AboutMe />
      </div>
      <div>
        <Box marginBottom="16px">
          <Typography variant="h5">Blog</Typography>
        </Box>
      </div>
    </Layout>
  </>
);

export default Index;
