import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Link } from 'gatsby-theme-material-ui';
import BlogPostSubtitle from './BlogPostSubtitle';

const BlogPostCard = ({ frontmatter, key, slug }) => {
  const { title, author, description, date, update, tags } = frontmatter;
  return (
    <Box marginBottom={2} key={key}>
      <Paper sx={{ padding: 2 }}>
        <Box marginBottom={1}>
          <Typography variant="h6">
            <Link underline="hover" to={`/blog/${slug}`}>
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

export default BlogPostCard;
