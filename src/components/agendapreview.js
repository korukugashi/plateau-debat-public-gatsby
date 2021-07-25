import React, { useState, useEffect } from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import { MdSchedule, MdRoom } from "react-icons/md"
import moment from "moment"
import "moment/locale/fr"

export const AgendaPreviewTemplate = event => {
  const date = moment(event.date)
  const dateStd = date.format("YYYY-MM-DD")
  return (
    <Link to="/agenda/" className={`columns is-mobile event ${event.now > dateStd ? 'outdated' : ''}`}>
      <div className="column is-3 day">
        <time dateTime={dateStd} className="is-size-2 saira">
          {date.format("DD")}{" "}
          <small className="is-size-6">{date.format("MMMM")}</small>
        </time>
      </div>
      <div className="column is-size-7">
        <h2 className="is-size-6">{event.title}</h2>
        <time dateTime={date.format("HH:mm")}>
          <MdSchedule /> {event.duration}
        </time>
        <address>
          <MdRoom /> {event.location}
        </address>
      </div>
    </Link>
  )
}

const AgendaPreview = () => {
  const [now, setNow] = useState('2000-01-01')
  useEffect(() => {
    const dateNow = moment()
    setNow(dateNow.format("YYYY-MM-DD"))
  }, [])
  const data = useStaticQuery(graphql`
    query AgendaPreviewQuery {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { templateKey: { eq: "agenda" } } }
        limit: 3
      ) {
        edges {
          node {
            frontmatter {
              title
              date
              location
              duration
            }
          }
        }
      }
    }
  `)
  moment.locale("fr")
  return (
    <>
      {data.allMarkdownRemark.edges.map(event => (
        <AgendaPreviewTemplate {...{now, ...event.node.frontmatter}} key={`${event.node.frontmatter.title}${event.node.frontmatter.date}`} />
      ))}
    </>
  )
}

export default AgendaPreview
