import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import TeamTemplate from "../../../components/team"

const Equipe = () => {
  const data = useStaticQuery(graphql`
    query TeamQuery {
      allMarkdownRemark(
        filter: {
          frontmatter: { admins: { elemMatch: { name: { ne: null } } } }
        }
      ) {
        edges {
          node {
            frontmatter {
              admins {
                name
                fonction
                photo
              }
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
        description="Les administrateurs, salariés et bénévoles du plateau débat public Bourgogne Franche-Comté"
      />
      <TeamTemplate
        admins={
          data.allMarkdownRemark.edges &&
          data.allMarkdownRemark.edges[0].node.frontmatter.admins
        }
        salaries={
          data.allMarkdownRemark.edges &&
          data.allMarkdownRemark.edges[0].node.frontmatter.salaries
        }
      />
    </Layout>
  )
}

export default Equipe
