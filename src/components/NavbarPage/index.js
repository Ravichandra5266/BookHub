import { GiHamburgerMenu } from "react-icons/gi";

import { AiFillCloseCircle } from "react-icons/ai";

import { withRouter } from "react-router-dom";

import Cookies from "js-cookie";

import { Link, NavLink } from "react-router-dom";

import { useState } from "react";

import "./index.css";

const NavbarPage = (props) => {
  const [showNavItems, setShowNavItems] = useState(false);

  const onclickLogout = () => {
    Cookies.remove("jwt_token");
    const { history } = props;
    history.replace("/login");
  };

  const onclickShowNavItems = () => {
    setShowNavItems(true);
  };

  const onclickHideNavItems = () => {
    setShowNavItems(false);
  };
  return (
    <nav className="navbar-container">
      <div className="navbar-top-content-container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1680171066/Group_7732_pif35n.png"
            alt="navbar logo"
            className="navbar-logo"
          />
        </Link>
        <button className="ham-btn" onClick={onclickShowNavItems}>
          <GiHamburgerMenu className="ham-icon" />
        </button>
        <ul className="lg-navbar-items-container">
          <NavLink exact to="/" activeClassName="active" className="link-style">
            <li className="navbar-item">Home</li>
          </NavLink>
          <NavLink
            exact
            to="/bookshelves"
            activeClassName="active"
            className="link-style"
          >
            <li className="navbar-item">Bookshelves</li>
          </NavLink>
          <li className="navbar-item">
            <button
              type="button"
              className="logout-btn"
              onClick={onclickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      {showNavItems && (
        <>
          <div className="navbar-flex-items-container">
            <ul className="navbar-items-container">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="link-style"
              >
                <li className="navbar-item">Home</li>
              </NavLink>
              <NavLink
                exact
                to="/bookshelves"
                activeClassName="active"
                className="link-style"
              >
                <li className="navbar-item">Bookshelves</li>
              </NavLink>
              <li className="navbar-item">
                <button
                  type="button"
                  className="logout-btn"
                  onClick={onclickLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
            <button
              type="button"
              className="cross-btn"
              onClick={onclickHideNavItems}
            >
              <AiFillCloseCircle className="cross-icon" />
            </button>
          </div>
          <hr className="hr-line" />
        </>
      )}
    </nav>
  );
};

export default withRouter(NavbarPage);
