import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Main = styled(Paper)(({ theme }) => ({
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
    margin: `${theme.spacing(6)} auto`,
    padding: `${theme.spacing(8)} ${theme.spacing(12)}`,
  },
  '> *': {
    marginBottom: theme.spacing(4),
  },
}));

export default Main;
