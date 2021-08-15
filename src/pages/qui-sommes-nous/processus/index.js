import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"

const Processus = () => {
  const data = useStaticQuery(graphql`
    query ProcessusPageQuery {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "processus-page" } } }
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
        title="Processus"
        description=""
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

export default Processus
