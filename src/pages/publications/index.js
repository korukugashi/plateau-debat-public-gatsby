import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const PublicationsTemplate = cr => {
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
          <div className="has-text-centered">
            {cr.node.frontmatter.tags.map(tag => <div className="tag mr-2 mt-2 is-light">{tag}</div>)}
          </div>
          <div className="mt-2 has-text-centered">
            <a href={cr.node.frontmatter.link} className="button is-primary mr-2 mt-2 is-small">Voir le PDF</a>
            {cr.node.html ? <Link to={cr.node.fields.slug} className="button is-info is-small mt-2">Pour aller plus loin</Link> : null}
          </div>
        </div>
      </div>
    </article>
  )
}

const TagTemplate = tag => (
  <Link to={`/publications${tag.node.fields.slug}`} className="is-flex mr-2 mb-2 pl-2 pr-2 pt-2 pb-2" style={{border: "1px solid #ddd"}}>
    <img
      src={`${process.env.NODE_ENV === 'development' ? 'https://debatpublic-bfc.netlify.app' : ''}${tag.node.frontmatter.image}?nf_resize=smartcrop&w=32&h=32`}
      alt={tag.node.frontmatter.label}
      style={{width: 32, height: 32}}
      className="mr-3"
    />
    {tag.node.frontmatter.label}
  </Link>
)

const Publications = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { templateKey: { eq: "publications" } } }
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
      tags: allMarkdownRemark(
        sort: { fields: [frontmatter___label], order: ASC }
        filter: { frontmatter: { templateKey: { eq: "debat-tags" } } }
        limit: 30
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              label
              image
            }
          }
        }
      }
    }
  `)

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
      <section className="section">
        <div className="container">
          <div className="is-flex debattags" style={{justifyContent: "center", flexWrap: "wrap"}}>
            <div className="pt-2 mr-3">Filtrer par thème :</div>
            {data.tags.edges.map(tag => (
              <TagTemplate {...tag} key={tag.node.frontmatter.label} />
            ))}
          </div>
          <div className="columns mt-3 is-multiline">
            {data.allMarkdownRemark.edges.map(cr => (
              <div className="column is-6">
                <PublicationsTemplate {...cr} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Publications

