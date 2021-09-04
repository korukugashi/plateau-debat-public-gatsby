import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const CrTemplate = cr => {
  const crDate = new Date(cr.node.frontmatter.date)
  return (
    <article className="box" key={cr.node.frontmatter.title} style={{background: "#e0e0e0"}}>
      <div className="columns is-vcentered">
        <div className="column is-narrow has-text-centered">
          <div style={{width: 150}}>
            <img
              src={`${process.env.NODE_ENV === 'development' ? 'https://debatpublic-bfc.netlify.app' : ''}${cr.node.frontmatter.photo}?nf_resize=fit&w=150&h=200`}
              alt={cr.node.frontmatter.title}
              style={{width: 150, height: 200}}
            />
          </div>
          <div className="mt-2"><a href={cr.node.frontmatter.link} className="button is-primary">Voir le CR</a></div>
        </div>
        <div className="column">
          <h2 className="is-size-5 mb-1 mt-0">{cr.node.frontmatter.title}</h2>
          <div style={{fontStyle: "italic", color: "#888"}}>
            <address style={{display: "inline", fontStyle: "italic"}}>{cr.node.frontmatter.location}</address>{' '}-{' '}
            <time datetime={crDate.toISOString().substr(0, 10)}>
              {new Intl.DateTimeFormat('fr-FR').format(crDate)}
            </time>
          </div>
          <div className="mt-2 has-text-justified is-size-7">{cr.node.frontmatter.description}</div>
          <div className="mt-2">
            {cr.node.frontmatter.tags.map(tag => <div className="tag mr-2 is-dark">{tag}</div>)}
          </div>
        </div>
      </div>
    </article>
  )
}

const CrDebats = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { templateKey: { eq: "cr-debats" } } }
        limit: 20
      ) {
        edges {
          node {
            frontmatter {
              title
              date
              location
              description
              photo
              tags
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
        title="Compte rendus des débats"
        description="Retrouvez les comptes rendus des débats organisés par le plateau débat public Bourgogne Franche-Comté"
      />
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1>Compte rendus des débats</h1>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">
            {data.allMarkdownRemark.edges.map(cr => (
              <div className="column is-6">
                <CrTemplate {...cr} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default CrDebats
