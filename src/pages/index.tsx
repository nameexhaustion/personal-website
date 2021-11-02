import * as React from 'react';
import TopAppBar from '../components/TopAppBar';
import Layout from '../components/Layout';
import { Typography } from '@mui/material';

export default () => (
  <>
    <TopAppBar />
    <Layout>
      <Typography variant="h5" textAlign="center">
        Hello
      </Typography>
      <Typography variant="subtitle1" textAlign="center">
        Welcome to my website
      </Typography>
      <Typography variant="h5">About Me</Typography>
    </Layout>
  </>
);
