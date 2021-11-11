import * as React from 'react';
import { styled } from '@mui/material/styles';
import TopAppBar from './TopAppBar';
import Main from './Main';
import { Helmet } from 'react-helmet';
import favicon from '../../images/favicon.png';

const Container = styled('div')(({ theme }) => ({
  '&::before': {
    content: '" "',
    display: 'block',
    visibility: 'hidden',
    pointerEvents: 'none',
    width: '100%',
    height: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(8),
    },
  },
}));

const PageLayout = (props) => {
  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: 'en',
        }}
      >
        <meta charSet="utf-8" />
        <link rel="icon" href={favicon} />
      </Helmet>
      <TopAppBar />
      <Container>
        <Main>{props.children}</Main>
      </Container>
    </>
  );
};

export default PageLayout;
