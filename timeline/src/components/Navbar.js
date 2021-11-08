import React from "react";
import Burger from "./Burger";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <Link to="/" className="no-text-decoration inline-block">
          <i className="fas fa-chart-line navbar-icon"></i>
        </Link>
        <div>
          <Burger />
        </div>
        <ul className="timeline-nav-items">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Chess" className="nav-link">
              Chess
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Github" className="nav-link">
              Github
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Apex" className="nav-link">
              Apex Legends
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
