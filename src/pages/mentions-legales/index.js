import React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const MentionsLegales = () => (
  <Layout>
    <SEO 
        title="Mentions légales"
        description="FNE 25-90, Fédération des associations de protection de la Nature"
    />
    <section className="section">
        <div className="container">
            <h1>Mentions légales</h1>
            <h2>Éditeur</h2>
            <p><strong><Link to="/">FNE Bourgogne Franche-Comté</Link></strong></p>
            <p>
                N° SIRET : 	315 564 542 000 43 - Code APE : 9499Z
            </p>
            <p>
                Maison de l'environnement de Bourgogne Franche-Comté
                <br />
                7 rue Voirin 25000 Besançon / Tél. 03 81 80 92 98
            </p>
            <h2>Hébergeur</h2>
            <p>
                Netlify, Inc.
                <br />
                2325 3rd Street, Suite 215, San Francisco, California 94107
            </p>
        </div> 
    </section>
  </Layout>
)

export default MentionsLegales