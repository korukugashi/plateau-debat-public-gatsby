/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const { fmImagesToRelative } = require("gatsby-remark-relative-images")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `{
          allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "agenda" } } }
          ) {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }`
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/components/event.js`),
            context: {
              slug: node.fields.slug
            },
          })
        })
      })
    )

    resolve(
      graphql(
        `{
          allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "cr-debats" } } }
          ) {
            edges {
              node {
                html
                fields {
                  slug
                }
                frontmatter {
                  tags
                }
              }
            }
          }
          tags: allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "debat-tags" } } }
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  label
                }
              }
            }
          }
        }`
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          if (node.html) {
            createPage({
              path: node.fields.slug,
              component: path.resolve(`./src/components/article.js`),
              context: {
                slug: node.fields.slug
              },
            })
          }
        })

        const posts = result.data.allMarkdownRemark.edges
        const postsPerPage = 8
        const numPages = Math.ceil(posts.length / postsPerPage)
        const allTags = result.data.tags.edges.map(({node}) => node.frontmatter.label)
        Array.from({ length: numPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? `/cr-debats` : `/cr-debats/${i + 1}`,
            component: path.resolve("./src/components/cr-debats.js"),
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages,
              currentPage: i + 1,
              tags: allTags
            },
          })
        })

        result.data.tags.edges.forEach(({ node }) => {
          const postsByTag = posts.filter(post => post.node.frontmatter.tags.indexOf(node.frontmatter.label) > -1)
          const numPagesByTag = Math.ceil(postsByTag.length / postsPerPage)
          Array.from({ length: numPagesByTag }).forEach((_, i) => {
            createPage({
              path: i === 0 ? `/cr-debats${node.fields.slug}` : `/cr-debats${node.fields.slug}${i + 1}`,
              component: path.resolve("./src/components/cr-debats.js"),
              context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages: numPagesByTag,
                currentPage: i + 1,
                tagSlug: node.fields.slug,
                tags: [node.frontmatter.label]
              },
            })
          })
        })
      })
    )

    resolve(
      graphql(
        `{
          allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "publications" } } }
          ) {
            edges {
              node {
                html
                fields {
                  slug
                }
                frontmatter {
                  tags
                }
              }
            }
          }
          tags: allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "debat-tags" } } }
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  label
                }
              }
            }
          }
        }`
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          if (node.html) {
            createPage({
              path: node.fields.slug,
              component: path.resolve(`./src/components/article.js`),
              context: {
                slug: node.fields.slug
              },
            })
          }
        })

        const posts = result.data.allMarkdownRemark.edges
        const postsPerPage = 8
        const numPages = Math.ceil(posts.length / postsPerPage)
        Array.from({ length: numPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? `/publications` : `/publications/${i + 1}`,
            component: path.resolve("./src/components/publications.js"),
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages,
              currentPage: i + 1,
            },
          })
        })

        result.data.tags.edges.forEach(({ node }) => {
          const postsByTag = posts.filter(post => post.node.frontmatter.tags.indexOf(node.frontmatter.label) > -1)
          const numPagesByTag = Math.ceil(postsByTag.length / postsPerPage)
          Array.from({ length: numPagesByTag }).forEach((_, i) => {
            createPage({
              path: i === 0 ? `/publications${node.fields.slug}` : `/publications${node.fields.slug}${i + 1}`,
              component: path.resolve("./src/components/publications.js"),
              context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages: numPagesByTag,
                currentPage: i + 1,
                tagSlug: node.fields.slug,
                tags: [node.frontmatter.label]
              },
            })
          })
        })
      })
    )

    resolve(
      graphql(
        `{
          allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "lettre-info" } } }
          ) {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }`
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        const posts = result.data.allMarkdownRemark.edges
        const postsPerPage = 8
        const numPages = Math.ceil(posts.length / postsPerPage)
        Array.from({ length: numPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? `/publications/mots-et-debats` : `/publications/mots-et-debats/${i + 1}`,
            component: path.resolve("./src/components/lettre-info.js"),
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages,
              currentPage: i + 1,
            },
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
