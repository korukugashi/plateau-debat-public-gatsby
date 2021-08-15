import React from "react"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import AssosTemplate from "../../../components/assos"
import FedesTemplate from "../../../components/fedes"

const Reseau = () => (
  <Layout>
    <SEO
      title="Nos partenaires"
      description="Les partenaires du plateau débat public BFC"
    />
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1>Nos partenaires</h1>
        </div>
      </div>
    </section>
    <section className="section">
      <div className="container has-text-centered no-bullet">
        <h2>Fédérations départementales</h2>
        <ul>
        <FedesTemplate />
        </ul>
        <h2>Associations régionales</h2>
        <ul>
          <AssosTemplate />
        </ul>
      </div>
    </section>
  </Layout>
)

export default Reseau
