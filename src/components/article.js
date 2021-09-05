import React from "react"
import { graphql } from "gatsby"

import Layout from "./layout"
import SEO from "./seo"

export default function Event({ data }) {
  return (
    <Layout>
      <SEO
        title={data.markdownRemark.frontmatter.title}
        description={data.markdownRemark.frontmatter.description}
      />
      <section className="section action pt-3">
        <div className="container mt-2">
          <h1 className="is-size-2 mb-0 has-text-centered">
            {data.markdownRemark.frontmatter.title}
          </h1>
          <div
            dangerouslySetInnerHTML={{
              __html: data.markdownRemark.html,
            }}
          />
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
      }
    }
  }
`
