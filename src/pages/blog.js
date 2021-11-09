import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/Layout';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Link } from 'gatsby-theme-material-ui';
import { Helmet } from 'react-helmet';

import BlogPostSubtitle from '../components/BlogPostSubtitle';

const BlogPost = ({
  title,
  author,
  description,
  date,
  update,
  path,
  tags,
  key,
}) => {
  return (
    <Box marginBottom={2} key={key}>
      <Paper sx={{ padding: 2 }}>
        <Box marginBottom={1}>
          <Typography variant="h6">
            <Link underline="hover" to={`/blog/${path}`}>
              {title}
            </Link>
          </Typography>
          <BlogPostSubtitle
            tags={tags}
            author={author}
            date={date}
            update={update}
          />
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
        filter: { sourceInstanceName: { eq: "blog" }, extension: { eq: "mdx" } }
        sort: { fields: childMdx___frontmatter___update, order: DESC }
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
          }
          relativeDirectory
        }
      }
    }
  `);

  const posts = [];

  data['allFile']['nodes'].forEach(
    (n, i) =>
      n !==
      posts.push(
        BlogPost({
          ...n['childMdx']['frontmatter'],
          path: n['relativeDirectory'],
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
