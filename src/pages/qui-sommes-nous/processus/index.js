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
        title="La méthode du Plateau Débat Public"
        description="Comment organiser une action avec le dispositif Plateau Débat Public, de la planification à la mise en oeuvre, puis au suivi et à la valorisation du projet"
      />
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1>La méthode du plateau débat public</h1>
          </div>
        </div>
      </section>
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
