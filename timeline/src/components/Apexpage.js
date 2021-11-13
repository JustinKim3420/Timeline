import React from "react";
import { Link } from "react-router-dom";

const Apexpage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="search-page">
      <i className="fas fa-chess-pawn search-icon"></i>
      <form className="search-form" onSubmit={(event) => handleSubmit(event)}>
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

export default Apexpage;
