import React from "react"
import Obfuscate from "react-obfuscate"

import ImgNetlify from "./imgnetlify"

const PersonTemplate = ({ person, index }) => (
  <li key={index}>
    <ImgNetlify
      image={`${person.photo}?nf_resize=smartcrop&w=128&h=128`}
      style={{ width: 128, height: 128, borderRadius: "50%" }}
      imgStyle={{
        objectFit: "cover",
        objectPosition: "50% 50%",
      }}
      alt={person.fonction}
    />
    <Obfuscate element="div">{person.name}</Obfuscate> {person.fonction}
  </li>
)

const PersonListTemplate = ({ title, personlist }) => (
  <>
    <h2>{title}</h2>
    <ul className="team">
      {personlist &&
        personlist.map((person, index) => (
          <PersonTemplate person={person} index={index} />
        ))}
    </ul>
  </>
)

const TeamTemplate = ({ admins, salaries }) => {
  return (
    <>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1>L'équipe de FNE BFC</h1>
          </div>
        </div>
      </section>
      <section className="section pt-2">
        <div className="container has-text-centered">
          <style type="text/css">
            {`.team li{display:inline-block;width:180px;margin:20px 5px;font-size:1rem;font-family:Sohoma}`}
            {`.team div{font-family:Saira;font-size:1.1rem}`}
          </style>
          <PersonListTemplate title="Administrateurs" personlist={admins} />
          <PersonListTemplate title="Salariés" personlist={salaries} />
        </div>
      </section>
    </>
  )
}

export default TeamTemplate
