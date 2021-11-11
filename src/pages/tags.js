import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { Link } from 'gatsby-theme-material-ui';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout/PageLayout';

const Tags = () => {
  const data = useStaticQuery(graphql`
    {
      allFile(
        filter: { sourceInstanceName: { eq: "blog" }, extension: { eq: "mdx" } }
      ) {
        group(field: childMdx___frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  let tags = data.allFile.group.map((v) => v.fieldValue);

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
          Tags
        </Typography>
        <Typography variant="subtitle1" textAlign="center">
          Blog post tags
        </Typography>
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {tags.map((t, i) => (
          <Box
            key={i}
            sx={{
              marginRight: 1,
              marginTop: 1,
              display: 'inline-block',
            }}
          >
            <Link underline="hover" to={`/tags/${t}`}>
              <Chip
                sx={{ '&:hover': { cursor: 'pointer' } }}
                label={t}
                variant="outlined"
              />
            </Link>
          </Box>
        ))}
      </Box>
    </Layout>
  );
};

export default Tags;
