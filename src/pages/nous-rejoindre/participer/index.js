import React from "react"
import { Link } from "gatsby"
import Obfuscate from "react-obfuscate"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"

const Join = () => (
  <Layout>
    <SEO
      title="Devenir bénévole"
      description="Engagez vous pour la protection de la nature et l'environnement en Bourgogne Franche-Comté !"
    />
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1>Agir avec FNE BFC</h1>
        </div>
      </div>
    </section>
    <section className="section" id="benevole">
      <div className="container">
        <h2>
          Vous voulez rejoindre une association de protection de
          l’environnement&nbsp;?
        </h2>
        <p>
          FNE Bourgogne Franche-Comté, ses fédérations et ses associations
          membres accueillent toute l’année de nouveaux bénévoles.
        </p>

        <p>
          Que ce soit sur le terrain, dans nos locaux ou de chez vous, découvrez
          comment agir avec nous, selon vos envies, vos disponibilités et vos
          talents !
        </p>

        <p>
          Vous pouvez nous contacter par téléphone au 03 81 80 92 98 ou par mail
          à <Obfuscate email="contact@fne-bfc.fr" />
        </p>
        <p>
          <Link to="/agenda/">
            Participer aux actions de FNE BFC
          </Link>
        </p>
      </div>
    </section>
  </Layout>
)

export default Join
