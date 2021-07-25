import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"

const Propriete = () => {
  const data = useStaticQuery(graphql`
    query ProprietePageQuery {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "propriete-page" } } }
      ) {
        edges {
          node {
            html
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <SEO
        title="Les biens fonciers naturels de FNE-BFC"
        description="FNE-BFC est propriétaire de 76,9 ha répartis dans le Jura et le Doubs. Ce sont des richesses naturelles, des havres de biodiversités."
      />
      <section
        className="section"
        id="qui-sommes-nous"
        style={{ paddingTop: 0 }}
      >
        <div
          className="container"
          dangerouslySetInnerHTML={{
            __html: data.allMarkdownRemark.edges[0].node.html,
          }}
        />
      </section>
    </Layout>
  )
}

export default Propriete
