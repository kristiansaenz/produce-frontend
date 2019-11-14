import React from 'react'
import logo from '../images/logo.svg';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'


const Header = (props) => {
    
    function expandNavMenu() {
        let menu = document.getElementsByClassName("navbar-menu")[0];
        menu.style.display = (menu.style.display === "block") ? 
            menu.style.display = "none" : menu.style.display = "block";
    }

  return (
    <section className="hero">
      <div className="hero-body nav-banner">
      
        {/* Navigation */}
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            
            {/* Produce + Logo */}
            <Link to="/" class="nav-home-link">
              <a className="navbar-item">
                <img src={logo} id="logo"></img>
                <div className="brand-name">
                  <strong>Produce</strong>
                </div>
              </a>
            </Link>

            {/* Hamburger menu */}
            <a
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbar"
              onClick={expandNavMenu}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          {/* Page Routes */}
                  {!props.isAuthenticated ? (
                // Page Routes Authenticated
                <div class="navbar-menu">
                    <div class="navbar-end">
                        {/* <Link to="/about"><a class="navbar-item">About</a></Link> */}
                        <Link to="/market"><a class="navbar-item">Market</a></Link>
                        <Link to="/login"><a class="navbar-item">Login</a></Link>
                        <Link to="/contact"><a class="navbar-item">Contact</a></Link>
                    </div>
                </div>
              ) : (
                <div class="navbar-menu">
                    <div class="navbar-end">
                        {/* <Link to="/about"><a class="navbar-item">About</a></Link> */}
                        <Link to="/market"><a class="navbar-item">Market</a></Link>
                        <Link to="/contact"><a class="navbar-item">Contact</a></Link>
                        <h1>{props.user.name}</h1>
                    </div>
                </div>
              )}
        </nav>
      </div>
    </section>
  );
}

const MapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(MapStateToProps)(Header)
