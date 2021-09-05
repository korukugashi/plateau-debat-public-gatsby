import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"

const LettreInfoTemplate = cr => {
  const crDate = new Date(cr.node.frontmatter.date)
  return (
    <article className="box" key={cr.node.frontmatter.title} style={{background: "#e0e0e0"}}>
      <div className="columns is-vcentered has-text-centered">
        <div className="column is-narrow">
          <div style={{width: 150, margin: '0 auto'}}>
            <a href={cr.node.frontmatter.link}>
              <img
                src={`${process.env.NODE_ENV === 'development' ? 'https://debatpublic-bfc.netlify.app' : ''}${cr.node.frontmatter.photo}?nf_resize=smartcrop&w=150&h=200`}
                alt={cr.node.frontmatter.title}
                style={{width: 150, height: 200}}
              />
            </a>
          </div>
        </div>
        <div className="column">
          <h2 className="is-size-5 mb-1 mt-0">{cr.node.frontmatter.title}</h2>
          <div className="is-size-7" style={{fontStyle: "italic", color: "#888"}}>
            <time dateTime={crDate.toISOString().substr(0, 10)}>
              {new Intl.DateTimeFormat('fr-FR', {month: 'long', year: 'numeric'}).format(crDate)}
            </time>
          </div>
          <div className="is-size-7">{cr.node.frontmatter.description}</div>
          <div className="mt-2 has-text-centered">
            <a href={cr.node.frontmatter.link} className="button is-primary mr-2 mt-2 is-small">Voir le PDF</a>
          </div>
        </div>
      </div>
    </article>
  )
}

const LettreInfo = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { templateKey: { eq: "lettre-info" } } }
        limit: 20
      ) {
        edges {
          node {
            frontmatter {
              title
              date
              description
              photo
              link
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO
        title="Lettre d'info : mots et débats"
        description="La lettre d'informations du plateau débat public Bourgogne Franche-Comté"
      />
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1>Lettre d'info : mots et débats</h1>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">
            {data.allMarkdownRemark.edges.map(cr => (
              <div className="column is-6">
                <LettreInfoTemplate {...cr} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default LettreInfo