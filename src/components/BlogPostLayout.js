import React, { memo } from 'react';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import MuiTable from '@mui/material/Table';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Layout from './Layout';
import { Button } from 'gatsby-theme-material-ui';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BlogPostSubtitle from './BlogPostSubtitle';
import { MDXProvider } from '@mdx-js/react';
import TeX from '@matejmazur/react-katex';
import CodeBlock from './CodeBlock';
import { Helmet } from 'react-helmet';

import '../style/code.css';

const getChildrenText = (children) => {
  if (typeof children === 'string') {
    return children;
  }
  if (typeof children === 'object') {
    if (children.props !== undefined) {
      return getChildrenText(children.props.children);
    }
    let d = '';
    for (let i = 0; i < children.length; i++) {
      d += getChildrenText(children[i]);
    }
    return d;
  }
};

const BlogPostLayout = (props) => {
  const { frontmatter } = props.pageContext;

  const Title = (props) => (
    <Typography
      sx={{ marginBottom: 4 }}
      {...props}
      id={getChildrenText(props.children)
        .replaceAll(' ', '-')
        .replace(/[^0-9A-Z-]+/gi, '')}
    />
  );

  const components = {
    // https://github.com/VdustR/example-material-ui-mdx/blob/master/src/components.js
    h1: (props) => <Title {...props} variant="h1" />,
    h2: (props) => <Title {...props} variant="h2" />,
    h3: (props) => <Title {...props} variant="h3" />,
    h4: (props) => <Title {...props} variant="h4" />,
    h5: (props) => <Title {...props} variant="h5" />,
    h6: (props) => <Title {...props} variant="h6" />,
    a: (props) => {
      return (
        <a href={props.href} target="_blank" rel="noopener noreferrer">
          {props.children}
        </a>
      );
    },
    strong: (() => {
      const Strong = (props) => <Typography {...props} fontWeight="500" />;
      return memo(Strong);
    })(),
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
    tex: (props) => {
      return <TeX math={props.children} />;
    },
  };

  return (
    <MDXProvider components={components}>
      <Helmet>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
      </Helmet>
      <Layout>
        <Button to="/blog" startIcon={<ArrowBackIcon />}>
          All posts
        </Button>
        <div>
          <Typography variant="h4">{frontmatter.title}</Typography>
          <BlogPostSubtitle
            tags={frontmatter.tags}
            author={frontmatter.author}
            date={frontmatter.date}
            update={frontmatter.update}
          />
        </div>
        {props.children}
      </Layout>
    </MDXProvider>
  );
};

export default BlogPostLayout;
