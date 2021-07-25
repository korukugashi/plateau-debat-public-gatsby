import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import moment from "moment"
import "moment/locale/fr"

export const DocumentsPreviewTemplate = doc => {
  const date = moment(doc.frontmatter.date)
  const [isFolded, setFold] = useState(true)
  return (
    <div className="mb-5">
      <article className="message">
        <div
          className="message-header"
          style={{ cursor: "pointer" }}
          onClick={() => setFold(!isFolded)}
          onKeyDown={() => setFold(!isFolded)}
          tabIndex={0}
          role="button"
        >
          <h3>{doc.frontmatter.title}</h3>
          <div>{isFolded ? "+" : "-"}</div>
        </div>
        {isFolded ? null : (
          <div className="message-body">
            <div className="columns is-vcentered">
              <div className="column is-2">
                <a href={doc.frontmatter.file}>
                  <img
                    src={`${process.env.NODE_ENV === 'development' ? 'https://debatpublic-bfc.netlify.app' : ''}${doc.frontmatter.photo}?nf_resize=fit&w=180&h=180`}
                    alt={doc.frontmatter.title}
                    style={{ width: 180 }}
                  />
                </a>
              </div>
              <div className="column">
                <div
                  dangerouslySetInnerHTML={{
                    __html: doc.html,
                  }}
                />
                <p>{date.format("DD/MM/YYYY")}</p>
                <a href={doc.frontmatter.file}>
                  Télécharger
                </a>
              </div>
            </div>
          </div>
        )}
      </article>
    </div>
  )
}

const Documents = ({ category }) => {
  moment.locale("fr")
  const data = useStaticQuery(graphql`
    query DocumentsQuery {
      allMarkdownRemark(
        sort: { fields: [frontmatter___category, frontmatter___title] }
        filter: { frontmatter: { templateKey: { eq: "documents" } } }
        limit: 50
      ) {
        edges {
          node {
            html
            frontmatter {
              title
              category
              date
              file
              photo
            }
          }
        }
      }
    }
  `)
  return (
    <>
      {data.allMarkdownRemark.edges
        .filter(doc => doc.node.frontmatter.category === category)
        .map(doc => (
          <DocumentsPreviewTemplate {...doc.node} />
        ))}
    </>
  )
}

export default Documents
