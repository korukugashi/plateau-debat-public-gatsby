import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "./layout"
import SEO from "./seo"

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
            {cr.node.frontmatter.tags.map(tag => <div className="tag mr-2 mt-2 is-light" key={tag}>{tag}</div>)}
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

const Publications = (props) => {
  const posts = props.data.allMarkdownRemark.edges
  const { currentPage, numPages, tagSlug } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = `/publications${tagSlug || '/'}${
    currentPage - 1 === 1 ? "" : `${(currentPage - 1).toString()}/`
  }`
  const nextPage = `/publications${tagSlug || '/'}${(currentPage + 1).toString()}/`
  const tags = props.data.tags.edges.filter(({node}) => 
    props.data.allpub.edges.find(crEdge => crEdge.node.frontmatter.tags.indexOf(node.frontmatter.label) > -1))

  return (
    <Layout>
      <SEO
        title="Publications th??matiques"
        description="Les publications du plateau d??bat public Bourgogne Franche-Comt??"
      />
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1>Publications th??matiques</h1>
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
          <div className="columns mt-3 is-multiline">
            {posts.map(cr => (
              <div className="column is-6" key={cr.node.frontmatter.title}>
                <PublicationsTemplate {...cr} />
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
                    to={`/publications${tagSlug || '/'}${i === 0 ? "" : `${i + 1}/`}`}
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

export const publicationsQuery = graphql`
  query publicationsQuery($skip: Int!, $limit: Int!, $tags: [String]) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { templateKey: { eq: "publications" }, tags: { in: $tags } } }
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
    allpub: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "publications" } } }
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

export default Publications

