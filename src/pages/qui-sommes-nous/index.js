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
        title="Qui sommes-nous ?"
        description="FNE BFC est la fédération régionale d’associations de protection de la nature et de l’environnement en Bourgogne Frnahce-Comté."
      />
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1>Qui sommes-nous ?</h1>
            <p>
              FNE Bourgogne Franche-Comté est une{" "}
              <strong>
                fédération régionale d’associations de protection de la nature
                et de l’environnement.
              </strong>
            </p>
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
