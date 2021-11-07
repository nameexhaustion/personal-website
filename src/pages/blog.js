import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/Layout';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Link } from 'gatsby-theme-material-ui';

const BlogPost = ({ title, description, date, name }) => {
  return (
    <Box marginBottom={2} key={`${title}${date}`}>
      <Link underline="hover" to={`/blog/${name}`}>
        <Paper sx={{ padding: 2, minHeight: '144px' }}>
          <Box marginBottom={1}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="caption">{date}</Typography>
          </Box>
          <Typography>{description}</Typography>
        </Paper>
      </Link>
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
  );
};

export default Blog;
