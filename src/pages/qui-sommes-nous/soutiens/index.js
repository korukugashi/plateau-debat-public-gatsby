import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../../../components/layout"
import SEO from "../../../components/seo"
import OrgTemplate from "../../../components/org"

const Soutiens = () => {
  const data = useStaticQuery(graphql`
    query SoutiensQuery {
      allMarkdownRemark(
        sort: { fields: [frontmatter___label] }
        filter: { frontmatter: { templateKey: { eq: "soutiens" } } }
      ) {
        edges {
          node {
            frontmatter {
              label
              url
              image
            }
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <SEO
        title="On les soutient"
        description="Les associations et collectifs que France Nature Environnement Bourgogne Franche-Comté soutient"
      />
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1>On les soutient</h1>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container has-text-centered no-bullet">
          <ul style={{display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
            {data.allMarkdownRemark.edges &&
              data.allMarkdownRemark.edges.map(soutien => (
                <OrgTemplate {...soutien} />
              ))}
          </ul>
        </div>
      </section>
    </Layout>
  )
}

export default Soutiens
