import React, { memo } from 'react';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import MuiTable from '@mui/material/Table';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import TeX from '@matejmazur/react-katex';
import CodeBlock from './CodeBlock';

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '&::before': {
    content: '" "',
    height: theme.spacing(10),
    marginTop: `-${theme.spacing(10)}`,
    display: 'block',
    pointerEvents: 'none',
    visibility: 'hidden',
  },
  '& > a': {
    color: 'inherit',
    textDecoration: 'none',
  },
  '& > a:hover': {
    textDecoration: 'underline',
  },
}));

const components = {
  // https://github.com/VdustR/example-material-ui-mdx/blob/master/src/components.js
  h1: (props) => <Title {...props} variant="h5" component="h2" />,
  h2: (props) => <Title {...props} variant="h6" component="h3" />,
  a: (props) => {
    return (
      <a
        href={props.href}
        target={
          props.href.includes('#') && !props.href.includes('https://')
            ? ''
            : '_blank'
        }
        rel="noopener noreferrer"
      >
        {props.children}
      </a>
    );
  },
  strong: (props) => (
    <Typography component="span" {...props} fontWeight="500" />
  ),
  blockquote: (() => {
    const Blockquote = (props) => (
      <Paper
        sx={{ borderLeft: '16px solid #000', padding: '4px 32px' }}
        {...props}
      />
    );
    return memo(Blockquote);
  })(),
  ul: (() => {
    const Ul = (props) => <Typography {...props} component="ul" />;
    return memo(Ul);
  })(),
  ol: (() => {
    const Ol = (props) => <Typography {...props} component="ol" />;
    return memo(Ol);
  })(),
  li: (() => {
    const Li = (props) => <Typography {...props} component="li" />;
    return memo(Li);
  })(),
  table: (() => {
    const Table = (props) => <MuiTable {...props} />;
    return memo(Table);
  })(),
  tr: (() => {
    const Tr = (props) => <TableRow {...props} />;
    return memo(Tr);
  })(),
  td: (() => {
    const Td = ({ align, ...props }) => (
      <TableCell align={align || undefined} {...props} />
    );
    return memo(Td);
  })(),
  tbody: (() => {
    const TBody = (props) => <TableBody {...props} />;
    return memo(TBody);
  })(),
  th: (() => {
    const Th = ({ align, ...props }) => (
      <TableCell align={align || undefined} {...props} />
    );
    return memo(Th);
  })(),
  thead: (() => {
    const THead = (props) => <TableHead {...props} />;
    return memo(THead);
  })(),
  hr: Divider,
  input: (() => {
    const Input = (props) => {
      const { type } = props;
      if (type === 'checkbox') {
        return <Checkbox {...props} disabled={false} readOnly={true} />;
      }
      return <input {...props} />;
    };
    return memo(Input);
  })(),
  wrapper: (() => {
    const Wrapper = (props) => <div {...props} className="markdown-body" />;
    return memo(Wrapper);
  })(),
  pre: (props) => {
    if (props.children.props.className) {
      if (props.children.props.className.includes('latex')) {
        return <TeX block>{props.children.props.children}</TeX>;
      }
    }
    return <CodeBlock {...props} />;
  },
  tex: (props) => <TeX math={props.children} />,
};

export default components;
