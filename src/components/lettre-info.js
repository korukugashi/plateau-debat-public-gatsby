import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "./layout"
import SEO from "./seo"

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

const LettreInfo = (props) => {
  const posts = props.data.allMarkdownRemark.edges
  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = `/publications/mots-et-debats/${
    currentPage - 1 === 1 ? "" : `${(currentPage - 1).toString()}/`
  }`
  const nextPage = `/publications/mots-et-debats/${(currentPage + 1).toString()}/`

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
            {posts.map(cr => (
              <div className="column is-6" key={cr.node.frontmatter.title}>
                <LettreInfoTemplate {...cr} />
              </div>
            ))}
          </div>
          <nav
            className="pagination"
            role="navigation"
            aria-label="pagination"
            style={{ marginTop: "2rem" }}
          >
            {(!isFirst && (
              <Link to={prevPage} rel="prev" className="pagination-previous">
                ← Page précédante
              </Link>
            )) || (
              <span className="pagination-previous" disabled>
                ← Page précédante
              </span>
            )}
            <ul className="pagination-list">
              {Array.from({ length: numPages }, (_, i) => (
                <li key={i}>
                  <Link
                    key={`pagination-number${i + 1}`}
                    to={`/publications/mots-et-debats/${i === 0 ? "" : `${i + 1}/`}`}
                    className={`pagination-link${
                      i + 1 === currentPage ? " is-current" : ""
                    }`}
                  >
                    {i + 1}
                  </Link>
                </li>
              ))}
            </ul>
            {(!isLast && (
              <Link to={nextPage} rel="next" className="pagination-next">
                Page suivante →
              </Link>
            )) || (
              <span className="pagination-next" disabled>
                Page suivante →
              </span>
            )}
          </nav>
        </div>
      </section>
    </Layout>
  )
}

export const letteInfosQuery = graphql`
  query lettreInfosQuery($skip: Int!, $limit: Int!){
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { templateKey: { eq: "lettre-info" } } }
      limit: $limit
      skip: $skip
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
  }`

export default LettreInfo