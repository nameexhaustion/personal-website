module.exports = {
  siteMetadata: {
    siteUrl: 'https://simonlin.netlify.app',
    title: 'a website',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-theme-material-ui',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
          },
        ],
        rehypePlugins: [
          require('rehype-slug'),
          [require('rehype-autolink-headings'), { behavior: 'wrap' }],
        ],
        defaultLayouts: {
          default: require.resolve('./src/components/blog/BlogPostLayout.js'),
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/src/pages/blog`,
      },
    },
  ],
};
