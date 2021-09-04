import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import AgendaPreview from "../components/agendapreview"

export default function IndexPage({ data, location }) {
  return (
    <Layout>
      <SEO
        title="Accueil"
        keywords={[`nature`, `environnement`, `bourgogne`, `franche-comte`]}
      />

      <section
        className="section pt-2"
      >
        <div className="container-fluid">
          <div style={{height: "10rem", background: "#bbb", textAlign: "center"}}>
            Vidéo de présentation
          </div>
          <h1
            className="title saira mt-4"
            style={{
              fontSize: "2rem"
            }}
          >
            Programme 2021
          </h1>
          <div className="agenda columns">
            <AgendaPreview />
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
            logo: "https://www.debatpublic-bfc.org/logo-dp-bfc.png",
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
  query {
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
  }
`
