import React from "react"
import { Link, graphql } from "gatsby"

import Filters from "../components/filters"
import Layout from "../components/layout"
import SEO from "../components/seo"
import NewsPreview from "../components/newspreview"
import AgendaPreview from "../components/agendapreview"
import ProgPrev from "../components/progprev"
import Slider from "../components/slider"

export default function IndexPage({ data, location }) {
  return (
    <Layout>
      <SEO
        title="Accueil"
        keywords={[`nature`, `environnement`, `bourgogne`, `franche-comte`]}
      />
      <div className="is-hidden-touch">
        <Slider />
      </div>

      <section
        className="section"
        style={{ paddingTop: "2rem", background: "#e7e7f2" }}
      >
        <article
          className="box agenda is-hidden-tablet"
          style={{ marginTop: 23, background: "#c61512" }}
        >
          <h1
            className="title saira has-text-centered"
            style={{
              fontSize: "2rem",
              textAlign: "center",
              color: "#fff",
            }}
          >
            AGENDA
          </h1>
          <div>
            <AgendaPreview />
            <div className="has-text-right is-size-7 columns event">
              <Link to="/agenda/" className="column">
                Voir plus &gt;
              </Link>
            </div>
          </div>
        </article>
        <div className="container-fluid">
          <h2 className="is-size-4 mt-0 mb-5" id="thematiques">
            Thématiques
          </h2>
          <Filters slug={location.pathname} />
          <div className="columns">
            <div className="column is-three-quarters-tablet">
              <NewsPreview news={data.allMarkdownRemark.edges} />
            </div>
            <div className="column">
              <aside>
                <article
                  className="box agenda is-hidden-mobile"
                  style={{ marginTop: 23, background: "#c61512" }}
                >
                  <h1
                    className="title saira has-text-centered"
                    style={{
                      fontSize: "2rem",
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    AGENDA
                  </h1>
                  <div>
                    <AgendaPreview />
                    <div className="has-text-right is-size-7 columns event">
                      <Link to="/agenda/" className="column">
                        Voir plus &gt;
                      </Link>
                    </div>
                  </div>
                </article>
                <ProgPrev />
              </aside>
            </div>
          </div>
        </div>
      </section>
      <script type="application/ld+json">
        {JSON.stringify([
          {
            "@context": "https://schema.org",
            "@id": "https://www.debatpublic-bfc.org/#debatpublic-bfc",
            "@type": "NGO",
            name: "Plateau débat public BFC",
            legalName: "Plateau débat public Bourgogne Franche-Comté",
            url: "https://www.debatpublic-bfc.org/",
            logo: "https://www.debatpublic-bfc.org/logofnefc.png",
            description:
              "Le plateau débat public est un dispositif favorisant le dialogue environnemental en Bourgogne-Franche-Comté",
            address: [
              {
                "@type": "PostalAddress",
                addressLocality: "Besançon",
                postalCode: "25000",
                streetAddress:
                  "Maison de l’environnement de Franche-Comté - 7 rue Voirin",
                telephone: "+33381613644",
              },
            ],
          },
        ])}
      </script>
    </Layout>
  )
}

export const query = graphql`
  query($tags: [String]) {
    debatImg: file(relativePath: { eq: "debat.png" }) {
      childImageSharp {
        fluid(maxWidth: 125) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    haieImg: file(relativePath: { eq: "haie.png" }) {
      childImageSharp {
        fluid(maxWidth: 125) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { templateKey: { eq: "action-post" }, tags: { in: $tags } }
      }
      limit: 60
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            description
            featuredimage
            tags
          }
        }
      }
    }
  }
`
