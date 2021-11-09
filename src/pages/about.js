import React from 'react';
import Layout from '../components/Layout';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MailIcon from '@mui/icons-material/Mail';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { styled } from '@mui/material/styles';
import { StaticImage } from 'gatsby-plugin-image';
import { Helmet } from 'react-helmet';

const AboutMeLinks = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Stack direction="column" alignItems="start">
      <Button
        sx={{ textTransform: 'none', fontWeight: '400' }}
        size="small"
        startIcon={<MailIcon />}
        onClick={() => {
          navigator.clipboard.writeText('simonlin.rqmmw@slmail.me');
          setOpen(true);
        }}
      >
        simonlin.rqmmw@slmail.me
      </Button>
      <Button
        sx={{ textTransform: 'none', fontWeight: '400' }}
        size="small"
        startIcon={<GitHubIcon />}
        target="_blank"
        href="https://github.com/nameexhaustion"
      >
        github.com/nameexhaustion
      </Button>
      <Button
        sx={{ textTransform: 'none', fontWeight: '400' }}
        size="small"
        startIcon={<LocationOnIcon />}
        target="_blank"
        href="https://www.google.com/maps/place/Sydney+NSW+Australia"
      >
        Sydney NSW, Australia
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message="Copied to clipboard"
        onClose={() => setOpen(false)}
      />
    </Stack>
  );
};

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

  return (
    <A>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexBasis: { xs: '100%', md: '40%' },
          height: '100%',
        }}
      >
        <StaticImage
          src="../images/profile.png"
          placeholder="blurred"
          layout="fixed"
          width={160}
          height={160}
          quality={100}
        />
        <Typography sx={{ marginBottom: 4 }} variant="h6">
          Simon Lin
        </Typography>
        <AboutMeLinks />
      </Box>
      <Divider
        orientation="vertical"
        flexItem
        sx={{ display: { xs: 'none', md: 'block' } }}
      />
      <Box height="100%" sx={{ flexBasis: { md: '55%' } }}>
        <Typography sx={{ marginBottom: 2 }}>Hello there</Typography>
        <Typography sx={{ marginBottom: 2 }}>
          I'm someone who writes code and stuff.
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          I'm interested in technology, math, logic, anime and manga
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          I'm currently self-studying while working a part-time job
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          My dream job is to be a software developer
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          I always try to, and really wish I could understand everything
        </Typography>
      </Box>
    </A>
  );
};

const Index = () => (
  <Layout>
    <Helmet>
      <title>About</title>
      <meta name="description" content="about simon lin" />
    </Helmet>
    <div>
      <Typography variant="h4" component="h1" textAlign="center">
        About Me
      </Typography>
    </div>
    <Box marginBottom={0}>
      <AboutMe />
    </Box>
  </Layout>
);

export default Index;
