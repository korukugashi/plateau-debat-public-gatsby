import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const CrTemplate = cr => {
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
            <address style={{display: "inline", fontStyle: "italic"}}>{cr.node.frontmatter.location}</address>{' '}-{' '}
            <time datetime={crDate.toISOString().substr(0, 10)}>
              {new Intl.DateTimeFormat('fr-FR').format(crDate)}
            </time>
          </div>
          <div className="is-size-7">{cr.node.frontmatter.description}</div>
          <div className="has-text-centered">
            {cr.node.frontmatter.tags.map(tag => <div className="tag mr-2 mt-2 is-light">{tag}</div>)}
          </div>
          <div className="mt-2 has-text-centered">
            <a href={cr.node.frontmatter.link} className="button is-primary mr-2 mt-2 is-small">Voir le CR</a>
            {cr.node.html ? <Link to={cr.node.fields.slug} className="button is-info is-small mt-2">Pour aller plus loin</Link> : null}
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
            fields {
              slug
            }
            frontmatter {
              title
              date
              location
              description
              photo
              tags
              link
            }
            html
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
