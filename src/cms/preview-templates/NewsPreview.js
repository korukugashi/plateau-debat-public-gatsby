import React from "react"
import PropTypes from "prop-types"
import { NewsPreviewTemplate } from "../../components/newspreview"

const NewsPreview = ({ entry, widgetFor, widgetsFor, getAsset }) => (
  <>
    <div
      className="columns home-articles is-multiline mt-2"
      style={{ maxWidth: 330 }}
    >
      <NewsPreviewTemplate
        {...{
          date: entry.getIn(["data", "date"]),
          title: entry.getIn(["data", "title"]),
          description: entry.getIn(["data", "description"]),
          tags: entry.getIn(["data", "tags"]),
          featuredimage: getAsset(entry.getIn(["data", "featuredimage"])),
        }}
      />
    </div>
    <hr />
    <h1>{entry.getIn(["data", "title"])}</h1>
    <div>{widgetFor("body")}</div>
  </>
)

NewsPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
  widgetsFor: PropTypes.func,
  getAsset: PropTypes.func,
}

export default NewsPreview
