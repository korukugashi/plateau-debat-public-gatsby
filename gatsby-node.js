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
            filter: { frontmatter: { templateKey: { eq: "action-post" } } }
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
            component: path.resolve(`./src/components/actionpost.js`),
            context: {
              slug: node.fields.slug,
            },
          })
        })
      })
    )
    resolve(
      graphql(
        `{
          allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "programmes" } } }
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  tags
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
            component: path.resolve(`./src/components/programme.js`),
            context: {
              slug: node.fields.slug,
              tags: node.frontmatter.tags
            },
          })
        })
      })
    )
    resolve(
      graphql(
        `{
          allMarkdownRemark(
            sort: { fields: [frontmatter___label] }
            filter: { frontmatter: { templateKey: { eq: "actions-tags" } } }
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
          createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/pages/index.js`),
            context: {
              tags: [node.frontmatter.label]
            },
          })
        })
      })
    )
    resolve(
      graphql(
        `{
          allMarkdownRemark(
            sort: { fields: [frontmatter___label] }
            filter: { frontmatter: { templateKey: { eq: "categories" } } }
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
          createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/pages/documentation/index.js`),
            context: {
              slug: node.fields.slug
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
