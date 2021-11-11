import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { StaticImage } from 'gatsby-plugin-image';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { Button } from 'gatsby-theme-material-ui';
import BlogPostCard from '../components/blog/BlogPostCard';
import Layout from '../components/Layout';

const Index = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: { sourceInstanceName: { eq: "blog" }, extension: { eq: "mdx" } }
        sort: { fields: childMdx___frontmatter___update, order: DESC }
        limit: 1
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
  `);

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
        <title>a website</title>
        <meta name="description" content="simon's home on the internet" />
      </Helmet>
      <div>
        <Typography variant="h4" component="h1" textAlign="center">
          Hello
        </Typography>
        <Typography variant="subtitle1" textAlign="center">
          Welcome to my website
        </Typography>
      </div>
      <Box display="flex" justifyContent="center">
        <StaticImage
          src="../images/profile.png"
          placeholder="blurred"
          layout="fixed"
          width={160}
          height={160}
          quality={100}
        />
      </Box>
      <div>
        <Typography gutterBottom variant="h5">
          Latest blog post
        </Typography>
        {posts}
        <Button to="/blog" endIcon={<ArrowForwardIcon />}>
          See all
        </Button>
      </div>
    </Layout>
  );
};

export default Index;
