import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Categories from "../../components/categories"
import Documents from "../../components/documents"

export default function DocumentsPage({ data, location }) {
  const thisCateg = data.allMarkdownRemark.edges.filter(
    (categ, index) =>
      categ.node.fields.slug === decodeURIComponent(location.pathname) ||
      (location.pathname === "/publications/" && index === 0)
  )
  return (
    <Layout>
      <SEO
        title={`Publications - ${
          thisCateg[0] && thisCateg[0].node.frontmatter.label
        }`}
        description={`Retrouvez les documents et publications FNE BFC sur ${
          thisCateg[0] && thisCateg[0].node.frontmatter.label
        }`}
        link={[
          {
            rel: "canonical",
            href:
              location.origin +
              ((thisCateg[0] && thisCateg[0].node.fields.slug) ||
                "/publications/"),
          },
        ]}
      />
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1>Publications et thématiques</h1>
          </div>
        </div>
      </section>
      <section className="section pt-5">
        <div className="columns">
          <div className="column is-3">
            <Categories slug={location.pathname} />
          </div>
          <div className="column">
            <Documents
              category={
                (thisCateg[0] && thisCateg[0].node.frontmatter.label) || ""
              }
            />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query DocumentsCategoriesQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___label] }
      filter: { frontmatter: { templateKey: { eq: "categories" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            label
          }
        }
      }
    }
  }
`
