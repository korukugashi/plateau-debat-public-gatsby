import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"

export const MenuActionsTemplate = prog => {
  return (
    <Link className="navbar-item" to={prog.slug}>
      {prog.title}
    </Link>
  )
}

const MenuActions = () => {
  const data = useStaticQuery(graphql`
    query MenuActionsQuery {
      allMarkdownRemark(
        sort: { fields: [frontmatter___title] }
        filter: { frontmatter: { templateKey: { eq: "programmes" } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)

  return (
    <>
      {data.allMarkdownRemark.edges.map(prog => (
        <MenuActionsTemplate {...{slug: prog.node.fields.slug, ...prog.node.frontmatter}} key={prog.node.fields.slug} />
      ))}
    </>
  )
}

export default MenuActions
