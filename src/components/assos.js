import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import OrgTemplate from "./org"

const AssosTemplate = () => {
  const data = useStaticQuery(graphql`
    query AssosQuery {
      allMarkdownRemark(
        sort: { fields: [frontmatter___label] }
        filter: { frontmatter: { templateKey: { eq: "reseau-assos" } } }
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
          <OrgTemplate {...org} />
        ))}
    </ul>
  )
}

export default AssosTemplate;