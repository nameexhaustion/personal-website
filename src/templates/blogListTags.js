import React from 'react';
import { graphql } from 'gatsby';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Link } from 'gatsby-theme-material-ui';
import { Helmet } from 'react-helmet';
import BlogPostCard from '../components/blog/BlogPostCard';
import Layout from '../components/Layout';

const Tags = ({ pageContext, data }) => {
  const { tag, slug, numPages, currentPage } = pageContext;

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
        <title>{`Tag: ${tag}`}</title>
        <meta name="description" content={`all posts to do with ${tag}`} />
      </Helmet>
      <div>
        <Button to="/tags" startIcon={<ArrowBackIcon />}>
          All tags
        </Button>
        <Typography variant="h4" component="h1" textAlign="center">
          Tag: {tag}
        </Typography>
        <Typography variant="subtitle1" textAlign="center">
          All posts to do with {tag}
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
                to={`/tags/${slug}/${item.page === 1 ? '' : item.page}`}
              />
            )}
          />
        </Stack>
      </Box>
    </Layout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query ($tag: String, $skip: Int!, $limit: Int!) {
    allFile(
      filter: {
        sourceInstanceName: { eq: "blog" }
        extension: { eq: "mdx" }
        childMdx: { frontmatter: { tags: { in: [$tag] } } }
      }
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
