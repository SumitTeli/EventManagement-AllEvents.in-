import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { ProfileContext } from "../context/ProfileContext";

function Footer() {
  return (
    <>
      <footer className="bg-body-tertiary fixed-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mt-3">
              <p>Copyright @2023-24 AllEvents.in</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
