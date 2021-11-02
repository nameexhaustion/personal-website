import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export default (props) => {
  const L = styled('main')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8),
    },
  }));

  const P = styled(Paper)(({ theme }) => ({
    margin: `auto ${theme.spacing(1)}`,
    width: '100%',
    padding: `${theme.spacing(6)} ${theme.spacing(8)}`,
    maxWidth: theme.breakpoints.values.md,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4),
      borderRadius: 0,
      boxShadow: 'none',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(6),
      padding: `${theme.spacing(8)} ${theme.spacing(12)}`,
    },
    '> *': {
      marginBottom: theme.spacing(4),
    },
  }));

  return (
    <L>
      <P {...props} />
    </L>
  );
};
