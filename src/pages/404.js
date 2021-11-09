import React from 'react';
import Layout from '../components/Layout';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';

const F = () => (
  <Layout>
    <Helmet>
      <title>404</title>
      <meta
        name="description"
        content="couldn't find it, how absolutely tragic"
      />
    </Helmet>
    <Typography variant="h2" textAlign="center">
      404
    </Typography>
    <Typography textAlign="center">file not found</Typography>
    <Typography variant="h5" textAlign="center">
      {'	｡ﾟ･ (>﹏<) ･ﾟ｡'}
    </Typography>
  </Layout>
);
export default F;
