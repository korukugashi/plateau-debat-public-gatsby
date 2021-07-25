import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"

const FilterTemplate = ({ tag, current }) => (
  <li className="column mt-2 mb-2 is-half-mobile is-one-quarter-tablet no-padding-mobile">
    <Link
      className={`columns is-vcentered ${current ? "current-tag" : ""}`}
      to={`${tag.node.fields.slug}#thematiques`}
    >
      <div className="mr-3" style={{
        width: 40,
        height: 40,
        border: "1px solid #000",
        background: "#fff",
        borderRadius: 10,
      }}>
        <img
          src={`${process.env.NODE_ENV === 'development' ? 'https://debatpublic-bfc.netlify.app' : ''}${tag.node.frontmatter.image}?nf_resize=smartcrop&w=30&h=30`}
          alt={tag.node.frontmatter.label}
          style={{ margin: "3px 4px", width: 30, height: 30 }}
        />
      </div>{" "}
      {tag.node.frontmatter.label}
    </Link>
  </li>
)

const Filters = ({ slug }) => {
  const data = useStaticQuery(graphql`
    query FiltersQuery {
      allMarkdownRemark(
        sort: { fields: [frontmatter___label] }
        filter: { frontmatter: { templateKey: { eq: "actions-tags" } } }
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
    <section className="section pt-0 pb-3" id="actions">
      <div className="container-fluid">
        <ul className="is-size-6 columns is-multiline is-vcentered filter-action pl-0 is-mobile">
          {data.allMarkdownRemark.edges &&
            data.allMarkdownRemark.edges.map(tag => (
              <FilterTemplate
                tag={tag}
                current={decodeURIComponent(slug) === tag.node.fields.slug}
                key={tag.node.fields.slug}
              />
            ))}
        </ul>
      </div>
    </section>
  )
}

export default Filters
