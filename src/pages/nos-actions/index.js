import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

export const MenuActionsTemplate = prog => {
  return (
    <div className="column is-4">
      <Link to={prog.slug} className="actions-index-link">
        <img
          src={`${
            process.env.NODE_ENV === "development"
              ? "https://fne-bfc.netlify.app"
              : ""
          }${prog.featuredimage}?nf_resize=fit&h=100&w=300`}
          alt={prog.title}
          style={{ display: "block", margin: "0 auto 1rem" }}
        />{" "}
        {prog.title}
      </Link>
    </div>
  )
}

const NosActions = () => {
  const data = useStaticQuery(graphql`
    query NosActionsQuery {
      allMarkdownRemark(
        sort: { fields: [frontmatter___title] }
        filter: { frontmatter: { templateKey: { eq: "programmes" } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              featuredimage
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO
        title="Les programmes de FNE BFC"
        description="Biodiversit'haies, plateau débat public, sentinelles de la nature"
      />
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1>Les actions de FNE BFC</h1>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-fluid">
          <div className="columns is-vcentered has-text-centered is-multiline is-centered">
            {data.allMarkdownRemark.edges.map(prog => (
              <MenuActionsTemplate
                {...{ slug: prog.node.fields.slug, ...prog.node.frontmatter }}
                key={prog.node.fields.slug}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default NosActions
