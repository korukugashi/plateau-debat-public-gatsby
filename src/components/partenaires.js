import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import OrgTemplate from "./org"

const PartenairesTemplate = () => {
  const data = useStaticQuery(graphql`
    query PartenairesQuery {
      allMarkdownRemark(
        sort: { fields: [frontmatter___label] }
        filter: { frontmatter: { templateKey: { eq: "partenaires" } } }
      ) {
        edges {
          node {
            frontmatter {
              label
              url
              image
            }
          }
        }
      }
    }
  `)
  return (
    <ul style={{display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
      {data.allMarkdownRemark.edges &&
        data.allMarkdownRemark.edges.map(org => (
          <OrgTemplate key={org.node.frontmatter.label} {...org} />
        ))}
    </ul>
  )
}

export default PartenairesTemplate;