import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "./layout"
import SEO from "./seo"

const CrTemplate = cr => {
  const crDate = new Date(cr.node.frontmatter.date)
  return (
    <article className="box" style={{background: "#e0e0e0"}}>
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
            <time dateTime={crDate.toISOString().substr(0, 10)}>
              {new Intl.DateTimeFormat('fr-FR').format(crDate)}
            </time>
          </div>
          <div className="is-size-7">{cr.node.frontmatter.description}</div>
          <div className="has-text-centered">
            {cr.node.frontmatter.tags.map(tag => <div className="tag mr-2 mt-2 is-light" key={tag}>{tag}</div>)}
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

const TagTemplate = tag => (
  <Link to={`/cr-debats${tag.node.fields.slug}`} className="is-flex mr-2 mb-2 pl-2 pr-2 pt-2 pb-2" style={{border: "1px solid #ddd"}}>
    <img
      src={`${process.env.NODE_ENV === 'development' ? 'https://debatpublic-bfc.netlify.app' : ''}${tag.node.frontmatter.image}?nf_resize=smartcrop&w=32&h=32`}
      alt={tag.node.frontmatter.label}
      style={{width: 32, height: 32}}
      className="mr-3"
    />
    {tag.node.frontmatter.label}
  </Link>
)

const CrDebats = (props) => {
  const posts = props.data.cr.edges
  const { currentPage, numPages, tagSlug } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = `/cr-debats${tagSlug || '/'}${
    currentPage - 1 === 1 ? "" : `${(currentPage - 1).toString()}/`
  }`
  const nextPage = `/cr-debats${tagSlug || '/'}${(currentPage + 1).toString()}/`
  const tags = props.data.tags.edges.filter(({node}) => 
    props.data.allcr.edges.find(crEdge => crEdge.node.frontmatter.tags.indexOf(node.frontmatter.label) > -1))

  return (
    <Layout>
      <SEO
        title="Compte rendus des d??bats"
        description="Retrouvez les comptes rendus des d??bats organis??s par le plateau d??bat public Bourgogne Franche-Comt??"
      />
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1>Compte rendus des d??bats</h1>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="is-flex debattags" style={{justifyContent: "center", flexWrap: "wrap"}}>
            <div className="pt-2 mr-3">Filtrer par th??me :</div>
            {tags.map(tag => (
              <TagTemplate {...tag} key={tag.node.frontmatter.label} />
            ))}
          </div>
          <div className="mt-3 columns is-multiline">
            {posts.map(cr => (
              <div className="column is-6" key={cr.node.frontmatter.title}>
                <CrTemplate {...cr} />
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
                ??? Page pr??c??dante
              </Link>
            )) || (
              <span className="pagination-previous" disabled>
                ??? Page pr??c??dante
              </span>
            )}
            <ul className="pagination-list">
              {Array.from({ length: numPages }, (_, i) => (
                <li key={i}>
                  <Link
                    key={`pagination-number${i + 1}`}
                    to={`/cr-debats${tagSlug || '/'}${i === 0 ? "" : `${i + 1}/`}`}
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
                Page suivante ???
              </Link>
            )) || (
              <span className="pagination-next" disabled>
                Page suivante ???
              </span>
            )}
          </nav>
        </div>
      </section>
    </Layout>
  )
}

export const crListQuery = graphql`
  query crListQuery($skip: Int!, $limit: Int!, $tags: [String]) {
    cr: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { templateKey: { eq: "cr-debats" }, tags: { in: $tags } } }
      limit: $limit
      skip: $skip
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
    allcr: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "cr-debats" } } }
    ) {
      edges {
        node {
          frontmatter {
            tags
          }
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
  }`

export default CrDebats
