import React from "react"
import PropTypes from "prop-types"
import TeamTemplate from "../../components/team"

const TeamPreview = ({ widgetsFor, getAsset }) => (
  <TeamTemplate
    admins={widgetsFor("admins").map(person => ({
      name: person.getIn(["data", "name"]),
      fontion: person.getIn(["data", "fonction"]),
      photo: getAsset(person.getIn(["data", "photo"])),
    }))}
    salaries={widgetsFor("salaries").map(person => ({
      name: person.getIn(["data", "name"]),
      fontion: person.getIn(["data", "fonction"]),
      photo: getAsset(person.getIn(["data", "photo"])),
    }))}
  />
)

TeamPreview.propTypes = {
  widgetsFor: PropTypes.func,
  getAsset: PropTypes.func,
}

export default TeamPreview
