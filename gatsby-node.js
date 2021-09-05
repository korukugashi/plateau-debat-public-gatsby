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
