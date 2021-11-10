import React from 'react';
// Components
import { Link, graphql } from 'gatsby';
import BlogPostCard from '../components/blog/BlogPostCard';
import Layout from '../components/Layout';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext;

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
        <title>Blog tags</title>
        <meta name="description" content={`all posts to do with ${tag}`} />
      </Helmet>
      <div>
        <Typography variant="h4" component="h1" textAlign="center">
          Tag: {tag}
        </Typography>
        <Typography variant="subtitle1" textAlign="center">
          All posts to do with {tag}
        </Typography>
      </div>
      <div>{posts}</div>
    </Layout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query ($tag: String) {
    allFile(
      filter: {
        sourceInstanceName: { eq: "blog" }
        extension: { eq: "mdx" }
        childMdx: { frontmatter: { tags: { in: [$tag] } } }
      }
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
`;
