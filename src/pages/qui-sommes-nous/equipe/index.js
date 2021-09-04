import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import TeamTemplate from "../../../components/team"

const Equipe = () => {
  const data = useStaticQuery(graphql`
    query TeamQuery {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "equipe" } } }
      ) {
        edges {
          node {
            frontmatter {
              salaries {
                name
                fonction
                photo
              }
            }
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <SEO
        title="L'équipe du plateau débat public BFC"
        description="L'équipe du plateau débat public Bourgogne Franche-Comté"
      />
      <TeamTemplate
        salaries={
          data.allMarkdownRemark.edges &&
          data.allMarkdownRemark.edges[0].node.frontmatter.salaries
        }
      />
    </Layout>
  )
}

export default Equipe
