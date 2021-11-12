const path = require('path');
const { kebabCase } = require('lodash');

const postsPerPage = 8;

exports.createPages = async ({ actions, graphql, reporter }) => {
  const tasks = [];
  const { createPage } = actions;
  const result = await graphql(`
    {
      tags: allFile(
        filter: { sourceInstanceName: { eq: "blog" }, extension: { eq: "mdx" } }
      ) {
        group(field: childMdx___frontmatter___tags) {
          fieldValue
        }
      }
      allMdx: allFile(
        filter: { sourceInstanceName: { eq: "blog" }, extension: { eq: "mdx" } }
        sort: { fields: childMdx___frontmatter___update, order: DESC }
      ) {
        nodes {
          childMdx {
            id
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

  tasks.push(
    (async () => {
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

          Array.from({ length: numPages }).forEach(async (_, i) => {
            createPage({
              path:
                i == 0
                  ? `/tags/${kebabCase(fieldValue)}/`
                  : `/tags/${kebabCase(fieldValue)}/${i + 1}`,
              component: path.resolve('src/templates/BlogListTags.js'),
              context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                tag: fieldValue,
                slug: kebabCase(fieldValue),
                numPages,
                currentPage: i + 1,
              },
            });
          });
        })
      );
    })()
  );

  tasks.push(
    (async () => {
      const posts = result.data.allMdx.nodes;
      const numPages = Math.ceil(posts.length / postsPerPage);

      await Promise.all(
        Array.from({ length: numPages }).map(async (_, i) => {
          createPage({
            path: i == 0 ? '/blog' : `/blog/${i + 1}`,
            component: path.resolve('./src/templates/BlogList.js'),
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages,
              currentPage: i + 1,
            },
          });
        })
      );
    })()
  );

  tasks.push(
    (async () => {
      const posts = result.data.allMdx.nodes;

      await Promise.all(
        posts.map(async ({ childMdx: { id, slug } }) => {
          createPage({
            path: `/blog/${slug}`,
            component: path.resolve('./src/templates/BlogPost.js'),
            context: { id },
          });
        })
      );
    })()
  );

  await Promise.all(tasks.map((t) => t));
};
