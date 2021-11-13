import React from "react";
import { Link } from "react-router-dom";

const Githubpage = () => {
  return (
    <div className="search-page">
      <i className="fab fa-github search-icon"></i>
      <form className="search-form">
        <input
          className="search-input"
          type="text"
          placeholder="Search for a user..."
        />
        <Link to="/results/:searchedUsername">
          <button className="search-button" type="submit">
            Search
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Githubpage;
