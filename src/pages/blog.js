import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/Layout';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';

import BlogPostCard from '../components/blog/BlogPostCard';

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

  data.allFile.nodes.forEach(
    (n, i) =>
      n !==
      posts.push(
        BlogPostCard({
          ...n.childMdx.frontmatter,
          path: n.relativeDirectory,
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
    </Layout>
  );
};

export default Blog;
