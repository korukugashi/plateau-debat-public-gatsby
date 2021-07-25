import React from "react"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"

const Join = () => (
  <Layout>
    <SEO
      title="Faire un don"
      description="Contribuez à la protection de la nature et l'environnement par un don à l'association régionale"
    />
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1>Faire un don</h1>
        </div>
      </div>
    </section>
    <section className="section" id="don">
      <div className="container">
        <h2 style={{ marginTop: 0 }}>Pourquoi donner ?</h2>
        <p>
          Votre générosité est essentielle pour nous permettre de continuer
          notre combat pour la{" "}
          <strong>protection de la nature et de l’environnement</strong>.
        </p>
        <p>
          66 % du montant de votre don au profit de FNE Bourgogne Franche-Comté
          peut être déduit de votre impôt sur le revenu. Le plafond de la
          déduction s’élève à 20% de votre revenu imposable. Autrement dit, un
          don de 30 euros ne vous coûte que 10,20 euros.
        </p>
        <h2>Faire un don en ligne</h2>
        <p className="is-italic">
          <span className="has-text-weight-bold">NB :</span> par défaut, HelloAsso ajoute un don de 
          2,35€ pour la maintenance de leur système. Ce don est facultatif (cliquez sur
          "modifier" et le mettre à 0€ si vous souhaitez le retirer).
        </p>
        <iframe
          id="haWidget"
          allowtransparency="true"
          scrolling="auto"
          src="https://www.helloasso.com/associations/france-nature-environnement-bourgogne-franche-comte/formulaires/1/widget"
          style={{ width: "100%", height: 850, border: "none" }}
          title="Adhésion en ligne FNE-BFC"
        ></iframe>
      </div>
    </section>
  </Layout>
)

export default Join
