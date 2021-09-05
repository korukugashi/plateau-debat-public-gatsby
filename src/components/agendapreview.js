import React, { useState, useEffect } from "react"
import { useStaticQuery, Link, graphql } from "gatsby"

export const AgendaPreviewTemplate = event => {
  const date = new Date(event.date)

  if (date.getFullYear() !== event.now.getFullYear()) return null;

  return (
    <div className="column is-6 mb-3">
      <Link to={event.slug} className={`box is-mobile event`} style={{ background: "#e0e0e0"}}>
        <div className="columns is-vcentered has-text-centered">
          <div className="column is-narrow">
            <div style={{width: 150, height: 200, margin: '0 auto'}}>
              <img
                src={`${process.env.NODE_ENV === 'development' ? 'https://debatpublic-bfc.netlify.app' : ''}${event.photo}?nf_resize=smartcrop&w=150&h=200`}
                alt={event.title}
                style={{width: 150, height: 200}}
              />
            </div>
          </div>
          <div className="column">
            <h2 className="is-size-6">{event.title}</h2>
            <div>
              <time dateTime={date.toISOString().substr(0, 10)} className="is-size-6 saira">
                {new Intl.DateTimeFormat('fr-FR', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}).format(date)}
              </time>
            </div>
            <div className="is-size-7">{event.intro}</div>
            <div className="mt-2 has-text-centered">
              <Link to={event.slug} className="button is-primary mr-2 mt-2 is-small">En savoir plus</Link>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

const AgendaPreview = () => {
  const [now, setNow] = useState(new Date('2000-01-01'))
  useEffect(() => {
    setNow(new Date())
  }, [])
  const data = useStaticQuery(graphql`
    query AgendaPreviewQuery {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { templateKey: { eq: "agenda" } } }
        limit: 10
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              date
              photo
              intro
            }
          }
        }
      }
    }
  `)
  return (
    <>
      {data.allMarkdownRemark.edges.map(event => (
        <AgendaPreviewTemplate {...{now, ...event.node.frontmatter, slug: event.node.fields.slug}} key={`${event.node.fields.slug}`} />
      ))}
    </>
  )
}

export default AgendaPreview
