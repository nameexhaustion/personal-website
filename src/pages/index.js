import React from 'react';
import Layout from '../components/Layout';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { StaticImage } from 'gatsby-plugin-image';
import { Helmet } from 'react-helmet';
import TeX from '@matejmazur/react-katex';

const Index = () => (
  <Layout>
    <Helmet>
      <title>a website</title>
      <meta name="description" content="simon's home on the internet" />
    </Helmet>
    <div>
      <Typography variant="h4" component="h1" textAlign="center">
        Hello
      </Typography>
      <Typography variant="subtitle1" textAlign="center">
        Welcome to my website
      </Typography>
    </div>
    <Box display="flex" justifyContent="center">
      <StaticImage
        src="../images/profile.png"
        placeholder="blurred"
        layout="fixed"
        width={160}
        height={160}
        quality={100}
      />
    </Box>
  </Layout>
);

export default Index;
