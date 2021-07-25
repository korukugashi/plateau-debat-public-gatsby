import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const SliderItem = data => (
  <div
    style={{
      backgroundImage: `url(${
        process.env.NODE_ENV === "development"
          ? "https://debatpublic-bfc.netlify.app"
          : ""
      }${data.photo}?nf_resize=smartcrop&h=300&w=1600)`,
    }}
    className="slideImg"
  />
)

export default function MySlider() {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___label] }
        filter: { frontmatter: { templateKey: { eq: "slider" } } }
      ) {
        edges {
          node {
            frontmatter {
              label
              photo
            }
          }
        }
      }
    }
  `)

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
  }

  return (
    <Slider {...settings} className="slider">
      {data.allMarkdownRemark.edges.map(slide => (
        <SliderItem
          key={slide.node.frontmatter.label}
          {...slide.node.frontmatter}
        />
      ))}
    </Slider>
  )
}
