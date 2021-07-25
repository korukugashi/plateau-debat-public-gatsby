import React from "react"
import Obfuscate from 'react-obfuscate'

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const Contact = () => (
  <Layout>
    <SEO 
        title="Nous contacter"
        description="Retrouvez FNE Bourgogne Franche-Comté à son antenne de Besançon"
    />
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1>Nous contacter</h1>
        </div>
      </div>
    </section>
    <div className="has-text-centered">
        <section className="hero">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-vcentered">
                        <address className="column is-6">
                            <p><small>C/O</small> Maison de l’environnement</p>
                            <p>7 rue Voirin<br />25000 Besançon</p>
                            <div><span className="has-text-weight-bold">Tél :</span> 03 81 80 92 98</div>
                            <div><span className="has-text-weight-bold">Email :</span> <Obfuscate email="contact@fne-bfc.fr" /></div>
                        </address>
                        <div className="column is-6">
                            <iframe title="Adresse FNE BFC" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" style={{ width: '100%', height: 300}} src="https://www.openstreetmap.org/export/embed.html?bbox=6.012308299541474%2C47.24160465865322%2C6.014362871646881%2C47.24270633650406&amp;layer=mapnik&amp;marker=47.24215641091987%2C6.013335585594177"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  </Layout>
)

export default Contact
