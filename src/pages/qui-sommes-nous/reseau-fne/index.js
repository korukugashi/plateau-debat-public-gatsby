import React from "react"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import AssosTemplate from "../../../components/assos"
import FedesTemplate from "../../../components/fedes"

const Reseau = () => (
  <Layout>
    <SEO
      title="Le réseau FNE"
      description="Les associations et collectifs membres de France Nature Environnement Bourgogne Franche-Comté"
    />
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1>Le réseau FNE</h1>
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
