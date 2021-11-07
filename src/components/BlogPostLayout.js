import * as React from 'react';
import Typography from '@mui/material/Typography';
import Layout from './Layout';
import { Button } from 'gatsby-theme-material-ui';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BlogPostLayout = (props) => {
  return (
    <Layout>
      <Button to="/blog" startIcon={<ArrowBackIcon />}>
        All posts
      </Button>
      <Typography variant="h4">
        {props.pageContext.frontmatter.title}
      </Typography>
      <Typography variant="caption">
        {
          new Date(props.pageContext.frontmatter.date)
            .toISOString()
            .split('T')[0]
        }
      </Typography>
      {props.children}
    </Layout>
  );
};

export default BlogPostLayout;
