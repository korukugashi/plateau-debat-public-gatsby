import React from "react"
import PropTypes from "prop-types"

const FilesPreview = ({ entry }) => (
  <>
    <h2>Lien à copier/coller dans les articles (mode édition "Texte enrichi"):</h2>
    <a href={entry.getIn(["data", "file"])}>{entry.getIn(["data", "title"])}</a>
    <h2>Ou pour que le lien s'ouvre dans un nouvel onglet, se placer en mode édition "Markdown" et copier le code suivant :</h2>
    <code>&lt;a href="{entry.getIn(["data", "file"])}" target="_blank"&gt;{entry.getIn(["data", "title"])}&lt;/a&gt;</code>
  </>
)

FilesPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
}

export default FilesPreview
