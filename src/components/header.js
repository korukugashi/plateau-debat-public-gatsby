import { Link } from "gatsby"
import React, { useState } from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import { MdSearch } from "react-icons/md"

const Header = ({siteTitle = ""}) => {
  const data = useStaticQuery(graphql`
    query {
      logoImage: file(relativePath: { eq: "logo-dp-bfc.png" }) {
        childImageSharp {
          fixed(width: 150) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `)
  const [active, setActive]= useState(false);
  const [navBarActiveClass, setNavBarActiveClass] = useState('')

  const toggleHamburger = () => {
    setNavBarActiveClass(active ? '' : 'is-active');
    setActive(!active);
  }

  return (
    <header className="header">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="container is-fluid" style={{alignItems: "center"}}>
          <div className="navbar-brand">
            <Link className="logo" to="/" title={siteTitle}>
              <Img fixed={data.logoImage.childImageSharp.fixed} alt="Plateau débat public bfc" />
            </Link>
  
            <div
              className={`navbar-burger burger ${navBarActiveClass}`}
              aria-label="menu"
              aria-expanded="false"
              data-target="mainNavbar"
              onClick={ () => toggleHamburger() }
              onKeyDown={ (ev) => { if (ev === 13) toggleHamburger() } }
              role="button"
              tabIndex={0}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </div>
          </div>

          <div style={{flexGrow: 1}}>
            <div className={`is-flex mb-3 mt-2 ml-2 pl-3 pr-3 ${active ? '' : 'is-hidden-touch'}`} style={{borderBottom: "1px solid #008037"}}>
              <div className="is-hidden-touch sohoma has-text-weight-bold is-size-7 mt-4" style={{flexGrow: 1}}>Favoriser le dialogue environnemental sur notre territoire</div>
              <div className="is-flex ml-4 pb-3" style={{justifyContent: "flex-end"}}>
                <div className="control has-icons-left">
                  <span class="icon is-left">
                    <MdSearch style={{position: "relative", top: -3}} />
                  </span>
                  <input className="input is-small" type="text" placeholder="Rechercher sur le site" />
                </div>
                <a className="button is-small" href="https://www.helloasso.com/associations/france-nature-environnement-bourgogne-franche-comte/formulaires/1/widget" style={{ marginLeft: '1rem' }}>Nous soutenir</a>
              </div>
            </div>
    
            <div id="mainNavbar" className={`navbar-menu ${navBarActiveClass}`}>
              <div className="navbar-start ml-2">
                <Link className="navbar-item" to="/">Accueil</Link>
                <div className="navbar-item has-dropdown is-hoverable">
                  <Link className="navbar-link" to="/qui-sommes-nous/">
                    Qui sommes-nous ?
                  </Link>
    
                  <div className="navbar-dropdown">
                    <Link className="navbar-item" to="/qui-sommes-nous/">
                      Historique et gouvernance
                    </Link>
                    <Link className="navbar-item" to="/qui-sommes-nous/processus/">
                      Processus
                    </Link>
                    <Link className="navbar-item" to="/qui-sommes-nous/equipe/">
                      L'équipe
                    </Link>
                    <Link className="navbar-item" to="/qui-sommes-nous/partenaires/">
                      Nos partenaires
                    </Link>
                  </div>
                </div>

                <Link className="navbar-item" to="/cr-debats/">CR des débats</Link>

                <div className="navbar-item has-dropdown is-hoverable">
                  <Link className="navbar-link" to="/publications/">
                    Publications
                  </Link>
    
                  <div className="navbar-dropdown">
                    <Link className="navbar-item" to="/publications/mots-et-debats/">
                      Mots et débats
                    </Link>
                    <Link className="navbar-item" to="/publications/">
                      Publications et thématiques
                    </Link>
                  </div>
                </div>

                <Link className="navbar-item" to="/contact/">Contactez-nous</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
