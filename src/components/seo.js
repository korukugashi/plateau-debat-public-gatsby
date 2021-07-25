/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import SohomaUrlBold from "../fonts/sohomaextrabold.woff2"
import SohomaUrlLight from "../fonts/sohomalight.woff2"
import Saira from "../fonts/SairaExtraCondensed-ExtraBold.woff2"

function SEO({ description, lang, meta, keywords, title, link }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
        class: 'has-navbar-fixed-top',
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(
        keywords.length > 0
          ? {
              name: `keywords`,
              content: keywords.join(`, `),
            }
          : []
      ).concat(meta)}
    >
      <link rel="preload"
        as="font"
        href={SohomaUrlBold}
        type="font/woff2"
        crossOrigin="anonymous" />
      <link rel="preload"
        as="font"
        href={SohomaUrlLight}
        type="font/woff2"
        crossOrigin="anonymous" />
      <link rel="preload"
        as="font"
        href={Saira}
        type="font/woff2"
        crossOrigin="anonymous" />
      {link && link.map(tag => <link rel={tag.rel} href={tag.href} />)}
    </Helmet>
  )
}

SEO.defaultProps = {
  keywords: [],
  lang: `fr`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  link: PropTypes.arrayOf(PropTypes.object),
}

export default SEO
