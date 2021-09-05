import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import AgendaPreview from "../components/agendapreview"

export default function IndexPage({ data, location }) {
  return (
    <Layout>
      <SEO
        title="Accueil"
        description="Organiser le débat public, permettre le dialogue environnemental, développer la culture de la participation en région Bourgogne Franche-Comté"
        keywords={[`nature`, `environnement`, `bourgogne`, `franche-comte`, `débat public`, `concertation`, `démocratie participative`]}
      />

      <section
        className="section pt-2"
      >
        <div className="container">
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
          <div className="agenda columns is-multiline is-centered">
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
