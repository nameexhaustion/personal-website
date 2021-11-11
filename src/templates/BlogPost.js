import React from 'react';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';
import { Button } from 'gatsby-theme-material-ui';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import TableOfContents from '../components/blog/TableOfContents';
import BlogPostSubtitle from '../components/blog/BlogPostSubtitle';
import MDXComponents from '../components/blog/MDXComponents';
import 'katex/dist/katex.min.css';
import '../style/blog.css';

const BlogPost = ({ data: { mdx } }) => {
  return (
    <MDXProvider components={MDXComponents}>
      <Helmet>
        <title>{mdx.frontmatter.title}</title>
        <meta name="description" content={mdx.frontmatter.description} />
      </Helmet>
      <Layout>
        <TableOfContents headings={mdx.headings} />
        <Button to="/blog" startIcon={<ArrowBackIcon />}>
          All posts
        </Button>
        <div>
          <Typography variant="h4" component="h1">
            {mdx.frontmatter.title}
          </Typography>
          <BlogPostSubtitle
            tags={mdx.frontmatter.tags}
            author={mdx.frontmatter.author}
            date={mdx.frontmatter.date}
            update={mdx.frontmatter.update}
          />
        </div>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </Layout>
    </MDXProvider>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        author
        description
        date
        update
        tags
      }
      headings {
        depth
        value
      }
    }
  }
`;
