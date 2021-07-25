import React from "react"
import Obfuscate from "react-obfuscate"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const Join = () => (
  <Layout>
    <SEO
      title="Adhérer"
      description="Contribuez à la protection de la nature et l'environnement en adhérant à l'association régionale"
    />
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1>Devenez adhérent et parlez de nous autour de vous !</h1>
          <p>
            Pour agir, France Nature Environnement Bourgogne Franche-Comté a
            besoin de bénévoles et d’adhérents.
          </p>
        </div>
      </div>
    </section>
    <section className="section" id="adherer">
      <div className="container">
        <h1>Adhérer</h1>
        <p>
          Aidez-nous à continuer notre combat pour un{" "}
          <strong>environnement sain</strong> et une{" "}
          <strong>nature préservée</strong>. Votre adhésion vous permettra de
          recevoir régulièrement des informations.
        </p>
        <p>
          <b>Nous guidons les demandes d'adhésion vers les structures
          départementales de FNE BFC.</b> Des exceptions existent quand elles sont
          dûment motivées et sont plutôt le fait de considérations historiques
          concernant le réseau.
        </p>
        <h2>Associations</h2>
        <p>
          Les associations souhaitant adhérer/renouveler leur adhésion à FNE BFC
          sont priées de nous contacter par email à{" "}
          <Obfuscate email="contact@fne-bfc.fr" />.
        </p>
        <h2>Particuliers</h2>
        <p className="is-italic">
          <span className="has-text-weight-bold">NB :</span> par défaut, HelloAsso ajoute un don de 
          2,35€ pour la maintenance de leur système. Ce don est facultatif (cliquez sur
          "modifier" et le mettre à 0€ si vous souhaitez le retirer).
        </p>
        <iframe
          id="haWidget"
          allowtransparency="true"
          scrolling="auto"
          src="https://www.helloasso.com/associations/france-nature-environnement-bourgogne-franche-comte/adhesions/test/widget"
          style={{ width: "100%", height: 850, border: "none" }}
          title="Adhésion en ligne FNE-BFC"
        ></iframe>
      </div>
    </section>
  </Layout>
)

export default Join
