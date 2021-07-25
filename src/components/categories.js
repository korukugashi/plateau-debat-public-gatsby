import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import { MdChevronRight } from "react-icons/md"

const CategoryTemplate = ({ tag, current }) => (
  <li>
    <Link
      className={`${current ? "is-active" : ""}`}
      to={`${tag.node.fields.slug}`}
    >
      {tag.node.frontmatter.label} {current ? <MdChevronRight style={{float: 'right', marginTop: 3}} /> : null}
    </Link>
  </li>
)

const Categories = ({ slug }) => {
  const data = useStaticQuery(graphql`
    query CategoriesQuery {
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
  `)
  return (
    <aside className="menu">
      <ul className="menu-list">
        {data.allMarkdownRemark.edges &&
          data.allMarkdownRemark.edges.map((tag, index) => (
            <CategoryTemplate
              tag={tag}
              current={
                decodeURIComponent(slug) === tag.node.fields.slug ||
                (slug === "/documentation/" && index === 0)
              }
            />
          ))}
      </ul>
    </aside>
  )
}

export default Categories
