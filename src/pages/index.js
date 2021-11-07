import * as React from 'react';
import TopAppBar from '../components/TopAppBar';
import Layout from '../components/Layout';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ProfilePicture from '../images/profile.png';

const Index = () => {
  const Picture = () => {
    const I = styled('img')(() => ({
      width: '160px',
      height: '160px',
    }));

    return <I src={ProfilePicture} />;
  };

  return (
    <>
      <TopAppBar />
      <Layout>
        <div>
          <Typography variant="h4" textAlign="center">
            Hello
          </Typography>
          <Typography variant="subtitle1" textAlign="center">
            Welcome to my website
          </Typography>
        </div>
        <Box display="flex" justifyContent="center">
          <Picture />
        </Box>
      </Layout>
    </>
  );
};

export default Index;
