import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from "./logo.png";
import axios from "axios";

function handleSubmit(props) {
  const { history } = props;
  axios
    .get("/logout")
    .then(() => {
      history.push("/");
    })
    .catch(error => {
      history.push("/error");
    });
}

const NavBar = props => (
  <div className="nav-outer">
    <div className="nav-bar1">
      <div className="main-title">
        <Link to="/home">
          <img className="logo" src={logo} alt="logo" />
        </Link>
        <h3 className="website-title">Reservation System</h3>
      </div>
      <button className="logout-btn" onClick={() => handleSubmit(props)}>
        {" "}
        Log Out{" "}
      </button>
    </div>
  </div>
);
export default NavBar;
