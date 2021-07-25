import React from "react"
import moment from "moment"
import { Link, graphql } from "gatsby"
import "moment/locale/fr"

import Layout from "./layout"
import SEO from "./seo"
import ImgNetlify from "./imgnetlify"

const ActionLink = news => {
  const date = moment(news.date)
  return (
    <li>
      <Link to={news.slug} className="columns is-gapless is-mobile">
        {news.featuredimage ? (
          <div className="column is-4 is-hidden-tablet-only">
            <ImgNetlify
              image={`${news.featuredimage}?nf_resize=smartcrop&w=100&h=50`}
              alt={news.title}
              className="mt-1 mr-2"
              style={{ maxHeight: 50, maxWidth: 100, overflow: "hidden" }}
            />
          </div>
        ) : null}
        <div className="column">
          <time dateTime={date.format("YYYY-MM-DD")}>
            {date.format("DD/MM/YYYY")}
          </time>{" "}
          {news.title}
        </div>
      </Link>
    </li>
  )
}

export default function Programme({ data }) {
  moment.locale("fr")
  return (
    <Layout>
      <SEO
        title={data.markdownRemark.frontmatter.title}
        description={data.markdownRemark.frontmatter.description}
      />
      <section className="section action pt-3">
        <div className="container is-fluid">
          <div className="columns is-variable is-5">
            <div className="column">
              <h1 className="has-text-left is-size-2">
                {data.markdownRemark.frontmatter.title}
              </h1>
              <hr />
              <div
                dangerouslySetInnerHTML={{
                  __html: data.markdownRemark.html,
                }}
              />
            </div>
            <div className="column is-3">
              <h2 className="is-size-6 mt-0">Articles récents</h2>
              <ul className="is-size-7 pl-0 no-bullet recent-actions">
                {data.allMarkdownRemark.edges.map(news => (
                  <ActionLink
                    {...{
                      slug: news.node.fields.slug,
                      ...news.node.frontmatter,
                    }}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $tags: [String]!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { templateKey: { eq: "action-post" }, tags: { in: $tags } } }
      limit: 6
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            featuredimage
          }
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        tags
      }
    }
  }
`
