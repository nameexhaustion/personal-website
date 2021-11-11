import React from 'react';
import { graphql } from 'gatsby';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Box from '@mui/material/Box';
import { Link } from 'gatsby-theme-material-ui';
import { Helmet } from 'react-helmet';

import Layout from '../components/Layout';
import BlogPostCard from '../components/blog/BlogPostCard';

const Blog = ({ pageContext, data }) => {
  const { numPages, currentPage } = pageContext;
  const posts = [];

  data.allFile.nodes.forEach(
    (n, i) =>
      n !==
      posts.push(
        BlogPostCard({
          frontmatter: n.childMdx.frontmatter,
          slug: n.childMdx.slug,
          key: i,
        })
      )
  );

  return (
    <Layout>
      <Helmet>
        <title>Blog</title>
        <meta
          name="description"
          content="simon's blog, with technology, programming, maths and stuff"
        />
      </Helmet>
      <div>
        <Typography variant="h4" component="h1" textAlign="center">
          Blog
        </Typography>
        <Typography variant="subtitle1" textAlign="center">
          I write about stuff here
        </Typography>
      </div>
      <div>{posts}</div>
      <Box display="flex" justifyContent="center">
        <Stack spacing={2}>
          <Pagination
            page={currentPage}
            count={numPages}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                component={Link}
                to={`/blog/${item.page === 1 ? '' : item.page}`}
              />
            )}
          />
        </Stack>
      </Box>
    </Layout>
  );
};

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allFile(
      filter: { sourceInstanceName: { eq: "blog" }, extension: { eq: "mdx" } }
      sort: { fields: childMdx___frontmatter___update, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        childMdx {
          frontmatter {
            title
            author
            description
            date
            update
            tags
          }
          slug
        }
      }
    }
  }
`;

export default Blog;
