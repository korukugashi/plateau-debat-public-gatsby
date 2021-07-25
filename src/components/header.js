import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { ReactComponent as Herisson}  from "../images/herisson.svg"
import { ReactComponent as BandeauRouge}  from "../images/bandeau-rouge.svg"
import MenuActions from "../components/menuactions"

const Header = class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    this.setState({ active: !this.state.active },
      () => {
        this.state.active
          ? this.setState({ navBarActiveClass: 'is-active' })
          : this.setState({ navBarActiveClass: '' })
      }
    )
  }

  render() {
    return (
      <header className="header">
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
          <div className="container is-fluid">
            <div className="navbar-brand">
              <Link className="navbar-item logo" to="/" title={this.props.siteTitle}>
                <Herisson id="herisson" style={{ width: 70, height: 70, top: 0, left: 21 }} />
                <div style={{ top: -5, left: 100, width: 120 }}>FRANCE NATURE</div>
                <div style={{ top : 13, left: 100 }}>ENVIRONNEMENT</div>
                <BandeauRouge id="bandeau-rouge" style={{ width: 111, height: 18, top: 39, left: 105, zIndex: 0 }} />
                <div style={{ top: 39, left: 110, fontSize: '0.7rem', width: '8rem', color: '#fff', zIndex: 1 }}>Bourgogne Franche-Comté</div>
              </Link>
    
              <div
                className={`navbar-burger burger ${this.state.navBarActiveClass}`}
                aria-label="menu"
                aria-expanded="false"
                data-target="mainNavbar"
                onClick={ () => this.toggleHamburger() }
                onKeyDown={ (ev) => { if (ev === 13) this.toggleHamburger() } }
                role="button"
                tabIndex={0}
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </div>
            </div>
    
            <div id="mainNavbar" className={`navbar-menu ${this.state.navBarActiveClass}`}>
              <div className="navbar-end">
                <Link className="navbar-item" to="/">Accueil</Link>
                <div className="navbar-item has-dropdown is-hoverable">
                  <Link className="navbar-link" to="/qui-sommes-nous/">
                    Qui sommes-nous ?
                  </Link>
    
                  <div className="navbar-dropdown">
                    <Link className="navbar-item" to="/qui-sommes-nous/">
                      L'association
                    </Link>
                    <Link className="navbar-item" to="/qui-sommes-nous/equipe/">
                      L'équipe
                    </Link>
                    <Link className="navbar-item" to="/qui-sommes-nous/reseau-fne/">
                      Le réseau FNE BFC
                    </Link>
                    <Link className="navbar-item" to="/qui-sommes-nous/propriete/">
                      Nos biens fonciers naturels
                    </Link>
                    <Link className="navbar-item" to="/qui-sommes-nous/soutiens/">
                      On les soutient...
                    </Link>
                  </div>
                </div>

                <div className="navbar-item has-dropdown is-hoverable">
                  <Link className="navbar-link" to="/nos-actions/">
                    Nos actions
                  </Link>
    
                  <div className="navbar-dropdown">
                    <MenuActions />
                  </div>
                </div>

                <div className="navbar-item has-dropdown is-hoverable">
                  <Link className="navbar-link" to="/nous-rejoindre/">
                    Nous rejoindre
                  </Link>
    
                  <div className="navbar-dropdown">
                    <Link className="navbar-item" to="/nous-rejoindre/">
                      Adhérer
                    </Link>
                    <Link className="navbar-item" to="/nous-rejoindre/participer/">
                      Agir avec nous
                    </Link>
                    <Link className="navbar-item" to="/contact/">
                      Nous contacter
                    </Link>
                  </div>
                </div>
                
                <Link className="navbar-item" to="/documentation/">Documentation</Link>
                <Link className="button is-small is-primary" to="/nous-rejoindre/don/" style={{ position: 'relative', top: '0.8rem', marginLeft: '1rem' }}>Faire un don</Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
