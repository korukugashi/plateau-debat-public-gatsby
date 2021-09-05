import React from "react"
import { graphql } from "gatsby"

import Layout from "./layout"
import SEO from "./seo"
import ImgNetlify from "./imgnetlify"

export default function Event({ data }) {
  const date = new Date(data.markdownRemark.frontmatter.date)

  return (
    <Layout>
      <SEO
        title={data.markdownRemark.frontmatter.title}
        description={data.markdownRemark.frontmatter.intro}
      />
      <section className="section action pt-3">
        <div className="container mt-2">
          <div className="columns">
            <div className="column">
              <h1 className="is-size-2 mb-0 has-text-centered">
                {data.markdownRemark.frontmatter.title}
              </h1>
              <div className="has-text-centered">
                <time dateTime={date.toISOString().substr(0, 10)} className="is-size-6 saira">
                  {new Intl.DateTimeFormat('fr-FR', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}).format(date)}
                </time>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.markdownRemark.html,
                }}
              />
            </div>
            <div className="column">
              <ImgNetlify
                  image={`${data.markdownRemark.frontmatter.photo}?nf_resize=fit&w=500`}
                  alt={data.markdownRemark.frontmatter.title}
                  className="mt-2 mb-2"
                  style={{width: "100%", maxWidth: 500, margin: "0 auto"}}
                />
            </div>
          </div>
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
        date
        photo
        intro
      }
    }
  }
`
