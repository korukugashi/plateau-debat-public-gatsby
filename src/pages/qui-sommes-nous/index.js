import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const Contact = () => {
  const data = useStaticQuery(graphql`
    query AssociationPageQuery {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "association-page" } } }
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
        title="Historique et gouvernance"
        description="Le Plateau Débat Public est animé par France Nature Environnement Bourgogne Franche-Comté. Il représente et sollicite un réseau d’acteurs : associations, élus, professionnels, représentants syndicaux, collectivités, représentants de l’état, citoyens et scientifiques"
      />
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1>Historique et gouvernance</h1>
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

export default Contact
