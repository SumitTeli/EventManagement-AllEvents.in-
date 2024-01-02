import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { ProfileContext } from "../context/ProfileContext";

function Header() {
  const storedProfile = localStorage.getItem("loggedInUser");

  const navigate = useNavigate();
  const logOut = () => {
    console.log("Logoutpressd");
    localStorage.removeItem("loggedInUser");
    googleLogout();
    setProfile(null);
    navigate("/");
  };
  if (!storedProfile) {
    return null;
  } else {
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container">
            <NavLink to="/" className="navbar-brand">
              Event Management
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to="/home" className="nav-link " aria-current="page">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/addevent" className="nav-link">
                    Add Event
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/eventlist" className="nav-link">
                    Event List
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/addcategory" className="nav-link">
                    Add Category
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/viewcategory" className="nav-link">
                    View Category
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button onClick={logOut} className="nav-link">
                    Logout
                  </button>
                </li>
              </ul>
              {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default Header;
