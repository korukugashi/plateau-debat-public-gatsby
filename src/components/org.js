import React from "react"

const OrgContentTemplate = org => (
  <>
    <div>{org.node.frontmatter.label}</div>
    {org.node.frontmatter.image ? (
      <img
        src={`${process.env.NODE_ENV === 'development' ? 'https://debatpublic-bfc.netlify.app' : ''}${org.node.frontmatter.image}?nf_resize=fit&w=150&h=150`}
        alt={org.node.frontmatter.label}
        className="mr-3"
        style={{
          marginTop: "0.5rem",
        }}
      />
    ) : null}
  </>
)

const OrgTemplate = org => (
  <li style={{ padding: "1rem 2rem" }}>
    {org.node.frontmatter.url ? (
      <a href={org.node.frontmatter.url}>
        <OrgContentTemplate {...org} />
      </a>
    ) : (
      <OrgContentTemplate {...org} />
    )}
  </li>
)

export default OrgTemplate
