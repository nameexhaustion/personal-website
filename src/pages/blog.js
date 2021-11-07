import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import TopAppBar from '../components/TopAppBar';
import Layout from '../components/Layout';
import { Typography, Box, Paper } from '@mui/material';
import { Link } from 'gatsby-theme-material-ui';

const BlogPost = ({ title, description, date, name }) => {
  return (
    <Box marginBottom={2} key={`${title}${date}`}>
      <Paper sx={{ padding: 2 }}>
        <Box marginBottom={1}>
          <Typography variant="h6">
            <Link to={`/blog/${name}`}>{title}</Link>
          </Typography>
          <Typography variant="caption">{date}</Typography>
        </Box>
        <Typography>{description}</Typography>
      </Paper>
    </Box>
  );
};

const Blog = () => {
  const data = useStaticQuery(graphql`
    {
      allFile(
        filter: { sourceInstanceName: { eq: "blog" } }
        sort: { fields: childMdx___frontmatter___date, order: DESC }
      ) {
        nodes {
          childMdx {
            frontmatter {
              title
              description
              date(formatString: "YYYY-MM-DD")
            }
          }
          name
        }
      }
    }
  `);

  const posts = [];

  data['allFile']['nodes'].forEach((n) =>
    posts.push(BlogPost({ ...n['childMdx']['frontmatter'], name: n['name'] }))
  );

  return (
    <>
      <TopAppBar />
      <Layout>
        <div>
          <Typography variant="h4" textAlign="center">
            Blog
          </Typography>
          <Typography variant="subtitle1" textAlign="center">
            I write about stuff here
          </Typography>
        </div>
        <div>{posts}</div>
      </Layout>
    </>
  );
};

export default Blog;
