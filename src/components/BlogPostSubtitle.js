import React from 'react';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { Link } from 'gatsby-theme-material-ui';

const BlogPostSubtitle = ({ author, date, update, tags }) => {
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const d = new Date(date);

  return (
    <>
      <div>
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
      </div>
      <Typography variant="caption">
        <Link underline="hover" to={`/about`}>
          {author}
        </Link>{' '}
        · {`${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`}
        {(() => {
          if (update !== date) {
            const d = new Date(update);
            return ` · Updated ${
              month[d.getMonth()]
            } ${d.getDate()}, ${d.getFullYear()}`;
          }
        })()}
      </Typography>
    </>
  );
};

export default BlogPostSubtitle;
