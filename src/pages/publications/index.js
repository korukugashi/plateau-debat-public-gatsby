import React from "react"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const Publications = () => {
  return (
    <Layout>
      <SEO
        title="Publications thématiques"
        description="Les publications du plateau débat public Bourgogne Franche-Comté"
      />
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1>Publications thématiques</h1>
          </div>
        </div>
      </section>
      
    </Layout>
  )
}

export default Publications
