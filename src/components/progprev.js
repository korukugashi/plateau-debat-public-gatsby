import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"

const ProgPrevItem = (data) => (
  <article className="box prog-prev">
    <Link to={data.slug}>
      <h1 className="title" style={{ marginBottom: "0.5rem" }}>
        {data.title}
      </h1>
      <div
        className="columns is-2 is-variable"
        style={{ marginBottom: 0 }}
      >
        <div className="column is-4">
          <img
            src={`${process.env.NODE_ENV === 'development' ? 'https://debatpublic-bfc.netlify.app' : ''}${data.featuredimage}?nf_resize=smartcrop&w=100&h=64`}
            alt={data.title}
            style={{width: 100}}
          />
        </div>
        <div className="column is-size-7 is-size-6-fullhd is-size-6-mobile">
          {data.description}
        </div>
      </div>
      <div className="has-text-right saira">
        Découvrir &gt;
      </div>
    </Link>
  </article>
)

export default function ProgPrev () {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___title] }
        filter: { frontmatter: { templateKey: { eq: "programmes" }, onHome: { eq: true } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              description
              featuredimage
            }
          }
        }
      }
    }
  `)

  return (
    <>
      {data.allMarkdownRemark.edges.map(prog => (
        <ProgPrevItem {...{slug: prog.node.fields.slug, ...prog.node.frontmatter}} key={prog.node.fields.slug} />
      ))}
    </>
  )
}
