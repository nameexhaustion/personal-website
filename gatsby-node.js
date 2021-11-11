const path = require('path');
const _ = require('lodash');

const postsPerPage = 8;

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const tagTemplate = path.resolve('src/templates/blogListTags.js');
  const result = await graphql(`
    {
      tags: allFile(
        filter: { sourceInstanceName: { eq: "blog" }, extension: { eq: "mdx" } }
      ) {
        group(field: childMdx___frontmatter___tags) {
          fieldValue
        }
      }
      slug: allFile(
        filter: { sourceInstanceName: { eq: "blog" }, extension: { eq: "mdx" } }
        sort: { fields: childMdx___frontmatter___update, order: DESC }
      ) {
        nodes {
          childMdx {
            slug
          }
        }
      }
    }
  `);

  // handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  {
    const tags = result.data.tags.group;

    await Promise.all(
      tags.map(async ({ fieldValue }) => {
        const result = await graphql(`
        {
          allFile(
            filter: {
              sourceInstanceName: { eq: "blog" }
              extension: { eq: "mdx" }
              childMdx: { frontmatter: { tags: { in: "${fieldValue}" } } }
            }
          ) {
            nodes {
              childMdx {
                slug
              }
            }
          }
        }
        `);

        const posts = result.data.allFile.nodes;

        const numPages = Math.ceil(posts.length / postsPerPage);

        Array.from({ length: numPages }).forEach((__, i) => {
          createPage({
            path:
              i == 0
                ? `/tags/${_.kebabCase(fieldValue)}/`
                : `/tags/${_.kebabCase(fieldValue)}/${i + 1}`,
            component: tagTemplate,
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              tag: fieldValue,
              slug: _.kebabCase(fieldValue),
              numPages,
              currentPage: i + 1,
            },
          });
        });
      })
    );
  }

  {
    const posts = result.data.slug.nodes;
    const numPages = Math.ceil(posts.length / postsPerPage);

    await Promise.all(
      Array.from({ length: numPages }).map(async (_, i) => {
        createPage({
          path: i == 0 ? '/blog' : `/blog/${i + 1}`,
          component: path.resolve('./src/templates/blogList.js'),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
          },
        });
      })
    );
  }
};
