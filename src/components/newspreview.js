import React, { useState } from "react"
import { Link } from "gatsby"
import moment from "moment"
import "moment/locale/fr"

import ImgNetlify from "./imgnetlify"

const DEFAULT_NB_ITEMS_DISPLAYED = 6

export const NewsPreviewTemplate = news => {
  const date = moment(news.date)
  return (
    <div className="column is-half-tablet is-one-third-desktop">
      <Link to={news.slug}>
        <article>
          <div>
            <h1 className="mt-0">{news.title}</h1>
            <div className="tags mt-2 mb-0">
              <time dateTime={date.format("YYYY-MM-DD")} className="mr-2">
                {date.format("DD MMMM YYYY")}
              </time>
              {(news.tags && news.tags.map(tag => (
                <span key={tag}>• {tag}</span>
              ))) || null}
            </div>
            {news.featuredimage ? (
              <ImgNetlify
                image={`${news.featuredimage}?nf_resize=smartcrop&w=300&h=150`}
                alt={news.title}
                className="mt-1"
                style={{ maxHeight: 150, maxWidth: 300, overflow: "hidden" }}
              />
            ) : null}
            <p className="is-size-7 mt-2">{news.description}</p>
          </div>
        </article>
      </Link>
    </div>
  )
}

const NewsPreview = ({ news }) => {
  const [nbDisplayed, setNbDisplayed] = useState(DEFAULT_NB_ITEMS_DISPLAYED)
  moment.locale("fr")
  return (
    <>
      <div className="columns home-articles is-multiline mt-2">
        {news.map((news, index) =>
          index < nbDisplayed ? (
            <NewsPreviewTemplate
              {...{ slug: news.node.fields.slug, ...news.node.frontmatter }}
              key={news.node.fields.slug}
            />
          ) : null
        )}
      </div>
      {news.length ? (
        news.length > nbDisplayed ? (
          <div className="has-text-centered">
            <div
              className="button is-primary"
              onClick={() =>
                setNbDisplayed(nbDisplayed + DEFAULT_NB_ITEMS_DISPLAYED)
              }
              onKeyDown={() =>
                setNbDisplayed(nbDisplayed + DEFAULT_NB_ITEMS_DISPLAYED)
              }
              tabIndex={0}
              role="button"
            >
              AFFICHER PLUS
            </div>
          </div>
        ) : null
      ) : (
        <div className="mt-6 has-text-centered">Il n'y a aucun article pour cette thématique.</div>
      )}
    </>
  )
}

export default NewsPreview
